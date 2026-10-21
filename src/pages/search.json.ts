// 命令面板全文搜索和内链预览卡共用的索引
import { getGraph, TYPES, typeOf, urlOf, fmtDate, excerpt, plain } from '../lib/content';

export async function GET() {
  const { entries } = await getGraph();
  const data = entries.map((e) => ({
    id: e.id,
    url: urlOf(e),
    title: e.data.title,
    type: typeOf(e),
    typeName: TYPES[typeOf(e)].name,
    date: fmtDate(e.data.date),
    tags: e.data.tags,
    excerpt: excerpt(e, 100),
    text: plain(e.body),
  }));
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
