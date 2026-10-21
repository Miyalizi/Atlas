---
title: 2026 年 10 月，个人开发者怎么选模型
date: 2026-10-21
tags: [模型选型, AI编程]
description: 不追榜单第一，按任务分层选。一张表说清楚。
---

模型每个月都在换，但选法其实很稳定：**按任务难度分层，每层选性价比最好的那个**。下面是我在 2026 年 10 月的分层（价格为每百万 token 输入/输出的美元标价，详见[价格速查表](/posts/model-price-table/)）。

## 第一层：最难的活

架构设计、跨很多文件的重构、疑难 bug、需要长时间自主运行的 Agent 任务。

- **Claude Opus 5.5**（$4/$20）：9 月 22 日发布，比上一代 Opus 5 更便宜，Anthropic 称在不少测试里追平甚至超过更大的 Fable。这是我现在的默认主力。
- **GPT-6 Astra**（$10/$50）和 **Claude Fable 5.1**（$10/$50）：更贵的顶配，只在 Opus 5.5 搞不定时才上。两者的取舍见 [Opus 5.5 还是 Fable 5.1](/notes/opus-vs-fable/)。

## 第二层：日常编程

写功能、修 bug、写测试，占工作量的大头。

- **Claude Sonnet 5.5**（$2/$10）、**GPT-6.1 Sol**（$2/$10）：能力和价格几乎对位，看你习惯 [Claude Code](/posts/claude-code-habits/) 还是 [Codex](/posts/codex-guide/)。
- **Gemini 4 Argon**（促销期 $2/$10，12 月起 $4/$20）：长上下文最强，见 [Gemini 4 Argon](/posts/gemini-4-argon/)。
- 国产：**Kimi K3**、**GLM-5.3**、**Qwen3.8 Max**、**MiMo-V2.6-Pro**，在国产榜单编程项上互有胜负，见[国产模型怎么选](/posts/china-models-guide/)。

## 第三层：批量和杂活

分类、提取、翻译、摘要、子 Agent 里的搜索整理。

- **Claude Haiku 5.5**（$0.10/$0.50，100K 以内）、**GPT-6 Luna**（$0.10/$0.50）。
- **DeepSeek V4.1 Flash**：开放权重，错峰更便宜，见[用好 DeepSeek](/posts/deepseek-guide/)。
- 隐私要求高时：[本地模型](/posts/local-models/)。

## 三条原则

1. **用订阅覆盖日常，用 API 补充特殊需求**。算账方法见[订阅还是 API](/posts/subscription-vs-api/)。
2. **贵模型做计划，便宜模型干活**，见[模型路由](/posts/model-routing/)。
3. **别被榜单牵着走**，见[怎么读榜单](/notes/reading-benchmarks/)。新模型出来，先在自己的三五个真实任务上试一周，再决定换不换，见[模型每月一换，怎么不被折腾](/notes/model-churn/)。

> 本文价格来自各家官方文档与第三方汇总，截至 2026-10-20。价格变化很快，下单前请以官网为准。
