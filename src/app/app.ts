import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { SeoService } from './services/seo.service';
import { SiteFooter } from './shared/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteFooter],
  template: `
    <router-outlet />
    @if (!hideFooter()) {
      <app-site-footer />
    }
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        min-height: 100dvh;
      }
    `,
  ],
})
export class App {
  private readonly router = inject(Router);

  readonly hideFooter = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.isMagazineReader(event.urlAfterRedirects)),
      startWith(this.isMagazineReader(this.router.url)),
    ),
    { initialValue: false },
  );

  constructor() {
    inject(SeoService);
  }

  private isMagazineReader(url: string): boolean {
    return /^\/magazine\/[^/?#]+/.test(url.split('?')[0]);
  }
}
