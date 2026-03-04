/**
 * 103. 二叉树的锯齿形层序遍历 (Binary Tree Zigzag Level Order Traversal)
 * 难度: medium
 *
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 *
 * 示例 1：
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[20,9],[15,7]]
 * 解释：第一层从左到右：[3]
 * 第二层从右到左：[20,9]
 * 第三层从左到右：[15,7]
 * 
 * 示例 2：
 * 输入：root = [1]
 * 输出：[[1]]
 * 解释：单节点
 * 
 * 示例 3：
 * 输入：root = []
 * 输出：[]
 * 解释：空树
 *
 * 约束条件:
 * - 树中节点数目在范围 [0, 2000] 内
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 基于普通层序遍历进行修改
 *   2. 使用一个标志位记录当前层的遍历方向
 *   3. 可以用 unshift 或 reverse 来处理反向
 */

export function zigzagLevelOrder(root) {
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
  assert.deepStrictEqual(zigzagLevelOrder([3,9,20,null,null,15,7]), [[3],[20,9],[15,7]]);
});

test("单节点", () => {
  assert.deepStrictEqual(zigzagLevelOrder([1]), [[1]]);
});

test("空树", () => {
  assert.deepStrictEqual(zigzagLevelOrder([]), []);
});
