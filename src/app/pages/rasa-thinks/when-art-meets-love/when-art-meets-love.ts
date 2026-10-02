import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-when-art-meets-love',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './when-art-meets-love.html',
  styleUrl: './when-art-meets-love.scss',
})
export class WhenArtMeetsLove {}
