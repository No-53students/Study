import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const arrayStringProblems: Problem[] = [
  // ==================== 1. 合并两个有序数组 ====================
  {
    id: "merge-sorted-array",
    leetcodeId: 88,
    title: "合并两个有序数组",
    titleEn: "Merge Sorted Array",
    difficulty: "easy",
    category: "array-string",
    tags: ["数组", "双指针", "排序"],
    frontendRelevance: "high",
    frontendNote: "双指针基础题，数组操作必会",
    description: `
给你两个按 **非递减顺序** 排列的整数数组 \`nums1\` 和 \`nums2\`，另有两个整数 \`m\` 和 \`n\`，分别表示 \`nums1\` 和 \`nums2\` 中的元素数目。

请你 **合并** \`nums2\` 到 \`nums1\` 中，使合并后的数组同样按 **非递减顺序** 排列。

**注意**：最终，合并后数组不应由函数返回，而是存储在数组 \`nums1\` 中。为了应对这种情况，\`nums1\` 的初始长度为 \`m + n\`，其中前 \`m\` 个元素表示应合并的元素，后 \`n\` 个元素为 \`0\`，应忽略。\`nums2\` 的长度为 \`n\`。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
\`\`\`

**示例 2：**
\`\`\`
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
\`\`\`

**示例 3：**
\`\`\`
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
\`\`\`
`,
    constraints: `
- \`nums1.length == m + n\`
- \`nums2.length == n\`
- \`0 <= m, n <= 200\`
- \`1 <= m + n <= 200\`
- \`-10^9 <= nums1[i], nums2[j] <= 10^9\`

**进阶**：你可以设计实现一个时间复杂度为 \`O(m + n)\` 的算法解决此问题吗？
`,
    initialCode: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} 修改 nums1 原地合并
 */
function solution(nums1, m, nums2, n) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} 修改 nums1 原地合并
 */
function solution(nums1, m, nums2, n) {
  // 逆向双指针：从后往前填充，避免覆盖
  let p1 = m - 1;      // nums1 有效元素的末尾
  let p2 = n - 1;      // nums2 的末尾
  let p = m + n - 1;   // 合并后数组的末尾

  // 从后往前比较并填充
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }

  return nums1; // 返回用于测试
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[1,2,3,0,0,0], 3, [2,5,6], 3], expected: [1,2,2,3,5,6] },
      { id: "2", name: "nums2为空", input: [[1], 1, [], 0], expected: [1] },
      { id: "3", name: "nums1为空", input: [[0], 0, [1], 1], expected: [1] },
      { id: "4", name: "交错合并", input: [[1,3,5,0,0,0], 3, [2,4,6], 3], expected: [1,2,3,4,5,6] },
      { id: "5", name: "nums2全部较小", input: [[4,5,6,0,0,0], 3, [1,2,3], 3], expected: [1,2,3,4,5,6] },
    ],
    hints: [
      "如果从前往后填充，nums1 的元素可能会被覆盖",
      "考虑从后往前填充，这样不会影响还未处理的元素",
      "使用三个指针：分别指向 nums1 的有效末尾、nums2 的末尾、以及合并后的位置",
    ],
    explanation: `
## 解题思路

### 方法一：逆向双指针（推荐）

**核心思想**：从后往前填充，利用 nums1 后面的空位

由于 nums1 的后半部分是空的，可以直接覆盖而不会丢失数据。我们可以设置指针从后向前遍历，每次取两者之中的较大者放进 nums1 的最后面。

\`\`\`
初始状态：
nums1 = [1, 2, 3, 0, 0, 0]
              ↑        ↑
             p1        p
nums2 = [2, 5, 6]
              ↑
             p2

比较 nums1[p1]=3 和 nums2[p2]=6，6 更大
nums1 = [1, 2, 3, 0, 0, 6]
           ↑        ↑
          p1        p
nums2 = [2, 5, 6]
           ↑
          p2

继续比较直到 p2 < 0
\`\`\`

**为什么是 while(p2 >= 0)?**

当 p2 < 0 时，说明 nums2 的所有元素都已经放入 nums1。此时 nums1 剩余的元素本来就在正确的位置上，不需要再移动。

### 方法二：先合并后排序

直接将 nums2 放入 nums1 的后半部分，然后排序。

\`\`\`javascript
function merge(nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  nums1.sort((a, b) => a - b);
}
\`\`\`

时间复杂度：O((m+n)log(m+n))，不满足进阶要求。

### 复杂度分析

**逆向双指针**：
- 时间复杂度：O(m + n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "逆向双指针（推荐）",
        code: `/**
 * 合并两个有序数组 - 逆向双指针解法
 *
 * 核心思想：从后往前填充，利用 nums1 后面的空位
 *
 * 为什么要从后往前？
 * - 从前往后会覆盖 nums1 中还未处理的元素
 * - 从后往前填充，nums1 后面本来就是空位(0)，可以安全覆盖
 *
 * 时间复杂度：O(m + n)，每个元素只处理一次
 * 空间复杂度：O(1)，原地操作
 */
function solution(nums1, m, nums2, n) {
  // 初始化三个指针：
  // p1: 指向 nums1 有效元素的最后一个位置
  // p2: 指向 nums2 的最后一个位置
  // p:  指向合并后数组应该填充的位置（从最后开始）
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  // 主循环：当 nums2 还有元素未处理时继续
  // 为什么只检查 p2？因为当 nums2 处理完，nums1 剩余元素已在正确位置
  while (p2 >= 0) {
    // 比较两个数组当前指针位置的元素
    // 注意：需要先检查 p1 >= 0，防止 nums1 已经处理完
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      // nums1 当前元素更大，放入合并位置
      nums1[p] = nums1[p1];
      p1--;  // nums1 指针左移
    } else {
      // nums2 当前元素更大（或 nums1 已处理完）
      nums1[p] = nums2[p2];
      p2--;  // nums2 指针左移
    }
    p--;  // 填充位置左移，准备下一次填充
  }

  // 注意：不需要处理 p1 剩余元素，它们本来就在 nums1 正确位置

  return nums1;
}`,
        explanation: `## 逆向双指针

### 思路
从后往前填充，利用 nums1 后面的空位。由于 nums1 的后半部分是空的，可以直接覆盖而不会丢失数据。

### 实现步骤
1. 设置三个指针：p1 指向 nums1 有效末尾，p2 指向 nums2 末尾，p 指向合并后位置
2. 从后往前比较，每次取较大者放入 nums1[p]
3. 当 p2 < 0 时结束，此时 nums1 剩余元素已在正确位置`,
        animation: {
          type: "two-pointers" as const,
          title: "合并两个有序数组演示",
          steps: [
            {
              array: ["1", "2", "3", "0", "0", "0"],
              left: 2,
              right: 5,
              highlights: [
                { indices: [0, 1, 2], color: "blue" as const, label: "nums1" },
                { indices: [3, 4, 5], color: "gray" as const, label: "空位" },
              ],
              description: "nums1=[1,2,3,0,0,0], m=3; nums2=[2,5,6], n=3。从后往前填充",
            },
            {
              array: ["1", "2", "3", "0", "0", "6"],
              left: 2,
              right: 5,
              highlights: [
                { indices: [2], color: "blue" as const, label: "p1=2" },
                { indices: [5], color: "green" as const, label: "填6" },
              ],
              description: "比较3和6，6更大，放入位置5。nums2指针左移",
            },
            {
              array: ["1", "2", "3", "0", "5", "6"],
              left: 2,
              right: 4,
              highlights: [
                { indices: [2], color: "blue" as const, label: "p1=2" },
                { indices: [4], color: "green" as const, label: "填5" },
              ],
              description: "比较3和5，5更大，放入位置4。nums2指针左移",
            },
            {
              array: ["1", "2", "3", "3", "5", "6"],
              left: 1,
              right: 3,
              highlights: [
                { indices: [1], color: "blue" as const, label: "p1=1" },
                { indices: [3], color: "green" as const, label: "填3" },
              ],
              description: "比较3和2，3更大，放入位置3。nums1指针左移",
            },
            {
              array: ["1", "2", "2", "3", "5", "6"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "blue" as const, label: "p1=1" },
                { indices: [2], color: "green" as const, label: "填2" },
              ],
              description: "比较2和2，相等取nums2的2，放入位置2。nums2处理完毕！",
            },
            {
              array: ["1", "2", "2", "3", "5", "6"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "完成" }],
              description: "nums1剩余元素[1,2]已在正确位置。合并完成！",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "先合并后排序",
        code: `/**
 * 合并两个有序数组 - 先合并后排序解法
 *
 * 思路：最直观的方法，先把两个数组放一起，再排序
 *
 * 缺点：没有利用"两个数组已经有序"这个条件
 * 时间复杂度：O((m+n)log(m+n))，排序的开销
 * 空间复杂度：O(log(m+n))，排序需要的栈空间
 */
function solution(nums1, m, nums2, n) {
  // 第一步：将 nums2 的所有元素复制到 nums1 的后半部分
  // nums1 本身预留了 n 个位置（值为0），正好用来存放 nums2
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];  // m + i 就是 nums1 空位的起始位置
  }

  // 第二步：对整个 nums1 进行排序
  // 使用比较函数 (a, b) => a - b 确保数字按升序排列
  // 注意：不能直接用 sort()，因为默认是按字符串排序
  nums1.sort((a, b) => a - b);

  return nums1;
}`,
        explanation: `## 先合并后排序

### 思路
直接将 nums2 放入 nums1 的后半部分，然后对整个数组排序。

### 实现步骤
1. 将 nums2 的元素复制到 nums1 的后 n 个位置
2. 对 nums1 整体排序

### 缺点
时间复杂度较高，不满足进阶要求 O(m+n)`,
        timeComplexity: "O((m+n)log(m+n))",
        spaceComplexity: "O(log(m+n))",
      },
      {
        name: "正向双指针+临时数组",
        code: `/**
 * 合并两个有序数组 - 正向双指针解法
 *
 * 思路：从前往后比较，使用临时数组存储结果
 *
 * 为什么需要临时数组？
 * - 从前往后填充会覆盖 nums1 中还未处理的元素
 * - 所以需要额外空间保存合并结果
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(m + n)，需要临时数组
 */
function solution(nums1, m, nums2, n) {
  // 创建临时数组存储合并结果
  const temp = new Array(m + n);

  // 初始化三个指针：
  // p1: nums1 的当前位置
  // p2: nums2 的当前位置
  // p:  临时数组的当前位置
  let p1 = 0, p2 = 0, p = 0;

  // 主循环：两个数组都还有元素时，比较并选择较小者
  while (p1 < m && p2 < n) {
    if (nums1[p1] <= nums2[p2]) {
      // nums1 当前元素较小或相等，优先取 nums1 的
      // 使用 <= 保持稳定性（相等时优先取 nums1）
      temp[p++] = nums1[p1++];  // 等价于 temp[p] = nums1[p1]; p++; p1++;
    } else {
      // nums2 当前元素较小
      temp[p++] = nums2[p2++];
    }
  }

  // 处理 nums1 剩余元素（如果有）
  while (p1 < m) {
    temp[p++] = nums1[p1++];
  }

  // 处理 nums2 剩余元素（如果有）
  while (p2 < n) {
    temp[p++] = nums2[p2++];
  }

  // 将临时数组的结果复制回 nums1
  for (let i = 0; i < m + n; i++) {
    nums1[i] = temp[i];
  }

  return nums1;
}`,
        explanation: `## 正向双指针+临时数组

### 思路
使用临时数组存储合并结果，从前往后比较两个数组。

### 实现步骤
1. 创建临时数组
2. 双指针从前往后比较，较小者放入临时数组
3. 处理剩余元素
4. 将临时数组复制回 nums1`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
      },
    ],
    relatedProblems: ["merge-two-sorted-lists", "sort-array-by-parity"],
  },

  // ==================== 2. 移除元素 ====================
  {
    id: "remove-element",
    leetcodeId: 27,
    title: "移除元素",
    titleEn: "Remove Element",
    difficulty: "easy",
    category: "array-string",
    tags: ["数组", "双指针"],
    frontendRelevance: "high",
    frontendNote: "数组原地操作基础",
    description: `
给你一个数组 \`nums\` 和一个值 \`val\`，你需要 **原地** 移除所有数值等于 \`val\` 的元素。元素的顺序可能发生改变。然后返回 \`nums\` 中与 \`val\` 不同的元素的数量。

假设 \`nums\` 中不等于 \`val\` 的元素数量为 \`k\`，要通过此题，您需要执行以下操作：

- 更改 \`nums\` 数组，使 \`nums\` 的前 \`k\` 个元素包含不等于 \`val\` 的元素。\`nums\` 的其余元素和 \`nums\` 的大小并不重要。
- 返回 \`k\`。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2,_,_]
解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3,_,_,_]
解释：你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,1,3,0,4。
注意这五个元素可以任意顺序返回。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
\`\`\`
`,
    constraints: `
- \`0 <= nums.length <= 100\`
- \`0 <= nums[i] <= 50\`
- \`0 <= val <= 100\`
`,
    initialCode: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function solution(nums, val) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function solution(nums, val) {
  // 快慢双指针
  let slow = 0;  // 慢指针：指向下一个要放置的位置

  for (let fast = 0; fast < nums.length; fast++) {
    // 如果当前元素不等于 val，放到慢指针位置
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[3,2,2,3], 3], expected: 2 },
      { id: "2", name: "多个目标值", input: [[0,1,2,2,3,0,4,2], 2], expected: 5 },
      { id: "3", name: "空数组", input: [[], 1], expected: 0 },
      { id: "4", name: "无匹配", input: [[1,2,3], 4], expected: 3 },
      { id: "5", name: "全部匹配", input: [[2,2,2], 2], expected: 0 },
    ],
    hints: [
      "使用双指针技巧",
      "快指针遍历数组，慢指针指向下一个要填充的位置",
      "当快指针指向的元素不等于 val 时，将其复制到慢指针位置",
    ],
    explanation: `
## 解题思路

### 方法一：快慢双指针

使用两个指针：
- **快指针**：遍历数组中的每个元素
- **慢指针**：指向下一个不等于 val 的元素应该放置的位置

\`\`\`
nums = [3, 2, 2, 3], val = 3

初始：slow = 0
fast = 0: nums[0] = 3 = val，跳过
fast = 1: nums[1] = 2 ≠ val，nums[0] = 2，slow = 1
fast = 2: nums[2] = 2 ≠ val，nums[1] = 2，slow = 2
fast = 3: nums[3] = 3 = val，跳过

结果：nums = [2, 2, 2, 3]，返回 slow = 2
\`\`\`

### 方法二：双向双指针（元素较少时更优）

当要删除的元素很少时，可以用末尾元素覆盖要删除的元素：

\`\`\`javascript
function removeElement(nums, val) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right];
      right--;
    } else {
      left++;
    }
  }

  return left;
}
\`\`\`

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "快慢双指针（推荐）",
        code: `/**
 * 移除元素 - 快慢双指针解法
 *
 * 核心思想：快指针探路，慢指针记录有效元素应该放的位置
 *
 * 双指针角色：
 * - 快指针(fast)：遍历数组的每个元素
 * - 慢指针(slow)：指向下一个有效元素应该放置的位置
 *
 * 不变性：slow 左边的所有元素都不等于 val
 *
 * 时间复杂度：O(n)，遍历一次数组
 * 空间复杂度：O(1)，原地操作
 */
function solution(nums, val) {
  // 慢指针：指向下一个有效元素应该放置的位置
  // 初始为 0，表示第一个有效元素应放在索引 0
  let slow = 0;

  // 快指针遍历整个数组
  for (let fast = 0; fast < nums.length; fast++) {
    // 如果当前元素不是要移除的值，它是有效的
    if (nums[fast] !== val) {
      // 将有效元素放到 slow 位置
      // 注意：当 slow === fast 时，这是自己赋值给自己，无害
      nums[slow] = nums[fast];
      // slow 前进，为下一个有效元素腾出位置
      slow++;
    }
    // 如果 nums[fast] === val，跳过这个元素
    // slow 不动，fast 继续前进
  }

  // slow 就是新数组的长度
  // 因为 slow 指向的是"下一个要放置的位置"
  return slow;
}`,
        explanation: `## 快慢双指针

### 思路
使用快慢双指针，快指针遍历数组，慢指针指向下一个不等于 val 的元素应该放置的位置。

### 实现步骤
1. 快指针遍历每个元素
2. 遇到不等于 val 的元素，复制到慢指针位置
3. 慢指针前进
4. 返回慢指针值（新数组长度）`,
        animation: {
          type: "two-pointers" as const,
          title: "移除元素演示",
          steps: [
            {
              array: ["3", "2", "2", "3"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[3,2,2,3], val=3。用快慢双指针原地移除等于val的元素",
            },
            {
              array: ["3", "2", "2", "3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "=val" }],
              description: "fast=0: nums[0]=3=val，跳过。slow不动",
            },
            {
              array: ["2", "2", "2", "3"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "有效" },
                { indices: [1], color: "blue" as const, label: "fast" },
              ],
              description: "fast=1: nums[1]=2≠val，放到slow=0。nums[0]=2, slow++",
            },
            {
              array: ["2", "2", "2", "3"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "有效" },
                { indices: [2], color: "blue" as const, label: "fast" },
              ],
              description: "fast=2: nums[2]=2≠val，放到slow=1。nums[1]=2, slow++",
            },
            {
              array: ["2", "2", "2", "3"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "有效" },
                { indices: [3], color: "red" as const, label: "=val" },
              ],
              description: "fast=3: nums[3]=3=val，跳过。slow不动",
            },
            {
              array: ["2", "2", "2", "3"],
              left: 2,
              right: 3,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "遍历结束。返回slow=2，nums前2个元素[2,2]为有效结果",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "双向双指针",
        code: `/**
 * 移除元素 - 双向双指针解法
 *
 * 核心思想：用末尾的元素覆盖要删除的元素
 *
 * 适用场景：当要删除的元素很少时，这种方法赋值操作更少
 *
 * 原理：我们不关心最终数组的顺序，所以可以用任意元素来覆盖
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(nums, val) {
  // left: 从头开始，检查每个元素
  // right: 从尾开始，提供"替换用"的元素
  let left = 0;
  let right = nums.length - 1;

  // 当 left > right 时，所有元素都已处理
  while (left <= right) {
    if (nums[left] === val) {
      // 当前元素需要删除，用 right 位置的元素覆盖
      nums[left] = nums[right];
      // right 左移，因为这个位置的元素已被"使用"
      right--;
      // 注意：left 不移动！因为 nums[right] 可能也等于 val
      // 需要在下一轮循环中再次检查 nums[left]
    } else {
      // 当前元素不需要删除，检查下一个
      left++;
    }
  }

  // left 就是新数组的长度
  // 此时 left > right，left 指向第一个"无效"位置
  return left;
}`,
        explanation: `## 双向双指针

### 思路
当要删除的元素很少时，用末尾元素覆盖要删除的元素更高效。

### 实现步骤
1. left 从头开始，right 从尾开始
2. 如果 nums[left] 等于 val，用 nums[right] 覆盖它，right--
3. 否则 left++
4. 直到 left > right

### 优点
当要删除的元素很少时，赋值操作更少`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["remove-duplicates-from-sorted-array", "move-zeroes"],
  },

  // ==================== 3. 删除有序数组中的重复项 ====================
  {
    id: "remove-duplicates-from-sorted-array",
    leetcodeId: 26,
    title: "删除有序数组中的重复项",
    titleEn: "Remove Duplicates from Sorted Array",
    difficulty: "easy",
    category: "array-string",
    tags: ["数组", "双指针"],
    frontendRelevance: "high",
    frontendNote: "数组去重，高频操作",
    description: `
给你一个 **非严格递增排列** 的数组 \`nums\` ，请你 **原地** 删除重复出现的元素，使每个元素 **只出现一次** ，返回删除后数组的新长度。元素的 **相对顺序** 应该保持 **一致** 。然后返回 \`nums\` 中唯一元素的个数。

考虑 \`nums\` 的唯一元素的数量为 \`k\` ，你需要做以下事情确保你的题解可以被通过：

- 更改数组 \`nums\` ，使 \`nums\` 的前 \`k\` 个元素包含唯一元素，并按照它们最初在 \`nums\` 中出现的顺序排列。\`nums\` 的其余元素与 \`nums\` 的大小不重要。
- 返回 \`k\` 。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [1,1,2]
输出：2, nums = [1,2,_]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4,_,_,_,_,_]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
\`\`\`
`,
    constraints: `
- \`1 <= nums.length <= 3 * 10^4\`
- \`-100 <= nums[i] <= 100\`
- \`nums\` 已按 **非严格递增** 排列
`,
    initialCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  if (nums.length === 0) return 0;

  // 快慢双指针
  let slow = 0;  // 慢指针：指向已处理的最后一个不重复元素

  for (let fast = 1; fast < nums.length; fast++) {
    // 发现新的不重复元素
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;  // 返回不重复元素的个数
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[1,1,2]], expected: 2 },
      { id: "2", name: "多重复元素", input: [[0,0,1,1,1,2,2,3,3,4]], expected: 5 },
      { id: "3", name: "无重复", input: [[1,2,3]], expected: 3 },
      { id: "4", name: "单元素", input: [[1]], expected: 1 },
      { id: "5", name: "全部相同", input: [[2,2,2,2]], expected: 1 },
    ],
    hints: [
      "数组是有序的，相同的元素一定相邻",
      "使用快慢双指针，慢指针指向最后一个不重复元素",
      "当快指针发现新元素时，移动慢指针并覆盖",
    ],
    explanation: `
## 解题思路

### 快慢双指针

由于数组已排序，相同元素必定相邻。我们使用双指针：
- **slow**：指向当前不重复部分的最后一个元素
- **fast**：用于遍历数组

当 \`nums[fast] !== nums[slow]\` 时，说明遇到了新元素：
1. slow 向前移动一位
2. 将新元素复制到 slow 位置

\`\`\`
nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
        ↑
       slow

fast = 1: nums[1] = 0 = nums[slow]，跳过
fast = 2: nums[2] = 1 ≠ nums[slow]，slow++，nums[1] = 1
fast = 3: nums[3] = 1 = nums[slow]，跳过
...

最终：nums = [0, 1, 2, 3, 4, ...]，返回 5
\`\`\`

### 代码模板

这是一个经典的「原地去重」模板，可以推广到更多问题：

\`\`\`javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      nums[++slow] = nums[fast];
    }
  }
  return slow + 1;
}
\`\`\`

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "快慢双指针（推荐）",
        code: `/**
 * 删除有序数组中的重复项 - 快慢双指针解法
 *
 * 核心思想：利用数组有序的特性，相同元素一定相邻
 *
 * 双指针角色：
 * - slow: 指向当前"不重复部分"的最后一个元素
 * - fast: 探索数组，寻找下一个不同的元素
 *
 * 不变性：nums[0..slow] 都是不重复的元素
 *
 * 时间复杂度：O(n)，遍历一次
 * 空间复杂度：O(1)，原地操作
 */
