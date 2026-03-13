// node ./04-remove-duplicates-from-sorted-array-ii.mjs
/**
 * 80. 删除有序数组中的重复项 II (Remove Duplicates from Sorted Array II)
 * 难度: medium
 *
 * 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
 * 
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 *
 * 示例 1：
 * 输入：nums = [1,1,1,2,2,3]
 * 输出：5, nums = [1,1,2,2,3,_]
 * 解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
 * 
 * 示例 2：
 * 输入：nums = [0,0,1,1,1,1,2,3,3]
 * 输出：7, nums = [0,0,1,1,2,3,3,_,_]
 * 解释：函数应返回新长度 length = 7, 并且原数组的前七个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
 *
 * 约束条件:
 * - 1 <= nums.length <= 3 * 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums 已按升序排列
 *
 * 提示:
 *   1. 这是「删除有序数组中的重复项」的进阶版
 *   2. 保持最多 k=2 个重复元素
 *   3. 关键：比较 nums[fast] 和 nums[slow - k]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  // 在这里编写你的代码
  let slowIndex = -2;
  nums.forEach((item, index) => {
    // 从第0个位置开始对比，如果不相等就存入这个位置。
    if (item !== nums[slowIndex]) {
      nums[slowIndex+2] = item;
      slowIndex++;
    }
  })
  console.log('输出的结果', nums)
  return slowIndex+2;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 80. 删除有序数组中的重复项 II (Remove Duplicates from Sorted Array II)");
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
  assert.deepStrictEqual(solution([1,1,1,2,2,3]), 5);
});

test("多种重复", () => {
  assert.deepStrictEqual(solution([0,0,1,1,1,1,2,3,3]), 7);
});

test("无需删除", () => {
  assert.deepStrictEqual(solution([1,1,2,2,3,3]), 6);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([1,1]), 2);
});
