/**
 * 209. 长度最小的子数组 (Minimum Size Subarray Sum) - 参考答案
 */

export function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    // 扩展窗口，加入右边元素
    sum += nums[right];

    // 收缩窗口，直到和小于 target
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(minSubArrayLen(7, [2,3,1,2,4,3]), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(minSubArrayLen(4, [1,4,4]), 1);
});

test("无解", () => {
  assert.deepStrictEqual(minSubArrayLen(11, [1,1,1,1,1,1,1,1]), 0);
});

test("整个数组", () => {
  assert.deepStrictEqual(minSubArrayLen(15, [1,2,3,4,5]), 5);
});
