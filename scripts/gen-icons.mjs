/**
 * Generate favicon PNGs, apple-touch-icon, android icons, and OG image.
 * Uses sharp from kb/node_modules.
 */
import { join, dirname } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from '../kb/node_modules/sharp/lib/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'site', 'public');
const ICONS_DIR = join(OUT, 'icons');
mkdirSync(ICONS_DIR, { recursive: true });

// Brand colors
const BG = '#0a0a0a';
const FG = '#ffffff';

// --- Favicon SVG (square with "H") ---
function iconSvg(size) {
  const fontSize = Math.round(size * 0.65);
  const y = Math.round(size * 0.72);
  const rx = Math.round(size * 0.15);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="${BG}"/>
  <text x="${size/2}" y="${y}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="${fontSize}" fill="${FG}">H</text>
</svg>`);
}

// --- OG Image SVG (1200x630) ---
function ogSvg() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <text x="600" y="280" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="72" fill="${FG}">HYRAHMO</text>
  <text x="600" y="360" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="28" fill="#737373">builder / thinker / systems person</text>
  <text x="600" y="420" text-anchor="middle" font-family="monospace" font-weight="400" font-size="20" fill="#525252">hyrahmo.com</text>
</svg>`);
}

// Generate icons
const sizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(iconSvg(size))
    .png()
    .toFile(join(ICONS_DIR, name));
  console.log(`Generated ${name}`);
}

// Generate OG image
await sharp(ogSvg())
  .png()
  .toFile(join(OUT, 'og.png'));
console.log('Generated og.png');

// Also copy og.png to kb static for Quartz OG
await sharp(ogSvg())
  .png()
  .toFile(join(__dirname, '..', 'kb', 'quartz', 'static', 'og-image.png'));
console.log('Generated kb og-image.png');

console.log('All icons generated!');
