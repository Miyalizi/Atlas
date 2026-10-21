---
title: Routines：让 Claude Code 在你睡觉时干活
date: 2026-10-18
tags: [AI编程, Claude Code, 自动化]
description: 定时、Webhook、GitHub 事件三种触发，把重复维护活交给云端。
---

Routines 是 Claude Code 在 2026 年 4 月推出的云端自动化（研究预览）：把一段提示词、要操作的仓库和连接器存成一个配置，放在 Anthropic 的云上运行，你的电脑关机也不影响。

## 三种触发方式

- **定时**：类似 cron，适合每周依赖升级、每晚 lint 扫描。
- **API**：每个 Routine 有自己的 HTTP 地址和令牌，可以接监控告警或 CI。
- **GitHub 事件**：PR 打开、issue 被打标签时自动跑。

每次运行都有一个会话链接，可以回看它做了什么，相当于审计日志。

## 额度

发布时公布的每日次数是 Pro 5 次、Max 15 次、Team/Enterprise 25 次（研究预览期间可能调整），而且和你的日常用量共用池子。

## 个人开发者适合放进去的活

- 每周一早上：检查依赖更新，能自动升级的开 PR，不能的列个清单。
- 新 issue 进来：先分类、打标签、复现一下，给你一段摘要。
- 每晚：跑一遍全量测试和死链检查，挂了就开 issue。
- 博客：每周汇总本周笔记，生成一篇草稿 PR（别自动发布，草稿要人审）。

## 注意

- Routine 运行时没人看着，权限要收紧：只给需要的仓库和连接器。
- 产出一律走 PR，不要直接推主分支。
- 失败要能被发现：最近版本会在 Routine 页面标注上次没启动的原因（比如并发会话数到上限）。

OpenAI 那边的对应功能是 Codex App 的 Automations，见[用好 Codex](/posts/codex-guide/)。

参考：[Anthropic Launches Claude Code Routines](https://noqta.tn/en/news/anthropic-claude-code-routines-cloud-automation-2026)。
