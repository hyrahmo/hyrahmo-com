import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hyrahmo.com',
  outDir: '../dist',
  integrations: [sitemap()],
});
