---
title: Kimi K3 接入要点
date: 2026-10-16
tags: [国产模型, Kimi]
description: 接不好会“悄悄变笨”的几个参数。
---

月之暗面的 Kimi K3 在 2026 年 7 月发布（API 7 月 16 日，开放权重 7 月 27 日），2.8T 总参数、每 token 激活 104B，1M 上下文，原生支持图片和视频。官方 API 标价每百万 token 输入 $3、输出 $15。

接到编程 Agent 里时，这几件事最容易出问题：

1. **多轮对话要回传完整消息**，包括 `reasoning_content` 和 `tool_calls`。只保留 `content` 会让效果悄悄下降，不报错。
2. **别传 `temperature`、`top_p`**。这些在模型端是固定的，有些工具默认 `temperature: 0`，会出问题。
3. **显式设置 `reasoning_effort`**。默认是 max，输出 token 很多，账单也很多。
4. **自己设 `max_tokens`**，别让客户端自动算。
5. **确认实际上下文长度**。部分第三方托管只给 200K 左右。

第一次接入时，抓一条实际发出去的请求看一眼，比什么都管用。

K3 在前端和 UI 还原上口碑不错，适合放在[模型路由](/posts/model-routing/)里的前端环节。和其他国产模型的对比见[国产模型怎么选](/posts/china-models-guide/)。

参考：[Kimi K3 规格与定价](https://www.morphllm.com/kimi-k3)。
