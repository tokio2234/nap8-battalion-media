import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The single "posts" collection. Every post — Events, School, Culture —
 * lives in src/content/posts/ as a Markdown file and uses this schema.
 * The `story` from the content model is the Markdown body of the file.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(['events', 'school', 'culture']),
      location: z.string().optional(),
      // Landscape cover photo. image() resolves the relative path and
      // enables build-time optimization (WebP, responsive sizes).
      cover_photo: image(),
      // Required for accessibility — every image needs alt text.
      cover_alt: z.string(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          })
        )
        .min(5)
        .max(30),
      tags: z.array(z.string()).default([]),
    }),
});

/**
 * The "settings" collection holds site-wide editable content that isn't a post.
 * Right now that's the landing page (src/content/settings/landing.yml): the hero
 * photo, the three crossfade photos, the three category-tile photos, and the two
 * lines of hero/identity copy. Edited at /admin under "Site settings".
 */
const settings = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/settings' }),
  schema: ({ image }) =>
    z.object({
      tagline: z.string(),
      identity_line: z.string(),
      // All landing images are decorative (text is overlaid on them), so no
      // alt text is needed. image() gives build-time WebP + responsive sizes.
      hero: image(),
      identity_images: z.array(image()).min(1).max(3),
      door_events: image(),
      door_school: image(),
      door_culture: image(),
    }),
});

export const collections = { posts, settings };
