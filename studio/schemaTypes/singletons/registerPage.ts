import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'registerPage',
  title: 'Register Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title',
      type: 'string',
      initialValue: 'Register for ISAP Forum 2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bannerSubtitle',
      title: 'Banner Subtitle',
      type: 'string',
      initialValue: 'Secure your participation for Wednesday, 7 October 2026 at UPSA, Accra',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introCopy',
      title: 'Registration Instructions / Intro Copy',
      type: 'text',
      rows: 4,
      initialValue: 'Participation in ISAP Forum 2026 is open to academic researchers, public sector officials, industry practitioners, and students. Attendance is free but prior registration is mandatory for security accreditation and venue seating capacity at the UPSA PCU Auditorium.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'googleFormUrl',
      title: 'Google Form Registration URL',
      type: 'url',
      initialValue: 'https://forms.gle/ndq5UuJ6iGzV5NP4A',
      validation: (rule) => rule.required(),
      description: 'Official Google Form link for attendee registration.',
    }),
    defineField({
      name: 'qrCodeImage',
      title: 'Registration QR Code Image',
      type: 'image',
      description: 'Official ISAP Forum QR code linking to the Google Form.',
    }),
    defineField({
      name: 'qrCodeAlt',
      title: 'QR Code Alt Label',
      type: 'string',
      readOnly: true,
      initialValue: '[INSERT EXISTING ISAP QR CODE — DO NOT REGENERATE]',
      validation: (rule) => rule.required(),
      description: 'Strict alt label for the registration QR code asset.',
    }),
    defineField({
      name: 'registrationDisclaimer',
      title: 'Registration Disclaimer',
      type: 'text',
      rows: 2,
      initialValue: 'Please complete the Google Form with accurate professional details. Confirmation badges and parking permits will be dispatched to your registered email prior to the event.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Register Page Content & Form Links',
      };
    },
  },
});
