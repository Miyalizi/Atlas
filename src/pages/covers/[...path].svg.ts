import type { APIRoute } from 'astro';
import { getGraph } from '../../lib/content';
import { coverInfo, coverSvg, type CoverTheme } from '../../lib/cover';

export async function getStaticPaths() {
  const { entries } = await getGraph();
  return entries.filter((e) => !e.data.cover).flatMap((entry) =>
    (['light', 'dark'] as const).map((theme) => ({ params: { path: `${entry.id}-${theme}` }, props: { entry, theme } })));
}

export const GET: APIRoute = async ({ props }) => {
  const svg = coverSvg(await coverInfo(props.entry), props.theme as CoverTheme);
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
