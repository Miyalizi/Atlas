import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;

export const TYPES = {
  posts: { name: '长文章', shape: 'post' },
  notes: { name: '短笔记', shape: 'note' },
  media: { name: '书影音', shape: 'media' },
  projects: { name: '项目作品', shape: 'project' },
  links: { name: '收藏链接', shape: 'link' },
} as const;
export type TypeKey = keyof typeof TYPES;
export const TYPE_KEYS = Object.keys(TYPES) as TypeKey[];

export const KIND_NAMES: Record<string, string> = {
  book: '书', film: '电影', series: '剧集', music: '音乐', game: '游戏', podcast: '播客',
};

export const typeOf = (e: Entry) => e.id.split('/')[0] as TypeKey;
export const slugOf = (e: Entry) => e.id.split('/').slice(1).join('/');
export const urlOf = (e: Entry) => `/${typeOf(e)}/${slugOf(e)}/`;
/** 首页卡片标题和详情页 h1 共用这个名字，跨页 View Transition 才能连起来 */
export const vtName = (e: Entry) => 't-' + e.id.replace(/[^a-zA-Z0-9_-]/g, '-');

export const fmtDate = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** 去掉 Markdown 语法，留下可读的纯文本，用于摘要、搜索和反向链接的上下文 */
export function plain(md = '') {
  return md
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~|]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(e: Entry, len = 90) {
  if (e.data.description) return e.data.description;
  const t = plain(e.body);
  return t.length > len ? t.slice(0, len) + '…' : t;
}

/** 中文按 400 字/分钟，英文按 200 词/分钟 */
export function readingMinutes(body = '') {
  const t = plain(body);
  const cjk = (t.match(/[㐀-鿿]/g) || []).length;
  const words = (t.replace(/[㐀-鿿]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

// 正文里形如 [文字](/posts/slug/) 的站内链接
const LINK_RE = /\[([^\]]*)\]\(\/(posts|notes|media|projects|links)\/([^)\s#?]+?)\/?(?:[#?][^)]*)?\)/g;

export interface Graph {
  entries: Entry[];
  byId: Map<string, Entry>;
  out: Map<string, string[]>;
  back: Map<string, string[]>;
  edges: [string, string][];
}

let cache: Promise<Graph> | undefined;

export function getGraph(): Promise<Graph> {
  cache ??= (async () => {
    const entries = (await getCollection('entries', (e) => import.meta.env.DEV || !e.data.draft))
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    const byId = new Map(entries.map((e) => [e.id, e]));
    const out = new Map<string, string[]>();
    const back = new Map<string, string[]>(entries.map((e) => [e.id, []]));
    const edges: [string, string][] = [];
    for (const e of entries) {
      const targets = new Set<string>();
      for (const m of (e.body ?? '').matchAll(LINK_RE)) {
        const id = `${m[2]}/${m[3]}`;
        if (id !== e.id && byId.has(id)) targets.add(id);
      }
      out.set(e.id, [...targets]);
      for (const t of targets) {
        back.get(t)!.push(e.id);
        edges.push([e.id, t]);
      }
    }
    return { entries, byId, out, back, edges };
  })();
  return cache;
}

/** 在 source 的正文里找到链向 targetId 的那句话，用作反向链接的上下文 */
export function linkContext(source: Entry, targetId: string) {
  const body = source.body ?? '';
  for (const m of body.matchAll(LINK_RE)) {
    if (`${m[2]}/${m[3]}` !== targetId) continue;
    const i = m.index!;
    const start = Math.max(body.lastIndexOf('\n', i), body.lastIndexOf('。', i - 1)) + 1;
    let end = body.indexOf('。', i + m[0].length);
    const nl = body.indexOf('\n', i + m[0].length);
    if (end < 0 || (nl >= 0 && nl < end)) end = nl < 0 ? body.length : nl; else end += 1;
    const before = plain(body.slice(start, i));
    const after = plain(body.slice(i + m[0].length, end));
    return { before: before.slice(-40), text: m[1], after: after.slice(0, 40) };
  }
  return null;
}

/** 出现次数最多的几个标签，星图用它们来分区 */
export function topTags(entries: Entry[], n = 4) {
  const c = new Map<string, number>();
  entries.forEach((e) => e.data.tags.forEach((t) => c.set(t, (c.get(t) ?? 0) + 1)));
  return [...c.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([t]) => t);
}

export function allTags(entries: Entry[]) {
  const c = new Map<string, number>();
  entries.forEach((e) => e.data.tags.forEach((t) => c.set(t, (c.get(t) ?? 0) + 1)));
  return [...c.entries()].sort((a, b) => b[1] - a[1]);
}
