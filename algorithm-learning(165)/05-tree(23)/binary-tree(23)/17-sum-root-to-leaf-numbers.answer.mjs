/**
 * 129. 求根节点到叶节点数字之和 (Sum Root to Leaf Numbers) - 参考答案
 */

export function sumNumbers(root) {
  const dfs = (node, currentSum) => {
    if (node === null) return 0;

    currentSum = currentSum * 10 + node.val;

    // 如果是叶子节点，返回当前路径的数字
    if (node.left === null && node.right === null) {
      return currentSum;
    }

    // 递归计算左右子树的数字之和
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  };

  return dfs(root, 0);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(sumNumbers([1,2,3]), 25);
});

test("示例2", () => {
  assert.deepStrictEqual(sumNumbers([4,9,0,5,1]), 1026);
});

test("单节点", () => {
  assert.deepStrictEqual(sumNumbers([5]), 5);
});
