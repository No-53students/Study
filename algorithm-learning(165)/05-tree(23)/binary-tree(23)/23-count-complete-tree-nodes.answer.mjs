/**
 * 222. 完全二叉树的节点个数 (Count Complete Tree Nodes) - 参考答案
 */

export function countNodes(root) {
  if (root === null) return 0;

  let leftDepth = 0, rightDepth = 0;
  let left = root, right = root;

  while (left !== null) {
    leftDepth++;
    left = left.left;
  }

  while (right !== null) {
    rightDepth++;
    right = right.right;
  }

  // 如果左右深度相等，是满二叉树
  if (leftDepth === rightDepth) {
    return Math.pow(2, leftDepth) - 1;
  }

  // 否则递归计算
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(countNodes([1,2,3,4,5,6]), 6);
});

test("空树", () => {
  assert.deepStrictEqual(countNodes([]), 0);
});

test("单节点", () => {
  assert.deepStrictEqual(countNodes([1]), 1);
});
