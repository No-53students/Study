/**
 * 202. 快乐数 (Happy Number)
 * 难度: easy
 *
 * 编写一个算法来判断一个数 n 是不是快乐数。
 * 
 * 「快乐数」 定义为：
 * - 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 * - 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 * - 如果这个过程 结果为 1，那么这个数就是快乐数。
 * 
 * 如果 n 是 *快乐数* 就返回 true；不是，则返回 false。
 *
 * 示例 1：
 * 输入：n = 19
 * 输出：true
 * 解释：
 * 1² + 9² = 82
 * 8² + 2² = 68
 * 6² + 8² = 100
 * 1² + 0² + 0² = 1
 * 
 * 示例 2：
 * 输入：n = 2
 * 输出：false
 *
 * 约束条件:
 * - 1 <= n <= 2^31 - 1
 *
 * 提示:
 *   1. 如果不是快乐数，会进入无限循环
 *   2. 使用哈希表记录已经出现过的数，检测循环
 *   3. 也可以使用快慢指针检测循环
 */

export function isHappy(n) {
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
  assert.deepStrictEqual(isHappy(19), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isHappy(2), false);
});

test("1", () => {
  assert.deepStrictEqual(isHappy(1), true);
});

test("7", () => {
  assert.deepStrictEqual(isHappy(7), true);
});
