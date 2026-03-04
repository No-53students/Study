/**
 * 54. 螺旋矩阵 (Spiral Matrix)
 * 难度: medium
 *
 * 给你一个 m 行 n 列的矩阵 matrix，请按照 顺时针螺旋顺序，返回矩阵中的所有元素。
 *
 * 示例 1：
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 示例 2：
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 *
 * 约束条件:
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 10
 * - -100 <= matrix[i][j] <= 100
 *
 * 提示:
 *   1. 使用四个边界变量：top, bottom, left, right
 *   2. 每完成一个方向的遍历，收缩对应的边界
 *   3. 注意检查边界条件，避免重复遍历
 */

export function spiralOrder(matrix) {
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

test("3x3矩阵", () => {
  assert.deepStrictEqual(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]), [1,2,3,6,9,8,7,4,5]);
});

test("3x4矩阵", () => {
  assert.deepStrictEqual(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]), [1,2,3,4,8,12,11,10,9,5,6,7]);
});

test("单行", () => {
  assert.deepStrictEqual(spiralOrder([[1,2,3]]), [1,2,3]);
});

test("单列", () => {
  assert.deepStrictEqual(spiralOrder([[1],[2],[3]]), [1,2,3]);
});
