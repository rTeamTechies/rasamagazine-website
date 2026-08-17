import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { BackLink } from '../../shared/back-link/back-link';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-articles',
  imports: [RouterLink, BackLink, AsyncPipe, HCarousel],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  readonly index$ = inject(ContentService).getArticlesIndex();
}
