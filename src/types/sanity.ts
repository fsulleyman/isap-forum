export interface EventFacts {
  _id?: string;
  _type: 'event';
  name: string;
  orgFullName: string;
  theme: string;
  date: string;
  venue: string;
  hostInstitution: string;
}

export interface SiteSettings {
  _id?: string;
  _type: 'siteSettings';
  siteTitle: string;
  navItems?: Array<{ label: string; path: string }>;
  footerOrgText: string;
  hostDepartment: string;
  hostFaculty: string;
  hostUniversity: string;
  linkedinUrl: string;
  copyrightNotice: string;
  bannerImage?: any;
  bannerImageUrl?: string;
  programmeBannerImage?: any;
  programmeBannerImageUrl?: string;
  speakersBannerImage?: any;
  speakersBannerImageUrl?: string;
  partnersBannerImage?: any;
  partnersBannerImageUrl?: string;
  newsBannerImage?: any;
  newsBannerImageUrl?: string;
  resourcesBannerImage?: any;
  resourcesBannerImageUrl?: string;
}

export interface PillarCard {
  title: string;
  description: string;
  badge?: string;
}

export interface StakeholderCategory {
  name: string;
  description?: string;
  iconName?: string;
}

export interface HomePageContent {
  _id?: string;
  _type: 'homePage';
  heroHeadline: string;
  heroSubtitle: string;
  heroTagline: string;
  heroImage?: any;
  heroImageUrl?: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  aboutForumHeading: string;
  aboutForumBlurb: string;
  whyItMattersHeading: string;
  whyItMattersCards: PillarCard[];
  stakeholderStripHeading: string;
  stakeholders: StakeholderCategory[];
  finalCtaHeadline: string;
  finalCtaDescription: string;
  finalCtaButtonText: string;
}

export interface CoreObjective {
  number: number;
  title: string;
  description: string;
}

export interface AboutPageContent {
  _id?: string;
  _type: 'aboutPage';
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage?: any;
  bannerImageUrl?: string;
  introText: string;
  mission: string;
  vision: string;
  objectivesHeading: string;
  objectives: CoreObjective[];
  hostDepartmentDetails: string;
}

export interface Forum2026PageContent {
  _id?: string;
  _type: 'forum2026Page';
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage?: any;
  bannerImageUrl?: string;
  aboutTheForum: string[];
  themeContext: string;
  objectivesHeading: string;
  objectives: Array<{ number: number; title: string; description: string }>;
}

export interface ContactPageContent {
  _id?: string;
  _type: 'contactPage';
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage?: any;
  bannerImageUrl?: string;
  orgBlock: string;
  officialContactNotice: string;
  email: string;
  phone: string;
  physicalAddress: string;
}

export interface RegisterPageContent {
  _id?: string;
  _type: 'registerPage';
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage?: any;
  bannerImageUrl?: string;
  introCopy: string;
  googleFormUrl: string;
  qrCodeImage?: any;
  qrCodeAlt: string;
  registrationDisclaimer: string;
}

export interface ProgrammeSession {
  _id: string;
  _type: 'programme';
  time: string;
  session: string;
  topic?: string;
  speaker?: Speaker;
  speakerName?: string;
  organisation?: string;
  moderator?: string;
  status: 'Confirmed' | 'TBA';
}

export interface Speaker {
  _id: string;
  _type: 'speaker';
  name: string;
  title?: string;
  organisation: string;
  photo?: any;
  photoUrl?: string;
  bio?: string;
  role?: string;
  session?: any;
  linkedin?: string;
  status: 'Invited' | 'Confirmed' | 'Published';
}

export interface Institution {
  _id: string;
  _type: 'institution';
  name: string;
  logo?: any;
  logoUrl?: string;
  category: 'Sponsor' | 'Partner' | 'Supporting' | 'Participating';
  description?: string;
  website?: string;
  approved: boolean;
}

export interface NewsArticle {
  _id: string;
  _type: 'news';
  title: string;
  slug: { current: string } | string;
  featuredImage?: any;
  imageUrl?: string;
  publicationDate: string;
  summary: string;
  body?: any;
  author: string;
  status: 'Draft' | 'Review' | 'Approved' | 'Published';
}

export interface Resource {
  _id: string;
  _type: 'resource';
  title: string;
  category: 'Before Event' | 'After Event';
  description: string;
  fileOrUrl: string;
  date: string;
  approved: boolean;
}
