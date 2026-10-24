# Lizi · 星图 Atlas

Lizi 的个人博客，也是长期档库。用 [Astro](https://astro.build) 构建，所有内容都是 `src/content/` 里的 Markdown 文件。

## 本地运行

需要 Node.js 22.12 或更高版本。

```bash
npm install
npm run dev        # 打开 http://localhost:4321 ，改文件会自动刷新
npm run build      # 构建静态网站到 dist/
npm run preview    # 本地预览构建结果
```

## 新增内容

五类内容各有一个文件夹，文件名就是网址：

| 类型 | 文件夹 | 网址 |
| --- | --- | --- |
| 长文章 | `src/content/posts/` | `/posts/文件名/` |
| 短笔记 | `src/content/notes/` | `/notes/文件名/` |
| 书影音 | `src/content/media/` | `/media/文件名/` |
| 项目作品 | `src/content/projects/` | `/projects/文件名/` |
| 收藏链接 | `src/content/links/` | `/links/文件名/` |

文件名建议用英文小写和连字符，比如 `src/content/posts/my-first-post.md`。

每个文件开头是一段 frontmatter：

```markdown
---
title: 文章标题
date: 2026-10-21
tags: [摄影, AI]
description: 一句话摘要，会显示在列表、搜索和 RSS 里（可选）
draft: false        # 改成 true 就不会发布，本地开发时仍可见
---

正文从这里开始。
```

不同类型还有几个可选字段：

- 书影音：`kind`（book / film / series / music / game / podcast）、`creator`、`rating`（0–5）
- 收藏链接：`url`
- 项目作品：`status`（进行中 / 已完成 / 已归档）、`repo`

### 互相引用

用普通的 Markdown 链接，写站内路径即可：

```markdown
我在[暗房那篇](/posts/ai-darkroom/)里写过这件事。
```

构建时会自动：

- 在被引用的页面底部显示「引用了本文的内容」，并附上引用所在的那句话
- 在首页知识星图里画出连线
- 鼠标悬停这个链接时弹出预览卡

### 提示框

引用块第一行写 `[!NOTE]`、`[!TIP]` 或 `[!WARNING]`，会变成“说明 / 提示 / 注意”提示框；普通引用块会显示成醒目的金句：

```markdown
> [!NOTE] 价格变化很快，下单前请以官网为准。

> 档案的价值不在于保存了多少，而在于你能多快找到需要的那一张。
```

### Now 和关于

分别编辑 `src/content/pages/now.md` 和 `src/content/pages/about.md`。Now 页面记得更新 `updated` 日期。

### MDX

需要在文章里用组件时，把扩展名改成 `.mdx`，示例见 `src/content/posts/inference-cost.mdx`。日常写作用 `.md` 就够了，以后迁移到别的工具也最省事。

### 示例内容

现在的 14 条内容都是示例，可以直接删掉或改成你自己的。

## 部署到 Cloudflare Pages（免费）

1. 打开 Cloudflare 控制台 → Workers & Pages → 创建 → Pages → 连接到 Git，选择这个仓库。
2. 框架预设选 **Astro**，或者手动填写：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 环境变量：`NODE_VERSION` = `22`
3. 保存并部署。之后每次推送到 `main` 都会自动重新部署。
4. 部署好后，把 `astro.config.mjs` 里的 `site` 和 `public/robots.txt` 里的地址改成你的正式域名，RSS 和 sitemap 会用到它。

Vercel 和 Netlify 也一样：导入仓库，构建命令 `npm run build`，输出目录 `dist`。

## 结构

```
src/
  content/          所有内容（Markdown）
  content.config.ts 内容字段定义
  site.config.ts    站名、简介等基础信息
  lib/content.ts    双向链接、星图数据、摘要等
  pages/            路由：首页、详情页、归档、标签、Now、关于、RSS、搜索索引
  scripts/          命令面板、深浅色、预览卡、知识星图、阅读进度
  styles/global.css 全部样式和配色
```

## 快捷键

- `⌘K` / `Ctrl+K` 或 `/`：打开命令面板，搜索全文、跳转页面、切换深浅色
- 星图里：拖动平移，`⌘`/`Ctrl` + 滚轮缩放，点击节点进入
