/**
 * 763. 划分字母区间 (Partition Labels) - 参考答案
 */

export function partitionLabels(s) {
  // 记录每个字母最后出现的位置
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  const result = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    // 更新当前片段的结束位置
    end = Math.max(end, lastIndex[s[i]]);

    // 如果当前位置等于结束位置，说明可以划分
    if (i === end) {
      result.push(end - start + 1);
      start = end + 1;
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(partitionLabels("ababcbacadefegdehijhklij"), [9,7,8]);
});

test("示例2", () => {
  assert.deepStrictEqual(partitionLabels("eccbbbbdec"), [10]);
});

test("每字母一段", () => {
  assert.deepStrictEqual(partitionLabels("abc"), [1,1,1]);
});
