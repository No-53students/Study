// node ./14-sliding-window-maximum.mjs
/**
 * 239. 滑动窗口最大值 (Sliding Window Maximum)
 * 难度: hard
 *
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 * 
 * 返回 滑动窗口中的最大值。
 *
 * 示例 1：
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 * 解释：
 * 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 * 
 * 示例 2：
 * 输入：nums = [1], k = 1
 * 输出：[1]
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 * - 1 <= k <= nums.length
 *
 * 提示:
 *   1. 使用单调队列（双端队列）
 *   2. 队列中存储索引，保持对应值单调递减
 *   3. 队首元素就是当前窗口的最大值
 */

export function maxSlidingWindow(nums, k) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 239. 滑动窗口最大值 (Sliding Window Maximum)");
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
  assert.deepStrictEqual(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3), [3,3,5,5,6,7]);
});

test("单元素", () => {
  assert.deepStrictEqual(maxSlidingWindow([1], 1), [1]);
});

test("递减", () => {
  assert.deepStrictEqual(maxSlidingWindow([9,8,7,6,5], 3), [9,8,7]);
});

test("递增", () => {
  assert.deepStrictEqual(maxSlidingWindow([1,2,3,4,5], 3), [3,4,5]);
});
