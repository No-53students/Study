// node ./06-rotting-oranges.mjs
/**
 * 994. 腐烂的橘子 (Rotting Oranges)
 * 难度: medium
 *
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 * 
 * - 值 0 代表空单元格；
 * - 值 1 代表新鲜橘子；
 * - 值 2 代表腐烂的橘子。
 * 
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 * 
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 *
 * 示例 1：
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 * 解释：需要 4 分钟使所有橘子腐烂
 * 
 * 示例 2：
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子永远不会腐烂
 * 
 * 示例 3：
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：没有新鲜橘子
 *
 * 约束条件:
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 10
 * - grid[i][j] 仅为 0、1 或 2
 *
 * 提示:
 *   1. 多源 BFS：从所有腐烂橘子同时开始
 *   2. 统计新鲜橘子数量
 *   3. 每轮 BFS 代表一分钟
 */

export function orangesRotting(grid) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 994. 腐烂的橘子 (Rotting Oranges)");
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
  assert.deepStrictEqual(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]), 4);
});

test("无法全部腐烂", () => {
  assert.deepStrictEqual(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]), -1);
});

test("没有新鲜橘子", () => {
  assert.deepStrictEqual(orangesRotting([[0,2]]), 0);
});
