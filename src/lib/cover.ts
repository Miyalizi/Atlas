// 自动封面：由内容 id 确定性地生成一张“星图”，同一篇永远长一样
// 坐标弧线 + 背景星点 + 一组连线星座 + 一颗朱砂主星，图注写编号、坐标和主标签
import { getGraph, typeOf, type Entry } from './content';

export const COVER_W = 1200;
export const COVER_H = 630;

const PALETTES = {
  light: { bg: '#ECEAE5', grid: 'rgba(28,27,25,.07)', dim: 'rgba(28,27,25,.38)', line: 'rgba(28,27,25,.45)', ink: '#1C1B19', accent: '#B8372A' },
  dark: { bg: '#1B1A19', grid: 'rgba(236,233,228,.07)', dim: 'rgba(236,233,228,.38)', line: 'rgba(236,233,228,.42)', ink: '#ECE9E4', accent: '#E2654B' },
};
export type CoverTheme = keyof typeof PALETTES;

function hash(s: string) {
  let h = 2166136261;
  for (const c of s) { h ^= c.codePointAt(0)!; h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n: number) => Math.round(n * 10) / 10;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
/** 和站点 logo 同款的四角星 */
const star4 = (x: number, y: number, r: number) =>
  `M${f(x)} ${f(y - r)}Q${f(x)} ${f(y)} ${f(x + r)} ${f(y)}Q${f(x)} ${f(y)} ${f(x)} ${f(y + r)}Q${f(x)} ${f(y)} ${f(x - r)} ${f(y)}Q${f(x)} ${f(y)} ${f(x)} ${f(y - r)}Z`;

export interface CoverInfo { seed: string; no: number; tag?: string }

export function coverSvg({ seed, no, tag }: CoverInfo, theme: CoverTheme, opts: { ascii?: boolean } = {}) {
  const c = PALETTES[theme];
  const r = rng(hash(seed));
  const W = COVER_W, H = COVER_H;
  let s = `<rect width="${W}" height="${H}" fill="${c.bg}"/>`;

  // 赤经赤纬网格：以画面下方外侧一点为中心的同心弧与放射线
  const cx = W * (0.15 + r() * 0.7), cy = H * (1.3 + r() * 0.5);
  s += `<g fill="none" stroke="${c.grid}">`;
  for (let k = 1; k <= 9; k++) s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${220 + k * 95}"/>`;
  for (let k = -6; k <= 6; k++) {
    const a = -Math.PI / 2 + k * 0.16;
    s += `<path d="M${f(cx)} ${f(cy)}L${f(cx + Math.cos(a) * 1400)} ${f(cy + Math.sin(a) * 1400)}"/>`;
  }
  s += `</g><g fill="${c.dim}">`;
  for (let k = 0; k < 110; k++) {
    const rr = r() < 0.85 ? 0.8 + r() * 1.2 : 1.8 + r() * 1.6;
    s += `<circle cx="${f(r() * W)}" cy="${f(r() * H)}" r="${f(rr)}"/>`;
  }
  s += `</g>`;

  // 星座：右侧中部取 6–8 个互不太近的点，按最近邻连成折线，再分出一条枝
  const n = 6 + Math.floor(r() * 3);
  const pts: [number, number][] = [];
  for (let tries = 0; pts.length < n && tries < 500; tries++) {
    const p: [number, number] = [W * 0.42 + r() * W * 0.5, H * 0.18 + r() * H * 0.5];
    if (pts.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) > 70)) pts.push(p);
  }
  const order = [pts.shift()!];
  while (pts.length) {
    const [lx, ly] = order.at(-1)!;
    pts.sort((a, b) => Math.hypot(a[0] - lx, a[1] - ly) - Math.hypot(b[0] - lx, b[1] - ly));
    order.push(pts.shift()!);
  }
  const br = order[1 + Math.floor(r() * (order.length - 3))];
  s += `<g fill="none" stroke="${c.line}" stroke-width="1.4"><path d="M${order.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}"/>`;
  s += `<path d="M${f(br[0])} ${f(br[1])}L${f(br[0] + (r() - 0.5) * 160)} ${f(br[1] + 60 + r() * 40)}"/></g>`;
  const main = Math.floor(r() * order.length);
  s += `<g fill="${c.ink}">`;
  order.forEach((p, i) => { if (i !== main) s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(3.5 + r() * 3)}"/>`; });
  s += `</g>`;
  const [mx, my] = order[main];
  s += `<circle cx="${f(mx)}" cy="${f(my)}" r="38" fill="none" stroke="${c.accent}" stroke-opacity=".35"/>`;
  s += `<path d="${star4(mx, my, 22)}" fill="${c.accent}"/>`;

  // 图注；分享图在没有中文字体的环境里渲染，只保留 ASCII
  const ra = `${String(Math.floor(r() * 24)).padStart(2, '0')}h ${String(Math.floor(r() * 60)).padStart(2, '0')}m`;
  const de = `${r() < 0.5 ? '+' : '−'}${Math.floor(r() * 80)}°`;
  const t = tag && (!opts.ascii || /^[\x20-\x7e]+$/.test(tag)) ? ' · ' + esc(tag.toUpperCase()) : '';
  s += `<g font-family="ui-monospace, Menlo, 'DejaVu Sans Mono', monospace" font-size="18" fill="${c.dim}" letter-spacing="2">`;
  s += `<text x="56" y="${H - 100}">ATLAS · NO.${String(no).padStart(3, '0')}</text><text x="56" y="${H - 74}">RA ${ra} · DEC ${de}${t}</text></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${s}</svg>`;
}

/** 编号按同类内容的发布顺序，第一篇是 001 */
export async function coverInfo(entry: Entry): Promise<CoverInfo> {
  const { entries } = await getGraph();
  const same = entries.filter((e) => typeOf(e) === typeOf(entry));
  return { seed: entry.id, no: same.length - same.indexOf(entry), tag: entry.data.tags[0] };
}

/** 长文和项目默认带封面；其他类型只有手动写了 cover 才显示 */
export const hasCover = (e: Entry) => !!e.data.cover || ['posts', 'projects'].includes(typeOf(e));
export const coverPath = (e: Entry, theme: CoverTheme) => `/covers/${e.id}-${theme}.svg`;
export const ogPath = (e: Entry) => `/og/${e.id}.png`;
