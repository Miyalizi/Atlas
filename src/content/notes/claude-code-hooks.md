---
title: 用 Hooks 把规则变成硬约束
date: 2026-10-19
tags: [AI编程, Claude Code, Harness]
description: 提示词是建议，Hook 是护栏。
---

在 `CLAUDE.md` 里写“不要直接改 main 分支”，模型大概率会遵守，但不是一定。Hook 不一样：它是在工具调用前后由程序执行的脚本，模型绕不过去。

我常用的三类：

- **PreToolUse 拦截**：命令里出现 `rm -rf /`、`git push --force`、读 `.env` 时直接拒绝。
- **PostToolUse 检查**：每次编辑完自动跑格式化和类型检查，失败就把错误原样喂回去，让它自己修。成功时保持安静，别刷屏。
- **Stop 收尾**：任务结束前跑一遍测试，没过就不算完成。

2026 年 10 月的新版本还加了 `onFailure: "block"`：Hook 本身运行失败时也可以阻止动作，适合安全相关的检查。

一个原则：**每条 Hook 都对应一次真实踩过的坑**。这是 [Harness 工程](/posts/harness-engineering/)里最划算的一环。Codex 那边对应的做法是靠操作系统级沙箱，见 [Codex 沙箱模式怎么选](/notes/codex-sandbox/)。
