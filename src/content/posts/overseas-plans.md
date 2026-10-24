---
title: 海外 AI 订阅怎么选：Claude、ChatGPT、Cursor、Google
date: 2026-10-19
updated: 2026-10-24
tags: [订阅与成本, 模型选型]
description: 四家的档位放在一起看：$20 先买哪家，什么时候值得升到 $100。
---

四家都有一个 $20 左右的主力档和一个 $100–200 的重度档，但“订阅”的含义并不一样。**Claude 和 ChatGPT 是固定价格换一大块额度，用得越多越划算；Cursor 的第三方模型按 API 原价扣钱，订阅本身不打折；Google 的价值主要在云盘和 App，编程工具链要上 Ultra 才完整。**

对大多数个人开发者，结论只有一句：**先买 Claude Pro 或 ChatGPT Plus 其中一个，跑一周真实工作再决定要不要加第二个或者升档。**

## 一眼对比

价格为美元月付，截至 2026 年 10 月。

| | 入门 | 主力档 | 重度档 | 编程工具 |
|---|---|---|---|---|
| Claude | Free（只能聊天） | Pro $20 | Max 5x $100 · Max 20x $200 | Claude Code（Pro 起） |
| ChatGPT | Free · Go $8 | Plus $20 | Pro $100 · $200 · $500 | Codex App 与 CLI（Plus 起有 CLI） |
| Cursor | Free · Plus $8 | Premium $30 | Super $100 · Ultra $200 | 编辑器本身；第三方模型 Premium 起按原价扣 |
| Google | Free · AI Plus $4.99 | AI Pro $19.99 | Ultra 5x $99.99 · 20x $199.99 | Antigravity 里的 Argon 只对 Ultra 开放 |

## Claude

| 档位 | 价格 | Claude Code | 用量 |
|---|---|---|---|
| Free | $0 | 不含 | 只能聊天 |
| Pro | $20/月（年付约 $17/月） | 含 | 每 5 小时一个窗口，另有周限额 |
| Max 5x | $100/月 | 含 | Pro 的 5 倍 |
| Max 20x | $200/月 | 含 | Pro 的 20 倍 |

- **Claude App、桌面版和 Claude Code 共用同一个用量池**。
- **9 月 14 日起，周限额永久比促销前提高 25%**（5 月到 9 月还有过一段临时提高 50% 的活动）。5 小时窗口没变。
- **Fable 5/5.1 只在 Max 档包含**，最多可用掉周限额的一半。Pro 想用 Fable 需要额外购买用量。
- 超出额度可以按 API 价格付费继续用。订阅还包含云端会话和 [Routines](/posts/claude-code-routines/)（Pro 每天 5 次，Max 15 次）。

怎么选：

- **先买 Pro，跑一周真实工作**，用 `/usage` 看消耗。Anthropic 不公布精确 token 配额，与其猜，不如测。
- **经常在下午被 5 小时窗口卡住**，或者开了[并行 Agent](/posts/parallel-agents/)：升 Max 5x。
- **把 Claude Code 当全职同事，还跑自动化**：Max 20x。
- 省额度：日常用 Sonnet 5.5，难题再切 Opus 5.5；长对话及时压缩或重开（见[上下文管理](/posts/context-management/)）；批量杂活交给子 Agent 和便宜模型（见[模型路由](/posts/model-routing/)）。

> [!WARNING] 国内用户：Anthropic 不支持中国大陆地区直接使用，相关风险见[在国内用海外模型](/posts/overseas-models-in-china/)。

## ChatGPT 与 Codex

OpenAI 在 2026 年把 Codex 并进了 ChatGPT 桌面端，档位也跟着变多了。

| 档位 | 价格 | Codex 可用模型 | 说明 |
|---|---|---|---|
| Free | $0 | GPT-6 Luna | 只能用桌面 App，无 CLI |
| Go | $8/月 | GPT-6 Luna | 同上 |
| Plus | $20/月 | Astra、6.1 Sol、Sol、Luna | 有 5 小时窗口，可买额外额度 |
| Pro 100 | $100/月 | 同 Plus | 无 5 小时限制，有周限额 |
| Pro 200 | $200/月 | 同 Plus | 额度比以前降了，老用户 10/29 起切换 |
| Pro 500 | $500/月 | 加 Astra Ultrafast | 唯一能用 Ultrafast 的档 |

