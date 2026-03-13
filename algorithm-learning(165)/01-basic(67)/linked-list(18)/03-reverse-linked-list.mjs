// node ./03-reverse-linked-list.mjs
/**
 * 206. 反转链表 (Reverse Linked List)
 * 难度: easy
 *
 * 给你单链表的头节点 head，请你反转链表，并返回反转后的链表。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4,5]
 * 输出：[5,4,3,2,1]
 * 
 * 示例 2：
 * 输入：head = [1,2]
 * 输出：[2,1]
 * 
 * 示例 3：
 * 输入：head = []
 * 输出：[]
 *
 * 约束条件:
 * - 链表中节点的数目范围是 [0, 5000]
 * - -5000 <= Node.val <= 5000
 * 
 * 进阶： 链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
 *
 * 提示:
 *   1. 迭代法：使用三个指针 prev, curr, next
 *   2. 递归法：先反转后面的链表，再处理当前节点
 *   3. 注意边界条件：空链表和单节点链表
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function reverseList(head) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 206. 反转链表 (Reverse Linked List)");
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
  assert.deepStrictEqual(ListNode([1,2,3,4,5]), [5,4,3,2,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([1,2]), [2,1]);
});

test("空链表", () => {
  assert.deepStrictEqual(ListNode([]), []);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1]), [1]);
});
