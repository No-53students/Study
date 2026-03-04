/**
 * 100. 相同的树 (Same Tree) - 参考答案
 */

export function isSameTree(p, q) {
  // 都为空
  if (p === null && q === null) return true;
  // 其中一个为空
  if (p === null || q === null) return false;
  // 值不相等
  if (p.val !== q.val) return false;

  // 递归比较左右子树
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("相同的树", () => {
  assert.deepStrictEqual(isSameTree([1,2,3], [1,2,3]), true);
});

test("结构不同", () => {
  assert.deepStrictEqual(isSameTree([1,2], [1,null,2]), false);
});

test("值不同", () => {
  assert.deepStrictEqual(isSameTree([1,2,1], [1,1,2]), false);
});

test("都为空", () => {
  assert.deepStrictEqual(isSameTree(null, null), true);
});
