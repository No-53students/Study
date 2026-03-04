/**
 * 191. 位1的个数 (Number of 1 Bits) - 参考答案
 */

export function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // 消除最低位的 1
    count++;
  }
  return count;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("三个1", () => {
  assert.deepStrictEqual(hammingWeight(11), 3);
});

test("一个1", () => {
  assert.deepStrictEqual(hammingWeight(128), 1);
});
