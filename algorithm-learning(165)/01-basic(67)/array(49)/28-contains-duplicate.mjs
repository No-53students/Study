// node ./28-contains-duplicate.mjs
/**
 * 217. 存在重复元素 (Contains Duplicate)
 * 难度: easy
 *
 * 给你一个整数数组 nums。如果任一值在数组中出现 至少两次，返回 true；如果数组中每个元素互不相同，返回 false。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,1]
 * 输出：true
 * 解释：元素 1 在下标 0 和 3 出现了两次。
 * 
 * 示例 2：
 * 输入：nums = [1,2,3,4]
 * 输出：false
 * 解释：所有元素都不同。
 * 
 * 示例 3：
 * 输入：nums = [1,1,1,3,3,4,3,2,4,2]
 * 输出：true
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 *
 * 提示:
 *   1. 使用 Set 存储已遍历的元素
 *   2. 如果当前元素已在 Set 中，说明有重复
 *   3. 也可以比较 Set 的大小和数组长度
 */

export function containsDuplicate(nums) {
  const arr = new Set(nums)
  return arr.size !== nums.length
}

// export function containsDuplicate(nums) {
//   const arr = new Set();
//   for (let i = 0; i < nums.length; i++) {
//     if (arr.has(nums[i])) {
//       return true;
//     }
//     arr.add(nums[i]);
//   }
//   return false;
// }

  // 当前方案：用数组下标模拟哈希表
  //   arr[nums[i]] = true  → 把值当作下标，标记"出现过"
  //   下次遇到同样的值时，arr[nums[i]] 已是 true → 有重复
  //
  // ⚠️ 此方案有严重缺陷：
  //   约束条件 nums[i] 最大可达 10^9，arr[1000000000] = true
  //   会创建一个长度 10 亿的稀疏数组，极度浪费内存！
  //
  // ⚠️ 负数情况说明（JS 特性）：
  //   arr[-1] = true  → JS 数组本质是对象，负数会变成字符串属性 "-1" 存储
  //   arr[-1]         → 读取属性 "-1"，返回 true（碰巧能用）
  //   但这不是标准数组行为，属于"走运"，不推荐依赖
  //
  // ✅ 标准做法：用 Set，O(1) 查找，无内存浪费，支持任意值
  //   const seen = new Set();
  //   for (let num of nums) {
  //     if (seen.has(num)) return true;
  //     seen.add(num);
  //   }
  //   return false;
  //
  // ⚡ 最简写法：
  //   return new Set(nums).size !== nums.length;
  //   原理：Set 自动去重，如果有重复元素，size 会小于数组长度
// export function containsDuplicate(nums) {

//   const arr = [];
//   for (let i = 0; i < nums.length; i++){
//     if (arr[nums[i]]) {
//       return true;
//     }
//     arr[nums[i]] = true;
//   }
//   return false
// }

// ---- 测试用例 ----
console.log("\n📝 题目: 217. 存在重复元素 (Contains Duplicate)");
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
  assert.deepStrictEqual(containsDuplicate([1,2,3,1]), true);
});

test("示例2", () => {
  assert.deepStrictEqual(containsDuplicate([1,2,3,4]), false);
});

test("多重复", () => {
  assert.deepStrictEqual(containsDuplicate([1,1,1,3,3,4,3,2,4,2]), true);
});

test("单元素", () => {
  assert.deepStrictEqual(containsDuplicate([1]), false);
});
