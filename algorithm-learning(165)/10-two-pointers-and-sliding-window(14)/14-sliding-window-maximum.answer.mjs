/**
 * 239. 滑动窗口最大值 (Sliding Window Maximum) - 参考答案
 */

export function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // 存储索引，保持对应值单调递减

  for (let i = 0; i < nums.length; i++) {
    // 移除队列中所有小于当前元素的值
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 移除超出窗口范围的元素
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // 当窗口形成后，记录最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7]);
});

test("单元素", () => {
  assert.deepStrictEqual(maxSlidingWindow([1], 1), [1]);
});

test("递减", () => {
  assert.deepStrictEqual(maxSlidingWindow([9,8,7,6,5], 3), [9,8,7]);
});

test("递增", () => {
  assert.deepStrictEqual(maxSlidingWindow([1,2,3,4,5], 3), [3,4,5]);
});
