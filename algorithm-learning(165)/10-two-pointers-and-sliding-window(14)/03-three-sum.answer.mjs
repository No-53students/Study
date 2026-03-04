/**
 * 15. 三数之和 (3Sum) - 参考答案
 */

export function threeSum(nums) {
  const result = [];
  const n = nums.length;

  // 先排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 2; i++) {
    // 跳过重复的第一个数
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // 如果最小的三个数之和都大于0，后面不可能有解
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) {
      break;
    }

    // 如果当前数与最大的两个数之和都小于0，跳过
    if (nums[i] + nums[n - 2] + nums[n - 1] < 0) {
      continue;
    }

    // 双指针找另外两个数
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // 跳过重复的左指针
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        // 跳过重复的右指针
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(threeSum([-1,0,1,2,-1,-4]), [[-1,-1,2],[-1,0,1]]);
});

test("无解", () => {
  assert.deepStrictEqual(threeSum([0,1,1]), []);
});

test("全零", () => {
  assert.deepStrictEqual(threeSum([0,0,0]), [[0,0,0]]);
});

test("多个解", () => {
  assert.deepStrictEqual(threeSum([-2,0,1,1,2]), [[-2,0,2],[-2,1,1]]);
});
