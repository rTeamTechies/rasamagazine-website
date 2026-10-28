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
import { RasMilana } from './pages/archives/ras-milana/ras-milana';
import { MagicOfAbhinaya } from './pages/archives/magic-of-abhinaya/magic-of-abhinaya';
import { CelebratingTagoresLegacy } from './pages/archives/celebrating-tagores-legacy/celebrating-tagores-legacy';
import { Bhavonmeelanam } from './pages/archives/bhavonmeelanam/bhavonmeelanam';
import { LagnaPanchami } from './pages/archives/lagna-panchami/lagna-panchami';
import { ArtistInFocus } from './pages/artist-in-focus/artist-in-focus';
import { DoyenneOfAbhinaya } from './pages/artist-in-focus/doyenne-of-abhinaya/doyenne-of-abhinaya';
import { JayanthiKumaresh } from './pages/artist-in-focus/jayanthi-kumaresh/jayanthi-kumaresh';
import { ReelReflections } from './pages/reel-reflections/reel-reflections';
import { ProjectHailMary } from './pages/reel-reflections/project-hail-mary/project-hail-mary';
import { DevilWearsPrada2 } from './pages/reel-reflections/devil-wears-prada-2/devil-wears-prada-2';
import { LivingHeritage } from './pages/living-heritage/living-heritage';
import { ShivajiPark } from './pages/living-heritage/shivaji-park/shivaji-park';
import { DonBoscoShrineMatunga } from './pages/living-heritage/don-bosco-shrine-matunga/don-bosco-shrine-matunga';
import { InConversation } from './pages/in-conversation/in-conversation';
import { ShriyaKulkarni } from './pages/in-conversation/shriya-kulkarni/shriya-kulkarni';
import { IshaanAcharya } from './pages/in-conversation/ishaan-acharya/ishaan-acharya';
import { AtTheTable } from './pages/at-the-table/at-the-table';
import { Mokai } from './pages/at-the-table/mokai/mokai';
import { DoughAndJoes } from './pages/at-the-table/dough-and-joes/dough-and-joes';
import { TheStyleEdit } from './pages/the-style-edit/the-style-edit';
import { GauravGuptaRunway } from './pages/the-style-edit/gaurav-gupta-runway/gaurav-gupta-runway';
import { MetGalaOrMessGala } from './pages/the-style-edit/met-gala-or-mess-gala/met-gala-or-mess-gala';
import { GuestVoices } from './pages/guest-voices/guest-voices';
import { PortugueseChurch } from './pages/guest-voices/portuguese-church/portuguese-church';
import { MumbaiCityOfDreams } from './pages/guest-voices/mumbai-city-of-dreams/mumbai-city-of-dreams';
import { HindustaniClassicalMusic } from './pages/guest-voices/hindustani-classical-music/hindustani-classical-music';
import { RasaThinks } from './pages/rasa-thinks/rasa-thinks';
import { WhenArtMeetsLove } from './pages/rasa-thinks/when-art-meets-love/when-art-meets-love';
import { WhyMumbaiDeservesBetter } from './pages/rasa-thinks/why-mumbai-deserves-better/why-mumbai-deserves-better';
import { Community } from './pages/community/community';
import { QueerCommunity } from './pages/community/queer-community/queer-community';
import { AshadiEkadashi } from './pages/community/ashadi-ekadashi/ashadi-ekadashi';
import { GanpatiBappaMorya } from './pages/community/ganpati-bappa-morya/ganpati-bappa-morya';
import { Culture } from './pages/culture/culture';
import { RanjaniGayatri } from './pages/culture/ranjani-gayatri/ranjani-gayatri';
import { RathaYatra } from './pages/culture/ratha-yatra/ratha-yatra';
import { Videos } from './pages/videos/videos';
import { Partnership } from './pages/partnership/partnership';
import { MagazineReader } from './pages/magazine-reader/magazine-reader';
import { SeoData } from './services/seo.service';

const img = (file: string) => `assets/images/articles/${file}`;

