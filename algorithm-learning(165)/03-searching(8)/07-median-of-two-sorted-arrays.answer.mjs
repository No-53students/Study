/**
 * 4. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays) - 参考答案
 */

export function findMedianSortedArrays(nums1, nums2) {
  // 确保 nums1 是较短的数组
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1];
    const nums1RightMin = i === m ? Infinity : nums1[i];
    const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1];
    const nums2RightMin = j === n ? Infinity : nums2[j];

    if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
      // 找到正确的分割点
      if ((m + n) % 2 === 1) {
        return Math.max(nums1LeftMax, nums2LeftMax);
      } else {
        return (Math.max(nums1LeftMax, nums2LeftMax) +
                Math.min(nums1RightMin, nums2RightMin)) / 2;
      }
    } else if (nums1LeftMax > nums2RightMin) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }

  return 0;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("奇数个元素", () => {
  assert.deepStrictEqual(findMedianSortedArrays([1,3], [2]), 2);
});

test("偶数个元素", () => {
  assert.deepStrictEqual(findMedianSortedArrays([1,2], [3,4]), 2.5);
});
