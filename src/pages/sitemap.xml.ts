/**
 * /sitemap.xml — every public page, generated at build time so new posts
 * appear automatically. Referenced from public/robots.txt.
 */
import type { APIRoute } from 'astro';
import { CATEGORY_SLUGS } from '../config/site';
import { getPosts, postUrl, postYears } from '../lib/posts';

const PAGE_SIZE = 12; // keep in sync with src/pages/[category]/[...page].astro

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const paths: { path: string; lastmod?: Date }[] = [
    { path: '/', lastmod: posts[0]?.data.date },
    { path: '/gallery/', lastmod: posts[0]?.data.date },
    { path: '/about/' },
  ];

  for (const category of CATEGORY_SLUGS) {
    const categoryPosts = posts.filter((p) => p.data.category === category);
    const pageCount = Math.max(1, Math.ceil(categoryPosts.length / PAGE_SIZE));
    paths.push({ path: `/${category}/`, lastmod: categoryPosts[0]?.data.date });
    for (let n = 2; n <= pageCount; n++) paths.push({ path: `/${category}/${n}/` });
    for (const year of postYears(categoryPosts)) {
      paths.push({ path: `/${category}/${year}/` });
    }
  }

  for (const post of posts) {
    paths.push({ path: postUrl(post), lastmod: post.data.date });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(({ path, lastmod }) => {
    const loc = new URL(path, site).href;
    const mod = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
    return `  <url><loc>${loc}</loc>${mod}</url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
