/**
 * 56. 合并区间 (Merge Intervals) - 参考答案
 */

export function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // 按起点排序
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      // 有重叠，合并
      last[1] = Math.max(last[1], current[1]);
    } else {
      // 无重叠，添加新区间
      result.push(current);
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(merge([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]]);
});

test("示例2", () => {
  assert.deepStrictEqual(merge([[1,4],[4,5]]), [[1,5]]);
});

test("无重叠", () => {
  assert.deepStrictEqual(merge([[1,2],[3,4]]), [[1,2],[3,4]]);
});

test("完全重叠", () => {
  assert.deepStrictEqual(merge([[1,4],[2,3]]), [[1,4]]);
});
