/**
 * 57. 插入区间 (Insert Interval)
 * 难度: medium
 *
 * 给你一个 无重叠的，按照区间起始端点排序的区间列表 intervals，其中 intervals[i] = [starti, endi] 表示第 i 个区间的开始和结束，并且 intervals 按照 starti 升序排列。同样给定一个区间 newInterval = [start, end] 表示另一个区间的开始和结束。
 * 
 * 在 intervals 中插入区间 newInterval，使得 intervals 依然按照 starti 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。
 * 
 * 返回插入之后的 intervals。
 * 
 * 注意 你不需要原地修改 intervals。你可以创建一个新数组然后返回它。
 *
 * 示例 1：
 * 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出：[[1,5],[6,9]]
 * 
 * 示例 2：
 * 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * 输出：[[1,2],[3,10],[12,16]]
 * 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 *
 * 约束条件:
 * - 0 <= intervals.length <= 10^4
 * - intervals[i].length == 2
 * - 0 <= starti <= endi <= 10^5
 * - intervals 根据 starti 按 升序 排列
 * - newInterval.length == 2
 * - 0 <= start <= end <= 10^5
 *
 * 提示:
 *   1. 分三个阶段处理：前、重叠、后
 *   2. 先添加所有在新区间之前结束的区间
 *   3. 合并所有与新区间重叠的区间
 *   4. 最后添加剩余区间
 */

export function insert(intervals, newInterval) {
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
  assert.deepStrictEqual(insert([[1,3],[6,9]], [2,5]), [[1,5],[6,9]]);
});

test("示例2", () => {
  assert.deepStrictEqual(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]), [[1,2],[3,10],[12,16]]);
});

test("空数组", () => {
  assert.deepStrictEqual(insert([], [5,7]), [[5,7]]);
});

test("无重叠-前", () => {
  assert.deepStrictEqual(insert([[3,5]], [1,2]), [[1,2],[3,5]]);
});
