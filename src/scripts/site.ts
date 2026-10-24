import { loadIndex, type IndexItem } from './index-data';

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

/* ---------- 深浅色：从按钮处圆形展开 ---------- */
export function setTheme(next: 'light' | 'dark', x = innerWidth - 40, y = 30) {
  const apply = () => {
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    document.dispatchEvent(new CustomEvent('themechange'));
  };
  if (!document.startViewTransition || reduce.matches) return apply();
  root.classList.add('theme-vt');
  const t = document.startViewTransition(apply);
  t.ready.then(() => {
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 300, easing: 'cubic-bezier(.2,.7,.2,1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
  t.finished.finally(() => root.classList.remove('theme-vt'));
}
const toggleTheme = (x?: number, y?: number) => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', x, y);
$('theme-toggle').addEventListener('click', (e) => {
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  toggleTheme(r.left + r.width / 2, r.top + r.height / 2);
});
// 跟随系统变化（用户没手动选过时）
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved; try { saved = localStorage.getItem('theme'); } catch {}
  if (!saved) { root.dataset.theme = e.matches ? 'dark' : 'light'; document.dispatchEvent(new CustomEvent('themechange')); }
});

/* ---------- 手机菜单 ---------- */
// 展开会把整页往下推一大截，所以高度要过渡，不能瞬间跳；收起时同理，动画结束再真正 hidden
const menuBtn = $('menu-toggle'), menu = $('menu');
let menuAnim: Animation | undefined;
function setMenu(open: boolean) {
  if (open === !menu.hidden && !menuAnim) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  const from = menuAnim ? menu.getBoundingClientRect().height : open ? 0 : menu.offsetHeight;
  menuAnim?.cancel();
  menu.hidden = false;
  const to = open ? menu.scrollHeight : 0;
  if (reduce.matches) { menu.hidden = !open; menuAnim = undefined; return; }
  menu.style.overflow = 'hidden';
  menuAnim = menu.animate(
    { height: [`${from}px`, `${to}px`], opacity: open ? [0, 1] : [1, 0] },
    { duration: 220, easing: 'cubic-bezier(.2,.7,.2,1)' },
  );
  menuAnim.onfinish = () => { menuAnim = undefined; menu.style.overflow = ''; menu.hidden = !open; };
}
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) { menuAnim?.cancel(); menuAnim = undefined; menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); } });

/* ---------- 卡片光晕跟随 ---------- */
// 只给有鼠标的设备；每帧最多写一次，避免高回报率鼠标把一帧拆成好几次样式计算
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let glowEl: HTMLElement | null = null, gx = 0, gy = 0, glowRaf = 0;
  document.addEventListener('pointermove', (e) => {
    glowEl = (e.target as Element).closest?.('.row, .bl') as HTMLElement | null;
    if (!glowEl) return;
    gx = e.clientX; gy = e.clientY;
    if (!glowRaf) glowRaf = requestAnimationFrame(() => {
      glowRaf = 0;
      if (!glowEl) return;
      const r = glowEl.getBoundingClientRect();
      glowEl.style.setProperty('--mx', `${gx - r.left}px`);
      glowEl.style.setProperty('--my', `${gy - r.top}px`);
    });
  }, { passive: true });
}

/* ---------- 轻提示 ---------- */
// 没有可见结果的操作（比如复制）要给一个回应，否则用户不知道点没点上
const toast = $('toast');
let toastTimer: number | undefined;
export function say(msg: string) {
  toast.textContent = msg;
  toast.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('on'), 1600);
}
async function copy(text: string, msg = '已复制') {
  try { await navigator.clipboard.writeText(text); say(msg); return true; }
  catch { say('复制失败，请手动选择'); return false; }
}

/* ---------- 代码块复制 ---------- */
// 按钮就是反馈本身：点完原地变成“已复制”，不另外弹东西
document.querySelectorAll<HTMLPreElement>('.prose pre').forEach((pre) => {
  const wrap = document.createElement('div');
  wrap.className = 'code';
  pre.before(wrap); wrap.append(pre);
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'copy'; b.textContent = '复制'; b.setAttribute('aria-label', '复制代码');
  let t: number | undefined;
  b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, '')); b.textContent = '已复制'; }
    catch { b.textContent = '复制失败'; }
    b.classList.add('done');
    clearTimeout(t);
    t = window.setTimeout(() => { b.textContent = '复制'; b.classList.remove('done'); }, 1600);
  });
  wrap.append(b);
});

