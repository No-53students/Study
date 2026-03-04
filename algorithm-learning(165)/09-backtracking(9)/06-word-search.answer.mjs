/**
 * 79. 单词搜索 (Word Search) - 参考答案
 */

export function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  const dfs = (i, j, k) => {
    // 边界检查和字符匹配
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    // 找到完整单词
    if (k === word.length - 1) {
      return true;
    }

    // 标记已访问
    const temp = board[i][j];
    board[i][j] = '#';

    // 四个方向搜索
    const found = dfs(i + 1, j, k + 1) ||
                  dfs(i - 1, j, k + 1) ||
                  dfs(i, j + 1, k + 1) ||
                  dfs(i, j - 1, k + 1);

    // 回溯
    board[i][j] = temp;

    return found;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("存在ABCCED", () => {
  assert.deepStrictEqual(exist([[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "ABCCED"), true);
});

test("存在SEE", () => {
  assert.deepStrictEqual(exist([[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "SEE"), true);
});

test("不存在ABCB", () => {
  assert.deepStrictEqual(exist([[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]], "ABCB"), false);
});
