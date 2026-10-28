import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-lagna-panchami',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './lagna-panchami.html',
  styleUrl: './lagna-panchami.scss',
})
export class LagnaPanchami {}
