// node ./10-top-k-frequent-elements.mjs
/**
 * 347. 前K个高频元素 (Top K Frequent Elements)
 * 难度: medium
 *
 * 给你一个整数数组 nums 和一个整数 k，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
 *
 * 示例 1：
 * 输入：nums = [1,1,1,2,2,3], k = 2
 * 输出：[1,2]
 * 
 * 示例 2：
 * 输入：nums = [1], k = 1
 * 输出：[1]
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 * - k 的取值范围是 [1, 数组中不相同的元素的个数]
 * - 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
 *
 * 提示:
 *   1. 先用哈希表统计频率
 *   2. 可以使用堆、快速选择或桶排序
 *   3. 桶排序：以频率为索引
 */

export function topKFrequent(nums, k) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 347. 前K个高频元素 (Top K Frequent Elements)");
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
  assert.deepStrictEqual(topKFrequent([1,1,1,2,2,3], 2), [1,2]);
});

test("单元素", () => {
  assert.deepStrictEqual(topKFrequent([1], 1), [1]);
});
