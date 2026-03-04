/**
 * 189. 轮转数组 (Rotate Array) - 参考答案
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
export function solution(nums, k) {
  const n = nums.length;
  k = k % n;  // 处理 k > n 的情况

  // 辅助函数：反转数组的一部分
  const reverse = (start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  // 三次反转
  reverse(0, n - 1);      // 反转整个数组
  reverse(0, k - 1);      // 反转前 k 个
  reverse(k, n - 1);      // 反转后 n-k 个

  return nums;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,2,3,4,5,6,7], 3), [5,6,7,1,2,3,4]);
});

test("k=2", () => {
  assert.deepStrictEqual(solution([-1,-100,3,99], 2), [3,99,-1,-100]);
});

test("k=0", () => {
  assert.deepStrictEqual(solution([1,2,3], 0), [1,2,3]);
});

test("k>n", () => {
  assert.deepStrictEqual(solution([1,2], 3), [2,1]);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1], 5), [1]);
});
