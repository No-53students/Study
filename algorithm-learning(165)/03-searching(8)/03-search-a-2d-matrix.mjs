// node ./03-search-a-2d-matrix.mjs
/**
 * 74. 搜索二维矩阵 (Search a 2D Matrix)
 * 难度: medium
 *
 * 给你一个满足下述两条属性的 m x n 整数矩阵：
 * 
 * - 每行中的整数从左到右按非严格递增顺序排列。
 * - 每行的第一个整数大于前一行的最后一个整数。
 * 
 * 给你一个整数 target，如果 target 在矩阵中，返回 true；否则，返回 false。
 *
 * 示例 1：
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * 输出：true
 * 
 * 示例 2：
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
 * 输出：false
 *
 * 约束条件:
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 100
 * - -10^4 <= matrix[i][j], target <= 10^4
 *
 * 提示:
 *   1. 将二维矩阵视为一维有序数组
 *   2. 使用 mid / n 和 mid % n 转换坐标
 *   3. 标准二分查找
 */

export function searchMatrix(matrix, target) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 74. 搜索二维矩阵 (Search a 2D Matrix)");
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
  assert.deepStrictEqual(searchMatrix([[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 3), true);
});

test("目标不存在", () => {
  assert.deepStrictEqual(searchMatrix([[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 13), false);
});
