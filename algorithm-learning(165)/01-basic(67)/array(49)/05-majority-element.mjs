// node ./05-majority-element.mjs
/**
 * 169. 多数元素 (Majority Element)
 * 难度: easy
 *
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 *
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 * 示例 1：
 * 输入：nums = [3,2,3]
 * 输出：3
 *
 * 示例 2：
 * 输入：nums = [2,2,1,1,1,2,2]
 * 输出：2
 *
 * 约束条件:
 * - n == nums.length
 * - 1 <= n <= 5 * 10^4
 * - -10^9 <= nums[i] <= 10^9
 *
 * 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 *
 * 提示:
 *   1. 可以使用哈希表统计每个元素的出现次数
 *   2. 排序后中间的元素一定是多数元素
 *   3. Boyer-Moore 投票算法可以达到 O(1) 空间
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  // 在这里编写你的代码
  const countMap = new Map();
  const midIndex = nums.length / 2;
  let resValue = undefined;
  nums.forEach((item, index) => {
    console.log("map读取", item, countMap.get(item) || 0);
    const countNum = countMap.get(item) || 0;
    countMap.set(item, (countMap.get(item) || 0) + 1);
    console.log("map设置", item, countMap.get(item) || 0);
    if (countMap.get(item) > midIndex) {
      console.log("获取到的答案", item);
      resValue = item;
    }
  });
  // console.log("countMap", countMap);
  // console.log("数据中数", midIndex);
  // nums.forEach((key, value) => {
  //   console.log("读取统计数据", value, key);
  //   if (value > midIndex) {
  //     console.log("获取到的答案2", key);
  //     resValue = key;
  //   }
  // });

  return resValue;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 169. 多数元素 (Majority Element)");
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
  assert.deepStrictEqual(solution([3, 2, 3]), 3);
});

test("多元素", () => {
  assert.deepStrictEqual(solution([2, 2, 1, 1, 1, 2, 2]), 2);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("全部相同", () => {
  assert.deepStrictEqual(solution([5, 5, 5, 5]), 5);
});

test("两种元素", () => {
  assert.deepStrictEqual(solution([1, 2, 1, 2, 1]), 1);
});
