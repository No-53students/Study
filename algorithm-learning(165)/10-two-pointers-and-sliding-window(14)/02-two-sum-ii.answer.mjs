/**
 * 167. 两数之和 II - 输入有序数组 (Two Sum II - Input Array Is Sorted) - 参考答案
 */

export function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      // 注意：返回的是1-indexed
      return [left + 1, right + 1];
    } else if (sum < target) {
      // 和太小，左指针右移
      left++;
    } else {
      // 和太大，右指针左移
      right--;
    }
  }

  return [-1, -1]; // 题目保证有解，不会执行到这里
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(twoSum([2,7,11,15], 9), [1,2]);
});

test("示例2", () => {
  assert.deepStrictEqual(twoSum([2,3,4], 6), [1,3]);
});

test("负数", () => {
  assert.deepStrictEqual(twoSum([-1,0], -1), [1,2]);
});

test("相邻元素", () => {
  assert.deepStrictEqual(twoSum([1,2,3,4,5], 3), [1,2]);
});
