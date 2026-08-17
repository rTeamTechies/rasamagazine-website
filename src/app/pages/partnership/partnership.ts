import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { BackLink } from '../../shared/back-link/back-link';
import { HCarousel } from '../../shared/h-carousel/h-carousel';

@Component({
  selector: 'app-partnership',
  imports: [AsyncPipe, BackLink, HCarousel],
  templateUrl: './partnership.html',
  styleUrl: './partnership.scss',
})
export class Partnership {
  private readonly content = inject(ContentService);
  readonly site$ = this.content.getSite();
  readonly page$ = this.content.getPartnership();
}
