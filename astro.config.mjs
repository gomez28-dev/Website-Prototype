// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://doyen-astro.netlify.app', // Update when deployed
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
});
