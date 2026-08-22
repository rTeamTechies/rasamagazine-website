import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-vakrakara',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './vakrakara.html',
  styleUrl: './vakrakara.scss',
})
export class Vakrakara {}
