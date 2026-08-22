import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-cup-o-carnatic',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './cup-o-carnatic.html',
  styleUrl: './cup-o-carnatic.scss',
})
export class CupOCarnatic {}
