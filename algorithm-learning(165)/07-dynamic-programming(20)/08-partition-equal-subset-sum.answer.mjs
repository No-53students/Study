/**
 * 416. 分割等和子集 (Partition Equal Subset Sum) - 参考答案
 */

export function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);

  // 和为奇数，无法等分
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    // 从后往前遍历，避免重复使用同一个数
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("可分割", () => {
  assert.deepStrictEqual(canPartition([1,5,11,5]), true);
});

test("不可分割", () => {
  assert.deepStrictEqual(canPartition([1,2,3,5]), false);
});
