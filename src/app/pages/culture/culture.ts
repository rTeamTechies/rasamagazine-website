import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-culture',
  imports: [RouterLink, HCarousel],
  templateUrl: './culture.html',
  styleUrl: './culture.scss',
})
export class Culture {}
