import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-site-footer',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  private readonly content = inject(ContentService);

  readonly site$ = this.content.getSite();

  readonly exploreLinks = [
    { label: 'Magazine', path: '/magazine' },
    { label: 'Articles', path: '/articles' },
    { label: 'Videos', path: '/videos' },
    { label: 'About', path: '/about-me' },
  ] as const;
}
