/**
 * 57. 插入区间 (Insert Interval) - 参考答案
 */

export function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // 添加所有在 newInterval 之前的区间
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // 合并所有与 newInterval 重叠的区间
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // 添加所有在 newInterval 之后的区间
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(insert([[1,3],[6,9]], [2,5]), [[1,5],[6,9]]);
});

test("示例2", () => {
  assert.deepStrictEqual(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]), [[1,2],[3,10],[12,16]]);
});

test("空数组", () => {
  assert.deepStrictEqual(insert([], [5,7]), [[5,7]]);
});

test("无重叠-前", () => {
  assert.deepStrictEqual(insert([[3,5]], [1,2]), [[1,2],[3,5]]);
});
