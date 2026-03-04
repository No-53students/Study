/**
 * 347. 前K个高频元素 (Top K Frequent Elements) - 参考答案
 */

export function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 桶排序：索引是频率，值是该频率的元素列表
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // 从高频到低频收集结果
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(topKFrequent([1,1,1,2,2,3], 2), [1,2]);
});

test("单元素", () => {
  assert.deepStrictEqual(topKFrequent([1], 1), [1]);
});