const seo = (description: string, extras: Omit<SeoData, 'description'> = {}): SeoData => ({
  description,
  ...extras,
});

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
      'Explore RASA articles beyond the magazine — The Performance Edit, Artist In Focus, Guest Voices, RASA Thinks, community and culture.',
    ),
  },
  {
    path: 'articles/the-performance-edit',
    component: Archives,
    title: 'The Performance Edit | RASA Magazine',
    data: seo(
      'The Performance Edit on RASA Magazine — coverage of performances, recitals and arts programmes.',
      { image: img('lagna-panchami-cast.webp') },
    ),
  },
  {
    path: 'articles/the-performance-edit/lagna-panchami',
    component: LagnaPanchami,
    title: 'Chaos, comedy and confusion in a play | RASA Magazine',
    data: seo(
      'Read “Chaos, comedy and confusion in a play!” A review of Lagna Panchami, the Marathi comedy directed by Nipun Dharmadhikari, at Mahakavi Kalidas Auditorium.',
      { type: 'article', image: img('lagna-panchami-cast.webp') },
    ),
  },
  {
    path: 'articles/the-performance-edit/bhavonmeelanam',
    component: Bhavonmeelanam,
    title: 'Bhavonmeelanam - when dance meets emotion | RASA Magazine',
    data: seo(
      'Read “Bhavonmeelanam - when dance meets emotion.” Sharayu Gavi’s Bharatanatyam recital at the Mysore Association in Matunga, reviewed on RASA Magazine.',
      { type: 'article', image: img('sharayu-gavi-teal.jpg') },
    ),
  },
  {
    path: 'articles/the-performance-edit/celebrating-tagores-legacy',
    component: CelebratingTagoresLegacy,
    title: 'Celebrating Tagore’s legacy, through dance | RASA Magazine',
    data: seo(
      'Read “Celebrating Tagore’s legacy, through dance.” NCPA presents Odissi, Kathak and Bharatanatyam celebrating the works of Rabindranath Tagore.',
      { type: 'article', image: img('tagore-portrait.jpg') },
    ),
  },
  {
    path: 'articles/the-performance-edit/magic-of-abhinaya',
    component: MagicOfAbhinaya,
    title: 'The Magic of Abhinaya | RASA Magazine',
    data: seo(
      'Read “The magic of Abhinaya, never witnessed before.” A magical evening turned into a masterclass on Abhinaya by Priyadarshini Govind at NMACC.',
      { type: 'article', image: img('priyadarshini-govind-rasa-manjari-nmacc.png') },
    ),
  },
  {
    path: 'articles/the-performance-edit/ras-milana',
    component: RasMilana,
    title: 'Ras Milana | RASA Magazine',
    data: seo(
      'Read “Ras Milana - The coming together of two art forms.” When Odissi and Kathak blend like two rivers meeting at the sea.',
      { type: 'article', image: img('ras-milana-odissi-kathak-nmacc.jpg') },
    ),
  },
  {
    path: 'articles/the-performance-edit/spiritual-odyssey',
    component: SpiritualOdyssey,
    title: 'A Spiritual Odyssey | RASA Magazine',
    data: seo('Read “A Spiritual Odyssey” on RASA Magazine, a feature on arts, culture and heritage.', {
      type: 'article',
      image: img('spiritual-odyssey-hero.jpg'),
    }),
  },
  {
    path: 'articles/the-performance-edit/call-of-the-flute',
    component: CallOfTheFlute,
    title: 'Call of the Flute | RASA Magazine',
    data: seo('Read “Call of the Flute” on RASA Magazine, a feature on arts, culture and heritage.', {
      type: 'article',
      image: img('call-of-the-flute.jpg'),
    }),
  },
  {
    path: 'articles/the-performance-edit/evening-of-aharya',
    component: EveningOfAharya,
    title: 'An Evening of Aharya | RASA Magazine',
    data: seo('Read “An Evening of Aharya” on RASA Magazine, a feature on arts, culture and heritage.', {
      type: 'article',
      image: img('evening-of-aharya.jpg'),
    }),
  },
  {
    path: 'articles/the-performance-edit/living-the-dance',
    component: LivingTheDance,
    title: 'Living the Dance | RASA Magazine',
    data: seo('Read “Living the Dance” on RASA Magazine, a feature on dance, arts and cultural performance.', {
      type: 'article',
      image: img('living-the-dance-cover.jpg'),
    }),
  },
  {
    path: 'articles/the-performance-edit/cup-o-carnatic',
    component: CupOCarnatic,
    title: "Cup O' Carnatic | RASA Magazine",
    data: seo('Read “Cup O’ Carnatic” on RASA Magazine, a feature on Carnatic music and culture.', {
      type: 'article',
      image: img('cup-o-carnatic-01-jayanthi-kumaresh.png'),
    }),
  },
  {
    path: 'articles/the-performance-edit/ek-tichi-goshta',
    component: EkTichiGoshta,
    title: 'Ek Tichi Goshta | RASA Magazine',
    data: seo('Read “Ek Tichi Goshta” on RASA Magazine, a feature on arts, culture and heritage.', {
      type: 'article',
      image: img('ek-tichi-goshta-01.png'),
    }),
  },
  {
    path: 'articles/the-performance-edit/madhavam-mahadevam',
    component: MadhavamMahadevam,
    title: 'Madhavam Mahadevam | RASA Magazine',
    data: seo('Read “Madhavam Mahadevam” on RASA Magazine, a feature on arts, culture and heritage.', {
      type: 'article',
      image: img('madhavam-mahadevam-ensemble.png'),
    }),
  },
  {
    path: 'articles/the-performance-edit/vaibhav-arekar-students',
    component: VaibhavArekarStudents,
    title: 'Vaibhav Arekar Students | RASA Magazine',
    data: seo('Read “Vaibhav Arekar Students” on RASA Magazine, a feature on dance, arts and performance.', {
      type: 'article',
      image: img('vaibhav-arekar-students-05.png'),
    }),
  },
  {
    path: 'articles/the-performance-edit/vakrakara',
    component: Vakrakara,
    title: 'Vakrākāra | RASA Magazine',
    data: seo('Read “Vakrākāra” on RASA Magazine, a feature on arts, culture and heritage.', {
      type: 'article',
      image: img('vakrakara-01.png'),
    }),
  },
  {
    path: 'articles/artist-in-focus',
    component: ArtistInFocus,
    title: 'Artist In Focus | RASA Magazine',
    data: seo(
      'Artist In Focus on RASA Magazine — portraits of dancers, musicians and cultural practitioners.',
      { image: img('jayanthi-kumaresh-veena.jpg') },
    ),
  },
  {
    path: 'articles/artist-in-focus/jayanthi-kumaresh',
    component: JayanthiKumaresh,
    title: 'Dr. Jayanthi Kumaresh | RASA Magazine',
    data: seo(
      'Read “The invincible Maestro of the Saraswati Veena.” Dr. Jayanthi Kumaresh doesn’t just play the Veena, she invokes Goddess Saraswati herself!',
      { type: 'article', image: img('jayanthi-kumaresh-veena.jpg') },
    ),
  },
  {
    path: 'articles/artist-in-focus/doyenne-of-abhinaya',
    component: DoyenneOfAbhinaya,
    title: 'The Doyenne of Abhinaya | RASA Magazine',
    data: seo(
      'Read “The Doyenne of Abhinaya.” Priyadarshini Govind doesn’t just do abhinaya, she creates magic.',
      { type: 'article', image: img('priyadarshini-govind-doyenne-of-abhinaya.jpg') },
    ),
  },
  {
    path: 'articles/reel-reflections',
    component: ReelReflections,
    title: 'Reel Reflections | RASA Magazine',
    data: seo('Reel Reflections on RASA Magazine — film reviews and cinema notes on arts and culture.', {
      image: img('devil-wears-prada-2-poster.jpg'),
    }),
  },
  {
    path: 'articles/reel-reflections/devil-wears-prada-2',
    component: DevilWearsPrada2,
    title: 'The Devil Wears Prada 2 | RASA Magazine',
    data: seo(
      'Read “Gird your loins! A new icon has arrived!” The Devil Wears Prada 2 is here to be the cultural rest for everyone, and its not going anywhere!',
      { type: 'article', image: img('devil-wears-prada-2-poster.jpg') },
    ),
  },
  {
    path: 'articles/reel-reflections/project-hail-mary',
    component: ProjectHailMary,
    title: 'Project Hail Mary | RASA Magazine',
    data: seo(
      'Read “A tale of dystopia and friendship, across space.” Project Hail Mary is a film that thrives on hidden emotions, waiting to make us cry!',
      { type: 'article', image: img('project-hail-mary-ryan-gosling-rocky.jpg') },
    ),
  },
  {
    path: 'articles/living-heritage',
    component: LivingHeritage,
    title: 'Living Heritage | RASA Magazine',
    data: seo(
      'Living Heritage on RASA Magazine — places, neighbourhoods and cultural landmarks that still shape public life.',
      { image: img('don-bosco-shrine-exterior.jpg') },
    ),
  },
  {
    path: 'articles/living-heritage/don-bosco-shrine-matunga',
    component: DonBoscoShrineMatunga,
    title: 'Finding serenity and calmness in the heart of Matunga | RASA Magazine',
    data: seo(
      'Read “Finding serenity and calmness in the heart of Matunga.” The Don Bosco Shrine of Madonna in Matunga — architecture, stained glass, crypt and Catholic heritage.',
      { type: 'article', image: img('don-bosco-shrine-exterior.jpg') },
    ),
  },
  {
    path: 'articles/living-heritage/shivaji-park',
    component: ShivajiPark,
    title: 'Shivaji Park | RASA Magazine',
    data: seo(
      'Read “Shivaji Park - a place of community and warmth.” The heart of Dadar and the number one love of Dadarkars!',
      { type: 'article', image: img('shivaji-park-evening.jpg') },
    ),
  },
  {
    path: 'articles/in-conversation',
    component: InConversation,
    title: 'In Conversation | RASA Magazine',
    data: seo('In Conversation on RASA Magazine — interviews with artists, teachers and cultural practitioners.', {
      image: img('ishaan-acharya-interview.jpg'),
    }),
  },
  {
    path: 'articles/in-conversation/ishaan-acharya',
    component: IshaanAcharya,
    title: 'Dr. Ishaan Acharya | RASA Magazine',
    data: seo(
      'Read “Do what you love, love what you do” — a sit-down interview with Dr. Ishaan Acharya on animal rescue and the joys of his journey.',
      { type: 'article', image: img('ishaan-acharya-interview.jpg') },
    ),
  },
  {
    path: 'articles/in-conversation/shriya-kulkarni',
    component: ShriyaKulkarni,
    title: 'Shriya Kulkarni | RASA Magazine',
    data: seo(
      'Read “The journey from playing to teaching” — an interview with Shriya Kulkarni on teaching gymnastics.',
      { type: 'article', image: img('shriya-kulkarni-interview.jpg') },
    ),
  },
  {
    path: 'articles/at-the-table',
    component: AtTheTable,
    title: 'At The Table | RASA Magazine',
    data: seo('At The Table on RASA Magazine — cafes, kitchens and food culture worth tasting.', {
      image: img('dough-and-joes-interior.png'),
    }),
  },
  {
    path: 'articles/at-the-table/dough-and-joes',
    component: DoughAndJoes,
    title: 'Dough and Joes | RASA Magazine',
    data: seo(
      'Read “Dough and Joes is the perfect mix of whimsy and classy!” A Hill Road cafe that brings campy aesthetic — and the food to match.',
      { type: 'article', image: img('dough-and-joes-interior.png') },
    ),
  },
  {
    path: 'articles/at-the-table/mokai',
    component: Mokai,
    title: 'Mokai | RASA Magazine',
    data: seo(
      'Read “A taste of Oriental, right here in Bandra!” Bandra’s favourite eatery just got upgraded.',
      { type: 'article', image: img('mokai-pali-hill-bandra.png') },
    ),
  },
  {
    path: 'articles/the-style-edit',
    component: TheStyleEdit,
    title: 'The Style Edit | RASA Magazine',
    data: seo('The Style Edit on RASA Magazine — fashion, couture and the looks shaping culture.', {
      image: img('anok-yai-balenciaga.jpg'),
    }),
  },
  {
    path: 'articles/the-style-edit/met-gala-or-mess-gala',
    component: MetGalaOrMessGala,
    title: 'Met Gala or Mess Gala? | RASA Magazine',
    data: seo(
      'Read “Met Gala or Mess Gala? Cannes or Can-not?” — a Style Edit take on the best looks from Met Gala 2026 and Cannes.',
      { type: 'article', image: img('anok-yai-balenciaga.jpg') },
    ),
  },
  {
    path: 'articles/the-style-edit/gaurav-gupta-runway',
    component: GauravGuptaRunway,
    title: 'Turning the Runway in Gaurav Gupta | RASA Magazine',
    data: seo(
      'Read “Turning the Runway in Gaurav Gupta!” Lady Gaga & Doechii stun the iconic Runway in Gaurav Gupta couture.',
      { type: 'article', image: img('lady-gaga-doechii-gaurav-gupta-runway.jpg') },
    ),
  },
  {
    path: 'articles/guest-voices',
    component: GuestVoices,
    title: 'Guest Voices | RASA Magazine',
    data: seo('Guest Voices on RASA Magazine — writing from contributors across arts, faith and culture.', {
      image: img('dhruva-upadhye-portrait.jpg'),
    }),
  },
  {
    path: 'articles/guest-voices/hindustani-classical-music',
    component: HindustaniClassicalMusic,
    title: 'The Rich Tapestry of Hindustani Classical Music | RASA Magazine',
    data: seo(
      'Read “The Rich Tapestry of Hindustani Classical Music: An Explainer for Noobs” — a Guest Voices essay by Dhruva Upadhye on raag, taal, khayal and Hindustani classical music.',
      {
        type: 'article',
        image: img('dhruva-upadhye-portrait.jpg'),
        author: 'Dhruva Upadhye',
      },
    ),
  },
  {
    path: 'articles/guest-voices/portuguese-church',
    component: PortugueseChurch,
    title: 'Portuguese Church: Where Faith Meets Modern Architecture | RASA Magazine',
    data: seo(
      'Read “Portuguese Church: Where Faith Meets Modern Architecture” — modern architecture blending in tradition and symbolism. A Guest Voices essay by Ethan Fortes on Our Lady of Salvation, Dadar.',
      {
        type: 'article',
        image: img('our-lady-of-salvation-dadar-exterior.jpg'),
        author: 'Ethan Fortes',
      },
    ),
  },
  {
    path: 'articles/guest-voices/mumbai-city-of-dreams',
    component: MumbaiCityOfDreams,
    title: 'Mumbai…still the city of dreams | RASA Magazine',
    data: seo(
      'Read “Mumbai…still the city of dreams” — a Guest Voices essay by Shree Rawandale on air, water and the cost of staying in Mumbai.',
      {
        type: 'article',
        image: img('mumbai-city-of-dreams-smog.jpg'),
        author: 'Shree Rawandale',
      },
    ),
  },
  {
    path: 'articles/rasa-thinks',
    component: RasaThinks,
    title: 'RASA Thinks | RASA Magazine',
    data: seo('RASA Thinks — essays on why art, live performance and culture still matter.', {
      image: img('why-mumbai-deserves-better.jpg'),
    }),
  },
  {
    path: 'articles/rasa-thinks/when-art-meets-love',
    component: WhenArtMeetsLove,
    title: 'When Art meets Love | RASA Magazine',
    data: seo(
      'Read “When Art meets Love” — why live performances nourish the soul and connect us to culture.',
      { type: 'article', image: img('nataraja-bronze-statue.jpg') },
    ),
  },
  {
    path: 'articles/rasa-thinks/why-mumbai-deserves-better',
    component: WhyMumbaiDeservesBetter,
    title: 'Why Mumbai deserves better in terms of arts? | RASA Magazine',
    data: seo(
      'Read “Why Mumbai deserves better in terms of arts?” — an audience member’s experience and opinion on Mumbai based gurus and dance schools.',
      { type: 'article', image: img('why-mumbai-deserves-better.jpg') },
    ),
  },
  {
    path: 'articles/community',
    component: Community,
    title: 'Community | RASA Magazine',
    data: seo('Community stories on RASA Magazine — people, gatherings and cultural life.', {
      image: img('community-thumb.png'),
    }),
  },
  {
    path: 'articles/community/queer-community',
    component: QueerCommunity,
    title: 'Queer Community | RASA Magazine',
    data: seo('Read “Queer Community” on RASA Magazine, a community feature on arts and culture.', {
      type: 'article',
      image: img('queer-community-cover.png'),
    }),
  },
  {
    path: 'articles/community/ganpati-bappa-morya',
    component: GanpatiBappaMorya,
    title: 'Ganpati Bappa Morya | RASA Magazine',
    data: seo(
      'Read “Ganpati Bappa Morya” now fills the whole city! — a RASA community feature on Ganesh Chaturthi, Mumbai and public celebration.',
      { type: 'article', image: img('ganesh-chaturthi-ganpati-bappa-morya.jpg') },
    ),
  },
  {
    path: 'articles/community/ashadi-ekadashi',
    component: AshadiEkadashi,
    title: 'Ashadi Ekadashi | RASA Magazine',
    data: seo('Read “Ashadi Ekadashi” on RASA Magazine, a community feature on festival and heritage.', {
      type: 'article',
      image: img('ashadi-ekadashi-cover.png'),
    }),
  },
  {
    path: 'articles/culture',
    component: Culture,
    title: 'Culture | RASA Magazine',
    data: seo('Culture features on RASA Magazine — music, ritual, heritage and contemporary cultural life.', {
      image: img('culture-thumb.png'),
    }),
  },
  {
    path: 'articles/culture/ranjani-gayatri',
    component: RanjaniGayatri,
    title: 'Ranjani-Gayatri | RASA Magazine',
    data: seo('Read “Ranjani-Gayatri” on RASA Magazine, a culture feature on music and performance.', {
      type: 'article',
      image: img('ranjani-gayatri-hero.png'),
    }),
  },
  {
    path: 'articles/culture/ratha-yatra',
    component: RathaYatra,
    title: 'Ratha Yatra | RASA Magazine',
    data: seo('Read “Ratha Yatra” on RASA Magazine, a culture feature on festival and heritage.', {
      type: 'article',
      image: img('ratha-yatra-img-1.png'),
    }),
  },
  {
    path: 'articles/archives',
    redirectTo: 'articles/the-performance-edit',
    pathMatch: 'full',
  },
  { path: 'articles/archives/:article', redirectTo: 'articles/the-performance-edit/:article' },
  { path: 'archives', redirectTo: 'articles/the-performance-edit', pathMatch: 'full' },
  { path: 'archives/:article', redirectTo: 'articles/the-performance-edit/:article' },
  {
    path: 'the-performance-edit',
    redirectTo: 'articles/the-performance-edit',
    pathMatch: 'full',
  },
  {
    path: 'the-performance-edit/:article',
    redirectTo: 'articles/the-performance-edit/:article',
  },
  { path: 'community', redirectTo: 'articles/community', pathMatch: 'full' },
  { path: 'community/:article', redirectTo: 'articles/community/:article' },
  { path: 'culture', redirectTo: 'articles/culture', pathMatch: 'full' },
  { path: 'culture/:article', redirectTo: 'articles/culture/:article' },
  {
    path: 'artist-in-focus',
    redirectTo: 'articles/artist-in-focus',
    pathMatch: 'full',
  },
  { path: 'artist-in-focus/:article', redirectTo: 'articles/artist-in-focus/:article' },
  {
    path: 'reel-reflections',
    redirectTo: 'articles/reel-reflections',
    pathMatch: 'full',
  },
  { path: 'reel-reflections/:article', redirectTo: 'articles/reel-reflections/:article' },
  {
    path: 'living-heritage',
    redirectTo: 'articles/living-heritage',
    pathMatch: 'full',
  },
  { path: 'living-heritage/:article', redirectTo: 'articles/living-heritage/:article' },
  {
    path: 'in-conversation',
    redirectTo: 'articles/in-conversation',
    pathMatch: 'full',
  },
  { path: 'in-conversation/:article', redirectTo: 'articles/in-conversation/:article' },
  { path: 'at-the-table', redirectTo: 'articles/at-the-table', pathMatch: 'full' },
  { path: 'at-the-table/:article', redirectTo: 'articles/at-the-table/:article' },
  { path: 'the-style-edit', redirectTo: 'articles/the-style-edit', pathMatch: 'full' },
  { path: 'the-style-edit/:article', redirectTo: 'articles/the-style-edit/:article' },
  { path: 'guest-voices', redirectTo: 'articles/guest-voices', pathMatch: 'full' },
  { path: 'guest-voices/:article', redirectTo: 'articles/guest-voices/:article' },
  { path: 'rasa-thinks', redirectTo: 'articles/rasa-thinks', pathMatch: 'full' },
  { path: 'rasa-thinks/:article', redirectTo: 'articles/rasa-thinks/:article' },
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
