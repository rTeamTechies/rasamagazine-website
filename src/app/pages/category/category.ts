import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { BackLink } from '../../shared/back-link/back-link';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-category',
  imports: [RouterLink, BackLink, AsyncPipe, HCarousel],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  private readonly categoryId$ = this.route.data.pipe(
    map((d) => (d['category'] as string) || 'archives'),
  );

  readonly category$ = this.categoryId$.pipe(
    switchMap((id) =>
      this.content.getArticlesIndex().pipe(
        map((index) => index.categories.find((c) => c.id === id) ?? index.categories[0]),
      ),
    ),
  );

  readonly posts$ = this.categoryId$.pipe(
    switchMap((id) => this.content.getArticlesByCategory(id)),
  );

  readonly backTo = '/articles';
}
