import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-mumbai-city-of-dreams',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './mumbai-city-of-dreams.html',
  styleUrl: './mumbai-city-of-dreams.scss',
})
export class MumbaiCityOfDreams {}
