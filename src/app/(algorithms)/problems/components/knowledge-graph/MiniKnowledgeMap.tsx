"use client";

import { motion } from "framer-motion";
import { KnowledgeNode, KnowledgeEdge, EdgeRelationType } from "../../types";

interface MiniKnowledgeMapProps {
  centerNode: KnowledgeNode;
  relatedNodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  onNodeClick?: (node: KnowledgeNode) => void;
  className?: string;
}

const relationConfig: Record<EdgeRelationType, { label: string; color: string; lineColor: string }> = {
  prerequisite: { label: "前置", color: "text-red-400 bg-red-500/20 border-red-500/30", lineColor: "#ef4444" },
  extends: { label: "进阶", color: "text-blue-400 bg-blue-500/20 border-blue-500/30", lineColor: "#3b82f6" },
  similar: { label: "相似", color: "text-green-400 bg-green-500/20 border-green-500/30", lineColor: "#22c55e" },
  applies: { label: "应用", color: "text-purple-400 bg-purple-500/20 border-purple-500/30", lineColor: "#a855f7" },
  contains: { label: "包含", color: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30", lineColor: "#06b6d4" },
  variant: { label: "变体", color: "text-amber-400 bg-amber-500/20 border-amber-500/30", lineColor: "#f59e0b" },
};

const nodeTypeIcons = {
  concept: "💡",
  technique: "🔧",
  pattern: "📋",
  problem: "📝",
  category: "📁",
};

export function MiniKnowledgeMap({
  centerNode,
  relatedNodes,
  edges,
  onNodeClick,
  className = "",
}: MiniKnowledgeMapProps) {
  // 计算节点位置（圆形布局）
  const centerX = 150;
  const centerY = 100;
  const radius = 80;

  const nodePositions = relatedNodes.map((_, index) => {
    const angle = (index * 2 * Math.PI) / relatedNodes.length - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <div className={`rounded-xl border border-zinc-700 bg-zinc-900/50 overflow-hidden ${className}`}>
      {/* 头部 */}
      <div className="px-4 py-2 border-b border-zinc-700/50 flex items-center justify-between">
        <h4 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <span>🔗</span>
          知识关联
        </h4>
        <span className="text-xs text-zinc-500">{relatedNodes.length} 个相关概念</span>
      </div>

      {/* 图谱区域 */}
      <div className="relative" style={{ height: "200px" }}>
        <svg
          width="300"
          height="200"
          className="absolute inset-0"
        >
          {/* 绘制连线 */}
          {edges.map((edge, idx) => {
            const isOutgoing = edge.source === centerNode.id;
            const relatedNodeId = isOutgoing ? edge.target : edge.source;
            const relatedIndex = relatedNodes.findIndex(n => n.id === relatedNodeId);

            if (relatedIndex === -1) return null;

            const endPos = nodePositions[relatedIndex];
            const config = relationConfig[edge.relation];

            return (
              <motion.line
                key={`edge-${idx}`}
                x1={centerX}
                y1={centerY}
                x2={endPos.x}
                y2={endPos.y}
                stroke={config.lineColor}
                strokeWidth={2}
                strokeOpacity={0.4}
                strokeDasharray={edge.relation === "similar" ? "4,4" : ""}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              />
            );
          })}
        </svg>

        {/* 中心节点 */}
        <motion.div
          className="absolute cursor-pointer"
          style={{
            left: centerX - 40,
            top: centerY - 25,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-20 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-white/30 shadow-lg text-center">
            <div className="text-lg mb-0.5">
              {centerNode.icon || nodeTypeIcons[centerNode.type]}
            </div>
            <div className="text-[10px] font-medium text-white truncate">
              {centerNode.name}
            </div>
          </div>
        </motion.div>

        {/* 相关节点 */}
        {relatedNodes.map((node, index) => {
          const pos = nodePositions[index];
          const edge = edges.find(e => e.source === node.id || e.target === node.id);
          const relationStyle = edge ? relationConfig[edge.relation].color : "";

          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: pos.x - 35,
                top: pos.y - 20,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3 + index * 0.08 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onNodeClick?.(node)}
            >
              <div className={`w-[70px] p-1.5 rounded-lg border transition-all ${relationStyle || "bg-zinc-800 border-zinc-700"}`}>
                <div className="text-xs text-center">
                  {node.icon || nodeTypeIcons[node.type]}
                </div>
                <div className="text-[9px] font-medium text-zinc-200 truncate text-center">
                  {node.name}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 图例 */}
      <div className="px-3 py-2 border-t border-zinc-700/50 flex flex-wrap gap-2 text-[10px]">
        {Object.entries(relationConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: config.lineColor }}
            />
            <span className="text-zinc-500">{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
