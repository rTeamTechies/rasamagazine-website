import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-archives',
  imports: [RouterLink, HCarousel],
  templateUrl: './archives.html',
  styleUrl: './archives.scss',
})
export class Archives {}
