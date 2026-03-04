/**
 * 98. 验证二叉搜索树 (Validate Binary Search Tree) - 参考答案
 */

export function isValidBST(root) {
  const validate = (node, min, max) => {
    if (node === null) return true;

    // 检查当前节点值是否在有效范围内
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // 递归验证左右子树
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  };

  return validate(root, -Infinity, Infinity);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("有效BST", () => {
  assert.deepStrictEqual(isValidBST([2,1,3]), true);
});

test("无效BST", () => {
  assert.deepStrictEqual(isValidBST([5,1,4,null,null,3,6]), false);
});

test("单节点", () => {
  assert.deepStrictEqual(isValidBST([1]), true);
});
