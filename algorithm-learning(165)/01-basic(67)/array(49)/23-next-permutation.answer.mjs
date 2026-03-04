/**
 * 31. 下一个排列 (Next Permutation) - 参考答案
 */

export function nextPermutation(nums) {
  const n = nums.length;

  // 1. 从右向左找第一个升序对 (i, i+1)，即 nums[i] < nums[i+1]
  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // 2. 从右向左找第一个大于 nums[i] 的数
    let j = n - 1;
    while (j > i && nums[j] <= nums[i]) {
      j--;
    }
    // 3. 交换 nums[i] 和 nums[j]
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 4. 反转 i+1 到末尾的部分
  let left = i + 1, right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(nextPermutation([1,2,3]), [1,3,2]);
});

test("示例2", () => {
  assert.deepStrictEqual(nextPermutation([3,2,1]), [1,2,3]);
});

test("示例3", () => {
  assert.deepStrictEqual(nextPermutation([1,1,5]), [1,5,1]);
});

test("中间", () => {
  assert.deepStrictEqual(nextPermutation([1,3,2]), [2,1,3]);
});