function solution(nums) {
  // 边界情况：空数组直接返回 0
  if (nums.length === 0) return 0;

  // slow 初始指向第一个元素（索引 0）
  // 第一个元素必定是"不重复"的（因为它前面没有元素）
  let slow = 0;

  // fast 从第二个元素开始遍历（索引 1）
  for (let fast = 1; fast < nums.length; fast++) {
    // 关键判断：当前元素是否与 slow 指向的元素不同
    if (nums[fast] !== nums[slow]) {
      // 发现新元素！执行两步：
      // 1. slow 向前移动一位，为新元素腾出位置
      slow++;
      // 2. 将新元素放到 slow 位置
      nums[slow] = nums[fast];
    }
    // 如果相同，fast 继续前进，slow 不动
    // 这样就"跳过"了重复元素
  }

  // 返回不重复元素的数量
  // slow 是最后一个不重复元素的索引，所以数量是 slow + 1
  return slow + 1;
}`,
        explanation: `## 快慢双指针

### 思路
由于数组已排序，相同元素必定相邻。使用双指针：slow 指向当前不重复部分的最后一个元素，fast 用于遍历数组。

### 实现步骤
1. slow 从 0 开始，fast 从 1 开始
2. 当 nums[fast] !== nums[slow] 时，说明遇到了新元素
3. slow 向前移动一位，将新元素复制到 slow 位置
4. 返回 slow + 1`,
        animation: {
          type: "two-pointers" as const,
          title: "删除有序数组重复项演示",
          steps: [
            {
              array: ["0", "0", "1", "1", "1", "2", "2", "3", "3", "4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "slow" }],
              description: "nums=[0,0,1,1,1,2,2,3,3,4]。slow=0指向第一个元素，fast从1开始",
            },
            {
              array: ["0", "0", "1", "1", "1", "2", "2", "3", "3", "4"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "slow" },
                { indices: [1], color: "gray" as const, label: "=slow" },
              ],
              description: "fast=1: nums[1]=0=nums[slow]，重复，跳过",
            },
            {
              array: ["0", "1", "1", "1", "1", "2", "2", "3", "3", "4"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "不重复" },
                { indices: [2], color: "blue" as const, label: "新值" },
              ],
              description: "fast=2: nums[2]=1≠nums[slow]，新元素！slow++，nums[1]=1",
            },
            {
              array: ["0", "1", "2", "1", "1", "2", "2", "3", "3", "4"],
              left: 2,
              right: 5,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "不重复" },
                { indices: [5], color: "blue" as const, label: "新值" },
              ],
              description: "fast=3,4跳过(重复)。fast=5: nums[5]=2≠1，slow++，nums[2]=2",
            },
            {
              array: ["0", "1", "2", "3", "4", "2", "2", "3", "3", "4"],
              left: 4,
              right: 9,
              highlights: [
                { indices: [0, 1, 2, 3, 4], color: "green" as const, label: "结果" },
              ],
              description: "继续处理...最终nums前5个元素为[0,1,2,3,4]，返回5",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["remove-duplicates-from-sorted-array-ii", "remove-element"],
  },

  // ==================== 4. 删除有序数组中的重复项 II ====================
  {
    id: "remove-duplicates-from-sorted-array-ii",
    leetcodeId: 80,
    title: "删除有序数组中的重复项 II",
    titleEn: "Remove Duplicates from Sorted Array II",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "双指针"],
    frontendRelevance: "medium",
    frontendNote: "数组去重变体",
    description: `
给你一个有序数组 \`nums\` ，请你 **原地** 删除重复出现的元素，使得出现次数超过两次的元素**只出现两次** ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 **原地** **修改输入数组** 并在使用 O(1) 额外空间的条件下完成。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3,_]
解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3,_,_]
解释：函数应返回新长度 length = 7, 并且原数组的前七个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
\`\`\`
`,
    constraints: `
- \`1 <= nums.length <= 3 * 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` 已按升序排列
`,
    initialCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  if (nums.length <= 2) return nums.length;

  // 通用解法：允许最多 k 个重复
  const k = 2;
  let slow = k;  // 前 k 个元素直接保留

  for (let fast = k; fast < nums.length; fast++) {
    // 与 slow - k 位置比较，判断是否超过 k 个
    if (nums[fast] !== nums[slow - k]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[1,1,1,2,2,3]], expected: 5 },
      { id: "2", name: "多种重复", input: [[0,0,1,1,1,1,2,3,3]], expected: 7 },
      { id: "3", name: "无需删除", input: [[1,1,2,2,3,3]], expected: 6 },
      { id: "4", name: "单元素", input: [[1]], expected: 1 },
      { id: "5", name: "两元素", input: [[1,1]], expected: 2 },
    ],
    hints: [
      "这是「删除有序数组中的重复项」的进阶版",
      "保持最多 k=2 个重复元素",
      "关键：比较 nums[fast] 和 nums[slow - k]",
    ],
    explanation: `
## 解题思路

### 通用解法：允许最多 k 个重复

这道题是「删除有序数组中的重复项」的推广版本。我们可以设计一个通用解法：

**核心思想**：检查当前元素是否可以放入

如果 \`nums[fast] !== nums[slow - k]\`，说明当前元素放入后不会超过 k 个重复。

\`\`\`
以 k = 2 为例：
nums = [1, 1, 1, 2, 2, 3]
              ↑
             slow (初始为 k=2)

fast = 2: nums[2]=1, nums[slow-k]=nums[0]=1
          1 === 1，跳过（已经有两个 1 了）

fast = 3: nums[3]=2, nums[slow-k]=nums[0]=1
          2 !== 1，放入，slow++
          nums = [1, 1, 2, ...]

...以此类推
\`\`\`

### 为什么比较 slow - k？

slow 指向下一个要填入的位置，\`[0, slow-1]\` 是已经处理好的部分。

如果 \`nums[fast] === nums[slow-k]\`，说明：
- 在已处理部分的末尾 k 个位置 \`[slow-k, slow-1]\` 都是这个值
- 再放入一个就会超过 k 个

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "通用双指针（推荐）",
        code: `/**
 * 删除有序数组中的重复项 II - 通用双指针解法
 *
 * 核心思想：允许每个元素最多出现 k 次（这里 k = 2）
 *
 * 关键洞察：
 * - 数组有序，相同元素一定连续
 * - 如果 nums[fast] !== nums[slow - k]，说明放入这个元素不会超过 k 个
 *
 * 为什么比较 nums[slow - k]？
 * - slow 指向"下一个要填入的位置"
 * - [slow-k, slow-1] 是最后 k 个已处理的元素
 * - 如果 nums[fast] == nums[slow-k]，说明这 k 个位置都是同一个值
 * - 再放入就会超过 k 个
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(nums) {
  // 如果数组长度 <= 2，不可能超过 2 个重复
  if (nums.length <= 2) return nums.length;

  // k 是允许的最大重复次数
  // 修改 k 的值可以解决"最多保留 k 个重复"的问题
  const k = 2;

  // slow 从 k 开始，因为前 k 个元素一定是合法的
  // （即使它们都相同，也不超过 k 个）
  let slow = k;

  // fast 也从 k 开始遍历剩余元素
  for (let fast = k; fast < nums.length; fast++) {
    // 核心判断：当前元素是否可以放入
    // 比较 nums[fast] 和 nums[slow - k]
    if (nums[fast] !== nums[slow - k]) {
      // 可以放入：放到 slow 位置
      nums[slow] = nums[fast];
      // slow 前进
      slow++;
    }
    // 如果相等，说明放入会超过 k 个，跳过
  }

  // slow 就是新数组的长度
  return slow;
}`,
        explanation: `## 通用双指针解法

### 思路
这是一个通用解法，可以处理"最多保留 k 个重复元素"的问题。

### 核心逻辑
如果 nums[fast] !== nums[slow - k]，说明当前元素放入后不会超过 k 个重复。

### 为什么比较 slow - k？
slow 指向下一个要填入的位置，如果 nums[fast] === nums[slow-k]，说明在 [slow-k, slow-1] 这 k 个位置都是这个值，再放入就会超过 k 个。`,
        animation: {
          type: "two-pointers" as const,
          title: "删除有序数组重复项II演示",
          steps: [
            {
              array: ["1", "1", "1", "2", "2", "3"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "保留" },
                { indices: [2], color: "blue" as const, label: "slow=fast" },
              ],
              description: "nums=[1,1,1,2,2,3], k=2。前k个元素直接保留，slow=fast=2开始",
            },
            {
              array: ["1", "1", "1", "2", "2", "3"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "slow-k" },
                { indices: [2], color: "red" as const, label: "=slow-k" },
              ],
              description: "fast=2: nums[2]=1=nums[0]=nums[slow-k]，超过k个，跳过",
            },
            {
              array: ["1", "1", "2", "2", "2", "3"],
              left: 3,
              right: 3,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "有效" },
                { indices: [3], color: "blue" as const, label: "新值" },
              ],
              description: "fast=3: nums[3]=2≠nums[0]=1，可放入！nums[2]=2, slow++",
            },
            {
              array: ["1", "1", "2", "2", "2", "3"],
              left: 4,
              right: 4,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "有效" },
                { indices: [4], color: "blue" as const, label: "新值" },
              ],
              description: "fast=4: nums[4]=2≠nums[1]=1，可放入！nums[3]=2, slow++",
            },
            {
              array: ["1", "1", "2", "2", "3", "3"],
              left: 5,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "结果" }],
              description: "fast=5: nums[5]=3≠nums[2]=2，可放入！最终返回5",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["remove-duplicates-from-sorted-array"],
  },

  // ==================== 5. 多数元素 ====================
  {
    id: "majority-element",
    leetcodeId: 169,
    title: "多数元素",
    titleEn: "Majority Element",
    difficulty: "easy",
    category: "array-string",
    tags: ["数组", "哈希表", "分治", "计数", "排序"],
    frontendRelevance: "high",
    frontendNote: "Boyer-Moore投票算法",
    description: `
给定一个大小为 \`n\` 的数组 \`nums\` ，返回其中的多数元素。多数元素是指在数组中出现次数 **大于** \`⌊ n/2 ⌋\` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [3,2,3]
输出：3
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [2,2,1,1,1,2,2]
输出：2
\`\`\`
`,
    constraints: `
- \`n == nums.length\`
- \`1 <= n <= 5 * 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`

**进阶**：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
`,
    initialCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  // Boyer-Moore 投票算法
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }

  return candidate;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[3,2,3]], expected: 3 },
      { id: "2", name: "多元素", input: [[2,2,1,1,1,2,2]], expected: 2 },
      { id: "3", name: "单元素", input: [[1]], expected: 1 },
      { id: "4", name: "全部相同", input: [[5,5,5,5]], expected: 5 },
      { id: "5", name: "两种元素", input: [[1,2,1,2,1]], expected: 1 },
    ],
    hints: [
      "可以使用哈希表统计每个元素的出现次数",
      "排序后中间的元素一定是多数元素",
      "Boyer-Moore 投票算法可以达到 O(1) 空间",
    ],
    explanation: `
## 解题思路

### 方法一：Boyer-Moore 投票算法（推荐）

**核心思想**：把多数元素看作 +1，其他元素看作 -1，总和一定 > 0

算法流程：
1. 维护一个候选人 \`candidate\` 和计数器 \`count\`
2. 遍历数组：
   - 如果 count = 0，更换候选人
   - 如果当前元素 = 候选人，count++
   - 否则 count--
3. 最后的候选人就是多数元素

\`\`\`
nums = [2, 2, 1, 1, 1, 2, 2]

i=0: candidate=2, count=1
i=1: nums[1]=2=candidate, count=2
i=2: nums[2]=1≠candidate, count=1
i=3: nums[3]=1≠candidate, count=0
i=4: count=0, candidate=1, count=1
i=5: nums[5]=2≠candidate, count=0
i=6: count=0, candidate=2, count=1

返回 2
\`\`\`

**为什么有效？**

多数元素出现次数 > n/2，其他所有元素总共 < n/2。
当多数元素和其他元素"抵消"后，多数元素一定还有剩余。

### 方法二：哈希表计数

\`\`\`javascript
function majorityElement(nums) {
  const map = new Map();
  const n = nums.length;

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
    if (map.get(num) > n / 2) return num;
  }
}
\`\`\`

时间 O(n)，空间 O(n)

### 方法三：排序

\`\`\`javascript
function majorityElement(nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
}
\`\`\`

时间 O(nlogn)，空间 O(1) 或 O(n)

### 复杂度分析

**Boyer-Moore 投票算法**：
- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "Boyer-Moore 投票算法（推荐）",
        code: `/**
 * 多数元素 - Boyer-Moore 投票算法
 *
 * 核心思想：多数元素出现次数 > n/2，"抵消"后必定剩余
 *
 * 算法原理（精彩！）：
 * - 把多数元素看作 +1，其他元素看作 -1
 * - 由于多数元素个数 > n/2，其他元素总数 < n/2
 * - 所以总和必定 > 0，多数元素最后一定会"胜出"
 *
 * 时间复杂度：O(n)，只遍历一次
 * 空间复杂度：O(1)，只用两个变量
 */
function solution(nums) {
  // candidate: 当前的"候选人"（可能是多数元素）
  // count: 候选人的"票数"
  let candidate = nums[0];
  let count = 1;

  // 从第二个元素开始遍历
  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      // 票数归零，更换候选人
      // 此时之前的候选人已被"抵消"完毕
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      // 遇到相同元素，票数 +1
      count++;
    } else {
      // 遇到不同元素，票数 -1（互相抵消）
      count--;
    }
  }

  // 由于多数元素一定存在，最后的候选人就是答案
  // 注意：如果不保证多数元素存在，需要再验证一遍
  return candidate;
}`,
        explanation: `## Boyer-Moore 投票算法

### 思路
把多数元素看作 +1，其他元素看作 -1，总和一定 > 0。

### 算法流程
1. 维护一个候选人 candidate 和计数器 count
2. 遍历数组：count=0 时更换候选人，相等则 count++，不等则 count--
3. 最后的候选人就是多数元素

### 为什么有效？
多数元素出现次数 > n/2，其他所有元素总共 < n/2。抵消后多数元素一定还有剩余。`,
        animation: {
          type: "two-pointers" as const,
          title: "Boyer-Moore投票算法演示",
          steps: [
            {
              array: ["2", "2", "1", "1", "1", "2", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "候选" }],
              description: "nums=[2,2,1,1,1,2,2]。candidate=2, count=1",
            },
            {
              array: ["2", "2", "1", "1", "1", "2", "2"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "=候选" },
              ],
              description: "i=1: nums[1]=2=candidate，count++→2",
            },
            {
              array: ["2", "2", "1", "1", "1", "2", "2"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "候选" },
                { indices: [2], color: "red" as const, label: "抵消" },
              ],
              description: "i=2: nums[2]=1≠candidate，count--→1",
            },
            {
              array: ["2", "2", "1", "1", "1", "2", "2"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [3], color: "red" as const, label: "抵消" },
              ],
              description: "i=3: nums[3]=1≠candidate，count--→0。候选被抵消完！",
            },
            {
              array: ["2", "2", "1", "1", "1", "2", "2"],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "blue" as const, label: "新候选" }],
              description: "i=4: count=0，更换候选！candidate=1, count=1",
            },
            {
              array: ["2", "2", "1", "1", "1", "2", "2"],
              left: 4,
              right: 6,
              highlights: [
                { indices: [5, 6], color: "green" as const, label: "2胜出" },
              ],
              description: "i=5,6: 遇2抵消后又+1...最终candidate=2, count=1。返回2",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表计数",
        code: `/**
 * 多数元素 - 哈希表计数解法
 *
 * 思路：统计每个元素的出现次数，超过 n/2 就返回
 *
 * 优点：逻辑简单，容易理解
 * 缺点：需要 O(n) 额外空间
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，哈希表存储
 */
function solution(nums) {
  // 使用 Map 统计每个元素的出现次数
  const map = new Map();
  const n = nums.length;

  for (const num of nums) {
    // 获取当前计数，不存在则为 0，然后 +1
    map.set(num, (map.get(num) || 0) + 1);

    // 一旦某个元素次数超过 n/2，立即返回
    // 提前返回可以节省时间
    if (map.get(num) > n / 2) {
      return num;
    }
  }
}`,
        explanation: `## 哈希表计数

### 思路
使用哈希表统计每个元素的出现次数，一旦某个元素次数超过 n/2 就返回。

### 优点
实现简单，容易理解。

### 缺点
需要额外的 O(n) 空间。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "排序法",
        code: `/**
 * 多数元素 - 排序解法
 *
 * 思路：排序后，多数元素一定会出现在中间位置
 *
 * 证明：
 * - 多数元素出现次数 > n/2
 * - 无论这些元素在原数组中如何分布
 * - 排序后它们会连续排列，一定会覆盖中间位置
 *
 * 时间复杂度：O(n log n)，排序的开销
 * 空间复杂度：O(log n)，排序需要的栈空间
 */
function solution(nums) {
  // 对数组进行升序排序
  nums.sort((a, b) => a - b);

  // 返回中间位置的元素
  // 由于多数元素出现次数 > n/2，中间位置一定是它
  return nums[Math.floor(nums.length / 2)];
}`,
        explanation: `## 排序法

### 思路
排序后，多数元素一定会出现在数组中间位置。

### 证明
多数元素出现次数 > n/2，无论它的分布如何，排序后它一定会覆盖中间位置。

### 缺点
时间复杂度较高，不满足进阶要求。`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
    ],
    relatedProblems: ["majority-element-ii"],
  },

  // ==================== 6. 轮转数组 ====================
  {
    id: "rotate-array",
    leetcodeId: 189,
    title: "轮转数组",
    titleEn: "Rotate Array",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "数学", "双指针"],
    frontendRelevance: "high",
    frontendNote: "数组轮转技巧",
    description: `
给定一个整数数组 \`nums\`，将数组中的元素向右轮转 \`k\` 个位置，其中 \`k\` 是非负数。
`,
    examples: `
**示例 1：**
\`\`\`
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释:
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
\`\`\`
`,
    constraints: `
- \`1 <= nums.length <= 10^5\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- \`0 <= k <= 10^5\`

**进阶**：

- 尽可能想出更多的解决方案，至少有 **三种** 不同的方法可以解决这个问题。
- 你可以使用空间复杂度为 \`O(1)\` 的 **原地** 算法解决这个问题吗？
`,
    initialCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function solution(nums, k) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function solution(nums, k) {
  const n = nums.length;
  k = k % n;  // 处理 k > n 的情况

  // 辅助函数：反转数组的一部分
  const reverse = (start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  // 三次反转
  reverse(0, n - 1);      // 反转整个数组
  reverse(0, k - 1);      // 反转前 k 个
  reverse(k, n - 1);      // 反转后 n-k 个

  return nums;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[1,2,3,4,5,6,7], 3], expected: [5,6,7,1,2,3,4] },
      { id: "2", name: "k=2", input: [[-1,-100,3,99], 2], expected: [3,99,-1,-100] },
      { id: "3", name: "k=0", input: [[1,2,3], 0], expected: [1,2,3] },
      { id: "4", name: "k>n", input: [[1,2], 3], expected: [2,1] },
      { id: "5", name: "单元素", input: [[1], 5], expected: [1] },
    ],
    hints: [
      "可以使用额外数组存储结果",
      "原地算法：考虑数组反转的性质",
      "先整体反转，再分别反转前 k 个和后 n-k 个",
    ],
    explanation: `
## 解题思路

### 方法一：三次反转（推荐）

**核心思想**：利用反转操作实现轮转

\`\`\`
原数组：    [1, 2, 3, 4, 5, 6, 7], k = 3
目标：      [5, 6, 7, 1, 2, 3, 4]

观察：后 k 个元素移到前面，前 n-k 个元素移到后面

步骤：
1. 整体反转：[7, 6, 5, 4, 3, 2, 1]
2. 反转前k个：[5, 6, 7, 4, 3, 2, 1]
3. 反转后n-k个：[5, 6, 7, 1, 2, 3, 4]
\`\`\`

**为什么有效？**

设原数组为 AB（A 是前 n-k 个，B 是后 k 个）：
- 目标是 BA
- 整体反转：(AB)^T = B^T A^T
- 分别反转：(B^T)^T (A^T)^T = BA ✓

### 方法二：使用额外数组

\`\`\`javascript
function rotate(nums, k) {
  const n = nums.length;
  const temp = new Array(n);

  for (let i = 0; i < n; i++) {
    temp[(i + k) % n] = nums[i];
  }

  for (let i = 0; i < n; i++) {
    nums[i] = temp[i];
  }
}
\`\`\`

时间 O(n)，空间 O(n)

### 方法三：环状替换

每个元素移动到最终位置，被替换的元素继续移动，直到回到起点。

\`\`\`javascript
function rotate(nums, k) {
  const n = nums.length;
  k = k % n;
  let count = 0;  // 已移动的元素个数

  for (let start = 0; count < n; start++) {
    let current = start;
    let prev = nums[start];

    do {
      const next = (current + k) % n;
      [nums[next], prev] = [prev, nums[next]];
      current = next;
      count++;
    } while (current !== start);
  }
}
\`\`\`

### 复杂度分析

**三次反转**：
- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "三次反转（推荐）",
        code: `/**
 * 轮转数组 - 三次反转解法
 *
 * 核心思想：通过反转操作实现原地轮转
 *
 * 数学原理：
 * - 设原数组为 AB（A = 前 n-k 个元素，B = 后 k 个元素）
 * - 目标是 BA
 * - 整体反转：(AB)^R = B^R A^R
 * - 再分别反转：(B^R)^R (A^R)^R = BA ✓
 *
 * 时间复杂度：O(n)，每个元素最多被访问两次
 * 空间复杂度：O(1)，原地操作
 */
