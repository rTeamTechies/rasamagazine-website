import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-magazine-reader',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './magazine-reader.html',
  styleUrl: './magazine-reader.scss',
})
export class MagazineReader {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly issue$ = this.route.paramMap.pipe(
    map((p) => p.get('id') ?? ''),
    switchMap((id) => this.content.getMagazine(id)),
  );

  pdfSrc(pdfUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }
}
