import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';

@Component({
  selector: 'app-articles',
  imports: [RouterLink, HCarousel, ArticleBack],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {}
