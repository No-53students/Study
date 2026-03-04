/**
 * 79. 单词搜索 (Word Search)
 * 难度: medium
 *
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word。如果 word 存在于网格中，返回 true；否则，返回 false。
 * 
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 *
 * 示例 1：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * 输出：true
 * 
 * 示例 2：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
 * 输出：true
 * 
 * 示例 3：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
 * 输出：false
 *
 * 约束条件:
 * - m == board.length
 * - n = board[i].length
 * - 1 <= m, n <= 6
 * - 1 <= word.length <= 15
 * - board 和 word 仅由大小写英文字母组成
 *
 * 提示:
 *   1. 从每个格子开始尝试 DFS
 *   2. 访问过的格子临时标记，避免重复使用
 *   3. 回溯时恢复格子的原始值
 */

export function exist(board, word) {
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

test("存在ABCCED", () => {
  assert.deepStrictEqual(exist([[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "ABCCED"), true);
});

test("存在SEE", () => {
  assert.deepStrictEqual(exist([[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "SEE"), true);
});

test("不存在ABCB", () => {
  assert.deepStrictEqual(exist([[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "ABCB"), false);
});
