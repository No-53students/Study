// node ./14-triangle.mjs
/**
 * 120. 三角形最小路径和 (Triangle)
 * 难度: medium
 *
 * 给定一个三角形 triangle，找出自顶向下的最小路径和。
 * 
 * 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i，那么下一步可以移动到下一行的下标 i 或 i + 1。
 *
 * 示例 1：
 * 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
 * 输出：11
 * 解释：如下面简图所示：
 *    2
 *   3 4
 *  6 5 7
 * 4 1 8 3
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 * 
 * 示例 2：
 * 输入：triangle = [[-10]]
 * 输出：-10
 *
 * 约束条件:
 * - 1 <= triangle.length <= 200
 * - triangle[0].length == 1
 * - triangle[i].length == triangle[i - 1].length + 1
 * - -10^4 <= triangle[i][j] <= 10^4
 *
 * 提示:
 *   1. 从底向上计算更简单，不需要处理边界
 *   2. dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]
 *   3. 可以直接复用最后一行作为 dp 数组
 */

export function minimumTotal(triangle) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 120. 三角形最小路径和 (Triangle)");
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
  assert.deepStrictEqual(minimumTotal([[[2],[3,4],[6,5,7],[4,1,8,3]]]), 11);
});

test("单元素", () => {
  assert.deepStrictEqual(minimumTotal([[[-10]]]), -10);
});
