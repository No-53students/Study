/**
 * 148. 排序链表 (Sort List)
 * 难度: medium
 *
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 *
 * 示例 1：
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 * 解释：排序后的链表
 * 
 * 示例 2：
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 * 解释：排序后的链表
 * 
 * 示例 3：
 * 输入：head = []
 * 输出：[]
 * 解释：空链表
 *
 * 约束条件:
 * - 链表中节点的数目在范围 [0, 5 * 10^4] 内
 * - -10^5 <= Node.val <= 10^5
 *
 * 提示:
 *   1. 使用归并排序
 *   2. 快慢指针找中点
 *   3. 递归排序后合并
 */

export function sortList(head) {
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
  assert.deepStrictEqual(sortList([4,2,1,3]), [1,2,3,4]);
});

test("示例2", () => {
  assert.deepStrictEqual(sortList([-1,5,3,4,0]), [-1,0,3,4,5]);
});
