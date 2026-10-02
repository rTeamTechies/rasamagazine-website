import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-at-the-table',
  imports: [RouterLink, HCarousel, ArticleBack, ArticleAtmosphere],
  templateUrl: './at-the-table.html',
  styleUrl: './at-the-table.scss',
})
export class AtTheTable {}
