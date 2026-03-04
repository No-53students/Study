/**
 * 48. 旋转图像 (Rotate Image) - 参考答案
 */

export function rotate(matrix) {
  const n = matrix.length;

  // 先转置矩阵
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 再左右翻转每一行
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("3x3矩阵", () => {
  assert.deepStrictEqual(rotate([[1,2,3],[4,5,6],[7,8,9]]), [[7,4,1],[8,5,2],[9,6,3]]);
});

test("4x4矩阵", () => {
  assert.deepStrictEqual(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]), [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]);
});

test("1x1矩阵", () => {
  assert.deepStrictEqual(rotate([[1]]), [[1]]);
});

test("2x2矩阵", () => {
  assert.deepStrictEqual(rotate([[1,2],[3,4]]), [[3,1],[4,2]]);
});
