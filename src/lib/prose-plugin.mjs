// 正文的几处排版增强（Sätteri 的 hast 插件），构建时处理：
// 1. 表格外面包一层可横向滚动的容器，表格本身才能撑满正文宽度
// 2. > [!NOTE] / [!TIP] / [!WARNING] 开头的引用块变成提示框
// 3. 外链加上 ext 类，站内文章链接加上 internal 类，样式据此区分
import { defineHastPlugin } from 'satteri';

const CALLOUTS = { NOTE: '说明', TIP: '提示', WARNING: '注意' };
const MARK_RE = /^\s*\[!(NOTE|TIP|WARNING)\]\s*/;
const ENTRY_RE = /^\/(posts|notes|media|projects|links)\//;
const classes = (n) => {
  const c = n.properties?.className ?? [];
  return Array.isArray(c) ? c : [c];
};

/** 去掉第一段开头的 [!NOTE] 标记，返回新的段落；去掉后段落为空则返回 null */
function stripMark(p) {
  const [head, ...rest] = p.children;
  const value = head.value.replace(MARK_RE, '');
  const kids = value ? [{ ...head, value }, ...rest] : rest[0]?.tagName === 'br' ? rest.slice(1) : rest;
  return kids.length ? { ...p, children: kids } : null;
}

export default defineHastPlugin({
  name: 'atlas-prose',
  element: [
    {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href !== 'string') return;
        if (/^https?:\/\//.test(href)) {
          ctx.setProperty(node, 'className', [...classes(node), 'ext']);
          ctx.setProperty(node, 'rel', ['noopener']);
        } else if (ENTRY_RE.test(href)) {
          ctx.setProperty(node, 'className', [...classes(node), 'internal']);
        }
      },
    },
    {
      filter: ['table'],
      visit(node, ctx) {
        ctx.wrapNode(node, { type: 'element', tagName: 'div', properties: { className: ['table-wrap'] }, children: [] });
      },
    },
    {
      filter: ['blockquote'],
      visit(node, ctx) {
        const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
        const first = kids[0];
        const head = first?.tagName === 'p' && first.children[0];
        const m = head?.type === 'text' && head.value.match(MARK_RE);
        if (!m) return;
        const p = stripMark(first);
        ctx.replaceNode(node, {
          type: 'element',
          tagName: 'aside',
          properties: { className: ['callout', `callout-${m[1].toLowerCase()}`] },
          children: [
            { type: 'element', tagName: 'strong', properties: { className: ['callout-label'] }, children: [{ type: 'text', value: CALLOUTS[m[1]] }] },
            ...(p ? [p] : []),
            ...kids.slice(1),
          ],
        });
      },
    },
  ],
});
