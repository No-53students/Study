/**
 * 100. 相同的树 (Same Tree)
 * 难度: easy
 *
 * 给你两棵二叉树的根节点 p 和 q，编写一个函数来检验这两棵树是否相同。
 * 
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 *
 * 示例 1：
 * 输入：p = [1,2,3], q = [1,2,3]
 * 输出：true
 * 
 * 示例 2：
 * 输入：p = [1,2], q = [1,null,2]
 * 输出：false
 * 
 * 示例 3：
 * 输入：p = [1,2,1], q = [1,1,2]
 * 输出：false
 *
 * 约束条件:
 * - 两棵树上的节点数目都在范围 [0, 100] 内
 * - -10^4 <= Node.val <= 10^4
 *
 * 提示:
 *   1. 递归比较：两个节点都为空则相同，一个为空则不同
 *   2. 值相同且左右子树都相同，则两棵树相同
 *   3. 也可以使用BFS同时遍历两棵树
 */

export function isSameTree(p, q) {
  // 在此处编写你的代码

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

test("相同的树", () => {
  assert.deepStrictEqual(isSameTree([1,2,3], [1,2,3]), true);
});

test("结构不同", () => {
  assert.deepStrictEqual(isSameTree([1,2], [1,null,2]), false);
});

test("值不同", () => {
  assert.deepStrictEqual(isSameTree([1,2,1], [1,1,2]), false);
});

test("都为空", () => {
  assert.deepStrictEqual(isSameTree(null, null), true);
});
