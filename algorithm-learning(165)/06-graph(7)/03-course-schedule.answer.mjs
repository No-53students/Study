/**
 * 207. 课程表 (Course Schedule) - 参考答案
 */

export function canFinish(numCourses, prerequisites) {
  // 构建邻接表和入度数组
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // BFS（Kahn算法）
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let count = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    count++;

    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return count === numCourses;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("可以完成", () => {
  assert.deepStrictEqual(canFinish(2, [[1,0]]), true);
});

test("存在循环", () => {
  assert.deepStrictEqual(canFinish(2, [[1,0],[0,1]]), false);
});

test("无依赖", () => {
  assert.deepStrictEqual(canFinish(3, []), true);
});
