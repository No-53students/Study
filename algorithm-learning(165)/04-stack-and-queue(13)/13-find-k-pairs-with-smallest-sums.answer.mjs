/**
 * 373. 查找和最小的 K 对数字 (Find K Pairs with Smallest Sums) - 参考答案
 */

export function kSmallestPairs(nums1, nums2, k) {
  const result = [];
  if (nums1.length === 0 || nums2.length === 0) return result;

  // 最小堆：[sum, i, j]
  const heap = [];

  // 初始化：将 nums1 的每个元素与 nums2[0] 配对
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  // 堆化
  const heapify = () => {
    heap.sort((a, b) => a[0] - b[0]);
  };
  heapify();

  while (result.length < k && heap.length > 0) {
    const [sum, i, j] = heap.shift();
    result.push([nums1[i], nums2[j]]);

    // 将 (i, j+1) 加入堆
    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
      heapify();
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(kSmallestPairs([1,7,11], [2,4,6], 3), [[1,2],[1,4],[1,6]]);
});

test("示例2", () => {
  assert.deepStrictEqual(kSmallestPairs([1,1,2], [1,2,3], 2), [[1,1],[1,1]]);
});

test("示例3", () => {
  assert.deepStrictEqual(kSmallestPairs([1,2], [3], 3), [[1,3],[2,3]]);
});
