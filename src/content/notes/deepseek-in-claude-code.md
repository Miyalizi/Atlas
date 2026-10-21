---
title: 把 DeepSeek 接进 Claude Code
date: 2026-10-19
tags: [国产模型, DeepSeek, Claude Code]
description: 用 Anthropic 兼容端点，换模型不换工具。
---

DeepSeek 提供了 Anthropic 兼容端点，Claude Code 通过环境变量就能切过去：

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=你的 DeepSeek API Key
# 指定模型名，以官方文档为准
export ANTHROPIC_MODEL=deepseek-flash
claude
```

几点经验：

- 建议单独开一个 shell 配置或脚本（比如 `claude-ds`），别覆盖平时的 Claude 登录。
- 换模型不等于换体验：同样的 [Harness](/posts/harness-engineering/)，模型弱了，复杂任务的成功率会下降。适合交给它的是范围清晰的小任务。
- Kimi、智谱、MiniMax 等也大多提供类似的兼容端点，国产 [Coding Plan](/posts/china-coding-plans/) 基本都以“能接 Claude Code”为卖点。Kimi K3 要特别注意回传思考内容，见 [Kimi K3 接入要点](/notes/kimi-k3-tips/)。
- 涉及代码隐私的项目，先看清服务商的数据政策。

延伸阅读：[用好 DeepSeek](/posts/deepseek-guide/)。
