import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-guest-voices',
  imports: [RouterLink, HCarousel, ArticleBack, ArticleAtmosphere],
  templateUrl: './guest-voices.html',
  styleUrl: './guest-voices.scss',
})
export class GuestVoices {}
