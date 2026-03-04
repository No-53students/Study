/**
 * 39. 组合总和 (Combination Sum) - 参考答案
 */

export function combinationSum(candidates, target) {
  const result = [];

  const backtrack = (start, path, remaining) => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      // 可以重复使用，所以传入 i 而不是 i + 1
      backtrack(i, path, remaining - candidates[i]);
      path.pop();
    }
  };

  backtrack(0, [], target);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(combinationSum([2,3,6,7], 7), [[2,2,3],[7]]);
});

test("示例2", () => {
  assert.deepStrictEqual(combinationSum([2,3,5], 8), [[2,2,2,2],[2,3,3],[3,5]]);
});

test("无解", () => {
  assert.deepStrictEqual(combinationSum([2], 1), []);
});
