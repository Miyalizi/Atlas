---
title: MCP 实用指南：少即是多
date: 2026-10-16
tags: [AI编程, Agent, MCP]
description: 装二十个 MCP 服务器不会让 Agent 变聪明，只会让它变贵、变犹豫。
---

MCP（Model Context Protocol）让 Agent 能接外部系统：数据库、浏览器、设计稿、工单系统。2026 年几乎所有编程工具都支持它，各种 MCP 市场里能找到上千个服务器。

问题也在这里：**每个 MCP 服务器的工具描述都会进入上下文**。装得越多，越占 token，模型在相似工具之间也越容易选错。

## 个人开发者的精简清单

按使用频率，我只留这几类：

1. **文档/搜索**：查最新 API 文档，避免模型凭过时记忆写代码。
2. **浏览器**：让 Agent 自己打开页面验证前端效果。
3. **你的数据库或后端**：只读权限优先。
4. **代码托管**（GitHub 等）：开 PR、读 issue。

其他的按项目临时装，用完就关。

## 安全要点

- **把 MCP 当成可信输入**。它的工具描述会直接进提示词，来路不明的服务器可能夹带指令（提示注入）。
- 数据库类 MCP 先给只读账号。
- 看清楚它要什么权限、把数据发到哪里。

## 和 Skills、CLI 的分工

- 能用一条命令行工具解决的（比如 `gh`、`psql`），往往不需要 MCP，让 Agent 直接跑命令更省。
- 固定流程用 [Skills](/posts/agent-skills-guide/)。
- 需要持续连接外部系统、带认证的，用 MCP。

国产 Coding Plan 里也开始捆绑 MCP，比如智谱的套餐附带视觉、搜索、网页读取、开源仓库四类 MCP，见[国产 Coding Plan 对比](/posts/china-coding-plans/)。

更多关于“工具越少越好”的思路，见 [Harness 工程](/posts/harness-engineering/)。
