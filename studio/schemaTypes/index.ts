// Collections
import programme from './collections/programme';
import speaker from './collections/speaker';
import institution from './collections/institution';
import news from './collections/news';
import resource from './collections/resource';

// Singletons
import event from './singletons/event';
import siteSettings from './singletons/siteSettings';
import homePage from './singletons/homePage';
import aboutPage from './singletons/aboutPage';
import forum2026Page from './singletons/forum2026Page';
import contactPage from './singletons/contactPage';
import registerPage from './singletons/registerPage';

export const schemaTypes = [
  // Singletons (7)
  event,
  siteSettings,
  homePage,
  aboutPage,
  forum2026Page,
  contactPage,
  registerPage,

  // Collections (5)
  programme,
  speaker,
  institution,
  news,
  resource,
];
