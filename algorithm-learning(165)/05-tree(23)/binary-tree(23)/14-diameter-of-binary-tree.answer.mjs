/**
 * 543. 二叉树的直径 (Diameter of Binary Tree) - 参考答案
 */

export function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  const depth = (node) => {
    if (node === null) return 0;

    const leftDepth = depth(node.left);
    const rightDepth = depth(node.right);

    // 更新最大直径（经过当前节点的路径长度）
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

    // 返回当前节点的深度
    return Math.max(leftDepth, rightDepth) + 1;
  };

  depth(root);
  return maxDiameter;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(diameterOfBinaryTree([1,2,3,4,5]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(diameterOfBinaryTree([1,2]), 1);
});

test("单节点", () => {
  assert.deepStrictEqual(diameterOfBinaryTree([1]), 0);
});
