// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 部署后改成你自己的域名，RSS 和 sitemap 会用到它
  site: 'https://lizi-atlas.pages.dev',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // 支持的浏览器（Chrome/Edge）在悬停时直接预渲染目标页，点下去几乎是瞬开
  experimental: { clientPrerender: true },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
      wrap: false,
    },
  },
});
