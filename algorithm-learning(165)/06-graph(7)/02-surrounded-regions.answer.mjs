/**
 * 130. 被围绕的区域 (Surrounded Regions) - 参考答案
 */

export function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;

  // 从边界的 O 开始 DFS，标记为 #
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
      return;
    }

    board[i][j] = '#'; // 标记为不可捕获

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  // 处理边界上的 O
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }

  // 遍历整个矩阵：O -> X，# -> O
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      } else if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(solve([[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]]), [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]);
});

test("单元素", () => {
  assert.deepStrictEqual(solve([[["X"]]]), [["X"]]);
});
