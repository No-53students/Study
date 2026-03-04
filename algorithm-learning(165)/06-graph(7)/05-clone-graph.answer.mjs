/**
 * 133. 克隆图 (Clone Graph) - 参考答案
 */

export function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map();

  const dfs = (node) => {
    if (visited.has(node)) {
      return visited.get(node);
    }

    const clone = new Node(node.val);
    visited.set(node, clone);

    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  };

  return dfs(node);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(cloneGraph([[2,4],[1,3],[2,4],[1,3]]), [[2,4],[1,3],[2,4],[1,3]]);
});

test("单节点", () => {
  assert.deepStrictEqual(cloneGraph([[]]), [[]]);
});
