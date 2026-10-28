import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-dough-and-joes',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './dough-and-joes.html',
  styleUrl: './dough-and-joes.scss',
})
export class DoughAndJoes {}
