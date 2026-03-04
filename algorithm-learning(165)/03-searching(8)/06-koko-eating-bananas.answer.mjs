/**
 * 875. 爱吃香蕉的珂珂 (Koko Eating Bananas) - 参考答案
 */

export function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  const canFinish = (speed) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canFinish(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(minEatingSpeed([3,6,7,11], 8), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(minEatingSpeed([30,11,23,4,20], 5), 30);
});

test("示例3", () => {
  assert.deepStrictEqual(minEatingSpeed([30,11,23,4,20], 6), 23);
});
