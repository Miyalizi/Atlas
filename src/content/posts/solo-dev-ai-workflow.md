---
title: 一个人的 AI 开发流水线：从想法到上线
date: 2026-10-13
tags: [独立开发, AI编程, 工作流]
description: 个人开发者用 AI 做一个小产品的完整流程。
---

把这一系列文章串起来，是我现在做一个小项目的流程。

## 1. 想法 → 需求文档

和旗舰模型（Opus 5.5 或 GPT-6 Astra）聊清楚：给谁用、解决什么问题、第一版只做哪三件事。让它输出一页需求文档，存进仓库。

## 2. 搭骨架

新建仓库，写好 [AGENTS.md / CLAUDE.md](/posts/agents-md-guide/)，配好格式化、lint、测试和 [Hooks](/notes/claude-code-hooks/)。这一步花一小时，后面省十小时。

## 3. 拆任务、并行做

把需求拆成互不冲突的小任务，每个带[验收标准](/notes/acceptance-first/)，用 [Claude Code 桌面版](/posts/claude-code-desktop/)或 [Codex App](/posts/codex-guide/) 并行跑三四个。

## 4. 审查

集中审 diff，换个会话做安全审查，见[审 AI 写的代码](/posts/review-ai-code/)和[安全清单](/posts/vibe-coding-security/)。

## 5. 上线

静态站点用 Cloudflare Pages 这类免费托管（这个博客就是）；有后端的，数据库权限一定要逐表检查。

## 6. 维护自动化

依赖升级、死链检查、issue 分类，交给 [Routines](/posts/claude-code-routines/) 或 Codex Automations，产出一律走 PR。

## 7. 控制成本

日常用订阅，批量用便宜 API，每月看一次账单，见[别让账单失控](/posts/ai-cost-control/)和[三档预算配置](/posts/budget-stacks/)。

所有文章的索引见 [AI 开发者阅读地图](/posts/ai-reading-map/)。
