// node ./01-merge-sorted-array2.mjs
/**
 * 88. 合并两个有序数组 (Merge Sorted Array)
 * 难度: easy
 *
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n，分别表示 nums1 和 nums2 中的元素数目。
 * 
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 * 
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0，应忽略。nums2 的长度为 n。
 *
 * 示例 1：
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6]
 * 解释：需要合并 [1,2,3] 和 [2,5,6] 。
 * 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
 * 
 * 示例 2：
 * 输入：nums1 = [1], m = 1, nums2 = [], n = 0
 * 输出：[1]
 * 解释：需要合并 [1] 和 [] 。
 * 合并结果是 [1] 。
 * 
 * 示例 3：
 * 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
 * 输出：[1]
 * 解释：需要合并的数组是 [] 和 [1] 。
 * 合并结果是 [1] 。
 * 注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
 *
 * 约束条件:
 * - nums1.length == m + n
 * - nums2.length == n
 * - 0 <= m, n <= 200
 * - 1 <= m + n <= 200
 * - -10^9 <= nums1[i], nums2[j] <= 10^9
 * 
 * 进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？
 *
 * 提示:
 *   1. 如果从前往后填充，nums1 的元素可能会被覆盖
 *   2. 考虑从后往前填充，这样不会影响还未处理的元素
 *   3. 使用三个指针：分别指向 nums1 的有效末尾、nums2 的末尾、以及合并后的位置
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} 修改 nums1 原地合并
 */
export function solution(nums1, m, nums2, n) {
  /**
   * 解题思路: 逆向双指针法 (从后往前填充)
   *
   * 为什么不能从前往后填充?
   *   如果从前往后填充，nums1 前面的有效元素会被覆盖，导致数据丢失。
   *   而从后往前填充，nums1 尾部本来就是占位的 0，覆盖它们不影响有效数据。
   *
   * 三个指针:
   *   mIndex   — 指向 nums1 有效部分的末尾 (从后往前遍历 nums1 的有效元素)
   *   nIndex   — 指向 nums2 的末尾 (从后往前遍历 nums2)
   *   resLength — 指向 nums1 合并后数组的末尾 (当前要填充的位置)
   *
   * 流程示例: nums1 = [1,2,3,0,0,0], m=3, nums2 = [2,5,6], n=3
   *
   *   初始状态:  nums1 = [1, 2, 3, 0, 0, 0]
   *                       mIndex=2 ↑        ↑ resLength=5
   *              nums2 = [2, 5, 6]
   *                       nIndex=2 ↑
   *
   *   第1轮: nums1[2]=3 vs nums2[2]=6 → 6大 → nums1[5]=6, nIndex=1, resLength=4
   *          nums1 = [1, 2, 3, 0, 0, 6]
   *
   *   第2轮: nums1[2]=3 vs nums2[1]=5 → 5大 → nums1[4]=5, nIndex=0, resLength=3
   *          nums1 = [1, 2, 3, 0, 5, 6]
   *
   *   第3轮: nums1[2]=3 vs nums2[0]=2 → 3大 → nums1[3]=3, mIndex=1, resLength=2
   *          nums1 = [1, 2, 3, 3, 5, 6]
   *
   *   第4轮: nums1[1]=2 vs nums2[0]=2 → 相等走else → nums1[2]=2, nIndex=-1, resLength=1
   *          nums1 = [1, 2, 2, 3, 5, 6]
   *
   *   nIndex < 0，主循环结束。nums2 已全部放入，nums1 剩余元素本就在正确位置。
   *   最终结果: [1, 2, 2, 3, 5, 6] ✅
   *
   * 时间复杂度: O(m + n) — 每个元素只被访问一次
   * 空间复杂度: O(1)     — 原地修改，不需要额外空间
   */

  // 指针1: 指向 nums1 有效元素的末尾
  let mIndex = m - 1;
  // 指针2: 指向 nums2 的末尾
  let nIndex = n - 1;
  // 指针3: 指向合并后数组的末尾 (即 nums1 的最后一个位置)
  let resLength = m + n - 1;
  
  while (nIndex >= 0) {
    if (mIndex >= 0 && nums1[mIndex] > nums2[nIndex]) {
      nums1[resLength--] = nums1[mIndex--];
    } else {
      nums1[resLength--] = nums2[nIndex--];
    }
  }
}

// ---- 测试用例 ----
console.log("\n📝 题目: 88. 合并两个有序数组 (Merge Sorted Array)");
const tests = [
  { nums1: [1,2,3,0,0,0], m: 3, nums2: [2,5,6], n: 3, expected: [1,2,2,3,5,6] },
  { nums1: [1], m: 1, nums2: [], n: 0, expected: [1] },
  { nums1: [0], m: 0, nums2: [1], n: 1, expected: [1] },
  { nums1: [1,3,5,0,0,0], m: 3, nums2: [2,4,6], n: 3, expected: [1,2,3,4,5,6] },
  { nums1: [4,5,6,0,0,0], m: 3, nums2: [1,2,3], n: 3, expected: [1,2,3,4,5,6] },
];

tests.forEach(({ nums1, m, nums2, n, expected }, i) => {
  console.log(`\n--- 测试 ${i + 1} ---`);
  console.log(`输入: nums1=${JSON.stringify(nums1)}, m=${m}, nums2=${JSON.stringify(nums2)}, n=${n}`);
  solution(nums1, m, nums2, n);
  console.log(`输出: ${JSON.stringify(nums1)}`);
  console.log(`期望: ${JSON.stringify(expected)}`);
  console.log(`结果: ${JSON.stringify(nums1) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
});
