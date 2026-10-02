import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-artist-in-focus',
  imports: [RouterLink, HCarousel, ArticleBack, ArticleAtmosphere],
  templateUrl: './artist-in-focus.html',
  styleUrl: './artist-in-focus.scss',
})
export class ArtistInFocus {}
