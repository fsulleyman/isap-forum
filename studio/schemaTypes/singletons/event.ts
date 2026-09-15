import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event Facts (Non-Negotiable)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
      readOnly: true,
      initialValue: 'ISAP Forum 2026',
      validation: (rule) => rule.required().custom((value) => {
        if (value !== 'ISAP Forum 2026') {
          return 'Event name must strictly be "ISAP Forum 2026"';
        }
        return true;
      }),
    }),
    defineField({
      name: 'orgFullName',
      title: 'Organisation Full Name',
      type: 'string',
      readOnly: true,
      initialValue: "Information Systems Academics and Practitioners' Forum",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'text',
      rows: 2,
      readOnly: true,
      initialValue: 'Public Sector Identification Systems for Socioeconomic Development: The Ghana Experience and Way Forward',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (Strictly Formatted)',
      type: 'string',
      readOnly: true,
      initialValue: 'Wednesday, 7 October 2026',
      validation: (rule) => rule.required().regex(
        /^Wednesday, 7 October 2026$/,
        { name: 'exact-date', invert: false }
      ).error('Event date must strictly be "Wednesday, 7 October 2026" — never a date range.'),
      description: 'Locked non-negotiable event date. Never a range.',
    }),
    defineField({
      name: 'venue',
      title: 'Venue (Strictly Formatted)',
      type: 'string',
      readOnly: true,
      initialValue: 'UPSA PCU Auditorium, University of Professional Studies, Accra',
      validation: (rule) => rule.required().regex(
        /^UPSA PCU Auditorium, University of Professional Studies, Accra$/,
        { name: 'exact-venue', invert: false }
      ).error('Venue must strictly be "UPSA PCU Auditorium, University of Professional Studies, Accra"'),
      description: 'Locked non-negotiable venue string.',
    }),
    defineField({
      name: 'hostInstitution',
      title: 'Host Institution',
      type: 'string',
      readOnly: true,
      initialValue: 'University of Professional Studies, Accra (UPSA), Department of Information Technology Studies, Faculty of IT and Communication Studies',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'ISAP Forum 2026 Event Facts',
        subtitle: subtitle || 'Wednesday, 7 October 2026',
      };
    },
  },
});
