// node ./10-jump-game-ii2.mjs
/**
 * 45. 跳跃游戏 II (Jump Game II)
 * 难度: medium
 *
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
 *
 * 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
 *
 * - 0 <= j <= nums[i]
 * - i + j < n
 *
 * 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 *
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：2
 * 解释：跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 * 示例 2：
 * 输入：nums = [2,3,0,1,4]
 * 输出：2
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 1000
 * - 题目保证可以到达 nums[n-1]
 *
 * 提示:
 *   1. 贪心：在当前跳跃范围内，找能跳得最远的位置
 *   2. 当到达当前跳跃的边界时，必须跳一次
 *   3. 更新边界为之前记录的最远位置
 */

import { count } from "node:console";

/**
 * @param {number[]} nums
 * @return {number}
 */

export function solution(nums) {
  let steps = 0;
  let count = 0;
  let maxConut = count;
  for (let i = 0; i < nums.length-1; i++) {
    // 可以窥探的距离
    let nextCount = nums[i] + i;
    // 大于当前当前位置的距离
    if (nextCount > maxConut) {
      maxConut = nextCount;
    }
    if (count === i) {
      count = maxConut;
      steps++;
    }
  }
  return steps;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 45. 跳跃游戏 II (Jump Game II)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(
      `结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? "✅ 通过" : "❌ 不通过"}`,
    );
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? "✅ 通过" : "❌ 不通过"}`);
  },
};

test("基本测试", () => {
  assert.deepStrictEqual(solution([2, 3, 1, 1, 4]), 2);
});

test("有0的情况", () => {
  assert.deepStrictEqual(solution([2, 3, 0, 1, 4]), 2);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([0]), 0);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([2, 1]), 1);
});

test("一步到位", () => {
  assert.deepStrictEqual(solution([5, 1, 1, 1, 1]), 1);
});

test("场景1", () => {
  assert.deepStrictEqual(solution([2, 1, 1, 1, 1]), 3);
});
