import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Serve sitemap-index.xml at /sitemap.xml for backwards compatibility
export const GET: APIRoute = () => {
  // At build time, sitemap-index.xml may not exist yet (it's generated after pages).
  // So generate a proper sitemap index pointing to both sitemaps.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://hyrahmo.com/sitemap-index.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(xml.trim(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
