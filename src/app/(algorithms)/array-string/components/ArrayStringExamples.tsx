"use client";

import { LeetCodeEditor } from "@/components/LeetCodeEditor";

export default function ArrayStringExamples() {
  return (
    <div className="space-y-8">
      {/* 示例1：两数之和 */}
      <LeetCodeEditor
        title="1. 两数之和"
        difficulty="easy"
        description={`
给定一个整数数组 \`nums\` 和一个整数目标值 \`target\`，请你在该数组中找出 **和为目标值** \`target\` 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

## 示例

**示例 1：**
\`\`\`
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,2,4], target = 6
输出：[1,2]
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [3,3], target = 6
输出：[0,1]
\`\`\`

## 提示

- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **只会存在一个有效答案**

**进阶**：你可以想出一个时间复杂度小于 \`O(n^2)\` 的算法吗？
`}
        initialCode={`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function solution(nums, target) {
  // 在这里编写你的代码

}
`}
        solution={`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function solution(nums, target) {
  // 使用哈希表优化，时间复杂度 O(n)
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}
`}
        testCases={[
          {
            id: "1",
            name: "基本测试",
            input: [[2, 7, 11, 15], 9],
            expected: [0, 1],
            description: "nums = [2,7,11,15], target = 9",
          },
          {
            id: "2",
            name: "中间元素",
            input: [[3, 2, 4], 6],
            expected: [1, 2],
            description: "nums = [3,2,4], target = 6",
          },
          {
            id: "3",
            name: "相同元素",
            input: [[3, 3], 6],
            expected: [0, 1],
            description: "nums = [3,3], target = 6",
          },
          {
            id: "4",
            name: "负数测试",
            input: [[-1, -2, -3, -4, -5], -8],
            expected: [2, 4],
            description: "nums = [-1,-2,-3,-4,-5], target = -8",
          },
        ]}
        hints={[
          "考虑使用哈希表来存储已经遍历过的元素",
          "对于每个元素，检查 target - nums[i] 是否已经在哈希表中",
          "哈希表的键是元素值，值是元素的索引",
        ]}
        documentation={`
# 解题思路

## 方法一：暴力枚举（不推荐）

最容易想到的方法是枚举数组中的每一个数 \`x\`，寻找数组中是否存在 \`target - x\`。

\`\`\`javascript
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
\`\`\`

**时间复杂度**：O(n²)
**空间复杂度**：O(1)

## 方法二：哈希表（推荐）

使用哈希表，可以将寻找 \`target - x\` 的时间复杂度降低到 O(1)。

创建一个哈希表，对于每一个 \`x\`，首先查询哈希表中是否存在 \`target - x\`，然后将 \`x\` 插入到哈希表中。

\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
\`\`\`

**时间复杂度**：O(n)
**空间复杂度**：O(n)

## 为什么先查询再插入？

如果先插入再查询，当数组中有相同元素时（如 [3, 3], target = 6），会导致找到自己而非另一个相同元素。
`}
      />
    </div>
  );
}
