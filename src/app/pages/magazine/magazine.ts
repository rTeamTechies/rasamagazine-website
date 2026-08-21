import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { MagazineIssue } from '../../data/models';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';

@Component({
  selector: 'app-magazine',
  imports: [AsyncPipe, HCarousel, RouterLink, ArticleBack],
  templateUrl: './magazine.html',
  styleUrl: './magazine.scss',
})
export class Magazine {
  private readonly content = inject(ContentService);
  readonly site$ = this.content.getSite();
  readonly issues$ = this.content.getMagazines();

  hasPdf(issue: MagazineIssue): boolean {
    return (
      (!!issue.pagesBase?.trim() && (issue.pageCount ?? 0) > 0) ||
      !!issue.driveUrl?.trim() ||
      !!issue.pdfUrl?.trim()
    );
  }
}
