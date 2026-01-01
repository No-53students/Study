"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KnowledgeGraph, KnowledgeNode, KnowledgeEdge, EdgeRelationType } from "../../types";

interface KnowledgeGraphViewerProps {
  graph: KnowledgeGraph;
  onNodeClick?: (node: KnowledgeNode) => void;
  selectedNodeId?: string;
  className?: string;
}

const nodeTypeConfig = {
  concept: {
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/20",
    border: "border-blue-500/50",
    icon: "💡",
  },
  technique: {
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/20",
    border: "border-purple-500/50",
    icon: "🔧",
  },
  pattern: {
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-500/20",
    border: "border-green-500/50",
    icon: "📋",
  },
  problem: {
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/20",
    border: "border-orange-500/50",
    icon: "📝",
  },
  category: {
    color: "from-zinc-500 to-zinc-400",
    bg: "bg-zinc-500/20",
    border: "border-zinc-500/50",
    icon: "📁",
  },
};

const relationConfig: Record<EdgeRelationType, { label: string; color: string; style: string }> = {
  prerequisite: { label: "前置", color: "text-red-400", style: "stroke-red-500" },
  extends: { label: "进阶", color: "text-blue-400", style: "stroke-blue-500" },
  similar: { label: "相似", color: "text-green-400", style: "stroke-green-500" },
  applies: { label: "应用", color: "text-purple-400", style: "stroke-purple-500" },
  contains: { label: "包含", color: "text-cyan-400", style: "stroke-cyan-500" },
  variant: { label: "变体", color: "text-amber-400", style: "stroke-amber-500" },
};

const statusConfig = {
  locked: { bg: "bg-zinc-800", opacity: "opacity-50", icon: "🔒" },
  available: { bg: "bg-zinc-700", opacity: "opacity-100", icon: "📖" },
  "in-progress": { bg: "bg-yellow-900/30", opacity: "opacity-100", icon: "📝" },
  mastered: { bg: "bg-green-900/30", opacity: "opacity-100", icon: "✅" },
};

