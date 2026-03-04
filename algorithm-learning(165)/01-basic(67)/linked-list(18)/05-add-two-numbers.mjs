/**
 * 2. 两数相加 (Add Two Numbers)
 * 难度: medium
 *
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 * 示例 1：
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807
 * 
 * 示例 2：
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 * 
 * 示例 3：
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 *
 * 约束条件:
 * - 每个链表中的节点数在范围 [1, 100] 内
 * - 0 <= Node.val <= 9
 * - 题目数据保证列表表示的数字不含前导零
 *
 * 提示:
 *   1. 使用哨兵节点简化操作
 *   2. 同时遍历两个链表，逐位相加
 *   3. 注意处理进位，包括最后的进位
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function addTwoNumbers(l1, l2) {
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

test("示例1", () => {
  assert.deepStrictEqual(ListNode([2,4,3], [5,6,4]), [7,0,8]);
});

test("两个0", () => {
  assert.deepStrictEqual(ListNode([0], [0]), [0]);
});

test("进位", () => {
  assert.deepStrictEqual(ListNode([9,9,9,9,9,9,9], [9,9,9,9]), [8,9,9,9,0,0,0,1]);
});
