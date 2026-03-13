// node ./01-summary-ranges.mjs
/**
 * 228. 汇总区间 (Summary Ranges)
 * 难度: easy
 *
 * 给定一个 无重复元素 的 有序 整数数组 nums。
 * 
 * 返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x。
 * 
 * 列表中的每个区间范围 [a,b] 应该按如下格式输出：
 * - "a->b"，如果 a != b
 * - "a"，如果 a == b
 *
 * 示例 1：
 * 输入：nums = [0,1,2,4,5,7]
 * 输出：["0->2","4->5","7"]
 * 解释：区间范围是：
 * [0,2] --> "0->2"
 * [4,5] --> "4->5"
 * [7,7] --> "7"
 * 
 * 示例 2：
 * 输入：nums = [0,2,3,4,6,8,9]
 * 输出：["0","2->4","6","8->9"]
 * 解释：区间范围是：
 * [0,0] --> "0"
 * [2,4] --> "2->4"
 * [6,6] --> "6"
 * [8,9] --> "8->9"
 *
 * 约束条件:
 * - 0 <= nums.length <= 20
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - nums 中的所有值都 互不相同
 * - nums 按升序排列
 *
 * 提示:
 *   1. 遍历数组，记录每个区间的起点
 *   2. 当下一个数不连续时，结束当前区间
 *   3. 根据起点和终点是否相同，生成不同格式的字符串
 */

export function summaryRanges(nums) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 228. 汇总区间 (Summary Ranges)");
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
  assert.deepStrictEqual(summaryRanges([0,1,2,4,5,7]), ["0->2","4->5","7"]);
});

test("示例2", () => {
  assert.deepStrictEqual(summaryRanges([0,2,3,4,6,8,9]), ["0","2->4","6","8->9"]);
});

test("空数组", () => {
  assert.deepStrictEqual(summaryRanges([]), []);
});

test("单元素", () => {
  assert.deepStrictEqual(summaryRanges([-1]), ["-1"]);
});
