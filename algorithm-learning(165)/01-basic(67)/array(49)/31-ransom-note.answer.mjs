/**
 * 383. 赎金信 (Ransom Note) - 参考答案
 */

export function canConstruct(ransomNote, magazine) {
  const count = new Array(26).fill(0);

  // 统计 magazine 中每个字符的数量
  for (const char of magazine) {
    count[char.charCodeAt(0) - 97]++;
  }

  // 检查 ransomNote 中的字符是否足够
  for (const char of ransomNote) {
    const index = char.charCodeAt(0) - 97;
    if (count[index] === 0) {
      return false;
    }
    count[index]--;
  }

  return true;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(canConstruct("a", "b"), false);
});

test("示例2", () => {
  assert.deepStrictEqual(canConstruct("aa", "ab"), false);
});

test("示例3", () => {
  assert.deepStrictEqual(canConstruct("aa", "aab"), true);
});

test("相同字符串", () => {
  assert.deepStrictEqual(canConstruct("abc", "abc"), true);
});
