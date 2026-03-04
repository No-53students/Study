/**
 * 64. 最小路径和 (Minimum Path Sum)
 * 难度: medium
 *
 * 给定一个包含非负整数的 m x n 网格 grid，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 
 * 说明：每次只能向下或者向右移动一步。
 *
 * 示例 1：
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 * 
 * 示例 2：
 * 输入：grid = [[1,2,3],[4,5,6]]
 * 输出：12
 *
 * 约束条件:
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 200
 * - 0 <= grid[i][j] <= 200
 *
 * 提示:
 *   1. dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
 *   2. 注意处理边界情况（第一行和第一列）
 *   3. 可以用一维数组优化空间
 */

export function minPathSum(grid) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
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
  assert.deepStrictEqual(minPathSum([[[1,3,1],[1,5,1],[4,2,1]]]), 7);
});

test("示例2", () => {
  assert.deepStrictEqual(minPathSum([[[1,2,3],[4,5,6]]]), 12);
});
