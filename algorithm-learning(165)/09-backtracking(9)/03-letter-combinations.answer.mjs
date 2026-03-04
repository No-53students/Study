/**
 * 17. 电话号码的字母组合 (Letter Combinations of a Phone Number) - 参考答案
 */

export function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const phone = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result = [];

  const backtrack = (index, path) => {
    if (index === digits.length) {
      result.push(path);
      return;
    }

    const letters = phone[digits[index]];
    for (const letter of letters) {
      backtrack(index + 1, path + letter);
    }
  };

  backtrack(0, '');
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("两数字", () => {
  assert.deepStrictEqual(letterCombinations("23"), ["ad","ae","af","bd","be","bf","cd","ce","cf"]);
});

test("空输入", () => {
  assert.deepStrictEqual(letterCombinations(""), []);
});

test("单数字", () => {
  assert.deepStrictEqual(letterCombinations("2"), ["a","b","c"]);
});
