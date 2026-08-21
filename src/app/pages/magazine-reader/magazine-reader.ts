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
import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
} from 'pdfjs-dist';
import { map, startWith, switchMap } from 'rxjs';
import type { MagazineIssue } from '../../data/models';
import { ContentService } from '../../services/content.service';

GlobalWorkerOptions.workerSrc = `${document.baseURI.replace(/\/$/, '')}/assets/pdfjs/pdf.worker.min.mjs`;

type IssueState =
  | { status: 'loading' }
  | { status: 'ready'; issue: MagazineIssue | undefined };

@Component({
  selector: 'app-magazine-reader',
  imports: [RouterLink],
  templateUrl: './magazine-reader.html',
  styleUrl: './magazine-reader.scss',
})
export class MagazineReader implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('pageCanvas');
  private readonly stageRef = viewChild<ElementRef<HTMLElement>>('stage');

  private pdf: PDFDocumentProxy | null = null;
  private renderTask: { cancel: () => void } | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private touchStartX = 0;
  private loadedUrl: string | null = null;

  readonly issueState = toSignal(
    this.route.paramMap.pipe(
      map((p) => p.get('id') ?? ''),
      switchMap((id) =>
        this.content.getMagazine(id).pipe(
          map((issue): IssueState => ({ status: 'ready', issue })),
        ),
      ),
      startWith({ status: 'loading' } as IssueState),
    ),
    { initialValue: { status: 'loading' } as IssueState },
  );

  readonly page = signal(1);
  readonly pageCount = signal(0);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const state = this.issueState();
      if (state.status !== 'ready' || !state.issue?.pdfUrl) {
        if (state.status === 'ready' && !state.issue?.pdfUrl) {
          this.loading.set(false);
        }
        return;
      }
      void this.loadPdf(state.issue.pdfUrl);
    });

    effect(() => {
      const page = this.page();
      const count = this.pageCount();
      const canvas = this.canvasRef();
      const stage = this.stageRef();
      if (!canvas || !stage || !this.pdf || count < 1) {
        return;
      }
      void this.renderPage(page);
    });
  }

  ngOnDestroy(): void {
    this.renderTask?.cancel();
    this.resizeObserver?.disconnect();
    void this.pdf?.destroy();
    this.pdf = null;
  }

  prev(): void {
    this.page.update((p) => Math.max(1, p - 1));
  }

  next(): void {
    this.page.update((p) => Math.min(this.pageCount(), p + 1));
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

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - this.touchStartX;
    if (Math.abs(delta) < 56) {
      return;
    }
    if (delta < 0) {
      this.next();
    } else {
      this.prev();
    }
  }

  assetUrl(path: string): string {
    return this.resolveAssetUrl(path);
  }

  private resolveAssetUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return new URL(normalized, document.baseURI).href;
  }

  private async loadPdf(pdfUrl: string): Promise<void> {
    const absoluteUrl = this.resolveAssetUrl(pdfUrl);
    if (this.loadedUrl === absoluteUrl && this.pdf) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.page.set(1);
    this.pageCount.set(0);
    this.renderTask?.cancel();
    await this.pdf?.destroy();
    this.pdf = null;
    this.loadedUrl = null;

    try {
      const response = await fetch(absoluteUrl);
      if (!response.ok) {
        throw new Error(`PDF fetch failed (${response.status})`);
      }

      const data = await response.arrayBuffer();
      const loadingTask = getDocument({
        data,
        withCredentials: false,
      });
      this.pdf = await loadingTask.promise;
      this.loadedUrl = absoluteUrl;
      this.pageCount.set(this.pdf.numPages);
      this.loading.set(false);
      this.observeStage();
    } catch (err) {
      console.error(err);
      this.loading.set(false);
      this.error.set('Could not load this PDF. Try Download PDF instead.');
    }
  }

  private observeStage(): void {
    this.resizeObserver?.disconnect();
    queueMicrotask(() => {
      const stage = this.stageRef()?.nativeElement;
      if (!stage) {
        return;
      }
      this.resizeObserver = new ResizeObserver(() => {
        void this.renderPage(this.page());
      });
      this.resizeObserver.observe(stage);
      void this.renderPage(this.page());
    });
  }

  private async renderPage(pageNumber: number): Promise<void> {
    const pdf = this.pdf;
    const canvas = this.canvasRef()?.nativeElement;
    const stage = this.stageRef()?.nativeElement;
    if (!pdf || !canvas || !stage || pageNumber < 1 || pageNumber > pdf.numPages) {
      return;
    }

    this.renderTask?.cancel();

    try {
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const maxWidth = Math.max(stage.clientWidth - 24, 280);
      const maxHeight = Math.max(stage.clientHeight - 24, 320);
      const fitScale = Math.min(
        maxWidth / baseViewport.width,
        maxHeight / baseViewport.height,
      );
      const outputScale = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: Math.max(fitScale, 0.45) * outputScale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / outputScale}px`;
      canvas.style.height = `${viewport.height / outputScale}px`;

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      const task = page.render({
        canvasContext: context,
        viewport,
      });
      this.renderTask = task;
      await task.promise;
    } catch (err) {
      if ((err as { name?: string })?.name !== 'RenderingCancelledException') {
        console.error(err);
      }
    }
  }
}
