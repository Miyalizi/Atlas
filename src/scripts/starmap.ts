// 知识星图：每条内容是一个节点，站内引用是连线。布局在首帧前一次算完，之后只响应用户操作，不自动播放。
interface NodeData { id: string; url: string; title: string; type: string; date: string; ex: string; back: number; cluster: number }
interface Data { nodes: NodeData[]; edges: [string, string][]; clusters: string[]; typeNames: Record<string, string> }
interface N { d: NodeData; x: number; y: number; vx: number; vy: number; cx: number; cy: number }

const RADIUS: Record<string, number> = { posts: 7, notes: 3.6, media: 5, projects: 5.5, links: 4.2 };
// 首次打开时星星按发布顺序依次亮起，最新一篇长文最后点亮为朱砂四角星；每颗淡入 ≤300ms，整段不到 1 秒，每个会话只放一次
const LIGHT = 360, FADE = 220, PULSE = 300;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** 和站点 logo 同款的四角星 */
function star4(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r);
}

export function mountStarmap(el: HTMLElement) {
  const data: Data = JSON.parse(el.querySelector('script[type="application/json"]')!.textContent!);
  const cv = el.querySelector('canvas')!, ctx = cv.getContext('2d')!, tip = el.querySelector('.atlas-tip') as HTMLElement;
  const hidden = new Set<string>();
  // 颜色只在换主题时读一次：getComputedStyle 每次都会强制样式计算，放在 draw 里会拖慢拖拽和悬停
  let C = { ink: '', ink3: '', rule: '', acc: '', paper: '', sans: '' };
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement), v = (n: string) => cs.getPropertyValue(n).trim();
    C = { ink: v('--ink'), ink3: v('--ink-3'), rule: v('--rule'), acc: v('--accent'), paper: v('--paper'), sans: v('--sans') };
  };
  readColors();

  el.querySelectorAll<HTMLButtonElement>('.legend button').forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') === 'true';
    b.setAttribute('aria-pressed', String(!on));
    on ? hidden.add(b.dataset.type!) : hidden.delete(b.dataset.type!);
    request();
  }));

  // 确定性的力导向布局：同一份内容每次打开都是同一张图
  const K = Math.max(data.clusters.length, 1);
  const angle = (c: number) => (c / K) * Math.PI * 2 + 0.6;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const nodes: N[] = data.nodes.map((d) => {
    const a = angle(d.cluster), far = d.cluster < 0 ? 0 : 1;
    return { d, x: Math.cos(a) * 220 * far + (rnd() - 0.5) * 140, y: Math.sin(a) * 150 * far + (rnd() - 0.5) * 110, vx: 0, vy: 0, cx: Math.cos(a) * 190 * far, cy: Math.sin(a) * 125 * far };
  });
  const byId = new Map(nodes.map((n) => [n.d.id, n]));
  const E = data.edges.map(([a, b]) => [byId.get(a)!, byId.get(b)!] as [N, N]).filter(([a, b]) => a && b);
  const nbr = new Map(nodes.map((n) => [n, new Set([n])]));
  E.forEach(([a, b]) => { nbr.get(a)!.add(b); nbr.get(b)!.add(a); });
  const ITER = nodes.length > 600 ? 120 : 300;
  for (let it = 0; it < ITER; it++) {
    const alpha = 1 - it / ITER;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = b.x - a.x, dy = b.y - a.y;
      const d2 = dx * dx + dy * dy || 0.01, d = Math.sqrt(d2);
      if (d > 400) continue;
      const f = (4200 / d2) * alpha; dx /= d; dy /= d;
      a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f;
    }
    for (const [a, b] of E) {
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, f = (d - 105) * 0.02 * alpha;
      a.vx += (dx / d) * f; a.vy += (dy / d) * f; b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
    }
    for (const n of nodes) {
      n.vx += (n.cx - n.x) * 0.006 * alpha; n.vy += (n.cy - n.y) * 0.006 * alpha;
      n.x += n.vx; n.y += n.vy; n.vx *= 0.6; n.vy *= 0.6;
    }
  }

  // 默认只给引用最多的几篇长文写名字，其余悬停才显示，避免标签挤成一团
  const named = new Set(nodes.filter((n) => n.d.type === 'posts').sort((a, b) => b.d.back - a.d.back).slice(0, 7));
  const newest = nodes.find((n) => n.d.type === 'posts') ?? nodes[0];
  // 数据按时间倒序：越早的星越先亮
  const delay = new Map(nodes.map((n, i) => [n, nodes.length > 1 ? ((nodes.length - 1 - i) / (nodes.length - 1)) * LIGHT : 0]));
  let t0 = -1, now = 0;
  try {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('atlas-lit')) { t0 = 0; sessionStorage.setItem('atlas-lit', '1'); }
  } catch { /* 存储不可用就不放 */ }
  const lit01 = (n: N) => (t0 < 0 ? 1 : clamp01((now - t0 - delay.get(n)!) / FADE));

  let W = 0, H = 0, k = 1, tx = 0, ty = 0, dpr = 1, cvTop = 0;
  let hover: N | null = null;
  function fit() {
    if (!nodes.length) return;
    const xs = nodes.map((n) => n.x), ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    k = Math.min(W / (maxX - minX + 240), H / (maxY - minY + 90), 1.6);
    tx = W / 2 - ((minX + maxX) / 2) * k; ty = H / 2 - ((minY + maxY) / 2) * k;
  }
  function resize() {
    const r = cv.getBoundingClientRect();
    if (!r.width) return;
    dpr = Math.min(devicePixelRatio || 1, 2);
    const first = !W;
    W = r.width; H = r.height; cvTop = cv.offsetTop; cv.width = W * dpr; cv.height = H * dpr;
    if (first) { fit(); if (t0 === 0) t0 = performance.now(); }
    draw();
  }
  // 同一帧里的多次指针事件只画一次
  let raf = 0;
  const request = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; draw(); }); };
  function draw() {
    const { ink, ink3, rule, acc, paper, sans } = C;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    // 极淡的点阵，只给出坐标感
    const g = 28 * k;
    if (g > 8) {
      ctx.fillStyle = rule;
      for (let x = ((tx % g) + g) % g; x < W; x += g) for (let y = ((ty % g) + g) % g; y < H; y += g) ctx.fillRect(x, y, 1, 1);
    }
    ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * tx, dpr * ty);
    const lit = hover ? nbr.get(hover)! : null;
    const vis = (n: N) => !hidden.has(n.d.type);
    now = performance.now();
    const playing = t0 > 0 && now - t0 < LIGHT + FADE + PULSE;
    for (const [a, b] of E) {
      if (!vis(a) || !vis(b)) continue;
      const on = hover && (a === hover || b === hover);
      ctx.strokeStyle = on ? acc : rule;
      ctx.globalAlpha = (hover && !on ? 0.35 : 1) * Math.min(lit01(a), lit01(b));
      ctx.lineWidth = (on ? 1.4 : 1) / k;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    const radius = (n: N) => (RADIUS[n.d.type] ?? 4) + Math.min(n.d.back, 4) * 0.6;
    for (const n of nodes) {
      if (!vis(n)) continue;
      const t = n.d.type, r = radius(n), a = lit01(n);
      ctx.globalAlpha = (lit && !lit.has(n) ? 0.22 : 1) * a;
      const c = n === hover ? acc : ink;
      ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 1.6 / Math.max(k, 0.8);
      ctx.beginPath();
      if (n === newest) {
        // 最新一篇：朱砂四角星 + 一圈细环；亮起的那一刻环向外扩散一次
        ctx.fillStyle = acc; star4(ctx, n.x, n.y, r * 2); ctx.fill();
        const p = t0 > 0 ? clamp01((now - t0 - delay.get(n)! - FADE * 0.5) / PULSE) : 1;
        ctx.beginPath(); ctx.strokeStyle = acc; ctx.lineWidth = 1 / k;
        ctx.globalAlpha *= 0.35 + (1 - p) * 0.45;
        ctx.arc(n.x, n.y, r * (2 + p * 1.4), 0, 7); ctx.stroke();
      }
      else if (t === 'projects') ctx.fillRect(n.x - r * 0.85, n.y - r * 0.85, r * 1.7, r * 1.7);
      else if (t === 'links') { ctx.moveTo(n.x - r, n.y); ctx.lineTo(n.x + r, n.y); ctx.moveTo(n.x, n.y - r); ctx.lineTo(n.x, n.y + r); ctx.stroke(); }
      else if (t === 'media') { ctx.fillStyle = paper; ctx.arc(n.x, n.y, r, 0, 7); ctx.fill(); ctx.stroke(); }
      else { ctx.arc(n.x, n.y, r, 0, 7); ctx.fill(); }
    }

    // 文字统一在屏幕坐标里排，按优先级放，和已放下的重叠就不画
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const placed: [number, number, number, number][] = [];
    const free = (x: number, y: number, w: number, h: number) =>
      placed.every(([px, py, pw, ph]) => x + w + 4 < px || px + pw + 4 < x || y + h + 2 < py || py + ph + 2 < y);
    const put = (s: string, x: number, y: number, font: string, color: string, alpha: number, force = false) => {
      ctx.font = font;
      const w = ctx.measureText(s).width;
      if (!force && !free(x, y - 11, w, 14)) return;
      placed.push([x, y - 11, w, 14]);
      // 底色描边当衬底，压在连线和星点上也读得清
      ctx.globalAlpha = alpha; ctx.lineJoin = 'round'; ctx.lineWidth = 4; ctx.strokeStyle = paper; ctx.strokeText(s, x, y);
      ctx.fillStyle = color; ctx.fillText(s, x, y);
    };
    const label = (n: N, strong = false) => {
      if (!vis(n)) return;
      const s = n.d.title.length > 16 && !strong ? n.d.title.slice(0, 15) + '…' : n.d.title;
      const r = n === newest ? radius(n) * 2 : radius(n);
      const sx = (n.x + r) * k + tx + 6, sy = n.y * k + ty + 4;
      const dim = lit && !lit.has(n) ? 0.22 : 1;
      put(s, sx, sy, `${strong ? 600 : 400} 12px ${sans}`, strong || n.d.type === 'posts' ? ink : ink3, dim * lit01(n), strong);
    };
    if (hover && vis(hover)) label(hover, true);
    label(newest);
    // 分区名放在该分区节点的重心上方
    data.clusters.forEach((name, c) => {
      const ms = nodes.filter((n) => n.d.cluster === c && vis(n));
      if (!ms.length) return;
      const x = ms.reduce((s, n) => s + n.x, 0) / ms.length, y = Math.min(...ms.map((n) => n.y));
      const s = [...name].join(' ');
      ctx.font = `500 11px ${sans}`;
      put(s, x * k + tx - ctx.measureText(s).width / 2, y * k + ty - 22, ctx.font, ink3, (hover ? 0.4 : 0.9) * (t0 > 0 ? clamp01((now - t0) / (LIGHT + FADE)) : 1));
    });
    if (lit) for (const n of lit) if (n !== hover) label(n);
    for (const n of nodes) if (named.has(n) || k > 1.7) label(n);
    if (playing) request();
    ctx.globalAlpha = 1;
  }

  const hit = (x: number, y: number) => {
    const wx = (x - tx) / k, wy = (y - ty) / k;
    let best: N | null = null, bd = 14 / k;
    for (const n of nodes) {
      if (hidden.has(n.d.type)) continue;
      const d = Math.hypot(n.x - wx, n.y - wy);
      if (d < bd) { bd = d; best = n; }
    }
    return best;
  };
  const zoomAt = (f: number, x: number, y: number) => {
    const nk = Math.max(0.4, Math.min(3.2, k * f));
    tx = x - ((x - tx) * nk) / k; ty = y - ((y - ty) * nk) / k; k = nk; request();
  };
  let tipFor: N | null = null;
  const showTip = (n: N | null, x = 0, y = 0) => {
    if (!n) { tipFor = null; return tip.classList.remove('on'); }
    tip.style.translate = `${Math.max(0, Math.min(x + 16, W - 270))}px ${y + cvTop + 16}px`;
    if (n === tipFor) return;
    tipFor = n;
    tip.innerHTML = '';
    const meta = document.createElement('span'); meta.textContent = `${data.typeNames[n.d.type]} · ${n.d.date} · ${n.d.back} 处引用`;
    const b = document.createElement('b'); b.textContent = n.d.title;
    tip.append(meta, b, document.createTextNode(n.d.ex));
    tip.classList.add('on');
  };

  const pts = new Map<number, [number, number]>();
  let drag: { n: N | null; x: number; y: number } | null = null, moved = 0, pinch = 0;
  cv.addEventListener('pointerdown', (e) => {
    cv.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, [e.offsetX, e.offsetY]);
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = Math.hypot(a[0] - b[0], a[1] - b[1]); drag = null; return; }
    drag = { n: hit(e.offsetX, e.offsetY), x: e.offsetX, y: e.offsetY }; moved = 0;
    cv.classList.add('dragging');
  });
  cv.addEventListener('pointermove', (e) => {
    if (pts.has(e.pointerId)) pts.set(e.pointerId, [e.offsetX, e.offsetY]);
    if (pts.size === 2) {
      const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (pinch) zoomAt(d / pinch, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      pinch = d; return;
    }
    if (drag) {
      const dx = e.offsetX - drag.x, dy = e.offsetY - drag.y;
      moved += Math.abs(dx) + Math.abs(dy);
      if (drag.n) { drag.n.x += dx / k; drag.n.y += dy / k; } else { tx += dx; ty += dy; }
      drag.x = e.offsetX; drag.y = e.offsetY;
      if (moved > 4) showTip(null);
      request(); return;
    }
    const n = hit(e.offsetX, e.offsetY);
    if (n !== hover) { hover = n; cv.style.cursor = n ? 'pointer' : ''; request(); }
    showTip(n, e.offsetX, e.offsetY);
  });
  const end = (e: PointerEvent) => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinch = 0;
    if (drag?.n && moved < 5) location.href = drag.n.d.url;
    drag = null; cv.classList.remove('dragging');
  };
  cv.addEventListener('pointerup', end);
  cv.addEventListener('pointercancel', end);
  cv.addEventListener('pointerleave', () => { if (!drag) { hover = null; showTip(null); request(); } });
  // 只在按住 ⌘/Ctrl（或触控板捏合）时缩放，不劫持页面滚动
  cv.addEventListener('wheel', (e) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault(); zoomAt(Math.exp(-e.deltaY * 0.004), e.offsetX, e.offsetY);
  }, { passive: false });
  el.querySelector('[data-zoom="in"]')?.addEventListener('click', () => zoomAt(1.25, W / 2, H / 2));
  el.querySelector('[data-zoom="out"]')?.addEventListener('click', () => zoomAt(0.8, W / 2, H / 2));
  el.querySelector('[data-zoom="fit"]')?.addEventListener('click', () => { fit(); request(); });
  document.addEventListener('themechange', () => requestAnimationFrame(() => { readColors(); draw(); }));
  document.fonts?.ready.then(() => { readColors(); request(); });
  new ResizeObserver(resize).observe(cv);
}
