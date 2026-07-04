import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategorySlug } from '../config/site';

export type Post = CollectionEntry<'posts'>;

/** All posts, newest first (ties broken by title). Optionally filtered by category. */
export async function getPosts(category?: CategorySlug): Promise<Post[]> {
  const posts = await getCollection('posts');
  const filtered = category ? posts.filter((p) => p.data.category === category) : posts;
  return filtered.sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime() ||
      a.data.title.localeCompare(b.data.title)
  );
}

/** Canonical URL for a post: /[category]/[year]/[slug]/ */
export function postUrl(post: Post): string {
  return `/${post.data.category}/${postYear(post)}/${post.id}/`;
}

/** Year of the post, in UTC so it matches the frontmatter date exactly. */
export function postYear(post: Post): number {
  return post.data.date.getUTCFullYear();
}

/** Distinct years present in a list of posts, newest first. */
export function postYears(posts: Post[]): number[] {
  return [...new Set(posts.map(postYear))].sort((a, b) => b - a);
}

/** e.g. "2 July 2026" */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Plain-text excerpt from the first paragraph of the story,
 * used on cards and in the landing page "Latest" section.
 */
export function excerpt(post: Post, maxLength = 170): string {
  const firstParagraph = (post.body ?? '').trim().split(/\n\s*\n/)[0] ?? '';
  const text = firstParagraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links -> link text
    .replace(/[#>*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}
