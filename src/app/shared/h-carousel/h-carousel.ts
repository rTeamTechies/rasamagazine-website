import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'app-h-carousel',
  templateUrl: './h-carousel.html',
  styleUrl: './h-carousel.scss',
})
export class HCarousel implements AfterViewInit, OnDestroy {
  /** Fraction of one slide width to scroll per arrow click. */
  readonly stepFactor = input(0.9);

  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLElement>;

  canPrev = false;
  canNext = false;

  private readonly cdr = inject(ChangeDetectorRef);
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    const track = this.trackRef.nativeElement;
    this.updateEdges();
    this.resizeObserver = new ResizeObserver(() => this.updateEdges());
    this.resizeObserver.observe(track);
    requestAnimationFrame(() => this.updateEdges());
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  onScroll(): void {
    this.updateEdges();
  }

  scroll(direction: -1 | 1): void {
    const track = this.trackRef.nativeElement;
    const amount = this.slideStep(track) * direction;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  private slideStep(track: HTMLElement): number {
    const first = track.children.item(0) as HTMLElement | null;
    if (!first) return track.clientWidth * 0.8;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return (first.offsetWidth + gap) * this.stepFactor();
  }

  private updateEdges(): void {
    const track = this.trackRef.nativeElement;
    const max = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    this.canPrev = left > 4;
    this.canNext = left < max - 4;
    this.cdr.markForCheck();
  }
}