function solution(nums, k) {
  const n = nums.length;
  // 处理 k >= n 的情况，轮转 n 次等于没动
  k = k % n;

  // 辅助函数：反转数组的 [start, end] 区间
  const reverse = (start, end) => {
    while (start < end) {
      // 使用解构赋值交换元素
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  // 三步反转：
  // 例：[1,2,3,4,5,6,7], k=3
  reverse(0, n - 1);      // 第1步：整体反转 → [7,6,5,4,3,2,1]
  reverse(0, k - 1);      // 第2步：反转前k个 → [5,6,7,4,3,2,1]
  reverse(k, n - 1);      // 第3步：反转后n-k个 → [5,6,7,1,2,3,4]

  return nums;
}`,
        explanation: `## 三次反转

### 思路
设原数组为 AB（A 是前 n-k 个，B 是后 k 个），目标是 BA。
- 整体反转：(AB)^T = B^T A^T
- 分别反转：(B^T)^T (A^T)^T = BA

### 步骤
1. 整体反转整个数组
2. 反转前 k 个元素
3. 反转后 n-k 个元素`,
        animation: {
          type: "two-pointers" as const,
          title: "轮转数组演示",
          steps: [
            {
              array: ["1", "2", "3", "4", "5", "6", "7"],
              left: 0,
              right: 6,
              highlights: [],
              description: "nums=[1,2,3,4,5,6,7], k=3。使用三次反转实现原地轮转",
            },
            {
              array: ["7", "6", "5", "4", "3", "2", "1"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6], color: "blue" as const, label: "整体反转" }],
              description: "第1步：整体反转 → [7,6,5,4,3,2,1]",
            },
            {
              array: ["5", "6", "7", "4", "3", "2", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "前k个" }],
              description: "第2步：反转前k=3个 → [5,6,7,4,3,2,1]",
            },
            {
              array: ["5", "6", "7", "1", "2", "3", "4"],
              left: 3,
              right: 6,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "已完成" },
                { indices: [3, 4, 5, 6], color: "green" as const, label: "后n-k个" },
              ],
              description: "第3步：反转后n-k=4个 → [5,6,7,1,2,3,4]。完成！",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "使用额外数组",
        code: `/**
 * 轮转数组 - 使用额外数组解法
 *
 * 思路：直接计算每个元素轮转后的新位置
 *
 * 公式：元素 nums[i] 轮转后的位置是 (i + k) % n
 *
 * 优点：直观易懂
 * 缺点：需要 O(n) 额外空间
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function solution(nums, k) {
  const n = nums.length;
  // 创建临时数组存储轮转后的结果
  const temp = new Array(n);

  // 计算每个元素的新位置
  for (let i = 0; i < n; i++) {
    // (i + k) % n 就是轮转后的新索引
    // 例：i=0, k=3, n=7 → 新位置 = 3
    // 例：i=5, k=3, n=7 → 新位置 = 8 % 7 = 1
    temp[(i + k) % n] = nums[i];
  }

  // 将临时数组复制回原数组
  for (let i = 0; i < n; i++) {
    nums[i] = temp[i];
  }

  return nums;
}`,
        explanation: `## 使用额外数组

### 思路
直接计算每个元素轮转后的位置，使用临时数组存储结果。

### 计算公式
元素 nums[i] 轮转后的位置是 (i + k) % n`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "环状替换",
        code: `/**
 * 轮转数组 - 环状替换解法
 *
 * 思路：每个元素直接移动到最终位置，形成替换链
 *
 * 原理：
 * - 从位置 0 开始，将元素移动到 (0+k)%n
 * - 被替换的元素继续移动到新位置
 * - 直到回到起点，形成一个"环"
 * - 如果还有元素未移动，从下一个位置开始新的环
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(nums, k) {
  const n = nums.length;
  k = k % n;
  let count = 0;  // 记录已经移动的元素个数

  // 外层循环：处理多个环
  for (let start = 0; count < n; start++) {
    let current = start;    // 当前位置
    let prev = nums[start]; // 要移动的值

    // 内层循环：处理一个环
    do {
      // 计算目标位置
      const next = (current + k) % n;
      // 交换：将 prev 放入 next，保存 next 原来的值
      [nums[next], prev] = [prev, nums[next]];
      // 移动到下一个位置
      current = next;
      count++;  // 移动了一个元素
    } while (current !== start);  // 回到起点时结束这个环
  }

  return nums;
}`,
        explanation: `## 环状替换

### 思路
每个元素移动到最终位置，被替换的元素继续移动，直到回到起点。

### 要点
- 使用 count 记录已移动的元素个数
- 当 count < n 时，从下一个起点开始新的环`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["rotate-list", "reverse-words-in-a-string"],
  },

  // ==================== 7. 买卖股票的最佳时机 ====================
  {
    id: "best-time-to-buy-and-sell-stock",
    leetcodeId: 121,
    title: "买卖股票的最佳时机",
    titleEn: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    category: "array-string",
    tags: ["数组", "动态规划"],
    frontendRelevance: "high",
    frontendNote: "贪心/DP入门",
    description: `
给定一个数组 \`prices\` ，它的第 \`i\` 个元素 \`prices[i]\` 表示一支给定股票第 \`i\` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 \`0\` 。
`,
    examples: `
**示例 1：**
\`\`\`
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
\`\`\`

**示例 2：**
\`\`\`
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
\`\`\`
`,
    constraints: `
- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^4\`
`,
    initialCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function solution(prices) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} prices
 * @return {number}
 */
function solution(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[7,1,5,3,6,4]], expected: 5 },
      { id: "2", name: "持续下跌", input: [[7,6,4,3,1]], expected: 0 },
      { id: "3", name: "单元素", input: [[1]], expected: 0 },
      { id: "4", name: "两元素上涨", input: [[1,2]], expected: 1 },
      { id: "5", name: "持续上涨", input: [[1,2,3,4,5]], expected: 4 },
    ],
    hints: [
      "遍历时记录历史最低价格",
      "计算当前价格与历史最低价格的差值",
      "维护最大利润",
    ],
    explanation: `
## 解题思路

### 一次遍历

**核心思想**：记录历史最低价格，计算当前能获得的最大利润

遍历数组，对于每一天：
1. 更新历史最低价格
2. 计算如果今天卖出能获得的利润
3. 更新最大利润

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "一次遍历（推荐）",
        code: `/**
 * 买卖股票的最佳时机 - 一次遍历解法
 *
 * 核心思想：记录历史最低价，计算当前价格卖出的利润
 *
 * 贪心策略：
 * - 我们希望在最低点买入，最高点卖出
 * - 遍历时维护"到目前为止的最低价"
 * - 对于每个价格，计算"如果今天卖出"能获得的利润
 *
 * 时间复杂度：O(n)，遍历一次
 * 空间复杂度：O(1)，只用两个变量
 */
function solution(prices) {
  // minPrice: 记录到目前为止的最低价格
  // 初始化为无穷大，确保第一个价格会更新它
  let minPrice = Infinity;
  // maxProfit: 记录能获得的最大利润
  let maxProfit = 0;

  // 遍历每一天的价格
  for (const price of prices) {
    if (price < minPrice) {
      // 发现更低的价格，更新最低价
      // 注意：这里不更新 maxProfit，因为还没卖
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      // 今天价格高于最低价，计算利润
      // 如果利润更大，更新 maxProfit
      maxProfit = price - minPrice;
    }
  }

  // 返回最大利润（如果一直下跌，maxProfit 保持为 0）
  return maxProfit;
}`,
        explanation: `## 一次遍历

### 思路
记录历史最低价格，计算当前能获得的最大利润。

### 实现步骤
1. 遍历数组，对于每一天
2. 更新历史最低价格
3. 计算如果今天卖出能获得的利润
4. 更新最大利润`,
        animation: {
          type: "two-pointers" as const,
          title: "买卖股票最佳时机演示",
          steps: [
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "min=7" }],
              description: "prices=[7,1,5,3,6,4]。minPrice=7, maxProfit=0",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "新低=1" }],
              description: "price=1<minPrice，更新minPrice=1",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "买入" },
                { indices: [2], color: "blue" as const, label: "利润=4" },
              ],
              description: "price=5, 利润=5-1=4>0，maxProfit=4",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 1,
              right: 4,
              highlights: [
                { indices: [1], color: "green" as const, label: "买入" },
                { indices: [4], color: "green" as const, label: "利润=5" },
              ],
              description: "price=6, 利润=6-1=5>4，maxProfit=5！这是最优解",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 1,
              right: 5,
              highlights: [{ indices: [1, 4], color: "green" as const, label: "最优" }],
              description: "遍历结束。在第2天买入(1)，第5天卖出(6)，最大利润=5",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `/**
 * 买卖股票的最佳时机 - 动态规划解法
 *
 * 思路：使用状态机，定义"持有股票"和"不持有股票"两种状态
 *
 * 状态定义：
 * - dp0：当前不持有股票时的最大利润
 * - dp1：当前持有股票时的最大利润
 *
 * 状态转移：
 * - dp0 = max(昨天就不持有, 今天卖出)
 * - dp1 = max(昨天就持有, 今天买入)
 *
 * 注意：只能交易一次，买入时利润从 0 开始计算
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，状态压缩后只用常数空间
 */
function solution(prices) {
  const n = prices.length;

  // 初始状态（第 0 天）：
  // dp0 = 0：第一天结束时不持有股票，利润为 0
  // dp1 = -prices[0]：第一天买入，利润为 -prices[0]
  let dp0 = 0;
  let dp1 = -prices[0];

  // 从第 1 天开始遍历
  for (let i = 1; i < n; i++) {
    // 今天不持有股票 = max(昨天就不持有, 昨天持有今天卖出)
    dp0 = Math.max(dp0, dp1 + prices[i]);
    // 今天持有股票 = max(昨天就持有, 今天买入)
    // 因为只能交易一次，买入时利润从 0 开始，所以是 -prices[i]
    dp1 = Math.max(dp1, -prices[i]);
  }

  // 最终答案：最后一天不持有股票的最大利润
  return dp0;
}`,
        explanation: `## 动态规划

### 思路
使用状态机思想，定义两个状态：持有股票和不持有股票。

### 状态转移
- dp0（不持有）= max(继续不持有, 卖出)
- dp1（持有）= max(继续持有, 买入)

### 注意
因为只能交易一次，买入时利润从 0 开始（即 -prices[i]）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["best-time-to-buy-and-sell-stock-ii"],
  },

  // ==================== 8. 买卖股票的最佳时机 II ====================
  {
    id: "best-time-to-buy-and-sell-stock-ii",
    leetcodeId: 122,
    title: "买卖股票的最佳时机 II",
    titleEn: "Best Time to Buy and Sell Stock II",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "贪心", "动态规划"],
    frontendRelevance: "high",
    frontendNote: "贪心入门",
    description: `
给你一个整数数组 \`prices\` ，其中 \`prices[i]\` 表示某支股票第 \`i\` 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 **最多** 只能持有 **一股** 股票。你也可以先购买，然后在 **同一天** 出售。

返回 你能获得的 **最大** 利润 。
`,
    examples: `
**示例 1：**
\`\`\`
输入：prices = [7,1,5,3,6,4]
输出：7
解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3。
最大总利润为 4 + 3 = 7 。
\`\`\`

**示例 2：**
\`\`\`
输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
\`\`\`

**示例 3：**
\`\`\`
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0。
\`\`\`
`,
    constraints: `
- \`1 <= prices.length <= 3 * 10^4\`
- \`0 <= prices[i] <= 10^4\`
`,
    initialCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
function solution(prices) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} prices
 * @return {number}
 */
function solution(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}`,
    testCases: [
      { id: "1", name: "多次交易", input: [[7,1,5,3,6,4]], expected: 7 },
      { id: "2", name: "持续上涨", input: [[1,2,3,4,5]], expected: 4 },
      { id: "3", name: "持续下跌", input: [[7,6,4,3,1]], expected: 0 },
      { id: "4", name: "单元素", input: [[1]], expected: 0 },
      { id: "5", name: "波动", input: [[1,2,1,2,1,2]], expected: 3 },
    ],
    hints: [
      "可以进行多次交易",
      "贪心思想：所有上涨的差价都累加",
      "把一次大的上涨拆分成多次小的上涨，利润不变",
    ],
    explanation: `
## 解题思路

### 贪心算法

**核心思想**：只要今天比昨天贵，就在昨天买今天卖

一段连续上涨的利润，等于每相邻两天差价之和。

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "贪心算法（推荐）",
        code: `/**
 * 买卖股票的最佳时机 II - 贪心解法
 *
 * 核心思想：只要今天比昨天贵，就在昨天买今天卖
 *
 * 贪心策略：
 * - 可以多次交易，那就"吃掉"所有上涨的差价
 * - 一段连续上涨的利润 = 每相邻两天差价之和
 *
 * 数学证明：
 * 假设价格为 [1, 2, 3]
 * - 第1天买第3天卖：利润 = 3 - 1 = 2
 * - 拆分成多次：(2-1) + (3-2) = 1 + 1 = 2
 * - 两种方式利润相同！
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(prices) {
  let profit = 0;  // 累计利润

  // 从第 1 天开始，比较与前一天的价格
  for (let i = 1; i < prices.length; i++) {
    // 如果今天比昨天贵，就"吃掉"这个差价
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
    // 如果今天比昨天便宜或相等，不操作
  }

  return profit;
}`,
        explanation: `## 贪心算法

### 思路
只要今天比昨天贵，就在昨天买今天卖。一段连续上涨的利润，等于每相邻两天差价之和。

### 证明
假设价格为 [1, 2, 3]：
- 第1天买，第3天卖：利润 = 3 - 1 = 2
- 拆分成：(2-1) + (3-2) = 1 + 1 = 2
- 结果相同！`,
        animation: {
          type: "two-pointers" as const,
          title: "买卖股票II演示",
          steps: [
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 0,
              right: 0,
              highlights: [],
              description: "prices=[7,1,5,3,6,4]。贪心：吃掉所有上涨差价，profit=0",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "red" as const, label: "下跌" }],
              description: "i=1: prices[1]=1<prices[0]=7，下跌，不交易",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 1,
              right: 2,
              highlights: [{ indices: [1, 2], color: "green" as const, label: "+4" }],
              description: "i=2: prices[2]=5>prices[1]=1，上涨！profit+=5-1=4",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 3,
              right: 4,
              highlights: [{ indices: [3, 4], color: "green" as const, label: "+3" }],
              description: "i=3下跌跳过。i=4: 6>3，上涨！profit+=6-3=3。总profit=7",
            },
            {
              array: ["7", "1", "5", "3", "6", "4"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [1, 2], color: "green" as const, label: "+4" },
                { indices: [3, 4], color: "green" as const, label: "+3" },
              ],
              description: "遍历结束。吃掉两段上涨：(5-1)+(6-3)=4+3=7",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `/**
 * 买卖股票的最佳时机 II - 动态规划解法
 *
 * 思路：与"买卖股票I"类似，但可以多次交易
 *
 * 状态定义：
 * - dp0：当前不持有股票时的最大利润
 * - dp1：当前持有股票时的最大利润
 *
 * 与"买卖股票I"的区别：
 * - 买入时是 dp0 - prices[i]（可以用之前的利润继续买）
 * - 而不是 -prices[i]（从0开始）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(prices) {
  const n = prices.length;
  // 初始状态
  let dp0 = 0;           // 不持有股票，利润为 0
  let dp1 = -prices[0];  // 持有股票，利润为 -prices[0]

  for (let i = 1; i < n; i++) {
    // 注意：需要同时更新，所以用临时变量
    // 今天不持有 = max(昨天就不持有, 昨天持有今天卖出)
    const newDp0 = Math.max(dp0, dp1 + prices[i]);
    // 今天持有 = max(昨天就持有, 今天买入)
    // 关键区别：买入时用 dp0 - prices[i]，允许用之前的利润
    const newDp1 = Math.max(dp1, dp0 - prices[i]);
    dp0 = newDp0;
    dp1 = newDp1;
  }

  return dp0;  // 最后不持有股票时利润最大
}`,
        explanation: `## 动态规划

### 思路
使用状态机，定义两个状态：持有股票和不持有股票。

### 状态转移
- dp0（不持有）= max(继续不持有, 卖出)
- dp1（持有）= max(继续持有, 买入)

### 与单次交易的区别
可以多次交易，所以买入时是 dp0 - prices[i]（而非 -prices[i]）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["best-time-to-buy-and-sell-stock"],
  },

  // ==================== 9. 跳跃游戏 ====================
  {
    id: "jump-game",
    leetcodeId: 55,
    title: "跳跃游戏",
    titleEn: "Jump Game",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "贪心", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "贪心判断",
    description: `
给你一个非负整数数组 \`nums\` ，你最初位于数组的 **第一个下标** 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 \`true\` ；否则，返回 \`false\` 。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
\`\`\`
`,
    constraints: `
- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 10^5\`
`,
    initialCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function solution(nums) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function solution(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }

  return true;
}`,
    testCases: [
      { id: "1", name: "可以到达", input: [[2,3,1,1,4]], expected: true },
      { id: "2", name: "无法到达", input: [[3,2,1,0,4]], expected: false },
      { id: "3", name: "单元素", input: [[0]], expected: true },
      { id: "4", name: "直接跳到", input: [[5,0,0,0,0]], expected: true },
      { id: "5", name: "每步只能跳1", input: [[1,1,1,1]], expected: true },
    ],
    hints: [
      "贪心思想：维护能到达的最远位置",
      "遍历时检查当前位置是否可达",
      "如果最远位置 >= 数组长度-1，就能到达终点",
    ],
    explanation: `
## 解题思路

### 贪心算法

**核心思想**：维护能到达的最远位置 \`maxReach\`

遍历数组，对于每个位置 i：
1. 检查 i 是否可达（i <= maxReach）
2. 更新 maxReach = max(maxReach, i + nums[i])
3. 如果 maxReach >= n-1，返回 true

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "贪心算法（推荐）",
        code: `/**
 * 跳跃游戏 - 贪心解法
 *
 * 核心思想：维护能到达的最远位置 maxReach
 *
 * 贪心策略：
 * - 遍历数组，不断更新能到达的最远位置
 * - 如果某个位置超过了 maxReach，说明无法到达，返回 false
 * - 如果 maxReach >= n-1，说明能到达终点，返回 true
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(nums) {
  // maxReach: 从起点出发，能到达的最远位置
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    // 关键检查：当前位置是否可达
    // 如果 i > maxReach，说明无法到达位置 i
    if (i > maxReach) return false;

    // 更新最远可达位置
    // i + nums[i] 表示从位置 i 能跳到的最远位置
    maxReach = Math.max(maxReach, i + nums[i]);

    // 优化：如果已经能到达终点，提前返回
    if (maxReach >= nums.length - 1) return true;
  }

  return true;
}`,
        explanation: `## 贪心算法

### 思路
维护能到达的最远位置 maxReach。

### 实现步骤
1. 遍历数组，对于每个位置 i
2. 检查 i 是否可达（i <= maxReach）
3. 更新 maxReach = max(maxReach, i + nums[i])
4. 如果 maxReach >= n-1，返回 true`,
        animation: {
          type: "two-pointers" as const,
          title: "跳跃游戏演示",
          steps: [
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "start" }],
              description: "nums=[2,3,1,1,4]。从位置0开始，maxReach=0",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "可达" },
                { indices: [1, 2], color: "blue" as const, label: "范围" },
              ],
              description: "i=0: maxReach=max(0,0+2)=2。可以跳到位置1或2",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "可达" },
                { indices: [2, 3, 4], color: "blue" as const, label: "范围" },
              ],
              description: "i=1: 1<=2可达。maxReach=max(2,1+3)=4>=4，可达终点！",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "全可达" }],
              description: "maxReach=4>=n-1=4，返回true。可以跳跃到达终点！",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `/**
 * 跳跃游戏 - 动态规划解法
 *
 * 思路：dp[i] 表示能否到达位置 i
 *
 * 状态转移：
 * - 对于位置 i，检查之前的每个位置 j
 * - 如果 dp[j] = true 且 j + nums[j] >= i
 * - 则 dp[i] = true
 *
 * 缺点：时间复杂度 O(n²)，效率较低
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n)
 */
