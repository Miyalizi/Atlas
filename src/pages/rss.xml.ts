import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getGraph, TYPES, typeOf, urlOf, excerpt } from '../lib/content';

export async function GET(context: APIContext) {
  const { entries } = await getGraph();
  return rss({
    title: `${SITE.name} · ${SITE.subtitle}`,
    description: SITE.description,
    site: context.site!,
    customData: `<language>${SITE.locale}</language>`,
    items: entries.slice(0, 50).map((e) => ({
      title: e.data.title,
      link: urlOf(e),
      pubDate: e.data.date,
      description: excerpt(e, 160),
      // Markdown 文件输出全文；MDX 只输出摘要
      content: e.rendered?.html,
      categories: [TYPES[typeOf(e)].name, ...e.data.tags],
    })),
  });
}
