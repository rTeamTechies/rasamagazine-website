import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SITE_ORIGIN = 'https://www.rasamagazine.com';
const DEFAULT_DESCRIPTION =
  'Rasa is a digital magazine dedicated to the arts, culture, heritage, and the stories that shape our world.';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/images/brand/rasa-favicon-192.png`;
const PAGE_JSON_LD_ID = 'page-jsonld';

export type SeoData = {
  description: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.update());
    this.update();
  }

  private update(): void {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.snapshot.data as Partial<SeoData>;
    const pageTitle = route.snapshot.title ?? this.title.getTitle() ?? 'RASA Magazine';
    const description = data.description ?? DEFAULT_DESCRIPTION;
    const path = this.router.url.split('?')[0].split('#')[0];
    const url = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
    const isArticle = data.type === 'article';
    const image = this.absoluteImage(data.image);

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:type', content: isArticle ? 'article' : 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'RASA Magazine' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: pageTitle });
    this.meta.updateTag({
      name: 'twitter:card',
      content: data.image ? 'summary_large_image' : 'summary',
    });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.setCanonical(url);
    this.setPageJsonLd({
      isArticle,
      pageTitle,
      description,
      url,
      image: data.image ? image : undefined,
      author: data.author,
    });
  }

  private absoluteImage(path?: string): string {
    if (!path) {
      return DEFAULT_OG_IMAGE;
    }
    if (path.startsWith('http')) {
      return path;
    }
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_ORIGIN}${normalized}`;
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setPageJsonLd(opts: {
    isArticle: boolean;
    pageTitle: string;
    description: string;
    url: string;
    image?: string;
    author?: string;
  }): void {
    const existing = this.document.getElementById(PAGE_JSON_LD_ID);
    if (!opts.isArticle) {
      existing?.remove();
      return;
    }

    const headline = opts.pageTitle.replace(/\s*\|\s*RASA Magazine\s*$/i, '').trim();
    const payload: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      description: opts.description,
      mainEntityOfPage: opts.url,
      url: opts.url,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    };
    if (opts.image) {
      payload['image'] = [opts.image];
    }
    if (opts.author) {
      payload['author'] = { '@type': 'Person', name: opts.author };
    }

    let script = existing as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = PAGE_JSON_LD_ID;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);
  }
}
