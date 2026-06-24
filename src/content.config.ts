import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    image: z.string(),
    tag: z.string(),
    readTime: z.string(),
    author: z.string().default('DOYEN Editorial'),
  }),
});

export const collections = {
  news: newsCollection,
};
