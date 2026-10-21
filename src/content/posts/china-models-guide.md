---
title: 国产模型怎么选：DeepSeek、Qwen、Kimi、GLM、MiniMax、MiMo
date: 2026-10-21
tags: [国产模型, 模型选型]
description: 2026 年 10 月，国产模型已经分化出清晰的定位。
---

2026 年的国产模型进步很快，几家头部的旗舰在编程上已经能和海外上一代旗舰掰手腕。但各家风格差异明显，选之前先了解定位。

## 各家旗舰一览（2026 年 10 月）

| 厂商 | 模型 | 定位 | API 价格（$/百万 token） |
|---|---|---|---|
| 月之暗面 | Kimi K3 | 综合最强之一，前端和视觉突出，开放权重 | $3 / $15 |
| 智谱 | GLM-5.3 | 编程强，开源，Coding Plan 生态成熟 | 部分平台限时免费；GLM-5.2 为 $1.4 / $4.4 |
| 阿里 | Qwen3.8 Max | 2.4T 参数多模态旗舰，WebDev 榜单靠前 | $2 / $6 |
| 小米 | MiMo-V2.6-Pro | 黑马，编程榜第一，价格很低 | $0.435 / $0.87 |
| DeepSeek | V4.1 Flash / V4 Pro | 极致性价比，MIT 权重 | Flash 约 $0.15–0.30 / $0.6–1.2 |
| MiniMax | M3 | 1M 上下文、速度快、价格低 | $0.60 / $2.40 |

数据来源：[聚模合国产榜单](/links/jumohub-china-leaderboard/)（10 月 20 日更新）及各家发布信息。在该榜单的编程项上，前五是 MiMo-V2.6-Pro、GLM-5.3、Kimi K3、Qwen3.8 Max、Qwen3.7 Max。

## 按需求选

- **想要最强综合能力，预算够**：Kimi K3。注意接入细节，见 [Kimi K3 接入要点](/notes/kimi-k3-tips/)。
- **主要写代码，想要稳定的包月额度**：GLM（智谱 Coding Plan 生态最成熟，自带 MCP）。
- **前端、网页生成**：Qwen3.8 Max 或 Kimi K3。
- **预算最低、跑批量**：DeepSeek V4.1 Flash，见[用好 DeepSeek](/posts/deepseek-guide/)。
- **性价比和能力兼顾**：MiMo-V2.6-Pro 值得一试，价格接近 DeepSeek Pro，榜单成绩靠前。
- **需要本地部署**：DeepSeek（MIT）、Kimi K3（类 MIT，超大规模商用有条件）、Qwen 的开放权重小模型，见[本地模型](/posts/local-models/)。

## 几个提醒

1. **榜单自报成绩要打折看**。各家发布时的对比表基本都是自己测的，见[怎么读榜单](/notes/reading-benchmarks/)。
2. **和海外顶级仍有差距**。Kimi K3 自己公布的成绩里，多项仍落后 Claude Fable 5；第三方测评也把它放在比 Fable 低一档的位置。最难的活还是交给海外旗舰。
3. **包月比 API 更划算**。国产 Coding Plan 普遍几十到一两百元一个月，见[国产 Coding Plan 对比](/posts/china-coding-plans/)。
4. **许可证要看清**。“开放权重”不等于随便商用，大规模商用经常有额外条件。
