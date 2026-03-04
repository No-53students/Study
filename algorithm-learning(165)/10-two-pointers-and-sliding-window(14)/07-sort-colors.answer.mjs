/**
 * 75. 颜色分类 (Sort Colors) - 参考答案
 */

export function sortColors(nums: number[]): void {
  let p0 = 0, p2 = nums.length - 1;
  let curr = 0;

  while (curr <= p2) {
    if (nums[curr] === 0) {
      [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
      p0++;
      curr++;
    } else if (nums[curr] === 2) {
      [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
      p2--;
      // 注意：curr 不增加，因为交换来的元素还需要处理
    } else {
      curr++;
    }
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("标准情况", () => {
  assert.deepStrictEqual(sortColors([2,0,2,1,1,0]), [0,0,1,1,2,2]);
});

test("简单情况", () => {
  assert.deepStrictEqual(sortColors([2,0,1]), [0,1,2]);
});
