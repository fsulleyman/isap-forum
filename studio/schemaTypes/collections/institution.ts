import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'institution',
  title: 'Institutions & Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Institution Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Institutional Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sponsor', value: 'Sponsor' },
          { title: 'Partner', value: 'Partner' },
          { title: 'Supporting Institution', value: 'Supporting' },
          { title: 'Participating Institution', value: 'Participating' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      description: 'Strictly locked category. Never interchangeable.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Public Display',
      type: 'boolean',
      initialValue: false,
      description: 'Must be explicitly approved to render on the public website.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      approved: 'approved',
      media: 'logo',
    },
    prepare({ title, subtitle, approved, media }) {
      return {
        title: title || 'Untitled Institution',
        subtitle: `${subtitle || 'Uncategorized'} [${approved ? 'Approved' : 'Pending Approval'}]`,
        media,
      };
    },
  },
});
