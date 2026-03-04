/**
 * 438. 找到字符串中所有字母异位词 (Find All Anagrams in a String) - 参考答案
 */

export function findAnagrams(s, p) {
  const result = [];
  const sLen = s.length;
  const pLen = p.length;

  if (sLen < pLen) return result;

  const count = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  // 计算初始差异
  for (let i = 0; i < pLen; i++) {
    count[p.charCodeAt(i) - aCode]--;
    count[s.charCodeAt(i) - aCode]++;
  }

  // 统计差异数量
  let diff = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) diff++;
  }

  if (diff === 0) result.push(0);

  // 滑动窗口
  for (let i = pLen; i < sLen; i++) {
    const addIdx = s.charCodeAt(i) - aCode;
    const removeIdx = s.charCodeAt(i - pLen) - aCode;

    if (count[addIdx] === 0) diff++;
    count[addIdx]++;
    if (count[addIdx] === 0) diff--;

    if (count[removeIdx] === 0) diff++;
    count[removeIdx]--;
    if (count[removeIdx] === 0) diff--;

    if (diff === 0) result.push(i - pLen + 1);
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(findAnagrams("cbaebabacd", "abc"), [0,6]);
});

test("示例2", () => {
  assert.deepStrictEqual(findAnagrams("abab", "ab"), [0,1,2]);
});

test("无匹配", () => {
  assert.deepStrictEqual(findAnagrams("hello", "xyz"), []);
});

test("完全匹配", () => {
  assert.deepStrictEqual(findAnagrams("abc", "abc"), [0]);
});
