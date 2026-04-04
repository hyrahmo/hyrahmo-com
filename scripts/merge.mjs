import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';

const SITE = 'https://hyrahmo.com';

// 1. Patch sitemap index to include Quartz sitemap
const sitemapPath = 'dist/sitemap-index.xml';
if (existsSync(sitemapPath)) {
  let xml = readFileSync(sitemapPath, 'utf-8');
  if (!xml.includes('/kb/sitemap.xml')) {
    const entry = `  <sitemap>\n    <loc>${SITE}/kb/sitemap.xml</loc>\n  </sitemap>`;
    xml = xml.replace('</sitemapindex>', `${entry}\n</sitemapindex>`);
    writeFileSync(sitemapPath, xml);
    console.log('Patched sitemap-index.xml with Quartz sitemap');
  }
} else {
  console.log('No sitemap-index.xml found (Astro may not have generated it)');
}

// 2. Remove Astro build artifacts that shouldn't be deployed
for (const f of ['dist/content-assets.mjs', 'dist/content-modules.mjs']) {
  if (existsSync(f)) {
    unlinkSync(f);
  }
}

// 3. Remove Quartz CNAME if present
const cname = 'dist/kb/CNAME';
if (existsSync(cname)) {
  unlinkSync(cname);
  console.log('Removed kb/CNAME');
}

console.log('Merge complete');
