/**
 * 118. 杨辉三角 (Pascal's Triangle) - 参考答案
 */

export function generate(numRows) {
  const result = [];

  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);

    for (let j = 1; j < i; j++) {
      row[j] = result[i - 1][j - 1] + result[i - 1][j];
    }

    result.push(row);
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("5行", () => {
  assert.deepStrictEqual(generate(5), [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]);
});

test("1行", () => {
  assert.deepStrictEqual(generate(1), [[1]]);
});
