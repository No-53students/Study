/**
 * 283. 移动零 (Move Zeroes) - 参考答案
 */

export function moveZeroes(nums) {
  let slow = 0;

  // 将非零元素移到前面
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // 剩余位置填充 0
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(moveZeroes([0,1,0,3,12]), [1,3,12,0,0]);
});

test("单个零", () => {
  assert.deepStrictEqual(moveZeroes([0]), [0]);
});

test("无零", () => {
  assert.deepStrictEqual(moveZeroes([1,2,3]), [1,2,3]);
});
