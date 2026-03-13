// node ./24-two-sum.mjs
/**
 * 1. 两数之和 (Two Sum)
 * 难度: easy
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。
 * 
 * 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
 * 
 * 你可以按任意顺序返回答案。
 *
 * 示例 1：
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 * 
 * 示例 2：
 * 输入：nums = [3,2,4], target = 6
 * 输出：[1,2]
 * 
 * 示例 3：
 * 输入：nums = [3,3], target = 6
 * 输出：[0,1]
 *
 * 约束条件:
 * - 2 <= nums.length <= 10^4
 * - -10^9 <= nums[i] <= 10^9
 * - -10^9 <= target <= 10^9
 * - 只会存在一个有效答案
 * 
 * 进阶： 你可以想出一个时间复杂度小于 O(n²) 的算法吗？
 *
 * 提示:
 *   1. 暴力解法需要 O(n²) 时间，可以用哈希表优化
 *   2. 遍历数组，对于每个数，检查 target - nums[i] 是否在哈希表中
 *   3. 边遍历边添加到哈希表
 */

export function twoSum(nums, target) {
  // 当前方案：暴力枚举，时间 O(n²)，空间 O(1)
  //   对每个 nums[i]，从 i+1 往后找补数 target - nums[i]
  //   j 从 i+1 开始，保证不重复使用同一元素
  for (let i = 0; i < nums.length; i++){
    const needVal = target - nums[i];
    for (let j = i + 1; j < nums.length; j++ ){
      if (nums[j] == needVal) {
        return [i, j]
      }
    }
  }
}

// ⚡ 进阶优化：哈希表，时间 O(n)，空间 O(n)
//   思路：边遍历边记录「已见过的值→索引」，
//         对每个 nums[i]，先查 map 里有没有需要的补数，
//         有则直接返回，没有则把当前值存入 map。
//   一趟遍历即可，无需嵌套循环。
//
//   function twoSum(nums, target) {
//     const map = {};         // { 值: 索引 }
//     for (let i = 0; i < nums.length; i++) {
//       const need = target - nums[i];
//       if (map[need] !== undefined) {
//         return [map[need], i];
//       }
//       map[nums[i]] = i;
//     }
//   }

// ---- 测试用例 ----
console.log("\n📝 题目: 1. 两数之和 (Two Sum)");
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
  assert.deepStrictEqual(twoSum([2,7,11,15], 9), [0,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(twoSum([3,2,4], 6), [1,2]);
});

test("相同元素", () => {
  assert.deepStrictEqual(twoSum([3,3], 6), [0,1]);
});

test("负数", () => {
  assert.deepStrictEqual(twoSum([-1,-2,-3,-4,-5], -8), [2,4]);
});
