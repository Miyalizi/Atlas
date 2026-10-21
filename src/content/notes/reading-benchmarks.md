---
title: 怎么读模型榜单
date: 2026-10-16
tags: [模型选型]
description: 自报成绩、独立评测、自己的任务，可信度依次递增。
---

每个新模型发布都会配一张“全面领先”的对比表。读的时候问四个问题：

1. **谁测的？** 厂商自报的成绩要打折。比如 Gemini 4 Argon 的对比表里不少行是 Google 自己算的；DeepSeek、Kimi 的对比也都是官方数据。独立评测（如 Artificial Analysis 的智能指数）更可信，见 [Artificial Analysis](/links/artificial-analysis/)。
2. **和谁比？** 有没有挑对手？表里缺了最强的竞品，往往说明问题。
3. **测的是什么？** SWE-bench 类测的是修真实仓库的 bug，Terminal-Bench 测的是终端 Agent 能力，WebDev 测的是网页生成审美。和你的工作相关的才有意义。
4. **差距有多大？** 两三个点的差异，在真实使用中经常感觉不到。

最可靠的榜单是你自己的：挑三五个最近真实做过的任务，存下来，每个新模型出来都跑一遍。这比任何榜单都准，也是应对[模型每月一换](/notes/model-churn/)的最好办法。
