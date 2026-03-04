/**
 * 46. 全排列 (Permutations) - 参考答案
 */

export function permute(nums) {
  const result = [];

  const backtrack = (path, used) => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      path.push(nums[i]);
      used[i] = true;

      backtrack(path, used);

      path.pop();
      used[i] = false;
    }
  };

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("三元素", () => {
  assert.deepStrictEqual(permute([[1,2,3]]), [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]);
});

test("两元素", () => {
  assert.deepStrictEqual(permute([[0,1]]), [[0,1],[1,0]]);
});

test("单元素", () => {
  assert.deepStrictEqual(permute([[1]]), [[1]]);
});
