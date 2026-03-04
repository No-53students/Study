/**
 * 289. 生命游戏 (Game of Life) - 参考答案
 */

export function gameOfLife(board) {
  const m = board.length;
  const n = board[0].length;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0], [1, 1]
  ];

  // 计算相邻活细胞数
  const countLiveNeighbors = (row, col) => {
    let count = 0;
    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < m && c >= 0 && c < n) {
        // 使用 & 1 获取原始状态（处理状态2的情况）
        if ((board[r][c] & 1) === 1) {
          count++;
        }
      }
    }
    return count;
  };

  // 第一遍：标记状态变化
  // 使用状态编码：
  // 0: 死 -> 死
  // 1: 活 -> 活
  // 2: 活 -> 死（用二进制 10 表示，原状态为活）
  // 3: 死 -> 活（用二进制 11 表示，新状态为活）
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const liveNeighbors = countLiveNeighbors(i, j);

      if (board[i][j] === 1) {
        // 活细胞
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 2; // 活 -> 死
        }
      } else {
        // 死细胞
        if (liveNeighbors === 3) {
          board[i][j] = 3; // 死 -> 活
        }
      }
    }
  }

  // 第二遍：更新为最终状态
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 0;
      } else if (board[i][j] === 3) {
        board[i][j] = 1;
      }
    }
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(gameOfLife([[0,1,0],[0,0,1],[1,1,1],[0,0,0]]), [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]);
});

test("示例2", () => {
  assert.deepStrictEqual(gameOfLife([[1,1],[1,0]]), [[1,1],[1,1]]);
});

test("全死", () => {
  assert.deepStrictEqual(gameOfLife([[0,0],[0,0]]), [[0,0],[0,0]]);
});
