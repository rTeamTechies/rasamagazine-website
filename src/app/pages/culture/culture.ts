import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';

@Component({
  selector: 'app-culture',
  imports: [RouterLink, HCarousel, ArticleBack],
  templateUrl: './culture.html',
  styleUrl: './culture.scss',
})
export class Culture {}
