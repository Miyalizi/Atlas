---
title: Opus 5.5 还是 Fable 5.1
date: 2026-10-15
tags: [模型选型, Claude Code]
description: 贵一倍多的模型，什么时候值得用。
---

Claude 现在有两个顶配：

- **Opus 5.5**：$4/$20，9 月 22 日发布。Anthropic 称它在许多测试上追平甚至超过更大的 Fable，速度也更快。
- **Fable 5.1**：$10/$50，最强档，思考始终开启，单次请求在难题上可能跑好几分钟。

我的用法：

- **默认 Opus 5.5**。绝大多数任务，包括较难的重构，它都够了。
- **Fable 5.1 只用在**：Opus 反复失败的疑难问题、需要长时间自主运行的大任务、对正确性要求极高的场景。
- **订阅用户**：Fable 只包含在 Max 档，且最多用掉周限额的一半。Pro 用户想用要额外付费，见 [Claude Pro 还是 Max](/posts/claude-plans/)。

另外，Opus 5.5 的默认推理强度是 medium，比上一代低一档。难题记得手动调高，而不是直接换 Fable。

更完整的分层见 [2026 年 10 月怎么选模型](/posts/model-selection-2026/)。