/* ---------- ⌘K 命令面板 ---------- */
const pal = $('palette'), input = $<HTMLInputElement>('palette-input'), res = $('palette-results');
type Cmd = { group: string; title: string; sub?: string; hint?: string; type?: string; url?: string; run?: () => void };
const SHAPES: Record<string, string> = {
  posts: '<circle cx="6" cy="6" r="5" fill="currentColor"/>',
  notes: '<circle cx="6" cy="6" r="2.6" fill="currentColor"/>',
  media: '<circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  projects: '<rect x="2" y="2" width="8" height="8" fill="currentColor"/>',
  links: '<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="1.6" fill="none"/>',
  cmd: '<path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" fill="none" stroke="currentColor" stroke-width="1.4"/>',
};
const shape = (t = 'cmd') => `<svg class="shape" viewBox="0 0 12 12" aria-hidden="true">${SHAPES[t] ?? SHAPES.cmd}</svg>`;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const commands: Cmd[] = [
  { group: '操作', title: '切换深浅色', run: () => toggleTheme() },
  { group: '操作', title: '复制 RSS 订阅地址', hint: '/rss.xml', run: () => copy(new URL('/rss.xml', location.href).href, '已复制 RSS 地址') },
  { group: '跳转', title: '首页 · 知识星图', url: '/' },
  { group: '跳转', title: '归档 · 按时间', url: '/archive/' },
  { group: '跳转', title: '归档 · 按标签', url: '/archive/tags/' },
  { group: '跳转', title: '长文章', url: '/posts/' },
  { group: '跳转', title: '短笔记', url: '/notes/' },
  { group: '跳转', title: '书影音', url: '/media/' },
  { group: '跳转', title: '项目作品', url: '/projects/' },
  { group: '跳转', title: '收藏链接', url: '/links/' },
  { group: '跳转', title: 'Now · 最近在做什么', url: '/now/' },
  { group: '跳转', title: '关于', url: '/about/' },
];
let items: Cmd[] = [], sel = 0, index: IndexItem[] = [];

function hl(s: string, q: string) {
  if (!q) return esc(s);
  const i = s.toLowerCase().indexOf(q.toLowerCase());
  return i < 0 ? esc(s) : esc(s.slice(0, i)) + '<mark>' + esc(s.slice(i, i + q.length)) + '</mark>' + esc(s.slice(i + q.length));
}
function search(q: string): Cmd[] {
  const ql = q.toLowerCase();
  if (!ql) return index.slice(0, 6).map((d) => ({ group: '最近', title: d.title, type: d.type, hint: d.date, url: d.url }));
  const scored: [number, Cmd][] = [];
  for (const d of index) {
    let s = 0, sub: string | undefined;
    if (d.title.toLowerCase().includes(ql)) s += 10;
    if (d.tags.some((t) => t.toLowerCase().includes(ql))) s += 5;
    if (d.excerpt.toLowerCase().includes(ql)) s += 3;
    const i = d.text.toLowerCase().indexOf(ql);
    if (i >= 0) { s += 1; if (s < 10) sub = (i > 18 ? '…' : '') + d.text.slice(Math.max(0, i - 18), i + q.length + 30) + '…'; }
    if (s) scored.push([s, { group: '内容', title: d.title, sub, type: d.type, hint: d.typeName, url: d.url }]);
  }
  return scored.sort((a, b) => b[0] - a[0]).slice(0, 10).map(([, c]) => c);
}
function render() {
  const q = input.value.trim();
  items = [...search(q), ...commands.filter((c) => !q || c.title.toLowerCase().includes(q.toLowerCase()))];
  sel = 0;
  if (!items.length) { res.innerHTML = `<div class="empty">没有找到「${esc(q)}」。可以试试标签名，或换个关键词。</div>`; return; }
  let html = '', last = '';
  items.forEach((it, i) => {
    if (it.group !== last) { html += `<div class="grp">${it.group}</div>`; last = it.group; }
    const tag = it.url ? `a href="${it.url}"` : 'div';
    html += `<${tag} class="it${i === sel ? ' sel' : ''}" role="option" data-i="${i}" id="opt-${i}">${shape(it.type)}<span class="tt"><span>${hl(it.title, q)}</span>${it.sub ? `<small>${hl(it.sub, q)}</small>` : ''}</span><span class="h">${esc(it.hint ?? '')}</span></${it.url ? 'a' : 'div'}>`;
  });
  res.innerHTML = html;
  input.setAttribute('aria-activedescendant', 'opt-0');
}
function select(i: number) {
  if (!items.length) return;
  sel = (i + items.length) % items.length;
  res.querySelectorAll('.it').forEach((el) => el.classList.toggle('sel', Number((el as HTMLElement).dataset.i) === sel));
  res.querySelector('.sel')?.scrollIntoView({ block: 'nearest' });
  input.setAttribute('aria-activedescendant', `opt-${sel}`);
}
function run(i: number) {
  const it = items[i]; if (!it) return;
  close();
  if (it.url) location.href = it.url; else it.run?.();
}
let lastFocus: Element | null = null, closeTimer: number | undefined;
async function open() {
  clearTimeout(closeTimer);
  if (!pal.hidden && pal.classList.contains('on')) return;
  lastFocus = document.activeElement;
  pal.hidden = false;
  requestAnimationFrame(() => pal.classList.add('on'));
  input.value = ''; render(); input.focus();
  index = await loadIndex(); render();
}
function close() {
  pal.classList.remove('on');
  // 关闭动画没走完又按 ⌘K 重新打开时，open() 会清掉这个定时器，面板不会被藏起来
  closeTimer = window.setTimeout(() => (pal.hidden = true), 160);
  (lastFocus as HTMLElement | null)?.focus?.();
}
input.addEventListener('input', render);
input.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); select(sel + 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); select(sel - 1); }
  else if (e.key === 'Enter') { e.preventDefault(); run(sel); }
  else if (e.key === 'Escape') close();
});
res.addEventListener('click', (e) => {
  const el = (e.target as Element).closest('.it') as HTMLElement | null;
  if (!el) return; e.preventDefault(); run(Number(el.dataset.i));
});
res.addEventListener('pointermove', (e) => {
  const el = (e.target as Element).closest('.it') as HTMLElement | null;
  if (el && Number(el.dataset.i) !== sel) select(Number(el.dataset.i));
});
pal.addEventListener('click', (e) => { if (e.target === pal) close(); });
document.querySelectorAll('[data-open-palette]').forEach((b) => b.addEventListener('click', open));
addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.classList.contains('on') ? close() : open(); }
  else if (e.key === '/' && !pal.classList.contains('on') && !(e.target as Element).closest('input, textarea, [contenteditable]')) { e.preventDefault(); open(); }
});

