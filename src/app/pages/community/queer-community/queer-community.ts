import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-queer-community',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './queer-community.html',
  styleUrl: './queer-community.scss',
})
export class QueerCommunity {}
