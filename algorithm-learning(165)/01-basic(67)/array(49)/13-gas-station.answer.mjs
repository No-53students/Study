/**
 * 134. 加油站 (Gas Station) - 参考答案
 */

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
// 贪心算法：一次遍历找起点
//
// 【核心思路】
// 每个站点的"净收益" = gas[i] - cost[i]（加的油 - 消耗的油）
// 从某个起点出发，累加净收益，如果中途油量 < 0，说明这段路走不通
//
// 【关键性质】
// 如果从 i 出发到不了 j（累计油量 < 0），那么 i~j 之间任何站点出发也到不了 j
// 原因：从 i 到达中间站 k 时油量 >= 0，比从 k 空油箱出发更好，连这样都走不到 j，
//       从 k 直接出发更不行
// 所以可以直接跳到 j+1 重新开始，不用逐个尝试
//
// 【三个变量】
// totalGas：全程总净收益，< 0 说明油不够走完一圈，直接返回 -1
// currentGas：从 startIndex 出发到当前的累计油量
// startIndex：候选起点
//
// 【示例】gas=[1,2,3,4,5], cost=[3,4,5,1,2], 净收益=[-2,-2,-2,3,3]
// i=0: currentGas=-2 < 0 → startIndex=1, 清零
// i=1: currentGas=-2 < 0 → startIndex=2, 清零
// i=2: currentGas=-2 < 0 → startIndex=3, 清零
// i=3: currentGas= 3 ≥ 0 → 继续
// i=4: currentGas= 6 ≥ 0 → 继续
// totalGas=0 ≥ 0，有解，答案 startIndex=3
export function solution(gas, cost) {
  let totalGas = 0;    // 全程总油量，判断是否有解
  let currentGas = 0;  // 从 startIndex 出发的当前油量
  let startIndex = 0;  // 候选起点

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i] - cost[i];
    currentGas += gas[i] - cost[i];

    // 油量 < 0，从 startIndex 到 i 之间都不行，换起点到 i+1
    if (currentGas < 0) {
      startIndex = i + 1;
      currentGas = 0;  // 油量清零重新开始
    }
  }

  // 总油量 >= 0 才有解
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
