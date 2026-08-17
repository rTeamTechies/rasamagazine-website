import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { BackLink } from '../../shared/back-link/back-link';

@Component({
  selector: 'app-article',
  imports: [BackLink, AsyncPipe],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class Article {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  readonly state$ = this.route.paramMap.pipe(
    map((p) => p.get('slug') ?? ''),
    switchMap((slug) =>
      this.content.getArticle(slug).pipe(
        map((post) => ({ loaded: true as const, post })),
        startWith({ loaded: false as const, post: undefined }),
      ),
    ),
  );

  backTo(category: string): string {
    if (category === 'community') return '/community';
    if (category === 'culture') return '/culture';
    return '/archives';
  }

  isCredit(text: string): boolean {
    return /credits/i.test(text);
  }
}
