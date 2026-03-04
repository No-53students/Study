/**
 * 52. N 皇后 II (N-Queens II)
 * 难度: hard
 *
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 
 * 给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。
 *
 * 示例 1：
 * 输入：n = 4
 * 输出：2
 * 解释：如图所示，4 皇后问题存在两个不同的解法。
 * 
 * 示例 2：
 * 输入：n = 1
 * 输出：1
 *
 * 约束条件:
 * - 1 <= n <= 9
 *
 * 提示:
 *   1. 与 N 皇后问题类似，但只需要计数
 *   2. 使用集合记录已占用的列和对角线
 *   3. 可以使用位运算优化
 */

export function totalNQueens(n) {
  // 在此处编写代码
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

test("n=4", () => {
  assert.deepStrictEqual(totalNQueens(4), 2);
});

test("n=1", () => {
  assert.deepStrictEqual(totalNQueens(1), 1);
});

test("n=8", () => {
  assert.deepStrictEqual(totalNQueens(8), 92);
});
