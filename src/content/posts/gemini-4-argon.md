---
title: Gemini 4 Argon 与 Antigravity：谁值得用
date: 2026-10-16
tags: [模型选型, Gemini]
description: 超长上下文最强、首发促销价划算，但入口限制不少。
---

Google 的 Gemini 4 Argon 在 2026 年 10 月 13 日正式开放（模型 ID `gemini-4-argon`）。

## 值得关注的点

- **长上下文能力突出**：1M 上下文，在 GraphWalks 这类 256K–1M 的长上下文测试里，Google 公布的成绩是 84.2%，明显领先 Claude Opus 5.5 的 66.8%。如果你的任务是“读完整个仓库/一整本文档再回答”，它值得一试。
- **促销价**：到 2026 年 11 月 30 日前，每百万 token 输入 $2、输出 $10；12 月 1 日起翻倍到 $4/$20。缓存输入 $0.10。思考 token 计入输出。
- **没有免费额度**：API 只有付费档。

## 弱项

- 在 Terminal-bench 4.0 这种终端 Agent 任务上，它（57.4%）落后于 Opus 5.5（66.4%）。日常写代码、跑命令的 Agent 场景，未必是最优。
- 很多对比数据是 Google 自己算的，独立评测还不多，读榜方法见[怎么读榜单](/notes/reading-benchmarks/)。

## 入口有点乱

- **Gemini API / Vertex AI / OpenRouter**：可用。
- **Gemini App**：Google AI Pro 和 Ultra 订阅陆续开放。
- **AI Studio 网页版**：需要 Ultra。
- **Antigravity（Google 的 Agent 开发工具）**：Ultra 和部分企业版可用。
- **Gemini CLI**：截至发布时还停留在 3.1 Pro。

所以如果你只订了 AI Pro（$19.99/月），能在 App 里用，但编程工具链里用不上。订阅怎么选见 [Google AI 套餐值不值](/posts/overseas-plans/#google)。

## 我的用法

把它当成“长文档专家”：一次性塞进大量资料做分析、写总结、找矛盾。日常编程主力还是交给 [Claude 或 Codex](/posts/model-selection-2026/)。趁促销期价格和 Sonnet 5.5 同档，可以多试试。

参考：[Gemini 4 Argon released: features, benchmarks](https://computingforgeeks.com/gemini-4-argon-released-features-benchmarks/)。
