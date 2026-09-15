import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title',
      type: 'string',
      initialValue: 'Contact & Inquiries',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle',
      type: 'string',
      initialValue: 'Connect with the ISAP Forum Secretariat and Organizing Committee',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orgBlock',
      title: 'Institutional Organisation Block',
      type: 'text',
      rows: 4,
      initialValue: 'Information Systems Academics and Practitioners\' Forum (ISAP)\nDepartment of Information Technology Studies\nFaculty of Information Technology and Communication Studies\nUniversity of Professional Studies, Accra (UPSA)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'officialContactNotice',
      title: 'Official Contact Policy Notice',
      type: 'string',
      readOnly: true,
      initialValue: '[INSERT OFFICIAL CONTACT — DO NOT PUBLISH PERSONAL STAFF EMAIL]',
      description: 'Strict protocol notice regarding public contact disclosures.',
    }),
    defineField({
      name: 'email',
      title: 'Official Secretariat Email Address',
      type: 'string',
      initialValue: '[INSERT OFFICIAL CONTACT — DO NOT PUBLISH PERSONAL STAFF EMAIL]',
      validation: (rule) => rule.required(),
      description: 'Must remain as literal bracket placeholder until official secretariat email is formally configured.',
    }),
    defineField({
      name: 'phone',
      title: 'Official Secretariat Phone Number',
      type: 'string',
      initialValue: '[INSERT OFFICIAL CONTACT PHONE — DO NOT PUBLISH PERSONAL STAFF NUMBER]',
      validation: (rule) => rule.required(),
      description: 'Must remain as literal bracket placeholder until official secretariat number is formally configured.',
    }),
    defineField({
      name: 'physicalAddress',
      title: 'Physical Address',
      type: 'string',
      initialValue: 'UPSA PCU Auditorium / Faculty of IT and Communication Studies, University of Professional Studies, Accra, Ghana',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Content & Official Details',
      };
    },
  },
});
