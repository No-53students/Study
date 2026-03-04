/**
 * 290. 单词规律 (Word Pattern) - 参考答案
 */

export function wordPattern(pattern, s) {
  const words = s.split(' ');

  if (pattern.length !== words.length) {
    return false;
  }

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    // 检查双向映射
    if (charToWord.has(char) && charToWord.get(char) !== word) {
      return false;
    }
    if (wordToChar.has(word) && wordToChar.get(word) !== char) {
      return false;
    }

    charToWord.set(char, word);
    wordToChar.set(word, char);
  }

  return true;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(wordPattern("abba", "dog cat cat dog"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(wordPattern("abba", "dog cat cat fish"), false);
});

test("示例3", () => {
  assert.deepStrictEqual(wordPattern("aaaa", "dog cat cat dog"), false);
});

test("长度不同", () => {
  assert.deepStrictEqual(wordPattern("abc", "dog cat"), false);
});
