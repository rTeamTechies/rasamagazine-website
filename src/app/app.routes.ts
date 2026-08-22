import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Magazine } from './pages/magazine/magazine';
import { Articles } from './pages/articles/articles';
import { Archives } from './pages/archives/archives';
import { SpiritualOdyssey } from './pages/archives/spiritual-odyssey/spiritual-odyssey';
import { CallOfTheFlute } from './pages/archives/call-of-the-flute/call-of-the-flute';
import { EveningOfAharya } from './pages/archives/evening-of-aharya/evening-of-aharya';
import { LivingTheDance } from './pages/archives/living-the-dance/living-the-dance';
import { CupOCarnatic } from './pages/archives/cup-o-carnatic/cup-o-carnatic';
import { EkTichiGoshta } from './pages/archives/ek-tichi-goshta/ek-tichi-goshta';
import { MadhavamMahadevam } from './pages/archives/madhavam-mahadevam/madhavam-mahadevam';
import { VaibhavArekarStudents } from './pages/archives/vaibhav-arekar-students/vaibhav-arekar-students';
import { Vakrakara } from './pages/archives/vakrakara/vakrakara';
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
  { path: 'articles/archives', component: Archives, title: 'Archives | RASA' },
  {
    path: 'articles/archives/spiritual-odyssey',
    component: SpiritualOdyssey,
    title: 'A Spiritual Odyssey | RASA',
  },
  {
    path: 'articles/archives/call-of-the-flute',
    component: CallOfTheFlute,
    title: 'Call of the Flute | RASA',
  },
  {
    path: 'articles/archives/evening-of-aharya',
    component: EveningOfAharya,
    title: 'An Evening of Aharya | RASA',
  },
  {
    path: 'articles/archives/living-the-dance',
    component: LivingTheDance,
    title: 'Living the Dance | RASA',
  },
  {
    path: 'articles/archives/cup-o-carnatic',
    component: CupOCarnatic,
    title: "Cup O' Carnatic | RASA",
  },
  {
    path: 'articles/archives/ek-tichi-goshta',
    component: EkTichiGoshta,
    title: 'Ek Tichi Goshta | RASA',
  },
  {
    path: 'articles/archives/madhavam-mahadevam',
    component: MadhavamMahadevam,
    title: 'Madhavam Mahadevam | RASA',
  },
  {
    path: 'articles/archives/vaibhav-arekar-students',
    component: VaibhavArekarStudents,
    title: 'Vaibhav Arekar Students | RASA',
  },
  {
    path: 'articles/archives/vakrakara',
    component: Vakrakara,
    title: 'Vakrākāra | RASA',
  },
  { path: 'articles/community', component: Community, title: 'Community | RASA' },
  {
    path: 'articles/community/queer-community',
    component: QueerCommunity,
    title: 'Queer Community | RASA',
  },
  {
    path: 'articles/community/ashadi-ekadashi',
    component: AshadiEkadashi,
    title: 'Ashadi Ekadashi | RASA',
  },
  { path: 'articles/culture', component: Culture, title: 'Culture | RASA' },
  {
    path: 'articles/culture/ranjani-gayatri',
    component: RanjaniGayatri,
    title: 'Ranjani-Gayatri | RASA',
  },
  {
    path: 'articles/culture/ratha-yatra',
    component: RathaYatra,
    title: 'Ratha Yatra | RASA',
  },
  { path: 'archives', redirectTo: 'articles/archives', pathMatch: 'full' },
  { path: 'archives/:article', redirectTo: 'articles/archives/:article' },
  { path: 'community', redirectTo: 'articles/community', pathMatch: 'full' },
  { path: 'community/:article', redirectTo: 'articles/community/:article' },
  { path: 'culture', redirectTo: 'articles/culture', pathMatch: 'full' },
  { path: 'culture/:article', redirectTo: 'articles/culture/:article' },
  { path: 'videos', component: Videos, title: 'Videos | RASA' },
  {
    path: 'partnership-contact',
    component: Partnership,
    title: 'Partnership & Contact | RASA',
  },
  { path: '**', redirectTo: '' },
];
