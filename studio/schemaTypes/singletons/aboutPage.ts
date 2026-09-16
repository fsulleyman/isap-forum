import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title',
      type: 'string',
      initialValue: 'About ISAP Forum',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle',
      type: 'string',
      initialValue: 'Bridging Academic Inquiry and Industry Practice in Information Systems',
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
      name: 'introText',
      title: 'Introduction Overview',
      type: 'text',
      rows: 5,
      initialValue: 'The Information Systems Academics and Practitioners\' Forum (ISAP Forum) was conceived as a sustainable intellectual and professional nexus in Ghana and the broader African continent. Anchored at the University of Professional Studies, Accra (UPSA), the Forum provides an impartial, evidence-based setting where rigorous academic research directly interrogates and guides real-world digital infrastructure implementations.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'text',
      rows: 4,
      initialValue: 'To cultivate continuous, high-impact collaboration between Information Systems scholars and industry practitioners, translating empirical findings into actionable national policy and enterprise innovation.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'vision',
      title: 'Our Vision',
      type: 'text',
      rows: 4,
      initialValue: 'To serve as Africa’s pre-eminent forum for Information Systems thought leadership, fostering resilient, ethical, and inclusive socioeconomic development through digital systems.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'objectivesHeading',
      title: 'Objectives Section Heading',
      type: 'string',
      initialValue: 'Core Objectives of the Forum',
    }),
    defineField({
      name: 'objectives',
      title: '5 Core Objectives (Verbatim)',
      type: 'array',
      description: 'The five approved core objectives from the ISAP constitution.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'number', title: 'Objective Number' },
            { name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required() },
            { name: 'description', type: 'text', rows: 3, title: 'Description', validation: (rule) => rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'hostDepartmentDetails',
      title: 'Host Department Details',
      type: 'text',
      rows: 3,
      initialValue: 'The Forum is housed under the Department of Information Technology Studies within the Faculty of Information Technology and Communication Studies at the University of Professional Studies, Accra (UPSA).',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content (Mission, Vision, 5 Objectives)',
      };
    },
  },
});
