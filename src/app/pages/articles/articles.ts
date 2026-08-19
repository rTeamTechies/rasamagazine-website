import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-articles',
  imports: [RouterLink, HCarousel],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {}
