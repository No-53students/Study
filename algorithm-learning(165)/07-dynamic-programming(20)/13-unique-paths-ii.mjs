/**
 * 63. 不同路径 II (Unique Paths II)
 * 难度: medium
 *
 * 一个机器人位于一个 m x n 网格的左上角（起始点在下图中标记为 "Start"）。
 * 
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。
 * 
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * 
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 *
 * 示例 1：
 * 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：2
 * 解释：3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 * 
 * 示例 2：
 * 输入：obstacleGrid = [[0,1],[0,0]]
 * 输出：1
 *
 * 约束条件:
 * - m == obstacleGrid.length
 * - n == obstacleGrid[i].length
 * - 1 <= m, n <= 100
 * - obstacleGrid[i][j] 为 0 或 1
 *
 * 提示:
 *   1. 遇到障碍物时，该位置的路径数为0
 *   2. 起点或终点有障碍物直接返回0
 *   3. 可以用一维数组优化空间
 */

export function uniquePathsWithObstacles(obstacleGrid) {
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

test("有障碍物", () => {
  assert.deepStrictEqual(uniquePathsWithObstacles([[[0,0,0],[0,1,0],[0,0,0]]]), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(uniquePathsWithObstacles([[[0,1],[0,0]]]), 1);
});
