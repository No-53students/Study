// node ./14-candy2.mjs
/**
 * 135. 分发糖果 (Candy)
 * 难度: hard
 *
 * n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
 *
 * 你需要按照以下要求，给这些孩子分发糖果：
 *
 * - 每个孩子至少分配到 1 个糖果。
 * - 相邻两个孩子评分更高的孩子会获得更多的糖果。
 *
 * 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
 *
 * 示例 1：
 * 输入：ratings = [1,0,2]
 * 输出：5
 * 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
 *
 * 示例 2：
 * 输入：ratings = [1,2,2]
 * 输出：4
 * 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
 *      第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 *
 * 约束条件:
 * - n == ratings.length
 * - 1 <= n <= 2 * 10^4
 * - 0 <= ratings[i] <= 2 * 10^4
 *
 * 提示:
 *   1. 两次遍历，分别处理左右关系
 *   2. 第一次从左到右，保证右边评分高的比左边糖果多
 *   3. 第二次从右到左，保证左边评分高的比右边糖果多
 */

/**
 * @param {number[]} ratings
 * @return {number}
 */
// 两次遍历：左遍历保证右边评分高的糖果多，右遍历保证左边评分高的糖果多
// 右遍历用 Math.max 取较大值，避免覆盖左遍历的结果
export function solution(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // 从左往右：如果右边评分更高，糖果 = 左边 + 1
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // 从右往左：如果左边评分更高，取 max（保留左遍历的结果）
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // reduce 求总和：从初始值 0 开始，依次把每个元素 c 加到 sum 上
  // [1,3,2,1].reduce((sum,c) => sum+c, 0) → 0+1+3+2+1 = 7
  return candies.reduce((sum, c) => sum + c, 0);
}

// ---- 测试用例 ----
console.log("\n📝 题目: 135. 分发糖果 (Candy)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(
      `结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? "✅ 通过" : "❌ 不通过"}`,
    );
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? "✅ 通过" : "❌ 不通过"}`);
  },
};

test("基本测试", () => {
  assert.deepStrictEqual(solution([1, 0, 2]), 5);
});

test("相邻相等", () => {
  assert.deepStrictEqual(solution([1, 2, 2]), 4);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("递增", () => {
  assert.deepStrictEqual(solution([1, 2, 3]), 6);
});

test("递减", () => {
  assert.deepStrictEqual(solution([3, 2, 1]), 6);
});

test("山顶重叠", () => {
  assert.deepStrictEqual(solution([1, 3, 2, 1]), 7);
});
