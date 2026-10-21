---
title: 并行 Agent 工作流：一个人带一个小队
date: 2026-10-14
tags: [AI编程, Agent, 工作流]
description: 瓶颈从“写代码”变成了“审代码”，工作方式也要跟着变。
---

2026 年的编程工具几乎都在往同一个方向走：**同时跑多个 Agent**。Claude Code 桌面版有会话侧栏，Codex App 每个线程一个 worktree，Cursor 有 Cloud Agents。

## 为什么要并行

单个 Agent 干活时，你大部分时间在等。并行之后，你的角色变成“派活 + 验收”，一天能推进的事情多出好几倍。

## 基本做法

1. **拆成互不冲突的任务**。改不同的文件、不同的模块。两个 Agent 改同一个文件，合并时一定痛苦。
2. **每个任务一个隔离环境**。git worktree 是最轻的方案：同一个仓库的多个工作目录，共享 `.git`。Codex App 自动建；Claude Code 可以在会话里让它建，或者用云端会话。
3. **每个任务带验收标准**。“完成”的定义写清楚，见[先写验收标准](/notes/acceptance-first/)。
4. **集中审**。不要每个 Agent 跑一步看一步，攒到一起审 diff，效率更高。审什么见[审 AI 写的代码](/posts/review-ai-code/)。

## 并行几个合适

我的经验是 **3–4 个**。再多，你审不过来，质量会掉，还可能和[用量额度](/posts/ai-cost-control/)撞墙。Pro/Plus 档的 5 小时窗口，开四个并行会话可能一两个小时就见底。

## 适合并行的任务

- 修几个互不相关的小 bug
- 给不同模块补测试
- 一个写功能，一个写文档
- 调研：同时让几个 Agent 分别看不同的库，然后对比

## 不适合并行的任务

- 大重构：先让一个 Agent 出计划，你确认后再拆。
- 依赖链很强的任务：B 依赖 A 的结果，硬并行只会返工。

工具细节见 [Claude Code 桌面版](/posts/claude-code-desktop/)和 [Codex](/posts/codex-guide/)。
