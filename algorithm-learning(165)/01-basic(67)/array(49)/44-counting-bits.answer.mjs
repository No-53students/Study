/**
 * 338. 比特位计数 (Counting Bits) - 参考答案
 */

export function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // i & (i-1) 消除最低位的 1
    // 所以 ans[i] = ans[i & (i-1)] + 1
    ans[i] = ans[i & (i - 1)] + 1;
  }
  return ans;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("n=2", () => {
  assert.deepStrictEqual(countBits(2), [0,1,1]);
});

test("n=5", () => {
  assert.deepStrictEqual(countBits(5), [0,1,1,2,1,2]);
});
