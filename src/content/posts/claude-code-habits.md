---
title: Claude Code 终端版的十个好习惯
date: 2026-10-20
tags: [AI编程, Claude Code]
description: 从说明文件到上下文管理，十个让 Claude Code 更稳、更省的日常习惯。
---

用 Claude Code 一年多，真正拉开差距的不是提示词技巧，而是一些很朴素的习惯。

1. **项目根目录放一份短的 `CLAUDE.md`**。写构建、测试命令和三五条真正踩过坑的规则，别写成风格指南。详见[一份好的 AGENTS.md](/posts/agents-md-guide/)。同时维护 `AGENTS.md` 也没问题，两者可以共存。
2. **先计划，后动手**。大改动先让它出计划（plan mode），你确认后再执行，返工少很多。
3. **点名文件**。直接说“改 `src/lib/content.ts` 里的 `excerpt`”，比让它自己满仓库找省 token、也更准。
4. **一次只给一个目标**。“顺便把 xx 也改了”是 diff 变得难审的主要原因。
5. **用 Hooks 管硬规则**。编辑后自动格式化、跑类型检查，危险命令直接拦截，见[用 Hooks 把规则变成硬约束](/notes/claude-code-hooks/)。
6. **长对话及时压缩或重开**。上下文越长越贵，也越容易跑偏。新版在终端里会对闲置的超长对话做自动压缩。方法见[上下文管理](/posts/context-management/)。
7. **把重复流程写成 Skill**。发版、写周报、建新文章这类固定流程，写成 [SKILL.md](/posts/agent-skills-guide/)，以后一句话触发。
8. **用 `/usage` 和状态栏看消耗**。心里有数，才不会月底被限额卡住（见[别让账单失控](/posts/ai-cost-control/)）。
9. **auto mode 先调好再放手**。新版有 `/auto-mode-setup`，会读你的项目和近期会话来调整自动模式的放行规则。
10. **让它写测试，你来审测试**。测试是你和 Agent 之间的合同，见[审 AI 写的代码](/posts/review-ai-code/)。

如果你更习惯图形界面，这些习惯在[桌面版](/posts/claude-code-desktop/)里同样适用。想换成国产模型跑，参考[把 DeepSeek 接进 Claude Code](/notes/deepseek-in-claude-code/)。

参考：Claude Code 官方更新日志（2026-10）；[Claude Code Changelog](https://www.gradually.ai/en/changelogs/claude-code/)。
