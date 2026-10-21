---
title: 怎么用好 Harness：模型之外的那一半
date: 2026-10-21
tags: [AI编程, Agent, Harness]
description: Agent = 模型 + Harness。换模型之前，先把模型外面那层“马具”调好。
---

今年最常听到的一句话是 **Agent = Model + Harness**。Harness 原意是马具，在 AI 编程里指模型之外的一切：系统提示、`AGENTS.md`/`CLAUDE.md`、工具和 MCP、沙箱与文件系统、子 Agent 调度、Hooks、日志与成本统计。Claude Code、Codex、Cursor 本质上都是不同的 Harness，同一个模型放进去，表现可以差一大截。

对个人开发者来说，这意味着：**与其每个月追新模型，不如把自己的 Harness 打磨好**。它跟着你走，换模型也不会丢。

## Harness 的六个部件

参考 Addy Osmani 的[整理](/links/addy-harness-engineering/)，可以把 Harness 拆成六块：

1. **指令**：系统提示、项目说明文件、技能文件。写法见[一份好的 AGENTS.md](/posts/agents-md-guide/)。
2. **工具**：内置工具、[Skills](/posts/agent-skills-guide/)、[MCP](/posts/mcp-practical/)。工具越少越清晰，十个好工具胜过五十个重叠工具。
3. **基础设施**：文件系统、沙箱、浏览器。
4. **编排**：子 Agent、交接、模型路由（见[模型路由](/posts/model-routing/)）。
5. **约束**：Hooks、lint、测试，把“请不要”变成“做不到”。见[用 Hooks 把规则变成硬约束](/notes/claude-code-hooks/)。
6. **可观测**：日志、成本、耗时。

## 我的做法

- **把错误当信号**。Agent 犯一次错，就加一条规则、一个 Hook 或一个检查，让它不再犯第二次。说明文件里的每一条规则，都应该能追溯到一次真实的翻车。
- **关键规则用 Hook 强制，不靠提示词**。比如禁止 `rm -rf`、编辑后自动跑类型检查。成功时安静，失败时输出详细信息，Agent 才能自己修。
- **生成和评审分开**。Agent 给自己打分普遍偏高，验收标准要在动手前定好（见[先写验收标准](/notes/acceptance-first/)）。
- **用文件和 git 存状态**。计划写进文件、阶段性提交，[上下文](/posts/context-management/)重置也不会丢进度。
- **定期做减法**。模型变强后，以前为弱模型加的脚手架可能反而碍事。

## 现成的 Harness 怎么选

- 想要最完整的 Hook 和子 Agent 体系：[Claude Code](/posts/claude-code-desktop/)。
- 想要操作系统级沙箱、并行 worktree：[Codex](/posts/codex-guide/)。
- 想用国产模型又不想换工具：很多国产模型提供 Anthropic 兼容端点，可以直接塞进 Claude Code，见[把 DeepSeek 接进 Claude Code](/notes/deepseek-in-claude-code/)。DeepSeek 自己也在做面向 Harness 开发者的 DeepSeek Harness（开发者预览）。

一句话：模型决定上限，Harness 决定你每天实际拿到多少。

参考：[Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/)（Addy Osmani，2026-04）、[Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)。
