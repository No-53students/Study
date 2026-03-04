/**
 * 104. 二叉树的最大深度 (Maximum Depth of Binary Tree) - 参考答案
 */

export function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(maxDepth([3,9,20,null,null,15,7]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(maxDepth([1,null,2]), 2);
});

test("空树", () => {
  assert.deepStrictEqual(maxDepth(null), 0);
});

test("单节点", () => {
  assert.deepStrictEqual(maxDepth([1]), 1);
});
