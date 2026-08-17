import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { BackLink } from '../../shared/back-link/back-link';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-magazine',
  imports: [BackLink, AsyncPipe, HCarousel],
  templateUrl: './magazine.html',
  styleUrl: './magazine.scss',
})
export class Magazine {
  private readonly content = inject(ContentService);
  readonly site$ = this.content.getSite();
  readonly issues$ = this.content.getMagazines();
}
