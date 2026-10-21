---
title: 用好 DeepSeek：V4.1 Flash、V4 Pro、思考模式与错峰
date: 2026-10-20
tags: [国产模型, DeepSeek, 模型选型]
description: 便宜到可以“随便用”的模型，怎么用才不浪费？
---

DeepSeek 一直是性价比的代名词。到 2026 年 10 月，它的 API 有两条线：

- **Flash**（`deepseek-flash`）：10 月 17 日起由 **DeepSeek-V4.1-Flash-1017** 提供服务，权重以 MIT 协议开放。这一版的重点是更快、回答更短。旧名字 `deepseek-v4-flash` 仍然能调，但会被路由到新模型并按 Flash 价格计费。
- **Pro**（`deepseek-v4-pro`）：更强，也更贵一些。

两者都是 1M 上下文。

## 价格的三个要点

1. **绝对价格很低**。Flash 的标价在每百万 token 输入几毛美元、输出一美元左右的量级；缓存命中的输入价格再低两个数量级。按第三方测算，用它修一个 bug 只要几美分。
2. **分时段计价**。北京时间工作日 9–12 点、14–18 点是高峰，价格约为低峰的两倍。批量任务放到晚上和周末跑。
3. **思考 token 按输出计费**。思考模式默认开启，长推理可能占掉大部分费用。简单任务把 `reasoning_effort` 调低，或者关掉思考。

> 具体单价变动频繁，下单前以 [DeepSeek 官方文档](/links/deepseek-api-docs/)为准。

## 什么任务交给它

- **批量处理**：给几千条数据打标签、提取字段、翻译、写摘要。这类任务用旗舰模型是浪费。
- **[模型路由](/posts/model-routing/)里的执行层**：贵模型出计划，DeepSeek 干体力活。
- **预算紧时的主力编程模型**：配合 Claude Code 或 OpenCode 使用，见[把 DeepSeek 接进 Claude Code](/notes/deepseek-in-claude-code/)。
- **本地部署**：MIT 权重意味着可以自己跑（但完整模型很大，个人一般还是用 API，见[本地模型](/posts/local-models/)）。

## 什么任务别指望它

官方自己公布的对比里，V4.1 Flash 在 Terminal-Bench、HLE 等难题上仍落后 Claude Opus 5。复杂架构设计、跨很多文件的重构、需要很强判断力的代码审查，还是交给旗舰模型。

## 新东西

- **Anthropic 兼容端点** `https://api.deepseek.com/anthropic`，可以直接给 Claude Code 用。
- **Search / Fetch API**：自家搜索引擎做的联网搜索和网页抓取接口。
- **DeepSeek Harness**：面向 Agent 开发者的开发者预览，思路见 [Harness 工程](/posts/harness-engineering/)。

和其他国产模型怎么比，见[国产模型怎么选](/posts/china-models-guide/)。

参考：[DeepSeek API 更新日志](https://api-docs.deepseek.com/updates/)、[DeepSeek V4.1 Flash 1017 发布分析](https://smartscope.blog/blog/deepseek-v4-1-flash-1017-release-benchmarks-price-2026/)。
