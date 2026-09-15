import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'programme',
  title: 'Programme Sessions',
  type: 'document',
  fields: [
    defineField({
      name: 'time',
      title: 'Time Slot',
      type: 'string',
      description: 'e.g. 09:00 - 09:30 or TBA',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'session',
      title: 'Session Name',
      type: 'string',
      description: 'e.g. Opening Keynote or Panel Discussion',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Topic / Theme',
      type: 'string',
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker Reference',
      type: 'reference',
      to: [{ type: 'speaker' }],
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation / Affiliation',
      type: 'string',
    }),
    defineField({
      name: 'moderator',
      title: 'Moderator',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Publishing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Confirmed', value: 'Confirmed' },
          { title: 'To Be Announced (TBA)', value: 'TBA' },
        ],
        layout: 'radio',
      },
      initialValue: 'Confirmed',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'session',
      subtitle: 'time',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Untitled Session',
        subtitle: `${subtitle || 'Time TBA'} [${status || 'TBA'}]`,
      };
    },
  },
});
