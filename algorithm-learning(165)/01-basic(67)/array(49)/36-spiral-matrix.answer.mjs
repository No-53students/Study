/**
 * 54. 螺旋矩阵 (Spiral Matrix) - 参考答案
 */

export function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;

  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // 从左到右
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // 从上到下
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // 从右到左
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // 从下到上
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("3x3矩阵", () => {
  assert.deepStrictEqual(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]), [1,2,3,6,9,8,7,4,5]);
});

test("3x4矩阵", () => {
  assert.deepStrictEqual(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]), [1,2,3,4,8,12,11,10,9,5,6,7]);
});

test("单行", () => {
  assert.deepStrictEqual(spiralOrder([[1,2,3]]), [1,2,3]);
});

test("单列", () => {
  assert.deepStrictEqual(spiralOrder([[1],[2],[3]]), [1,2,3]);
});
