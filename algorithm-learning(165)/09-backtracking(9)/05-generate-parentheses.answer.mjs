/**
 * 22. 括号生成 (Generate Parentheses) - 参考答案
 */

export function generateParenthesis(n) {
  const result = [];

  const backtrack = (str, open, close) => {
    if (str.length === 2 * n) {
      result.push(str);
      return;
    }

    // 只要左括号没用完，就可以加左括号
    if (open < n) {
      backtrack(str + '(', open + 1, close);
    }

    // 只有右括号数量小于左括号时，才能加右括号
    if (close < open) {
      backtrack(str + ')', open, close + 1);
    }
  };

  backtrack('', 0, 0);
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("三对括号", () => {
  assert.deepStrictEqual(generateParenthesis(3), ["((()))","(()())","(())()","()(())","()()()"]);
});

test("一对括号", () => {
  assert.deepStrictEqual(generateParenthesis(1), ["()"]);
});
