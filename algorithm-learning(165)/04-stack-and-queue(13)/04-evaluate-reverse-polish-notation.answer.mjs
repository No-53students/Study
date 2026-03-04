/**
 * 150. 逆波兰表达式求值 (Evaluate Reverse Polish Notation) - 参考答案
 */

export function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      let result;

      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          // 向零截断
          result = Math.trunc(a / b);
          break;
      }

      stack.push(result);
    } else {
      // 数字，入栈
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(evalRPN(["2","1","+","3","*"]), 9);
});

test("示例2", () => {
  assert.deepStrictEqual(evalRPN(["4","13","5","/","+"]), 6);
});

test("复杂表达式", () => {
  assert.deepStrictEqual(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]), 22);
});
