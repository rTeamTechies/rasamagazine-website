import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-shivaji-park',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './shivaji-park.html',
  styleUrl: './shivaji-park.scss',
})
export class ShivajiPark {}
