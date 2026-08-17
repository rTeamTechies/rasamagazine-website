export interface SiteLinks {
  youtube: string;
  instagramRasa: string;
  instagramPersonal: string;
  email: string;
  emailLabel: string;
  phone: string;
  phoneLabel: string;
  cv: string;
}

export interface SiteBrand {
  rasaLogo: string;
  artsyLogo: string;
  youtubeIcon: string;
  instagramIcon: string;
  aboutPortrait: string;
}

export interface HomeNavItem {
  label: string;
  path: string;
  image: string;
}

export interface HomeHeroVisual {
  src: string;
  alt: string;
}

export interface SiteContent {
  siteName: string;
  tagline: string;
  editor: string;
  links: SiteLinks;
  brand: SiteBrand;
  home: {
    heroLead: string;
    introParagraphs: string[];
    heroVisuals: HomeHeroVisual[];
    nav: HomeNavItem[];
    partnershipLinkLabel: string;
    partnershipLinkPath: string;
  };
}

export interface PartnershipOffering {
  title: string;
  text: string;
}

export interface PartnershipContent {
  title: string;
  intro: string[];
  sponsor: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    bullets: string[];
    closing: string[];
    ctaTitle: string;
    ctaText: string;
  };
  collaborations: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    offerings: PartnershipOffering[];
    closing: string[];
    ctaTitle: string;
    ctaText: string;
  };
  editorial: {
    title: string;
    paragraphs: string[];
  };
  contact: {
    title: string;
    paragraphs: string[];
    enquiryIntro: string;
    enquiryBullets: string[];
    closing: string;
  };
}

export interface MagazineIssue {
  id: string;
  title: string;
  volume: number;
  month: string;
  year: number;
  cover: string;
  driveUrl: string;
  published: boolean;
}

export interface ArticleCategory {
  id: string;
  title: string;
  navLabel: string;
  path: string;
  theme: string;
  thumb: string;
}

export interface ArticlesIndex {
  intro: string;
  categories: ArticleCategory[];
}

export interface ArticlePost {
  slug: string;
  category: string;
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  date: string;
  cover: string;
  hero: string;
  images: string[];
  published: boolean;
  paragraphs: string[];
}

export interface VideoSeries {
  id: string;
  title: string;
  description: string;
  playlistUrl: string;
  embedUrl: string;
}

export interface VideosIndex {
  intro: string;
  series: VideoSeries[];
}
