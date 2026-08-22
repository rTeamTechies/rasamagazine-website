import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from '../../services/content.service';
import { ArticleBack } from '../../shared/article-back/article-back';
import { Flower } from '../../shared/flower/flower';

type VideoSlot = {
  id: string;
  title: string;
  description: string;
  playlistUrl: string;
  embedUrl: string;
  active: boolean;
  embed: SafeResourceUrl;
};

@Component({
  selector: 'app-videos',
  imports: [ArticleBack, Flower],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos implements AfterViewInit, OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly content = inject(ContentService);
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  intro = '';
  series: VideoSlot[] = [];

  @ViewChildren('player') private readonly players!: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;
  private activeId: string | null = null;

  constructor() {
    this.content
      .getVideos()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.intro = data.intro;
        this.series = data.series.map((s) => ({
          ...s,
          active: false,
          embed: this.toSafe(this.buildUrl(s.embedUrl, false)),
        }));
        this.cdr.markForCheck();
        queueMicrotask(() => this.observePlayers());
      });
  }

  ngAfterViewInit(): void {
    const sub = this.players.changes.subscribe(() => this.observePlayers());
    this.destroyRef.onDestroy(() => sub.unsubscribe());
    this.observePlayers();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observePlayers(): void {
    this.observer?.disconnect();
    if (!this.players?.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        this.zone.run(() => {
          const visible = entries
            .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.45)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length) {
            const id = (visible[0].target as HTMLElement).dataset['videoId'] ?? null;
            if (id) this.setActive(id);
            return;
          }

          for (const entry of entries) {
            if (!entry.isIntersecting) {
              const id = (entry.target as HTMLElement).dataset['videoId'];
              if (id && this.activeId === id) this.setActive(null);
            }
          }
        });
      },
      { threshold: [0, 0.45, 0.6, 0.8], rootMargin: '0px 0px -10% 0px' },
    );

    this.players.forEach((ref) => this.observer!.observe(ref.nativeElement));
  }

  private setActive(id: string | null): void {
    if (this.activeId === id) return;
    this.activeId = id;
    this.series = this.series.map((s) => {
      const active = s.id === id;
      return {
        ...s,
        active,
        embed: this.toSafe(this.buildUrl(s.embedUrl, active)),
      };
    });
    this.cdr.markForCheck();
  }

  private buildUrl(embedUrl: string, autoplay: boolean): string {
    const url = new URL(embedUrl);
    url.searchParams.set('rel', '0');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('mute', '1');
    if (autoplay) {
      url.searchParams.set('autoplay', '1');
      // Force a fresh load so YouTube restarts when scrolled back into view.
      url.searchParams.set('ts', String(Date.now()));
    } else {
      url.searchParams.delete('autoplay');
      url.searchParams.delete('ts');
    }
    return url.toString();
  }

  private toSafe(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
