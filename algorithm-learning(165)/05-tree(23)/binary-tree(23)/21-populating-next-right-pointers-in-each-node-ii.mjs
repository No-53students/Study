/**
 * 117. 填充每个节点的下一个右侧节点指针 II (Populating Next Right Pointers in Each Node II)
 * 难度: medium
 *
 * 给定一个二叉树：
 * 
 * struct Node {
 *   int val;
 *   Node *left;
 *   Node *right;
 *   Node *next;
 * }
 * 
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 
 * 初始状态下，所有 next 指针都被设置为 NULL。
 *
 * 示例 1：
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 * 解释：使用 # 表示每一层的末尾
 * 
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 解释：空树
 *
 * 约束条件:
 * - 树中的节点数在范围 [0, 6000] 内
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 可以使用层序遍历（BFS）
 *   2. 也可以利用已建立的 next 指针进行 O(1) 空间的遍历
 *   3. 每一层从左到右连接
 */

export function connect(root) {
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
  assert.deepStrictEqual(connect([1,2,3,4,5,null,7]), [1,null,2,3,null,4,5,7,null]);
});

test("空树", () => {
  assert.deepStrictEqual(connect([]), []);
});
