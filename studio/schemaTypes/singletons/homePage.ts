import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (H1)',
      type: 'string',
      initialValue: 'ISAP FORUM 2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: "Information Systems Academics and Practitioners' Forum",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline / Theme Intro',
      type: 'string',
      initialValue: 'Bridging theory, practice and national digital identity transformation across Ghana and Africa.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Photograph for the homepage hero section. A local text scrim will be applied behind the copy.',
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary CTA Text',
      type: 'string',
      initialValue: 'Register for ISAP 2026',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      initialValue: 'View Programme',
    }),
    defineField({
      name: 'aboutForumHeading',
      title: 'About Forum Section Heading',
      type: 'string',
      initialValue: 'About the ISAP Forum',
    }),
    defineField({
      name: 'aboutForumBlurb',
      title: 'About Forum Blurb',
      type: 'text',
      rows: 4,
      initialValue: 'The Information Systems Academics and Practitioners\' Forum (ISAP Forum) is an independent, non-partisan platform dedicated to bridging the critical gap between academic research and industry execution. Established at the University of Professional Studies, Accra (UPSA), ISAP brings together leading scholars, technology practitioners, policy makers, and students to interrogate national digital transformations and accelerate socioeconomic growth.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whyItMattersHeading',
      title: 'Why This Forum Matters Heading',
      type: 'string',
      initialValue: 'Why This Forum Matters',
    }),
    defineField({
      name: 'whyItMattersCards',
      title: '4 "Why It Matters" Pillar Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Pillar Title', validation: (rule) => rule.required() },
            { name: 'description', type: 'text', rows: 3, title: 'Pillar Description', validation: (rule) => rule.required() },
            { name: 'badge', type: 'string', title: 'Category Badge' },
          ],
        },
      ],
    }),
    defineField({
      name: 'stakeholderStripHeading',
      title: 'Stakeholder Strip Heading',
      type: 'string',
      initialValue: 'Convening Stakeholders Across the Ecosystem',
      description: 'Categories of stakeholders — never labelled sponsors',
    }),
    defineField({
      name: 'stakeholders',
      title: 'Stakeholder Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Category Name', validation: (rule) => rule.required() },
            { name: 'description', type: 'string', title: 'Brief Summary' },
            { name: 'iconName', type: 'string', title: 'Lucide Icon Name' },
          ],
        },
      ],
    }),
    defineField({
      name: 'finalCtaHeadline',
      title: 'Final CTA Headline',
      type: 'string',
      initialValue: 'Be Part of the Conversation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finalCtaDescription',
      title: 'Final CTA Description',
      type: 'text',
      rows: 3,
      initialValue: 'Join government leaders, academic researchers, and digital technology innovators at the UPSA PCU Auditorium on Wednesday, 7 October 2026. Secure your place today.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finalCtaButtonText',
      title: 'Final CTA Button Text',
      type: 'string',
      initialValue: 'Register for ISAP 2026',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Content & Sections',
      };
    },
  },
});
