import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'resource',
  title: 'Publications & Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Resource Category',
      type: 'string',
      options: {
        list: [
          { title: 'Before Event (Concept Notes, Reading Lists, Briefs)', value: 'Before Event' },
          { title: 'After Event (Proceedings, Presentations, Reports)', value: 'After Event' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fileOrUrl',
      title: 'File Download or External Document URL',
      type: 'url',
      description: 'Link to PDF or document repository',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Release Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Public Display',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
      description: 'Must be explicitly approved before appearing on the public resources page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      approved: 'approved',
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: title || 'Untitled Resource',
        subtitle: `${subtitle || 'Uncategorized'} [${approved ? 'Approved' : 'Pending'}]`,
      };
    },
  },
});
