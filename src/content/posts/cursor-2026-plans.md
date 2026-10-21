---
title: Cursor 新套餐怎么选
date: 2026-10-15
tags: [AI编程, Cursor, 订阅与成本]
description: $8 到 $200，五档里个人开发者该停在哪一档？
---

Cursor 在 2026 年改了套餐结构，现在面向个人的是五档：

| 档位 | 月费 | 包含用量 | 第三方模型 |
|---|---|---|---|
| Free | $0 | 有限 | 不可用 |
| Plus | $8 | 基础 | 不可用 |
| Premium | $30 | Plus 的 4 倍 | 按 API 原价从预付额度扣 |
| Super | $100 | Plus 的 15 倍 | 同上 |
| Ultra | $200 | Plus 的 50 倍 | 同上 |

年付有折扣（Plus $80/年，Premium $300/年）。

## 关键变化

- **包含用量只覆盖 Cursor 自己的模型**：Composer 2.5 和 Grok 4.5–4.7 系列，共用一个每周额度池。
- **Claude、Gemini、GPT 等第三方模型从 Premium 起才能用**，而且按 API 原价扣你预付的钱。
- **Composer 2.5 很便宜**：每百万 token 输入 $0.5、输出 $2.5，Plus 档也能用（固定为中等推理强度、不开 Fast）。
- Plus 档没有 Cloud Agents、Automations、Bugbot。

## 怎么选

- **只想要一个好用的编辑器 + 补全 + 便宜模型**：Plus（$8）。
- **主力用 Cursor，偶尔要 Claude/GPT 处理难题**：Premium（$30）。
- **已经订了 Claude Pro 或 ChatGPT Plus**：很可能不需要 Cursor 的高档位。用 Claude Code 或 Codex 处理 Agent 任务，Cursor 停在 Plus 当编辑器，是一个不错的组合，见[全球订阅性价比](/posts/global-best-value/)。

注意第三方模型“按原价扣预付额度”这一点：用 Cursor 调 Claude Opus 5.5，和直接用 Anthropic API 价格一样，订阅本身没有给你折扣。这是它和 [Claude Max](/posts/claude-plans/) 这类订阅的本质区别，算账方法见[订阅还是 API](/posts/subscription-vs-api/)。

参考：[Cursor Models & Pricing](/links/cursor-pricing/)。
