/**
 * 108. 将有序数组转换为二叉搜索树 (Convert Sorted Array to Binary Search Tree)
 * 难度: easy
 *
 * 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。
 *
 * 示例 1：
 * 输入：nums = [-10,-3,0,5,9]
 * 输出：[0,-3,9,-10,null,5]
 * 解释：[0,-10,5,null,-3,null,9] 也是一个合法答案
 * 
 * 示例 2：
 * 输入：nums = [1,3]
 * 输出：[3,1]
 * 解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums 按 严格递增 顺序排列
 *
 * 提示:
 *   1. 选择中间元素作为根节点可以保证平衡
 *   2. 递归构建左右子树
 *   3. 有序数组的中序遍历就是 BST
 */

export function sortedArrayToBST(nums) {
  // 在此处编写代码
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
  assert.deepStrictEqual(sortedArrayToBST([-10,-3,0,5,9]), [0,-3,9,-10,null,5]);
});

test("示例2", () => {
  assert.deepStrictEqual(sortedArrayToBST([1,3]), [3,1]);
});

test("单元素", () => {
  assert.deepStrictEqual(sortedArrayToBST([0]), [0]);
});
