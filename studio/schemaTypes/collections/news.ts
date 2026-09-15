import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'news',
  title: 'News & Announcements',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Excerpt',
      type: 'text',
      rows: 3,
      description: 'Used for news listings, cards, and Open Graph social sharing descriptions.',
      validation: (rule) => rule.required().max(250),
    }),
    defineField({
      name: 'body',
      title: 'Article Body Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Editorial Source',
      type: 'string',
      initialValue: 'ISAP Forum Secretariat',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Publishing Workflow Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft (Editorial work in progress)', value: 'Draft' },
          { title: 'In Review (Pending editorial review)', value: 'Review' },
          { title: 'Approved (Approved for release)', value: 'Approved' },
          { title: 'Published (Publicly live on website)', value: 'Published' },
        ],
        layout: 'radio',
      },
      initialValue: 'Draft',
      validation: (rule) => rule.required(),
      description: 'Only articles with status "Published" will be included in SSG static build and public queries.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publicationDate',
      media: 'featuredImage',
      status: 'status',
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title: title || 'Untitled Article',
        subtitle: `${subtitle || 'No date'} [Status: ${status || 'Draft'}]`,
        media,
      };
    },
  },
});
