---
title: Agent Skills：把重复流程写成 SKILL.md
date: 2026-10-17
tags: [AI编程, Agent, Harness]
description: 一个文件夹 + 一份说明，三十多个工具都能用。
---

Skills 最早是 Anthropic 在 2025 年底推出的格式，到 2026 年已经成了事实标准：Claude Code、Codex CLI、GitHub Copilot、Gemini CLI、JetBrains Junie 原生支持，Cursor、Trae、OpenCode 等也以不同程度兼容。

## 它解决什么问题

`CLAUDE.md` 每次都全量加载，写多了又贵又乱。Skill 是**按需加载**：Agent 启动时只看每个 Skill 的名字和一句描述，任务匹配上了才读全文。这叫“渐进披露”。

## 结构

```
my-skill/
  SKILL.md        必需
  scripts/        可选，脚本
  references/     可选，参考资料
  assets/         可选，模板等
```

`SKILL.md` 顶部是 YAML，`name` 和 `description` 必填，下面是 Markdown 写的步骤：

```markdown
---
name: new-blog-post
description: 在 Atlas 博客里新建一篇文章，包括 frontmatter、slug 和内链检查
---

1. 问清标题、类型（posts/notes/links）和主标签
2. 用英文短横线生成 slug，放到 src/content/<类型>/<slug>.md
3. frontmatter 至少包含 title、date、tags，主标签放第一位
4. 正文里的站内链接用 /posts/slug/ 形式
5. 运行 npm run build 确认没有报错
```

## 写好 Skill 的要点

- **description 决定会不会被触发**。写清“什么时候用”，而不是“它是什么”。
- 一个 Skill 只做一件事。
- 能用脚本的步骤就放进 `scripts/`，比让模型每次重新推理稳定。
- 放进仓库，团队和不同工具都能复用。

和 [MCP](/posts/mcp-practical/) 的区别：MCP 是给 Agent 接新的能力（比如读数据库），Skill 是教 Agent 一套做事的流程。两者都是 [Harness](/posts/harness-engineering/) 的工具层。

参考：[SKILL.md Open Standard Reaches 30+ AI Coding Tools](/links/skill-md-standard/)。
