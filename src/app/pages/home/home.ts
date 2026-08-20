import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { HomeHeroVisual } from '../../data/models';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, NgClass, HCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);
  private slideTimer: ReturnType<typeof setInterval> | null = null;
  private siteSub: Subscription | null = null;
  private visualsCount = 0;
  private paused = false;

  readonly site$ = this.content.getSite();
  readonly slideIntervalMs = 4500;

  activeIndex = 0;

  ngOnInit(): void {
    this.siteSub = this.site$.subscribe((site) => {
      this.visualsCount = site.home.heroVisuals.length;
      this.restartAutoSlide();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.siteSub?.unsubscribe();
  }

  fanClass(index: number, visuals: HomeHeroVisual[]): string {
    const len = visuals.length;
    if (!len) return 'is-hidden';
    const offset = (index - this.activeIndex + len) % len;
    if (offset === 0) return 'is-center';
    if (offset === 1) return 'is-right';
    if (offset === len - 1) return 'is-left';
    return 'is-hidden';
  }

  prev(visuals: HomeHeroVisual[]): void {
    if (!visuals.length) return;
    this.activeIndex = (this.activeIndex - 1 + visuals.length) % visuals.length;
    this.restartAutoSlide();
  }

  next(visuals: HomeHeroVisual[]): void {
    if (!visuals.length) return;
    this.activeIndex = (this.activeIndex + 1) % visuals.length;
    this.restartAutoSlide();
  }

  select(index: number): void {
    this.activeIndex = index;
    this.restartAutoSlide();
  }

  pauseAutoSlide(): void {
    this.paused = true;
    this.stopAutoSlide();
  }

  resumeAutoSlide(): void {
    this.paused = false;
    this.restartAutoSlide();
  }

  private restartAutoSlide(): void {
    this.stopAutoSlide();
    if (this.paused || this.visualsCount <= 1) {
      return;
    }
    this.slideTimer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.visualsCount;
    }, this.slideIntervalMs);
  }

  private stopAutoSlide(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
      this.slideTimer = null;
    }
  }
}
