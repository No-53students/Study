/**
 * 139. 单词拆分 (Word Break) - 参考答案
 */

export function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;

  // dp[i] 表示 s[0...i-1] 是否可以被拆分
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("可拆分", () => {
  assert.deepStrictEqual(wordBreak("leetcode", ["leet","code"]), true);
});

test("重复使用", () => {
  assert.deepStrictEqual(wordBreak("applepenapple", ["apple","pen"]), true);
});

test("不可拆分", () => {
  assert.deepStrictEqual(wordBreak("catsandog", ["cats","dog","sand","and","cat"]), false);
});
