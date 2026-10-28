import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-hindustani-classical-music',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './hindustani-classical-music.html',
  styleUrl: './hindustani-classical-music.scss',
})
export class HindustaniClassicalMusic {}
