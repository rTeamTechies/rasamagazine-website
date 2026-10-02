import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-reel-reflections',
  imports: [RouterLink, HCarousel, ArticleBack, ArticleAtmosphere],
  templateUrl: './reel-reflections.html',
  styleUrl: './reel-reflections.scss',
})
export class ReelReflections {}
