// node ./40-search-a-2d-matrix-ii.mjs
/**
 * 240. 搜索二维矩阵 II (Search a 2D Matrix II)
 * 难度: medium
 *
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
 * 
 * - 每行的元素从左到右升序排列。
 * - 每列的元素从上到下升序排列。
 *
 * 示例 1：
 * 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
 * 输出：true
 * 
 * 示例 2：
 * 输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
 * 输出：false
 *
 * 约束条件:
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= n, m <= 300
 * - -10^9 <= matrix[i][j] <= 10^9
 * - 每行的所有元素从左到右升序排列
 * - 每列的所有元素从上到下升序排列
 * - -10^9 <= target <= 10^9
 *
 * 提示:
 *   1. 从矩阵的右上角或左下角开始搜索
 *   2. 右上角元素是该行最大值，该列最小值
 *   3. 可以根据比较结果排除一行或一列
 */

export function searchMatrix(matrix: number[][], target: number): boolean {
  // 在这里写你的代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 240. 搜索二维矩阵 II (Search a 2D Matrix II)");
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

test("找到目标", () => {
  assert.deepStrictEqual(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5), true);
});

test("目标不存在", () => {
  assert.deepStrictEqual(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20), false);
});
