import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-why-mumbai-deserves-better',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './why-mumbai-deserves-better.html',
  styleUrl: './why-mumbai-deserves-better.scss',
})
export class WhyMumbaiDeservesBetter {}
