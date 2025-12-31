"use client";

import { useState } from "react";
import {
  ArrayVisualizer,
  TwoPointersAnimation,
  LinkedListAnimation,
  TreeAnimation,
  MatrixAnimation,
  type TwoPointersStep,
  type LinkedListStep,
  type TreeStep,
  type MatrixStep,
} from "../components/animations";

// 双指针示例数据：验证回文串
const twoPointersSteps: TwoPointersStep[] = [
  {
    array: ["A", " ", "m", "a", "n"],
    left: 0,
    right: 4,
    description: "初始化：left 指向开头 'A'，right 指向末尾 'n'",
  },
  {
    array: ["A", " ", "m", "a", "n"],
    left: 0,
    right: 4,
    comparing: [0, 4],
    description: "比较 'A' 和 'n'：转小写后 'a' ≠ 'n'？让我们先跳过非字母字符...",
  },
  {
    array: ["A", " ", "m", "a", "n"],
    left: 0,
    right: 4,
    comparing: [0, 4],
    description: "比较 s[0]='A' 和 s[4]='n'：'a'.toLowerCase() vs 'n' → 不相等！",
    highlights: [{ indices: [0, 4], color: "red", label: "不匹配" }],
  },
];

// 链表示例数据：反转链表
const linkedListSteps: LinkedListStep[] = [
  {
    nodes: [
      { value: 1, id: "1" },
      { value: 2, id: "2" },
      { value: 3, id: "3" },
      { value: 4, id: "4" },
      { value: 5, id: "5" },
    ],
    pointers: { "1": ["curr"], "2": [] },
    description: "初始状态：curr 指向头节点 1，prev = null",
  },
  {
    nodes: [
      { value: 1, id: "1" },
      { value: 2, id: "2" },
      { value: 3, id: "3" },
      { value: 4, id: "4" },
      { value: 5, id: "5" },
    ],
    pointers: { "1": ["curr"], "2": ["next"] },
    highlights: [{ nodeIds: ["1"], color: "yellow" }],
    description: "保存 next = curr.next，准备反转",
  },
  {
    nodes: [
      { value: 1, id: "1" },
      { value: 2, id: "2" },
      { value: 3, id: "3" },
      { value: 4, id: "4" },
      { value: 5, id: "5" },
    ],
    pointers: { "1": ["prev"], "2": ["curr"] },
    highlights: [{ nodeIds: ["1"], color: "green" }],
    brokenConnections: [{ from: "1", to: "2" }],
    description: "curr.next = prev（断开 1→2 的连接），然后移动指针",
  },
];

// 二叉树示例数据：中序遍历
const treeSteps: TreeStep[] = [
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: { "4": ["root"] },
    description: "中序遍历：先访问左子树，再访问根，最后访问右子树",
    visitPath: [],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: { "2": ["curr"] },
    highlights: [{ nodeIds: ["2"], color: "yellow" }],
    description: "递归进入左子树，访问节点 2",
    visitPath: [],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: { "1": ["curr"] },
    highlights: [{ nodeIds: ["1"], color: "yellow" }],
    description: "继续递归进入节点 2 的左子树，到达节点 1",
    visitPath: [],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: {},
    description: "节点 1 没有左子节点，访问节点 1！",
    visitPath: ["1"],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: {},
    description: "回到节点 2，访问节点 2！",
    visitPath: ["1", "2"],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: {},
    description: "访问节点 2 的右子节点 3！",
    visitPath: ["1", "2", "3"],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: {},
    description: "完成左子树，回到根节点，访问节点 4！",
    visitPath: ["1", "2", "3", "4"],
  },
  {
    nodes: [
      { value: 4, id: "4" },
      { value: 2, id: "2" },
      { value: 6, id: "6" },
      { value: 1, id: "1" },
      { value: 3, id: "3" },
      { value: 5, id: "5" },
      { value: 7, id: "7" },
    ],
    pointers: {},
    description: "遍历完成！中序遍历结果：1 → 2 → 3 → 4 → 5 → 6 → 7",
    visitPath: ["1", "2", "3", "4", "5", "6", "7"],
  },
];

