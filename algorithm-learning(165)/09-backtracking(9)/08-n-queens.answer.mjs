/**
 * 51. N 皇后 (N-Queens) - 参考答案
 */

export function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  // 检查是否可以放置皇后
  const isValid = (row, col) => {
    // 检查列
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // 检查左上对角线
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // 检查右上对角线
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  };

  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  };

  backtrack(0);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("4皇后", () => {
  assert.deepStrictEqual(solveNQueens(4), [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]);
});

test("1皇后", () => {
  assert.deepStrictEqual(solveNQueens(1), [["Q"]]);
});
