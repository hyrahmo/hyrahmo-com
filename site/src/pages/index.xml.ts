import type { APIRoute } from 'astro';

// Root RSS feed — simple wrapper pointing to KB feed
export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hyrahmo</title>
    <link>https://hyrahmo.com</link>
    <description>Hyrahmo — personal site and knowledge base</description>
    <atom:link href="https://hyrahmo.com/kb/index.xml" rel="alternate" type="application/rss+xml" title="Notes RSS"/>
    <item>
      <title>Notes (Knowledge Base)</title>
      <link>https://hyrahmo.com/kb/</link>
      <description>Browse the full knowledge base and subscribe to the notes RSS at https://hyrahmo.com/kb/index.xml</description>
    </item>
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
