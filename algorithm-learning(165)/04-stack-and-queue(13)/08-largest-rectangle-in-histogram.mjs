// node ./08-largest-rectangle-in-histogram.mjs
/**
 * 84. 柱状图中最大的矩形 (Largest Rectangle in Histogram)
 * 难度: hard
 *
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 * 
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 *
 * 示例 1：
 * 输入：heights = [2,1,5,6,2,3]
 * 输出：10
 * 解释：最大的矩形为图中红色区域，面积为 10
 * 
 * 示例 2：
 * 输入：heights = [2,4]
 * 输出：4
 *
 * 约束条件:
 * - 1 <= heights.length <= 10^5
 * - 0 <= heights[i] <= 10^4
 *
 * 提示:
 *   1. 使用单调递增栈
 *   2. 对每个柱子，找到左右两边第一个比它矮的柱子
 *   3. 矩形宽度 = 右边界 - 左边界 - 1
 */

export function largestRectangleArea(heights) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 84. 柱状图中最大的矩形 (Largest Rectangle in Histogram)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? '✅ 通过' : '❌ 不通过'}`);
  },
};

test("示例1", () => {
  assert.deepStrictEqual(largestRectangleArea([2,1,5,6,2,3]), 10);
});

test("示例2", () => {
  assert.deepStrictEqual(largestRectangleArea([2,4]), 4);
});

test("单个", () => {
  assert.deepStrictEqual(largestRectangleArea([5]), 5);
});
