import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'speaker',
  title: 'Speakers & Panelists',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Professional Designation',
      type: 'string',
      description: 'e.g. Executive Secretary, Professor of Information Systems',
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation / Institution',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Speaker Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'role',
      title: 'Forum Role',
      type: 'string',
      description: 'e.g. Keynote Speaker, Panelist, Session Chair',
    }),
    defineField({
      name: 'session',
      title: 'Associated Session',
      type: 'reference',
      to: [{ type: 'programme' }],
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: 'Governance Status',
      type: 'string',
      options: {
        list: [
          { title: 'Invited (Internal Only)', value: 'Invited' },
          { title: 'Confirmed (Internal Only)', value: 'Confirmed' },
          { title: 'Published (Publicly Visible)', value: 'Published' },
        ],
        layout: 'radio',
      },
      initialValue: 'Invited',
      validation: (rule) => rule.required(),
      description: 'Only speakers with status "Published" will appear on the public website.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'organisation',
      media: 'photo',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: title || 'Unnamed Speaker',
        subtitle: `${subtitle || ''} [Status: ${status || 'Invited'}]`,
        media,
      };
    },
  },
});
