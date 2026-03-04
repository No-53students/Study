/**
 * 289. 生命游戏 (Game of Life)
 * 难度: medium
 *
 * 根据 百度百科 ， 生命游戏，简称为 生命，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。
 * 
 * 给定一个包含 m × n 个格子的面板，每个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： 1 即为 活细胞（live），或 0 即为 死细胞（dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：
 * 
 * 1. 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
 * 2. 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
 * 3. 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
 * 4. 如果死细胞周围正好有三个活细胞，则该位置死细胞复活。
 * 
 * 下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是 同时 发生的。给你 m x n 网格面板 board 的当前状态，返回下一个状态。
 *
 * 示例 1：
 * 输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
 * 输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
 * 
 * 示例 2：
 * 输入：board = [[1,1],[1,0]]
 * 输出：[[1,1],[1,1]]
 *
 * 约束条件:
 * - m == board.length
 * - n == board[i].length
 * - 1 <= m, n <= 25
 * - board[i][j] 为 0 或 1
 * 
 * 进阶：
 * - 你可以使用原地算法解决本题吗？请注意，面板上所有格子需要同时被更新：你不能先更新某些格子，然后使用它们的更新后的值再更新其他格子。
 *
 * 提示:
 *   1. 关键是如何原地更新，同时保留原始状态信息
 *   2. 可以用额外的状态值来编码状态转换
 *   3. 例如：2 表示活→死，3 表示死→活
 *   4. 最后统一更新为最终状态
 */

export function gameOfLife(board) {
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
  assert.deepStrictEqual(gameOfLife([[0,1,0],[0,0,1],[1,1,1],[0,0,0]]), [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]);
});

test("示例2", () => {
  assert.deepStrictEqual(gameOfLife([[1,1],[1,0]]), [[1,1],[1,1]]);
});

test("全死", () => {
  assert.deepStrictEqual(gameOfLife([[0,0],[0,0]]), [[0,0],[0,0]]);
});
