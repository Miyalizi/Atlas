---
title: 国产 Coding Plan 对比：智谱、Kimi、MiniMax、豆包、千问
date: 2026-10-20
tags: [国产模型, 订阅与成本]
description: 几十元到几百元一个月，接进 Claude Code 就能用。
---

“Coding Plan” 是 2026 年国产模型厂商的标配：按月付费，换一个编程专用的额度池，通常可以接进 Claude Code、OpenCode 等工具使用。

## 主要套餐（2026 年 8–9 月核实口径）

| 厂商 | 入门价 | 中高档 | 额度口径 | 主力模型 |
|---|---|---|---|---|
| 智谱 GLM | Lite ¥118/月（年付约 ¥94/月） | Pro 年付约 ¥430/月，Max 年付约 ¥862/月 | 每周积分（Credits），跨工具共享 | GLM-5.3 |
| Kimi | Plus ¥99/月（年付 ¥79/月） | Pro ¥199/月，Max 年付 ¥559/月 | 5 小时滚动窗口，有月度上限 | Kimi K3 |
| MiniMax | Plus $20/月 | Max $50，Ultra $120 | 按 token 总量 | MiniMax M3 |

（来源：[codingplan.org 对比](/links/codingplan-compare/)、MiniMax M3 发布信息。价格和额度经常调整，以官网结算页为准。）

## 今年的变化

- **智谱**：2 月海外版涨价 30%–60%；7 月 31 日改为“透明积分制”重新开放订阅，输入、输出、缓存和 MCP 调用都按公开规则折算积分，周末按低峰倍率扣。好处是可预测，坏处是比年初贵了不少。
- **Kimi**：新会员取消了每周限制，但月度总量仍有上限。Plus 起含多 Agent 并行。
- **MiniMax**：M3 发布后，按 token 量计的套餐额度很大。
- **豆包（火山方舟）、千问（阿里云百炼）**：年初都有 ¥40 左右的入门档，可以混用多家模型，但当时的测评普遍认为编程能力不如 GLM 和 Kimi。这两家近期价格变动较多，请以官网为准。
- **Trae CN** 直接免费，见 [Trae CN](/notes/trae-cn/)。

## 怎么选

- **想要可预测、按周排期**：GLM，积分口径最透明，自带视觉、搜索、网页读取、开源仓库四类 MCP。
- **前端、UI 还原、需要 1M 上下文**：Kimi。
- **想用量大、价格低**：MiniMax。
- **只想试试**：先用 Trae CN 或 Kimi 免费档，确认习惯了再付费。

## 使用建议

- 接入 Claude Code 的方法和接 DeepSeek 一样，改 `ANTHROPIC_BASE_URL` 即可，见[把 DeepSeek 接进 Claude Code](/notes/deepseek-in-claude-code/)。
- 套餐常有“超售变慢”的抱怨，高峰时段响应慢是常态，重要任务别卡在 deadline 前。
- 先买月付，别一上来就年付。
