// node ./37-rotate-image.mjs
/**
 * 48. 旋转图像 (Rotate Image)
 * 难度: medium
 *
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 *
 * 示例 1：
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 * 
 * 示例 2：
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 *
 * 约束条件:
 * - n == matrix.length == matrix[i].length
 * - 1 <= n <= 20
 * - -1000 <= matrix[i][j] <= 1000
 *
 * 提示:
 *   1. 顺时针旋转90度 = 先转置 + 再左右翻转
 *   2. 转置：交换 matrix[i][j] 和 matrix[j][i]
 *   3. 也可以逆时针旋转90度 = 先转置 + 再上下翻转
 */

export function rotate(matrix) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 48. 旋转图像 (Rotate Image)");
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
  assert.deepStrictEqual(rotate([[1,2,3],[4,5,6],[7,8,9]]), [[7,4,1],[8,5,2],[9,6,3]]);
});

test("4x4矩阵", () => {
  assert.deepStrictEqual(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]), [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]);
});

test("1x1矩阵", () => {
  assert.deepStrictEqual(rotate([[1]]), [[1]]);
});

test("2x2矩阵", () => {
  assert.deepStrictEqual(rotate([[1,2],[3,4]]), [[3,1],[4,2]]);
});
