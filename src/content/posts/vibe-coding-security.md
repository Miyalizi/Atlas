---
title: Vibe coding 安全清单：别让 AI 写的应用裸奔
date: 2026-10-19
tags: [安全, AI编程, 独立开发]
description: 一个没开 RLS 的 Supabase，泄露了 150 万个 API Key。
---

2026 年 2 月，一个叫 Moltbook 的 AI Agent 社交网站被安全公司 Wiz 发现严重漏洞：约 3 万个用户邮箱、约 150 万个 API Key、大量 Agent 之间的私信（里面还有用户分享的 OpenAI Key）都能被任何人读取，甚至可以改写。创始人此前公开说过，这个网站他“一行代码都没写”。

原因很简单：**前端 JS 里暴露了 Supabase 的公开 Key，而数据库没开行级安全（RLS）**。公开 Key 本来是可以放前端的，前提是 RLS 开着。少了这一步，它就等于数据库的万能钥匙。

## 上线前必查的清单

1. **数据库权限**：Supabase / Firebase 的 RLS 或安全规则是否开启？每张表都要查。
2. **密钥**：前端代码、git 历史里有没有私钥？`.env` 有没有被提交？
3. **鉴权**：每个 API 是否都检查了“是不是这个用户自己的数据”？AI 很容易只做“已登录”检查。
4. **输入**：用户输入有没有拼进 SQL、命令行或 HTML？
5. **限流**：注册、登录、调用 AI 的接口有没有频率限制？没有的话，别人可以拿你的 Key 刷爆账单。
6. **依赖**：AI 推荐的包真的存在吗？是不是拼写相近的恶意包？
7. **日志**：有没有把密码、Token 打进日志？
8. **AI 功能本身**：如果你的应用让 AI 读取用户内容，要考虑提示注入：恶意内容可能指挥你的 Agent 做坏事。

## 让 AI 帮你查

写完功能后，开一个**新会话**，让另一个模型专门做安全审查（生成和评审分开，见 [Harness 工程](/posts/harness-engineering/)）。提示词里明确列出上面的清单，要求它给出具体文件和行号。

但最终还是要你自己看一遍关键配置。AI 擅长让功能跑起来，不擅长主动考虑“谁会来搞破坏”。

延伸：[审 AI 写的代码](/posts/review-ai-code/)、[MCP 安全要点](/posts/mcp-practical/)。

参考：[Moltbook vibe-coded flaw exposed AI chats & keys](https://securitybrief.co.uk/story/moltbook-vibe-coded-flaw-exposed-ai-chats-keys)。
