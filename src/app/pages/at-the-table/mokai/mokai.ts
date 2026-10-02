import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-mokai',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './mokai.html',
  styleUrl: './mokai.scss',
})
export class Mokai {}
