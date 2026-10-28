import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-celebrating-tagores-legacy',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './celebrating-tagores-legacy.html',
  styleUrl: './celebrating-tagores-legacy.scss',
})
export class CelebratingTagoresLegacy {}
