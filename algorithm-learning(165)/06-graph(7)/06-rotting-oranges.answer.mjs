/**
 * 994. 腐烂的橘子 (Rotting Oranges) - 参考答案
 */

export function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;

  // 初始化：找到所有腐烂橘子和新鲜橘子数量
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }

  if (fresh === 0) return 0;

  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let minutes = 0;

  while (queue.length > 0 && fresh > 0) {
    minutes++;
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;

        if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
          grid[nx][ny] = 2;
          fresh--;
          queue.push([nx, ny]);
        }
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]), 4);
});

test("无法全部腐烂", () => {
  assert.deepStrictEqual(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]), -1);
});

test("没有新鲜橘子", () => {
  assert.deepStrictEqual(orangesRotting([[0,2]]), 0);
});
