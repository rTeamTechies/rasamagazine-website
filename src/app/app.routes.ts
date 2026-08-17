import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Magazine } from './pages/magazine/magazine';
import { Articles } from './pages/articles/articles';
import { Category } from './pages/category/category';
import { Article } from './pages/article/article';
import { Videos } from './pages/videos/videos';
import { Partnership } from './pages/partnership/partnership';

export const routes: Routes = [
  { path: '', component: Home, title: 'RASA Magazine' },
  { path: 'about-me', component: About, title: 'About Me | RASA' },
  { path: 'magazine', component: Magazine, title: 'Magazine | RASA' },
  { path: 'articles', component: Articles, title: 'Articles | RASA' },
  { path: 'archives', component: Category, data: { category: 'archives' }, title: 'Archives | RASA' },
  { path: 'community', component: Category, data: { category: 'community' }, title: 'Community | RASA' },
  { path: 'culture', component: Category, data: { category: 'culture' }, title: 'Culture | RASA' },
  { path: 'article/:slug', component: Article },
  { path: 'videos', component: Videos, title: 'Videos | RASA' },
  {
    path: 'partnership-contact',
    component: Partnership,
    title: 'Partnership & Contact | RASA',
  },
  { path: '**', redirectTo: '' },
];
