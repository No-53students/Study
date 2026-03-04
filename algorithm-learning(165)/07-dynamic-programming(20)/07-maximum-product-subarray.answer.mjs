/**
 * 152. 乘积最大子数组 (Maximum Product Subarray) - 参考答案
 */

export function maxProduct(nums) {
  let maxProd = nums[0];
  let minProd = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // 负数会使最大变最小，最小变最大
    if (num < 0) {
      [maxProd, minProd] = [minProd, maxProd];
    }

    maxProd = Math.max(num, maxProd * num);
    minProd = Math.min(num, minProd * num);

    result = Math.max(result, maxProd);
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(maxProduct([2,3,-2,4]), 6);
});

test("示例2", () => {
  assert.deepStrictEqual(maxProduct([-2,0,-1]), 0);
});

test("单个负数", () => {
  assert.deepStrictEqual(maxProduct([-2]), -2);
});
