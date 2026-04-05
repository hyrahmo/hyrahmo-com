---
title: "How I built hyrahmo.com in one session with AI"
description: "Astro + Quartz + Cloudflare Workers. One domain, two engines, zero compromises. A breakdown of every decision."
pubDate: 2026-04-05
tags: [meta, engineering, ai]
lang: en
---

I built this entire site in a single session. From empty folder to production deploy on Cloudflare Workers. Here's how, and more importantly — why it's built the way it is.

## The problem

I wanted two things that don't normally live together:

1. A **polished personal site** — projects, blog, contact. Clean design, animations, fast.
2. A **knowledge base** — digital garden style. Graph view, backlinks, search. Markdown-first.

Most people pick one framework and force it to do both. That never works well. A blog framework makes a bad wiki. A wiki makes a bad landing page.

## The decision: two engines, one domain

I split it:

- **Astro** handles the main site (`/`, `/projects`, `/blog`, `/contact`). It's built for this — component-based, static output, fast.
- **Quartz** handles the knowledge base (`/kb/`). It's purpose-built for digital gardens — graph view, wikilinks, search, all included.

Both generate static HTML. Both output to the same `dist/` folder. Cloudflare Workers serves it all from one domain.

```
Astro build  →  dist/         (main site)
Quartz build →  dist/kb/      (knowledge base)
merge.mjs    →  patch sitemap
wrangler     →  deploy
```

No routing conflicts. No shared runtime. No compromises.

## The stack

- **Astro 5** — static site generator with Tailwind CSS 4
- **Quartz 4.5** — knowledge base engine (Preact, MDX, graph)
- **Cloudflare Workers** — edge hosting, static assets mode
- **pnpm** — monorepo workspace
- **@fontsource** — self-hosted Inter + JetBrains Mono (no Google Fonts, no render-blocking)

## What took the most thought

### Quartz at `/kb/` — path resolution

Quartz generates all links as relative URLs. Setting `baseUrl: "hyrahmo.com/kb"` makes sitemaps and RSS correct. The build outputs directly to `dist/kb/`. No path rewriting needed.

### Theme sync between Astro and Quartz

Both use `localStorage.getItem('theme')`. Astro sets `data-theme` on `<html>`. Quartz sets `saved-theme`. The localStorage key is the same, so switching themes on the main site persists to the KB.

To prevent a white flash when entering KB in dark mode, I set `saved-theme="dark"` as default in Quartz's HTML template.

### Sitemap merge

Astro generates `sitemap-index.xml`. Quartz generates `kb/sitemap.xml`. A 15-line `merge.mjs` script patches the Astro sitemap index to include the Quartz sitemap. Simple, no magic.

### Multilingual

8 languages in the KB (EN, RU, ZH, ES, DE, FR, PT, AR). The main site has EN and RU with proper `hreflang` tags and a language dropdown. Each language on the main site links to its corresponding KB section.

## What I'd do differently

1. **Start with content, not design.** I spent too long on animations and color schemes before having anything to show. The site looked premium but was empty.
2. **Fewer KB stubs.** 185 empty category pages across 8 languages is meaningless. 10 real articles > 185 placeholders.
3. **Component-first from day one.** I started with a single 270-line layout file and had to refactor it into Header/Footer/SocialIcons components later.

## The build pipeline

```bash
npm run build
# 1. rm -rf dist
# 2. cd kb && npm install
# 3. pnpm --filter @hyrahmo/site run build  →  dist/
# 4. cd kb && npx quartz build -o ../dist/kb  →  dist/kb/
# 5. node scripts/merge.mjs  →  patch sitemap
```

One command. Clean output. Deploy with `npx wrangler deploy`.

## Numbers

- 28 Astro pages (EN + RU)
- 185 KB pages (8 languages)
- Build time: ~4 seconds
- Lighthouse: 94+ accessibility, self-hosted fonts, no third-party deps
- Total commits in the first session: 30+

## What's next

Writing actual content. The infrastructure is done. Now it needs to be filled with real notes, real posts, real projects with links and results.

The site is open source: [github.com/hyrahmo/hyrahmo-com](https://github.com/hyrahmo/hyrahmo-com).
