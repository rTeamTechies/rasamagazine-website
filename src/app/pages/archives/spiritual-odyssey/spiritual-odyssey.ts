import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';

@Component({
  selector: 'app-spiritual-odyssey',
  imports: [ArticleBack],
  templateUrl: './spiritual-odyssey.html',
  styleUrl: './spiritual-odyssey.scss',
})
export class SpiritualOdyssey implements AfterViewInit, OnDestroy {
  private readonly clip = viewChild<ElementRef<HTMLVideoElement>>('clip');
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const video = this.clip()?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    this.observer.observe(video);

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.load();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
