---
title: 别让 AI 账单失控
date: 2026-10-18
tags: [订阅与成本, API]
description: 订阅有限额会卡你，API 没限额会刷爆你。
---

两种失控：

- **订阅**：周三就把周限额用完，剩下几天干瞪眼。
- **API**：一个死循环的 Agent、一个被人刷的接口，一夜之间几百美元。

## 订阅用户

- **看用量**：Claude Code 的 `/usage` 和状态栏，Codex 的 `/status` 和用量页面。新版 Claude Code 在接近限额时会给更多提醒。
- **分配额度**：5 小时窗口是滚动的，把重活放在窗口开头，杂活交给便宜模型。
- **控制并行数**：[并行 Agent](/posts/parallel-agents/) 开太多，额度消耗成倍增加。
- **准备备胎**：第二个订阅或国产 [Coding Plan](/posts/china-coding-plans/)，主力额度用完时切过去。

## API 用户

- **设预算上限**：各家控制台都能设月度上限和告警，第一件事就是设上。
- **一个项目一个 Key**：出问题能快速定位、单独吊销。
- **Key 绝不进前端**。见 [vibe coding 安全清单](/posts/vibe-coding-security/)。
- **给 Agent 设任务预算**：限制最大轮次或 token 数，防止死循环。
- **思考 token 也要钱**：推理强度默认值往往偏高，简单任务调低。
- **用好缓存和批处理**：见[缓存命中就是省钱](/notes/prompt-caching/)；离线任务用 Batch API（通常半价）或 DeepSeek 错峰。

## 看“每个任务多少钱”

最终要算的是“完成一个任务花了多少钱”，而不是单价。一个便宜模型如果要重试三次，可能比贵模型一次做对还贵。见[订阅还是 API](/posts/subscription-vs-api/)。