/* ---------- 内链预览卡 ---------- */
// 同一张卡从一个链接移到另一个链接：已经打开时不再等待、不再淡出淡入，只平移过去换内容。
// 离开链接后留一点宽限期，指针掠过两个链接之间的空隙时卡片不会闪一下。
const peek = $('peek');
let peekTimer: number | undefined, hideTimer: number | undefined, peekFor = '';
const typeNames: Record<string, string> = { posts: '长文章', notes: '短笔记', media: '书影音', projects: '项目作品', links: '收藏链接' };
async function placePeek(a: HTMLAnchorElement, id: string) {
  const d = (await loadIndex()).find((x) => x.id === id);
  if (!d) return;
  const wasOn = peek.classList.contains('on');
  if (peekFor !== id) {
    peek.innerHTML = `<span class="label">${typeNames[d.type]} · ${d.date}</span><b>${esc(d.title)}</b><p>${esc(d.excerpt)}</p>`;
    peekFor = id;
  }
  const r = a.getBoundingClientRect();
  const left = Math.max(16, Math.min(r.left + scrollX, scrollX + innerWidth - peek.offsetWidth - 16));
  peek.classList.toggle('moving', wasOn);
  peek.style.left = `${left}px`;
  peek.style.top = `${r.bottom + scrollY + 8}px`;
  peek.classList.add('on');
}
document.querySelectorAll<HTMLAnchorElement>('.prose a[href^="/"]').forEach((a) => {
  const m = new URL(a.href).pathname.match(/^\/(posts|notes|media|projects|links)\/([^/]+)\/?$/);
  if (!m) return;
  a.classList.add('internal');
  const id = `${m[1]}/${m[2]}`;
  const show = () => {
    clearTimeout(peekTimer); clearTimeout(hideTimer);
    if (peek.classList.contains('on')) placePeek(a, id);
    else peekTimer = window.setTimeout(() => placePeek(a, id), 220);
  };
  const hide = () => {
    clearTimeout(peekTimer); clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => peek.classList.remove('on', 'moving'), 120);
  };
  a.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(); });
  a.addEventListener('pointerleave', hide);
  a.addEventListener('focus', show);
  a.addEventListener('blur', hide);
});
