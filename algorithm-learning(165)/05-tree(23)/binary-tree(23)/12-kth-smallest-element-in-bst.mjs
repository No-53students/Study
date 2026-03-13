// node ./12-kth-smallest-element-in-bst.mjs
/**
 * 230. 二叉搜索树中第K小的元素 (Kth Smallest Element in a BST)
 * 难度: medium
 *
 * 给定一个二叉搜索树的根节点 root，和一个整数 k，请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）。
 *
 * 示例 1：
 * 输入：root = [3,1,4,null,2], k = 1
 * 输出：1
 * 
 * 示例 2：
 * 输入：root = [5,3,6,2,4,null,null,1], k = 3
 * 输出：3
 *
 * 约束条件:
 * - 树中的节点数为 n。
 * - 1 <= k <= n <= 10^4
 * - 0 <= Node.val <= 10^4
 * 
 * 进阶： 如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？
 *
 * 提示:
 *   1. BST的中序遍历是升序的
 *   2. 中序遍历到第k个节点就是答案
 *   3. 可以提前终止遍历以优化
 */

export function kthSmallest(root, k) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 230. 二叉搜索树中第K小的元素 (Kth Smallest Element in a BST)");
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
  assert.deepStrictEqual(kthSmallest([3,1,4,null,2], 1), 1);
});

test("示例2", () => {
  assert.deepStrictEqual(kthSmallest([5,3,6,2,4,null,null,1], 3), 3);
});
