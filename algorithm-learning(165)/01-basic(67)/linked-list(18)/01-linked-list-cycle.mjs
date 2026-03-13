// node ./01-linked-list-cycle.mjs
/**
 * 141. 环形链表 (Linked List Cycle)
 * 难度: easy
 *
 * 给你一个链表的头节点 head，判断链表中是否有环。
 * 
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递。仅仅是为了标识链表的实际情况。
 * 
 * 如果链表中存在环，则返回 true。否则，返回 false。
 *
 * 示例 1：
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 * 
 * 示例 2：
 * 输入：head = [1,2], pos = 0
 * 输出：true
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 * 
 * 示例 3：
 * 输入：head = [1], pos = -1
 * 输出：false
 * 解释：链表中没有环。
 *
 * 约束条件:
 * - 链表中节点的数目范围是 [0, 10^4]
 * - -10^5 <= Node.val <= 10^5
 * - pos 为 -1 或者链表中的一个 有效索引
 * 
 * 进阶： 你能用 O(1)（即，常量）内存解决此问题吗？
 *
 * 提示:
 *   1. 使用快慢指针
 *   2. 慢指针每次走一步，快指针每次走两步
 *   3. 如果有环，快慢指针一定会相遇
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
export function hasCycle(head) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 141. 环形链表 (Linked List Cycle)");
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

test("有环", () => {
  assert.deepStrictEqual(ListNode([3,2,0,-4], 1), true);
});

test("有环2", () => {
  assert.deepStrictEqual(ListNode([1,2], 0), true);
});

test("无环", () => {
  assert.deepStrictEqual(ListNode([1], -1), false);
});
