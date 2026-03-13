// node ./07-course-schedule-ii.mjs
/**
 * 210. 课程表 II (Course Schedule II)
 * 难度: medium
 *
 * 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。
 * 
 * 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
 * 
 * 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。
 *
 * 示例 1：
 * 输入：numCourses = 2, prerequisites = [[1,0]]
 * 输出：[0,1]
 * 解释：先修课程 0，再修课程 1
 * 
 * 示例 2：
 * 输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * 输出：[0,1,2,3] 或 [0,2,1,3]
 * 解释：有多种合法顺序
 * 
 * 示例 3：
 * 输入：numCourses = 1, prerequisites = []
 * 输出：[0]
 * 解释：只有一门课
 *
 * 约束条件:
 * - 1 <= numCourses <= 2000
 * - 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * - prerequisites[i].length == 2
 * - 0 <= ai, bi < numCourses
 * - ai != bi
 * - 所有 [ai, bi] 互不相同
 *
 * 提示:
 *   1. 拓扑排序：BFS（Kahn 算法）或 DFS
 *   2. 记录入度为 0 的节点
 *   3. 输出拓扑序列
 */

export function findOrder(numCourses, prerequisites) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 210. 课程表 II (Course Schedule II)");
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
  assert.deepStrictEqual(findOrder(2, [[1,0]]), [0,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]), [0,1,2,3]);
});

test("无先修课", () => {
  assert.deepStrictEqual(findOrder(1, []), [0]);
});
