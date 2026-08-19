import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-community',
  imports: [RouterLink, HCarousel],
  templateUrl: './community.html',
  styleUrl: './community.scss',
})
export class Community {}
