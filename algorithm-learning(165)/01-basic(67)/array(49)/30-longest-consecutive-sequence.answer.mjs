/**
 * 128. 最长连续序列 (Longest Consecutive Sequence) - 参考答案
 */

export function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // 只从序列的起点开始计数
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(longestConsecutive([100,4,200,1,3,2]), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(longestConsecutive([0,3,7,2,5,8,4,6,0,1]), 9);
});

test("空数组", () => {
  assert.deepStrictEqual(longestConsecutive([]), 0);
});

test("单元素", () => {
  assert.deepStrictEqual(longestConsecutive([1]), 1);
});
