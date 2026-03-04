/**
 * 452. 用最少数量的箭引爆气球 (Minimum Number of Arrows to Burst Balloons) - 参考答案
 */

export function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  // 按终点排序
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let end = points[0][1];

  for (let i = 1; i < points.length; i++) {
    // 如果当前气球的起点大于上一支箭的位置，需要新的一支箭
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }

  return arrows;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]]), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]]), 4);
});

test("示例3", () => {
  assert.deepStrictEqual(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]]), 2);
});

test("单气球", () => {
  assert.deepStrictEqual(findMinArrowShots([[1,2]]), 1);
});
