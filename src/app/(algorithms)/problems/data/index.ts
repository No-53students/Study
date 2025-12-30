import { Problem } from "../types";
import { arrayStringProblems } from "./array-string";
import { twoPointersProblems } from "./two-pointers";
import { slidingWindowProblems } from "./sliding-window";
import { hashTableProblems } from "./hash-table";
import { stackProblems } from "./stack";
import { linkedListProblems } from "./linked-list";
import { intervalProblems } from "./interval";
import { matrixProblems } from "./matrix";
import { binaryTreeProblems } from "./binary-tree";
import { graphProblems } from "./graph";
import { backtrackingProblems } from "./backtracking";
import { binarySearchProblems } from "./binary-search";
import { heapProblems } from "./heap";
import { dp1dProblems } from "./dp-1d";
import { dpMultidimensionalProblems } from "./dp-multidimensional";
import { bitManipulationProblems } from "./bit-manipulation";
import { mathProblems } from "./math";

// 所有题目
export const allProblems: Problem[] = [
  ...arrayStringProblems,
  ...twoPointersProblems,
  ...slidingWindowProblems,
  ...hashTableProblems,
  ...stackProblems,
  ...linkedListProblems,
  ...intervalProblems,
  ...matrixProblems,
  ...binaryTreeProblems,
  ...graphProblems,
  ...backtrackingProblems,
  ...binarySearchProblems,
  ...heapProblems,
  ...dp1dProblems,
  ...dpMultidimensionalProblems,
  ...bitManipulationProblems,
  ...mathProblems,
  // 后续添加更多分类的题目
];

// 按分类获取题目
export function getProblemsByCategory(category: string): Problem[] {
  return allProblems.filter((p) => p.category === category);
}

// 按ID获取题目
export function getProblemById(id: string): Problem | undefined {
  return allProblems.find((p) => p.id === id);
}

// 获取所有题目ID
export function getAllProblemIds(): string[] {
  return allProblems.map((p) => p.id);
}

// 按难度统计
export function getStatsByDifficulty() {
  const stats = { easy: 0, medium: 0, hard: 0 };
  allProblems.forEach((p) => stats[p.difficulty]++);
  return stats;
}

// 按分类统计
export function getStatsByCategory() {
  const stats: Record<string, number> = {};
  allProblems.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  return stats;
}

export { arrayStringProblems, twoPointersProblems, slidingWindowProblems, hashTableProblems, stackProblems, linkedListProblems, intervalProblems, matrixProblems, binaryTreeProblems, graphProblems, backtrackingProblems, binarySearchProblems, heapProblems, dp1dProblems, dpMultidimensionalProblems, bitManipulationProblems, mathProblems };