今年的变动很多：7 月取消了 Plus 的 5 小时窗口，8 月 25 日又恢复（Pro 仍豁免）；9 月 3 日 GPT-6 Astra 发布，9 月 22 日 GPT-6 Sol 和 Luna 进入 Codex；Pro 200 曾暂停新订阅，10 月初重新开放但额度降低；GPT-5.5 于 10 月 14 日从 Codex 下线。所以**别买长期年付，按月订，随时准备换**。

怎么选：

- **只是试试，或者给家人用**：Free 或 Go，注意没有 CLI。
- **个人开发者主力**：Plus。Plus 档上 GPT-6 Astra 每 5 小时只有个位数到几十条消息，日常用 6.1 Sol，难题再上 Astra。
- **重度使用、不想被 5 小时窗口打断**：Pro 100。Pro 200 / 500 对个人来说性价比不高，除非确定需要 Ultrafast。
- Fast 模式按 2.5 倍消耗额度，生成图片也很吃额度。工具层面的用法见[用好 Codex](/posts/codex-guide/)。

## Cursor

| 档位 | 月费 | 包含用量 | 第三方模型 |
|---|---|---|---|
| Free | $0 | 有限 | 不可用 |
| Plus | $8 | 基础 | 不可用 |
| Premium | $30 | Plus 的 4 倍 | 按 API 原价从预付额度扣 |
| Super | $100 | Plus 的 15 倍 | 同上 |
| Ultra | $200 | Plus 的 50 倍 | 同上 |

年付有折扣（Plus $80/年，Premium $300/年）。

- **包含用量只覆盖 Cursor 自己的模型**：Composer 2.5 和 Grok 4.5–4.7 系列，共用一个每周额度池。
- **Composer 2.5 很便宜**：每百万 token 输入 $0.5、输出 $2.5，Plus 档也能用（固定中等推理强度、不开 Fast）。
- **Claude、Gemini、GPT 从 Premium 起才能用，而且按 API 原价扣预付的钱**。用 Cursor 调 Opus 5.5，和直接用 Anthropic API 一样贵。
- Plus 档没有 Cloud Agents、Automations、Bugbot。

怎么选：只想要好用的编辑器、补全和便宜模型，停在 Plus（$8）。已经订了 Claude Pro 或 ChatGPT Plus 的，Agent 任务交给 Claude Code 或 Codex，Cursor 停在 Plus 当编辑器就够了。完整价格见 [Cursor 官方价格页](/links/cursor-pricing/)。

## Google

美国价格：

| 档位 | 月费 | 模型 | 存储 |
|---|---|---|---|
| Free | $0 | Flash-Lite | |
| AI Plus | $4.99 | Flash | 400GB |
| AI Pro | $19.99 | Gemini 4 Argon、Pro、Flash | 5TB |
| AI Ultra 5x | $99.99 | Argon 最高额度 | 20TB |
| AI Ultra 20x | $199.99 | 同上，20 倍用量 | 30TB |

- **AI Pro 适合“顺便”订**：本来就要买 Google 云盘的人，$19.99 拿到 5TB 加 Gemini App 里的 Argon，很划算。
- **对编程来说不够**：Gemini 4 Argon 在 Antigravity 里只对 Ultra 开放，AI Studio 网页版也要 Ultra，Gemini CLI 还停在 3.1 Pro。Jules 在 Pro 档有较高额度，但仍是 beta。
- 想用 Argon 写代码，直接用 API（促销期 $2/$10）比上 Ultra 灵活，见 [Gemini 4 Argon](/posts/gemini-4-argon/)。

## 接下来读

- 订阅和按量付费哪个划算：[订阅还是 API](/posts/subscription-vs-api/)。
- 几家怎么组合：[全球订阅性价比](/posts/global-best-value/)，以及人民币预算版的[三档 AI 工具配置](/posts/budget-stacks/)。
- 国内的替代选择：[国产 Coding Plan 对比](/posts/china-coding-plans/)。

参考：[Claude Code Pricing & Plans (2026)](https://www.morphllm.com/claude-code-pricing)（2026-10-08）、[Codex Pricing 2026](https://www.morphllm.com/codex-pricing)（2026-10-07）、[Google AI Plans Pricing (October 2026)](https://grabaicredits.com/en/pricing/google-ai-plans-pricing)，均为第三方汇总，以各家官网为准。
