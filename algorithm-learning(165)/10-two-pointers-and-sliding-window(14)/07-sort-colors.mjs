// node ./07-sort-colors.mjs
/**
 * 75. 颜色分类 (Sort Colors)
 * 难度: medium
 *
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 
 * 我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。
 * 
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 *
 * 示例 1：
 * 输入：nums = [2,0,2,1,1,0]
 * 输出：[0,0,1,1,2,2]
 * 
 * 示例 2：
 * 输入：nums = [2,0,1]
 * 输出：[0,1,2]
 *
 * 约束条件:
 * - n == nums.length
 * - 1 <= n <= 300
 * - nums[i] 为 0、1 或 2
 *
 * 提示:
 *   1. 荷兰国旗问题
 *   2. 使用三个指针分别标记 0、1、2 的边界
 *   3. 一次遍历完成排序
 */

export function sortColors(nums: number[]): void {
  // 在这里写你的代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 75. 颜色分类 (Sort Colors)");
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

test("标准情况", () => {
  assert.deepStrictEqual(sortColors([2,0,2,1,1,0]), [0,0,1,1,2,2]);
});

test("简单情况", () => {
  assert.deepStrictEqual(sortColors([2,0,1]), [0,1,2]);
});
