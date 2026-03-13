// node ./04-minimum-number-of-arrows.mjs
/**
 * 452. 用最少数量的箭引爆气球 (Minimum Number of Arrows to Burst Balloons)
 * 难度: medium
 *
 * 有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points 中，其中 points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend 之间的气球。你不知道气球的确切 y 坐标。
 * 
 * 一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend，且满足 xstart ≤ x ≤ xend，则该气球会被 引爆。可以射出的弓箭的数量 没有限制。弓箭一旦被射出之后，可以无限地前进。
 * 
 * 给你一个数组 points，返回引爆所有气球所必须射出的 最小 弓箭数。
 *
 * 示例 1：
 * 输入：points = [[10,16],[2,8],[1,6],[7,12]]
 * 输出：2
 * 解释：气球可以用2支箭来爆破:
 * - 在x = 6处射出箭，击破气球[2,8]和[1,6]。
 * - 在x = 11处射出箭，击破气球[10,16]和[7,12]。
 * 
 * 示例 2：
 * 输入：points = [[1,2],[3,4],[5,6],[7,8]]
 * 输出：4
 * 解释：每个气球需要射出一支箭，总共需要4支箭。
 * 
 * 示例 3：
 * 输入：points = [[1,2],[2,3],[3,4],[4,5]]
 * 输出：2
 * 解释：气球可以用2支箭来爆破:
 * - 在x = 2处发射箭，击破气球[1,2]和[2,3]。
 * - 在x = 4处发射箭，击破气球[3,4]和[4,5]。
 *
 * 约束条件:
 * - 1 <= points.length <= 10^5
 * - points[i].length == 2
 * - -2^31 <= xstart < xend <= 2^31 - 1
 *
 * 提示:
 *   1. 按气球的终点排序
 *   2. 贪心思想：尽可能在当前气球的最右边射箭
 *   3. 如果下一个气球的起点 > 当前箭的位置，需要新箭
 */

export function findMinArrowShots(points) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 452. 用最少数量的箭引爆气球 (Minimum Number of Arrows to Burst Balloons)");
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
  assert.deepStrictEqual(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]]), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]]), 4);
});

test("示例3", () => {
  assert.deepStrictEqual(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]]), 2);
});

test("单气球", () => {
  assert.deepStrictEqual(findMinArrowShots([[1,2]]), 1);
});
