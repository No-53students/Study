/**
 * 52. N 皇后 II (N-Queens II) - 参考答案
 */

export function totalNQueens(n) {
  let count = 0;
  const cols = new Set();
  const diag1 = new Set(); // 主对角线 row - col
  const diag2 = new Set(); // 副对角线 row + col

  const backtrack = (row) => {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;
      }

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      backtrack(row + 1);

      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  };

  backtrack(0);
  return count;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("n=4", () => {
  assert.deepStrictEqual(totalNQueens(4), 2);
});

test("n=1", () => {
  assert.deepStrictEqual(totalNQueens(1), 1);
});

test("n=8", () => {
  assert.deepStrictEqual(totalNQueens(8), 92);
});
