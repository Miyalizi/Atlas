// /search.json 只在需要时加载一次（打开命令面板或悬停内链时），之后复用
export interface IndexItem {
  id: string; url: string; title: string; type: string; typeName: string;
  date: string; tags: string[]; excerpt: string; text: string;
}
let p: Promise<IndexItem[]> | undefined;
export const loadIndex = () =>
  (p ??= fetch('/search.json').then((r) => r.json()).catch(() => { p = undefined; return []; }));
