/**
 * 103. 二叉树的锯齿形层序遍历 (Binary Tree Zigzag Level Order Traversal) - 参考答案
 */

export function zigzagLevelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(zigzagLevelOrder([3,9,20,null,null,15,7]), [[3],[20,9],[15,7]]);
});

test("单节点", () => {
  assert.deepStrictEqual(zigzagLevelOrder([1]), [[1]]);
});

test("空树", () => {
  assert.deepStrictEqual(zigzagLevelOrder([]), []);
});
