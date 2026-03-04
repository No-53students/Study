/**
 * 739. 每日温度 (Daily Temperatures)
 * 难度: medium
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 * 示例 1：
 * 输入：temperatures = [73,74,75,71,69,72,76,73]
 * 输出：[1,1,4,2,1,1,0,0]
 * 
 * 示例 2：
 * 输入：temperatures = [30,40,50,60]
 * 输出：[1,1,1,0]
 * 
 * 示例 3：
 * 输入：temperatures = [30,60,90]
 * 输出：[1,1,0]
 *
 * 约束条件:
 * - 1 <= temperatures.length <= 10^5
 * - 30 <= temperatures[i] <= 100
 *
 * 提示:
 *   1. 使用单调递减栈
 *   2. 栈中存储索引而非温度值
 *   3. 遇到更高温度时，弹出栈中所有较小温度的索引
 */

export function dailyTemperatures(temperatures) {
  // 在此处编写代码
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
  assert.deepStrictEqual(dailyTemperatures([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0]);
});

test("递增", () => {
  assert.deepStrictEqual(dailyTemperatures([30,40,50,60]), [1,1,1,0]);
});

test("简单", () => {
  assert.deepStrictEqual(dailyTemperatures([30,60,90]), [1,1,0]);
});
