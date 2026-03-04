/**
 * 300. 最长递增子序列 (Longest Increasing Subsequence) - 参考答案
 */

export function lengthOfLIS(nums) {
  // 贪心 + 二分查找
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    // 二分查找第一个 >= num 的位置
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(lengthOfLIS([[10,9,2,5,3,7,101,18]]), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(lengthOfLIS([[0,1,0,3,2,3]]), 4);
});

test("全相同", () => {
  assert.deepStrictEqual(lengthOfLIS([[7,7,7,7,7,7,7]]), 1);
});
