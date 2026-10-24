---
title: 本地模型 2026：多大内存跑什么
date: 2026-10-15
tags: [本地模型, 模型选型]
description: 16GB 到 64GB，每一档能跑什么、值不值得跑。
---

我在[小模型的春天](/notes/small-models/)里写过：特定任务上，小模型已经够用了。到 2026 年秋天，这个判断更成立了。

## 按内存选模型

以下是 2026 年 9 月一份 Mac mini 本地模型推荐的整理（Ollama 命令可直接用）：

| 内存 | 推荐 | 适合 |
|---|---|---|
| 16GB | gpt-oss-20b、小号 Gemma 4 | 推理、工具调用、轻量 Agent |
| 24GB | Gemma 4 26B A4B、Qwen3.6 27B | 多模态、编程、本地助手 |
| 32GB | Qwen3.6 35B、Qwen3-Coder 30B | 编程 Agent、仓库分析 |
| 48–64GB | Llama 3.3 70B 及更大 | 通用推理、写作 |

例如：

```bash
ollama run qwen3-coder:30b
ollama run gemma4:26b
```

注意：能装下不等于好用。量化方式、上下文长度、KV 缓存都会吃内存，要留余量，不然速度会慢到没法用。

## 工具

- **Ollama**：命令行，最适合开发者，自带本地 API，编程 Agent 可以直接接。
- **LM Studio**：图形界面，能搜索下载模型，在 Apple Silicon 上支持 MLX 引擎，同样提供 OpenAI 兼容接口。

## 什么时候值得本地跑

- **隐私**：代码或数据不能出本机。
- **批量、低难度任务**：写摘要、分类、提取，跑一晚上不花钱。我给[这个博客](/projects/atlas/)的旧笔记批量补摘要和标签初稿，就是让本地模型跑的。
- **离线**：飞机上、断网环境。

## 什么时候不值得

- 复杂的编程 Agent 任务。本地 30B 级模型和云端旗舰差距仍然明显，省下的钱抵不过返工时间。
- 只是为了省钱：[DeepSeek Flash](/posts/deepseek-guide/)、Claude Haiku 5.5、GPT-6 Luna 这类便宜 API 已经低到每百万 token 一毛美元级别，电费和时间成本未必更低。

参考：[5 Best Local LLMs You Can Run on a Mac mini in 2026](https://analyticsvidhya.com/blog/2026/09/best-local-llms-mac-mini-2026)。
