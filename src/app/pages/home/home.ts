import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { HomeHeroVisual } from '../../data/models';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, NgClass, HCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly site$ = inject(ContentService).getSite();

  activeIndex = 0;

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
  }

  next(visuals: HomeHeroVisual[]): void {
    if (!visuals.length) return;
    this.activeIndex = (this.activeIndex + 1) % visuals.length;
  }

  select(index: number): void {
    this.activeIndex = index;
  }
}
