/**
 * 875. 爱吃香蕉的珂珂 (Koko Eating Bananas)
 * 难度: medium
 *
 * 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
 * 
 * 珂珂可以决定她吃香蕉的速度 k（单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 * 
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 * 
 * 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。
 *
 * 示例 1：
 * 输入：piles = [3,6,7,11], h = 8
 * 输出：4
 * 
 * 示例 2：
 * 输入：piles = [30,11,23,4,20], h = 5
 * 输出：30
 * 
 * 示例 3：
 * 输入：piles = [30,11,23,4,20], h = 6
 * 输出：23
 *
 * 约束条件:
 * - 1 <= piles.length <= 10^4
 * - piles.length <= h <= 10^9
 * - 1 <= piles[i] <= 10^9
 *
 * 提示:
 *   1. 二分查找速度 k
 *   2. 检查以速度 k 能否在 h 小时内吃完
 *   3. 速度范围是 [1, max(piles)]
 */

export function minEatingSpeed(piles, h) {
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
  assert.deepStrictEqual(minEatingSpeed([3,6,7,11], 8), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(minEatingSpeed([30,11,23,4,20], 5), 30);
});

test("示例3", () => {
  assert.deepStrictEqual(minEatingSpeed([30,11,23,4,20], 6), 23);
});
