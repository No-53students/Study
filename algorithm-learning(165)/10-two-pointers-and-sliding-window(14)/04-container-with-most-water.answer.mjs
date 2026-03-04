/**
 * 11. 盛最多水的容器 (Container With Most Water) - 参考答案
 */

export function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    // 计算当前容器的水量
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const water = width * h;

    maxWater = Math.max(maxWater, water);

    // 移动较短的那条边
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(maxArea([1,8,6,2,5,4,8,3,7]), 49);
});

test("示例2", () => {
  assert.deepStrictEqual(maxArea([1,1]), 1);
});

test("递增", () => {
  assert.deepStrictEqual(maxArea([1,2,3,4,5]), 6);
});

test("递减", () => {
  assert.deepStrictEqual(maxArea([5,4,3,2,1]), 6);
});
