import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-evening-of-aharya',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './evening-of-aharya.html',
  styleUrl: './evening-of-aharya.scss',
})
export class EveningOfAharya implements AfterViewInit, OnDestroy {
  private readonly clips = viewChildren<ElementRef<HTMLVideoElement>>('clip');
  private readonly observers: IntersectionObserver[] = [];

  ngAfterViewInit(): void {
    for (const ref of this.clips()) {
      const video = ref.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const tryPlay = () => {
        video.muted = true;
        void video.play().catch(() => undefined);
      };

      video.addEventListener('loadeddata', tryPlay);
      video.addEventListener('canplay', tryPlay);

      const observer = new IntersectionObserver(
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
      observer.observe(video);
      this.observers.push(observer);

      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.load();
      }
    }
  }

  ngOnDestroy(): void {
    for (const observer of this.observers) {
      observer.disconnect();
    }
  }
}
