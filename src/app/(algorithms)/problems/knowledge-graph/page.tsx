"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { algorithmKnowledgeGraph } from "../data/knowledge-graph";
import { KnowledgeNode, KnowledgeEdge } from "../types";

const graph = algorithmKnowledgeGraph;

const NODE_CONFIG: Record<string, { color: string; label: string; r: number }> = {
  category: { color: "#3b82f6", label: "分类", r: 10 },
  concept: { color: "#22c55e", label: "概念", r: 8 },
  technique: { color: "#f59e0b", label: "技巧", r: 7 },
  pattern: { color: "#a855f7", label: "模式", r: 8 },
  problem: { color: "#ef4444", label: "题目", r: 6 },
};

const EDGE_CONFIG: Record<string, { color: string; label: string; dash: boolean }> = {
  prerequisite: { color: "#f59e0b", label: "前置知识", dash: false },
  extends: { color: "#22c55e", label: "扩展", dash: false },
  similar: { color: "#3b82f6", label: "相似", dash: true },
  applies: { color: "#a855f7", label: "应用", dash: true },
  contains: { color: "#6b7280", label: "包含", dash: false },
  variant: { color: "#ec4899", label: "变体", dash: true },
};

function useForceLayout(nodes: KnowledgeNode[], edges: KnowledgeEdge[], w: number, h: number) {
  const [pos, setPos] = useState<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    if (!nodes.length) return;

    const p = new Map<string, { x: number; y: number }>();
    const groups: Record<string, KnowledgeNode[]> = {};
    nodes.forEach(n => (groups[n.type] ??= []).push(n));

    const types = Object.keys(groups);
    types.forEach((type, li) => {
      const layer = groups[type];
      layer.forEach((n, ni) => {
        p.set(n.id, {
          x: (w / (layer.length + 1)) * (ni + 1) + (Math.random() - 0.5) * 40,
          y: (h / (types.length + 1)) * (li + 1) + (Math.random() - 0.5) * 40,
        });
      });
    });

    for (let i = 0; i < 80; i++) {
      nodes.forEach(n => {
        const cur = p.get(n.id)!;
        let fx = 0, fy = 0;

        nodes.forEach(o => {
          if (o.id === n.id) return;
          const op = p.get(o.id)!;
          const dx = cur.x - op.x, dy = cur.y - op.y;
          const d = Math.hypot(dx, dy) || 1;
          const f = (d < 40 ? 2000 : 1000) / (d * d);
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        });

        edges.forEach(e => {
          const oid = e.source === n.id ? e.target : e.target === n.id ? e.source : null;
          if (!oid) return;
          const op = p.get(oid);
          if (!op) return;
          const dx = op.x - cur.x, dy = op.y - cur.y;
          const d = Math.hypot(dx, dy) || 1;
          const f = (d - 60) * 0.003;
          fx += (dx / d) * f;
          fy += (dy / d) * f;
        });

        const pad = 50;
        if (cur.x < pad) fx += 6;
        if (cur.x > w - pad) fx -= 6;
        if (cur.y < pad) fy += 6;
        if (cur.y > h - pad) fy -= 6;

        p.set(n.id, { x: cur.x + fx * 0.1, y: cur.y + fy * 0.1 });
      });
    }

    setPos(p);
  }, [nodes, edges, w, h]);

  return pos;
}

