// node ./04-container-with-most-water.mjs
/**
 * 11. 盛最多水的容器 (Container With Most Water)
 * 难度: medium
 *
 * 给定一个长度为 n 的整数数组 height。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。
 * 
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 
 * 返回容器可以储存的最大水量。
 * 
 * 说明： 你不能倾斜容器。
 *
 * 示例 1：
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 * 
 * 示例 2：
 * 输入：height = [1,1]
 * 输出：1
 *
 * 约束条件:
 * - n == height.length
 * - 2 <= n <= 10^5
 * - 0 <= height[i] <= 10^4
 *
 * 提示:
 *   1. 容器的水量 = 宽度 × 高度（取两边较短的）
 *   2. 使用双指针，从两端向中间移动
 *   3. 每次移动较短的那条边，因为移动较长的边不可能得到更大的容量
 */

export function maxArea(height) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 11. 盛最多水的容器 (Container With Most Water)");
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
