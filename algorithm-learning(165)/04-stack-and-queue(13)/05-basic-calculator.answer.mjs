/**
 * 224. 基本计算器 (Basic Calculator) - 参考答案
 */

export function calculate(s) {
  const stack = [];
  let result = 0;
  let number = 0;
  let sign = 1; // 1 表示正，-1 表示负

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      // 构建多位数
      number = number * 10 + (char.charCodeAt(0) - 48);
    } else if (char === '+') {
      result += sign * number;
      number = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * number;
      number = 0;
      sign = -1;
    } else if (char === '(') {
      // 保存当前结果和符号
      stack.push(result);
      stack.push(sign);
      // 重置
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * number;
      number = 0;
      // 恢复括号前的符号和结果
      result *= stack.pop(); // 符号
      result += stack.pop(); // 之前的结果
    }
    // 空格跳过
  }

  // 处理最后一个数
  result += sign * number;

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(calculate("1 + 1"), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(calculate(" 2-1 + 2 "), 3);
});

test("带括号", () => {
  assert.deepStrictEqual(calculate("(1+(4+5+2)-3)+(6+8)"), 23);
});

test("负号", () => {
  assert.deepStrictEqual(calculate("- (3 + (4 + 5))"), -12);
});
