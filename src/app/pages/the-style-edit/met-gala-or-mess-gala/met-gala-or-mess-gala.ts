import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-met-gala-or-mess-gala',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './met-gala-or-mess-gala.html',
  styleUrl: './met-gala-or-mess-gala.scss',
})
export class MetGalaOrMessGala {}
