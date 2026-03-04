/**
 * 150. 逆波兰表达式求值 (Evaluate Reverse Polish Notation)
 * 难度: medium
 *
 * 给你一个字符串数组 tokens，表示一个根据 逆波兰表示法 表示的算术表达式。
 * 
 * 请你计算该表达式。返回一个表示表达式值的整数。
 * 
 * 注意：
 * - 有效的算符为 '+'、'-'、'*' 和 '/'。
 * - 每个操作数（运算对象）都可以是一个整数或者另一个表达式。
 * - 两个整数之间的除法总是 向零截断。
 * - 表达式中不含除零运算。
 * - 输入是一个根据逆波兰表示法表示的算术表达式。
 * - 答案及所有中间计算结果可以用 32 位 整数表示。
 *
 * 示例 1：
 * 输入：tokens = ["2","1","+","3","*"]
 * 输出：9
 * 解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
 * 
 * 示例 2：
 * 输入：tokens = ["4","13","5","/","+"]
 * 输出：6
 * 解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
 * 
 * 示例 3：
 * 输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
 * 输出：22
 * 解释：该算式转化为常见的中缀算术表达式为：
 *   ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
 * = ((10 * (6 / (12 * -11))) + 17) + 5
 * = ((10 * (6 / -132)) + 17) + 5
 * = ((10 * 0) + 17) + 5
 * = (0 + 17) + 5
 * = 17 + 5
 * = 22
 *
 * 约束条件:
 * - 1 <= tokens.length <= 10^4
 * - tokens[i] 是一个算符（"+"、"-"、"*" 或 "/"），或是在范围 [-200, 200] 内的一个整数
 *
 * 提示:
 *   1. 使用栈存储操作数
 *   2. 遇到数字入栈
 *   3. 遇到运算符，弹出两个数进行运算，结果入栈
 */

export function evalRPN(tokens) {
  // 在此处编写你的代码

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
  assert.deepStrictEqual(evalRPN(["2","1","+","3","*"]), 9);
});

test("示例2", () => {
  assert.deepStrictEqual(evalRPN(["4","13","5","/","+"]), 6);
});

test("复杂表达式", () => {
  assert.deepStrictEqual(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]), 22);
});