function solution(nums) {
  const n = nums.length;
  // dp[i] 表示能否到达位置 i
  const dp = new Array(n).fill(false);
  // 起点一定能到达
  dp[0] = true;

  // 对于每个位置 i，检查是否能从之前的某个位置跳过来
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // 条件：位置 j 可达，且从 j 能跳到 i
      if (dp[j] && j + nums[j] >= i) {
        dp[i] = true;
        break;  // 找到一个就够了，提前退出
      }
    }
  }

  return dp[n - 1];
}`,
        explanation: `## 动态规划

### 思路
dp[i] 表示能否到达位置 i。

### 状态转移
对于位置 i，检查之前的每个位置 j，如果 dp[j]=true 且 j+nums[j]>=i，则 dp[i]=true。

### 缺点
时间复杂度 O(n²)，效率较低`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
    relatedProblems: ["jump-game-ii"],
  },

  // ==================== 10. 跳跃游戏 II ====================
  {
    id: "jump-game-ii",
    leetcodeId: 45,
    title: "跳跃游戏 II",
    titleEn: "Jump Game II",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "贪心", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "贪心跳跃",
    description: `
给定一个长度为 \`n\` 的 **0 索引**整数数组 \`nums\`。初始位置为 \`nums[0]\`。

每个元素 \`nums[i]\` 表示从索引 \`i\` 向前跳转的最大长度。换句话说，如果你在 \`nums[i]\` 处，你可以跳转到任意 \`nums[i + j]\` 处:

- \`0 <= j <= nums[i]\`
- \`i + j < n\`

返回到达 \`nums[n - 1]\` 的最小跳跃次数。生成的测试用例可以到达 \`nums[n - 1]\`。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [2,3,1,1,4]
输出：2
解释：跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [2,3,0,1,4]
输出：2
\`\`\`
`,
    constraints: `
- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 1000\`
- 题目保证可以到达 \`nums[n-1]\`
`,
    initialCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @return {number}
 */
function solution(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[2,3,1,1,4]], expected: 2 },
      { id: "2", name: "有0的情况", input: [[2,3,0,1,4]], expected: 2 },
      { id: "3", name: "单元素", input: [[0]], expected: 0 },
      { id: "4", name: "两元素", input: [[1,2]], expected: 1 },
      { id: "5", name: "一步到位", input: [[5,1,1,1,1]], expected: 1 },
    ],
    hints: [
      "贪心：在当前跳跃范围内，找能跳得最远的位置",
      "当到达当前跳跃的边界时，必须跳一次",
      "更新边界为之前记录的最远位置",
    ],
    explanation: `
## 解题思路

### 贪心算法

**核心思想**：在当前能跳到的范围内，找下一步能跳得最远的位置

维护三个变量：
- \`jumps\`: 跳跃次数
- \`currentEnd\`: 当前跳跃能到达的边界
- \`farthest\`: 在当前范围内能跳到的最远位置

当遍历到 currentEnd 时，必须跳一次，更新边界。

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "贪心算法（推荐）",
        code: `/**
 * 跳跃游戏 II - 贪心解法
 *
 * 核心思想：在当前能跳到的范围内，找下一步能跳得最远的位置
 *
 * 三个关键变量：
 * - jumps: 已经跳跃的次数
 * - currentEnd: 当前这一跳能到达的边界
 * - farthest: 在 [0, i] 范围内能跳到的最远位置
 *
 * 算法流程：
 * 1. 遍历数组（注意：不需要遍历最后一个元素）
 * 2. 更新 farthest
 * 3. 当到达 currentEnd 时，必须跳一次，更新边界
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(nums) {
  let jumps = 0;        // 跳跃次数
  let currentEnd = 0;   // 当前跳跃能到达的边界
  let farthest = 0;     // 能跳到的最远位置

  // 注意：遍历到 nums.length - 2 即可
  // 因为我们不需要从最后一个位置再跳
  for (let i = 0; i < nums.length - 1; i++) {
    // 更新从位置 i 能跳到的最远位置
    farthest = Math.max(farthest, i + nums[i]);

    // 到达当前跳跃的边界
    if (i === currentEnd) {
      // 必须再跳一次
      jumps++;
      // 下一跳的边界是之前记录的最远位置
      currentEnd = farthest;
    }
  }

  return jumps;
}`,
        explanation: `## 贪心算法

### 思路
在当前能跳到的范围内，找下一步能跳得最远的位置。

### 实现
维护三个变量：
- jumps: 跳跃次数
- currentEnd: 当前跳跃能到达的边界
- farthest: 在当前范围内能跳到的最远位置

当遍历到 currentEnd 时，必须跳一次，更新边界。`,
        animation: {
          type: "two-pointers" as const,
          title: "跳跃游戏 II 演示",
          steps: [
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "start" }],
              description: "nums=[2,3,1,1,4]。初始: jumps=0, currentEnd=0, farthest=0",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "i=0" },
                { indices: [1, 2], color: "blue" as const, label: "可达" },
              ],
              description: "i=0: farthest=max(0,0+2)=2。i==currentEnd，jumps=1，currentEnd=2",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 1,
              right: 4,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已跳" },
                { indices: [1], color: "green" as const, label: "i=1" },
                { indices: [2, 3, 4], color: "blue" as const, label: "可达" },
              ],
              description: "i=1: farthest=max(2,1+3)=4。可以跳到位置4（终点）",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 2,
              right: 4,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已过" },
                { indices: [2], color: "green" as const, label: "i=2" },
                { indices: [4], color: "blue" as const, label: "终点" },
              ],
              description: "i=2: farthest=max(4,2+1)=4。i==currentEnd(2)，jumps=2，currentEnd=4",
            },
            {
              array: ["2", "3", "1", "1", "4"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "完成" }],
              description: "i=3时不需处理（遍历到length-2）。最少需要2次跳跃到达终点",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "BFS 思想",
        code: `/**
 * 跳跃游戏 II - BFS 思想解法
 *
 * 核心思想：把问题看作图的 BFS，每次跳跃相当于扩展一层
 *
 * 类比 BFS：
 * - 每个位置是一个节点
 * - 从位置 i 可以跳到的位置是它的邻居节点
 * - 求从起点到终点的最短路径长度
 *
 * 实现：
 * - [start, end] 是当前"层"的范围
 * - 计算下一层能到达的最远位置
 * - 每扩展一层，jumps++
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(nums) {
  // 特殊情况：已经在终点
  if (nums.length <= 1) return 0;

  let jumps = 0;   // 跳跃次数（BFS 层数）
  let start = 0;   // 当前层的起始位置
  let end = 0;     // 当前层的结束位置

  // 当还没到达终点时
  while (end < nums.length - 1) {
    let maxEnd = end;  // 下一层能到达的最远位置

    // 遍历当前层的所有位置
    for (let i = start; i <= end; i++) {
      // 更新下一层的最远位置
      maxEnd = Math.max(maxEnd, i + nums[i]);
    }

    // 更新到下一层
    start = end + 1;  // 下一层从 end+1 开始
    end = maxEnd;     // 下一层到 maxEnd 结束
    jumps++;          // 层数 +1
  }

  return jumps;
}`,
        explanation: `## BFS 思想

### 思路
把问题看作图的 BFS，每次跳跃相当于扩展一层。

### 实现
- [start, end] 是当前层的范围
- 计算下一层能到达的最远位置
- 每扩展一层，jumps++`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: ["jump-game"],
  },

  // ==================== 11. H 指数 ====================
  {
    id: "h-index",
    leetcodeId: 274,
    title: "H 指数",
    titleEn: "H-Index",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "计数排序", "排序"],
    frontendRelevance: "low",
    frontendNote: "H指数，学术场景",
    description: `
给你一个整数数组 \`citations\` ，其中 \`citations[i]\` 表示研究者的第 \`i\` 篇论文被引用的次数。计算并返回该研究者的 **h 指数**。

根据维基百科上 h 指数的定义：\`h\` 代表"高引用次数" ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 **至少** 有 h 篇论文被引用次数大于等于 h 。如果 h 有多种可能的值，**h 指数** 是其中最大的那个。
`,
    examples: `
**示例 1：**
\`\`\`
输入：citations = [3,0,6,1,5]
输出：3
解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
     由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。
\`\`\`

**示例 2：**
\`\`\`
输入：citations = [1,3,1]
输出：1
\`\`\`
`,
    constraints: `
- \`n == citations.length\`
- \`1 <= n <= 5000\`
- \`0 <= citations[i] <= 1000\`
`,
    initialCode: `/**
 * @param {number[]} citations
 * @return {number}
 */
function solution(citations) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} citations
 * @return {number}
 */
function solution(citations) {
  citations.sort((a, b) => b - a);

  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      h = i + 1;
    } else {
      break;
    }
  }

  return h;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[3,0,6,1,5]], expected: 3 },
      { id: "2", name: "简单情况", input: [[1,3,1]], expected: 1 },
      { id: "3", name: "全0", input: [[0,0,0]], expected: 0 },
      { id: "4", name: "单元素", input: [[100]], expected: 1 },
      { id: "5", name: "相同值", input: [[5,5,5,5,5]], expected: 5 },
    ],
    hints: [
      "先对数组降序排序",
      "从大到小遍历，找满足 citations[i] >= i+1 的最大 i+1",
      "也可以使用计数排序达到 O(n) 时间",
    ],
    explanation: `
## 解题思路

### 排序法

**核心思想**：降序排序后，找最大的 h 使得前 h 篇论文引用数都 >= h

1. 降序排序
2. 从左到右遍历，如果第 i+1 篇论文引用数 >= i+1，说明至少有 i+1 篇论文引用数 >= i+1
3. 继续直到不满足条件

### 复杂度分析

- 时间复杂度：O(n log n)
- 空间复杂度：O(log n)
`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    solutions: [
      {
        name: "排序法（推荐）",
        code: `/**
 * H 指数 - 排序解法
 *
 * 核心思想：降序排序后，找最大的 h 使得前 h 篇论文引用数都 >= h
 *
 * H 指数定义：
 * - h 指数是指至少有 h 篇论文被引用次数 >= h
 * - 我们要找满足条件的最大 h
 *
 * 排序后的性质：
 * - 第 i+1 篇论文的引用数是 citations[i]
 * - 如果 citations[i] >= i+1，说明至少有 i+1 篇论文引用数 >= i+1
 *
 * 时间复杂度：O(n log n)，排序开销
 * 空间复杂度：O(log n)，排序栈空间
 */
function solution(citations) {
  // 降序排序：引用数高的排在前面
  citations.sort((a, b) => b - a);

  let h = 0;
  for (let i = 0; i < citations.length; i++) {
    // 第 i+1 篇论文（排序后）的引用数
    // 如果 >= i+1，说明至少有 i+1 篇论文引用数 >= i+1
    if (citations[i] >= i + 1) {
      h = i + 1;  // 更新 h 指数
    } else {
      // 引用数 < 篇数，后面的只会更小，提前退出
      break;
    }
  }

  return h;
}`,
        explanation: `## 排序法

### 思路
降序排序后，找最大的 h 使得前 h 篇论文引用数都 >= h。

### 实现
1. 降序排序
2. 从左到右遍历，如果第 i+1 篇论文引用数 >= i+1
3. 说明至少有 i+1 篇论文引用数 >= i+1`,
        animation: {
          type: "two-pointers" as const,
          title: "H指数演示",
          steps: [
            {
              array: ["3", "0", "6", "1", "5"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "原数组" }],
              description: "citations=[3,0,6,1,5]。先降序排序",
            },
            {
              array: ["6", "5", "3", "1", "0"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "排序后" }],
              description: "排序后: [6,5,3,1,0]。开始检查h指数",
            },
            {
              array: ["6", "5", "3", "1", "0"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "i=0" }],
              description: "i=0: citations[0]=6 >= 1，h=1。至少有1篇论文引用>=1",
            },
            {
              array: ["6", "5", "3", "1", "0"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已检查" },
                { indices: [1], color: "green" as const, label: "i=1" },
              ],
              description: "i=1: citations[1]=5 >= 2，h=2。至少有2篇论文引用>=2",
            },
            {
              array: ["6", "5", "3", "1", "0"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已检查" },
                { indices: [2], color: "green" as const, label: "i=2" },
              ],
              description: "i=2: citations[2]=3 >= 3，h=3。至少有3篇论文引用>=3",
            },
            {
              array: ["6", "5", "3", "1", "0"],
              left: 3,
              right: 3,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "h=3" },
                { indices: [3], color: "red" as const, label: "不满足" },
              ],
              description: "i=3: citations[3]=1 < 4，不满足条件，停止。H指数=3",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "计数排序",
        code: `/**
 * H 指数 - 计数排序解法
 *
 * 核心思想：h 指数最大为 n，可以用计数排序优化
 *
 * 关键洞察：
 * - h 指数最大不超过论文总数 n
 * - 所以引用数 > n 的论文，按 n 算即可
 * - 这样可以用大小为 n+1 的数组计数
 *
 * 算法流程：
 * 1. 统计每个引用数的论文数量
 * 2. 从大到小累计，找第一个 total >= i 的 i
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function solution(citations) {
  const n = citations.length;
  // count[i] = 引用数为 i 的论文数量
  // count[n] = 引用数 >= n 的论文数量
  const count = new Array(n + 1).fill(0);

  // 统计每个引用数的论文数量
  for (const c of citations) {
    // 超过 n 的都算作 n（因为 h 指数最大就是 n）
    count[Math.min(c, n)]++;
  }

  // 从大到小累计
  // total 表示引用数 >= i 的论文数量
  let total = 0;
  for (let i = n; i >= 0; i--) {
    total += count[i];
    // 如果引用数 >= i 的论文数量 >= i，则 h = i
    if (total >= i) {
      return i;
    }
  }

  return 0;
}`,
        explanation: `## 计数排序

### 思路
h 指数最大为 n，所以可以用计数排序。

### 实现
1. 统计每个引用数的论文数量（超过 n 的算作 n）
2. 从大到小累计，找到第一个 total >= i 的 i`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
    relatedProblems: [],
  },

  // ==================== 12. 除自身以外数组的乘积 ====================
  {
    id: "product-of-array-except-self",
    leetcodeId: 238,
    title: "除自身以外数组的乘积",
    titleEn: "Product of Array Except Self",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "前缀和"],
    frontendRelevance: "high",
    frontendNote: "前缀积技巧，常考",
    description: `
给你一个整数数组 \`nums\`，返回 数组 \`answer\` ，其中 \`answer[i]\` 等于 \`nums\` 中除 \`nums[i]\` 之外其余各元素的乘积 。

题目数据 **保证** 数组 \`nums\` 之中任意元素的全部前缀元素和后缀的乘积都在 **32 位** 整数范围内。

请 **不要使用除法**，且在 \`O(n)\` 时间复杂度内完成此题。
`,
    examples: `
**示例 1：**
\`\`\`
输入：nums = [1,2,3,4]
输出：[24,12,8,6]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [-1,1,0,-3,3]
输出：[0,0,9,0,0]
\`\`\`
`,
    constraints: `
- \`2 <= nums.length <= 10^5\`
- \`-30 <= nums[i] <= 30\`
- 保证 数组 \`nums\` 之中任意元素的全部前缀元素和后缀的乘积都在 **32 位** 整数范围内

**进阶**：你可以在 \`O(1)\` 的额外空间复杂度内完成这个题目吗？（出于对空间复杂度分析的目的，输出数组 **不被视为** 额外空间）
`,
    initialCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function solution(nums) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function solution(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // 计算左侧乘积
  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;
    left *= nums[i];
  }

  // 计算右侧乘积并合并
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right;
    right *= nums[i];
  }

  return answer;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[1,2,3,4]], expected: [24,12,8,6] },
      { id: "2", name: "含0", input: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] },
      { id: "3", name: "两元素", input: [[2,3]], expected: [3,2] },
      { id: "4", name: "含负数", input: [[-1,-2,-3]], expected: [6,3,2] },
      { id: "5", name: "多个0", input: [[0,0,1]], expected: [0,0,0] },
    ],
    hints: [
      "answer[i] = 左侧所有数的乘积 × 右侧所有数的乘积",
      "先从左到右计算左侧乘积",
      "再从右到左计算右侧乘积并合并",
    ],
    explanation: `
## 解题思路

### 左右乘积列表

**核心思想**：answer[i] = 左侧乘积 × 右侧乘积

1. 第一次遍历：计算每个位置左侧所有元素的乘积
2. 第二次遍历：计算每个位置右侧所有元素的乘积，同时与左侧乘积相乘

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)（输出数组不算额外空间）
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "左右乘积（推荐）",
        code: `/**
 * 除自身以外数组的乘积 - 左右乘积解法
 *
 * 核心思想：answer[i] = 左侧所有数的乘积 × 右侧所有数的乘积
 *
 * 为什么不能用总乘积除以 nums[i]？
 * - 题目要求不能使用除法
 * - 如果有 0 存在，除法也会出问题
 *
 * 算法流程：
 * 1. 第一次从左到右遍历，计算每个位置左侧的乘积
 * 2. 第二次从右到左遍历，计算右侧乘积并与左侧相乘
 *
 * 空间优化：
 * - 使用 answer 数组存储左侧乘积
 * - 用一个变量 right 存储右侧乘积（动态计算）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，输出数组不算额外空间
 */
function solution(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // 第一遍：从左到右，计算每个位置左侧的乘积
  // left 表示 nums[0..i-1] 的乘积
  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;       // answer[i] 先存储左侧乘积
    left *= nums[i];        // 更新 left，加入 nums[i]
  }

  // 第二遍：从右到左，计算右侧乘积并与左侧相乘
  // right 表示 nums[i+1..n-1] 的乘积
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right;     // 左侧乘积 × 右侧乘积
    right *= nums[i];       // 更新 right，加入 nums[i]
  }

  return answer;
}`,
        explanation: `## 左右乘积

### 思路
answer[i] = 左侧乘积 × 右侧乘积

### 实现
1. 第一次遍历：计算每个位置左侧所有元素的乘积
2. 第二次遍历：计算右侧乘积并与左侧乘积相乘

### 空间优化
使用 answer 数组存储左侧乘积，用变量存储右侧乘积`,
        animation: {
          type: "two-pointers" as const,
          title: "除自身以外数组的乘积演示",
          steps: [
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "nums" }],
              description: "nums=[1,2,3,4]。answer[i]=左侧乘积×右侧乘积",
            },
            {
              array: ["1", "1", "1", "1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "left=1" }],
              description: "第一遍: i=0, answer[0]=1(左边无元素), left=1*1=1",
            },
            {
              array: ["1", "1", "1", "1"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已处理" },
                { indices: [1], color: "green" as const, label: "left=1" },
              ],
              description: "i=1: answer[1]=1(左边乘积), left=1*2=2",
            },
            {
              array: ["1", "1", "2", "6"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已处理" },
                { indices: [2, 3], color: "green" as const, label: "处理中" },
              ],
              description: "继续: answer[2]=2, answer[3]=6。左侧乘积完成",
            },
            {
              array: ["24", "12", "8", "6"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "结果" }],
              description: "第二遍从右往左: answer[i]*=right。最终结果=[24,12,8,6]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "两个数组",
        code: `/**
 * 除自身以外数组的乘积 - 两个数组解法
 *
 * 思路：分别用两个数组存储左侧乘积和右侧乘积
 *
 * 定义：
 * - left[i] = nums[0] * nums[1] * ... * nums[i-1]
 * - right[i] = nums[i+1] * nums[i+2] * ... * nums[n-1]
 * - answer[i] = left[i] * right[i]
 *
 * 边界情况：
 * - left[0] = 1（左边没有元素）
 * - right[n-1] = 1（右边没有元素）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，需要额外的两个数组
 */
