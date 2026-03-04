/**
 * 30. 串联所有单词的子串 (Substring with Concatenation of All Words) - 参考答案
 */

export function findSubstring(s, words) {
  if (!s || !words.length) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const totalLen = wordLen * wordCount;
  const result = [];

  // 统计 words 中每个单词的数量
  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // 从 0 到 wordLen-1 开始滑动窗口
  for (let i = 0; i < wordLen; i++) {
    let left = i;
    let count = 0;
    const window = new Map();

    for (let right = i; right <= s.length - wordLen; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (wordMap.has(word)) {
        window.set(word, (window.get(word) || 0) + 1);
        count++;

        // 如果当前单词数量超过需要的数量，收缩窗口
        while (window.get(word) > wordMap.get(word)) {
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }

        // 如果窗口中包含所有单词
        if (count === wordCount) {
          result.push(left);
          // 移动左边界
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }
      } else {
        // 遇到不在 words 中的单词，重置窗口
        window.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(findSubstring("barfoothefoobarman", ["foo","bar"]), [0,9]);
});

test("无解", () => {
  assert.deepStrictEqual(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"]), []);
});

test("多个解", () => {
  assert.deepStrictEqual(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"]), [6,9,12]);
});
