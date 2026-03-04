/**
 * 101. 对称二叉树 (Symmetric Tree) - 参考答案
 */

export function isSymmetric(root) {
  if (root === null) return true;

  const isMirror = (left, right) => {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    if (left.val !== right.val) return false;

    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  return isMirror(root.left, root.right);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("对称树", () => {
  assert.deepStrictEqual(isSymmetric([1,2,2,3,4,4,3]), true);
});

test("非对称树", () => {
  assert.deepStrictEqual(isSymmetric([1,2,2,null,3,null,3]), false);
});

test("单节点", () => {
  assert.deepStrictEqual(isSymmetric([1]), true);
});
