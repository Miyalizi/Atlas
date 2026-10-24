import type { APIRoute } from 'astro';
import { getGraph } from '../../lib/content';
import { coverInfo, coverSvg, type CoverTheme } from '../../lib/cover';

export async function getStaticPaths() {
  const { entries } = await getGraph();
  return entries.filter((e) => !e.data.cover).flatMap((entry) =>
    (['light', 'dark'] as const).flatMap((theme) => [false, true].map((wide) =>
      ({ params: { path: `${entry.id}-${theme}${wide ? '-wide' : ''}` }, props: { entry, theme, wide } }))));
}

export const GET: APIRoute = async ({ props }) => {
  const svg = coverSvg(await coverInfo(props.entry), props.theme as CoverTheme, { wide: props.wide });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
