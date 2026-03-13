// node ./04-merge-two-sorted-lists.mjs
/**
 * 21. 合并两个有序链表 (Merge Two Sorted Lists)
 * 难度: easy
 *
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 示例 1：
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 * 
 * 示例 2：
 * 输入：l1 = [], l2 = []
 * 输出：[]
 * 
 * 示例 3：
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 *
 * 约束条件:
 * - 两个链表的节点数目范围是 [0, 50]
 * - -100 <= Node.val <= 100
 * - l1 和 l2 均按 非递减顺序 排列
 *
 * 提示:
 *   1. 使用哨兵节点（dummy node）简化边界处理
 *   2. 比较两个链表的当前节点，选择较小的连接到结果链表
 *   3. 最后将非空的链表直接连接到结果后面
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function mergeTwoLists(list1, list2) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 21. 合并两个有序链表 (Merge Two Sorted Lists)");
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
  assert.deepStrictEqual(ListNode([1,2,4], [1,3,4]), [1,1,2,3,4,4]);
});

test("两个空", () => {
  assert.deepStrictEqual(ListNode([], []), []);
});

test("一个空", () => {
  assert.deepStrictEqual(ListNode([], [0]), [0]);
});
