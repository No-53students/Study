// node ./23-next-permutation.mjs
/**
 * 31. 下一个排列 (Next Permutation)
 * 难度: medium
 *
 * 整数数组的一个 排列 就是将其所有成员以序列或线性顺序排列。
 *
 * 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
 *
 * 必须 原地 修改，只允许使用额外常数空间。
 *
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[1,3,2]
 *
 * 示例 2：
 * 输入：nums = [3,2,1]
 * 输出：[1,2,3]
 *
 * 示例 3：
 * 输入：nums = [1,1,5]
 * 输出：[1,5,1]
 *
 * 约束条件:
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 100
 *
 * 提示:
 *   1. 从右向左找第一个相邻升序对
 *   2. 从右向左找第一个大于该元素的数并交换
 *   3. 反转后面的部分使其最小
 */

export function nextPermutation(nums) {
  // ⚠️ nextMax 实现的是「冒泡排序」(Bubble Sort)，时间复杂度 O(n²)，写法不够简洁。
  //
  // 更优方案：直接「反转」后缀，时间复杂度 O(n)
  //   原因：交换完 nums[i] 和 nums[transIndex] 之后，
  //         i+1 到末尾的子数组仍然是「降序」排列的（由算法保证），
  //         所以只需 reverse 一次即可得到最小排列，无需排序。
  //
  //   替换写法（O(n) reverse）：
  //     let l = i + 1, r = nums.length - 1;
  //     while (l < r) {
  //       [nums[l], nums[r]] = [nums[r], nums[l]];
  //       l++; r--;
  //     }
  function nextMax(k) {
    for (let s = k; s < nums.length; s++) {
      for (let g = s+1; g < nums.length; g++) {
        while (nums[s] > nums[g]) {
          [nums[s], nums[g]] = [nums[g], nums[s]];
        }
      }
    }
  }
  console.log("参数", nums);
  for (let i = nums.length - 2; i >= 0; i--) {
    let diffVal = Infinity;
    let transIndex = 0;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j] && nums[j] - nums[i] < diffVal) {
        diffVal = nums[j] - nums[i];
        transIndex = j;
      }
    }
    if (transIndex) {
      // 找大于当前位置的
      [nums[i], nums[transIndex]] = [nums[transIndex], nums[i]];
      // 把这个之后的全部重新排序从小到大排序
      // i+1-> nums.length-1;
      nextMax(i + 1);
      return nums;
    }
  }
  nextMax(0);
  return nums;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 31. 下一个排列 (Next Permutation)");
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

test("示例1", () => {
  assert.deepStrictEqual(nextPermutation([1, 2, 3]), [1, 3, 2]);
});

test("示例2", () => {
  assert.deepStrictEqual(nextPermutation([3, 2, 1]), [1, 2, 3]);
});

test("示例3", () => {
  assert.deepStrictEqual(nextPermutation([1, 1, 5]), [1, 5, 1]);
});

test("中间", () => {
  assert.deepStrictEqual(nextPermutation([1, 3, 2]), [2, 1, 3]);
});
