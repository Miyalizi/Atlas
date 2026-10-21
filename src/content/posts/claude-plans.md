---
title: Claude Pro 还是 Max：怎么选
date: 2026-10-19
tags: [订阅与成本, Claude Code]
description: $20、$100、$200 三档，分界线在哪里。
---

截至 2026 年 10 月，面向个人的 Claude 订阅：

| 档位 | 价格 | Claude Code | 用量 |
|---|---|---|---|
| Free | $0 | 不含 | 只能聊天 |
| Pro | $20/月（年付约 $17/月） | 含 | 每 5 小时一个窗口，另有周限额 |
| Max 5x | $100/月 | 含 | Pro 的 5 倍 |
| Max 20x | $200/月 | 含 | Pro 的 20 倍 |

几个要点：

- **Claude App、桌面版和 Claude Code 共用同一个用量池**。
- **9 月 14 日起，周限额永久比促销前提高 25%**（5 月到 9 月还有过一段临时提高 50% 的活动）。5 小时窗口没变。
- **Fable 5/5.1 只在 Max 档包含**，最多可用掉周限额的一半。Pro 想用 Fable 需要额外购买用量。
- 超出额度可以按 API 价格付费继续用。
- 订阅还包含云端会话、[Routines](/posts/claude-code-routines/)（Pro 每天 5 次，Max 15 次）等。

## 我的建议

- **先买 Pro，跑一周真实工作**，用 `/usage` 看看消耗。Anthropic 不公布精确 token 配额，与其猜，不如测。
- **经常在下午被 5 小时窗口卡住**，或者开了[并行 Agent](/posts/parallel-agents/)：升 Max 5x。
- **把 Claude Code 当全职同事，还跑自动化**：Max 20x。
- **一周只用几次**：Pro 都可能浪费，考虑 API 按量（见[订阅还是 API](/posts/subscription-vs-api/)）。

## 省额度的习惯

- 日常用 Sonnet 5.5，难题再切 Opus 5.5。
- 长对话及时压缩或重开，见[上下文管理](/posts/context-management/)。
- 批量杂活交给子 Agent 和便宜模型，见[模型路由](/posts/model-routing/)。

> 国内用户注意：Anthropic 不支持中国大陆地区直接使用，相关风险见[在国内用海外模型](/posts/overseas-models-in-china/)。

参考：[Claude Code Pricing & Plans (2026)](https://www.morphllm.com/claude-code-pricing)（2026-10-08，第三方汇总）。