export default function KnowledgeGraphPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 800, h: 600 });
  const [selected, setSelected] = useState<KnowledgeNode | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  const zoom = useCallback((d: number) => setScale(s => Math.min(Math.max(s * d, 0.3), 3)), []);

  useEffect(() => {
    const update = () => {
      if (ref.current) setDim({ w: ref.current.offsetWidth, h: Math.max(600, window.innerHeight - 200) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const nodes = useMemo(() => filter ? graph.nodes.filter(n => n.type === filter) : graph.nodes, [filter]);
  const nodeIds = useMemo(() => new Set(nodes.map(n => n.id)), [nodes]);
  const edges = useMemo(() => graph.edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target)), [nodeIds]);
  const pos = useForceLayout(nodes, edges, dim.w, dim.h);

  const relatedIds = useMemo(() => {
    if (!selected) return new Set<string>();
    const s = new Set<string>();
    graph.edges.forEach(e => {
      if (e.source === selected.id || e.target === selected.id) {
        s.add(e.source);
        s.add(e.target);
      }
    });
    return s;
  }, [selected]);

  const related = useMemo(() => {
    if (!selected) return null;
    const get = (rel: string, dir: "in" | "out" | "both") =>
      graph.edges
        .filter(e => e.relation === rel && (dir === "in" ? e.target === selected.id : dir === "out" ? e.source === selected.id : e.source === selected.id || e.target === selected.id))
        .map(e => graph.nodes.find(n => n.id === (e.source === selected.id ? e.target : e.source)))
        .filter(Boolean) as KnowledgeNode[];
    return { pre: get("prerequisite", "in"), ext: get("extends", "out"), sim: get("similar", "both") };
  }, [selected]);

  return (
    <main className="py-4 sm:py-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">筛选:</span>
        {[null, ...Object.keys(NODE_CONFIG)].map(t => (
          <button
            key={t ?? "all"}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${filter === t ? "text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"}`}
            style={{ backgroundColor: filter === t ? (t ? NODE_CONFIG[t].color : "#18181b") : undefined }}
          >
            {t ? NODE_CONFIG[t].label : "全部"}
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div ref={ref} className="flex-1 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
            {[{ icon: "M12 4v16m8-8H4", fn: () => zoom(1.2) }, { icon: "M20 12H4", fn: () => zoom(0.8) }].map((b, i) => (
              <button key={i} onClick={b.fn} className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} /></svg>
              </button>
            ))}
            <button onClick={() => { setScale(1); setPan({ x: 0, y: 0 }); }} className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-white flex items-center justify-center text-xs font-medium">1:1</button>
            <div className="mt-1 text-xs text-zinc-500 text-center">{Math.round(scale * 100)}%</div>
          </div>

          <svg
            width={dim.w}
            height={dim.h}
            className={`select-none ${drag ? "cursor-grabbing" : "cursor-grab"}`}
            onWheel={e => { e.preventDefault(); zoom(e.deltaY > 0 ? 0.9 : 1.1); }}
            onMouseDown={e => e.button === 0 && setDrag({ x: e.clientX - pan.x, y: e.clientY - pan.y })}
            onMouseMove={e => drag && setPan({ x: e.clientX - drag.x, y: e.clientY - drag.y })}
            onMouseUp={() => setDrag(null)}
            onMouseLeave={() => setDrag(null)}
          >
            <g transform={`translate(${pan.x},${pan.y}) scale(${scale})`}>
              {edges.map((e, i) => {
                const s = pos.get(e.source), t = pos.get(e.target);
                if (!s || !t) return null;
                const sel = relatedIds.has(e.source) && relatedIds.has(e.target);
                const c = EDGE_CONFIG[e.relation];
                return <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={sel ? c.color : "#52525b"} strokeWidth={sel ? 1.5 : 0.5} strokeDasharray={c.dash ? "3,3" : undefined} opacity={sel ? 0.8 : 0.2} />;
              })}
              {nodes.map(n => {
                const p = pos.get(n.id);
                if (!p) return null;
                const c = NODE_CONFIG[n.type];
                const sel = selected?.id === n.id;
                const related = !selected || relatedIds.has(n.id);
                return (
                  <g key={n.id} transform={`translate(${p.x},${p.y})`} onClick={() => setSelected(n)} className="cursor-pointer" opacity={related ? 1 : 0.2}>
                    <circle r={c.r} fill={n.color || c.color} stroke={sel ? "#fff" : "none"} strokeWidth={sel ? 1.5 : 0} />
                    <text textAnchor="middle" dominantBaseline="central" fontSize={c.r} className="pointer-events-none select-none">{n.icon || "●"}</text>
                    <text y={c.r + 6} textAnchor="middle" fontSize={7} className="pointer-events-none select-none fill-zinc-700 dark:fill-zinc-300">{n.name.length > 4 ? n.name.slice(0, 4) + ".." : n.name}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="lg:w-72 shrink-0">
          {selected ? (
            <div className="rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xl" style={{ backgroundColor: selected.color || NODE_CONFIG[selected.type].color }}>{selected.icon || "●"}</div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">{selected.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${NODE_CONFIG[selected.type].color}30`, color: NODE_CONFIG[selected.type].color }}>{NODE_CONFIG[selected.type].label}</span>
                </div>
              </div>
              {selected.description && <p className="text-sm text-zinc-600 dark:text-zinc-400">{selected.description}</p>}
              {selected.difficulty && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">难度:</span>
                  <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= selected.difficulty! ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-700"}`} />)}</div>
                </div>
              )}
              {related && (
                <>
                  {[{ items: related.pre, title: "前置知识", cls: "bg-amber-500/10 text-amber-400" }, { items: related.ext, title: "扩展学习", cls: "bg-emerald-500/10 text-emerald-400" }, { items: related.sim, title: "相似概念", cls: "bg-blue-500/10 text-blue-400" }].map(({ items, title, cls }) => items.length > 0 && (
                    <div key={title}>
                      <h4 className="text-xs font-medium text-zinc-500 mb-1">{title}</h4>
                      <div className="flex flex-wrap gap-1">{items.map(n => <button key={n.id} onClick={() => setSelected(n)} className={`px-2 py-0.5 rounded text-xs hover:opacity-80 ${cls}`}>{n.name}</button>)}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className="rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="text-center text-zinc-500 mb-4">
                <span className="text-3xl block mb-2">👆</span>
                <p className="text-sm">点击节点查看详情</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-zinc-500">节点类型</h4>
                {Object.entries(NODE_CONFIG).map(([t, c]) => <div key={t} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} /><span className="text-xs text-zinc-600 dark:text-zinc-400">{c.label}</span></div>)}
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-medium text-zinc-500">关系类型</h4>
                {Object.entries(EDGE_CONFIG).map(([t, c]) => <div key={t} className="flex items-center gap-2"><div className="w-6 h-0.5" style={{ backgroundColor: c.color, backgroundImage: c.dash ? `repeating-linear-gradient(90deg,${c.color},${c.color} 2px,transparent 2px,transparent 4px)` : undefined }} /><span className="text-xs text-zinc-600 dark:text-zinc-400">{c.label}</span></div>)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent border border-purple-200 dark:border-purple-500/20 p-4">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">💡 使用提示</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">点击节点查看详情 · 滚轮缩放 · 拖拽平移 · 筛选器过滤类型</p>
      </div>
    </main>
  );
}
