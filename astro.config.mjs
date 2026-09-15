import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://isap-forum.netlify.app',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sanity({
      projectId: '0ynfox1f',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_READ_TOKEN || '',
    }),
  ],
});