function solution(nums) {
  const n = nums.length;
  // left[i] 存储 nums[0..i-1] 的乘积
  const left = new Array(n).fill(1);
  // right[i] 存储 nums[i+1..n-1] 的乘积
  const right = new Array(n).fill(1);

  // 计算左侧乘积数组
  // left[0] = 1（左边没有元素）
  for (let i = 1; i < n; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  // 计算右侧乘积数组
  // right[n-1] = 1（右边没有元素）
  for (let i = n - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }

  // 合并结果
  const answer = [];
  for (let i = 0; i < n; i++) {
    answer[i] = left[i] * right[i];
  }

  return answer;
}`,
        explanation: `## 两个数组

### 思路
使用两个数组分别存储左侧乘积和右侧乘积，最后合并。

### 缺点
需要 O(n) 额外空间`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
    relatedProblems: [],
  },

  // ==================== 13. 加油站 ====================
  {
    id: "gas-station",
    leetcodeId: 134,
    title: "加油站",
    titleEn: "Gas Station",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "贪心"],
    frontendRelevance: "medium",
    frontendNote: "贪心环形",
    description: `
在一条环路上有 \`n\` 个加油站，其中第 \`i\` 个加油站有汽油 \`gas[i]\` 升。

你有一辆油箱容量无限的的汽车，从第 \`i\` 个加油站开往第 \`i+1\` 个加油站需要消耗汽油 \`cost[i]\` 升。你从其中的一个加油站出发，开始时油箱为空。

给定两个整数数组 \`gas\` 和 \`cost\` ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 \`-1\` 。如果存在解，则 **保证** 它是 **唯一** 的。
`,
    examples: `
**示例 1：**
\`\`\`
输入：gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出：3
解释：
从 3 号加油站出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。
\`\`\`

**示例 2：**
\`\`\`
输入：gas = [2,3,4], cost = [3,4,3]
输出：-1
解释：
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绑环路行驶一周。
\`\`\`
`,
    constraints: `
- \`gas.length == n\`
- \`cost.length == n\`
- \`1 <= n <= 10^5\`
- \`0 <= gas[i], cost[i] <= 10^4\`
`,
    initialCode: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function solution(gas, cost) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
function solution(gas, cost) {
  let totalGas = 0;
  let currentGas = 0;
  let startIndex = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i] - cost[i];
    currentGas += gas[i] - cost[i];

    if (currentGas < 0) {
      startIndex = i + 1;
      currentGas = 0;
    }
  }

  return totalGas >= 0 ? startIndex : -1;
}`,
    testCases: [
      { id: "1", name: "可以完成", input: [[1,2,3,4,5], [3,4,5,1,2]], expected: 3 },
      { id: "2", name: "无法完成", input: [[2,3,4], [3,4,3]], expected: -1 },
      { id: "3", name: "单站点可完成", input: [[5], [4]], expected: 0 },
      { id: "4", name: "单站点不可完成", input: [[2], [3]], expected: -1 },
      { id: "5", name: "从0开始", input: [[3,1,1], [1,2,2]], expected: 0 },
    ],
    hints: [
      "如果总油量 < 总消耗，一定无解",
      "如果从 i 出发到不了 j，那么从 i 到 j 之间的任何站点出发也到不了 j",
      "一次遍历同时计算总油量和当前油量",
    ],
    explanation: `
## 解题思路

### 贪心算法

**核心思想**：
1. 如果 sum(gas) < sum(cost)，无解
2. 如果从 i 无法到达 j，则 i 到 j-1 之间的所有点都无法到达 j

遍历一次，维护当前油量。当油量 < 0 时，说明当前起点不行，尝试下一个点作为起点。

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "贪心算法（推荐）",
        code: `/**
 * 加油站 - 贪心解法
 *
 * 核心思想：
 * 1. 如果总油量 < 总消耗，一定无解
 * 2. 如果从 i 无法到达 j，则 i 到 j-1 之间的任何点都无法到达 j
 *
 * 贪心策略：
 * - 维护当前油量 currentGas
 * - 当 currentGas < 0 时，说明从 startIndex 出发无法到达当前位置
 * - 此时将起点设为下一个位置，重置 currentGas
 *
 * 为什么正确？
 * - 如果从 A 到不了 B，说明 A 到 B 之间某处油量变负
 * - 从 A 到任何中间点 C 的油量 >= 0
 * - 从 C 出发少了 A 到 C 这段的"贡献"，更不可能到 B
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function solution(gas, cost) {
  let totalGas = 0;    // 总油量差，用于判断是否有解
  let currentGas = 0;  // 当前累积油量
  let startIndex = 0;  // 候选起点

  for (let i = 0; i < gas.length; i++) {
    // 计算在站点 i 的净油量（获得 - 消耗）
    const netGas = gas[i] - cost[i];
    totalGas += netGas;    // 累加总油量差
    currentGas += netGas;  // 累加当前油量

    // 如果当前油量变负，说明从 startIndex 出发到不了 i+1
    if (currentGas < 0) {
      // 尝试从 i+1 出发
      startIndex = i + 1;
      // 重置当前油量
      currentGas = 0;
    }
  }

  // 如果总油量 >= 总消耗，则一定有解，答案就是 startIndex
  // 否则无解，返回 -1
  return totalGas >= 0 ? startIndex : -1;
}`,
        explanation: `## 贪心算法

### 思路
1. 如果 sum(gas) < sum(cost)，无解
2. 如果从 i 无法到达 j，则 i 到 j-1 之间的所有点都无法到达 j

### 实现
遍历一次，维护当前油量。当油量 < 0 时，说明当前起点不行，尝试下一个点作为起点。`,
        animation: {
          type: "two-pointers" as const,
          title: "加油站演示",
          steps: [
            {
              array: ["1", "2", "3", "4", "5"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "gas" }],
              description: "gas=[1,2,3,4,5], cost=[3,4,5,1,2]。找起点使得能绕一圈",
            },
            {
              array: ["-2", "-2", "-2", "3", "3"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "净油量" }],
              description: "净油量: gas[i]-cost[i] = [-2,-2,-2,3,3]。总和=0>=0，有解",
            },
            {
              array: ["-2", "-2", "-2", "3", "3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "start=0" }],
              description: "从0开始: currentGas=-2<0，起点改为1",
            },
            {
              array: ["-2", "-2", "-2", "3", "3"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "失败" },
                { indices: [1], color: "red" as const, label: "start=1" },
              ],
              description: "从1开始: currentGas=-2<0，起点改为2",
            },
            {
              array: ["-2", "-2", "-2", "3", "3"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "失败" },
                { indices: [2], color: "red" as const, label: "start=2" },
              ],
              description: "从2开始: currentGas=-2<0，起点改为3",
            },
            {
              array: ["-2", "-2", "-2", "3", "3"],
              left: 3,
              right: 4,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "失败" },
                { indices: [3, 4], color: "green" as const, label: "start=3" },
              ],
              description: "从3开始: currentGas=3+3=6>=0，遍历结束。答案是3",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
    relatedProblems: [],
  },

  // ==================== 14. 分发糖果 ====================
  {
    id: "candy",
    leetcodeId: 135,
    title: "分发糖果",
    titleEn: "Candy",
    difficulty: "hard",
    category: "array-string",
    tags: ["数组", "贪心"],
    frontendRelevance: "low",
    frontendNote: "分发糖果Hard",
    description: `
\`n\` 个孩子站成一排。给你一个整数数组 \`ratings\` 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

- 每个孩子至少分配到 \`1\` 个糖果。
- 相邻两个孩子评分更高的孩子会获得更多的糖果。

请你给每个孩子分发糖果，计算并返回需要准备的 **最少糖果数目** 。
`,
    examples: `
**示例 1：**
\`\`\`
输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
\`\`\`

**示例 2：**
\`\`\`
输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
\`\`\`
`,
    constraints: `
- \`n == ratings.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= ratings[i] <= 2 * 10^4\`
`,
    initialCode: `/**
 * @param {number[]} ratings
 * @return {number}
 */
function solution(ratings) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} ratings
 * @return {number}
 */
function solution(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // 从左到右：右边比左边高，右边+1
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // 从右到左：左边比右边高，取较大值
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((a, b) => a + b, 0);
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[1,0,2]], expected: 5 },
      { id: "2", name: "相邻相等", input: [[1,2,2]], expected: 4 },
      { id: "3", name: "单元素", input: [[1]], expected: 1 },
      { id: "4", name: "递增", input: [[1,2,3]], expected: 6 },
      { id: "5", name: "递减", input: [[3,2,1]], expected: 6 },
    ],
    hints: [
      "两次遍历，分别处理左右关系",
      "第一次从左到右，保证右边评分高的比左边糖果多",
      "第二次从右到左，保证左边评分高的比右边糖果多",
    ],
    explanation: `
## 解题思路

### 两次遍历

**核心思想**：分别从两个方向遍历，确保满足左右邻居的约束

1. 从左到右：如果 ratings[i] > ratings[i-1]，则 candies[i] = candies[i-1] + 1
2. 从右到左：如果 ratings[i] > ratings[i+1]，则 candies[i] = max(candies[i], candies[i+1] + 1)

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    solutions: [
      {
        name: "两次遍历（推荐）",
        code: `/**
 * 分发糖果 - 两次遍历贪心解法
 *
 * 核心思想：
 * 规则是"相邻孩子中评分高的要获得更多糖果"
 * 我们把这个规则拆分成两个独立的子规则：
 * 1. 如果右边孩子评分比左边高，右边要比左边多
 * 2. 如果左边孩子评分比右边高，左边要比右边多
 *
 * 为什么要两次遍历？
 * - 一次遍历无法同时满足左右两个方向的约束
 * - 第一次遍历：从左到右，只考虑"右边比左边高"
 * - 第二次遍历：从右到左，只考虑"左边比右边高"
 * - 取两次结果的较大值，就能同时满足两个约束
 *
 * 时间复杂度：O(n)，两次遍历
 * 空间复杂度：O(n)，存储每个孩子的糖果数
 */
function solution(ratings) {
  const n = ratings.length;

  // 初始化：每个孩子至少分配 1 颗糖果
  const candies = new Array(n).fill(1);

  // 第一次遍历：从左到右
  // 处理"右边评分比左边高"的情况
  // 如果右边孩子评分更高，右边糖果 = 左边糖果 + 1
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
    // 如果右边评分 <= 左边，保持初始值 1 即可
    // 因为我们还没处理"左边比右边高"的情况
  }

  // 第二次遍历：从右到左
  // 处理"左边评分比右边高"的情况
  // 注意：要取 max，因为可能第一次遍历已经给了更多糖果
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      // 取较大值：既满足"比左边邻居"的要求，也满足"比右边邻居"的要求
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // 返回糖果总数
  return candies.reduce((a, b) => a + b, 0);
}`,
        explanation: `## 两次遍历贪心

### 核心思路
将"相邻孩子评分高的要多分糖果"拆分成两个独立约束：
1. 从左看：右边评分高 → 右边糖果要多
2. 从右看：左边评分高 → 左边糖果要多

### 为什么取 max？
第二次遍历时，某个孩子可能已经因为"比左邻居评分高"而分到了很多糖果，如果只是简单赋值会破坏之前的结果。所以取 max 同时满足两个方向的约束。

### 示例演示
ratings = [1, 0, 2]
初始：candies = [1, 1, 1]
从左到右：candies = [1, 1, 2]（因为 2 > 0）
从右到左：candies = [2, 1, 2]（因为 1 > 0，且 max(1, 1+1)=2）
总计：5`,
        animation: {
          type: "two-pointers" as const,
          title: "分发糖果演示",
          steps: [
            {
              array: ["1", "0", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "ratings" }],
              description: "ratings=[1,0,2]。初始每人1颗糖: candies=[1,1,1]",
            },
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "i=0" }],
              description: "第一遍(左→右): i=0，无需比较",
            },
            {
              array: ["1", "1", "1"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已处理" },
                { indices: [1], color: "green" as const, label: "i=1" },
              ],
              description: "i=1: ratings[1]=0 < ratings[0]=1，不增加",
            },
            {
              array: ["1", "1", "2"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已处理" },
                { indices: [2], color: "green" as const, label: "i=2" },
              ],
              description: "i=2: ratings[2]=2 > ratings[1]=0，candies[2]=1+1=2",
            },
            {
              array: ["1", "1", "2"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "i=1" },
                { indices: [2], color: "gray" as const, label: "已处理" },
              ],
              description: "第二遍(右→左): i=1，ratings[1]=0 < ratings[2]=2，不变",
            },
            {
              array: ["2", "1", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "i=0" }],
              description: "i=0: ratings[0]=1 > ratings[1]=0，candies[0]=max(1,1+1)=2",
            },
            {
              array: ["2", "1", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "最终: candies=[2,1,2]，总计=5",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
    relatedProblems: [],
  },

  // ==================== 15. 接雨水 ====================
  {
    id: "trapping-rain-water",
    leetcodeId: 42,
    title: "接雨水",
    titleEn: "Trapping Rain Water",
    difficulty: "hard",
    category: "array-string",
    tags: ["数组", "双指针", "动态规划", "栈", "单调栈"],
    frontendRelevance: "medium",
    frontendNote: "双指针/单调栈经典，面试常考",
    description: `
给定 \`n\` 个非负整数表示每个宽度为 \`1\` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
`,
    examples: `
**示例 1：**
\`\`\`
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
\`\`\`

**示例 2：**
\`\`\`
输入：height = [4,2,0,3,2,5]
输出：9
\`\`\`
`,
    constraints: `
- \`n == height.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\`
`,
    initialCode: `/**
 * @param {number[]} height
 * @return {number}
 */
function solution(height) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number[]} height
 * @return {number}
 */
function solution(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
      { id: "2", name: "简单情况", input: [[4,2,0,3,2,5]], expected: 9 },
      { id: "3", name: "无法接水", input: [[1,2,3,4,5]], expected: 0 },
      { id: "4", name: "两柱子", input: [[2,0,2]], expected: 2 },
      { id: "5", name: "空数组", input: [[]], expected: 0 },
    ],
    hints: [
      "每个位置能接的水 = min(左边最高, 右边最高) - 当前高度",
      "可以用双指针从两边向中间移动",
      "较矮的一边决定当前能接多少水",
    ],
    explanation: `
## 解题思路

### 双指针法

**核心思想**：每个位置接水量 = min(leftMax, rightMax) - height[i]

使用双指针从两端向中间移动：
- 如果 height[left] < height[right]，处理左边
- 否则处理右边

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["container-with-most-water"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `/**
 * 接雨水 - 双指针解法
 *
 * 核心思想：
 * 每个位置能接的水量 = min(左边最高柱子, 右边最高柱子) - 当前高度
 * 水会被较矮的边界所限制（木桶原理）
 *
 * 为什么用双指针？
 * - 从两端向中间移动，可以在 O(1) 空间内确定每个位置的边界
 * - 关键洞察：如果 height[left] < height[right]
 *   说明左指针这一侧是"短板"，无论右边有多高，水位由 leftMax 决定
 *
 * 时间复杂度：O(n)，每个位置只访问一次
 * 空间复杂度：O(1)，只用常数变量
 */
function solution(height) {
  // 双指针：从两端向中间移动
  let left = 0, right = height.length - 1;

  // 记录左右两边遇到的最大高度
  let leftMax = 0, rightMax = 0;

  // 累计雨水量
  let water = 0;

  while (left < right) {
    // 哪边较矮，就处理哪边
    // 因为较矮的一边决定了水位上限
    if (height[left] < height[right]) {
      // 处理左边
      if (height[left] >= leftMax) {
        // 当前柱子比之前的都高，更新 leftMax
        // 这个位置不能接水（它本身就是边界）
        leftMax = height[left];
      } else {
        // 当前柱子比 leftMax 矮，可以接水
        // 水量 = leftMax - height[left]
        // 为什么不考虑 rightMax？因为 height[left] < height[right]
        // 说明右边至少有一个更高的柱子，所以 rightMax >= height[right] > height[left]
        // 水位由 leftMax 决定
        water += leftMax - height[left];
      }
      left++;  // 左指针右移
    } else {
      // 处理右边，逻辑同理
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;  // 右指针左移
    }
  }

  return water;
}`,
        explanation: `## 双指针法

### 核心思路
每个位置能接的水 = min(左边最高, 右边最高) - 当前高度

### 为什么移动较矮的指针？
如果 height[left] < height[right]：
- 右边至少有一个柱子（height[right]）比左边高
- 所以左边的水位由 leftMax 决定，与右边无关
- 可以安全地计算左边的水量

### 图解
\`\`\`
     |
|    |   rightMax >= height[right] > height[left]
|____|   所以左边的水位由 leftMax 决定
left right
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "接雨水演示",
          steps: [
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0], color: "blue" as const, label: "L" },
                { indices: [5], color: "blue" as const, label: "R" },
              ],
              description: "height=[4,2,0,3,2,5]。双指针从两端开始，leftMax=0,rightMax=0",
            },
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0], color: "green" as const, label: "L" },
                { indices: [5], color: "blue" as const, label: "R" },
              ],
              description: "height[L]=4 < height[R]=5，处理左边。leftMax=4，水=0",
            },
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 1,
              right: 5,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已处理" },
                { indices: [1], color: "green" as const, label: "L" },
                { indices: [5], color: "blue" as const, label: "R" },
              ],
              description: "L=1: height[1]=2 < leftMax=4，接水4-2=2。累计water=2",
            },
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 2,
              right: 5,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已处理" },
                { indices: [2], color: "green" as const, label: "L" },
                { indices: [5], color: "blue" as const, label: "R" },
              ],
              description: "L=2: height[2]=0 < leftMax=4，接水4-0=4。累计water=6",
            },
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 3,
              right: 5,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "已处理" },
                { indices: [3], color: "green" as const, label: "L" },
                { indices: [5], color: "blue" as const, label: "R" },
              ],
              description: "L=3: height[3]=3 < leftMax=4，接水4-3=1。累计water=7",
            },
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 4,
              right: 5,
              highlights: [
                { indices: [0, 1, 2, 3], color: "gray" as const, label: "已处理" },
                { indices: [4], color: "green" as const, label: "L" },
                { indices: [5], color: "blue" as const, label: "R" },
              ],
              description: "L=4: height[4]=2 < leftMax=4，接水4-2=2。累计water=9",
            },
            {
              array: ["4", "2", "0", "3", "2", "5"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "完成" }],
              description: "L>=R，结束。共接雨水9单位",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "单调栈",
        code: `/**
 * 接雨水 - 单调栈解法
 *
 * 核心思想：
 * 用单调递减栈，横向计算水量（一层一层地算）
 * 当遇到比栈顶高的柱子时，说明形成了"凹槽"
 *
 * 单调栈的作用：
 * - 栈中存储柱子的索引，高度从栈底到栈顶单调递减
 * - 当遇到更高的柱子时，可以确定凹槽的左右边界
 *
 * 时间复杂度：O(n)，每个元素最多入栈出栈各一次
 * 空间复杂度：O(n)，栈的大小
 */
function solution(height) {
  // 单调递减栈，存储柱子索引
  const stack = [];
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    // 当前柱子比栈顶高，可能形成凹槽
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      // 弹出栈顶，作为凹槽的底部
      const top = stack.pop();

      // 如果栈空了，说明左边没有边界，无法接水
      if (stack.length === 0) break;

      // 左边界：新的栈顶
      // 右边界：当前柱子 i
      // 底部：刚弹出的 top
      const left = stack[stack.length - 1];

      // 凹槽宽度 = 右边界索引 - 左边界索引 - 1
      const width = i - left - 1;

      // 凹槽高度 = min(左边界高度, 右边界高度) - 底部高度
      // 这是"这一层"能接的水的高度
      const h = Math.min(height[left], height[i]) - height[top];

      // 累加水量
      water += width * h;
    }

    // 当前柱子入栈
    stack.push(i);
  }

  return water;
}`,
        explanation: `## 单调栈

### 核心思路
维护单调递减栈，横向计算水量（一层一层地算）

### 凹槽形成条件
当前柱子高度 > 栈顶柱子高度，形成凹槽：
- 栈顶是凹槽底部
- 新栈顶是左边界
- 当前柱子是右边界

### 图解
\`\`\`
height = [0,1,0,2,1,0,1,3,2,1,2,1]

遇到柱子3时，栈中有 [7(高度3), 6(高度1), 5(高度0)]
弹出5：左边界6，右边界7，底部5
计算这一层的水量...
\`\`\``,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划",
        code: `/**
 * 接雨水 - 动态规划解法
 *
 * 核心思想：
 * 每个位置能接的水 = min(左边最高, 右边最高) - 当前高度
 * 先预计算每个位置的 leftMax 和 rightMax
 *
 * 为什么预计算？
 * - 如果每次都去找左右最高，时间复杂度是 O(n²)
 * - 预计算后，查询是 O(1)
 *
 * 时间复杂度：O(n)，三次遍历
 * 空间复杂度：O(n)，两个数组
 */
function solution(height) {
  const n = height.length;
  if (n === 0) return 0;

  // 第一次遍历：计算每个位置左边（含自己）的最大高度
  // leftMax[i] = max(height[0], height[1], ..., height[i])
  const leftMax = new Array(n);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // 第二次遍历：计算每个位置右边（含自己）的最大高度
  // rightMax[i] = max(height[i], height[i+1], ..., height[n-1])
  const rightMax = new Array(n);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // 第三次遍历：计算每个位置能接的水
  let water = 0;
  for (let i = 0; i < n; i++) {
    // 水位 = min(左边最高, 右边最高)
    // 能接的水 = 水位 - 当前高度
    // 如果当前就是最高点，结果是 0
    water += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return water;
}`,
        explanation: `## 动态规划

### 核心思路
每个位置能接的水 = min(左边最高, 右边最高) - 当前高度

### 预计算数组
- leftMax[i]：位置 i 及其左边的最大高度
- rightMax[i]：位置 i 及其右边的最大高度

### 示例
\`\`\`
height   = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
leftMax  = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]
rightMax = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]
water[i] = min(leftMax[i], rightMax[i]) - height[i]
\`\`\``,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // ==================== 16. 罗马数字转整数 ====================
  {
    id: "roman-to-integer",
    leetcodeId: 13,
    title: "罗马数字转整数",
    titleEn: "Roman to Integer",
    difficulty: "easy",
    category: "array-string",
    tags: ["哈希表", "数学", "字符串"],
    frontendRelevance: "high",
    frontendNote: "字符串解析",
    description: `
罗马数字包含以下七种字符: \`I\`， \`V\`， \`X\`， \`L\`，\`C\`，\`D\` 和 \`M\`。

\`\`\`
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
\`\`\`

例如， 罗马数字 \`2\` 写做 \`II\` ，即为两个并列的 1 。\`12\` 写做 \`XII\` ，即为 \`X\` + \`II\` 。 \`27\` 写做 \`XXVII\`, 即为 \`XX\` + \`V\` + \`II\` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 \`IIII\`，而是 \`IV\`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 \`IX\`。这个特殊的规则只适用于以下六种情况：

- \`I\` 可以放在 \`V\` (5) 和 \`X\` (10) 的左边，来表示 4 和 9。
- \`X\` 可以放在 \`L\` (50) 和 \`C\` (100) 的左边，来表示 40 和 90。
- \`C\` 可以放在 \`D\` (500) 和 \`M\` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。
`,
    examples: `
**示例 1：**
\`\`\`
输入：s = "III"
输出：3
\`\`\`

**示例 2：**
\`\`\`
输入：s = "IV"
输出：4
\`\`\`

**示例 3：**
\`\`\`
输入：s = "IX"
输出：9
\`\`\`

**示例 4：**
\`\`\`
输入：s = "LVIII"
输出：58
解释：L = 50, V= 5, III = 3.
\`\`\`

**示例 5：**
\`\`\`
输入：s = "MCMXCIV"
输出：1994
解释：M = 1000, CM = 900, XC = 90, IV = 4.
\`\`\`
`,
    constraints: `
- \`1 <= s.length <= 15\`
- \`s\` 仅含字符 \`('I', 'V', 'X', 'L', 'C', 'D', 'M')\`
- 题目数据保证 \`s\` 是一个有效的罗马数字，且表示整数在范围 \`[1, 3999]\` 内
`,
    initialCode: `/**
 * @param {string} s
 * @return {number}
 */
function solution(s) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {string} s
 * @return {number}
 */
function solution(s) {
  const map = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  for (let i = 0; i < s.length; i++) {
    if (i < s.length - 1 && map[s[i]] < map[s[i + 1]]) {
      result -= map[s[i]];
    } else {
      result += map[s[i]];
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "简单加法", input: ["III"], expected: 3 },
      { id: "2", name: "减法IV", input: ["IV"], expected: 4 },
      { id: "3", name: "减法IX", input: ["IX"], expected: 9 },
      { id: "4", name: "混合", input: ["LVIII"], expected: 58 },
      { id: "5", name: "复杂", input: ["MCMXCIV"], expected: 1994 },
    ],
    hints: [
      "使用哈希表存储每个罗马字符对应的数值",
      "如果当前字符比下一个字符小，则减去当前值",
      "否则加上当前值",
    ],
    explanation: `
## 解题思路

### 模拟法

**核心思想**：如果小的数字在大的数字左边，就减去；否则加上。

遍历字符串，比较当前字符和下一个字符的值：
- 如果当前 < 下一个，减去当前值
- 否则加上当前值

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["integer-to-roman"],
    solutions: [
      {
        name: "模拟法（推荐）",
        code: `/**
 * 罗马数字转整数 - 模拟法
 *
 * 核心思想：
 * 罗马数字规则：
 * - 通常情况：小数在大数右边，表示相加（如 VI = 5+1 = 6）
 * - 特殊情况：小数在大数左边，表示相减（如 IV = 5-1 = 4）
 *
 * 算法：遍历字符串，比较当前字符和下一个字符的值
 * - 如果当前值 < 下一个值：减去当前值（特殊情况）
 * - 否则：加上当前值（正常情况）
 *
 * 时间复杂度：O(n)，遍历一次字符串
 * 空间复杂度：O(1)，哈希表是固定大小
 */
function solution(s) {
  // 罗马字符到数值的映射
  const map = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    // 比较当前字符和下一个字符的值
    // 如果当前值 < 下一个值，说明是特殊情况（如 IV, IX）
    if (i < s.length - 1 && map[s[i]] < map[s[i + 1]]) {
      // 特殊情况：减去当前值
      // 例如 IV：先减去 I(1)，然后加上 V(5)，结果是 4
      result -= map[s[i]];
    } else {
      // 正常情况：加上当前值
      result += map[s[i]];
    }
  }

  return result;
}`,
        explanation: `## 模拟法

### 核心规则
罗马数字中，小的数字在大的数字左边时需要减去

### 六种特殊情况
- IV = 4 (5-1)
- IX = 9 (10-1)
- XL = 40 (50-10)
- XC = 90 (100-10)
- CD = 400 (500-100)
- CM = 900 (1000-100)

### 算法执行过程
MCMXCIV = 1994
- M: 1000 > 后面的 C(100)，+1000
- C: 100 < 后面的 M(1000)，-100
- M: 1000 > 后面的 X(10)，+1000
- X: 10 < 后面的 C(100)，-10
- C: 100 > 后面的 I(1)，+100
- I: 1 < 后面的 V(5)，-1
- V: 最后一个，+5
- 结果：1000-100+1000-10+100-1+5 = 1994`,
        animation: {
          type: "two-pointers" as const,
          title: "罗马数字转整数演示",
          steps: [
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6], color: "blue" as const, label: "MCMXCIV" }],
              description: "s='MCMXCIV'，从左到右遍历，result=0",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "M=1000" },
                { indices: [1], color: "blue" as const, label: "next" },
              ],
              description: "i=0: M(1000) > C(100)，加1000。result=1000",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已处理" },
                { indices: [1], color: "red" as const, label: "C=100" },
                { indices: [2], color: "blue" as const, label: "M=1000" },
              ],
              description: "i=1: C(100) < M(1000)，减100。result=900",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已处理" },
                { indices: [2], color: "green" as const, label: "M=1000" },
              ],
              description: "i=2: M(1000) > X(10)，加1000。result=1900",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 3,
              right: 4,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "已处理" },
                { indices: [3], color: "red" as const, label: "X=10" },
                { indices: [4], color: "blue" as const, label: "C=100" },
              ],
              description: "i=3: X(10) < C(100)，减10。result=1890",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 4,
              right: 6,
              highlights: [
                { indices: [0, 1, 2, 3], color: "gray" as const, label: "已处理" },
                { indices: [4], color: "green" as const, label: "C" },
                { indices: [5], color: "red" as const, label: "I" },
                { indices: [6], color: "green" as const, label: "V" },
              ],
              description: "继续: C(+100)=1990, I(<V)=-1=1989, V(+5)=1994",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6], color: "green" as const, label: "完成" }],
              description: "最终结果: MCMXCIV = 1994",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "替换特殊组合",
        code: `/**
 * 罗马数字转整数 - 替换特殊组合法
 *
 * 核心思想：
 * 先把6种特殊组合替换成临时字符，然后简单累加
 * 这样就不需要处理"减法"的逻辑了
 *
 * 替换规则：
 * - IV -> a (4)
 * - IX -> b (9)
 * - XL -> c (40)
 * - XC -> d (90)
 * - CD -> e (400)
 * - CM -> f (900)
 *
 * 时间复杂度：O(n)，replace 和遍历都是 O(n)
 * 空间复杂度：O(n)，需要存储替换后的字符串
 */
function solution(s) {
  // 基本罗马字符映射
  const map = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  // 将特殊组合替换为临时字符
  // 这样所有字符都可以直接相加，不需要考虑减法
  s = s.replace('IV', 'a').replace('IX', 'b')
       .replace('XL', 'c').replace('XC', 'd')
       .replace('CD', 'e').replace('CM', 'f');

  // 特殊组合的值
  const specialMap = {
    'a': 4, 'b': 9, 'c': 40, 'd': 90, 'e': 400, 'f': 900
  };

  // 直接累加所有字符的值
  let result = 0;
  for (const char of s) {
    // 先查基本映射，找不到再查特殊映射
    result += map[char] || specialMap[char];
  }

  return result;
}`,
        explanation: `## 替换特殊组合

### 思路
先把6种特殊组合替换成单个字符：
- IV -> a (4)
- IX -> b (9)
- XL -> c (40)
- XC -> d (90)
- CD -> e (400)
- CM -> f (900)

然后简单地累加所有字符对应的值。

### 优点
代码逻辑更简单直观，不需要处理特殊情况的判断。

### 示例
MCMXCIV
-> 替换 CM 为 f: MfXCIV
-> 替换 XC 为 d: MfdIV
-> 替换 IV 为 a: Mfda
-> 累加：1000 + 900 + 90 + 4 = 1994`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // ==================== 17. 整数转罗马数字 ====================
  {
    id: "integer-to-roman",
    leetcodeId: 12,
    title: "整数转罗马数字",
    titleEn: "Integer to Roman",
    difficulty: "medium",
    category: "array-string",
    tags: ["哈希表", "数学", "字符串"],
    frontendRelevance: "medium",
    frontendNote: "整数转字符串",
    description: `
七个不同的符号代表罗马数字，其值如下：

| 符号 | 值    |
|------|-------|
| I    | 1     |
| V    | 5     |
| X    | 10    |
| L    | 50    |
| C    | 100   |
| D    | 500   |
| M    | 1000  |

罗马数字是通过添加从最高到最低的小数位值的转换而形成的。将小数位值转换为罗马数字有以下规则：

- 如果该值不是以 4 或 9 开头，请选择可以从输入中减去的最大值的符号，将该符号附加到结果，减去其值，然后将其余部分转换为罗马数字。
- 如果该值以 4 或 9 开头，使用 减法形式，表示从以下符号中减去一个符号，例如 4 是 5 (V) 减 1 (I): IV ，9 是 10 (X) 减 1 (I)：IX。仅使用以下减法形式：4 (IV)，9 (IX)，40 (XL)，90 (XC)，400 (CD) 和 900 (CM)。
- 只有 10 的次方（I, X, C, M）最多可以连续附加 3 次以代表 10 的倍数。你不能多次附加 5 (V)，50 (L) 或 500 (D)。如果需要将符号附加4次，请使用 减法形式。

给你一个整数，将其转换为罗马数字。
`,
    examples: `
**示例 1：**
\`\`\`
输入：num = 3749
输出："MMMDCCXLIX"
解释：
3000 = MMM 由于 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC 由于 500 (D) + 100 (C) + 100 (C)
  40 = XL 由于 able to 50 (L) 减 10 (X)
   9 = IX 由于 10 (X) 减 1 (I)
注意：49 不是 able to 50 (L) 减 1 (I) 因为转换是基于小数位
\`\`\`

**示例 2：**
\`\`\`
输入：num = 58
输出："LVIII"
解释：
50 = L
 8 = VIII
\`\`\`

**示例 3：**
\`\`\`
输入：num = 1994
输出："MCMXCIV"
解释：
1000 = M
 900 = CM
  90 = XC
   4 = IV
\`\`\`
`,
    constraints: `
- \`1 <= num <= 3999\`
`,
    initialCode: `/**
 * @param {number} num
 * @return {string}
 */
function solution(num) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {number} num
 * @return {string}
 */
function solution(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "大数", input: [3749], expected: "MMMDCCXLIX" },
      { id: "2", name: "中等", input: [58], expected: "LVIII" },
      { id: "3", name: "特殊值", input: [1994], expected: "MCMXCIV" },
      { id: "4", name: "最小值", input: [1], expected: "I" },
      { id: "5", name: "9", input: [9], expected: "IX" },
    ],
    hints: [
      "把所有可能的符号和值（包括组合）列出来",
      "从大到小贪心选择",
      "每次选择尽可能大的值",
    ],
    explanation: `
## 解题思路

### 贪心法

**核心思想**：从大到小尝试每个数值，尽可能多地使用大的数值。

把13个数值（包括6个特殊组合）从大到小排列，依次尝试。

### 复杂度分析

- 时间复杂度：O(1)，因为 num 最大为 3999
- 空间复杂度：O(1)
`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    relatedProblems: ["roman-to-integer"],
    solutions: [
      {
        name: "贪心法（推荐）",
        code: `/**
 * 整数转罗马数字 - 贪心法
 *
 * 核心思想：
 * 贪心策略：每次尽可能使用最大的数值
 * 因为罗马数字是"加法系统"，大数放前面
 *
 * 关键技巧：
 * 把13个数值（7个基本 + 6个特殊组合）从大到小排列
 * 特殊组合（如 CM=900）也当作独立的"符号"处理
 *
 * 时间复杂度：O(1)，最多循环13次，每次内层最多重复3-4次
 * 空间复杂度：O(1)，固定大小的数组
 */
function solution(num) {
  // 13个数值从大到小排列
  // 包括6个特殊组合：CM(900), CD(400), XC(90), XL(40), IX(9), IV(4)
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

  let result = "";

  // 从最大的值开始，贪心选择
  for (let i = 0; i < values.length; i++) {
    // 尽可能多地使用当前值
    // 例如 3000 需要用 3 个 M
    while (num >= values[i]) {
      result += symbols[i];  // 添加对应符号
      num -= values[i];      // 减去该值
    }
    // num < values[i] 时，尝试下一个较小的值
  }

  return result;
}`,
        explanation: `## 贪心法

### 核心思路
将13个数值（7个基本符号 + 6个特殊组合）从大到小排列，每次尽可能多地使用大的数值。

### 为什么特殊组合也要列出？
比如数字 900，如果不把 CM 作为整体，就无法正确转换。把 CM=900 当作一个独立的"符号"，就可以统一处理。

### 执行过程示例
1994:
- 1994 >= 1000 → M, 剩余 994
- 994 >= 900 → CM, 剩余 94
- 94 >= 90 → XC, 剩余 4
- 4 >= 4 → IV, 剩余 0
- 结果：MCMXCIV`,
        animation: {
          type: "two-pointers" as const,
          title: "整数转罗马数字演示",
          steps: [
            {
              array: ["1994"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "num" }],
              description: "num=1994，从大到小尝试: 1000,900,500,400,100...",
            },
            {
              array: ["1000", "994"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "M" },
                { indices: [1], color: "blue" as const, label: "剩余" },
              ],
              description: "1994>=1000，添加'M'，num=994",
            },
            {
              array: ["M", "900", "94"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已添加" },
                { indices: [1], color: "green" as const, label: "CM" },
                { indices: [2], color: "blue" as const, label: "剩余" },
              ],
              description: "994>=900，添加'CM'，num=94",
            },
            {
              array: ["M", "CM", "90", "4"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已添加" },
                { indices: [2], color: "green" as const, label: "XC" },
                { indices: [3], color: "blue" as const, label: "剩余" },
              ],
              description: "94>=90，添加'XC'，num=4",
            },
            {
              array: ["M", "CM", "XC", "IV"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "已添加" },
                { indices: [3], color: "green" as const, label: "IV" },
              ],
              description: "4>=4，添加'IV'，num=0",
            },
            {
              array: ["M", "C", "M", "X", "C", "I", "V"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6], color: "green" as const, label: "完成" }],
              description: "最终结果: MCMXCIV",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
      {
        name: "硬编码法",
        code: `/**
 * 整数转罗马数字 - 硬编码法
 *
 * 核心思想：
 * 数字范围是 1-3999，直接预处理每一位的所有可能
 * - 千位只有 0-3，对应 "", "M", "MM", "MMM"
 * - 百/十/个位各有 0-9 共 10 种情况
 *
 * 优点：
 * - 代码简洁，没有循环逻辑
 * - 直接查表，速度极快
 *
 * 时间复杂度：O(1)，只做4次查表和字符串拼接
 * 空间复杂度：O(1)，固定大小的数组
 */
function solution(num) {
  // 千位: 0-3 (因为最大是 3999)
  const thousands = ["", "M", "MM", "MMM"];

  // 百位: 0-9
  // 注意 4(CD) 和 9(CM) 是特殊组合
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];

  // 十位: 0-9
  // 注意 4(XL) 和 9(XC) 是特殊组合
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];

  // 个位: 0-9
  // 注意 4(IV) 和 9(IX) 是特殊组合
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  // 提取各位数字，查表拼接
  return thousands[Math.floor(num / 1000)] +          // 千位
         hundreds[Math.floor((num % 1000) / 100)] +   // 百位
         tens[Math.floor((num % 100) / 10)] +         // 十位
         ones[num % 10];                              // 个位
}`,
        explanation: `## 硬编码法

