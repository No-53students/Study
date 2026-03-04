/**
 * 84. 柱状图中最大的矩形 (Largest Rectangle in Histogram) - 参考答案
 */

export function largestRectangleArea(heights) {
  const n = heights.length;
  const stack = [-1]; // 哨兵
  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    while (stack[stack.length - 1] !== -1 && heights[i] < heights[stack[stack.length - 1]]) {
      const h = heights[stack.pop()];
      const w = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }

  // 处理栈中剩余元素
  while (stack[stack.length - 1] !== -1) {
    const h = heights[stack.pop()];
    const w = n - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, h * w);
  }

  return maxArea;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(largestRectangleArea([2,1,5,6,2,3]), 10);
});

test("示例2", () => {
  assert.deepStrictEqual(largestRectangleArea([2,4]), 4);
});

test("单个", () => {
  assert.deepStrictEqual(largestRectangleArea([5]), 5);
});
