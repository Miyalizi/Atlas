// 阅读进度条 + 目录高亮当前小节
// 位置只在加载和尺寸变化时量一次，滚动时只拿 scrollY 去比，不在滚动帧里读布局
const bar = document.querySelector<HTMLElement>('#progress i');
const prose = document.querySelector<HTMLElement>('.prose');
const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
const heads = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[];
let proseTop = 0, proseH = 0, tops: number[] = [], current: string | null | undefined, ticking = false;
function measure() {
  if (prose) { const r = prose.getBoundingClientRect(); proseTop = r.top + scrollY; proseH = r.height; }
  tops = heads.map((h) => h.getBoundingClientRect().top + scrollY);
  update();
}
function update() {
  ticking = false;
  const y = scrollY;
  if (bar && prose) {
    const p = Math.min(1, Math.max(0, (y - proseTop) / Math.max(1, proseH - innerHeight * 0.6)));
    bar.style.transform = `scaleX(${p})`;
  }
  let on: string | null = null;
  for (let i = 0; i < tops.length; i++) if (tops[i] - y < 140) on = heads[i].id;
  if (on === current) return;
  current = on;
  links.forEach((a) => a.classList.toggle('on', decodeURIComponent(a.hash.slice(1)) === on));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
if (prose) new ResizeObserver(() => requestAnimationFrame(measure)).observe(prose);
addEventListener('resize', () => requestAnimationFrame(measure), { passive: true });
measure();

// 手机上目录默认收起
if (matchMedia('(max-width: 860px)').matches) document.querySelector<HTMLDetailsElement>('.toc details')?.removeAttribute('open');
