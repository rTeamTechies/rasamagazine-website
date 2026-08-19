import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Magazine } from './pages/magazine/magazine';
import { Articles } from './pages/articles/articles';
import { Archives } from './pages/archives/archives';
import { SpiritualOdyssey } from './pages/archives/spiritual-odyssey/spiritual-odyssey';
import { CallOfTheFlute } from './pages/archives/call-of-the-flute/call-of-the-flute';
import { EveningOfAharya } from './pages/archives/evening-of-aharya/evening-of-aharya';
import { Community } from './pages/community/community';
import { QueerCommunity } from './pages/community/queer-community/queer-community';
import { AshadiEkadashi } from './pages/community/ashadi-ekadashi/ashadi-ekadashi';
import { Culture } from './pages/culture/culture';
import { RanjaniGayatri } from './pages/culture/ranjani-gayatri/ranjani-gayatri';
import { RathaYatra } from './pages/culture/ratha-yatra/ratha-yatra';
import { Videos } from './pages/videos/videos';
import { Partnership } from './pages/partnership/partnership';
import { MagazineReader } from './pages/magazine-reader/magazine-reader';

export const routes: Routes = [
  { path: '', component: Home, title: 'RASA Magazine' },
  { path: 'about-me', component: About, title: 'About Me | RASA' },
  { path: 'magazine', component: Magazine, title: 'Magazine | RASA' },
  { path: 'magazine/:id', component: MagazineReader, title: 'Read | RASA' },
  { path: 'articles', component: Articles, title: 'Articles | RASA' },
  { path: 'archives', component: Archives, title: 'Archives | RASA' },
  {
    path: 'archives/spiritual-odyssey',
    component: SpiritualOdyssey,
    title: 'A Spiritual Odyssey | RASA',
  },
  {
    path: 'archives/call-of-the-flute',
    component: CallOfTheFlute,
    title: 'Call of the Flute | RASA',
  },
  {
    path: 'archives/evening-of-aharya',
    component: EveningOfAharya,
    title: 'An Evening of Aharya | RASA',
  },
  { path: 'community', component: Community, title: 'Community | RASA' },
  {
    path: 'community/queer-community',
    component: QueerCommunity,
    title: 'Queer Community | RASA',
  },
  {
    path: 'community/ashadi-ekadashi',
    component: AshadiEkadashi,
    title: 'Ashadi Ekadashi | RASA',
  },
  { path: 'culture', component: Culture, title: 'Culture | RASA' },
  {
    path: 'culture/ranjani-gayatri',
    component: RanjaniGayatri,
    title: 'Ranjani-Gayatri | RASA',
  },
  {
    path: 'culture/ratha-yatra',
    component: RathaYatra,
    title: 'Ratha Yatra | RASA',
  },
  { path: 'videos', component: Videos, title: 'Videos | RASA' },
  {
    path: 'partnership-contact',
    component: Partnership,
    title: 'Partnership & Contact | RASA',
  },
  { path: '**', redirectTo: '' },
];