### 思路
由于 num 的范围是 1-3999，可以预先列出每一位所有可能的罗马数字表示。

### 查表方式
- 千位：num / 1000 取整
- 百位：(num % 1000) / 100 取整
- 十位：(num % 100) / 10 取整
- 个位：num % 10

### 示例
1994:
- 千位 1 → "M"
- 百位 9 → "CM"
- 十位 9 → "XC"
- 个位 4 → "IV"
- 拼接：MCMXCIV`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // ==================== 18. 最后一个单词的长度 ====================
  {
    id: "length-of-last-word",
    leetcodeId: 58,
    title: "最后一个单词的长度",
    titleEn: "Length of Last Word",
    difficulty: "easy",
    category: "array-string",
    tags: ["字符串"],
    frontendRelevance: "high",
    frontendNote: "字符串基础操作",
    description: `
给你一个字符串 \`s\`，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 **最后一个** 单词的长度。

**单词** 是指仅由字母组成、不包含任何空格字符的最大子字符串。
`,
    examples: `
**示例 1：**
\`\`\`
输入：s = "Hello World"
输出：5
解释：最后一个单词是"World"，长度为5。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "   fly me   to   the moon  "
输出：4
解释：最后一个单词是"moon"，长度为4。
\`\`\`

**示例 3：**
\`\`\`
输入：s = "luffy is still joyboy"
输出：6
解释：最后一个单词是长度为6的"joyboy"。
\`\`\`
`,
    constraints: `
- \`1 <= s.length <= 10^4\`
- \`s\` 仅有英文字母和空格 \`' '\` 组成
- \`s\` 中至少存在一个单词
`,
    initialCode: `/**
 * @param {string} s
 * @return {number}
 */
function solution(s) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {string} s
 * @return {number}
 */
function solution(s) {
  let end = s.length - 1;

  // 跳过末尾空格
  while (end >= 0 && s[end] === ' ') {
    end--;
  }

  // 计算单词长度
  let length = 0;
  while (end >= 0 && s[end] !== ' ') {
    length++;
    end--;
  }

  return length;
}`,
    testCases: [
      { id: "1", name: "基本测试", input: ["Hello World"], expected: 5 },
      { id: "2", name: "末尾有空格", input: ["   fly me   to   the moon  "], expected: 4 },
      { id: "3", name: "无多余空格", input: ["luffy is still joyboy"], expected: 6 },
      { id: "4", name: "单个单词", input: ["a"], expected: 1 },
      { id: "5", name: "单个单词带空格", input: ["  hello  "], expected: 5 },
    ],
    hints: [
      "从后往前遍历",
      "先跳过末尾的空格",
      "再计算单词的长度",
    ],
    explanation: `
## 解题思路

### 反向遍历

**核心思想**：从后往前遍历，先跳过空格，再数字母。

1. 从末尾开始，跳过所有空格
2. 然后计数，直到遇到空格或到达开头

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(1)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: [],
    solutions: [
      {
        name: "反向遍历（推荐）",
        code: `/**
 * 最后一个单词的长度 - 反向遍历
 *
 * 核心思想：
 * 从字符串末尾开始向前遍历，分两步：
 * 1. 跳过末尾所有空格
 * 2. 计数字母直到遇到空格或到达开头
 *
 * 为什么从后往前？
 * - 我们只关心最后一个单词
 * - 从后往前可以避免遍历整个字符串
 * - 平均情况下比正向遍历更快
 *
 * 时间复杂度：O(n)，最坏情况遍历整个字符串
 * 空间复杂度：O(1)，只用几个变量
 */
function solution(s) {
  // 指针指向字符串末尾
  let end = s.length - 1;

  // 第一步：跳过末尾的所有空格
  // 例如 "hello world  " -> 找到 'd' 的位置
  while (end >= 0 && s[end] === ' ') {
    end--;
  }

  // 第二步：计算单词长度
  // 从当前位置向前数，直到遇到空格或到达开头
  let length = 0;
  while (end >= 0 && s[end] !== ' ') {
    length++;  // 每遇到一个字母，长度加一
    end--;     // 继续向前
  }

  return length;
}`,
        explanation: `## 反向遍历

### 思路
从字符串末尾开始向前遍历，分两步：
1. 跳过末尾的所有空格
2. 计数字母直到遇到空格或到达开头

### 执行过程
"   fly me   to   the moon  "
- end=27: ' ', 跳过空格...
- end=22: 'n', 开始计数
- end=21: 'o', length=1
- end=20: 'o', length=2
- end=19: 'm', length=3
- end=18: ' ', 遇到空格，停止
- 返回 4

