// node ./14-candy.mjs
/**
 * 135. 分发糖果 (Candy)
 * 难度: hard
 *
 * n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
 *
 * 你需要按照以下要求，给这些孩子分发糖果：
 *
 * - 每个孩子至少分配到 1 个糖果。
 * - 相邻两个孩子评分更高的孩子会获得更多的糖果。
 *
 * 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
 *
 * 示例 1：
 * 输入：ratings = [1,0,2]
 * 输出：5
 * 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
 *
 * 示例 2：
 * 输入：ratings = [1,2,2]
 * 输出：4
 * 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
 *      第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 *
 * 约束条件:
 * - n == ratings.length
 * - 1 <= n <= 2 * 10^4
 * - 0 <= ratings[i] <= 2 * 10^4
 *
 * 提示:
 *   1. 两次遍历，分别处理左右关系
 *   2. 第一次从左到右，保证右边评分高的比左边糖果多
 *   3. 第二次从右到左，保证左边评分高的比右边糖果多
 */

/**
 * @param {number[]} ratings
 * @return {number}
 */
export function solution(ratings) {
  // 在这里编写你的代码
  let res = ratings.length;
  const resArr = new Array(ratings.length).fill(1);
  console.log('至少分配', res);
  let leftAddNum = 1;
  let rightAddNum = 1;
  for (let i = 0; i < ratings.length; i++) {
    
    if (ratings[i + 1] > ratings[i] && resArr[i + 1] <= resArr[i]) {
      console.log("左需要添加的", leftAddNum);
      leftAddNum = Math.abs(resArr[i + 1] - resArr[i]) + 1;
      res += leftAddNum;
      resArr[i + 1] += leftAddNum;
    } else {
      leftAddNum = 1;
    }
  }
  console.log('从左边查找', res, resArr);
  for (let i = ratings.length; i >=0; i--) {
    if (ratings[i - 1] > ratings[i] && resArr[i-1]<=resArr[i]) {
      console.log("右需要添加的", rightAddNum);
      rightAddNum = resArr[i] - resArr[i - 1] +1;
      res += rightAddNum;
      resArr[i - 1] += rightAddNum;
    } else {
      rightAddNum = 1;
    }
  }
  console.log("从右边查找", res,resArr);
  return res;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 135. 分发糖果 (Candy)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(
      `结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? "✅ 通过" : "❌ 不通过"}`,
    );
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? "✅ 通过" : "❌ 不通过"}`);
  },
};

test("基本测试", () => {
  assert.deepStrictEqual(solution([1, 0, 2]), 5);
});

test("相邻相等", () => {
  assert.deepStrictEqual(solution([1, 2, 2]), 4);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("递增", () => {
  assert.deepStrictEqual(solution([1, 2, 3]), 6);
});

test("递减", () => {
  assert.deepStrictEqual(solution([3, 2, 1]), 6);
});

test("山顶重叠", () => {
  assert.deepStrictEqual(solution([1, 3, 2, 1]), 7);
});
