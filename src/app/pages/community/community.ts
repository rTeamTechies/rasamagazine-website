import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';
import { ArticleBack } from '../../shared/article-back/article-back';

@Component({
  selector: 'app-community',
  imports: [RouterLink, HCarousel, ArticleBack],
  templateUrl: './community.html',
  styleUrl: './community.scss',
})
export class Community {}
