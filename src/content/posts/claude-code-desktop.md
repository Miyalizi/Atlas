---
title: 用好 Claude Code 桌面版：并行会话、预览与审 diff
date: 2026-10-20
tags: [AI编程, Claude Code]
description: 桌面版不是“带界面的终端”，它的核心是同时跑几件事，然后集中审。
---

Anthropic 在 2026 年 4 月重做了 Claude Code 桌面版，思路很明确：**围绕并行 Agent 设计**。如果你还把它当成一个聊天窗口，一次只跑一个任务，就浪费了它最大的价值。

## 值得记住的功能

- **会话侧栏**：跨仓库列出进行中和最近的会话，可以按状态、项目、环境筛选。PR 合并或关闭后会话自动归档。
- **Side chat**：`⌘ + ;`（Windows 为 `Ctrl + ;`）从主线程分出一个旁支问题。它能读主线程的上下文，但不会把内容写回去，适合问“这个函数为什么这样写”而不污染主任务。
- **预览面板**：直接打开 HTML、PDF，或者跑本地开发服务器看效果。前端改动不用切到浏览器。
- **Diff 审阅**：重写过的 diff 视图，大改动也不卡。
- **内置终端和编辑器**：跑测试、手改一行都在同一个窗口里。
- **可拖拽布局**：终端、预览、diff、对话可以排成网格。
- **本地 / 云端 / SSH 环境**：会话可以在本机跑，也可以放到云端；Mac 也支持 SSH 连远程机器。
- **插件**：终端里装的插件在桌面版同样生效。
- **三种视图**：Verbose、Normal、Summary，控制看多少工具调用细节。`⌘ + /` 查看全部快捷键。

## 一个顺手的工作节奏

1. 早上把今天的三四件事各开一个会话：修 bug、写测试、改文案、调研依赖升级。
2. 每个会话开头给清楚的验收标准（见[先写验收标准](/notes/acceptance-first/)）。
3. 去做自己的事，隔一阵回来看侧栏状态。
4. 集中审 diff，在预览里点一点，满意了再让它开 PR。

这就是[并行 Agent 工作流](/posts/parallel-agents/)的桌面版实现。

## 几个小提醒

- 桌面版和终端共享同一套用量额度（Pro/Max 的 5 小时窗口和周限额），并行开得多，额度掉得也快。怎么选档位见 [Claude Pro 还是 Max](/posts/claude-plans/)。
- 长期不用的会话要及时归档，不然侧栏会乱。
- 需要定时、无人值守的任务，用 [Routines](/posts/claude-code-routines/) 放到云端，而不是让桌面版一直开着。
- 终端版的习惯同样适用，见 [Claude Code 终端的十个习惯](/posts/claude-code-habits/)。

参考：[Redesigning Claude Code on desktop for parallel agents](https://claude.com/blog/claude-code-desktop-redesign)（Anthropic，2026-04-14）。
