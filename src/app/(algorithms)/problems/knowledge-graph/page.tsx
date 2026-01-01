"use client";

import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { algorithmKnowledgeGraph } from "../data/knowledge-graph";
import { KnowledgeNode, KnowledgeEdge } from "../types";

// 使用导入的知识图谱
const knowledgeGraph = algorithmKnowledgeGraph;

// 节点类型配置
const NODE_TYPE_CONFIG = {
  category: { color: "#3b82f6", label: "分类", size: 60 },
  concept: { color: "#22c55e", label: "概念", size: 45 },
  technique: { color: "#f59e0b", label: "技巧", size: 40 },
  pattern: { color: "#a855f7", label: "模式", size: 45 },
  problem: { color: "#ef4444", label: "题目", size: 35 },
};

// 关系类型配置
const EDGE_TYPE_CONFIG = {
  prerequisite: { color: "#f59e0b", label: "前置知识", dash: false },
  extends: { color: "#22c55e", label: "扩展", dash: false },
  similar: { color: "#3b82f6", label: "相似", dash: true },
  applies: { color: "#a855f7", label: "应用", dash: true },
  contains: { color: "#6b7280", label: "包含", dash: false },
  variant: { color: "#ec4899", label: "变体", dash: true },
};

// 简化的力导向布局
function useForceLayout(
  nodes: KnowledgeNode[],
  edges: KnowledgeEdge[],
  width: number,
  height: number
) {
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    if (nodes.length === 0) return;

    // 初始化位置：按类型分层
    const newPositions = new Map<string, { x: number; y: number }>();
    const typeGroups: Record<string, KnowledgeNode[]> = {};

    nodes.forEach(node => {
      if (!typeGroups[node.type]) typeGroups[node.type] = [];
      typeGroups[node.type].push(node);
    });

    const types = Object.keys(typeGroups);
    const layerHeight = height / (types.length + 1);

    types.forEach((type, layerIndex) => {
      const nodesInLayer = typeGroups[type];
      const layerWidth = width / (nodesInLayer.length + 1);

      nodesInLayer.forEach((node, nodeIndex) => {
        newPositions.set(node.id, {
          x: layerWidth * (nodeIndex + 1) + (Math.random() - 0.5) * 30,
          y: layerHeight * (layerIndex + 1) + (Math.random() - 0.5) * 30,
        });
      });
    });

    // 简单的力迭代
    for (let i = 0; i < 50; i++) {
      nodes.forEach(node => {
        const pos = newPositions.get(node.id)!;
        let fx = 0, fy = 0;

        // 节点间斥力
        nodes.forEach(other => {
          if (other.id === node.id) return;
          const otherPos = newPositions.get(other.id)!;
          const dx = pos.x - otherPos.x;
          const dy = pos.y - otherPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 2000 / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        });

        // 边的引力
        edges.forEach(edge => {
          let otherId: string | null = null;
          if (edge.source === node.id) otherId = edge.target;
          if (edge.target === node.id) otherId = edge.source;
          if (!otherId) return;

          const otherPos = newPositions.get(otherId);
          if (!otherPos) return;

          const dx = otherPos.x - pos.x;
          const dy = otherPos.y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = dist * 0.01;
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        });

        // 边界约束
        const padding = 80;
        if (pos.x < padding) fx += 5;
        if (pos.x > width - padding) fx -= 5;
        if (pos.y < padding) fy += 5;
        if (pos.y > height - padding) fy -= 5;

        newPositions.set(node.id, {
          x: pos.x + fx * 0.1,
          y: pos.y + fy * 0.1,
        });
      });
    }

    setPositions(newPositions);
  }, [nodes, edges, width, height]);

  return positions;
}

interface GraphNodeProps {
  node: KnowledgeNode;
  x: number;
  y: number;
  selected: boolean;
  onSelect: (node: KnowledgeNode) => void;
}

function GraphNode({ node, x, y, selected, onSelect }: GraphNodeProps) {
  const config = NODE_TYPE_CONFIG[node.type];
  const size = config.size;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => onSelect(node)}
      className="cursor-pointer"
    >
      {/* 选中光晕 */}
      {selected && (
        <circle
          r={size / 2 + 10}
          fill="none"
          stroke={node.color || config.color}
          strokeWidth={3}
          opacity={0.5}
          className="animate-pulse"
        />
      )}

      {/* 节点圆形 */}
      <circle
        r={size / 2}
        fill={node.color || config.color}
        opacity={0.9}
        className="transition-all hover:opacity-100"
      />

      {/* 图标 */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.4}
        className="pointer-events-none select-none"
      >
        {node.icon || "●"}
      </text>

      {/* 名称 */}
      <text
        y={size / 2 + 14}
        textAnchor="middle"
        fontSize={10}
        fill="#e4e4e7"
        className="pointer-events-none select-none"
      >
        {node.name.length > 8 ? node.name.slice(0, 8) + "..." : node.name}
      </text>
    </g>
  );
}

