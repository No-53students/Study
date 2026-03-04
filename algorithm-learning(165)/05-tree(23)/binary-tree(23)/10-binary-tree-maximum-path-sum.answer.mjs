/**
 * 124. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum) - 参考答案
 */

export function maxPathSum(root) {
  let maxSum = -Infinity;

  const maxGain = (node) => {
    if (node === null) return 0;

    // 递归计算左右子树的最大贡献值（负数贡献为0）
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    // 经过当前节点的最大路径和
    const pathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathSum);

    // 返回当前节点的最大贡献值（只能选一边）
    return node.val + Math.max(leftGain, rightGain);
  };

  maxGain(root);
  return maxSum;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(maxPathSum([1,2,3]), 6);
});

test("示例2", () => {
  assert.deepStrictEqual(maxPathSum([-10,9,20,null,null,15,7]), 42);
});

test("单节点负数", () => {
  assert.deepStrictEqual(maxPathSum([-3]), -3);
});
