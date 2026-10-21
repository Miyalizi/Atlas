---
title: Codex 沙箱模式怎么选
date: 2026-10-18
tags: [AI编程, Codex, 安全]
description: read-only、workspace-write、danger-full-access，各自什么时候用。
---

Codex 的安全主要靠操作系统内核：macOS 上用 Seatbelt，Linux 上用 Landlock 加 seccomp。三种模式：

- **`read-only`**：只能读。审别人的 PR、看陌生依赖、分析可疑代码时用。
- **`workspace-write`**：只能写当前工作区。日常开发默认就是它。
- **`danger-full-access`**：全放开。只在一次性的容器或虚拟机里用，别在自己的主力机上开。

它的 Hook 体系比 Claude Code 小（没有工具调用前的拦截事件），所以思路是“隔离”而不是“拦截”。Claude Code 则反过来，靠应用层的 [Hooks](/notes/claude-code-hooks/) 管规则。两种思路都属于 [Harness](/posts/harness-engineering/) 的约束层。

参考：[Codex CLI vs Claude Code 2026](https://blakecrosley.com/blog/codex-vs-claude-code-2026)。
