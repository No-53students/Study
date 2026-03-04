/**
 * 94. 二叉树的中序遍历 (Binary Tree Inorder Traversal) - 参考答案
 */

export function inorderTraversal(root) {
  const result = [];

  const inorder = (node) => {
    if (node === null) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  };

  inorder(root);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(inorderTraversal([1,null,2,3]), [1,3,2]);
});

test("空树", () => {
  assert.deepStrictEqual(inorderTraversal(null), []);
});

test("单节点", () => {
  assert.deepStrictEqual(inorderTraversal([1]), [1]);
});
