// node ./02-merge-intervals.mjs
/**
 * 56. 合并区间 (Merge Intervals)
 * 难度: medium
 *
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
 *
 * 示例 1：
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 示例 2：
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 * 约束条件:
 * - 1 <= intervals.length <= 10^4
 * - intervals[i].length == 2
 * - 0 <= starti <= endi <= 10^4
 *
 * 提示:
 *   1. 先按区间起点排序
 *   2. 遍历时，如果当前区间与上一个重叠，则合并
 *   3. 合并时取两个区间终点的较大值
 */

export function merge(intervals) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 56. 合并区间 (Merge Intervals)");
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
  assert.deepStrictEqual(merge([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]]);
});

test("示例2", () => {
  assert.deepStrictEqual(merge([[1,4],[4,5]]), [[1,5]]);
});

test("无重叠", () => {
  assert.deepStrictEqual(merge([[1,2],[3,4]]), [[1,2],[3,4]]);
});

test("完全重叠", () => {
  assert.deepStrictEqual(merge([[1,4],[2,3]]), [[1,4]]);
});
