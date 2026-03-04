/**
 * 114. 二叉树展开为链表 (Flatten Binary Tree to Linked List) - 参考答案
 */

export function flatten(root) {
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      // 找到左子树的最右节点
      let predecessor = curr.left;
      while (predecessor.right !== null) {
        predecessor = predecessor.right;
      }

      // 将右子树接到左子树的最右节点
      predecessor.right = curr.right;

      // 将左子树移到右边
      curr.right = curr.left;
      curr.left = null;
    }

    curr = curr.right;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(flatten([1,2,5,3,4,null,6]), [1,null,2,null,3,null,4,null,5,null,6]);
});

test("空树", () => {
  assert.deepStrictEqual(flatten([]), []);
});

test("单节点", () => {
  assert.deepStrictEqual(flatten([0]), [0]);
});
