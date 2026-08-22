import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-living-the-dance',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './living-the-dance.html',
  styleUrl: './living-the-dance.scss',
})
export class LivingTheDance {}
