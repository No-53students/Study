/**
 * 134. 加油站 (Gas Station) - 参考答案
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
export function solution(gas, cost) {
  let totalGas = 0;
  let currentGas = 0;
  let startIndex = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i] - cost[i];
    currentGas += gas[i] - cost[i];

    if (currentGas < 0) {
      startIndex = i + 1;
      currentGas = 0;
    }
  }

  return totalGas >= 0 ? startIndex : -1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("可以完成", () => {
  assert.deepStrictEqual(solution([1,2,3,4,5], [3,4,5,1,2]), 3);
});

test("无法完成", () => {
  assert.deepStrictEqual(solution([2,3,4], [3,4,3]), -1);
});

test("单站点可完成", () => {
  assert.deepStrictEqual(solution([5], [4]), 0);
});

test("单站点不可完成", () => {
  assert.deepStrictEqual(solution([2], [3]), -1);
});

test("从0开始", () => {
  assert.deepStrictEqual(solution([3,1,1], [1,2,2]), 0);
});
