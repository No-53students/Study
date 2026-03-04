/**
 * 51. N 皇后 (N-Queens)
 * 难度: hard
 *
 * 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
 * 
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 
 * 给你一个整数 n，返回所有不同的 n 皇后问题 的解决方案。
 * 
 * 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 * 示例 1：
 * 输入：n = 4
 * 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * 解释：4 皇后问题存在两个不同的解法。
 * 
 * 示例 2：
 * 输入：n = 1
 * 输出：[["Q"]]
 *
 * 约束条件:
 * - 1 <= n <= 9
 *
 * 提示:
 *   1. 逐行放置皇后，每行只能放一个
 *   2. 检查列、左上对角线、右上对角线是否有冲突
 *   3. 使用集合优化冲突检测
 */

export function solveNQueens(n) {
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

test("4皇后", () => {
  assert.deepStrictEqual(solveNQueens(4), [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]);
});

test("1皇后", () => {
  assert.deepStrictEqual(solveNQueens(1), [["Q"]]);
});
