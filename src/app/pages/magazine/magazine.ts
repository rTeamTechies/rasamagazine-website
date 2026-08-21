import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { MagazineIssue } from '../../data/models';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';
import { Flower } from '../../shared/flower/flower';

@Component({
  selector: 'app-magazine',
  imports: [AsyncPipe, HCarousel, RouterLink, ArticleBack, Flower],
  templateUrl: './magazine.html',
  styleUrl: './magazine.scss',
})
export class Magazine {
  private readonly content = inject(ContentService);
  readonly site$ = this.content.getSite();
  readonly issues$ = this.content.getMagazines();

  hasPdf(issue: MagazineIssue): boolean {
    return !!issue.pdfUrl?.trim() || !!issue.driveUrl?.trim();
  }
}
