/**
 * 78. 子集 (Subsets) - 参考答案
 */

export function subsets(nums) {
  const result = [];

  const backtrack = (start, path) => {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };

  backtrack(0, []);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("三元素", () => {
  assert.deepStrictEqual(subsets([[1,2,3]]), [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]);
});

test("单元素", () => {
  assert.deepStrictEqual(subsets([[0]]), [[],[0]]);
});
