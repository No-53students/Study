/**
 * 274. H 指数 (H-Index) - 参考答案
 */

/**
 * @param {number[]} citations
 * @return {number}
 */
export function solution(citations) {
  citations.sort((a, b) => b - a);

  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      h = i + 1;
    } else {
      break;
    }
  }

  return h;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([3,0,6,1,5]), 3);
});

test("简单情况", () => {
  assert.deepStrictEqual(solution([1,3,1]), 1);
});

test("全0", () => {
  assert.deepStrictEqual(solution([0,0,0]), 0);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([100]), 1);
});

test("相同值", () => {
  assert.deepStrictEqual(solution([5,5,5,5,5]), 5);
});
