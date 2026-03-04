/**
 * 230. 二叉搜索树中第K小的元素 (Kth Smallest Element in a BST) - 参考答案
 */

export function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  const inorder = (node) => {
    if (node === null || result !== null) return;

    // 遍历左子树
    inorder(node.left);

    // 处理当前节点
    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    // 遍历右子树
    inorder(node.right);
  };

  inorder(root);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(kthSmallest([3,1,4,null,2], 1), 1);
});

test("示例2", () => {
  assert.deepStrictEqual(kthSmallest([5,3,6,2,4,null,null,1], 3), 3);
});
