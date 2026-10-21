---
title: 在国内用海外模型：现实情况与风险
date: 2026-10-17
tags: [模型选型, 订阅与成本]
description: 能不能用、怎么付钱、有什么风险，说清楚。
---

这是国内开发者绕不开的问题，说几件确定的事：

1. **OpenAI 和 Anthropic 都不支持中国大陆地区直接使用**它们的 API 和订阅。各种绕行方式都存在被封号的风险，也可能涉及合规问题。
2. **云厂商渠道**：Claude 可以通过 AWS Bedrock、Google Vertex AI、Microsoft Foundry 使用，但这些服务同样没有中国大陆区域，离得最近的是东京、首尔、新加坡、香港等区域，模型可用性按区域不同。
3. **第三方中转**：价格便宜，但你的代码和数据会经过不受控的第三方，稳定性和安全都没有保障。用于公司代码尤其不合适。
4. **账号被封的成本**：订阅余额、对话记录、配置都可能一起没了。重要的东西（说明文件、Skills、提示词）一定要放在自己的仓库里。

## 我的建议

- **把工作流和模型解耦**。用 Claude Code 这类支持自定义端点的工具，[Harness](/posts/harness-engineering/) 留在自己手里，模型可以随时换成国产。
- **国产模型已经能扛大部分日常工作**。GLM、Kimi、DeepSeek、Qwen 都提供兼容接口，付款和合规都简单，见[国产模型怎么选](/posts/china-models-guide/)。
- **涉及公司或客户代码时**，先确认公司政策，再决定用哪家。
- 汇率要算进预算：海外订阅按美元计，加上支付手续费，实际成本比标价高。

预算方案见[三档 AI 工具配置](/posts/budget-stacks/)。

参考：[Codex CLI vs Claude Code 2026: China Access](https://blakecrosley.com/blog/codex-vs-claude-code-2026)。
