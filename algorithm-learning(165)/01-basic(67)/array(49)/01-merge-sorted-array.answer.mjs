/**
 * 88. 合并两个有序数组 (Merge Sorted Array) - 参考答案
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} 修改 nums1 原地合并
 */
export function solution(nums1, m, nums2, n) {
  // 逆向双指针：从后往前填充，避免覆盖
  let p1 = m - 1;      // nums1 有效元素的末尾
  let p2 = n - 1;      // nums2 的末尾
  let p = m + n - 1;   // 合并后数组的末尾

  // 从后往前比较并填充
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  return nums1; // 返回用于测试
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,2,3,0,0,0], 3, [2,5,6], 3), [1,2,2,3,5,6]);
});

test("nums2为空", () => {
  assert.deepStrictEqual(solution([1], 1, [], 0), [1]);
});

test("nums1为空", () => {
  assert.deepStrictEqual(solution([0], 0, [1], 1), [1]);
});

test("交错合并", () => {
  assert.deepStrictEqual(solution([1,3,5,0,0,0], 3, [2,4,6], 3), [1,2,3,4,5,6]);
});

test("nums2全部较小", () => {
  assert.deepStrictEqual(solution([4,5,6,0,0,0], 3, [1,2,3], 3), [1,2,3,4,5,6]);
});
