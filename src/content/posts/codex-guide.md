---
title: 用好 Codex：App、CLI 与 worktree
date: 2026-10-19
tags: [AI编程, Codex]
description: Codex 现在是 ChatGPT 桌面端里的一个模式，免费档也能用。怎么用才顺手？
---

OpenAI 的 Codex 在 2026 年变化很大。到 10 月，它有三个入口：ChatGPT 桌面端里的 **Codex 模式**（7 月起和 Chat、Work 并列）、开源的 **Codex CLI**、以及 IDE 插件。三者跑的是同一个 Agent，共用 `~/.codex/config.toml` 配置（包括 MCP 服务器）。

## App 的杀手功能：每个线程一个 worktree

在 Codex App 里，每开一个新线程，它会自动建一个独立的 git worktree。好处是几个 Agent 并行改同一个仓库，互不干扰，也不会碰你本地没提交的改动。CLI 里要自己手动配。这让它特别适合[并行 Agent 工作流](/posts/parallel-agents/)：排几个任务，去干别的，回来在 diff 和 PR 审阅侧栏里逐个看。

其他值得用的：

- **Automations / Goal mode**：定时任务和长时间目标驱动的运行，5 月正式可用。
- **应用内浏览器**：Agent 能自己打开页面检查前端效果。
- **云端环境**：任务可以放到 OpenAI 的服务器上跑。
- **`AGENTS.md`**：App 和 CLI 读同一份，写法见[一份好的 AGENTS.md](/posts/agents-md-guide/)。
- **Skills**：Codex CLI 原生支持 SKILL.md 标准，见 [Agent Skills](/posts/agent-skills-guide/)。

## 什么时候用 CLI

- 写脚本、接 CI、批量处理。
- 审外部 PR 或可疑依赖：用 `--sandbox read-only`，见 [Codex 沙箱模式怎么选](/notes/codex-sandbox/)。
- Linux 上（App 目前只有 macOS Apple Silicon 和 Windows）。

## 常见的坑

1. **用量共享**：云任务、图片生成和本地对话吃同一个 5 小时窗口，生成图片消耗快得多。
2. **worktree 会堆积**：做完的线程要关，不然磁盘里一堆副本。
3. **Computer use 有风险**：能点任何东西的 Agent 遇到恶意内容就麻烦了，限定在具体应用，远离密码管理器和网银。
4. **模型下线**：老模型会定期退役（GPT-5.5 已于 10 月 14 日从 Codex 下线），配置里写死的模型名要跟着改。

## 选哪个档位

免费档和 Go（$8/月）只有 GPT-6 Luna、没有 CLI；Plus（$20/月）能用 GPT-6 Astra、GPT-6.1 Sol 等；Pro 分 $100/$200/$500 三档，没有 5 小时限制。细节见 [ChatGPT / Codex 档位怎么选](/posts/overseas-plans/#chatgpt-与-codex)。

和 Claude Code 怎么取舍：Codex 强在系统级沙箱和 worktree，Claude Code 强在 Hook 和子 Agent。两个都订 $20 档、按任务挑着用，是很多人的做法，见[全球订阅性价比](/posts/global-best-value/)。

参考：[Codex App Guide (2026)](https://www.heyuan110.com/posts/ai/2026-07-12-openai-codex-app-guide/)、[Codex 官方文档](/links/codex-docs/)。
