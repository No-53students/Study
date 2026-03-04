/**
 * 234. 回文链表 (Palindrome Linked List)
 * 难度: easy
 *
 * 给你一个单链表的头节点 head，请你判断该链表是否为回文链表。如果是，返回 true；否则，返回 false。
 *
 * 示例 1：
 * 输入：head = [1,2,2,1]
 * 输出：true
 * 
 * 示例 2：
 * 输入：head = [1,2]
 * 输出：false
 *
 * 约束条件:
 * - 链表中节点数目在范围 [1, 10^5] 内
 * - 0 <= Node.val <= 9
 * 
 * 进阶： 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 *
 * 提示:
 *   1. 使用快慢指针找到链表中点
 *   2. 反转后半部分链表
 *   3. 比较前半部分和反转后的后半部分
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function isPalindrome(head) {
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

test("回文", () => {
  assert.deepStrictEqual(ListNode([1,2,2,1]), true);
});

test("非回文", () => {
  assert.deepStrictEqual(ListNode([1,2]), false);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1]), true);
});

test("奇数回文", () => {
  assert.deepStrictEqual(ListNode([1,2,1]), true);
});
