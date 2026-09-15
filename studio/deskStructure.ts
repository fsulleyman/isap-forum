import type { StructureResolver } from 'sanity/structure';

export const singletonTypes = new Set([
  'event',
  'siteSettings',
  'homePage',
  'aboutPage',
  'forum2026Page',
  'contactPage',
  'registerPage',
]);

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('ISAP Content Management')
    .items([
      // Core Institutional Facts
      S.listItem()
        .title('1. Event Facts (Locked Section 1)')
        .id('event')
        .child(S.document().schemaType('event').documentId('event')),

      // Global Settings
      S.listItem()
        .title('2. Global Site Settings & Navigation')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // Page Singletons Group
      S.listItem()
        .title('Page Content (Singletons)')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .id('homePage')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .id('aboutPage')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Forum 2026 Page')
                .id('forum2026Page')
                .child(S.document().schemaType('forum2026Page').documentId('forum2026Page')),
              S.listItem()
                .title('Register Page')
                .id('registerPage')
                .child(S.document().schemaType('registerPage').documentId('registerPage')),
              S.listItem()
                .title('Contact Page')
                .id('contactPage')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ])
        ),

      S.divider(),

      // Repeatable Collections with Status Workflows
      S.documentTypeListItem('programme').title('Programme Sessions (11 slots)'),
      S.documentTypeListItem('speaker').title('Speakers & Panelists (Status Gated)'),
      S.documentTypeListItem('institution').title('Institutions & Partners (Approval Gated)'),
      S.documentTypeListItem('news').title('News Articles (Draft/Published)'),
      S.documentTypeListItem('resource').title('Resources & Papers (Before/After)'),
    ]);
