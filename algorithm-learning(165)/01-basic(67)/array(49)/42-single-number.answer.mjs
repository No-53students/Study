/**
 * 136. 只出现一次的数字 (Single Number) - 参考答案
 */

export function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(singleNumber([[2,2,1]]), 1);
});

test("示例2", () => {
  assert.deepStrictEqual(singleNumber([[4,1,2,1,2]]), 4);
});

test("单元素", () => {
  assert.deepStrictEqual(singleNumber([[1]]), 1);
});
