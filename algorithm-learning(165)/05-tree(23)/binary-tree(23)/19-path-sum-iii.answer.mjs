/**
 * 437. 路径总和 III (Path Sum III) - 参考答案
 */

export function pathSum(root, targetSum) {
  const prefixSum = new Map();
  prefixSum.set(0, 1);

  const dfs = (node, currentSum) => {
    if (node === null) return 0;

    currentSum += node.val;
    let count = prefixSum.get(currentSum - targetSum) || 0;

    prefixSum.set(currentSum, (prefixSum.get(currentSum) || 0) + 1);

    count += dfs(node.left, currentSum);
    count += dfs(node.right, currentSum);

    prefixSum.set(currentSum, prefixSum.get(currentSum) - 1);

    return count;
  };

  return dfs(root, 0);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(pathSum([10,5,-3,3,2,null,11,3,-2,null,1], 8), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(pathSum([5,4,8,11,null,13,4,7,2,null,null,5,1], 22), 3);
});

test("空树", () => {
  assert.deepStrictEqual(pathSum([], 0), 0);
});
