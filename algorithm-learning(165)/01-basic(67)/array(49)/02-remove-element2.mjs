// node ./02-remove-element2.mjs
/**
 * 27. 移除元素 (Remove Element)
 * 难度: easy
 *
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。
 * 
 * 假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：
 * 
 * - 更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。nums 的其余元素和 nums 的大小并不重要。
 * - 返回 k。
 *
 * 示例 1：
 * 输入：nums = [3,2,2,3], val = 3
 * 输出：2, nums = [2,2,_,_]
 * 解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。
 * 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
 * 
 * 示例 2：
 * 输入：nums = [0,1,2,2,3,0,4,2], val = 2
 * 输出：5, nums = [0,1,4,0,3,_,_,_]
 * 解释：你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,1,3,0,4。
 * 注意这五个元素可以任意顺序返回。
 * 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
 *
 * 约束条件:
 * - 0 <= nums.length <= 100
 * - 0 <= nums[i] <= 50
 * - 0 <= val <= 100
 *
 * 提示:
 *   1. 使用双指针技巧
 *   2. 快指针遍历数组，慢指针指向下一个要填充的位置
 *   3. 当快指针指向的元素不等于 val 时，将其复制到慢指针位置
 */

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
export function solution(nums, val) {
  let slowIndex = 0;
  for (let i = 0; i < nums.length; i++){
    if (nums[i] !== val) {
      nums[slowIndex] = nums[i];
      slowIndex++;
    }
  }

  return slowIndex;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 27. 移除元素 (Remove Element)");
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

test("基本测试", () => {
  assert.deepStrictEqual(solution([3,2,2,3], 3), 2);
});

test("多个目标值", () => {
  assert.deepStrictEqual(solution([0,1,2,2,3,0,4,2], 2), 5);
});

test("空数组", () => {
  assert.deepStrictEqual(solution([], 1), 0);
});

test("无匹配", () => {
  assert.deepStrictEqual(solution([1,2,3], 4), 3);
});

test("全部匹配", () => {
  assert.deepStrictEqual(solution([2,2,2], 2), 0);
});
