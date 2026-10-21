---
title: 模型每月一换，怎么不被折腾
date: 2026-10-14
tags: [模型选型, 工作流]
description: 2026 年光 9 月就发了 Opus 5.5、GPT-6 全家、一堆国产新模型。
---

光是 2026 年 9 月到 10 月：Claude Opus 5.5、GPT-6 Astra/Sol/Luna、GPT-6.1 Sol、Gemini 4 Argon、DeepSeek V4.1 Flash-1017 相继发布，还有老模型陆续下线。如果每次都跟，就什么都干不成了。

我的规则：

1. **默认不换**。手上的模型能完成工作，就没有换的理由。
2. **准备一套自己的测试题**。三五个真实任务，新模型出来花半小时跑一遍，比看榜单准（见[怎么读榜单](/notes/reading-benchmarks/)）。
3. **工作流不绑模型**。说明文件、Skills、Hooks 放在仓库里，用支持多模型的工具，换模型只改一行配置（见 [Harness 工程](/posts/harness-engineering/)）。
4. **关注下线通知**。配置里写死的模型名会突然失效，比如 Codex 里的 GPT-5.5 在 10 月 14 日下线了。
5. **价格变化比能力变化更值得关注**。Opus 5.5 比 Opus 5 便宜 20%，这种变化对账单的影响比几个百分点的跑分大。

完整的选型思路见 [2026 年 10 月怎么选模型](/posts/model-selection-2026/)。
