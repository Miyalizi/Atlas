---
title: 订阅还是 API：算一笔账
date: 2026-10-20
tags: [订阅与成本, 模型选型]
description: 一天做一两个任务，订阅就已经比 API 划算了。
---

很多人纠结：$20 的订阅够不够用？要不要直接买 API 按量付费？

## 先看一组测算

第三方按 2026 年 10 月标价做过一个估算：修一个 bug 大约是 25 次调用、累计 40 万输入 token；做一个功能大约 100 次调用、200 万输入 token。按 API 价格：

| 模型 | 修 bug | 做功能 |
|---|---|---|
| Haiku 5.5 / GPT-6 Luna | $0.02 | $0.08 |
| DeepSeek V4.1 Flash | $0.04 | $0.18 |
| Sonnet 5.5 / GPT-6.1 Sol | $0.33 | $1.36 |
| Opus 5.5 | $0.66 | $2.72 |
| Fable 5.1 | $1.58 | $6.40 |

（已计入提示缓存。来源：[AI Coding Costs 2026](/links/ai-coding-costs/)）

## 结论

- **轻度使用（每天两三个任务）**：$20 的 Claude Pro 或 ChatGPT Plus 就够，而且比 API 划算。
- **重度使用（每天 8–12 个任务）**：Claude Max 5x（$100）的回本点大约是每月 150 次 Opus 修 bug 或 36 个功能，重度用户很容易超过。
- **重度 + 自动化**：Max 20x 加一个 API Key 兜底溢出。
- **预算很紧**：DeepSeek V4.1 Flash 的 API，或 Codex Go（$8）。

Anthropic 公布的 Claude Code 平均花费约为每个开发者每个活跃日 $13，也就是每月 $150–250。重度用户可以到每月几百甚至上千美元，这时订阅的优势非常明显。

## 什么时候反而该用 API

- **你在开发 AI 产品**，需要程序化调用。
- **批量离线任务**：Batch API 半价，DeepSeek 错峰更便宜。
- **用量极低**：一个月就用几次，按量付费更省。
- **需要订阅里没有的模型**。

## 一个容易忽略的点

Cursor 的第三方模型是按 API 原价从预付额度里扣的，订阅本身不打折。而 Claude Max、ChatGPT Pro 是**固定价格换一大块额度**，用得越多越划算。这两种“订阅”本质不同，见 [Cursor 新套餐怎么选](/posts/overseas-plans/#cursor)。

具体每家怎么选档位：[Claude](/posts/overseas-plans/#claude)、[ChatGPT / Codex](/posts/overseas-plans/#chatgpt-与-codex)、[Google](/posts/overseas-plans/#google)、[国产 Coding Plan](/posts/china-coding-plans/)。
