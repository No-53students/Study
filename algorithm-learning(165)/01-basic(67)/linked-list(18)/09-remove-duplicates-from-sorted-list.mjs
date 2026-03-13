// node ./09-remove-duplicates-from-sorted-list.mjs
/**
 * 83. 删除排序链表中的重复元素 (Remove Duplicates from Sorted List)
 * 难度: easy
 *
 * 给定一个已排序的链表的头 head，删除所有重复的元素，使每个元素只出现一次。返回已排序的链表。
 *
 * 示例 1：
 * 输入：head = [1,1,2]
 * 输出：[1,2]
 * 
 * 示例 2：
 * 输入：head = [1,1,2,3,3]
 * 输出：[1,2,3]
 *
 * 约束条件:
 * - 链表中节点数目在范围 [0, 300] 内
 * - -100 <= Node.val <= 100
 * - 题目数据保证链表已经按升序排列
 *
 * 提示:
 *   1. 链表已排序，重复元素一定相邻
 *   2. 比较当前节点和下一个节点的值
 *   3. 如果相同，跳过下一个节点
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function deleteDuplicates(head) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 83. 删除排序链表中的重复元素 (Remove Duplicates from Sorted List)");
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
  assert.deepStrictEqual(ListNode([1,1,2]), [1,2]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([1,1,2,3,3]), [1,2,3]);
});

test("空链表", () => {
  assert.deepStrictEqual(ListNode([]), []);
});

test("无重复", () => {
  assert.deepStrictEqual(ListNode([1,2,3]), [1,2,3]);
});
