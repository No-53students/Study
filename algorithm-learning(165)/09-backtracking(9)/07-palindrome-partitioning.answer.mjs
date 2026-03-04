/**
 * 131. 分割回文串 (Palindrome Partitioning) - 参考答案
 */

export function partition(s) {
  const result = [];

  const isPalindrome = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  const backtrack = (start, path) => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };

  backtrack(0, []);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例aab", () => {
  assert.deepStrictEqual(partition("aab"), [["a","a","b"],["aa","b"]]);
});

test("单字符", () => {
  assert.deepStrictEqual(partition("a"), [["a"]]);
});
