/**
 * 112. 路径总和 (Path Sum) - 参考答案
 */

export function hasPathSum(root, targetSum) {
  if (root === null) return false;

  // 到达叶子节点，检查剩余值是否等于当前节点值
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  // 递归检查左右子树
  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("存在路径", () => {
  assert.deepStrictEqual(hasPathSum([5,4,8,11,null,13,4,7,2,null,null,null,1], 22), true);
});

test("不存在路径", () => {
  assert.deepStrictEqual(hasPathSum([1,2,3], 5), false);
});

test("空树", () => {
  assert.deepStrictEqual(hasPathSum(null, 0), false);
});
