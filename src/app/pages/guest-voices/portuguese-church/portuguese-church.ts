import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-portuguese-church',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './portuguese-church.html',
  styleUrl: './portuguese-church.scss',
})
export class PortugueseChurch {}
