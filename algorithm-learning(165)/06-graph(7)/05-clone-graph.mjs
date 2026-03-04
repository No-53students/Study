/**
 * 133. 克隆图 (Clone Graph)
 * 难度: medium
 *
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
 * 
 * 图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。
 * 
 * class Node {
 *     public int val;
 *     public List<Node> neighbors;
 * }
 *
 * 示例 1：
 * 输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
 * 输出：[[2,4],[1,3],[2,4],[1,3]]
 * 解释：图中有 4 个节点，克隆后返回相同结构的新图
 * 
 * 示例 2：
 * 输入：adjList = [[]]
 * 输出：[[]]
 * 解释：只有一个节点，没有邻居
 *
 * 约束条件:
 * - 节点数不超过 100
 * - 1 <= Node.val <= 100
 * - Node.val 是唯一的
 * - 没有重复的边和自环
 * - 图是连通图
 *
 * 提示:
 *   1. 使用哈希表记录已克隆的节点
 *   2. DFS 或 BFS 遍历图
 *   3. 先创建克隆节点，再处理邻居
 */

export function cloneGraph(node) {
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
  assert.deepStrictEqual(cloneGraph([[2,4],[1,3],[2,4],[1,3]]), [[2,4],[1,3],[2,4],[1,3]]);
});

test("单节点", () => {
  assert.deepStrictEqual(cloneGraph([[]]), [[]]);
});
