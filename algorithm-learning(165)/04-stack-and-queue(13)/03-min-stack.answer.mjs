/**
 * 155. 最小栈 (Min Stack) - 参考答案
 */

export class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // 辅助栈，存储当前最小值
  }

  push(val) {
    this.stack.push(val);
    // 如果辅助栈为空，或者新值 <= 当前最小值，入辅助栈
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    // 如果弹出的是当前最小值，辅助栈也要弹出
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(solution(["push","push","push","getMin","pop","top","getMin"], [[-2],[0],[-3],[],[],[],[]]), [null,null,null,-3,null,0,-2]);
});
