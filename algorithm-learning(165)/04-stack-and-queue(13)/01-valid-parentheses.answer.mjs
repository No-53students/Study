/**
 * 20. 有效的括号 (Valid Parentheses) - 参考答案
 */

export function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      // 左括号入栈
      stack.push(char);
    } else {
      // 右括号，检查栈顶是否匹配
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  // 栈为空说明全部匹配
  return stack.length === 0;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";
