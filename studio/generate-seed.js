import { writeFileSync } from 'fs';
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
} from '../src/lib/sanity/fallbackData.ts';

const documents = [
  fallbackEventFacts,
  fallbackSiteSettings,
  fallbackHomePage,
  fallbackAboutPage,
  fallbackForum2026Page,
  fallbackContactPage,
  fallbackRegisterPage,
  ...fallbackAllSpeakers,
  ...fallbackProgrammeSessions,
  ...fallbackInstitutions,
  ...fallbackNewsArticles.map((n) => ({
    ...n,
    body: [
      {
        _type: 'block',
        _key: 'b1',
        children: [{ _type: 'span', _key: 's1', text: n.summary }],
      },
    ],
  })),
  ...fallbackResources,
];

const ndjson = documents.map((doc) => JSON.stringify(doc)).join('\n') + '\n';
writeFileSync('./studio/seed.ndjson', ndjson, 'utf8');
console.log(`Successfully generated studio/seed.ndjson with ${documents.length} documents.`);
