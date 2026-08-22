import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-ratha-yatra',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './ratha-yatra.html',
  styleUrl: './ratha-yatra.scss',
})
export class RathaYatra {}
