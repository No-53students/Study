/**
 * 240. 搜索二维矩阵 II (Search a 2D Matrix II) - 参考答案
 */

export function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let row = 0, col = n - 1;

  while (row < m && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("找到目标", () => {
  assert.deepStrictEqual(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5), true);
});

test("目标不存在", () => {
  assert.deepStrictEqual(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20), false);
});
