/**
 * 226. 翻转二叉树 (Invert Binary Tree) - 参考答案
 */

export function invertTree(root) {
  if (root === null) return null;

  // 交换左右子树
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // 递归翻转子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(invertTree([4,2,7,1,3,6,9]), [4,7,2,9,6,3,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(invertTree([2,1,3]), [2,3,1]);
});

test("空树", () => {
  assert.deepStrictEqual(invertTree(null), null);
});

test("单节点", () => {
  assert.deepStrictEqual(invertTree([1]), [1]);
});
