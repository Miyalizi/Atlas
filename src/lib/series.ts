// 专题系列：把同一主题的文章按阅读顺序串起来。
// 新文章想加入某个系列，把它的 id（类型/文件名）按想要的位置插进 items 即可。
import { getGraph, type Entry } from './content';

export const SERIES = [
  {
    key: 'models',
    name: '选模型',
    blurb: '新模型每个月都在出，这组文章帮你判断哪个值得换、哪个可以先放着。',
    items: [
      'posts/model-selection-2026', 'posts/china-models-guide', 'posts/deepseek-guide', 'posts/gemini-4-argon',
      'posts/local-models', 'posts/overseas-models-in-china', 'posts/model-price-table',
      'notes/opus-vs-fable', 'notes/kimi-k3-tips', 'notes/reading-benchmarks', 'notes/model-churn',
    ],
  },
  {
    key: 'costs',
    name: '算成本',
    blurb: '订阅还是 API、哪一档最划算，以及怎么不让账单失控。',
    items: [
      'posts/subscription-vs-api', 'posts/overseas-plans', 'posts/china-coding-plans', 'posts/global-best-value', 'posts/budget-stacks',
      'posts/ai-cost-control', 'notes/prompt-caching',
    ],
  },
  {
    key: 'tools',
    name: '用好工具',
    blurb: 'Claude Code、Codex 这些日常工具，从上手到用顺手的细节。',
    items: [
      'posts/claude-code-habits', 'posts/claude-code-desktop', 'posts/claude-code-routines', 'posts/codex-guide',
      'notes/claude-code-hooks', 'notes/codex-sandbox', 'notes/deepseek-in-claude-code', 'notes/trae-cn',
    ],
  },
  {
    key: 'harness',
    name: 'Harness 与工作流',
    blurb: '模型之外的那一半：说明文件、工具、上下文和流程，决定了你每天实际能拿到多少。',
    items: [
      'posts/harness-engineering', 'posts/agents-md-guide', 'posts/agent-skills-guide', 'posts/mcp-practical',
      'posts/context-management', 'posts/model-routing', 'posts/parallel-agents', 'posts/review-ai-code',
      'posts/vibe-coding-security', 'posts/solo-dev-ai-workflow', 'notes/acceptance-first',
    ],
  },
] as const;

export type Series = (typeof SERIES)[number];

/** 系列里已发布的文章，按系列顺序；草稿或已删除的条目自动跳过 */
export async function seriesEntries(s: Series) {
  const { byId } = await getGraph();
  return s.items.map((id) => byId.get(id)).filter((e): e is Entry => !!e);
}

/** 某篇文章所在的系列和它在系列里的位置 */
export async function seriesOf(entry: Entry) {
  const s = SERIES.find((x) => (x.items as readonly string[]).includes(entry.id));
  if (!s) return null;
  const list = await seriesEntries(s);
  const i = list.indexOf(entry);
  return { series: s, list, index: i, prev: list[i - 1], next: list[i + 1] };
}
