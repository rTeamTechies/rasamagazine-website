import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe, HCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly site$ = inject(ContentService).getSite();
}
