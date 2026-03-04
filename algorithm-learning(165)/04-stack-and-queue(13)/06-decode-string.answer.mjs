/**
 * 394. 字符串解码 (Decode String) - 参考答案
 */

export function decodeString(s) {
  const numStack = [];
  const strStack = [];
  let currentStr = '';
  let currentNum = 0;

  for (const char of s) {
    if (char >= '0' && char <= '9') {
      currentNum = currentNum * 10 + parseInt(char);
    } else if (char === '[') {
      numStack.push(currentNum);
      strStack.push(currentStr);
      currentNum = 0;
      currentStr = '';
    } else if (char === ']') {
      const num = numStack.pop();
      const prevStr = strStack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(decodeString("3[a]2[bc]"), "aaabcbc");
});

test("嵌套", () => {
  assert.deepStrictEqual(decodeString("3[a2[c]]"), "accaccacc");
});

test("混合", () => {
  assert.deepStrictEqual(decodeString("2[abc]3[cd]ef"), "abcabccdcdcdef");
});
