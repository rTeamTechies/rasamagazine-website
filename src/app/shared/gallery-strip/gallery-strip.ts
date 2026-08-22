import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Seconds each photo takes to cross the strip. Keeps the pace even as photos are added. */
const SECONDS_PER_IMAGE = 4;

/** Photos beyond this load lazily — they are off-screen until the strip scrolls to them. */
const EAGER_COUNT = 10;

/** Resume auto-scroll after manual interaction settles. */
const MANUAL_PAUSE_MS = 3500;

/**
 * Continuously scrolling photo strip. The track holds two copies of the same
 * photos; auto-scroll advances scrollLeft and wraps at half width for a seamless
 * loop. Users can also scroll manually (wheel, trackpad, touch, scrollbar).
 * Clicking a photo opens a lightbox (ported to document.body).
 */
@Component({
  selector: 'app-gallery-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery-strip.html',
  styleUrl: './gallery-strip.scss',
})
export class GalleryStrip implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  readonly images = input.required<string[]>();
  readonly label = input('Photo gallery');

  protected readonly durationSeconds = computed(() => this.images().length * SECONDS_PER_IMAGE);
  protected readonly lightboxSrc = signal<string | null>(null);
  protected readonly userPaused = signal(false);
  private readonly lightboxPanel = viewChild<ElementRef<HTMLElement>>('lightboxPanel');
  private readonly strip = viewChild<ElementRef<HTMLElement>>('strip');

  private readonly prefersReducedMotion = signal(false);

  private rafId?: number;
  private resumeTimer?: ReturnType<typeof setTimeout>;
  private resizeObserver?: ResizeObserver;
  private lastFrameTime = 0;
  private lastScrollLeft = 0;
  private lastProgrammaticAt = 0;
  private loopStarted = false;

  constructor() {
    afterNextRender(() => {
      this.prefersReducedMotion.set(
        this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false,
      );
      this.startLoop();
      this.observeStripSize();
    });

    effect(() => {
      const src = this.lightboxSrc();
      const panel = this.lightboxPanel()?.nativeElement;
      if (!src || !panel) {
        return;
      }
      if (panel.parentElement !== this.document.body) {
        this.document.body.appendChild(panel);
      }
    });
  }

  protected loading(index: number): 'eager' | 'lazy' {
    return index < EAGER_COUNT ? 'eager' : 'lazy';
  }

  protected open(src: string): void {
    this.lightboxSrc.set(src);
    this.document.body.style.overflow = 'hidden';
  }

  protected close(): void {
    this.lightboxSrc.set(null);
    this.document.body.style.overflow = '';
  }

  protected onScroll(): void {
    const el = this.strip()?.nativeElement;
    if (!el) {
      return;
    }

    this.wrapScroll(el);

    if (!this.isProgrammaticScroll()) {
      this.pauseForManualUse();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.lightboxSrc()) {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.stopLoop();
    clearTimeout(this.resumeTimer);
    this.resizeObserver?.disconnect();
    this.document.body.style.overflow = '';
  }

  private startLoop(): void {
    if (this.loopStarted) {
      return;
    }
    this.loopStarted = true;

    const tick = (now: number) => {
      const el = this.strip()?.nativeElement;

      if (el && this.shouldAutoScroll()) {
        if (!this.lastFrameTime) {
          this.lastFrameTime = now;
        }

        const delta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        const half = el.scrollWidth / 2;
        if (half > 0) {
          const pxPerMs = half / (this.durationSeconds() * 1000);
          this.markProgrammaticScroll();
          el.scrollLeft += pxPerMs * delta;
          this.wrapScroll(el);
        }
      } else {
        this.lastFrameTime = 0;
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private stopLoop(): void {
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }
  }

  private shouldAutoScroll(): boolean {
    return !this.prefersReducedMotion() && !this.lightboxSrc() && !this.userPaused();
  }

  private pauseForManualUse(): void {
    this.userPaused.set(true);
    clearTimeout(this.resumeTimer);
    this.resumeTimer = setTimeout(() => this.userPaused.set(false), MANUAL_PAUSE_MS);
  }

  /** Ignore scroll events fired by our own scrollLeft updates (sync and async). */
  private markProgrammaticScroll(): void {
    this.lastProgrammaticAt = performance.now();
  }

  private isProgrammaticScroll(): boolean {
    return performance.now() - this.lastProgrammaticAt < 80;
  }

  private wrapScroll(el: HTMLElement): void {
    const half = el.scrollWidth / 2;
    if (half <= 0) {
      return;
    }

    const delta = el.scrollLeft - this.lastScrollLeft;

    if (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    } else if (delta < 0 && el.scrollLeft < 8) {
      el.scrollLeft += half;
    }

    this.lastScrollLeft = el.scrollLeft;
  }

  private observeStripSize(): void {
    const el = this.strip()?.nativeElement;
    if (!el) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.markProgrammaticScroll();
      this.wrapScroll(el);
    });
    this.resizeObserver.observe(el);
  }
}