// 矩阵示例数据：螺旋遍历
const matrixSteps: MatrixStep[] = [
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    description: "螺旋遍历：按顺时针方向从外圈到内圈遍历矩阵",
    path: [],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [0, 0],
    description: "从左上角开始，向右遍历第一行",
    path: [[0, 0]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [0, 1],
    description: "继续向右...",
    path: [[0, 0], [0, 1]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [0, 2],
    description: "到达第一行末尾，准备向下",
    path: [[0, 0], [0, 1], [0, 2]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [1, 2],
    description: "向下遍历最后一列",
    path: [[0, 0], [0, 1], [0, 2], [1, 2]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [2, 2],
    description: "到达右下角，准备向左",
    path: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [2, 1],
    description: "向左遍历最后一行",
    path: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [2, 0],
    description: "到达左下角，准备向上",
    path: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [1, 0],
    description: "向上遍历第一列",
    path: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0]],
  },
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    current: [1, 1],
    description: "进入内圈，访问中心元素 5，遍历完成！",
    path: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [1, 1]],
  },
];

export default function AnimationDemoPage() {
  const [activeDemo, setActiveDemo] = useState<"array" | "two-pointers" | "linked-list" | "tree" | "matrix">("two-pointers");

  const demos = [
    { id: "array" as const, label: "数组可视化" },
    { id: "two-pointers" as const, label: "双指针" },
    { id: "linked-list" as const, label: "链表" },
    { id: "tree" as const, label: "二叉树" },
    { id: "matrix" as const, label: "矩阵" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">算法动画组件演示</h1>
        <p className="text-zinc-400 mb-6">
          基于 Framer Motion 构建的交互式算法可视化组件
        </p>

        {/* Tab 切换 */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeDemo === demo.id
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }`}
            >
              {demo.label}
            </button>
          ))}
        </div>

        {/* 演示区域 */}
        <div className="space-y-6">
          {activeDemo === "array" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">数组可视化组件</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <ArrayVisualizer
                  array={[3, 7, 1, 9, 4, 6, 2]}
                  title="基础数组"
                  showIndices={true}
                />

                <ArrayVisualizer
                  array={[3, 7, 1, 9, 4, 6, 2]}
                  title="带指针的数组"
                  pointers={[
                    { index: 1, label: "left", color: "blue", position: "top" },
                    { index: 5, label: "right", color: "green", position: "top" },
                  ]}
                  comparing={[1, 5]}
                />

                <ArrayVisualizer
                  array={[64, 34, 25, 12, 22, 11, 90]}
                  title="条形图模式（排序）"
                  barMode={true}
                  comparing={[2, 3]}
                  completed={[5, 6]}
                />

                <ArrayVisualizer
                  array={[1, 2, 3, 4, 5, 6, 7]}
                  title="已完成状态"
                  completed={[0, 1, 2, 3, 4, 5, 6]}
                />
              </div>
            </div>
          )}

          {activeDemo === "two-pointers" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">双指针动画</h2>
              <TwoPointersAnimation
                steps={twoPointersSteps}
                title="验证回文串"
                leftLabel="left"
                rightLabel="right"
              />
            </div>
          )}

          {activeDemo === "linked-list" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">链表动画</h2>
              <LinkedListAnimation
                steps={linkedListSteps}
                title="反转链表"
              />
            </div>
          )}

          {activeDemo === "tree" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">二叉树动画</h2>
              <TreeAnimation
                steps={treeSteps}
                title="中序遍历"
              />
            </div>
          )}

          {activeDemo === "matrix" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">矩阵动画</h2>
              <MatrixAnimation
                steps={matrixSteps}
                title="螺旋遍历"
              />
            </div>
          )}
        </div>

        {/* 使用说明 */}
        <div className="mt-8 p-4 rounded-lg bg-zinc-900 border border-zinc-800">
          <h3 className="font-semibold mb-2">使用说明</h3>
          <ul className="text-sm text-zinc-400 space-y-1">
            <li>• 点击播放按钮自动播放动画</li>
            <li>• 使用左右箭头手动控制步骤</li>
            <li>• 拖动速度滑块调整播放速度</li>
            <li>• 点击重置按钮回到初始状态</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
