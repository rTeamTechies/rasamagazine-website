import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Flower } from '../flower/flower';

export type AtmosphereMode = 'hub' | 'reading';

@Component({
  selector: 'app-article-atmosphere',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Flower],
  templateUrl: './article-atmosphere.html',
  styleUrl: './article-atmosphere.scss',
  host: {
    class: 'article-atmosphere',
    '[class.is-hub]': "mode() === 'hub'",
    '[class.is-reading]': "mode() === 'reading'",
    'aria-hidden': 'true',
  },
})
export class ArticleAtmosphere {
  /** Hub = category listings; reading = long-form article pages (edge-only blooms). */
  readonly mode = input<AtmosphereMode>('reading');
}
