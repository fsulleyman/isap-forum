import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'forum2026Page',
  title: 'Forum 2026 Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title',
      type: 'string',
      initialValue: 'ISAP Forum 2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle',
      type: 'string',
      initialValue: 'Public Sector Identification Systems for Socioeconomic Development: The Ghana Experience and Way Forward',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Header banner background photograph. Navy overlay will be applied automatically for text legibility.',
    }),
    defineField({
      name: 'aboutTheForum',
      title: 'About the 2026 Edition',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Key contextual paragraphs describing the 2026 conference focal theme.',
    }),
    defineField({
      name: 'themeContext',
      title: 'Theme Context & Critical Significance',
      type: 'text',
      rows: 5,
      initialValue: 'As Ghana and other African economies expand digital governance and civil identification mechanisms (such as the Ghana Card), national digital identity infrastructure has transitioned from an administrative register into the foundational backbone of financial inclusion, electoral integrity, public service delivery, and digital commerce. ISAP Forum 2026 conducts an independent, evidence-based assessment of this historic transformation.',
    }),
    defineField({
      name: 'objectivesHeading',
      title: 'Forum 2026 Objectives Heading',
      type: 'string',
      initialValue: 'Key Objectives of the 2026 Forum',
    }),
    defineField({
      name: 'objectives',
      title: '7 Specific Objectives for Forum 2026',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'number', title: 'Number' },
            { name: 'title', type: 'string', title: 'Objective Title', validation: (rule) => rule.required() },
            { name: 'description', type: 'text', rows: 2, title: 'Description', validation: (rule) => rule.required() },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Forum 2026 Page Content & 7 Objectives',
      };
    },
  },
});
