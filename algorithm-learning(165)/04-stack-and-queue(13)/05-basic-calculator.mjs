/**
 * 224. 基本计算器 (Basic Calculator)
 * 难度: hard
 *
 * 给你一个字符串表达式 s，请你实现一个基本计算器来计算并返回它的值。
 * 
 * 注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval()。
 *
 * 示例 1：
 * 输入：s = "1 + 1"
 * 输出：2
 * 
 * 示例 2：
 * 输入：s = " 2-1 + 2 "
 * 输出：3
 * 
 * 示例 3：
 * 输入：s = "(1+(4+5+2)-3)+(6+8)"
 * 输出：23
 *
 * 约束条件:
 * - 1 <= s.length <= 3 * 10^5
 * - s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
 * - s 表示一个有效的表达式
 * - '+' 不能用作一元运算（例如，"+1" 和 "+(2 + 3)" 无效）
 * - '-' 可以用作一元运算（即 "-1" 和 "-(2 + 3)" 是有效的）
 * - 输入中不存在两个连续的操作符
 * - 每个数字和运行的计算将适合于一个有符号的 32 位整数
 *
 * 提示:
 *   1. 使用栈处理括号
 *   2. 遇到左括号，保存当前结果和符号入栈
 *   3. 遇到右括号，计算括号内结果，与栈中保存的结果合并
 */

export function calculate(s) {
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
