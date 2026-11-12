import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { SeoData } from '../../services/seo.service';

export const magazineIssueTitle: ResolveFn<string> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  return inject(ContentService)
    .getMagazine(id)
    .pipe(map((issue) => (issue ? `${issue.title} | RASA Magazine` : 'Read | RASA Magazine')));
};

export const magazineIssueSeo: ResolveFn<SeoData> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  return inject(ContentService)
    .getMagazine(id)
    .pipe(
      map((issue) => {
        if (!issue) {
          return {
            description:
              'Open a RASA Magazine issue in the flip-book viewer and read pages like a print edition.',
          };
        }

        return {
          description: `Read ${issue.title} online — Volume ${issue.volume}, ${issue.month} ${issue.year}. Flip through the digital magazine viewer.`,
          image: issue.cover,
        };
      }),
    );
};
