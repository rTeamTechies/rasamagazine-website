import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-project-hail-mary',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './project-hail-mary.html',
  styleUrl: './project-hail-mary.scss',
})
export class ProjectHailMary {}