export function KnowledgeGraphViewer({
  graph,
  onNodeClick,
  selectedNodeId,
  className = "",
}: KnowledgeGraphViewerProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [showRelations, setShowRelations] = useState(true);

  // 过滤节点
  const filteredNodes = useMemo(() => {
    if (filterType === "all") return graph.nodes;
    return graph.nodes.filter(n => n.type === filterType);
  }, [graph.nodes, filterType]);

  // 获取与选中/悬停节点相关的边
  const activeNodeId = selectedNodeId || hoveredNodeId;
  const relatedEdges = useMemo(() => {
    if (!activeNodeId) return [];
    return graph.edges.filter(e => e.source === activeNodeId || e.target === activeNodeId);
  }, [graph.edges, activeNodeId]);

  // 获取相关节点ID
  const relatedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    relatedEdges.forEach(e => {
      ids.add(e.source);
      ids.add(e.target);
    });
    return ids;
  }, [relatedEdges]);

  // 计算节点位置（简单网格布局）
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const cols = Math.ceil(Math.sqrt(filteredNodes.length));

    filteredNodes.forEach((node, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      positions[node.id] = {
        x: 60 + col * 160,
        y: 60 + row * 120,
      };
    });

    return positions;
  }, [filteredNodes]);

  const svgWidth = 800;
  const svgHeight = 600;

  return (
    <div className={`rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden ${className}`}>
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
          <span>🗺️</span>
          知识图谱
        </h3>
        <div className="flex items-center gap-3">
          {/* 类型过滤 */}
          <div className="flex gap-1">
            <button
              onClick={() => setFilterType("all")}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                filterType === "all" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              全部
            </button>
            {Object.entries(nodeTypeConfig).map(([type, config]) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  filterType === type ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {config.icon}
              </button>
            ))}
          </div>
          {/* 显示关系切换 */}
          <button
            onClick={() => setShowRelations(!showRelations)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              showRelations ? "bg-blue-600 text-white" : "bg-zinc-700 text-zinc-400"
            }`}
          >
            {showRelations ? "隐藏连线" : "显示连线"}
          </button>
        </div>
      </div>

      {/* 图谱主体 */}
      <div className="relative overflow-auto" style={{ height: "500px" }}>
        <svg
          width={svgWidth}
          height={svgHeight}
          className="absolute inset-0"
        >
          {/* 边 */}
          {showRelations && graph.edges.map((edge, idx) => {
            const sourcePos = nodePositions[edge.source];
            const targetPos = nodePositions[edge.target];
            if (!sourcePos || !targetPos) return null;

            const isRelated = activeNodeId && (edge.source === activeNodeId || edge.target === activeNodeId);
            const config = relationConfig[edge.relation];

            return (
              <motion.g key={`edge-${idx}`}>
                <motion.line
                  x1={sourcePos.x + 60}
                  y1={sourcePos.y + 25}
                  x2={targetPos.x + 60}
                  y2={targetPos.y + 25}
                  className={config.style}
                  strokeWidth={isRelated ? 2 : 1}
                  strokeOpacity={isRelated ? 0.8 : 0.2}
                  strokeDasharray={edge.relation === "similar" ? "4,4" : ""}
                  animate={{
                    strokeOpacity: isRelated ? 0.8 : 0.2,
                  }}
                />
                {/* 关系标签 */}
                {isRelated && (
                  <motion.text
                    x={(sourcePos.x + targetPos.x) / 2 + 60}
                    y={(sourcePos.y + targetPos.y) / 2 + 25}
                    className={`text-xs fill-current ${config.color}`}
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {config.label}
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* 节点 */}
        <AnimatePresence>
          {filteredNodes.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const typeConfig = nodeTypeConfig[node.type];
            const status = statusConfig[node.status || "available"];
            const isSelected = node.id === selectedNodeId;
            const isHovered = node.id === hoveredNodeId;
            const isRelated = activeNodeId ? relatedNodeIds.has(node.id) : true;

            return (
              <motion.div
                key={node.id}
                className={`absolute cursor-pointer transition-all ${status.opacity}`}
                style={{ left: pos.x, top: pos.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isRelated || !activeNodeId ? 1 : 0.3,
                  scale: isSelected || isHovered ? 1.05 : 1,
                }}
                whileHover={{ scale: 1.08 }}
                onClick={() => onNodeClick?.(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                <div
                  className={`w-28 p-2 rounded-lg border-2 transition-all ${typeConfig.bg} ${
                    isSelected ? "border-white" : typeConfig.border
                  } ${isHovered ? "shadow-lg" : ""}`}
                >
                  {/* 节点头部 */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm">{node.icon || typeConfig.icon}</span>
                    <span className="text-[10px] text-zinc-500">{status.icon}</span>
                  </div>
                  {/* 节点名称 */}
                  <div className="text-xs font-medium text-white truncate">
                    {node.name}
                  </div>
                  {/* 难度指示 */}
                  {node.difficulty && (
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-1.5 h-1.5 rounded-full ${
                            level <= node.difficulty! ? "bg-yellow-400" : "bg-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 节点详情面板 */}
      {selectedNodeId && (
        <div className="border-t border-zinc-700 p-4">
          {(() => {
            const node = graph.nodes.find(n => n.id === selectedNodeId);
            if (!node) return null;

            const typeConfig = nodeTypeConfig[node.type];
            const incomingEdges = graph.edges.filter(e => e.target === node.id);
            const outgoingEdges = graph.edges.filter(e => e.source === node.id);

            return (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{node.icon || typeConfig.icon}</span>
                  <span className="font-semibold text-white">{node.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${typeConfig.bg} ${typeConfig.border} border`}>
                    {node.type}
                  </span>
                </div>

                {node.description && (
                  <p className="text-sm text-zinc-400">{node.description}</p>
                )}

                {/* 关联信息 */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {incomingEdges.length > 0 && (
                    <div>
                      <div className="text-zinc-500 mb-1">前置知识</div>
                      <div className="space-y-1">
                        {incomingEdges.map((edge, idx) => {
                          const sourceNode = graph.nodes.find(n => n.id === edge.source);
                          const config = relationConfig[edge.relation];
                          return (
                            <div key={idx} className="flex items-center gap-1">
                              <span className={`${config.color}`}>{config.label}</span>
                              <span className="text-zinc-300">{sourceNode?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {outgoingEdges.length > 0 && (
                    <div>
                      <div className="text-zinc-500 mb-1">可学习</div>
                      <div className="space-y-1">
                        {outgoingEdges.map((edge, idx) => {
                          const targetNode = graph.nodes.find(n => n.id === edge.target);
                          const config = relationConfig[edge.relation];
                          return (
                            <div key={idx} className="flex items-center gap-1">
                              <span className={`${config.color}`}>{config.label}</span>
                              <span className="text-zinc-300">{targetNode?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 图例 */}
      <div className="px-4 py-2 border-t border-zinc-700 flex flex-wrap gap-3 text-xs">
        <span className="text-zinc-500">节点类型:</span>
        {Object.entries(nodeTypeConfig).map(([type, config]) => (
          <div key={type} className="flex items-center gap-1">
            <span>{config.icon}</span>
            <span className="text-zinc-400">
              {type === "concept" ? "概念" : type === "technique" ? "技巧" : type === "pattern" ? "模板" : type === "problem" ? "题目" : "分类"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
