import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import {
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

  getMagazine(id: string): Observable<MagazineIssue | undefined> {
    return this.magazines$.pipe(map((issues) => issues.find((i) => i.id === id)));
  }

  getVideos(): Observable<VideosIndex> {
    return this.videos$;
  }
}
