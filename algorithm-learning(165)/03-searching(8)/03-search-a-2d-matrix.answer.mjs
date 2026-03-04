/**
 * 74. 搜索二维矩阵 (Search a 2D Matrix) - 参考答案
 */

export function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const value = matrix[row][col];

    if (value === target) {
      return true;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("找到目标", () => {
  assert.deepStrictEqual(searchMatrix([[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 3), true);
});

test("目标不存在", () => {
  assert.deepStrictEqual(searchMatrix([[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 13), false);
});
