import { Component } from '@angular/core';
import { ArticleBack } from '../../../shared/article-back/article-back';
import { ArticleAtmosphere } from '../../../shared/article-atmosphere/article-atmosphere';

@Component({
  selector: 'app-bhavonmeelanam',
  imports: [ArticleBack, ArticleAtmosphere],
  templateUrl: './bhavonmeelanam.html',
  styleUrl: './bhavonmeelanam.scss',
})
export class Bhavonmeelanam {}
