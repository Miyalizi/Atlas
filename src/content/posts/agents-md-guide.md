---
title: 一份好的 AGENTS.md / CLAUDE.md 长什么样
date: 2026-10-17
tags: [AI编程, Harness]
description: 像飞行员的检查单，而不是公司的员工手册。
---

几乎所有编程 Agent 都会在开工时读一份项目说明：Codex、Cursor、Gemini CLI 读 `AGENTS.md`，Claude Code 读 `CLAUDE.md`。两份可以共存，共同部分保持同步即可。

这份文件每次对话都会被塞进上下文，所以**每一行都在花钱**，也在稀释其他指令的权重。

## 该写什么

```markdown
# 项目
Astro 7 静态博客，内容在 src/content/。

# 命令
- 开发：npm run dev
- 构建并检查：npm run build && npm run check

# 规则
- 新文章放 src/content/posts/，frontmatter 字段见 src/content.config.ts
- 站内链接用 /posts/slug/ 形式，不要写完整域名
- 不要修改 package-lock.json，除非任务就是升级依赖
```

- 项目是什么，一两句话。
- 怎么构建、测试、启动。这是 Agent 最常需要的信息。
- 少量**踩过坑**的规则。每条都能说出“上次它在这里出过错”。

## 不该写什么

- 代码风格细则：交给 formatter 和 lint，用 [Hook](/notes/claude-code-hooks/) 自动跑。
- 大段架构说明：放进 `docs/`，需要时让它自己读。
- 过时的信息：错误的说明比没有更糟。
- 重复流程的步骤：写成 [Skill](/posts/agent-skills-guide/)，按需加载。

## 维护方法

- 每次 Agent 犯了可预防的错，问自己：加一条规则，还是加一个检查？能用检查就别用规则。
- 每隔一两个月读一遍，删掉新模型已经不需要的提醒。模型越来越聪明，以前的“请务必”可能反而让它过度谨慎。

这就是 [Harness 工程](/posts/harness-engineering/)里“指令层”的全部要点。
