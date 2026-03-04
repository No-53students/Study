/**
 * 210. 课程表 II (Course Schedule II) - 参考答案
 */

export function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const course = queue.shift();
    result.push(course);

    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result.length === numCourses ? result : [];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(findOrder(2, [[1,0]]), [0,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]), [0,1,2,3]);
});

test("无先修课", () => {
  assert.deepStrictEqual(findOrder(1, []), [0]);
});
