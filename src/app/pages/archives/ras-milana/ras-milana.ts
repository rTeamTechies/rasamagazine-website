import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-ras-milana',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './ras-milana.html',
  styleUrl: './ras-milana.scss',
})
export class RasMilana {}
