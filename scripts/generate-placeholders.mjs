/**
 * Generates the placeholder images used by the seed content and the
 * landing page. Run with `npm run placeholders` (from the project root).
 *
 * Each placeholder is a dark, labelled gradient JPEG. Replace them with
 * real photographs as they become available — same filenames, or update
 * the references in src/pages/index.astro and src/content/posts/.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SITE_DIR = 'src/assets/site';
const UPLOADS_DIR = 'src/assets/uploads';

// [file, width, height, gradientFrom, gradientTo, label]
const images = [
  // Landing page imagery
  [`${SITE_DIR}/hero.jpg`, 1920, 1160, '#1c2a22', '#0b100d', 'Hero photograph'],
  [`${SITE_DIR}/identity-01.jpg`, 1600, 1000, '#26221c', '#12100d', 'Identity photo 1'],
  [`${SITE_DIR}/identity-02.jpg`, 1600, 1000, '#1f2626', '#0f1414', 'Identity photo 2'],
  [`${SITE_DIR}/identity-03.jpg`, 1600, 1000, '#2a1d1a', '#140d0c', 'Identity photo 3'],
  [`${SITE_DIR}/door-events.jpg`, 1200, 1500, '#232633', '#10121a', 'Events'],
  [`${SITE_DIR}/door-school.jpg`, 1200, 1500, '#1e2b26', '#0d1512', 'School'],
  [`${SITE_DIR}/door-culture.jpg`, 1200, 1500, '#33201d', '#170e0c', 'Culture'],

  // Post: Tuluni Celebration (culture)
  [`${UPLOADS_DIR}/tuluni-cover.jpg`, 1600, 1000, '#31211c', '#140e0b', 'Tuluni — cover'],
  [`${UPLOADS_DIR}/tuluni-01.jpg`, 1600, 1067, '#2b241b', '#120f0b', 'Tuluni 1'],
  [`${UPLOADS_DIR}/tuluni-02.jpg`, 1600, 1067, '#22281f', '#0e110d', 'Tuluni 2'],
  [`${UPLOADS_DIR}/tuluni-03.jpg`, 1600, 1067, '#2e1e22', '#130d0f', 'Tuluni 3'],
  [`${UPLOADS_DIR}/tuluni-04.jpg`, 1600, 1067, '#252331', '#0f0e15', 'Tuluni 4'],
  [`${UPLOADS_DIR}/tuluni-05.jpg`, 1600, 1067, '#33261a', '#15100b', 'Tuluni 5'],

  // Post: Raising Day Parade (events)
  [`${UPLOADS_DIR}/raising-day-cover.jpg`, 1600, 1000, '#1f2433', '#0d0f15', 'Raising Day — cover'],
  [`${UPLOADS_DIR}/raising-day-01.jpg`, 1600, 1067, '#252c3a', '#0f1219', 'Raising Day 1'],
  [`${UPLOADS_DIR}/raising-day-02.jpg`, 1600, 1067, '#1d2a2e', '#0c1214', 'Raising Day 2'],
  [`${UPLOADS_DIR}/raising-day-03.jpg`, 1600, 1067, '#2a2733', '#111015', 'Raising Day 3'],
  [`${UPLOADS_DIR}/raising-day-04.jpg`, 1600, 1067, '#212f3a', '#0d1319', 'Raising Day 4'],
  [`${UPLOADS_DIR}/raising-day-05.jpg`, 1600, 1067, '#2c2230', '#120e14', 'Raising Day 5'],

  // Post: Annual Sports Meet (school)
  [`${UPLOADS_DIR}/sports-meet-cover.jpg`, 1600, 1000, '#1e2d24', '#0c130f', 'Sports Meet — cover'],
  [`${UPLOADS_DIR}/sports-meet-01.jpg`, 1600, 1067, '#243026', '#0f1410', 'Sports Meet 1'],
  [`${UPLOADS_DIR}/sports-meet-02.jpg`, 1600, 1067, '#2b2f20', '#12140e', 'Sports Meet 2'],
  [`${UPLOADS_DIR}/sports-meet-03.jpg`, 1600, 1067, '#1f2b30', '#0d1214', 'Sports Meet 3'],
  [`${UPLOADS_DIR}/sports-meet-04.jpg`, 1600, 1067, '#2f2a1e', '#14120d', 'Sports Meet 4'],
  [`${UPLOADS_DIR}/sports-meet-05.jpg`, 1600, 1067, '#25321f', '#10150d', 'Sports Meet 5'],
];

function svgFor(width, height, from, to, label) {
  const big = Math.round(width * 0.05);
  const small = Math.round(width * 0.014);
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <line x1="0" y1="${height * 0.82}" x2="${width}" y2="${height * 0.62}" stroke="rgba(241,237,228,0.06)" stroke-width="2"/>
    <line x1="0" y1="${height * 0.92}" x2="${width}" y2="${height * 0.72}" stroke="rgba(241,237,228,0.04)" stroke-width="2"/>
    <text x="50%" y="48%" font-family="Georgia, serif" font-size="${big}" fill="rgba(241,237,228,0.32)" text-anchor="middle">${label}</text>
    <text x="50%" y="48%" dy="${big * 1.1}" font-family="Arial, sans-serif" font-size="${small}" letter-spacing="4" fill="rgba(241,237,228,0.25)" text-anchor="middle">PLACEHOLDER — REPLACE WITH A REAL PHOTO</text>
  </svg>`;
}

await mkdir(SITE_DIR, { recursive: true });
await mkdir(UPLOADS_DIR, { recursive: true });

for (const [file, width, height, from, to, label] of images) {
  await sharp(Buffer.from(svgFor(width, height, from, to, label)))
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(file);
  console.log('wrote', path.normalize(file));
}
console.log(`\n${images.length} placeholder images generated.`);
