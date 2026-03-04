/**
 * 137. 只出现一次的数字 II (Single Number II) - 参考答案
 */

export function singleNumber(nums) {
  let ones = 0, twos = 0;
  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }
  return ones;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(singleNumber([[2,2,3,2]]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(singleNumber([[0,1,0,1,0,1,99]]), 99);
});
