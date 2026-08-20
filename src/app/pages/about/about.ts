import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ArticleBack } from '../../shared/article-back/article-back';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe, ArticleBack],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly site$ = inject(ContentService).getSite();

  /** Eight-way rotation for layered floral petals (degrees). */
  readonly petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  readonly paragraphs = [
    'I am a Masters Graduate in the field of Communication and Journalism from Somaiya Vidyavihar University.',
    'I have always been fascinated by the world of arts and I too draw myself but its not of any good quality. But I decided tp start RASA as a way of documenting the events I watch and because of my love for the artistic world as well.',
    'I am also a nano content creator with 2k+ followers on instagram and I hope to make it full time for me as I engage with comedy sketches and funny videos.',
    'I am currently open to work and am equipped with good communication skills, good and basic designing skills and a keen interest for research!',
    'I am hoping to make RASA a proper established magazine in the future!',
  ];
}
