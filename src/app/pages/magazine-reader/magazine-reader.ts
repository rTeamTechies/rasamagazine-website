import {
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageFlip } from 'page-flip/dist/js/page-flip.module.js';
import { map, startWith, switchMap } from 'rxjs';
import type { MagazineIssue } from '../../data/models';
import { ContentService } from '../../services/content.service';
import { driveDirectDownloadUrl, resolveAssetUrl } from '../../utils/drive-pdf';

/** Below this host width the library switches to single-page portrait mode. */
const PORTRAIT_BREAKPOINT = 640;
const PRELOAD_RADIUS = 4;

@Component({
  selector: 'app-magazine-reader',
  imports: [RouterLink],
  templateUrl: './magazine-reader.html',
  styleUrl: './magazine-reader.scss',
})
export class MagazineReader implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly flipShellRef = viewChild<ElementRef<HTMLElement>>('flipShell');

  private pageFlip: PageFlip | null = null;
  private host: HTMLElement | null = null;
  private pageUrls: string[] = [];
  private pageAspect = 595 / 842;
  private resizeObserver: ResizeObserver | null = null;
  private loadedIssueId: string | null = null;
  private loadToken = 0;

  readonly issueState = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('id') ?? ''),
      switchMap((id) =>
        this.content.getMagazine(id).pipe(
          map((issue): { status: 'ready'; issue: MagazineIssue | undefined } => ({
            status: 'ready',
            issue,
          })),
        ),
      ),
      startWith({ status: 'loading' } as const),
    ),
    { initialValue: { status: 'loading' } as const },
  );

  readonly page = signal(1);
  readonly pageCount = signal(0);
  readonly loading = signal(true);
  readonly statusMessage = signal('Opening magazine…');
  readonly flipReady = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const state = this.issueState();
      const shell = this.flipShellRef();
      if (state.status !== 'ready' || !state.issue || !shell) {
        return;
      }

      if (!this.hasSource(state.issue)) {
        this.loading.set(false);
        this.flipReady.set(false);
        return;
      }

      void this.loadIssue(state.issue);
    });
  }

  ngOnDestroy(): void {
    this.loadToken += 1;
    this.resizeObserver?.disconnect();
    this.destroyFlipBook();
  }

  hasSource(issue: MagazineIssue): boolean {
    return !!issue.pagesBase?.trim() && (issue.pageCount ?? 0) > 0;
  }

  downloadUrl(issue: MagazineIssue): string {
    if (issue.driveUrl?.trim()) {
      return issue.driveUrl.trim();
    }
    if (issue.pdfUrl?.trim()) {
      return resolveAssetUrl(issue.pdfUrl);
    }
    return '#';
  }

  directDownloadUrl(issue: MagazineIssue): string | null {
    if (issue.driveUrl?.trim()) {
      return driveDirectDownloadUrl(issue.driveUrl);
    }
    if (issue.pdfUrl?.trim()) {
      return resolveAssetUrl(issue.pdfUrl);
    }
    return null;
  }

  prev(): void {
    this.pageFlip?.flipPrev();
  }

  next(): void {
    this.pageFlip?.flipNext();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  private async loadIssue(issue: MagazineIssue): Promise<void> {
    const token = ++this.loadToken;

    if (this.loadedIssueId === issue.id && this.pageFlip) {
      return;
    }

    this.loading.set(true);
    this.flipReady.set(false);
    this.error.set(null);
    this.page.set(1);
    this.pageCount.set(issue.pageCount ?? 0);
    this.statusMessage.set('Opening magazine…');

    this.destroyFlipBook();
    this.loadedIssueId = null;

    try {
      this.pageUrls = this.buildPageImages(issue);
      if (this.pageUrls.length === 0) {
        throw new Error('No rendered pages found for this issue');
      }

      const cover = await this.loadImage(this.pageUrls[0]);
      if (token !== this.loadToken) {
        return;
      }

      if (cover.naturalWidth > 0 && cover.naturalHeight > 0) {
        this.pageAspect = cover.naturalWidth / cover.naturalHeight;
      }

      this.initFlipBook();
      this.loadedIssueId = issue.id;
      this.pageCount.set(this.pageUrls.length);
      this.loading.set(false);
      this.flipReady.set(true);
      this.statusMessage.set('');
    } catch (err) {
      console.error(err);
      if (token !== this.loadToken) {
        return;
      }
      this.loading.set(false);
      this.flipReady.set(false);
      this.error.set('Could not open this issue. Try the Google Drive link instead.');
    }
  }

  private buildPageImages(issue: MagazineIssue): string[] {
    const base = issue.pagesBase?.replace(/\/$/, '');
    const count = issue.pageCount ?? 0;
    if (!base || count < 1) {
      return [];
    }

    const ext = issue.pageExt?.replace(/^\./, '') || 'jpg';

    return Array.from({ length: count }, (_, index) =>
      resolveAssetUrl(`${base}/${String(index + 1).padStart(3, '0')}.${ext}`),
    );
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Failed to load ${src}`));
      image.src = src;
    });
  }

  /**
   * HTML mode is used instead of canvas mode so each page stays a real <img>.
   * The library's canvas renderer sizes its bitmap in CSS pixels, which makes
   * pages blurry on high-density screens.
   */
  private buildSheets(): HTMLElement[] {
    return this.pageUrls.map((url, index) => {
      const sheet = document.createElement('div');
      sheet.className = 'sheet';
      if (index === 0 || index === this.pageUrls.length - 1) {
        sheet.dataset['density'] = 'hard';
      }

      const image = document.createElement('img');
      image.src = url;
      image.alt = `Page ${index + 1}`;
      image.draggable = false;
      image.decoding = 'async';
      image.loading = index < 2 ? 'eager' : 'lazy';

      sheet.appendChild(image);
      return sheet;
    });
  }

  private initFlipBook(): void {
    const shell = this.flipShellRef()?.nativeElement;
    if (!shell || this.pageUrls.length === 0) {
      return;
    }

    shell.innerHTML = '';
    this.host = document.createElement('div');
    this.host.className = 'flip-book-host';
    shell.appendChild(this.host);

    this.applyHostSize();

    const pageHeight = 1000;
    const pageWidth = Math.round(pageHeight * this.pageAspect);

    this.pageFlip = new PageFlip(this.host, {
      width: pageWidth,
      height: pageHeight,
      size: 'stretch',
      minWidth: PORTRAIT_BREAKPOINT / 2,
      maxWidth: 1400,
      minHeight: 300,
      maxHeight: 2000,
      showCover: true,
      usePortrait: true,
      drawShadow: true,
      maxShadowOpacity: 0.4,
      mobileScrollSupport: false,
      showPageCorners: true,
      flippingTime: 800,
    });

    this.pageFlip.loadFromHTML(this.buildSheets());
    this.pageFlip.on('flip', (event) => {
      this.page.set(event.data + 1);
      this.preloadAround(event.data);
    });

    this.page.set(1);
    this.preloadAround(0);
    this.observeFlipShell();
  }

  /** Warms the cache around the current spread so flips are not blank. */
  private preloadAround(pageIndex: number): void {
    const start = Math.max(0, pageIndex - PRELOAD_RADIUS);
    const end = Math.min(this.pageUrls.length - 1, pageIndex + PRELOAD_RADIUS);

    for (let index = start; index <= end; index += 1) {
      const image = new Image();
      image.src = this.pageUrls[index];
    }
  }

  /**
   * The book height is derived from its width by the page ratio, so the width
   * has to be capped to keep the whole spread inside the viewport.
   */
  private applyHostSize(): void {
    const shell = this.flipShellRef()?.nativeElement;
    if (!shell || !this.host) {
      return;
    }

    const availableWidth = Math.max(shell.clientWidth - 16, 240);
    const availableHeight = Math.max(shell.clientHeight - 16, 320);

    const widthForPortrait = availableHeight * this.pageAspect;
    const widthForSpread = widthForPortrait * 2;

    let width = Math.min(availableWidth, widthForSpread);
    if (width < PORTRAIT_BREAKPOINT) {
      width = Math.min(availableWidth, widthForPortrait);
    }

    this.host.style.width = `${Math.floor(width)}px`;
  }

  private observeFlipShell(): void {
    this.resizeObserver?.disconnect();
    queueMicrotask(() => {
      const shell = this.flipShellRef()?.nativeElement;
      if (!shell) {
        return;
      }

      this.resizeObserver = new ResizeObserver(() => {
        this.applyHostSize();
        this.pageFlip?.update();
      });
      this.resizeObserver.observe(shell);
    });
  }

  private destroyFlipBook(): void {
    this.pageFlip?.destroy();
    this.pageFlip = null;
    this.host = null;
    const shell = this.flipShellRef()?.nativeElement;
    if (shell) {
      shell.innerHTML = '';
    }
  }
}
