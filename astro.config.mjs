// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import prose from './src/lib/prose-plugin.mjs';

export default defineConfig({
  // 部署后改成你自己的域名，RSS 和 sitemap 会用到它
  site: 'https://lizi-atlas.pages.dev',
  trailingSlash: 'always',
  // 合并或改名的文章：旧网址跳到新位置，已经分享出去的链接不会失效
  redirects: {
    '/posts/claude-plans/': '/posts/overseas-plans/#claude',
    '/posts/chatgpt-codex-plans/': '/posts/overseas-plans/#chatgpt-与-codex',
    '/posts/cursor-2026-plans/': '/posts/overseas-plans/#cursor',
    '/posts/google-ai-plans/': '/posts/overseas-plans/#google',
  },
  integrations: [mdx(), sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // 支持的浏览器（Chrome/Edge）在悬停时直接预渲染目标页，点下去几乎是瞬开
  experimental: { clientPrerender: true },
  markdown: {
    // 表格容器、提示框、内外链区分，见 src/lib/prose-plugin.mjs
    processor: satteri({ hastPlugins: [prose] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
      wrap: false,
    },
  },
});
