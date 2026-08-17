import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-link',
  imports: [RouterLink],
  template: `<a class="back-link" [routerLink]="to">BACK</a>`,
  styles: [
    `
      :host {
        display: block;
      }
      .back-link {
        display: inline-block;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        text-decoration: underline;
        text-underline-offset: 4px;
        font-weight: 700;
      }
    `,
  ],
})
export class BackLink {
  @Input() to = '/';
}