interface GraphEdgeProps {
  edge: KnowledgeEdge;
  sourcePos: { x: number; y: number };
  targetPos: { x: number; y: number };
  selected: boolean;
}

function GraphEdge({ edge, sourcePos, targetPos, selected }: GraphEdgeProps) {
  const config = EDGE_TYPE_CONFIG[edge.relation];

  return (
    <line
      x1={sourcePos.x}
      y1={sourcePos.y}
      x2={targetPos.x}
      y2={targetPos.y}
      stroke={selected ? config.color : "#52525b"}
      strokeWidth={selected ? 2 : 1}
      strokeDasharray={config.dash ? "4,4" : undefined}
      opacity={selected ? 0.8 : 0.3}
      className="transition-all"
    />
  );
}

export default function KnowledgeGraphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  // 响应式尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(500, window.innerHeight - 200),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 过滤节点
  const filteredNodes = useMemo(() => {
    if (!filterType) return knowledgeGraph.nodes;
    return knowledgeGraph.nodes.filter((n: KnowledgeNode) => n.type === filterType);
  }, [filterType]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n: KnowledgeNode) => n.id)), [filteredNodes]);

  // 过滤边
  const filteredEdges = useMemo(() => {
    return knowledgeGraph.edges.filter(
      (e: KnowledgeEdge) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
    );
  }, [filteredNodeIds]);

  // 力导向布局
  const positions = useForceLayout(
    filteredNodes,
    filteredEdges,
    dimensions.width,
    dimensions.height
  );

  // 选中节点的相关边
  const selectedEdges = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    const related = new Set<string>();
    knowledgeGraph.edges.forEach((e: KnowledgeEdge) => {
      if (e.source === selectedNode.id || e.target === selectedNode.id) {
        related.add(e.source);
        related.add(e.target);
      }
    });
    return related;
  }, [selectedNode]);

  // 获取关联节点信息
  const relatedInfo = useMemo(() => {
    if (!selectedNode) return null;

    const prerequisites = knowledgeGraph.edges
      .filter((e: KnowledgeEdge) => e.target === selectedNode.id && e.relation === "prerequisite")
      .map((e: KnowledgeEdge) => knowledgeGraph.nodes.find((n: KnowledgeNode) => n.id === e.source))
      .filter(Boolean) as KnowledgeNode[];

    const extends_ = knowledgeGraph.edges
      .filter((e: KnowledgeEdge) => e.source === selectedNode.id && e.relation === "extends")
      .map((e: KnowledgeEdge) => knowledgeGraph.nodes.find((n: KnowledgeNode) => n.id === e.target))
      .filter(Boolean) as KnowledgeNode[];

    const similar = knowledgeGraph.edges
      .filter((e: KnowledgeEdge) => (e.source === selectedNode.id || e.target === selectedNode.id) && e.relation === "similar")
      .map((e: KnowledgeEdge) => {
        const otherId = e.source === selectedNode.id ? e.target : e.source;
        return knowledgeGraph.nodes.find((n: KnowledgeNode) => n.id === otherId);
      })
      .filter(Boolean) as KnowledgeNode[];

    return { prerequisites, extends: extends_, similar };
  }, [selectedNode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/problems"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">题库</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white text-lg shadow-lg shadow-purple-500/20">
                🕸️
              </div>
              <h1 className="text-base sm:text-lg font-bold">知识图谱</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-6">
        {/* 筛选器 */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-400">筛选:</span>
          <button
            onClick={() => setFilterType(null)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              filterType === null
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            全部
          </button>
          {Object.entries(NODE_TYPE_CONFIG).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filterType === type
                  ? "text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
              style={{
                backgroundColor: filterType === type ? config.color : undefined,
              }}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* 图谱容器 */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* 图谱 SVG */}
          <div
            ref={containerRef}
            className="flex-1 rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden"
          >
            <svg
              width={dimensions.width}
              height={dimensions.height}
              className="select-none"
            >
              {/* 边 */}
              {filteredEdges.map((edge: KnowledgeEdge, i: number) => {
                const sourcePos = positions.get(edge.source);
                const targetPos = positions.get(edge.target);
                if (!sourcePos || !targetPos) return null;

                const isSelected = selectedEdges.has(edge.source) && selectedEdges.has(edge.target);

                return (
                  <GraphEdge
                    key={`edge-${i}`}
                    edge={edge}
                    sourcePos={sourcePos}
                    targetPos={targetPos}
                    selected={isSelected}
                  />
                );
              })}

              {/* 节点 */}
              {filteredNodes.map((node: KnowledgeNode) => {
                const pos = positions.get(node.id);
                if (!pos) return null;

                return (
                  <GraphNode
                    key={node.id}
                    node={node}
                    x={pos.x}
                    y={pos.y}
                    selected={selectedNode?.id === node.id}
                    onSelect={setSelectedNode}
                  />
                );
              })}
            </svg>
          </div>

          {/* 侧边栏信息 */}
          <div className="lg:w-80 shrink-0">
            {selectedNode ? (
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
                    style={{ backgroundColor: selectedNode.color || NODE_TYPE_CONFIG[selectedNode.type].color }}
                  >
                    {selectedNode.icon || "●"}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{selectedNode.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${NODE_TYPE_CONFIG[selectedNode.type].color}30`,
                        color: NODE_TYPE_CONFIG[selectedNode.type].color,
                      }}
                    >
                      {NODE_TYPE_CONFIG[selectedNode.type].label}
                    </span>
                  </div>
                </div>

                {selectedNode.description && (
                  <p className="text-sm text-zinc-400">{selectedNode.description}</p>
                )}

                {selectedNode.difficulty && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">难度:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i <= selectedNode.difficulty!
                              ? "bg-amber-500"
                              : "bg-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {relatedInfo && (
                  <>
                    {relatedInfo.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-zinc-500 mb-2">前置知识</h4>
                        <div className="flex flex-wrap gap-1">
                          {relatedInfo.prerequisites.map((n: KnowledgeNode) => (
                            <button
                              key={n!.id}
                              onClick={() => setSelectedNode(n!)}
                              className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 text-xs hover:bg-amber-500/20 transition-colors"
                            >
                              {n!.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {relatedInfo.extends.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-zinc-500 mb-2">扩展学习</h4>
                        <div className="flex flex-wrap gap-1">
                          {relatedInfo.extends.map((n: KnowledgeNode) => (
                            <button
                              key={n!.id}
                              onClick={() => setSelectedNode(n!)}
                              className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs hover:bg-emerald-500/20 transition-colors"
                            >
                              {n!.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {relatedInfo.similar.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-zinc-500 mb-2">相似概念</h4>
                        <div className="flex flex-wrap gap-1">
                          {relatedInfo.similar.map((n: KnowledgeNode) => (
                            <button
                              key={n!.id}
                              onClick={() => setSelectedNode(n!)}
                              className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors"
                            >
                              {n!.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedNode.tags && selectedNode.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                <div className="text-center text-zinc-500">
                  <span className="text-4xl mb-3 block">👆</span>
                  <p className="text-sm">点击节点查看详情</p>
                </div>

                {/* 图例 */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-medium text-zinc-400">节点类型</h4>
                  {Object.entries(NODE_TYPE_CONFIG).map(([type, config]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: config.color }}
                      />
                      <span className="text-xs text-zinc-400">{config.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-medium text-zinc-400">关系类型</h4>
                  {Object.entries(EDGE_TYPE_CONFIG).map(([type, config]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div
                        className="w-8 h-0.5"
                        style={{
                          backgroundColor: config.color,
                          backgroundImage: config.dash
                            ? `repeating-linear-gradient(90deg, ${config.color}, ${config.color} 3px, transparent 3px, transparent 6px)`
                            : undefined,
                        }}
                      />
                      <span className="text-xs text-zinc-400">{config.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent border border-purple-500/20 p-4">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <span>💡</span>
            如何使用知识图谱
          </h3>
          <ul className="text-sm text-zinc-400 space-y-1">
            <li>• 点击节点查看详细信息和关联知识点</li>
            <li>• 使用筛选器按类型过滤节点</li>
            <li>• 通过前置知识和扩展学习规划学习路径</li>
            <li>• 相似概念帮助你触类旁通</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
