import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Flower } from '../../shared/flower/flower';
import { GalleryStrip } from '../../shared/gallery-strip/gallery-strip';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, HCarousel, Flower, GalleryStrip],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly content = inject(ContentService);

  readonly site$ = this.content.getSite();
}
