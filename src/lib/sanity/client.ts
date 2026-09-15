import { createClient } from '@sanity/client';
import type {
  EventFacts,
  SiteSettings,
  HomePageContent,
  AboutPageContent,
  Forum2026PageContent,
  ContactPageContent,
  RegisterPageContent,
  ProgrammeSession,
  Speaker,
  Institution,
  NewsArticle,
  Resource,
} from '@/types/sanity';
import {
  EVENT_QUERY,
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  FORUM_2026_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  REGISTER_PAGE_QUERY,
  SPEAKERS_QUERY,
  PROGRAMME_QUERY,
  INSTITUTIONS_QUERY,
  NEWS_QUERY,
  NEWS_BY_SLUG_QUERY,
  RESOURCES_QUERY,
} from './queries';
import {
  fallbackEventFacts,
  fallbackSiteSettings,
  fallbackHomePage,
  fallbackAboutPage,
  fallbackForum2026Page,
  fallbackContactPage,
  fallbackRegisterPage,
  fallbackAllSpeakers,
  fallbackProgrammeSessions,
  fallbackInstitutions,
  fallbackNewsArticles,
  fallbackResources,
} from './fallbackData';

export const sanityClient = createClient({
  projectId: '0ynfox1f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Ensure static build queries always fetch fresh data for SSG
  token: (typeof process !== 'undefined' && (process.env.SANITY_READ_TOKEN || process.env.SANITY_AUTH_TOKEN)) || (typeof import.meta !== 'undefined' && (import.meta.env?.SANITY_READ_TOKEN || import.meta.env?.SANITY_AUTH_TOKEN)) || undefined,
});

const isDev = (typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV)) || process.env.NODE_ENV === 'development';

// Safe fetch helper: uses fallbacks in development only; fails loudly in production builds
async function safeFetch<T>(query: string, params: Record<string, any> = {}, fallback: T, queryName = 'unknown'): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
      return data;
    }
    if (!isDev) {
      throw new Error(`[SANITY PRODUCTION ERROR] Query "${queryName}" returned empty or null data from Sanity Content Lake.`);
    }
  } catch (error: any) {
    if (!isDev) {
      throw new Error(`[SANITY PRODUCTION BUILD FAILED] Critical query "${queryName}" failed against Sanity Content Lake: ${error.message}`);
    }
    console.warn(`[DEV WARNING] Using fallback for "${queryName}": ${error.message}`);
  }
  return fallback;
}

// Data fetching accessors

export async function getEventFacts(): Promise<EventFacts> {
  return safeFetch<EventFacts>(EVENT_QUERY, {}, fallbackEventFacts, 'eventFacts');
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return safeFetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, fallbackSiteSettings, 'siteSettings');
}

export async function getHomePage(): Promise<HomePageContent> {
  return safeFetch<HomePageContent>(HOME_PAGE_QUERY, {}, fallbackHomePage, 'homePage');
}

export async function getAboutPage(): Promise<AboutPageContent> {
  return safeFetch<AboutPageContent>(ABOUT_PAGE_QUERY, {}, fallbackAboutPage, 'aboutPage');
}

export async function getForum2026Page(): Promise<Forum2026PageContent> {
  return safeFetch<Forum2026PageContent>(FORUM_2026_PAGE_QUERY, {}, fallbackForum2026Page, 'forum2026Page');
}

export async function getContactPage(): Promise<ContactPageContent> {
  return safeFetch<ContactPageContent>(CONTACT_PAGE_QUERY, {}, fallbackContactPage, 'contactPage');
}

export async function getRegisterPage(): Promise<RegisterPageContent> {
  return safeFetch<RegisterPageContent>(REGISTER_PAGE_QUERY, {}, fallbackRegisterPage, 'registerPage');
}

// Status-gated collection getters
export async function getPublishedSpeakers(): Promise<Speaker[]> {
  const speakers = await safeFetch<Speaker[]>(
    SPEAKERS_QUERY,
    {},
    fallbackAllSpeakers.filter((s) => s.status === 'Published'),
    'publishedSpeakers'
  );
  // Ensure status filtering is strictly respected
  return speakers.filter((s) => s.status === 'Published');
}

export async function getAllSpeakersForAudit(): Promise<Speaker[]> {
  return safeFetch<Speaker[]>(`*[_type == "speaker"]`, {}, fallbackAllSpeakers, 'allSpeakersForAudit');
}

export async function getProgrammeSessions(): Promise<ProgrammeSession[]> {
  const sessions = await safeFetch<ProgrammeSession[]>(
    PROGRAMME_QUERY,
    {},
    fallbackProgrammeSessions.filter((p) => p.status === 'Confirmed' || p.status === 'TBA'),
    'programmeSessions'
  );
  return sessions;
}

export async function getApprovedInstitutions(): Promise<Institution[]> {
  const institutions = await safeFetch<Institution[]>(
    INSTITUTIONS_QUERY,
    {},
    fallbackInstitutions.filter((i) => i.approved === true),
    'approvedInstitutions'
  );
  return institutions.filter((i) => i.approved === true);
}

export async function getPublishedNews(): Promise<NewsArticle[]> {
  const news = await safeFetch<NewsArticle[]>(
    NEWS_QUERY,
    {},
    fallbackNewsArticles.filter((n) => n.status === 'Published'),
    'publishedNews'
  );
  return news.filter((n) => n.status === 'Published');
}

export async function getAllNewsForAudit(): Promise<NewsArticle[]> {
  return safeFetch<NewsArticle[]>(`*[_type == "news"]`, {}, fallbackNewsArticles, 'allNewsForAudit');
}

export async function getPublishedNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const article = await sanityClient.fetch<NewsArticle>(NEWS_BY_SLUG_QUERY, { slug });
    if (article && article.status === 'Published') {
      console.log(`[SANITY LIVE SUCCESS] Fetched from Content Lake: newsBySlug (${slug})`);
      return article;
    }
  } catch (error: any) {
    console.error(`[SANITY FETCH ERROR] newsBySlug (${slug}):`, error.message);
  }
  
  const fallback = fallbackNewsArticles.find(
    (n) => (typeof n.slug === 'string' ? n.slug : n.slug.current) === slug && n.status === 'Published'
  );
  return fallback || null;
}

export async function getApprovedResources(): Promise<Resource[]> {
  const resources = await safeFetch<Resource[]>(
    RESOURCES_QUERY,
    {},
    fallbackResources.filter((r) => r.approved === true),
    'approvedResources'
  );
  return resources.filter((r) => r.approved === true);
}
