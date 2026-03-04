/**
 * 199. 二叉树的右视图 (Binary Tree Right Side View) - 参考答案
 */

export function rightSideView(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // 每层最后一个节点
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(rightSideView([1,2,3,null,5,null,4]), [1,3,4]);
});

test("示例2", () => {
  assert.deepStrictEqual(rightSideView([1,null,3]), [1,3]);
});

test("空树", () => {
  assert.deepStrictEqual(rightSideView(null), []);
});
