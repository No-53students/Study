/**
 * 102. 二叉树的层序遍历 (Binary Tree Level Order Traversal) - 参考答案
 */

export function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(levelOrder([3,9,20,null,null,15,7]), [[3],[9,20],[15,7]]);
});

test("单节点", () => {
  assert.deepStrictEqual(levelOrder([1]), [[1]]);
});

test("空树", () => {
  assert.deepStrictEqual(levelOrder(null), []);
});
