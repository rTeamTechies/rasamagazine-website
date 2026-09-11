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

const seo = (description: string) => ({ description });

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'RASA Magazine',
    data: seo(
      'Rasa is a digital magazine dedicated to the arts, culture, heritage, and the stories that shape our world.',
    ),
  },
  {
    path: 'about-me',
    component: About,
    title: 'About Me | RASA Magazine',
    data: seo(
      'Meet Anjaneya Mulekar, editor of RASA Magazine — a digital publication exploring classical arts, culture, cinema, fashion and heritage.',
    ),
  },
  {
    path: 'magazine',
    component: Magazine,
    title: 'Magazine | RASA Magazine',
    data: seo(
      'Read RASA Magazine issues online. Browse editions covering arts, culture, reviews, interviews and guest writing.',
    ),
  },
  {
    path: 'magazine/:id',
    component: MagazineReader,
    title: 'Read | RASA Magazine',
    data: seo('Open a RASA Magazine issue in the flip-book viewer and read pages like a print edition.'),
  },
  {
    path: 'articles',
    component: Articles,
    title: 'Articles | RASA Magazine',
    data: seo(
      'Explore RASA articles beyond the magazine — events, community stories and culture features worth reading.',
    ),
  },
  {
    path: 'articles/archives',
    component: Archives,
    title: 'Events | RASA Magazine',
    data: seo('Archive of RASA event coverage — performances, festivals and past arts programmes.'),
  },
  {
    path: 'articles/archives/spiritual-odyssey',
    component: SpiritualOdyssey,
    title: 'A Spiritual Odyssey | RASA Magazine',
    data: seo('Read “A Spiritual Odyssey” on RASA Magazine, a feature on arts, culture and heritage.'),
  },
  {
    path: 'articles/archives/call-of-the-flute',
    component: CallOfTheFlute,
    title: 'Call of the Flute | RASA Magazine',
    data: seo('Read “Call of the Flute” on RASA Magazine, a feature on arts, culture and heritage.'),
  },
  {
    path: 'articles/archives/evening-of-aharya',
    component: EveningOfAharya,
    title: 'An Evening of Aharya | RASA Magazine',
    data: seo('Read “An Evening of Aharya” on RASA Magazine, a feature on arts, culture and heritage.'),
  },
  {
    path: 'articles/archives/living-the-dance',
    component: LivingTheDance,
    title: 'Living the Dance | RASA Magazine',
    data: seo('Read “Living the Dance” on RASA Magazine, a feature on dance, arts and cultural performance.'),
  },
  {
    path: 'articles/archives/cup-o-carnatic',
    component: CupOCarnatic,
    title: "Cup O' Carnatic | RASA Magazine",
    data: seo('Read “Cup O’ Carnatic” on RASA Magazine, a feature on Carnatic music and culture.'),
  },
  {
    path: 'articles/archives/ek-tichi-goshta',
    component: EkTichiGoshta,
    title: 'Ek Tichi Goshta | RASA Magazine',
    data: seo('Read “Ek Tichi Goshta” on RASA Magazine, a feature on arts, culture and heritage.'),
  },
  {
    path: 'articles/archives/madhavam-mahadevam',
    component: MadhavamMahadevam,
    title: 'Madhavam Mahadevam | RASA Magazine',
    data: seo('Read “Madhavam Mahadevam” on RASA Magazine, a feature on arts, culture and heritage.'),
  },
  {
    path: 'articles/archives/vaibhav-arekar-students',
    component: VaibhavArekarStudents,
    title: 'Vaibhav Arekar Students | RASA Magazine',
    data: seo('Read “Vaibhav Arekar Students” on RASA Magazine, a feature on dance, arts and performance.'),
  },
  {
    path: 'articles/archives/vakrakara',
    component: Vakrakara,
    title: 'Vakrākāra | RASA Magazine',
    data: seo('Read “Vakrākāra” on RASA Magazine, a feature on arts, culture and heritage.'),
  },
  {
    path: 'articles/community',
    component: Community,
    title: 'Community | RASA Magazine',
    data: seo('Community stories on RASA Magazine — people, gatherings and cultural life.'),
  },
  {
    path: 'articles/community/queer-community',
    component: QueerCommunity,
    title: 'Queer Community | RASA Magazine',
    data: seo('Read “Queer Community” on RASA Magazine, a community feature on arts and culture.'),
  },
  {
    path: 'articles/community/ashadi-ekadashi',
    component: AshadiEkadashi,
    title: 'Ashadi Ekadashi | RASA Magazine',
    data: seo('Read “Ashadi Ekadashi” on RASA Magazine, a community feature on festival and heritage.'),
  },
  {
    path: 'articles/culture',
    component: Culture,
    title: 'Culture | RASA Magazine',
    data: seo('Culture features on RASA Magazine — music, ritual, heritage and contemporary cultural life.'),
  },
  {
    path: 'articles/culture/ranjani-gayatri',
    component: RanjaniGayatri,
    title: 'Ranjani-Gayatri | RASA Magazine',
    data: seo('Read “Ranjani-Gayatri” on RASA Magazine, a culture feature on music and performance.'),
  },
  {
    path: 'articles/culture/ratha-yatra',
    component: RathaYatra,
    title: 'Ratha Yatra | RASA Magazine',
    data: seo('Read “Ratha Yatra” on RASA Magazine, a culture feature on festival and heritage.'),
  },
  { path: 'archives', redirectTo: 'articles/archives', pathMatch: 'full' },
  { path: 'archives/:article', redirectTo: 'articles/archives/:article' },
  { path: 'community', redirectTo: 'articles/community', pathMatch: 'full' },
  { path: 'community/:article', redirectTo: 'articles/community/:article' },
  { path: 'culture', redirectTo: 'articles/culture', pathMatch: 'full' },
  { path: 'culture/:article', redirectTo: 'articles/culture/:article' },
  {
    path: 'videos',
    component: Videos,
    title: 'Videos | RASA Magazine',
    data: seo(
      'Watch RASA Magazine video series on YouTube — conversations, performances and cultural storytelling.',
    ),
  },
  {
    path: 'partnership-contact',
    component: Partnership,
    title: 'Partnership & Contact | RASA Magazine',
    data: seo(
      'Partner with RASA Magazine or get in touch. Sponsorship, collaborations and contact details for artists, organisations and brands.',
    ),
  },
  { path: '**', redirectTo: '' },
];
