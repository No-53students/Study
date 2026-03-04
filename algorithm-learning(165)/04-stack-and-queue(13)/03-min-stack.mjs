/**
 * 155. 最小栈 (Min Stack)
 * 难度: medium
 *
 * 设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。
 * 
 * 实现 MinStack 类:
 * - MinStack() 初始化堆栈对象。
 * - void push(int val) 将元素val推入堆栈。
 * - void pop() 删除堆栈顶部的元素。
 * - int top() 获取堆栈顶部的元素。
 * - int getMin() 获取堆栈中的最小元素。
 *
 * 示例 1：
 * 输入：
 * ["MinStack","push","push","push","getMin","pop","top","getMin"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 * 
 * 输出：
 * [null,null,null,null,-3,null,0,-2]
 * 
 * 解释：
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin();   --> 返回 -3.
 * minStack.pop();
 * minStack.top();      --> 返回 0.
 * minStack.getMin();   --> 返回 -2.
 *
 * 约束条件:
 * - -2^31 <= val <= 2^31 - 1
 * - pop、top 和 getMin 操作总是在 非空栈 上调用
 * - push、pop、top 和 getMin 最多被调用 3 * 10^4 次
 *
 * 提示:
 *   1. 使用一个辅助栈来存储最小值
 *   2. 每次 push 时，如果新值 <= 当前最小值，也入辅助栈
 *   3. 每次 pop 时，如果弹出值等于辅助栈顶，辅助栈也弹出
 */

export class MinStack {
  constructor() {
    // 在此处初始化

  }

  push(val) {
    // 在此处编写你的代码

  }

  pop() {
    // 在此处编写你的代码

  }

  top() {
    // 在此处编写你的代码

  }

  getMin() {
    // 在此处编写你的代码

  }
}

// ---- 测试用例 ----
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? '✅ 通过' : '❌ 不通过'}`);
  },
};

test("示例1", () => {
  assert.deepStrictEqual(solution(["push","push","push","getMin","pop","top","getMin"], [[-2],[0],[-3],[],[],[],[]]), [null,null,null,-3,null,0,-2]);
});
