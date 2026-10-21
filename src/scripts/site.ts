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
const menuBtn = $('menu-toggle'), menu = $('menu');
menuBtn.addEventListener('click', () => {
  menu.hidden = !menu.hidden;
  menuBtn.setAttribute('aria-expanded', String(!menu.hidden));
});

/* ---------- 卡片光晕跟随 ---------- */
document.addEventListener('pointermove', (e) => {
  const el = (e.target as Element).closest?.('.row, .bl') as HTMLElement | null;
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}, { passive: true });

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
  { group: '操作', title: '复制 RSS 订阅地址', hint: '/rss.xml', run: () => navigator.clipboard?.writeText(new URL('/rss.xml', location.href).href).catch(() => {}) },
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
let lastFocus: Element | null = null;
async function open() {
  lastFocus = document.activeElement;
  pal.hidden = false;
  requestAnimationFrame(() => pal.classList.add('on'));
  input.value = ''; render(); input.focus();
  index = await loadIndex(); render();
}
function close() {
  pal.classList.remove('on');
  setTimeout(() => (pal.hidden = true), 160);
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
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); }
  else if (e.key === '/' && pal.hidden && !(e.target as Element).closest('input, textarea, [contenteditable]')) { e.preventDefault(); open(); }
});

/* ---------- 内链预览卡 ---------- */
const peek = $('peek');
let peekTimer: number | undefined;
const typeNames: Record<string, string> = { posts: '长文章', notes: '短笔记', media: '书影音', projects: '项目作品', links: '收藏链接' };
document.querySelectorAll<HTMLAnchorElement>('.prose a[href^="/"]').forEach((a) => {
  const m = new URL(a.href).pathname.match(/^\/(posts|notes|media|projects|links)\/([^/]+)\/?$/);
  if (!m) return;
  a.classList.add('internal');
  const id = `${m[1]}/${m[2]}`;
  const show = () => {
    clearTimeout(peekTimer);
    peekTimer = window.setTimeout(async () => {
      const d = (await loadIndex()).find((x) => x.id === id);
      if (!d) return;
      peek.innerHTML = `<span class="label">${typeNames[d.type]} · ${d.date}</span><b>${esc(d.title)}</b><p>${esc(d.excerpt)}</p>`;
      const r = a.getBoundingClientRect();
      const left = Math.min(r.left + scrollX, scrollX + innerWidth - peek.offsetWidth - 16);
      peek.style.left = `${Math.max(16, left)}px`;
      peek.style.top = `${r.bottom + scrollY + 8}px`;
      peek.classList.add('on');
    }, 220);
  };
  const hide = () => { clearTimeout(peekTimer); peek.classList.remove('on'); };
  a.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(); });
  a.addEventListener('pointerleave', hide);
  a.addEventListener('focus', show);
  a.addEventListener('blur', hide);
});
