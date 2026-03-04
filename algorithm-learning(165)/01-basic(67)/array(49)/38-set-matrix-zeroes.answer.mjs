/**
 * 73. 矩阵置零 (Set Matrix Zeroes) - 参考答案
 */

export function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 用第一行和第一列作为标记
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // 检查第一行是否有0
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // 检查第一列是否有0
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // 用第一行和第一列记录需要置零的行和列
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // 根据标记置零（除第一行第一列外）
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // 处理第一行
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // 处理第一列
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(setZeroes([[1,1,1],[1,0,1],[1,1,1]]), [[1,0,1],[0,0,0],[1,0,1]]);
});

test("示例2", () => {
  assert.deepStrictEqual(setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]]), [[0,0,0,0],[0,4,5,0],[0,3,1,0]]);
});

test("无零", () => {
  assert.deepStrictEqual(setZeroes([[1,2],[3,4]]), [[1,2],[3,4]]);
});
