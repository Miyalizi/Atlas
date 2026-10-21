import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 五类内容放在 src/content/ 下各自的文件夹里，共用一个集合，方便互相引用和统一检索
const entries = defineCollection({
  loader: glob({ base: './src/content', pattern: '{posts,notes,media,projects,links}/**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // 书影音
    creator: z.string().optional(),
    kind: z.enum(['book', 'film', 'series', 'music', 'game', 'podcast']).optional(),
    rating: z.number().min(0).max(5).optional(),
    // 收藏链接
    url: z.string().optional(),
    // 项目作品
    status: z.enum(['进行中', '已完成', '已归档']).optional(),
    repo: z.string().optional(),
  }),
});

// Now、关于 这类独立页面
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    location: z.string().optional(),
  }),
});

export const collections = { entries, pages };
