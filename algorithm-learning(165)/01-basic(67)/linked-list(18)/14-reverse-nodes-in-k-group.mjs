/**
 * 25. K 个一组翻转链表 (Reverse Nodes in k-Group)
 * 难度: hard
 *
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 * 
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 * 解释：每 2 个一组翻转
 * 
 * 示例 2：
 * 输入：head = [1,2,3,4,5], k = 3
 * 输出：[3,2,1,4,5]
 * 解释：每 3 个一组翻转，最后 2 个不足 k 个保持原样
 *
 * 约束条件:
 * - 链表中的节点数目为 n
 * - 1 <= k <= n <= 5000
 * - 0 <= Node.val <= 1000
 *
 * 提示:
 *   1. 先检查是否有 k 个节点
 *   2. 翻转 k 个节点后，连接前后部分
 *   3. 使用虚拟头节点简化操作
 */

export function reverseKGroup(head, k) {
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

test("k=2", () => {
  assert.deepStrictEqual(reverseKGroup([1,2,3,4,5], 2), [2,1,4,3,5]);
});

test("k=3", () => {
  assert.deepStrictEqual(reverseKGroup([1,2,3,4,5], 3), [3,2,1,4,5]);
});
