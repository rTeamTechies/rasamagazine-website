import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { ArticleBack } from '../../shared/article-back/article-back';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-partnership',
  imports: [AsyncPipe, HCarousel, RouterLink, ArticleBack],
  templateUrl: './partnership.html',
  styleUrl: './partnership.scss',
})
export class Partnership {
  private readonly content = inject(ContentService);
  readonly site$ = this.content.getSite();
  readonly page$ = this.content.getPartnership();
}
