/**
 * 560. 和为 K 的子数组 (Subarray Sum Equals K) - 参考答案
 */

export function subarraySum(nums, k) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // 前缀和为 0 出现 1 次

  let count = 0;
  let prefixSum = 0;

  for (const num of nums) {
    prefixSum += num;

    // 如果存在前缀和为 prefixSum - k，说明找到了和为 k 的子数组
    if (prefixSumCount.has(prefixSum - k)) {
      count += prefixSumCount.get(prefixSum - k);
    }

    // 更新当前前缀和的出现次数
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }

  return count;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(subarraySum([1,1,1], 2), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(subarraySum([1,2,3], 3), 2);
});

test("负数", () => {
  assert.deepStrictEqual(subarraySum([1,-1,0], 0), 3);
});

test("单元素", () => {
  assert.deepStrictEqual(subarraySum([1], 1), 1);
});
