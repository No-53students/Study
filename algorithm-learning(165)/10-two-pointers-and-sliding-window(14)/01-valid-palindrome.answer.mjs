/**
 * 125. 验证回文串 (Valid Palindrome) - 参考答案
 */

export function isPalindrome(s) {
  // 双指针法
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // 跳过非字母数字字符
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // 比较字符（忽略大小写）
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char) {
  const code = char.charCodeAt(0);
  return (code >= 48 && code <= 57) ||  // 0-9
         (code >= 65 && code <= 90) ||  // A-Z
         (code >= 97 && code <= 122);   // a-z
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(isPalindrome("A man, a plan, a canal: Panama"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isPalindrome("race a car"), false);
});

test("空格", () => {
  assert.deepStrictEqual(isPalindrome(" "), true);
});

test("单字符", () => {
  assert.deepStrictEqual(isPalindrome("a"), true);
});
