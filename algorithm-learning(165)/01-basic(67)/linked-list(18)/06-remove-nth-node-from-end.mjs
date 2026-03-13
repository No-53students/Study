// node ./06-remove-nth-node-from-end.mjs
/**
 * 19. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List)
 * 难度: medium
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 示例 2：
 * 输入：head = [1], n = 1
 * 输出：[]
 * 
 * 示例 3：
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 *
 * 约束条件:
 * - 链表中结点的数目为 sz
 * - 1 <= sz <= 30
 * - 0 <= Node.val <= 100
 * - 1 <= n <= sz
 * 
 * 进阶： 你能尝试使用一趟扫描实现吗？
 *
 * 提示:
 *   1. 使用哨兵节点处理删除头节点的边界情况
 *   2. 使用快慢指针，让快指针先走 n+1 步
 *   3. 然后快慢指针同时走，快指针到末尾时，慢指针正好在要删除节点的前一个
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function removeNthFromEnd(head, n) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 19. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List)");
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
  assert.deepStrictEqual(ListNode([1,2,3,4,5], 2), [1,2,3,5]);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1], 1), []);
});

test("删除最后", () => {
  assert.deepStrictEqual(ListNode([1,2], 1), [1]);
});

test("删除第一个", () => {
  assert.deepStrictEqual(ListNode([1,2], 2), [2]);
});
