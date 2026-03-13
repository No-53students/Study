// node ./11-unique-paths.mjs
/**
 * 62. 不同路径 (Unique Paths)
 * 难度: medium
 *
 * 一个机器人位于一个 m x n 网格的左上角（起始点在下图中标记为 "Start"）。
 * 
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。
 * 
 * 问总共有多少条不同的路径？
 *
 * 示例 1：
 * 输入：m = 3, n = 7
 * 输出：28
 * 
 * 示例 2：
 * 输入：m = 3, n = 2
 * 输出：3
 * 解释：
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向下
 * 
 * 示例 3：
 * 输入：m = 7, n = 3
 * 输出：28
 *
 * 约束条件:
 * - 1 <= m, n <= 100
 *
 * 提示:
 *   1. dp[i][j] = dp[i-1][j] + dp[i][j-1]
 *   2. 第一行和第一列都只有一种到达方式
 *   3. 可以用一维数组优化空间
 */

export function uniquePaths(m, n) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 62. 不同路径 (Unique Paths)");
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

test("3x7网格", () => {
  assert.deepStrictEqual(uniquePaths(3, 7), 28);
});

test("3x2网格", () => {
  assert.deepStrictEqual(uniquePaths(3, 2), 3);
});

test("7x3网格", () => {
  assert.deepStrictEqual(uniquePaths(7, 3), 28);
});
