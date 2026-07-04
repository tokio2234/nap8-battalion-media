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

export const collections = { posts };
