import {
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

/**
 * Continuously scrolling photo strip. The track holds two copies of the same
 * photos and slides by exactly half its width, so the loop never shows a seam.
 * Clicking a photo opens a lightbox (ported to document.body so page sections
 * with overflow / stacking cannot clip or cover it).
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
  private readonly lightboxPanel = viewChild<ElementRef<HTMLElement>>('lightboxPanel');

  constructor() {
    // Keep the dialog under <body> so intro-band overflow / z-index cannot trap it.
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

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.lightboxSrc()) {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
