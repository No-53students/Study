// node ./02-surrounded-regions.mjs
/**
 * 130. 被围绕的区域 (Surrounded Regions)
 * 难度: medium
 *
 * 给你一个 m x n 的矩阵 board，由若干字符 'X' 和 'O' 组成，捕获 所有 被围绕的区域：
 * 
 * - 连接：一个单元格与水平或垂直方向上相邻的单元格连接。
 * - 区域：连接所有 'O' 的单元格来形成一个区域。
 * - 围绕：如果您可以用 'X' 单元格 连接这个区域，并且区域中没有任何单元格位于 board 边缘，则该区域被 'X' 单元格围绕。
 * 
 * 通过将输入矩阵 board 中的所有 'O' 替换为 'X' 来 捕获被围绕的区域。
 *
 * 示例 1：
 * 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 * 解释：被围绕的区域应该被填充为 'X'，边界上的 'O' 不会被填充。
 * 
 * 示例 2：
 * 输入：board = [["X"]]
 * 输出：[["X"]]
 *
 * 约束条件:
 * - m == board.length
 * - n == board[i].length
 * - 1 <= m, n <= 200
 * - board[i][j] 为 'X' 或 'O'
 *
 * 提示:
 *   1. 边界上的 O 不会被围绕
 *   2. 从边界的 O 开始 DFS，标记所有与边界相连的 O
 *   3. 最后把未标记的 O 变成 X，标记的恢复为 O
 */

export function solve(board) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 130. 被围绕的区域 (Surrounded Regions)");
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
  assert.deepStrictEqual(solve([[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]]), [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]);
});

test("单元素", () => {
  assert.deepStrictEqual(solve([[["X"]]]), [["X"]]);
});