### 优点
只需要遍历最后一个单词的长度 + 末尾空格数`,
        animation: {
          type: "two-pointers" as const,
          title: "最后一个单词的长度演示",
          steps: [
            {
              array: ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"],
              left: 0,
              right: 10,
              highlights: [{ indices: [10], color: "blue" as const, label: "end" }],
              description: "s='Hello World'，从末尾开始，end=10",
            },
            {
              array: ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"],
              left: 10,
              right: 10,
              highlights: [{ indices: [10], color: "green" as const, label: "d" }],
              description: "s[10]='d'不是空格，开始计数，length=1",
            },
            {
              array: ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"],
              left: 9,
              right: 10,
              highlights: [
                { indices: [10], color: "gray" as const, label: "已计数" },
                { indices: [9], color: "green" as const, label: "l" },
              ],
              description: "s[9]='l'，length=2",
            },
            {
              array: ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"],
              left: 6,
              right: 10,
              highlights: [
                { indices: [10, 9, 8, 7], color: "gray" as const, label: "已计数" },
                { indices: [6], color: "green" as const, label: "W" },
              ],
              description: "继续: r(3), o(4), W(5)。length=5",
            },
            {
              array: ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"],
              left: 5,
              right: 5,
              highlights: [
                { indices: [6, 7, 8, 9, 10], color: "green" as const, label: "World" },
                { indices: [5], color: "red" as const, label: "空格" },
              ],
              description: "s[5]=' '是空格，停止。最后一个单词长度=5",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "内置函数",
        code: `/**
 * 最后一个单词的长度 - 内置函数法
 *
 * 核心思想：
 * 利用 JavaScript 内置函数来简化代码
 * 1. trim() 去除首尾空格
 * 2. split(' ') 按空格分割成单词数组
 * 3. filter 过滤掉空字符串（多个空格会产生空串）
 * 4. 取最后一个单词的长度
 *
 * 优点：代码简洁易懂
 * 缺点：空间复杂度高，需要创建数组
 *
 * 时间复杂度：O(n)，需要遍历整个字符串
 * 空间复杂度：O(n)，需要存储分割后的数组
 */
function solution(s) {
  // trim() 去除首尾空格
  // split(' ') 按空格分割
  // filter(w => w.length > 0) 过滤空字符串
  const words = s.trim().split(' ').filter(w => w.length > 0);

  // 取最后一个单词的长度
  return words[words.length - 1].length;
}`,
        explanation: `## 内置函数法

### 思路
利用 JavaScript 内置函数：
1. trim() 去除首尾空格
2. split(' ') 按空格分割
3. filter 过滤空字符串
4. 取最后一个单词的长度

### 为什么要 filter？
多个连续空格会产生空字符串：
"fly  me".split(' ') = ["fly", "", "me"]
需要过滤掉空字符串

### 缺点
空间复杂度较高，需要创建数组存储所有单词`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // ==================== 19. 最长公共前缀 ====================
  {
    id: "longest-common-prefix",
    leetcodeId: 14,
    title: "最长公共前缀",
    titleEn: "Longest Common Prefix",
    difficulty: "easy",
    category: "array-string",
    tags: ["字典树", "字符串"],
    frontendRelevance: "high",
    frontendNote: "字符串比较基础",
    description: `
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 \`""\`。
`,
    examples: `
**示例 1：**
\`\`\`
输入：strs = ["flower","flow","flight"]
输出："fl"
\`\`\`

**示例 2：**
\`\`\`
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
\`\`\`
`,
    constraints: `
- \`1 <= strs.length <= 200\`
- \`0 <= strs[i].length <= 200\`
- \`strs[i]\` 仅由小写英文字母组成
`,
    initialCode: `/**
 * @param {string[]} strs
 * @return {string}
 */
function solution(strs) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {string[]} strs
 * @return {string}
 */
function solution(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}`,
    testCases: [
      { id: "1", name: "有公共前缀", input: [["flower","flow","flight"]], expected: "fl" },
      { id: "2", name: "无公共前缀", input: [["dog","racecar","car"]], expected: "" },
      { id: "3", name: "单字符串", input: [["a"]], expected: "a" },
      { id: "4", name: "相同字符串", input: [["aa","aa","aa"]], expected: "aa" },
      { id: "5", name: "空字符串", input: [["",""]], expected: "" },
    ],
    hints: [
      "可以纵向扫描，逐个字符比较",
      "也可以横向扫描，逐个字符串比较",
      "取第一个字符串作为初始前缀，逐步缩短",
    ],
    explanation: `
## 解题思路

### 横向扫描

**核心思想**：取第一个字符串作为前缀，与后续字符串逐一比较，逐步缩短前缀。

1. 以第一个字符串为初始前缀
2. 遍历其他字符串，如果前缀不匹配，就缩短前缀
3. 直到前缀匹配或变空

### 复杂度分析

- 时间复杂度：O(mn)，m 是字符串数量，n 是字符串平均长度
- 空间复杂度：O(1)
`,
    timeComplexity: "O(mn)",
    spaceComplexity: "O(1)",
    relatedProblems: [],
    solutions: [
      {
        name: "横向扫描（推荐）",
        code: `/**
 * 最长公共前缀 - 横向扫描
 *
 * 核心思想：
 * 以第一个字符串作为初始前缀，与后续字符串逐一比较
 * 每次比较后缩短前缀，直到与当前字符串匹配
 *
 * 为什么叫"横向"？
 * - 一次完整地处理一个字符串，然后处理下一个
 * - 相对于"纵向"逐个字符位置比较
 *
 * 时间复杂度：O(mn)，m是字符串数量，n是平均长度
 * 空间复杂度：O(1)，只用一个 prefix 变量
 */
function solution(strs) {
  // 空数组直接返回空字符串
  if (strs.length === 0) return "";

  // 以第一个字符串作为初始前缀
  let prefix = strs[0];

  // 遍历剩余字符串
  for (let i = 1; i < strs.length; i++) {
    // 如果当前字符串不以 prefix 开头
    // indexOf(prefix) !== 0 表示 prefix 不在开头位置
    while (strs[i].indexOf(prefix) !== 0) {
      // 缩短前缀：去掉最后一个字符
      prefix = prefix.slice(0, -1);

      // 前缀变空了，说明没有公共前缀
      if (prefix === "") return "";
    }
    // prefix 现在是 strs[0..i] 的公共前缀
  }

  return prefix;
}`,
        explanation: `## 横向扫描

### 核心思路
以第一个字符串为初始前缀，与后续字符串逐一比较并缩短

### 执行过程
["flower", "flow", "flight"]
- prefix = "flower"
- 与 "flow" 比较：indexOf("flower") = -1，不匹配
  - 缩短为 "flowe"，indexOf = -1
  - 缩短为 "flow"，indexOf = 0，匹配！
- 与 "flight" 比较：indexOf("flow") = -1
  - 缩短为 "flo"，indexOf = -1
  - 缩短为 "fl"，indexOf = 0，匹配！
- 返回 "fl"`,
        animation: {
          type: "two-pointers" as const,
          title: "最长公共前缀演示",
          steps: [
            {
              array: ["flower", "flow", "flight"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "blue" as const, label: "初始前缀" }],
              description: "strs=['flower','flow','flight']。prefix='flower'",
            },
            {
              array: ["flower", "flow", "flight"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "prefix" },
                { indices: [1], color: "green" as const, label: "比较" },
              ],
              description: "'flow'.indexOf('flower')=-1，缩短prefix",
            },
            {
              array: ["flow", "flow", "flight"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "prefix" },
                { indices: [1], color: "green" as const, label: "匹配" },
              ],
              description: "prefix='flow'。'flow'.indexOf('flow')=0，匹配！",
            },
            {
              array: ["flow", "flow", "flight"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "blue" as const, label: "prefix" },
                { indices: [2], color: "red" as const, label: "比较" },
              ],
              description: "'flight'.indexOf('flow')=-1，继续缩短",
            },
            {
              array: ["fl", "flow", "flight"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "fl" },
                { indices: [2], color: "green" as const, label: "匹配" },
              ],
              description: "prefix='fl'。'flight'.indexOf('fl')=0，匹配！",
            },
            {
              array: ["fl", "fl", "fl"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "最长公共前缀='fl'",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(mn)",
        spaceComplexity: "O(1)",
      },
      {
        name: "纵向扫描",
        code: `/**
 * 最长公共前缀 - 纵向扫描
 *
 * 核心思想：
 * 逐个字符位置比较所有字符串
 * 每次检查所有字符串的第 i 个字符是否相同
 *
 * 为什么叫"纵向"？
 * - 先比较所有字符串的第 0 个字符
 * - 再比较所有字符串的第 1 个字符
 * - 像一列一列地检查
 *
 * 时间复杂度：O(mn)
 * 空间复杂度：O(1)
 */
function solution(strs) {
  if (strs.length === 0) return "";

  // 以第一个字符串为基准，逐个字符遍历
  for (let i = 0; i < strs[0].length; i++) {
    // 第一个字符串的第 i 个字符
    const char = strs[0][i];

    // 检查其他所有字符串的第 i 个字符
    for (let j = 1; j < strs.length; j++) {
      // 两种情况需要返回：
      // 1. 第 j 个字符串长度不够（i >= strs[j].length）
      // 2. 第 i 个字符不相同
      if (i >= strs[j].length || strs[j][i] !== char) {
        // 返回第一个字符串的前 i 个字符
        return strs[0].slice(0, i);
      }
    }
  }

  // 第一个字符串就是公共前缀
  return strs[0];
}`,
        explanation: `## 纵向扫描

### 核心思路
逐个字符位置比较所有字符串的同一位置

### 执行过程
["flower", "flow", "flight"]
- i=0: 'f' == 'f' == 'f' ✓
- i=1: 'l' == 'l' == 'l' ✓
- i=2: 'o' == 'o' != 'i' ✗
- 返回 "fl"

### 优点
发现不匹配立即返回，不需要缩短前缀的过程`,
        timeComplexity: "O(mn)",
        spaceComplexity: "O(1)",
      },
      {
        name: "分治法",
        code: `/**
 * 最长公共前缀 - 分治法
 *
 * 核心思想：
 * 将字符串数组分成两半，分别求最长公共前缀，然后合并
 * LCP(S1...Sn) = LCP(LCP(S1...Sk), LCP(Sk+1...Sn))
 *
 * 分治思路：
 * - 问题可以分解为更小的子问题
 * - 两个字符串的公共前缀是两半公共前缀的公共前缀
 *
 * 时间复杂度：O(mn)
 * 空间复杂度：O(m log m)，递归栈深度
 */
function solution(strs) {
  if (strs.length === 0) return "";

  // 递归函数：求 strs[left...right] 的最长公共前缀
  function commonPrefix(left, right) {
    // 基本情况：只有一个字符串
    if (left === right) return strs[left];

    // 分治：分成两半
    const mid = Math.floor((left + right) / 2);

    // 递归求解左半部分和右半部分
    const lcpLeft = commonPrefix(left, mid);
    const lcpRight = commonPrefix(mid + 1, right);

    // 合并：求两个前缀的公共前缀
    const minLen = Math.min(lcpLeft.length, lcpRight.length);
    for (let i = 0; i < minLen; i++) {
      if (lcpLeft[i] !== lcpRight[i]) {
        return lcpLeft.slice(0, i);
      }
    }
    return lcpLeft.slice(0, minLen);
  }

  return commonPrefix(0, strs.length - 1);
}`,
        explanation: `## 分治法

### 核心思路
将问题分解为更小的子问题：
LCP(S1...Sn) = LCP(LCP(S1...Sk), LCP(Sk+1...Sn))

### 执行过程
["flower", "flow", "flight"]
- 分成 ["flower", "flow"] 和 ["flight"]
- 左半部分：LCP("flower", "flow") = "flow"
- 右半部分：LCP("flight") = "flight"
- 合并：LCP("flow", "flight") = "fl"

### 适用场景
当字符串数量很大时，分治法可以利用并行计算`,
        timeComplexity: "O(mn)",
        spaceComplexity: "O(m log m)",
      },
    ],
  },

  // ==================== 20. 反转字符串中的单词 ====================
  {
    id: "reverse-words-in-a-string",
    leetcodeId: 151,
    title: "反转字符串中的单词",
    titleEn: "Reverse Words in a String",
    difficulty: "medium",
    category: "array-string",
    tags: ["双指针", "字符串"],
    frontendRelevance: "high",
    frontendNote: "字符串处理常考",
    description: `
给你一个字符串 \`s\` ，请你反转字符串中 **单词** 的顺序。

**单词** 是由非空格字符组成的字符串。\`s\` 中使用至少一个空格将字符串中的 **单词** 分隔开。

返回 **单词** 顺序颠倒且 **单词** 之间用单个空格连接的结果字符串。

**注意**：输入字符串 \`s\` 中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
`,
    examples: `
**示例 1：**
\`\`\`
输入：s = "the sky is blue"
输出："blue is sky the"
\`\`\`

**示例 2：**
\`\`\`
输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能存在前导空格和尾随空格。
\`\`\`

**示例 3：**
\`\`\`
输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
\`\`\`
`,
    constraints: `
- \`1 <= s.length <= 10^4\`
- \`s\` 包含英文大小写字母、数字和空格 \`' '\`
- \`s\` 中 **至少存在一个** 单词

**进阶**：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 \`O(1)\` 额外空间复杂度的 **原地** 解法。
`,
    initialCode: `/**
 * @param {string} s
 * @return {string}
 */
function solution(s) {
  // 在这里编写你的代码

}`,
    solution: `/**
 * @param {string} s
 * @return {string}
 */
function solution(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
    testCases: [
      { id: "1", name: "基本测试", input: ["the sky is blue"], expected: "blue is sky the" },
      { id: "2", name: "首尾空格", input: ["  hello world  "], expected: "world hello" },
      { id: "3", name: "多余空格", input: ["a good   example"], expected: "example good a" },
      { id: "4", name: "单词", input: ["hello"], expected: "hello" },
      { id: "5", name: "两单词", input: ["  a  b  "], expected: "b a" },
    ],
    hints: [
      "可以使用语言内置的字符串分割和反转功能",
      "原地解法：先整体反转，再逐个单词反转",
      "注意处理多余空格",
    ],
    explanation: `
## 解题思路

### 方法一：使用内置函数

1. trim() 去除首尾空格
2. split(/\\s+/) 按空格分割（正则处理多个空格）
3. reverse() 反转数组
4. join(' ') 用单个空格连接

### 复杂度分析

- 时间复杂度：O(n)
- 空间复杂度：O(n)
`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["rotate-array"],
    solutions: [
      {
        name: "内置函数（推荐）",
        code: `/**
 * 反转字符串中的单词 - 内置函数法
 *
 * 核心思想：
 * 利用 JavaScript 内置函数，链式调用完成任务
 *
 * 处理步骤：
 * 1. trim() - 去除首尾空格
 * 2. split(/\\s+/) - 按一个或多个空格分割（正则表达式）
 * 3. reverse() - 反转数组
 * 4. join(' ') - 用单个空格连接
 *
 * 正则解释：\\s+ 表示一个或多个空白字符
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，需要存储分割后的数组
 */
function solution(s) {
  // trim() 去除首尾空格
  // split(/\\s+/) 按一个或多个空格分割，自动处理多余空格
  // reverse() 反转数组
  // join(' ') 用单个空格连接
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
        explanation: `## 内置函数法

### 处理流程
"  hello   world  "
1. trim() → "hello   world"
2. split(/\\s+/) → ["hello", "world"]（自动处理多个空格）
3. reverse() → ["world", "hello"]
4. join(' ') → "world hello"

### 正则表达式
\\s+ 匹配一个或多个空白字符，包括空格、制表符等
这样可以自动处理单词间的多个空格

### 优点
代码简洁，一行搞定`,
        animation: {
          type: "two-pointers" as const,
          title: "反转字符串中的单词演示",
          steps: [
            {
              array: ["the", "sky", "is", "blue"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "原数组" }],
              description: "s='the sky is blue'，分割成['the','sky','is','blue']",
            },
            {
              array: ["the", "sky", "is", "blue"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "green" as const, label: "交换" },
                { indices: [3], color: "green" as const, label: "交换" },
              ],
              description: "reverse(): 交换首尾 'the' ↔ 'blue'",
            },
            {
              array: ["blue", "sky", "is", "the"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [0, 3], color: "gray" as const, label: "已交换" },
                { indices: [1], color: "green" as const, label: "交换" },
                { indices: [2], color: "green" as const, label: "交换" },
              ],
              description: "交换 'sky' ↔ 'is'",
            },
            {
              array: ["blue", "is", "sky", "the"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "反转完成" }],
              description: "reverse完成: ['blue','is','sky','the']",
            },
            {
              array: ["blue", "is", "sky", "the"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "结果" }],
              description: "join(' '): 'blue is sky the'",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "双指针倒序",
        code: `/**
 * 反转字符串中的单词 - 双指针倒序
 *
 * 核心思想：
 * 从字符串末尾开始，用双指针提取每个单词
 * 这样就自然地实现了单词顺序的反转
 *
 * 为什么从后往前？
 * - 从后往前提取单词，添加到结果中，就是反转顺序
 * - 避免了先分割再反转的步骤
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，结果字符串的空间
 */
function solution(s) {
  let result = "";
  let right = s.length - 1;

  while (right >= 0) {
    // 第一步：跳过末尾空格
    // 找到当前单词的最后一个字符
    while (right >= 0 && s[right] === ' ') {
      right--;
    }

    // 字符串处理完毕
    if (right < 0) break;

    // 第二步：找到单词的开始位置
    // left 指向单词前的空格（或 -1）
    let left = right;
    while (left >= 0 && s[left] !== ' ') {
      left--;
    }

    // 第三步：提取单词 s[left+1, right+1]
    const word = s.slice(left + 1, right + 1);

    // 添加到结果（如果不是第一个单词，前面加空格）
    result += result.length > 0 ? ' ' + word : word;

    // 移动指针，准备提取下一个单词
    right = left;
  }

  return result;
}`,
        explanation: `## 双指针倒序

### 核心思路
从字符串末尾开始，用双指针定位每个单词的边界

### 执行过程
"  hello world  "
- right=13: 跳过空格，right=11('d')
- left=11→6('d'→' ')
- 提取 "world"，result="world"
- right=5: 跳过空格，right=4('o')
- left=4→1('o'→' ')
- 提取 "hello"，result="world hello"
- right=0: 跳过空格，right=-1
- 返回 "world hello"`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "原地算法思路（JavaScript 模拟）",
        code: `/**
 * 反转字符串中的单词 - 原地算法思路
 *
 * 核心思想（适用于可变字符串语言如 C/C++）：
 * 1. 去除多余空格（原地压缩）
 * 2. 反转整个字符串
 * 3. 再反转每个单词
 *
 * 为什么这样做有效？
 * - "the sky" 整体反转变成 "yks eht"
 * - 再把每个单词反转："sky the"
 * - 两次反转，单词内部顺序恢复，但单词之间顺序颠倒了
 *
 * JavaScript 字符串不可变，这里用数组模拟
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)（如果是 C++ 可以达到 O(1)）
 */
function solution(s) {
  // 转为数组模拟可变字符串
  let arr = s.trim().split('');

  // 第一步：去除多余空格（保留单词间的单个空格）
  let i = 0;
  for (let j = 0; j < arr.length; j++) {
    // 保留非空格字符，或者不是连续空格
    if (arr[j] !== ' ' || (i > 0 && arr[i - 1] !== ' ')) {
      arr[i++] = arr[j];
    }
  }
  arr = arr.slice(0, i);

  // 第二步：反转整个数组
  arr.reverse();

  // 第三步：反转每个单词
  let start = 0;
  for (let end = 0; end <= arr.length; end++) {
    // 遇到空格或末尾，说明一个单词结束
    if (end === arr.length || arr[end] === ' ') {
      // 反转 [start, end-1] 区间
      let left = start, right = end - 1;
      while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
      start = end + 1;  // 下一个单词的起始位置
    }
  }

  return arr.join('');
}`,
        explanation: `## 原地算法思路

### 核心思路（经典面试算法）
1. 去除多余空格
2. 反转整个字符串
3. 再反转每个单词

### 执行示例
"the sky is blue"
1. 去除空格后（本例无多余）："the sky is blue"
2. 整体反转："eulb si yks eht"
3. 逐词反转：
   - "eulb" → "blue"
   - "si" → "is"
   - "yks" → "sky"
   - "eht" → "the"
4. 最终结果："blue is sky the"

### 适用场景
C/C++ 等可变字符串语言，可以实现真正的 O(1) 空间`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 20. 缺失的第一个正数 (41)
  {
    id: "first-missing-positive",
    leetcodeId: 41,
    title: "缺失的第一个正数",
    titleEn: "First Missing Positive",
    difficulty: "hard",
    category: "array-string",
    tags: ["数组", "哈希表"],
    frontendRelevance: "low",
    frontendNote: "缺失正数Hard",
    description: `给你一个未排序的整数数组 \`nums\`，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 \`O(n)\` 并且只使用常数级别额外空间的解决方案。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,0]
输出：3
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,4,-1,1]
输出：2
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [7,8,9,11,12]
输出：1
\`\`\``,
    constraints: `- \`1 <= nums.length <= 5 * 10^5\`
- \`-2^31 <= nums[i] <= 2^31 - 1\``,
    initialCode: `function firstMissingPositive(nums) {
  // 在此处编写你的代码

}`,
    solution: `function firstMissingPositive(nums) {
  const n = nums.length;

  // 将每个数放到正确的位置：nums[i] 应该等于 i + 1
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // 交换 nums[i] 和 nums[nums[i] - 1]
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  // 找第一个不在正确位置的数
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return n + 1;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1,2,0]], expected: 3 },
      { id: "2", name: "示例2", input: [[3,4,-1,1]], expected: 2 },
      { id: "3", name: "示例3", input: [[7,8,9,11,12]], expected: 1 },
      { id: "4", name: "连续", input: [[1,2,3]], expected: 4 },
    ],
    hints: [
      "答案一定在 [1, n+1] 范围内",
      "把数组当作哈希表使用",
      "将每个正整数 x 放到索引 x-1 的位置",
    ],
    explanation: `## 解题思路

### 原地哈希

核心思想：将数组本身作为哈希表，把每个正整数 x 放到索引 x-1 的位置。

### 步骤
1. 遍历数组，对于每个 nums[i]：
   - 如果 1 <= nums[i] <= n 且 nums[nums[i]-1] != nums[i]
   - 则交换 nums[i] 和 nums[nums[i]-1]
2. 再次遍历，找到第一个 nums[i] != i+1 的位置

### 为什么答案在 [1, n+1]？
长度为 n 的数组，最多包含 n 个不同的正整数。所以缺失的最小正整数最大是 n+1。

### 复杂度分析
- 时间复杂度：O(n)，虽然有嵌套循环，但每个数最多被交换一次
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["missing-number", "find-all-numbers-disappeared-in-array"],
    solutions: [
      {
        name: "原地哈希（推荐）",
        code: `/**
 * 缺失的第一个正数 - 原地哈希
 *
 * 核心思想：
 * 把数组本身当作哈希表使用！
 * 理想情况：nums[i] 应该存储值 i+1
 * 即：nums[0]=1, nums[1]=2, nums[2]=3, ...
 *
 * 关键洞察：
 * - 长度为 n 的数组，答案一定在 [1, n+1] 范围内
 * - 如果 1,2,3,...,n 都存在，答案是 n+1
 * - 否则答案是第一个缺失的正整数
 *
 * 时间复杂度：O(n)，虽然有 while，但每个数最多被交换一次
 * 空间复杂度：O(1)，原地修改数组
 */
function firstMissingPositive(nums) {
  const n = nums.length;

  // 第一遍：将每个数放到正确的位置
  // nums[i] 应该等于 i + 1
  for (let i = 0; i < n; i++) {
    // 当 nums[i] 在有效范围 [1, n] 内，且不在正确位置时，交换
    // nums[i] - 1 是 nums[i] 应该在的索引位置
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // 将 nums[i] 放到它应该在的位置 nums[nums[i] - 1]
      // 例如：nums[i]=3，则放到 nums[2] 的位置
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
      // 继续检查交换过来的数是否需要再交换
    }
  }

  // 第二遍：找第一个不在正确位置的数
  // 如果 nums[i] != i+1，说明 i+1 这个数缺失
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // 所有位置都正确，答案是 n+1
  return n + 1;
}`,
        explanation: `## 原地哈希

### 核心思想
数组本身就是一个哈希表：索引 i 应该存储值 i+1

### 示例
[3, 4, -1, 1]
- i=0: nums[0]=3 应该放到 nums[2]，交换→[-1, 4, 3, 1]
- i=0: nums[0]=-1 不在范围内，跳过
- i=1: nums[1]=4 应该放到 nums[3]，交换→[-1, 1, 3, 4]
- i=1: nums[1]=1 应该放到 nums[0]，交换→[1, -1, 3, 4]
- i=1: nums[1]=-1 不在范围内，跳过
- 最终：[1, -1, 3, 4]
- 检查：nums[1]=-1 ≠ 2，返回 2

### 为什么时间是 O(n)？
每个数最多被交换一次到正确位置，总交换次数不超过 n`,
        animation: {
          type: "two-pointers" as const,
          title: "缺失的第一个正数演示",
          steps: [
            {
              array: ["3", "4", "-1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "原数组" }],
              description: "nums=[3,4,-1,1]。将每个数放到正确位置(nums[i]=i+1)",
            },
            {
              array: ["3", "4", "-1", "1"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "3" },
                { indices: [2], color: "blue" as const, label: "目标位置" },
              ],
              description: "nums[0]=3应该放到nums[2]，交换",
            },
            {
              array: ["-1", "4", "3", "1"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "red" as const, label: "-1无效" },
                { indices: [2], color: "green" as const, label: "3已就位" },
              ],
              description: "交换后[-1,4,3,1]。-1不在[1,n]范围，跳过",
            },
            {
              array: ["-1", "1", "3", "4"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [1], color: "green" as const, label: "1" },
                { indices: [3], color: "green" as const, label: "4已就位" },
              ],
              description: "nums[1]=4放到nums[3]，交换后1放到nums[0]",
            },
            {
              array: ["1", "-1", "3", "4"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "green" as const, label: "1" },
                { indices: [2], color: "green" as const, label: "3" },
                { indices: [3], color: "green" as const, label: "4" },
                { indices: [1], color: "red" as const, label: "缺失" },
              ],
              description: "最终[1,-1,3,4]。nums[1]≠2，返回2",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "标记法",
        code: `/**
 * 缺失的第一个正数 - 标记法
 *
 * 核心思想：
 * 用数值的正负号来标记某个数是否存在
 * 如果 nums[i] 是负数，说明 i+1 存在于原数组中
 *
 * 步骤：
 * 1. 将无效数（<=0 或 >n）改为 n+1（确保都是正数）
 * 2. 对于每个有效数 x，将 nums[x-1] 变为负数（标记 x 存在）
 * 3. 第一个正数的索引 i，说明 i+1 缺失
 *
 * 时间复杂度：O(n)，三次遍历
 * 空间复杂度：O(1)
 */
function firstMissingPositive(nums) {
  const n = nums.length;

  // 第一步：将所有非正数和大于 n 的数改为 n+1
  // 这样数组中只有 [1, n+1] 范围的正数
  // n+1 不会影响结果，因为我们只关心 [1, n]
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = n + 1;
    }
  }

  // 第二步：用负号标记存在的数
  // 如果 x 存在，将 nums[x-1] 变为负数
  for (let i = 0; i < n; i++) {
    // 取绝对值，因为可能已经被标记为负数
    const num = Math.abs(nums[i]);
    if (num <= n) {
      // 将 nums[num-1] 变为负数
      // Math.abs 确保不会重复变负
      nums[num - 1] = -Math.abs(nums[num - 1]);
    }
  }

  // 第三步：找第一个正数的位置
  // 如果 nums[i] > 0，说明 i+1 没有出现过
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  // 所有 [1, n] 都存在
  return n + 1;
}`,
        explanation: `## 标记法

### 核心思想
用数值的符号来标记某个数是否存在

### 示例
[3, 4, -1, 1]
第一步：[-1 改为 5]→[3, 4, 5, 1]
第二步：
- nums[0]=3 → nums[2] 变负 → [3, 4, -5, 1]
- nums[1]=4 → nums[3] 变负 → [3, 4, -5, -1]
- nums[2]=5 > 4，跳过
- nums[3]=1 → nums[0] 变负 → [-3, 4, -5, -1]
第三步：nums[1]=4 > 0，返回 2

### 与原地哈希对比
- 不需要交换操作
- 需要三次遍历`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 21. 划分字母区间 (763)
  {
    id: "partition-labels",
    leetcodeId: 763,
    title: "划分字母区间",
    titleEn: "Partition Labels",
    difficulty: "medium",
    category: "array-string",
    tags: ["贪心", "哈希表", "双指针", "字符串"],
    frontendRelevance: "medium",
    frontendNote: "贪心划分",
    description: `给你一个字符串 \`s\`。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。

注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 \`s\`。

返回一个表示每个字符串片段的长度的列表。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca"、"defegde"、"hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "eccbbbbdec"
输出：[10]
\`\`\``,
    constraints: `- \`1 <= s.length <= 500\`
- \`s\` 仅由小写英文字母组成`,
    initialCode: `function partitionLabels(s) {
  // 在此处编写你的代码

}`,
    solution: `function partitionLabels(s) {
  // 记录每个字母最后出现的位置
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  const result = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    // 更新当前片段的结束位置
    end = Math.max(end, lastIndex[s[i]]);

    // 如果当前位置等于结束位置，说明可以划分
    if (i === end) {
      result.push(end - start + 1);
      start = end + 1;
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["ababcbacadefegdehijhklij"], expected: [9,7,8] },
      { id: "2", name: "示例2", input: ["eccbbbbdec"], expected: [10] },
      { id: "3", name: "每字母一段", input: ["abc"], expected: [1,1,1] },
    ],
    hints: [
      "首先记录每个字母最后出现的位置",
      "遍历字符串，维护当前片段的结束位置",
      "当遍历到结束位置时，完成一个片段的划分",
    ],
    explanation: `## 解题思路

### 贪心算法

1. **预处理**：记录每个字母最后出现的位置
2. **遍历**：维护当前片段的结束位置 end
3. **划分**：当 i === end 时，完成一个片段

### 核心思想
对于当前片段中的每个字母，片段必须延伸到该字母最后出现的位置。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)，只有 26 个字母`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["merge-intervals"],
    solutions: [
      {
        name: "贪心（推荐）",
        code: `/**
 * 划分字母区间 - 贪心算法
 *
 * 核心思想：
 * 每个字母只能出现在一个片段中，所以片段必须包含该字母的所有出现位置
 * 因此，片段的右边界至少要延伸到当前所有字母的最后出现位置
 *
 * 算法步骤：
 * 1. 预处理：记录每个字母最后出现的位置
 * 2. 遍历字符串，不断更新当前片段的右边界
 * 3. 当遍历位置 = 右边界时，完成一个片段的划分
 *
 * 时间复杂度：O(n)，两次遍历
 * 空间复杂度：O(1)，最多26个字母
 */
function partitionLabels(s) {
  // 第一步：记录每个字母最后出现的位置
  // 例如：字符 'a' 最后出现在索引 8
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  const result = [];  // 存储每个片段的长度
  let start = 0;      // 当前片段的起始位置
  let end = 0;        // 当前片段的结束位置（右边界）

  // 第二步：遍历字符串
  for (let i = 0; i < s.length; i++) {
    // 更新当前片段的右边界
    // 必须包含当前字母的所有出现，所以至少要到 lastIndex[s[i]]
    end = Math.max(end, lastIndex[s[i]]);

    // 如果当前位置等于右边界，说明可以划分
    // 因为当前片段内的所有字母都已经处理完了
    if (i === end) {
      result.push(end - start + 1);  // 记录片段长度
      start = end + 1;               // 开始新的片段
    }
  }

  return result;
}`,
        explanation: `## 贪心算法

### 核心思路
片段的右边界必须包含当前所有字母的最后出现位置

### 执行示例
s = "ababcbacadefegdehijhklij"
- lastIndex: {a:8, b:5, c:7, d:14, e:15, f:11, g:13, h:19, i:22, j:23, k:20, l:21}
- i=0('a'): end=max(0,8)=8
- i=1('b'): end=max(8,5)=8
- ...
- i=8('a'): i=end=8，划分！长度 9
- i=9('d'): end=14
- ...
- i=15('e'): i=end=15，划分！长度 7
- ...

### 为什么这样正确？
当 i=end 时，说明 [start, end] 内所有字母的最后位置都不超过 end，可以安全划分`,
        animation: {
          type: "two-pointers" as const,
          title: "划分字母区间演示",
          steps: [
            {
              array: ["a", "b", "a", "b", "c", "b", "a", "c", "a"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "blue" as const, label: "ababcbaca" }],
              description: "s='ababcbaca'。先记录每个字母最后位置: a:8,b:5,c:7",
            },
            {
              array: ["a", "b", "a", "b", "c", "b", "a", "c", "a"],
              left: 0,
              right: 8,
              highlights: [
                { indices: [0], color: "green" as const, label: "i=0" },
                { indices: [8], color: "blue" as const, label: "end=8" },
              ],
              description: "i=0('a'): end=max(0,8)=8。片段至少到位置8",
            },
            {
              array: ["a", "b", "a", "b", "c", "b", "a", "c", "a"],
              left: 0,
              right: 8,
              highlights: [
                { indices: [0, 1, 2, 3], color: "gray" as const, label: "遍历中" },
                { indices: [4], color: "green" as const, label: "i=4" },
                { indices: [8], color: "blue" as const, label: "end=8" },
              ],
              description: "i=1-4: 更新end，最终end仍为8(因为c最后在7)",
            },
            {
              array: ["a", "b", "a", "b", "c", "b", "a", "c", "a"],
              left: 0,
              right: 8,
              highlights: [
                { indices: [0, 1, 2, 3, 4, 5, 6, 7], color: "gray" as const, label: "遍历中" },
                { indices: [8], color: "green" as const, label: "i=end=8" },
              ],
              description: "i=8: i==end，划分！片段长度=9",
            },
            {
              array: ["a", "b", "a", "b", "c", "b", "a", "c", "a"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: "片段1" }],
              description: "结果: [9]。整个字符串是一个片段",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "区间合并思路",
        code: `/**
 * 划分字母区间 - 区间合并思路
 *
 * 核心思想：
 * 将每个字母看作一个区间 [首次出现位置, 最后出现位置]
 * 问题转化为：合并所有重叠的区间
 *
 * 算法步骤：
 * 1. 计算每个字母的区间 [start, end]
 * 2. 按起始位置排序
 * 3. 合并重叠区间
 * 4. 合并后的每个区间就是一个片段
 *
 * 时间复杂度：O(n + k log k)，k 是不同字母数（最多26）
 * 空间复杂度：O(k)
 */
function partitionLabels(s) {
  // 第一步：记录每个字母的起始和结束位置
  const intervals = {};
  for (let i = 0; i < s.length; i++) {
    if (!intervals[s[i]]) {
      // 第一次出现，初始化区间
      intervals[s[i]] = [i, i];
    } else {
      // 更新最后出现位置
      intervals[s[i]][1] = i;
    }
  }

  // 第二步：按起始位置排序
  const sortedIntervals = Object.values(intervals).sort((a, b) => a[0] - b[0]);

  // 第三步：合并重叠区间
  const result = [];
  let [start, end] = sortedIntervals[0];

  for (let i = 1; i < sortedIntervals.length; i++) {
    const [s, e] = sortedIntervals[i];
    if (s <= end) {
      // 区间重叠，合并
      end = Math.max(end, e);
    } else {
      // 不重叠，记录当前区间，开始新区间
      result.push(end - start + 1);
      start = s;
      end = e;
    }
  }
  // 别忘了最后一个区间
  result.push(end - start + 1);

  return result;
}`,
        explanation: `## 区间合并思路

### 核心思想
将每个字母看作一个区间，问题变成区间合并问题

### 示例
s = "ababcbaca"
- 'a': [0, 8]
- 'b': [1, 5]
- 'c': [4, 7]

排序后：[0,8], [1,5], [4,7]
合并：[0,8] + [1,5] → [0,8]
      [0,8] + [4,7] → [0,8]
结果：[9]（一个长度为9的片段）

### 与贪心法对比
- 思路更直观（区间合并是经典问题）
- 代码较长
- 本质上是同一个问题的不同视角`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 22. 下一个排列 (31)
  {
    id: "next-permutation",
    leetcodeId: 31,
    title: "下一个排列",
    titleEn: "Next Permutation",
    difficulty: "medium",
    category: "array-string",
    tags: ["数组", "双指针"],
    frontendRelevance: "medium",
    frontendNote: "下一个排列算法",
    description: `整数数组的一个 **排列** 就是将其所有成员以序列或线性顺序排列。

整数数组的 **下一个排列** 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 **下一个排列** 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

必须 **原地** 修改，只允许使用额外常数空间。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3]
输出：[1,3,2]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,2,1]
输出：[1,2,3]
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1,1,5]
输出：[1,5,1]
\`\`\``,
    constraints: `- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 100\``,
    initialCode: `function nextPermutation(nums) {
  // 在此处编写你的代码

}`,
    solution: `function nextPermutation(nums) {
  const n = nums.length;

  // 1. 从右向左找第一个升序对 (i, i+1)，即 nums[i] < nums[i+1]
  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  if (i >= 0) {
    // 2. 从右向左找第一个大于 nums[i] 的数
    let j = n - 1;
    while (j > i && nums[j] <= nums[i]) {
      j--;
    }
    // 3. 交换 nums[i] 和 nums[j]
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 4. 反转 i+1 到末尾的部分
  let left = i + 1, right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1,2,3]], expected: [1,3,2] },
      { id: "2", name: "示例2", input: [[3,2,1]], expected: [1,2,3] },
      { id: "3", name: "示例3", input: [[1,1,5]], expected: [1,5,1] },
      { id: "4", name: "中间", input: [[1,3,2]], expected: [2,1,3] },
    ],
    hints: [
      "从右向左找第一个相邻升序对",
      "从右向左找第一个大于该元素的数并交换",
      "反转后面的部分使其最小",
    ],
    explanation: `## 解题思路

