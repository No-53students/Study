// node ./15-trapping-rain-water2.mjs
/**
 * 42. 接雨水 (Trapping Rain Water)
 * 难度: hard
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 * 示例 1：
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 *
 * 示例 2：
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 *
 * 约束条件:
 * - n == height.length
 * - 1 <= n <= 2 * 10^4
 * - 0 <= height[i] <= 10^5
 *
 * 提示:
 *   1. 每个位置能接的水 = min(左边最高, 右边最高) - 当前高度
 *   2. 可以用双指针从两边向中间移动
 *   3. 较矮的一边决定当前能接多少水
 */

/**
 * 解法二：预处理数组
 * 时间复杂度: O(n) — 分三次遍历，每次 O(n)
 * 空间复杂度: O(n) — 需要 leftMaxArr 和 rightMaxArr 两个额外数组
 * 与解法一的区别: 提前把每个位置的左/右最大值存入数组，避免重复扫描
 *
 * @param {number[]} height
 * @return {number}
 */
export function solution(height) {
  let res = 0;
  const leftMaxArr = new Array(height.length).fill(0);
  const rightMaxArr = new Array(height.length).fill(0);
  // 去除最左最右
  for (let i = 1; i < height.length; i++) {
    if (height[i - 1] > leftMaxArr[i - 1]) {
      leftMaxArr[i] = height[i - 1];
    } else {
      leftMaxArr[i] = leftMaxArr[i - 1];
    }
  }
  console.log('左侧最大值', leftMaxArr);
  for (let j = height.length-2; j >= 0; j--) {
    if (height[j + 1] > rightMaxArr[j + 1]) {
      rightMaxArr[j] = height[j + 1];
    } else {
      rightMaxArr[j] = rightMaxArr[j + 1];
    }
  }
  console.log("右侧最大值", rightMaxArr);
  for (let i = 0; i < height.length; i++) {
    if (leftMaxArr[i] - height[i] > 0 && rightMaxArr[i] - height[i] > 0) {
      res += Math.min(leftMaxArr[i], rightMaxArr[i]) - height[i];
      console.log("添加值后", res);
    }
  }

  return res;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 42. 接雨水 (Trapping Rain Water)");
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
  assert.deepStrictEqual(solution([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
});

test("简单情况", () => {
  assert.deepStrictEqual(solution([4, 2, 0, 3, 2, 5]), 9);
});

test("无法接水", () => {
  assert.deepStrictEqual(solution([1, 2, 3, 4, 5]), 0);
});

test("两柱子", () => {
  assert.deepStrictEqual(solution([2, 0, 2]), 2);
});

test("空数组", () => {
  assert.deepStrictEqual(solution([]), 0);
});
