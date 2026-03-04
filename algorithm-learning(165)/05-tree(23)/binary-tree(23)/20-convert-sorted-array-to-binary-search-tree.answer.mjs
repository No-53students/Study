/**
 * 108. 将有序数组转换为二叉搜索树 (Convert Sorted Array to Binary Search Tree) - 参考答案
 */

export function sortedArrayToBST(nums) {
  const build = (left, right) => {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);

    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);

    return root;
  };

  return build(0, nums.length - 1);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(sortedArrayToBST([-10,-3,0,5,9]), [0,-3,9,-10,null,5]);
});

test("示例2", () => {
  assert.deepStrictEqual(sortedArrayToBST([1,3]), [3,1]);
});

test("单元素", () => {
  assert.deepStrictEqual(sortedArrayToBST([0]), [0]);
});
