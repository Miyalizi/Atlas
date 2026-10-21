// 阅读进度条 + 目录高亮当前小节
const bar = document.querySelector<HTMLElement>('#progress i');
const prose = document.querySelector<HTMLElement>('.prose');
const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
const heads = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[];
let ticking = false;
function update() {
  ticking = false;
  if (bar && prose) {
    const r = prose.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight * 0.6)));
    bar.style.transform = `scaleX(${p})`;
  }
  let on: string | null = null;
  for (const h of heads) if (h.getBoundingClientRect().top < 140) on = h.id;
  links.forEach((a) => a.classList.toggle('on', decodeURIComponent(a.hash.slice(1)) === on));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
update();

// 手机上目录默认收起
if (matchMedia('(max-width: 860px)').matches) document.querySelector<HTMLDetailsElement>('.toc details')?.removeAttribute('open');
