import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Seconds each photo takes to cross the strip. Keeps the pace even as photos are added. */
const SECONDS_PER_IMAGE = 4;

/** Photos beyond this load lazily — they are off-screen until the strip scrolls to them. */
const EAGER_COUNT = 10;

/**
 * Continuously scrolling photo strip. The track holds two copies of the same
 * photos and slides by exactly half its width, so the loop never shows a seam.
 */
@Component({
  selector: 'app-gallery-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery-strip.html',
  styleUrl: './gallery-strip.scss',
})
export class GalleryStrip {
  readonly images = input.required<string[]>();
  readonly label = input('Photo gallery');

  protected readonly durationSeconds = computed(() => this.images().length * SECONDS_PER_IMAGE);

  protected loading(index: number): 'eager' | 'lazy' {
    return index < EAGER_COUNT ? 'eager' : 'lazy';
  }
}
