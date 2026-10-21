// 每篇一张 1200×630 的分享图；手动指定了 cover 的条目直接用那张图，不走这里
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getGraph } from '../../lib/content';
import { coverInfo, coverSvg } from '../../lib/cover';

export async function getStaticPaths() {
  const { entries } = await getGraph();
  return entries.filter((e) => !e.data.cover).map((entry) => ({ params: { path: entry.id }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const svg = coverSvg(await coverInfo(props.entry), 'light', { ascii: true });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
