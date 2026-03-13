/**
 * 55. 跳跃游戏 (Jump Game) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 贪心算法（全局视角）：记录"从起点出发最远能到哪个坐标"
// maxReach 是绝对坐标，直接和 i 比大小即可判断当前位置是否可达
//
// 示例: nums = [2, 3, 1, 1, 4]
// i=0: maxReach = max(0, 0+2) = 2  （从位置0最远跳到位置2）
// i=1: maxReach = max(2, 1+3) = 4  （从位置1最远跳到位置4，已到终点！）
//
// 示例: nums = [3, 2, 1, 0, 4]
// i=0: maxReach = max(0, 0+3) = 3
// i=1: maxReach = max(3, 1+2) = 3
// i=2: maxReach = max(3, 2+1) = 3
// i=3: maxReach = max(3, 3+0) = 3  （卡在位置3，跳不动）
// i=4: 4 > 3，当前位置不可达 → false
export function solution(nums) {
  // maxReach: 从位置0出发，当前最远能到达的索引
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    // 如果当前位置 i 超过了最远距离，说明走不到这里，直接失败
    if (i > maxReach) return false;
    // 从位置 i 能跳到 i + nums[i]，取最大值更新 maxReach
    maxReach = Math.max(maxReach, i + nums[i]);
    // 最远距离已经覆盖终点，提前返回成功
    if (maxReach >= nums.length - 1) return true;
  }

  return true;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("可以到达", () => {
  assert.deepStrictEqual(solution([2,3,1,1,4]), true);
});

test("无法到达", () => {
  assert.deepStrictEqual(solution([3,2,1,0,4]), false);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([0]), true);
});

test("直接跳到", () => {
  assert.deepStrictEqual(solution([5,0,0,0,0]), true);
});

test("每步只能跳1", () => {
  assert.deepStrictEqual(solution([1,1,1,1]), true);
});