### 算法步骤
1. 从右向左找第一个相邻升序对 (i, i+1)，即 nums[i] < nums[i+1]
2. 从右向左找第一个大于 nums[i] 的数 nums[j]
3. 交换 nums[i] 和 nums[j]
4. 反转 i+1 到末尾的部分

### 为什么这样做？
- 步骤1找到了可以增大的位置
- 步骤2找到刚好大于 nums[i] 的数
- 步骤4确保后面的部分是最小的

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["permutations", "permutations-ii"],
    solutions: [
      {
        name: "两遍扫描",
        code: `/**
 * 下一个排列 - 两遍扫描算法
 *
 * 核心思想：
 * 找到下一个字典序更大的排列，增大的幅度要尽可能小
 *
 * 关键观察：
 * 1. 从右往左的递减序列已经是局部最大，无法再增大
 * 2. 找到第一个打破递减趋势的位置 i（nums[i] < nums[i+1]）
 * 3. 在 i 右边找一个刚好大于 nums[i] 的数来替换
 * 4. 把 i 右边反转成最小排列
 *
 * 算法步骤：
 * 1. 从右向左找第一个升序对 (i, i+1)，即 nums[i] < nums[i+1]
 * 2. 从右向左找第一个大于 nums[i] 的数 nums[j]
 * 3. 交换 nums[i] 和 nums[j]
 * 4. 反转 i+1 到末尾
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function nextPermutation(nums) {
  const n = nums.length;

  // 第一步：从右向左找第一个升序对
  // 找到 i 使得 nums[i] < nums[i+1]
  // 如果整个数组是降序的（如 [3,2,1]），则 i 会变成 -1
  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  // 如果 i >= 0，说明存在下一个更大的排列
  if (i >= 0) {
    // 第二步：从右向左找第一个大于 nums[i] 的数
    // 因为 [i+1, n-1] 是递减的，所以从右边找到的第一个就是最小的那个
    let j = n - 1;
    while (j > i && nums[j] <= nums[i]) {
      j--;
    }

    // 第三步：交换 nums[i] 和 nums[j]
    // 交换后 [i+1, n-1] 仍然是递减的
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // 第四步：反转 i+1 到末尾
  // 将递减变成递增，得到最小的排列
  // 如果 i = -1，则反转整个数组，得到最小排列
  let left = i + 1, right = n - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}`,
        explanation: `## 两遍扫描算法

### 核心思路
找到能增大的最右位置，用刚好大于它的数替换，然后让右边尽可能小

### 图解示例
[1, 5, 8, 4, 7, 6, 5, 3, 1]
          ↑
          i=3, nums[i]=4

从右边找第一个 > 4 的数：nums[6]=5
交换后：[1, 5, 8, 5, 7, 6, 4, 3, 1]

反转 i+1 到末尾：[7,6,4,3,1] → [1,3,4,6,7]
结果：[1, 5, 8, 5, 1, 3, 4, 6, 7]

### 边界情况
- [3,2,1]：完全降序，i=-1，直接反转变成 [1,2,3]
- [1,2,3]：i=1，交换 2,3 变成 [1,3,2]

### 为什么反转而不是排序？
交换后 [i+1, n-1] 仍然保持递减顺序，反转就变成递增（最小）`,
        animation: {
          type: "two-pointers" as const,
          title: "下一个排列演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "nums" }],
              description: "nums=[1,2,3]。找下一个字典序更大的排列",
            },
            {
              array: ["1", "2", "3"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "i=1" },
                { indices: [2], color: "blue" as const, label: "i+1" },
              ],
              description: "从右向左找升序对: nums[1]=2 < nums[2]=3，找到i=1",
            },
            {
              array: ["1", "2", "3"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "i" },
                { indices: [2], color: "green" as const, label: "j" },
              ],
              description: "从右向左找第一个>nums[1]的数: nums[2]=3>2，j=2",
            },
            {
              array: ["1", "3", "2"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "交换" },
                { indices: [2], color: "green" as const, label: "交换" },
              ],
              description: "交换nums[1]和nums[2]: [1,3,2]",
            },
            {
              array: ["1", "3", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "i+1到末尾只有一个元素，无需反转。结果=[1,3,2]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
