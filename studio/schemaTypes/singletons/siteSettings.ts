import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: "Information Systems Academics and Practitioners' Forum (ISAP)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navItems',
      title: 'Main Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() },
            { name: 'path', type: 'string', title: 'Route Path', validation: (rule) => rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerOrgText',
      title: 'Footer Organization Text',
      type: 'text',
      rows: 3,
      initialValue: "Connecting Information Systems academics, researchers, students, industry practitioners, and policy stakeholders in Ghana and Africa to bridge theory, practice, and national policy.",
    }),
    defineField({
      name: 'hostDepartment',
      title: 'Host Department Line',
      type: 'string',
      initialValue: 'Department of Information Technology Studies',
    }),
    defineField({
      name: 'hostFaculty',
      title: 'Host Faculty Line',
      type: 'string',
      initialValue: 'Faculty of Information Technology and Communication Studies',
    }),
    defineField({
      name: 'hostUniversity',
      title: 'Host University Line',
      type: 'string',
      initialValue: 'University of Professional Studies, Accra (UPSA)',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
      initialValue: 'https://www.linkedin.com/in/isap-forum?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    }),
    defineField({
      name: 'copyrightNotice',
      title: 'Copyright Notice',
      type: 'string',
      initialValue: '© 2026 University of Professional Studies, Accra (UPSA). All rights reserved.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bannerImage',
      title: 'Default Banner Background Image (Global Fallback)',
      type: 'image',
      options: { hotspot: true },
      description: 'Global fallback banner image used across all internal pages if no specific banner is provided.',
    }),
    defineField({
      name: 'programmeBannerImage',
      title: 'Programme Page Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Banner background photograph for /programme.',
    }),
    defineField({
      name: 'speakersBannerImage',
      title: 'Speakers Page Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Banner background photograph for /speakers.',
    }),
    defineField({
      name: 'partnersBannerImage',
      title: 'Partners Page Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Banner background photograph for /partners.',
    }),
    defineField({
      name: 'newsBannerImage',
      title: 'News Page Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Banner background photograph for /news.',
    }),
    defineField({
      name: 'resourcesBannerImage',
      title: 'Resources Page Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Banner background photograph for /resources.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings & Navigation',
      };
    },
  },
});
