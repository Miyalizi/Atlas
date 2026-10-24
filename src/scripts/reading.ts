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
  moveMarker();
}
// 目录高亮：一根红线在条目之间滑动，而不是这一条熄灭、那一条亮起，读者能看出自己是“往下走了一节”
const tocList = document.querySelector<HTMLElement>('.toc ol');
const marker = tocList && document.createElement('i');
if (tocList && marker) { marker.className = 'toc-marker'; marker.setAttribute('aria-hidden', 'true'); tocList.append(marker); tocList.classList.add('has-marker'); }
function moveMarker() {
  if (!marker || !tocList) return;
  const a = links.find((l) => l.classList.contains('on'));
  if (!a) { marker.style.opacity = '0'; return; }
  marker.style.opacity = '1';
  marker.style.transform = `translateY(${a.offsetTop}px)`;
  marker.style.height = `${a.offsetHeight}px`;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
if (prose) new ResizeObserver(() => requestAnimationFrame(measure)).observe(prose);
addEventListener('resize', () => requestAnimationFrame(measure), { passive: true });
measure();

// 手机上目录默认收起
if (matchMedia('(max-width: 860px)').matches) document.querySelector<HTMLDetailsElement>('.toc details')?.removeAttribute('open');
// 手机上目录收起时量不到位置，展开后再对一次
document.querySelector('.toc details')?.addEventListener('toggle', moveMarker);
