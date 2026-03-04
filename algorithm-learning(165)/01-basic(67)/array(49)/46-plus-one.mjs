/**
 * 66. 加一 (Plus One)
 * 难度: easy
 *
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 
 * 最高位数字存放在数组的首位，数组中每个元素只存储 单个 数字。
 * 
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 *
 * 示例 1：
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 * 解释：输入数组表示数字 123。
 * 
 * 示例 2：
 * 输入：digits = [4,3,2,1]
 * 输出：[4,3,2,2]
 * 解释：输入数组表示数字 4321。
 * 
 * 示例 3：
 * 输入：digits = [9]
 * 输出：[1,0]
 *
 * 约束条件:
 * - 1 <= digits.length <= 100
 * - 0 <= digits[i] <= 9
 *
 * 提示:
 *   1. 从最低位开始处理进位
 *   2. 如果当前位小于 9，直接加 1 返回
 *   3. 如果是 9，变成 0 继续向前进位
 */

export function plusOne(digits) {
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
  assert.deepStrictEqual(plusOne([[1,2,3]]), [1,2,4]);
});

test("示例2", () => {
  assert.deepStrictEqual(plusOne([[4,3,2,1]]), [4,3,2,2]);
});

test("进位", () => {
  assert.deepStrictEqual(plusOne([[9]]), [1,0]);
});
