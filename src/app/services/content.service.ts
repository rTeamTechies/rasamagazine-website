import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, shareReplay, switchMap } from 'rxjs';
import {
  ArticlePost,
  ArticlesIndex,
  MagazineIssue,
  PartnershipContent,
  SiteContent,
  VideosIndex,
} from '../data/models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  private readonly site$ = this.http
    .get<SiteContent>('content/site.json')
    .pipe(shareReplay(1));

  private readonly partnership$ = this.http
    .get<PartnershipContent>('content/partnership.json')
    .pipe(shareReplay(1));

  private readonly magazines$ = this.http
    .get<MagazineIssue[]>('content/magazines/index.json')
    .pipe(
      map((issues) => issues.filter((i) => i.published).sort((a, b) => a.volume - b.volume)),
      shareReplay(1),
    );

  private readonly articlesIndex$ = this.http
    .get<ArticlesIndex>('content/articles/index.json')
    .pipe(shareReplay(1));

  private readonly articles$ = this.http
    .get<string[]>('content/articles/manifest.json')
    .pipe(
      switchMap((paths) => {
        if (!paths.length) return of([] as ArticlePost[]);
        return forkJoin(
          paths.map((path) => this.http.get<ArticlePost>(`content/articles/${path}`)),
        );
      }),
      map((posts) => posts.filter((p) => p.published)),
      shareReplay(1),
    );

  private readonly videos$ = this.http
    .get<VideosIndex>('content/videos/index.json')
    .pipe(shareReplay(1));

  getSite(): Observable<SiteContent> {
    return this.site$;
  }

  getPartnership(): Observable<PartnershipContent> {
    return this.partnership$;
  }

  getMagazines(): Observable<MagazineIssue[]> {
    return this.magazines$;
  }

  getArticlesIndex(): Observable<ArticlesIndex> {
    return this.articlesIndex$;
  }

  getArticles(): Observable<ArticlePost[]> {
    return this.articles$;
  }

  getArticlesByCategory(categoryId: string): Observable<ArticlePost[]> {
    return this.articles$.pipe(
      map((posts) => posts.filter((p) => p.category === categoryId)),
    );
  }

  getArticle(slug: string): Observable<ArticlePost | undefined> {
    return this.articles$.pipe(map((posts) => posts.find((p) => p.slug === slug)));
  }

  getVideos(): Observable<VideosIndex> {
    return this.videos$;
  }
}
