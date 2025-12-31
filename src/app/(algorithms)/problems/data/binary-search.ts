import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const binarySearchProblems: Problem[] = [
  // 1. 搜索旋转排序数组 (33)
  {
    id: "search-in-rotated-sorted-array",
    leetcodeId: 33,
    title: "搜索旋转排序数组",
    titleEn: "Search in Rotated Sorted Array",
    difficulty: "medium",
    category: "binary-search",
    tags: ["数组", "二分查找"],
    frontendRelevance: "medium",
    frontendNote: "旋转数组二分",
    description: `整数数组 \`nums\` 按升序排列，数组中的值 **互不相同**。

在传递给函数之前，\`nums\` 在预先未知的某个下标 \`k\`（\`0 <= k < nums.length\`）上进行了 **旋转**，使数组变为 \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\`（下标 **从 0 开始** 计数）。例如，\`[0,1,2,4,5,6,7]\` 在下标 \`3\` 处经旋转后可能变为 \`[4,5,6,7,0,1,2]\`。

给你 **旋转后** 的数组 \`nums\` 和一个整数 \`target\`，如果 \`nums\` 中存在这个目标值 \`target\`，则返回它的下标，否则返回 \`-1\`。

你必须设计一个时间复杂度为 \`O(log n)\` 的算法解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1], target = 0
输出：-1
\`\`\``,
    constraints: `- \`1 <= nums.length <= 5000\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` 中的每个值都 **独一无二**
- 题目数据保证 \`nums\` 在预先未知的某个下标上进行了旋转
- \`-10^4 <= target <= 10^4\``,
    initialCode: `function search(nums, target) {
  // 在此处编写你的代码

}`,
    solution: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // 判断哪一半是有序的
    if (nums[left] <= nums[mid]) {
      // 左半部分有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右半部分有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`,
    testCases: [
      {
        id: "1",
        name: "找到目标",
        input: [[4,5,6,7,0,1,2], 0],
        expected: 4
      },
      {
        id: "2",
        name: "目标不存在",
        input: [[4,5,6,7,0,1,2], 3],
        expected: -1
      },
      {
        id: "3",
        name: "单元素",
        input: [[1], 0],
        expected: -1
      }
    ],
    hints: [
      "二分查找，但需要判断哪一半是有序的",
      "根据有序的那一半判断 target 在哪边",
      "注意边界条件的处理"
    ],
    explanation: `## 解题思路

### 二分查找

1. 旋转数组的特点：至少有一半是有序的
2. 通过比较 nums[left] 和 nums[mid] 判断哪一半有序
3. 如果左半有序且 target 在左半范围内，搜索左半；否则搜索右半
4. 如果右半有序且 target 在右半范围内，搜索右半；否则搜索左半

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["find-minimum-in-rotated-sorted-array", "search-a-2d-matrix"],
    solutions: [
      {
        name: "二分查找（推荐）",
        code: `/**
 * 搜索旋转排序数组 - 二分查找
 *
 * 核心思想：
 * 旋转数组有一个重要性质：至少有一半是有序的
 * 通过比较 nums[left] 和 nums[mid] 来判断哪一半有序
 *
 * 判断逻辑：
 * - nums[left] <= nums[mid]：左半部分有序
 * - 否则：右半部分有序
 *
 * 搜索策略：
 * 1. 先判断哪一半有序
 * 2. 判断 target 是否在有序的那一半
 * 3. 如果在，就在那一半搜索；否则在另一半搜索
 *
 * 时间复杂度：O(log n)，每次排除一半
 * 空间复杂度：O(1)，只用常数变量
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 找到目标，直接返回
    if (nums[mid] === target) {
      return mid;
    }

    // 判断哪一半是有序的
    if (nums[left] <= nums[mid]) {
      // 左半部分有序 [left, mid]
      // 检查 target 是否在有序的左半部分
      if (nums[left] <= target && target < nums[mid]) {
        // target 在左半部分
        right = mid - 1;
      } else {
        // target 在右半部分
        left = mid + 1;
      }
    } else {
      // 右半部分有序 [mid, right]
      // 检查 target 是否在有序的右半部分
      if (nums[mid] < target && target <= nums[right]) {
        // target 在右半部分
        left = mid + 1;
      } else {
        // target 在左半部分
        right = mid - 1;
      }
    }
  }

  return -1;  // 未找到
}`,
        animation: {
          type: "two-pointers" as const,
          title: "搜索旋转排序数组 - 二分查找演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [3], color: "yellow" as const, label: "mid=3" }],
              description: "target=0。left=0, right=6, mid=3。nums[3]=7 ≠ 0",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "左有序" },
                { indices: [3], color: "yellow" as const, label: "mid" },
              ],
              description: "nums[0]=4 <= nums[3]=7，左半有序。target=0 在 [4,7) 内？否！搜右半",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 6,
              highlights: [{ indices: [5], color: "yellow" as const, label: "mid=5" }],
              description: "left=4, right=6, mid=5。nums[5]=1 ≠ 0",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 6,
              highlights: [
                { indices: [5, 6], color: "green" as const, label: "右有序" },
                { indices: [5], color: "yellow" as const, label: "mid" },
              ],
              description: "nums[4]=0 > nums[5]=1？否，右半有序。target=0 在 (1,2] 内？否！搜左半",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "purple" as const, label: "mid=4" }],
              description: "left=4, right=4, mid=4。nums[4]=0 === target！",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "red" as const, label: "找到!" }],
              description: "完成！找到 target=0 在索引 4 位置。返回 4",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 二分查找

### 核心思想
旋转数组的关键性质：**至少有一半是有序的**

### 执行示例
nums = [4,5,6,7,0,1,2], target = 0

| 步骤 | left | right | mid | nums[mid] | 有序半边 | 操作 |
|------|------|-------|-----|-----------|----------|------|
| 1    | 0    | 6     | 3   | 7         | 左有序   | 0 不在 [4,7)，搜右 |
| 2    | 4    | 6     | 5   | 1         | 右有序   | 0 在 (1,2]？否，搜左 |
| 3    | 4    | 4     | 4   | 0         | 找到！   | 返回 4 |

### 为什么 nums[left] <= nums[mid] 判断左有序？
- 等号处理 left == mid 的情况（区间只有1-2个元素）
- 如果 nums[left] <= nums[mid]，说明 [left, mid] 没有旋转点，是有序的

### 边界条件
- target < nums[mid]：不能取等号，因为 mid 已经检查过
- target <= nums[right]：可以取等号，因为 right 还没检查`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "先找旋转点",
        code: `/**
 * 搜索旋转排序数组 - 先找旋转点
 *
 * 核心思想：
 * 分两步进行：
 * 1. 先用二分查找找到旋转点（最小值位置）
 * 2. 根据 target 确定在哪一半搜索
 * 3. 在确定的那一半进行标准二分查找
 *
 * 时间复杂度：O(log n)，两次二分查找
 * 空间复杂度：O(1)
 */
function search(nums, target) {
  const n = nums.length;

  // 第一步：找到旋转点（最小值的索引）
  let left = 0, right = n - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // 如果 mid > right，最小值在右边
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // pivot 是最小值的索引，也是旋转点
  const pivot = left;

  // 第二步：确定在哪一半搜索
  left = 0;
  right = n - 1;
  // 如果 target 在右半部分（旋转后的小值区间）
  if (target >= nums[pivot] && target <= nums[n - 1]) {
    left = pivot;
  } else {
    // target 在左半部分（旋转后的大值区间）
    right = pivot - 1;
  }

  // 第三步：标准二分查找
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
        explanation: `## 先找旋转点

### 核心思想
将问题分解为三个简单步骤：
1. 找旋转点
2. 确定搜索区间
3. 标准二分查找

### 执行示例
nums = [4,5,6,7,0,1,2], target = 0

**第一步：找旋转点**
| left | right | mid | nums[mid] vs nums[right] | 操作 |
|------|-------|-----|-------------------------|------|
| 0    | 6     | 3   | 7 > 2                   | left = 4 |
| 4    | 6     | 5   | 1 < 2                   | right = 5 |
| 4    | 5     | 4   | 0 < 1                   | right = 4 |
pivot = 4

**第二步：确定区间**
target = 0 >= nums[4] = 0，且 0 <= nums[6] = 2
所以在右半部分搜索 [4, 6]

**第三步：二分查找**
在 [4,6] 中找 0，找到索引 4

### 优点
- 逻辑更清晰，分步处理
- 每一步都是标准的二分查找`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "先找旋转点解法演示",
          steps: [
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [3], color: "yellow" as const, label: "mid=3" }],
              description: "第一步：找旋转点。nums[3]=7 > nums[6]=2，最小值在右边",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 6,
              highlights: [{ indices: [5], color: "yellow" as const, label: "mid=5" }],
              description: "left=4。nums[5]=1 < nums[6]=2，最小值在左边或就是mid",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "pivot=4" }],
              description: "找到旋转点 pivot=4，nums[4]=0 是最小值",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 6,
              highlights: [
                { indices: [4, 5, 6], color: "blue" as const, label: "搜索区间" },
              ],
              description: "第二步：target=0在[0,2]范围内，搜索右半[4,6]",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "找到" }],
              description: "第三步：标准二分在[4,6]找到target=0，返回索引4",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "虚拟索引映射",
        code: `/**
 * 搜索旋转排序数组 - 虚拟索引映射
 *
 * 核心思想：
 * 找到旋转点后，通过索引映射将旋转数组"还原"为有序数组
 * 虚拟索引 0 对应实际索引 pivot
 * 虚拟索引 i 对应实际索引 (i + pivot) % n
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function search(nums, target) {
  const n = nums.length;

  // 第一步：找到旋转点（最小值位置）
  let left = 0, right = n - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const pivot = left;  // 旋转点，最小值的索引

  // 第二步：使用虚拟索引进行二分
  // 虚拟有序数组：从 pivot 开始到 pivot-1 结束
  left = 0;
  right = n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // 将虚拟索引映射到实际索引
    const realMid = (mid + pivot) % n;

    if (nums[realMid] === target) return realMid;
    if (nums[realMid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
        explanation: `## 虚拟索引映射

### 核心思想
通过索引映射，在逻辑上"还原"有序数组。

### 索引映射示例
原数组：[4,5,6,7,0,1,2]，pivot = 4

| 虚拟索引 | 实际索引 | 值 |
|---------|---------|-----|
| 0       | 4       | 0   |
| 1       | 5       | 1   |
| 2       | 6       | 2   |
| 3       | 0       | 4   |
| 4       | 1       | 5   |
| 5       | 2       | 6   |
| 6       | 3       | 7   |

虚拟有序数组：[0,1,2,4,5,6,7]

### 映射公式
realIndex = (virtualIndex + pivot) % n

### 特点
- 概念优雅，将旋转数组视为有序数组
- 索引映射是 O(1) 操作`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "虚拟索引映射演示",
          steps: [
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [4], color: "green" as const, label: "pivot=4" }],
              description: "找到pivot=4。虚拟数组[0,1,2,4,5,6,7]，realIdx=(vIdx+4)%7",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [0], color: "yellow" as const, label: "vMid=3→real=0" }],
              description: "虚拟mid=3，realMid=(3+4)%7=0。nums[0]=4 > target=0",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 2,
              highlights: [{ indices: [5], color: "yellow" as const, label: "vMid=1→real=5" }],
              description: "right=2。虚拟mid=1，realMid=(1+4)%7=5。nums[5]=1 > 0",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 0,
              highlights: [{ indices: [4], color: "green" as const, label: "vMid=0→real=4" }],
              description: "right=0。虚拟mid=0，realMid=(0+4)%7=4。nums[4]=0=target！",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "返回4" }],
              description: "返回实际索引4。虚拟索引让旋转数组变成标准有序数组！",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 2. 寻找旋转排序数组中的最小值 (153)
  {
    id: "find-minimum-in-rotated-sorted-array",
    leetcodeId: 153,
    title: "寻找旋转排序数组中的最小值",
    titleEn: "Find Minimum in Rotated Sorted Array",
    difficulty: "medium",
    category: "binary-search",
    tags: ["数组", "二分查找"],
    frontendRelevance: "medium",
    frontendNote: "旋转数组最小值",
    description: `已知一个长度为 \`n\` 的数组，预先按照升序排列，经由 \`1\` 到 \`n\` 次 **旋转** 后，得到输入数组。例如，原数组 \`nums = [0,1,2,4,5,6,7]\` 在变化后可能得到：
- 若旋转 \`4\` 次，则可以得到 \`[4,5,6,7,0,1,2]\`
- 若旋转 \`7\` 次，则可以得到 \`[0,1,2,4,5,6,7]\`

注意，数组 \`[a[0], a[1], a[2], ..., a[n-1]]\` **旋转一次** 的结果为数组 \`[a[n-1], a[0], a[1], a[2], ..., a[n-2]]\`。

给你一个元素值 **互不相同** 的数组 \`nums\`，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素**。

你必须设计一个时间复杂度为 \`O(log n)\` 的算法解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5]，旋转 3 次得到输入数组。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7]，旋转 3 次得到输入数组。
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17]，旋转 4 次得到输入数组。
\`\`\``,
    constraints: `- \`n == nums.length\`
- \`1 <= n <= 5000\`
- \`-5000 <= nums[i] <= 5000\`
- \`nums\` 中的所有整数 **互不相同**
- \`nums\` 原来是一个升序排序的数组，并进行了 \`1\` 至 \`n\` 次旋转`,
    initialCode: `function findMin(nums) {
  // 在此处编写你的代码

}`,
    solution: `function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // 最小值在右半部分
      left = mid + 1;
    } else {
      // 最小值在左半部分（包含 mid）
      right = mid;
    }
  }

  return nums[left];
}`,
    testCases: [
      {
        id: "1",
        name: "旋转3次",
        input: [[[3,4,5,1,2]]],
        expected: 1
      },
      {
        id: "2",
        name: "旋转4次",
        input: [[[4,5,6,7,0,1,2]]],
        expected: 0
      },
      {
        id: "3",
        name: "完整旋转",
        input: [[[11,13,15,17]]],
        expected: 11
      }
    ],
    hints: [
      "最小值是唯一一个比前一个元素小的元素",
      "比较 mid 和 right，判断最小值在哪一半",
      "注意边界条件"
    ],
    explanation: `## 解题思路

### 二分查找

1. 比较 nums[mid] 和 nums[right]
2. 如果 nums[mid] > nums[right]，说明最小值在右半部分
3. 否则最小值在左半部分（包含 mid）
4. 最终 left == right 时，找到最小值

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["search-in-rotated-sorted-array", "search-a-2d-matrix"],
    solutions: [
      {
        name: "二分查找（与右端比较）（推荐）",
        code: `/**
 * 寻找旋转排序数组中的最小值 - 与右端比较
 *
 * 核心思想：
 * 旋转数组分为两个有序部分，最小值是右半部分的第一个元素
 * 通过比较 mid 和 right 判断 mid 在哪一部分：
 * - nums[mid] > nums[right]：mid 在左半部分，最小值在右边
 * - nums[mid] <= nums[right]：mid 在右半部分，最小值在左边（包含 mid）
 *
 * 为什么与右端比较而不是左端？
 * - 与左端比较需要处理未旋转的特殊情况
 * - 与右端比较可以统一处理所有情况
 *
 * 时间复杂度：O(log n)，每次排除一半
 * 空间复杂度：O(1)
 */
function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  // 循环条件：left < right，最终 left == right 时找到最小值
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // mid 在左半部分（较大值区域）
      // 最小值一定在 mid 右边，排除 mid
      left = mid + 1;
    } else {
      // mid 在右半部分（较小值区域）
      // 最小值可能就是 mid，不能排除
      right = mid;
    }
  }

  // left == right，指向最小值
  return nums[left];
}`,
        animation: {
          type: "two-pointers" as const,
          title: "寻找旋转数组最小值 - 二分查找演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [3], color: "yellow" as const, label: "mid=3" }],
              description: "left=0, right=6, mid=3。nums[3]=7 > nums[6]=2，最小值在右半",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 6,
              highlights: [
                { indices: [4, 5, 6], color: "blue" as const, label: "搜索区间" },
                { indices: [5], color: "yellow" as const, label: "mid=5" },
              ],
              description: "left=4, right=6, mid=5。nums[5]=1 < nums[6]=2，最小值在左半（含mid）",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 5,
              highlights: [
                { indices: [4, 5], color: "blue" as const, label: "搜索区间" },
                { indices: [4], color: "yellow" as const, label: "mid=4" },
              ],
              description: "left=4, right=5, mid=4。nums[4]=0 < nums[5]=1，最小值在左半（含mid）",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "red" as const, label: "最小值!" }],
              description: "left=right=4，循环结束！nums[4]=0 是最小值",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 二分查找（与右端比较）

### 核心思想
旋转数组的结构：[大值区域...最小值...小值区域]
通过比较 mid 和 right 判断 mid 在哪个区域

### 执行示例
nums = [4,5,6,7,0,1,2]

| 步骤 | left | right | mid | nums[mid] | nums[right] | 操作 |
|------|------|-------|-----|-----------|-------------|------|
| 1    | 0    | 6     | 3   | 7         | 2           | 7>2, left=4 |
| 2    | 4    | 6     | 5   | 1         | 2           | 1<2, right=5 |
| 3    | 4    | 5     | 4   | 0         | 1           | 0<1, right=4 |
| 结束 | left == right == 4，nums[4] = 0 |

### 为什么用 left < right 而不是 left <= right？
- 我们要找的是一个位置，不是判断存在性
- left == right 时就找到了，不需要再循环

### 为什么 right = mid 而不是 mid - 1？
- nums[mid] <= nums[right] 时，mid 可能就是最小值
- 不能排除 mid，所以 right = mid`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找（与左端比较）",
        code: `/**
 * 寻找旋转排序数组中的最小值 - 与左端比较
 *
 * 核心思想：
 * 比较 nums[mid] 和 nums[0]（数组第一个元素）
 * - nums[mid] >= nums[0]：mid 在左半部分，最小值在右边
 * - nums[mid] < nums[0]：mid 在右半部分，最小值在左边或就是 mid
 *
 * 注意：需要先处理数组未旋转的特殊情况
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function findMin(nums) {
  const n = nums.length;

  // 特殊情况：数组未旋转（或旋转了 n 次，等于没旋转）
  // 此时第一个元素就是最小值
  if (nums[0] <= nums[n - 1]) {
    return nums[0];
  }

  let left = 0;
  let right = n - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] >= nums[0]) {
      // mid 在左半部分（与第一个元素同一区域）
      // 最小值在 mid 右边
      left = mid + 1;
    } else {
      // mid 在右半部分
      // 最小值可能是 mid 或在 mid 左边
      right = mid;
    }
  }

  return nums[left];
}`,
        explanation: `## 二分查找（与左端比较）

### 核心思想
以 nums[0] 为基准判断 mid 的位置

### 执行示例
nums = [3,4,5,1,2]

特殊情况检查：nums[0]=3 > nums[4]=2，数组已旋转

| 步骤 | left | right | mid | nums[mid] | nums[0] | 操作 |
|------|------|-------|-----|-----------|---------|------|
| 1    | 0    | 4     | 2   | 5         | 3       | 5>=3, left=3 |
| 2    | 3    | 4     | 3   | 1         | 3       | 1<3, right=3 |
| 结束 | left == right == 3，nums[3] = 1 |

### 为什么需要特殊处理未旋转的情况？
- 未旋转时 nums[mid] >= nums[0] 对所有 mid 都成立
- 会导致 left 一直右移，最终返回最后一个元素（错误）

### 边界情况
- 数组未旋转：第一个元素就是最小值
- 数组只有一个元素：直接返回该元素`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "与左端比较解法演示",
          steps: [
            {
              array: [3, 4, 5, 1, 2],
              left: 0,
              right: 4,
              highlights: [{ indices: [0], color: "purple" as const, label: "nums[0]=3" }],
              description: "nums[0]=3 > nums[4]=2，数组已旋转。以nums[0]为基准",
            },
            {
              array: [3, 4, 5, 1, 2],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0], color: "purple" as const, label: "基准=3" },
                { indices: [2], color: "yellow" as const, label: "mid=2" },
              ],
              description: "mid=2，nums[2]=5 >= nums[0]=3，mid在左半，最小值在右边",
            },
            {
              array: [3, 4, 5, 1, 2],
              left: 3,
              right: 4,
              highlights: [
                { indices: [0], color: "purple" as const, label: "基准=3" },
                { indices: [3], color: "yellow" as const, label: "mid=3" },
              ],
              description: "left=3。mid=3，nums[3]=1 < nums[0]=3，mid在右半",
            },
            {
              array: [3, 4, 5, 1, 2],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "最小值=1" }],
              description: "left=right=3。找到最小值 nums[3]=1！",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "寻找断点",
        code: `/**
 * 寻找旋转排序数组中的最小值 - 寻找断点
 *
 * 核心思想：
 * 最小值是数组中唯一一个比前一个元素小的元素
 * 换句话说，最小值的前一个元素是"断点"
 *
 * 断点特征：
 * - nums[i] > nums[i+1]，则 nums[i+1] 是最小值
 * - 或者 nums[i-1] > nums[i]，则 nums[i] 是最小值
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function findMin(nums) {
  const n = nums.length;

  // 特殊情况：单元素或数组未旋转
  if (n === 1 || nums[0] < nums[n - 1]) {
    return nums[0];
  }

  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 检查 mid 是否是断点的右边（最小值）
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];  // mid+1 是最小值
    }
    // 检查 mid 是否就是最小值
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];  // mid 就是最小值
    }

    // 根据 mid 与 nums[0] 的关系决定搜索方向
    if (nums[mid] > nums[0]) {
      // mid 在左半部分，断点在右边
      left = mid + 1;
    } else {
      // mid 在右半部分，断点在左边
      right = mid - 1;
    }
  }

  // 理论上不会到这里，但为了安全返回第一个元素
  return nums[0];
}`,
        explanation: `## 寻找断点

### 核心思想
直接寻找"断点"——数组中唯一下降的位置

### 图示
\`\`\`
原数组: [0,1,2,4,5,6,7]
旋转后: [4,5,6,7,0,1,2]
              ↑ 断点
            7 > 0，这里是断点
\`\`\`

### 执行示例
nums = [4,5,6,7,0,1,2]

| 步骤 | mid | nums[mid] | 检查断点 | 操作 |
|------|-----|-----------|----------|------|
| 1    | 3   | 7         | 7>0? 是! | 返回 nums[4]=0 |

### 断点检测条件
1. \`nums[mid] > nums[mid+1]\`：mid 是断点左边，mid+1 是最小值
2. \`nums[mid] < nums[mid-1]\`：mid 就是最小值

### 特点
- 直接找到断点就返回，可能比其他方法更快
- 需要处理边界索引越界的问题`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "寻找断点解法演示",
          steps: [
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [3, 4], color: "red" as const, label: "断点?" }],
              description: "旋转数组有一个断点：前一个>后一个。找到断点右边就是最小值",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 0,
              right: 6,
              highlights: [{ indices: [3], color: "yellow" as const, label: "mid=3" }],
              description: "mid=3。检查：nums[3]=7 > nums[4]=0？是！找到断点",
            },
            {
              array: [4, 5, 6, 7, 0, 1, 2],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "最小值=0" }],
              description: "断点右边 nums[4]=0 就是最小值！一次就找到",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 3. 搜索二维矩阵 (74)
  {
    id: "search-a-2d-matrix",
    leetcodeId: 74,
    title: "搜索二维矩阵",
    titleEn: "Search a 2D Matrix",
    difficulty: "medium",
    category: "binary-search",
    tags: ["数组", "二分查找", "矩阵"],
    frontendRelevance: "low",
    frontendNote: "搜索二维矩阵",
    description: `给你一个满足下述两条属性的 \`m x n\` 整数矩阵：

- 每行中的整数从左到右按非严格递增顺序排列。
- 每行的第一个整数大于前一行的最后一个整数。

给你一个整数 \`target\`，如果 \`target\` 在矩阵中，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
\`\`\``,
    constraints: `- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 100\`
- \`-10^4 <= matrix[i][j], target <= 10^4\``,
    initialCode: `function searchMatrix(matrix, target) {
  // 在此处编写你的代码

}`,
    solution: `function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const value = matrix[row][col];

    if (value === target) {
      return true;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}`,
    testCases: [
      {
        id: "1",
        name: "找到目标",
        input: [[[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 3],
        expected: true
      },
      {
        id: "2",
        name: "目标不存在",
        input: [[[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 13],
        expected: false
      }
    ],
    hints: [
      "将二维矩阵视为一维有序数组",
      "使用 mid / n 和 mid % n 转换坐标",
      "标准二分查找"
    ],
    explanation: `## 解题思路

### 二分查找

1. 将二维矩阵视为一维有序数组
2. 使用二分查找，索引范围是 [0, m*n-1]
3. 将一维索引 mid 转换为二维坐标：row = mid / n, col = mid % n
4. 标准二分查找流程

### 复杂度分析
- 时间复杂度：O(log(m × n))
- 空间复杂度：O(1)`,
    timeComplexity: "O(log(m × n))",
    spaceComplexity: "O(1)",
    relatedProblems: ["search-in-rotated-sorted-array", "find-first-and-last-position"],
    solutions: [
      {
        name: "一维二分查找（推荐）",
        code: `/**
 * 搜索二维矩阵 - 一维二分查找
 *
 * 核心思想：
 * 由于矩阵有特殊性质（每行递增，且下一行首元素 > 上一行尾元素）
 * 所以整个矩阵展开后是一个有序数组
 * 可以将二维矩阵看作一维有序数组进行二分查找
 *
 * 索引映射：
 * - 一维索引 mid → 二维坐标 (mid / n, mid % n)
 * - 其中 n 是列数
 *
 * 时间复杂度：O(log(m × n))，等价于 O(log m + log n)
 * 空间复杂度：O(1)
 */
function searchMatrix(matrix, target) {
  const m = matrix.length;      // 行数
  const n = matrix[0].length;   // 列数

  // 将矩阵看作长度为 m*n 的一维数组
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 关键：将一维索引转换为二维坐标
    const row = Math.floor(mid / n);  // 行号 = 索引 / 列数
    const col = mid % n;               // 列号 = 索引 % 列数
    const value = matrix[row][col];

    if (value === target) {
      return true;   // 找到目标
    } else if (value < target) {
      left = mid + 1;   // 目标在右半部分
    } else {
      right = mid - 1;  // 目标在左半部分
    }
  }

  return false;  // 未找到
}`,
        explanation: `## 一维二分查找

### 核心思想
把二维矩阵"拉平"成一维有序数组

### 索引转换示例
矩阵 3×4，总共 12 个元素：
\`\`\`
      col: 0   1   2   3
row 0:    [1,  3,  5,  7]     索引 0-3
row 1:    [10, 11, 16, 20]    索引 4-7
row 2:    [23, 30, 34, 60]    索引 8-11
\`\`\`

mid = 5 → row = 5/4 = 1, col = 5%4 = 1 → matrix[1][1] = 11

### 执行示例
matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3

| 步骤 | left | right | mid | (row,col) | value | 操作 |
|------|------|-------|-----|-----------|-------|------|
| 1    | 0    | 11    | 5   | (1,1)     | 11    | 11>3, right=4 |
| 2    | 0    | 4     | 2   | (0,2)     | 5     | 5>3, right=1 |
| 3    | 0    | 1     | 0   | (0,0)     | 1     | 1<3, left=1 |
| 4    | 1    | 1     | 1   | (0,1)     | 3     | 找到！|

### 为什么这种方法有效？
矩阵的特殊性质保证了按行展开后是完全有序的`,
        animation: {
          type: "two-pointers" as const,
          title: "搜索二维矩阵演示",
          steps: [
            {
              array: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60],
              left: 0,
              right: 11,
              highlights: [],
              description: "matrix展开为一维数组，target=3。left=0, right=11",
            },
            {
              array: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60],
              left: 0,
              right: 11,
              highlights: [{ indices: [5], color: "yellow" as const, label: "mid=5" }],
              description: "mid=5, value=11。11>3，往左找，right=4",
            },
            {
              array: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60],
              left: 0,
              right: 4,
              highlights: [{ indices: [2], color: "yellow" as const, label: "mid=2" }],
              description: "mid=2, value=5。5>3，往左找，right=1",
            },
            {
              array: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "yellow" as const, label: "mid=0" }],
              description: "mid=0, value=1。1<3，往右找，left=1",
            },
            {
              array: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "找到3" }],
              description: "mid=1, value=3=target ✓ 找到目标！返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(log(m × n))",
        spaceComplexity: "O(1)",
      },
      {
        name: "两次二分查找",
        code: `/**
 * 搜索二维矩阵 - 两次二分查找
 *
 * 核心思想：
 * 分两步进行：
 * 1. 先二分查找确定 target 可能在哪一行
 * 2. 再在该行内进行二分查找
 *
 * 判断 target 在哪一行：
 * - 如果 行首 <= target <= 行尾，则在该行
 * - 如果 行首 > target，则在上面的行
 * - 如果 行尾 < target，则在下面的行
 *
 * 时间复杂度：O(log m + log n)
 * 空间复杂度：O(1)
 */
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 第一次二分：找到 target 可能在的行
  let top = 0, bottom = m - 1;

  while (top <= bottom) {
    const mid = Math.floor((top + bottom) / 2);

    // 检查 target 是否在第 mid 行的范围内
    if (matrix[mid][0] <= target && target <= matrix[mid][n - 1]) {
      // 找到了 target 可能在的行，进行第二次二分
      let left = 0, right = n - 1;
      while (left <= right) {
        const col = Math.floor((left + right) / 2);
        if (matrix[mid][col] === target) {
          return true;  // 找到目标
        }
        if (matrix[mid][col] < target) {
          left = col + 1;
        } else {
          right = col - 1;
        }
      }
      return false;  // 在该行没找到
    } else if (matrix[mid][0] > target) {
      // 行首 > target，target 在上面的行
      bottom = mid - 1;
    } else {
      // 行尾 < target，target 在下面的行
      top = mid + 1;
    }
  }

  return false;  // 没有合适的行
}`,
        explanation: `## 两次二分查找

### 核心思想
分层查找：先定位行，再定位列

### 执行示例
matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 11

**第一次二分（找行）：**
| 步骤 | top | bottom | mid | 行范围 | 操作 |
|------|-----|--------|-----|--------|------|
| 1    | 0   | 2      | 1   | [10,20]| 11在范围内！|

**第二次二分（在第1行找）：**
| 步骤 | left | right | col | value | 操作 |
|------|------|-------|-----|-------|------|
| 1    | 0    | 3     | 1   | 11    | 找到！|

### 与一维二分的对比
\`\`\`
一维二分：O(log(m×n)) = O(log m + log n)
两次二分：O(log m) + O(log n) = O(log m + log n)
复杂度相同，但两次二分更直观
\`\`\`

### 适用场景
- 当需要返回行号和列号时更方便
- 逻辑更清晰，分层处理`,
        timeComplexity: "O(log m + log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "两次二分查找演示",
          steps: [
            {
              array: ["[1,3,5,7]", "[10,11,16,20]", "[23,30,34,60]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [1], color: "yellow" as const, label: "mid行" }],
              description: "target=11。第一次二分找行：mid=1，[10,20]，11在范围内！",
            },
            {
              array: [10, 11, 16, 20],
              left: 0,
              right: 3,
              highlights: [{ indices: [1], color: "yellow" as const, label: "mid=1" }],
              description: "第二次二分在第1行：mid=1，value=11=target ✓",
            },
            {
              array: [10, 11, 16, 20],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "找到" }],
              description: "找到目标！两次二分：先定位行，再定位列",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "从右上角开始",
        code: `/**
 * 搜索二维矩阵 - 从右上角搜索
 *
 * 核心思想：
 * 从右上角开始，利用矩阵的有序性：
 * - 当前元素比 target 大：向左走（排除当前列）
 * - 当前元素比 target 小：向下走（排除当前行）
 *
 * 为什么从右上角？
 * - 右上角元素是该行最大、该列最小的元素
 * - 可以根据比较结果明确排除一行或一列
 * - 左下角也有同样的性质
 *
 * 时间复杂度：O(m + n)，最多走 m+n 步
 * 空间复杂度：O(1)
 */
function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 从右上角开始
  let row = 0;       // 从第一行开始
  let col = n - 1;   // 从最后一列开始

  // 在矩阵范围内搜索
  while (row < m && col >= 0) {
    const current = matrix[row][col];

    if (current === target) {
      return true;    // 找到目标
    } else if (current > target) {
      col--;          // 当前值太大，向左移动
    } else {
      row++;          // 当前值太小，向下移动
    }
  }

  return false;  // 越界了还没找到
}`,
        explanation: `## 从右上角搜索

### 核心思想
利用右上角元素的特殊位置：
- 是该行的最大值
- 是该列的最小值

### 图示
\`\`\`
矩阵：          target = 11
[1,  3,  5,  7]  ← 从这里开始
[10, 11, 16, 20]
[23, 30, 34, 60]

步骤1: matrix[0][3]=7 < 11, 向下 ↓
步骤2: matrix[1][3]=20 > 11, 向左 ←
步骤3: matrix[1][2]=16 > 11, 向左 ←
步骤4: matrix[1][1]=11 = 11, 找到！
\`\`\`

### 执行示例
| 步骤 | row | col | value | 操作 |
|------|-----|-----|-------|------|
| 1    | 0   | 3   | 7     | 7<11, row++ |
| 2    | 1   | 3   | 20    | 20>11, col-- |
| 3    | 1   | 2   | 16    | 16>11, col-- |
| 4    | 1   | 1   | 11    | 找到！|

### 为什么有效？
- 向左移动：排除当前列（都比 target 大）
- 向下移动：排除当前行（都比 target 小）
- 每次至少排除一行或一列

### 复杂度
- 最坏情况：从右上角走到左下角，步数 = m + n - 1
- 不如二分查找最优，但代码简洁`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "从右上角搜索演示",
          steps: [
            {
              array: ["1,3,5,7→", "10,11,16,20", "23,30,34,60"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "yellow" as const, label: "(0,3)=7" }],
              description: "target=11。从右上角(0,3)开始，值=7 < 11，向下↓",
            },
            {
              array: ["1,3,5,7", "10,11,16,20→", "23,30,34,60"],
              left: 1,
              right: 2,
              highlights: [{ indices: [1], color: "yellow" as const, label: "(1,3)=20" }],
              description: "到(1,3)，值=20 > 11，向左←",
            },
            {
              array: ["1,3,5,7", "10,11,16←,20", "23,30,34,60"],
              left: 1,
              right: 2,
              highlights: [{ indices: [1], color: "yellow" as const, label: "(1,2)=16" }],
              description: "到(1,2)，值=16 > 11，向左←",
            },
            {
              array: ["1,3,5,7", "10,11←,16,20", "23,30,34,60"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "(1,1)=11" }],
              description: "到(1,1)，值=11=target ✓ 找到！O(m+n)走法",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 4. 在排序数组中查找元素的第一个和最后一个位置 (34)
  {
    id: "find-first-and-last-position",
    leetcodeId: 34,
    title: "在排序数组中查找元素的第一个和最后一个位置",
    titleEn: "Find First and Last Position of Element in Sorted Array",
    difficulty: "medium",
    category: "binary-search",
    tags: ["数组", "二分查找"],
    frontendRelevance: "medium",
    frontendNote: "二分边界",
    description: `给你一个按照非递减顺序排列的整数数组 \`nums\`，和一个目标值 \`target\`。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 \`target\`，返回 \`[-1, -1]\`。

你必须设计并实现时间复杂度为 \`O(log n)\` 的算法解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [], target = 0
输出：[-1,-1]
\`\`\``,
    constraints: `- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`nums\` 是一个非递减数组
- \`-10^9 <= target <= 10^9\``,
    initialCode: `function searchRange(nums, target) {
  // 在此处编写你的代码

}`,
    solution: `function searchRange(nums, target) {
  const findFirst = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        right = mid - 1; // 继续向左搜索
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  const findLast = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        left = mid + 1; // 继续向右搜索
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  return [findFirst(), findLast()];
}`,
    testCases: [
      {
        id: "1",
        name: "找到范围",
        input: [[5,7,7,8,8,10], 8],
        expected: [3,4]
      },
      {
        id: "2",
        name: "目标不存在",
        input: [[5,7,7,8,8,10], 6],
        expected: [-1,-1]
      },
      {
        id: "3",
        name: "空数组",
        input: [[], 0],
        expected: [-1,-1]
      }
    ],
    hints: [
      "使用两次二分查找",
      "第一次找最左边的 target",
      "第二次找最右边的 target"
    ],
    explanation: `## 解题思路

### 两次二分查找

1. **找第一个位置**：找到 target 后，继续向左搜索
2. **找最后一个位置**：找到 target 后，继续向右搜索

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["search-a-2d-matrix", "find-peak-element"],
    solutions: [
      {
        name: "两次二分查找（推荐）",
        code: `/**
 * 查找元素的第一个和最后一个位置 - 两次二分查找
 *
 * 核心思想：
 * 分别进行两次二分查找：
 * 1. 第一次：找第一个等于 target 的位置（最左边界）
 * 2. 第二次：找最后一个等于 target 的位置（最右边界）
 *
 * 关键技巧：
 * - 找到 target 后不立即返回，而是记录位置并继续搜索
 * - 找左边界：找到后继续向左搜索（right = mid - 1）
 * - 找右边界：找到后继续向右搜索（left = mid + 1）
 *
 * 时间复杂度：O(log n)，两次二分查找
 * 空间复杂度：O(1)
 */
function searchRange(nums, target) {
  // 辅助函数：查找第一个位置
  const findFirst = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;  // 记录找到的位置

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;       // 记录当前位置
        right = mid - 1;    // 继续向左搜索，寻找更左的位置
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  // 辅助函数：查找最后一个位置
  const findLast = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;  // 记录找到的位置

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        result = mid;       // 记录当前位置
        left = mid + 1;     // 继续向右搜索，寻找更右的位置
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  return [findFirst(), findLast()];
}`,
        explanation: `## 两次二分查找

### 核心思想
普通二分找到就返回，我们需要继续搜索找边界

### 执行示例
nums = [5,7,7,8,8,10], target = 8

**找第一个 8（左边界）：**
| 步骤 | left | right | mid | nums[mid] | result | 操作 |
|------|------|-------|-----|-----------|--------|------|
| 1    | 0    | 5     | 2   | 7         | -1     | 7<8, left=3 |
| 2    | 3    | 5     | 4   | 8         | 4      | 找到，right=3 |
| 3    | 3    | 3     | 3   | 8         | 3      | 找到，right=2 |
| 结束 | left > right，返回 result = 3 |

**找最后一个 8（右边界）：**
| 步骤 | left | right | mid | nums[mid] | result | 操作 |
|------|------|-------|-----|-----------|--------|------|
| 1    | 0    | 5     | 2   | 7         | -1     | 7<8, left=3 |
| 2    | 3    | 5     | 4   | 8         | 4      | 找到，left=5 |
| 3    | 5    | 5     | 5   | 10        | 4      | 10>8, right=4 |
| 结束 | left > right，返回 result = 4 |

### 结果：[3, 4]

### 要点
- 找到目标后继续搜索，直到 left > right
- 用 result 变量保存最新找到的位置`,
        animation: {
          type: "two-pointers" as const,
          title: "查找元素第一个和最后一个位置演示",
          steps: [
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 0,
              right: 5,
              highlights: [],
              description: "nums=[5,7,7,8,8,10], target=8。分两步：找第一个8，找最后一个8",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 0,
              right: 5,
              highlights: [{ indices: [2], color: "yellow" as const, label: "mid=2" }],
              description: "【找第一个8】mid=2, nums[2]=7<8，往右找，left=3",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 5,
              highlights: [{ indices: [4], color: "green" as const, label: "mid=4" }],
              description: "mid=4, nums[4]=8=target！记录result=4，继续往左找，right=3",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "mid=3" }],
              description: "mid=3, nums[3]=8=target！记录result=3，继续往左找，right=2",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 2,
              highlights: [{ indices: [3], color: "green" as const, label: "first=3" }],
              description: "left>right，第一个8在索引3。现在找最后一个8",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 5,
              highlights: [{ indices: [4], color: "green" as const, label: "mid=4" }],
              description: "【找最后一个8】mid=4, nums[4]=8！记录result=4，继续往右找，left=5",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 5,
              right: 5,
              highlights: [{ indices: [5], color: "yellow" as const, label: "mid=5" }],
              description: "mid=5, nums[5]=10>8，往左找，right=4",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 5,
              right: 4,
              highlights: [
                { indices: [3], color: "green" as const, label: "first" },
                { indices: [4], color: "green" as const, label: "last" },
              ],
              description: "left>right，最后一个8在索引4。结果：[3,4] ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "通用边界查找",
        code: `/**
 * 查找元素的第一个和最后一个位置 - Lower Bound 方法
 *
 * 核心思想：
 * 使用统一的 lowerBound 函数（找第一个 >= target 的位置）
 * - first = lowerBound(target)：第一个 >= target 的位置
 * - last = lowerBound(target + 1) - 1：第一个 > target 的位置减一
 *
 * lowerBound 定义：
 * 返回第一个大于等于 target 的元素位置
 * 如果不存在，返回数组长度 n
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function searchRange(nums, target) {
  /**
   * 查找第一个 >= target 的位置（lower_bound）
   * 使用左闭右开区间 [left, right)
   */
  const lowerBound = (target) => {
    let left = 0, right = nums.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] < target) {
        // mid 太小，不符合条件，排除
        left = mid + 1;
      } else {
        // nums[mid] >= target，可能是答案，保留
        right = mid;
      }
    }

    return left;  // left == right，就是答案
  };

  // 找第一个位置
  const first = lowerBound(target);

  // 检查 target 是否存在
  if (first === nums.length || nums[first] !== target) {
    return [-1, -1];  // target 不存在
  }

  // 找最后一个位置 = 第一个 > target 的位置 - 1
  const last = lowerBound(target + 1) - 1;

  return [first, last];
}`,
        explanation: `## Lower Bound 方法

### 核心思想
利用 lowerBound（下界）函数的性质

### Lower Bound 定义
\`\`\`
lowerBound(x) = 第一个 >= x 的位置
             = 第一个不小于 x 的位置
\`\`\`

### 推导
- first = lowerBound(8) → 第一个 >= 8 的位置
- last = lowerBound(9) - 1 → 第一个 >= 9 的位置再减一
                           = 最后一个 < 9 的位置
                           = 最后一个 8 的位置（如果存在）

### 执行示例
nums = [5,7,7,8,8,10], target = 8

**lowerBound(8):**
| left | right | mid | nums[mid] | 操作 |
|------|-------|-----|-----------|------|
| 0    | 6     | 3   | 8         | 8>=8, right=3 |
| 0    | 3     | 1   | 7         | 7<8, left=2 |
| 2    | 3     | 2   | 7         | 7<8, left=3 |
结果：first = 3

**lowerBound(9):**
| left | right | mid | nums[mid] | 操作 |
|------|-------|-----|-----------|------|
| 0    | 6     | 3   | 8         | 8<9, left=4 |
| 4    | 6     | 5   | 10        | 10>=9, right=5 |
| 4    | 5     | 4   | 8         | 8<9, left=5 |
结果：5，last = 5 - 1 = 4

### 优点
- 复用同一个查找函数
- 标准库常用的边界查找模式`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "Lower Bound方法演示",
          steps: [
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 0,
              right: 6,
              highlights: [],
              description: "target=8。lowerBound(8)=第一个>=8的位置",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "yellow" as const, label: "mid=3" }],
              description: "mid=3，nums[3]=8>=8，right=3，继续缩小",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "first=3" }],
              description: "left=right=3，lowerBound(8)=3。现在求lowerBound(9)",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 4,
              right: 5,
              highlights: [{ indices: [5], color: "yellow" as const, label: "mid=5" }],
              description: "lowerBound(9)：mid=5，nums[5]=10>=9，right=5",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 5,
              right: 5,
              highlights: [{ indices: [4], color: "green" as const, label: "last=4" }],
              description: "lowerBound(9)=5，last=5-1=4。结果[3,4] ✓",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "递归二分",
        code: `/**
 * 查找元素的第一个和最后一个位置 - 递归实现
 *
 * 核心思想：
 * 使用递归实现二分查找，通过参数控制查找方向
 * - findFirst = true：找到 target 后继续向左递归
 * - findFirst = false：找到 target 后继续向右递归
 *
 * 边界判断：
 * - 找第一个：当前位置是0，或者前一个不是 target
 * - 找最后一个：当前位置是末尾，或者后一个不是 target
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(log n)，递归栈空间
 */
function searchRange(nums, target) {
  /**
   * 递归二分查找
   * @param left 左边界
   * @param right 右边界
   * @param findFirst true-找第一个，false-找最后一个
   */
  const binarySearch = (left, right, findFirst) => {
    // 基准条件：搜索范围为空
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      if (findFirst) {
        // 找第一个：检查是否已经是最左边的 target
        if (mid === 0 || nums[mid - 1] !== target) {
          return mid;  // 是第一个，返回
        }
        // 不是第一个，继续向左找
        return binarySearch(left, mid - 1, findFirst);
      } else {
        // 找最后一个：检查是否已经是最右边的 target
        if (mid === nums.length - 1 || nums[mid + 1] !== target) {
          return mid;  // 是最后一个，返回
        }
        // 不是最后一个，继续向右找
        return binarySearch(mid + 1, right, findFirst);
      }
    } else if (nums[mid] < target) {
      // 在右半部分继续搜索
      return binarySearch(mid + 1, right, findFirst);
    } else {
      // 在左半部分继续搜索
      return binarySearch(left, mid - 1, findFirst);
    }
  };

  return [
    binarySearch(0, nums.length - 1, true),   // 找第一个
    binarySearch(0, nums.length - 1, false)   // 找最后一个
  ];
}`,
        explanation: `## 递归二分

### 核心思想
递归实现，找到 target 后检查是否是边界

### 边界检测逻辑
找第一个（左边界）：
- mid == 0：已经是数组第一个元素
- nums[mid-1] != target：前一个元素不是 target

找最后一个（右边界）：
- mid == n-1：已经是数组最后一个元素
- nums[mid+1] != target：后一个元素不是 target

### 执行流程示例
nums = [5,7,7,8,8,10], target = 8, findFirst = true

\`\`\`
binarySearch(0, 5, true)
  mid = 2, nums[2] = 7 < 8
  → binarySearch(3, 5, true)
      mid = 4, nums[4] = 8 = target
      nums[3] = 8 = target，不是第一个
      → binarySearch(3, 3, true)
          mid = 3, nums[3] = 8 = target
          nums[2] = 7 ≠ target，是第一个！
          返回 3
\`\`\`

### 特点
- 递归实现，代码结构对称
- 找到目标后立即检查边界
- 空间复杂度 O(log n) 由于递归栈`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
        animation: {
          type: "two-pointers" as const,
          title: "递归二分查找演示",
          steps: [
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 0,
              right: 5,
              highlights: [],
              description: "target=8。递归查找：findFirst=true找第一个8",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 0,
              right: 5,
              highlights: [{ indices: [2], color: "yellow" as const, label: "mid=2" }],
              description: "binarySearch(0,5,true)：mid=2，7<8，递归右边",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 5,
              highlights: [{ indices: [4], color: "yellow" as const, label: "mid=4" }],
              description: "binarySearch(3,5,true)：mid=4，8=target，但nums[3]=8，继续左边",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "first=3" }],
              description: "binarySearch(3,3,true)：mid=3，8=target，nums[2]=7≠8，是第一个！",
            },
            {
              array: [5, 7, 7, 8, 8, 10],
              left: 3,
              right: 4,
              highlights: [
                { indices: [3], color: "green" as const, label: "first" },
                { indices: [4], color: "green" as const, label: "last" },
              ],
              description: "类似地找last=4。结果[3,4] ✓ 递归栈深度O(logn)",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 5. 寻找峰值 (162)
  {
    id: "find-peak-element",
    leetcodeId: 162,
    title: "寻找峰值",
    titleEn: "Find Peak Element",
    difficulty: "medium",
    category: "binary-search",
    tags: ["数组", "二分查找"],
    frontendRelevance: "medium",
    frontendNote: "寻找峰值",
    description: `峰值元素是指其值严格大于左右相邻值的元素。

给你一个整数数组 \`nums\`，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 **任何一个峰值** 所在位置即可。

你可以假设 \`nums[-1] = nums[n] = -∞\`。

你必须实现时间复杂度为 \`O(log n)\` 的算法来解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5
解释：你的函数可以返回索引 1，其峰值元素为 2；或者返回索引 5，其峰值元素为 6。
\`\`\``,
    constraints: `- \`1 <= nums.length <= 1000\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- 对于所有有效的 \`i\` 都有 \`nums[i] != nums[i + 1]\``,
    initialCode: `function findPeakElement(nums) {
  // 在此处编写你的代码

}`,
    solution: `function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // 峰值在左边（包含 mid）
      right = mid;
    } else {
      // 峰值在右边
      left = mid + 1;
    }
  }

  return left;
}`,
    testCases: [
      {
        id: "1",
        name: "单峰",
        input: [[[1,2,3,1]]],
        expected: 2
      },
      {
        id: "2",
        name: "多峰",
        input: [[[1,2,1,3,5,6,4]]],
        expected: 5
      }
    ],
    hints: [
      "二分查找，比较 mid 和 mid+1",
      "如果 nums[mid] > nums[mid+1]，峰值在左边",
      "否则峰值在右边"
    ],
    explanation: `## 解题思路

### 二分查找

1. 比较 nums[mid] 和 nums[mid+1]
2. 如果 nums[mid] > nums[mid+1]，说明我们在下坡，峰值在左边
3. 否则我们在上坡，峰值在右边
4. 最终 left == right 时找到峰值

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["find-first-and-last-position", "koko-eating-bananas"],
    solutions: [
      {
        name: "二分查找（推荐）",
        code: `/**
 * 寻找峰值 - 二分查找
 *
 * 核心思想：
 * 峰值一定存在（因为边界是负无穷）
 * 通过比较 mid 和 mid+1 判断走向：
 * - nums[mid] > nums[mid+1]：下坡，峰值在左边（包含 mid）
 * - nums[mid] < nums[mid+1]：上坡，峰值在右边
 *
 * 为什么一定能找到？
 * - 假设一直上坡，最终会到达右边界
 * - 右边界的"外面"是负无穷，所以右边界就是峰值
 * - 同理左边界
 *
 * 时间复杂度：O(log n)，每次排除一半
 * 空间复杂度：O(1)
 */
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  // left < right 保证至少有两个元素比较
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // 当前在"下坡"，峰值在左边（包含当前位置）
      // mid 可能就是峰值，不能排除
      right = mid;
    } else {
      // 当前在"上坡"，峰值一定在右边
      // mid 不是峰值，可以排除
      left = mid + 1;
    }
  }

  // left == right，找到峰值
  return left;
}`,
        explanation: `## 二分查找

### 核心思想
沿着"上坡"方向走，一定能找到峰值

### 图示
\`\`\`
数组：[1, 2, 3, 1]
      /\\
     /  \\
    /    \\
   1  2  3  1
         ↑ 峰值（索引2）

如果 nums[mid] < nums[mid+1]，说明在上坡，继续往右走
如果 nums[mid] > nums[mid+1]，说明在下坡，峰值在左边
\`\`\`

### 执行示例
nums = [1,2,3,1]

| 步骤 | left | right | mid | nums[mid] | nums[mid+1] | 操作 |
|------|------|-------|-----|-----------|-------------|------|
| 1    | 0    | 3     | 1   | 2         | 3           | 上坡, left=2 |
| 2    | 2    | 3     | 2   | 3         | 1           | 下坡, right=2 |
| 结束 | left == right == 2 |

### 为什么这样能找到峰值？
- 边界条件：nums[-1] = nums[n] = -∞
- 如果一直上坡走到末尾，末尾就是峰值
- 如果一直下坡走到开头，开头就是峰值
- 二分查找保证我们一定会收敛到某个峰值`,
        animation: {
          type: "two-pointers" as const,
          title: "寻找峰值演示",
          steps: [
            {
              array: [1, 2, 3, 1],
              left: 0,
              right: 3,
              highlights: [],
              description: "nums=[1,2,3,1]。边界外是-∞，一定存在峰值",
            },
            {
              array: [1, 2, 3, 1],
              left: 0,
              right: 3,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "mid=1" },
                { indices: [2], color: "blue" as const, label: "mid+1" },
              ],
              description: "mid=1, nums[1]=2 < nums[2]=3，上坡！峰值在右边，left=2",
            },
            {
              array: [1, 2, 3, 1],
              left: 2,
              right: 3,
              highlights: [
                { indices: [2], color: "yellow" as const, label: "mid=2" },
                { indices: [3], color: "blue" as const, label: "mid+1" },
              ],
              description: "mid=2, nums[2]=3 > nums[3]=1，下坡！峰值在左边（含mid），right=2",
            },
            {
              array: [1, 2, 3, 1],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "峰值=3" }],
              description: "left==right==2，找到峰值！nums[2]=3 ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "线性扫描",
        code: `/**
 * 寻找峰值 - 线性扫描
 *
 * 核心思想：
 * 从左到右扫描，找到第一个"下坡"的起点
 * 即第一个 nums[i] > nums[i+1] 的位置
 *
 * 为什么有效？
 * - 如果一直上坡，最后一个元素就是峰值
 * - 如果遇到下坡，当前元素就是峰值
 *
 * 时间复杂度：O(n)，最坏情况遍历整个数组
 * 空间复杂度：O(1)
 */
function findPeakElement(nums) {
  // 遍历数组，找第一个下坡的位置
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      // 找到下坡，当前位置就是峰值
      return i;
    }
  }

  // 一直上坡，最后一个元素是峰值
  return nums.length - 1;
}`,
        explanation: `## 线性扫描

### 核心思想
找到第一个"比后面大"的元素

### 执行示例
nums = [1,2,1,3,5,6,4]

| i | nums[i] | nums[i+1] | 比较 | 结果 |
|---|---------|-----------|------|------|
| 0 | 1       | 2         | 1<2  | 继续 |
| 1 | 2       | 1         | 2>1  | 返回 1 |

### 特殊情况
\`\`\`
单调递增：[1,2,3,4,5]
遍历完都没有下坡，返回最后一个索引 4

单调递减：[5,4,3,2,1]
i=0 时 5>4，返回 0
\`\`\`

### 复杂度
- 时间复杂度 O(n)，不满足题目 O(log n) 的要求
- 但代码简单，容易理解`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "线性扫描演示",
          steps: [
            {
              array: [1, 2, 1, 3, 5, 6, 4],
              left: 0,
              right: 6,
              highlights: [{ indices: [0], color: "yellow" as const, label: "i=0" }],
              description: "从左到右找第一个下坡。i=0，1<2，上坡，继续",
            },
            {
              array: [1, 2, 1, 3, 5, 6, 4],
              left: 0,
              right: 6,
              highlights: [{ indices: [1], color: "green" as const, label: "i=1" }],
              description: "i=1，2>1，下坡！找到峰值，返回索引1",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "递归二分",
        code: `/**
 * 寻找峰值 - 递归二分
 *
 * 核心思想：
 * 递归实现二分查找
 * 根据坡度方向决定递归方向：
 * - 上坡：递归右半部分
 * - 下坡：递归左半部分
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(log n)，递归栈空间
 */
function findPeakElement(nums) {
  /**
   * 递归搜索峰值
   * @param left 左边界
   * @param right 右边界
   */
  const search = (left, right) => {
    // 基准条件：只剩一个元素
    if (left === right) return left;

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // 下坡，峰值在左边（包含 mid）
      return search(left, mid);
    } else {
      // 上坡，峰值在右边
      return search(mid + 1, right);
    }
  };

  return search(0, nums.length - 1);
}`,
        explanation: `## 递归二分

### 核心思想
递归版本的二分查找，逻辑与迭代版本相同

### 递归树示例
nums = [1,2,3,1]

\`\`\`
search(0, 3)
  mid = 1, nums[1]=2 < nums[2]=3, 上坡
  → search(2, 3)
      mid = 2, nums[2]=3 > nums[3]=1, 下坡
      → search(2, 2)
          left == right, 返回 2
\`\`\`

### 递归深度
- 每次递归区间减半
- 最多递归 O(log n) 层

### 与迭代版本对比
| 方面 | 迭代 | 递归 |
|------|------|------|
| 时间复杂度 | O(log n) | O(log n) |
| 空间复杂度 | O(1) | O(log n) |
| 代码简洁性 | 中等 | 更简洁 |
| 性能 | 略好 | 有栈开销 |`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
        animation: {
          type: "two-pointers" as const,
          title: "递归二分寻找峰值演示",
          steps: [
            {
              array: [1, 2, 3, 1],
              left: 0,
              right: 3,
              highlights: [{ indices: [1], color: "yellow" as const, label: "mid=1" }],
              description: "search(0,3)：mid=1，nums[1]=2<nums[2]=3，上坡，递归右边",
            },
            {
              array: [1, 2, 3, 1],
              left: 2,
              right: 3,
              highlights: [{ indices: [2], color: "yellow" as const, label: "mid=2" }],
              description: "search(2,3)：mid=2，nums[2]=3>nums[3]=1，下坡，递归左边",
            },
            {
              array: [1, 2, 3, 1],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "峰值" }],
              description: "search(2,2)：left==right，返回2。nums[2]=3是峰值！",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 6. 爱吃香蕉的珂珂 (875)
  {
    id: "koko-eating-bananas",
    leetcodeId: 875,
    title: "爱吃香蕉的珂珂",
    titleEn: "Koko Eating Bananas",
    difficulty: "medium",
    category: "binary-search",
    tags: ["数组", "二分查找"],
    frontendRelevance: "low",
    frontendNote: "吃香蕉，二分",
    description: `珂珂喜欢吃香蕉。这里有 \`n\` 堆香蕉，第 \`i\` 堆中有 \`piles[i]\` 根香蕉。警卫已经离开了，将在 \`h\` 小时后回来。

珂珂可以决定她吃香蕉的速度 \`k\`（单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 \`k\` 根。如果这堆香蕉少于 \`k\` 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 \`h\` 小时内吃掉所有香蕉的最小速度 \`k\`（\`k\` 为整数）。`,
    examples: `**示例 1：**
\`\`\`
输入：piles = [3,6,7,11], h = 8
输出：4
\`\`\`

**示例 2：**
\`\`\`
输入：piles = [30,11,23,4,20], h = 5
输出：30
\`\`\`

**示例 3：**
\`\`\`
输入：piles = [30,11,23,4,20], h = 6
输出：23
\`\`\``,
    constraints: `- \`1 <= piles.length <= 10^4\`
- \`piles.length <= h <= 10^9\`
- \`1 <= piles[i] <= 10^9\``,
    initialCode: `function minEatingSpeed(piles, h) {
  // 在此处编写你的代码

}`,
    solution: `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  const canFinish = (speed) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canFinish(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,6,7,11], 8],
        expected: 4
      },
      {
        id: "2",
        name: "示例2",
        input: [[30,11,23,4,20], 5],
        expected: 30
      },
      {
        id: "3",
        name: "示例3",
        input: [[30,11,23,4,20], 6],
        expected: 23
      }
    ],
    hints: [
      "二分查找速度 k",
      "检查以速度 k 能否在 h 小时内吃完",
      "速度范围是 [1, max(piles)]"
    ],
    explanation: `## 解题思路

### 二分查找答案

1. 速度 k 的范围是 [1, max(piles)]
2. 二分查找最小的满足条件的速度
3. 对于每个速度，计算吃完所有香蕉需要的时间
4. 如果时间 <= h，尝试更小的速度；否则需要更大的速度

### 复杂度分析
- 时间复杂度：O(n × log(max(piles)))
- 空间复杂度：O(1)`,
    timeComplexity: "O(n × log(max))",
    spaceComplexity: "O(1)",
    relatedProblems: ["find-peak-element", "median-of-two-sorted-arrays"],
    solutions: [
      {
        name: "二分查找答案（推荐）",
        code: `/**
 * 爱吃香蕉的珂珂 - 二分查找答案
 *
 * 核心思想：
 * "二分答案"模式：二分查找的不是数组元素，而是答案本身
 * - 答案（速度 k）的范围是 [1, max(piles)]
 * - 最小速度是 1（再小就不能吃香蕉了）
 * - 最大速度是 max(piles)（再大也没意义，一小时最多吃一堆）
 *
 * 验证函数：
 * 给定速度 k，计算吃完所有香蕉需要多少小时
 * 如果 hours <= h，说明速度够快，可以尝试更小的速度
 * 如果 hours > h，说明速度太慢，需要更大的速度
 *
 * 时间复杂度：O(n × log(max))，n 是堆数，max 是最大堆
 * 空间复杂度：O(1)
 */
function minEatingSpeed(piles, h) {
  // 速度范围：[1, max(piles)]
  let left = 1;
  let right = Math.max(...piles);

  /**
   * 验证函数：以速度 speed 能否在 h 小时内吃完
   * 每堆需要 ceil(pile / speed) 小时
   */
  const canFinish = (speed) => {
    let hours = 0;
    for (const pile of piles) {
      // Math.ceil(pile / speed) = 向上取整
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };

  // 二分查找最小的满足条件的速度
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canFinish(mid)) {
      // 速度够快，尝试更小的速度
      // mid 可能就是答案，不能排除
      right = mid;
    } else {
      // 速度太慢，需要更大的速度
      left = mid + 1;
    }
  }

  // left == right，就是最小的满足条件的速度
  return left;
}`,
        explanation: `## 二分查找答案

### 核心思想
这是"二分答案"的经典应用：
- 不是在数组中二分查找
- 而是在答案的可能范围内二分查找

### 问题转化
\`\`\`
原问题：找最小速度 k，使得 h 小时内能吃完
转化为：在 [1, max] 范围内找最小的 k，满足 canFinish(k) = true
\`\`\`

### 执行示例
piles = [3,6,7,11], h = 8

速度范围：[1, 11]

| 步骤 | left | right | mid | canFinish(mid) | 操作 |
|------|------|-------|-----|----------------|------|
| 1    | 1    | 11    | 6   | 需要4小时，✓   | right=6 |
| 2    | 1    | 6     | 3   | 需要10小时，✗  | left=4 |
| 3    | 4    | 6     | 5   | 需要7小时，✓   | right=5 |
| 4    | 4    | 5     | 4   | 需要8小时，✓   | right=4 |
| 结束 | left == right == 4 |

canFinish(4) 的计算：
- pile=3: ceil(3/4) = 1 小时
- pile=6: ceil(6/4) = 2 小时
- pile=7: ceil(7/4) = 2 小时
- pile=11: ceil(11/4) = 3 小时
- 总计：8 小时 <= h=8，可以完成

### 为什么用 left < right 而不是 left <= right？
- 我们要找的是一个位置/值，不是判断存在性
- left == right 时就找到了

### 二分答案的适用场景
- 最大化最小值
- 最小化最大值
- 找满足某条件的最小/最大值`,
        animation: {
          type: "two-pointers" as const,
          title: "爱吃香蕉的珂珂演示",
          steps: [
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 11,
              highlights: [],
              description: "piles=[3,6,7,11], h=8小时。二分查找速度k∈[1,11]",
            },
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 11,
              highlights: [{ indices: [3], color: "yellow" as const, label: "max=11" }],
              description: "mid=6。速度6：ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6)=1+1+2+2=6≤8 ✓ right=6",
            },
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 6,
              highlights: [],
              description: "mid=3。速度3：ceil(3/3)+ceil(6/3)+ceil(7/3)+ceil(11/3)=1+2+3+4=10>8 ✗ left=4",
            },
            {
              array: [3, 6, 7, 11],
              left: 4,
              right: 6,
              highlights: [],
              description: "mid=5。速度5：1+2+2+3=8≤8 ✓ right=5",
            },
            {
              array: [3, 6, 7, 11],
              left: 4,
              right: 5,
              highlights: [],
              description: "mid=4。速度4：1+2+2+3=8≤8 ✓ right=4",
            },
            {
              array: [3, 6, 7, 11],
              left: 4,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const }],
              description: "left==right==4。最小速度k=4，刚好8小时吃完 ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × log(max))",
        spaceComplexity: "O(1)",
      },
      {
        name: "优化：避免使用 Math.max",
        code: `/**
 * 爱吃香蕉的珂珂 - 优化版本
 *
 * 优化点：
 * 1. 手动计算最大值，避免 Math.max(...piles) 的栈溢出风险
 * 2. 在计算小时数时提前退出，减少不必要的计算
 *
 * 为什么需要优化？
 * - Math.max(...piles) 会将数组展开为函数参数
 * - 当数组很大时，可能导致"Maximum call stack size exceeded"
 *
 * 时间复杂度：O(n × log(max))
 * 空间复杂度：O(1)
 */
function minEatingSpeed(piles, h) {
  // 手动计算最大值，避免栈溢出
  let maxPile = 0;
  for (const pile of piles) {
    if (pile > maxPile) maxPile = pile;
  }

  let left = 1;
  let right = maxPile;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // 计算需要的小时数，提前退出优化
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / mid);
      // 提前退出：如果已经超过 h，不需要继续计算
      if (hours > h) break;
    }

    if (hours <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
        explanation: `## 优化版本

### 优化点 1：避免 Math.max 展开
\`\`\`javascript
// 有风险（大数组可能栈溢出）
let max = Math.max(...piles);

// 安全写法
let max = 0;
for (const pile of piles) {
  if (pile > max) max = pile;
}
\`\`\`

### 优化点 2：提前退出
当已经超过 h 小时时，不需要继续计算剩余的堆：
\`\`\`javascript
for (const pile of piles) {
  hours += Math.ceil(pile / mid);
  if (hours > h) break;  // 提前退出
}
\`\`\`

### 适用场景
- 数组 piles 非常大时
- 需要避免栈溢出风险时

### 性能对比
| 场景 | 原版 | 优化版 |
|------|------|--------|
| 小数组 | 正常 | 正常 |
| 大数组 | 可能崩溃 | 安全 |
| 速度太慢时 | 遍历全部 | 提前退出 |`,
        timeComplexity: "O(n × log(max))",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "优化版香蕉问题演示",
          steps: [
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 11,
              highlights: [],
              description: "优化1：手动遍历找最大值，避免Math.max栈溢出",
            },
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 6,
              highlights: [{ indices: [3], color: "red" as const, label: "超时" }],
              description: "优化2：mid=3时，计算到pile=11时hours=10>8，提前break！",
            },
            {
              array: [3, 6, 7, 11],
              left: 4,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const }],
              description: "提前退出优化让大数据集更快找到答案k=4",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "使用位运算优化",
        code: `/**
 * 爱吃香蕉的珂珂 - 位运算优化
 *
 * 优化点：
 * 1. 使用 >>> 1 代替 Math.floor((left + right) / 2)
 * 2. 使用整数除法代替 Math.ceil
 *
 * 位运算说明：
 * - x >>> 1：无符号右移一位，等价于 Math.floor(x / 2)
 * - (pile + mid - 1) / mid | 0：整数除法向上取整
 *
 * 时间复杂度：O(n × log(max))
 * 空间复杂度：O(1)
 */
function minEatingSpeed(piles, h) {
  // 手动计算最大值
  let left = 1;
  let right = 0;
  for (const pile of piles) {
    if (pile > right) right = pile;
  }

  while (left < right) {
    // 无符号右移，等价于 Math.floor
    const mid = (left + right) >>> 1;

    let hours = 0;
    for (const pile of piles) {
      // 向上取整的整数实现
      // (pile + mid - 1) / mid 等价于 Math.ceil(pile / mid)
      hours += ((pile + mid - 1) / mid) | 0;
    }

    if (hours <= h) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
        explanation: `## 位运算优化

### 位运算技巧

**1. 无符号右移代替除法**
\`\`\`javascript
// 这两个等价
Math.floor((left + right) / 2)
(left + right) >>> 1
\`\`\`
>>> 是无符号右移，不会产生负数问题

**2. 向上取整的整数实现**
\`\`\`javascript
// 这两个等价（当 a, b 都是正整数时）
Math.ceil(a / b)
((a + b - 1) / b) | 0
\`\`\`
原理：(a + b - 1) / b 然后截断小数部分

### 示例计算
\`\`\`
pile = 7, mid = 4
Math.ceil(7/4) = 2
((7 + 4 - 1) / 4) | 0 = (10 / 4) | 0 = 2.5 | 0 = 2 ✓

pile = 8, mid = 4
Math.ceil(8/4) = 2
((8 + 4 - 1) / 4) | 0 = (11 / 4) | 0 = 2.75 | 0 = 2 ✓
\`\`\`

### 性能提升
- 位运算比 Math 函数略快
- 避免浮点数运算
- 在大量计算时有明显优势`,
        timeComplexity: "O(n × log(max))",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "位运算优化演示",
          steps: [
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 11,
              highlights: [],
              description: "mid = (1+11)>>>1 = 6。位运算比Math.floor快",
            },
            {
              array: [3, 6, 7, 11],
              left: 1,
              right: 11,
              highlights: [{ indices: [2], color: "yellow" as const, label: "pile=7" }],
              description: "ceil(7/6)用((7+6-1)/6)|0=2计算，避免浮点运算",
            },
            {
              array: [3, 6, 7, 11],
              left: 4,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const }],
              description: "位运算在大量计算时性能优势明显。答案k=4",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 7. 寻找两个正序数组的中位数 (4)
  {
    id: "median-of-two-sorted-arrays",
    leetcodeId: 4,
    title: "寻找两个正序数组的中位数",
    titleEn: "Median of Two Sorted Arrays",
    difficulty: "hard",
    category: "binary-search",
    tags: ["数组", "二分查找", "分治"],
    frontendRelevance: "low",
    frontendNote: "两数组中位数Hard",
    description: `给定两个大小分别为 \`m\` 和 \`n\` 的正序（从小到大）数组 \`nums1\` 和 \`nums2\`。请你找出并返回这两个正序数组的 **中位数**。

算法的时间复杂度应该为 \`O(log (m+n))\`。`,
    examples: `**示例 1：**
\`\`\`
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3]，中位数 2
\`\`\`

**示例 2：**
\`\`\`
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4]，中位数 (2 + 3) / 2 = 2.5
\`\`\``,
    constraints: `- \`nums1.length == m\`
- \`nums2.length == n\`
- \`0 <= m <= 1000\`
- \`0 <= n <= 1000\`
- \`1 <= m + n <= 2000\`
- \`-10^6 <= nums1[i], nums2[i] <= 10^6\``,
    initialCode: `function findMedianSortedArrays(nums1, nums2) {
  // 在此处编写你的代码

}`,
    solution: `function findMedianSortedArrays(nums1, nums2) {
  // 确保 nums1 是较短的数组
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1];
    const nums1RightMin = i === m ? Infinity : nums1[i];
    const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1];
    const nums2RightMin = j === n ? Infinity : nums2[j];

    if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
      // 找到正确的分割点
      if ((m + n) % 2 === 1) {
        return Math.max(nums1LeftMax, nums2LeftMax);
      } else {
        return (Math.max(nums1LeftMax, nums2LeftMax) +
                Math.min(nums1RightMin, nums2RightMin)) / 2;
      }
    } else if (nums1LeftMax > nums2RightMin) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }

  return 0;
}`,
    testCases: [
      {
        id: "1",
        name: "奇数个元素",
        input: [[1,3], [2]],
        expected: 2.0
      },
      {
        id: "2",
        name: "偶数个元素",
        input: [[1,2], [3,4]],
        expected: 2.5
      }
    ],
    hints: [
      "在较短的数组上二分查找分割点",
      "确保左半部分最大值 <= 右半部分最小值",
      "处理边界情况时使用 ±Infinity"
    ],
    explanation: `## 解题思路

### 二分查找分割点

1. 在较短的数组上二分查找分割点 i
2. 根据 i 计算另一个数组的分割点 j = (m+n+1)/2 - i
3. 确保左半部分的最大值 <= 右半部分的最小值
4. 根据总元素个数的奇偶性计算中位数

### 复杂度分析
- 时间复杂度：O(log(min(m, n)))
- 空间复杂度：O(1)`,
    timeComplexity: "O(log(min(m, n)))",
    spaceComplexity: "O(1)",
    relatedProblems: ["koko-eating-bananas", "find-peak-element"],
    solutions: [
      {
        name: "二分查找分割点（推荐）",
        code: `/**
 * 寻找两个正序数组的中位数 - 二分查找分割点
 *
 * 核心思想：
 * 将问题转化为：找一条分割线，将两个数组分成左右两部分
 * 使得：左边所有元素 <= 右边所有元素，且左边元素个数 = 右边元素个数（或多一个）
 *
 * 分割线的位置：
 * - 在较短的数组上二分查找分割位置 i
 * - 另一个数组的分割位置 j = (m + n + 1) / 2 - i
 *
 * 有效分割的条件：
 * - nums1[i-1] <= nums2[j]（nums1 左边最大 <= nums2 右边最小）
 * - nums2[j-1] <= nums1[i]（nums2 左边最大 <= nums1 右边最小）
 *
 * 时间复杂度：O(log(min(m, n)))，在较短数组上二分
 * 空间复杂度：O(1)
 */
function findMedianSortedArrays(nums1, nums2) {
  // 确保 nums1 是较短的数组，这样保证 j 不会越界
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;  // 较短数组的长度
  const n = nums2.length;  // 较长数组的长度

  // 在 nums1 上二分查找分割位置
  let left = 0;
  let right = m;

  while (left <= right) {
    // i 是 nums1 的分割位置，i 左边有 i 个元素
    const i = Math.floor((left + right) / 2);
    // j 是 nums2 的分割位置，保证左边总共有 (m+n+1)/2 个元素
    const j = Math.floor((m + n + 1) / 2) - i;

    // 处理边界情况，用 ±Infinity 表示不存在的元素
    const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1];   // nums1 左边最大
    const nums1RightMin = i === m ? Infinity : nums1[i];        // nums1 右边最小
    const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1];   // nums2 左边最大
    const nums2RightMin = j === n ? Infinity : nums2[j];        // nums2 右边最小

    if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
      // 找到正确的分割点
      if ((m + n) % 2 === 1) {
        // 奇数个元素，中位数是左边最大值
        return Math.max(nums1LeftMax, nums2LeftMax);
      } else {
        // 偶数个元素，中位数是左边最大和右边最小的平均
        return (Math.max(nums1LeftMax, nums2LeftMax) +
                Math.min(nums1RightMin, nums2RightMin)) / 2;
      }
    } else if (nums1LeftMax > nums2RightMin) {
      // nums1 左边太大，分割点要左移
      right = i - 1;
    } else {
      // nums2 左边太大，分割点要右移
      left = i + 1;
    }
  }

  return 0;  // 理论上不会到这里
}`,
        explanation: `## 二分查找分割点

### 核心思想
找一条"虚拟的分割线"，将两个数组分成左右两半

### 图示
\`\`\`
nums1: [1, 3 | 5, 7]
nums2: [2 | 4, 6, 8, 9]
       左边   |   右边

左边: 1, 3, 2 → 最大值 3
右边: 5, 7, 4, 6, 8, 9 → 最小值 4
中位数 = (3 + 4) / 2 = 3.5
\`\`\`

### 关键公式
- i = nums1 的分割位置（左边有 i 个元素）
- j = (m + n + 1) / 2 - i（保证左边总共有一半的元素）

### 执行示例
nums1 = [1, 3], nums2 = [2]
m = 2, n = 1

| 步骤 | i | j | 左边最大 | 右边最小 | 判断 |
|------|---|---|----------|----------|------|
| 1    | 1 | 1 | max(1,∞)=1 | min(3,∞)=3 | 1<=∞ && -∞<=3 ✓ |

奇数个元素，中位数 = max(1, -∞) = 1？
不对，让我重新计算...

nums1 = [1, 3], nums2 = [2]
j = (2+1+1)/2 - 1 = 1

nums1LeftMax = nums1[0] = 1
nums2LeftMax = -∞ (j=1时 j-1=0，nums2[0]=2)

实际上应该是 nums2LeftMax = 2

中位数 = max(1, 2) = 2 ✓

### 为什么要在较短数组上二分？
- 保证 j = (m+n+1)/2 - i 不会越界
- 当 i 从 0 到 m 变化时，j 从 (m+n+1)/2 到 (n-m+1)/2
- 如果 m <= n，则 j 始终 >= 0`,
        animation: {
          type: "two-pointers" as const,
          title: "寻找两个正序数组的中位数演示",
          steps: [
            {
              array: [1, 2, 3, 4],
              left: 0,
              right: 2,
              highlights: [],
              description: "nums1=[1,2], nums2=[3,4]。在较短数组上找分割点i",
            },
            {
              array: [1, 2, 3, 4],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "blue" as const, label: "nums1左" },
                { indices: [1], color: "yellow" as const, label: "nums1右" },
              ],
              description: "i=1, j=1。分割：[1]|[2] 和 [3]|[4]。左max=max(1,3)=3, 右min=min(2,4)=2",
            },
            {
              array: [1, 2, 3, 4],
              left: 0,
              right: 2,
              highlights: [{ indices: [1], color: "red" as const }],
              description: "nums1LeftMax=1 > nums2RightMin=4? 否。nums2LeftMax=3 > nums1RightMin=2? 是！left=2",
            },
            {
              array: [1, 2, 3, 4],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "nums1全左" },
                { indices: [2, 3], color: "yellow" as const, label: "nums2全右" },
              ],
              description: "i=2, j=0。分割：[1,2]|∅ 和 ∅|[3,4]。左max=2, 右min=3",
            },
            {
              array: [1, 2, 3, 4],
              left: 2,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "左max=2" },
                { indices: [2], color: "green" as const, label: "右min=3" },
              ],
              description: "2<=3 && -∞<=3 ✓ 偶数个，中位数=(2+3)/2=2.5 ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(log(min(m, n)))",
        spaceComplexity: "O(1)",
      },
      {
        name: "合并数组",
        code: `/**
 * 寻找两个正序数组的中位数 - 合并数组法
 *
 * 核心思想：
 * 最直观的方法：将两个有序数组合并成一个，然后直接取中位数
 *
 * 步骤：
 * 1. 使用归并排序的合并步骤，合并两个有序数组
 * 2. 计算合并后数组的中位数
 *
 * 注意：此方法时间复杂度为 O(m+n)，不满足题目 O(log(m+n)) 的要求
 * 但代码简单易懂，面试时可以作为暴力解法先实现
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(m + n)
 */
function findMedianSortedArrays(nums1, nums2) {
  const merged = [];  // 合并后的数组
  let i = 0, j = 0;   // 两个指针

  // 归并过程：比较两个数组当前元素，较小的先放入结果
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  // 处理剩余元素
  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);

  // 计算中位数
  const n = merged.length;
  if (n % 2 === 1) {
    // 奇数个元素，返回中间那个
    return merged[Math.floor(n / 2)];
  } else {
    // 偶数个元素，返回中间两个的平均值
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
  }
}`,
        explanation: `## 合并数组法

### 核心思想
最直观的方法：先合并，再取中位数

### 执行示例
nums1 = [1, 3], nums2 = [2]

**合并过程：**
| 步骤 | i | j | 比较 | merged |
|------|---|---|------|--------|
| 1    | 0 | 0 | 1<2  | [1] |
| 2    | 1 | 0 | 3>2  | [1,2] |
| 3    | 1 | 1 | 剩余 | [1,2,3] |

**取中位数：**
n = 3（奇数）
中位数 = merged[1] = 2 ✓

### 复杂度分析
\`\`\`
时间：O(m+n) - 需要遍历所有元素
空间：O(m+n) - 需要存储合并后的数组
\`\`\`

### 优缺点
| 优点 | 缺点 |
|------|------|
| 代码简单 | 时间复杂度不是最优 |
| 容易理解 | 空间复杂度较高 |
| 不容易出错 | 不满足题目要求 |

### 适用场景
- 面试时作为初始解法
- 验证其他算法的正确性`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
        animation: {
          type: "two-pointers" as const,
          title: "合并数组法演示",
          steps: [
            {
              array: [1, 3, 2],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "nums1" },
                { indices: [2], color: "yellow" as const, label: "nums2" },
              ],
              description: "nums1=[1,3], nums2=[2]。归并两个有序数组",
            },
            {
              array: [1, 2, 3],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "1<2" }],
              description: "i=0,j=0。1<2，merged=[1]。i++",
            },
            {
              array: [1, 2, 3],
              left: 1,
              right: 2,
              highlights: [{ indices: [1], color: "green" as const, label: "2<3" }],
              description: "i=1,j=0。3>2，merged=[1,2]。j++",
            },
            {
              array: [1, 2, 3],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "中位数" }],
              description: "合并完成：[1,2,3]。n=3奇数，中位数=merged[1]=2 ✓",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "查找第 K 小元素",
        code: `/**
 * 寻找两个正序数组的中位数 - 查找第 K 小元素
 *
 * 核心思想：
 * 将问题转化为"在两个有序数组中找第 K 小的元素"
 * - 如果总共 n 个元素，中位数就是第 (n+1)/2 小的元素（奇数情况）
 * - 或者第 n/2 和第 n/2+1 小元素的平均值（偶数情况）
 *
 * 查找第 K 小的算法：
 * - 比较两数组的第 k/2 个元素
 * - 较小的那边的前 k/2 个元素一定不是第 K 小，可以排除
 * - 递归查找第 K - k/2 小的元素
 *
 * 时间复杂度：O(log(m + n))
 * 空间复杂度：O(log(m + n))，递归栈空间
 */
function findMedianSortedArrays(nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;

  /**
   * 查找两个数组中第 k 小的元素
   * @param k 要找的是第 k 小（从 1 开始）
   * @param start1 nums1 的起始位置
   * @param start2 nums2 的起始位置
   */
  const findKth = (k, start1, start2) => {
    // 边界情况 1：nums1 已经用完
    if (start1 >= m) {
      return nums2[start2 + k - 1];
    }
    // 边界情况 2：nums2 已经用完
    if (start2 >= n) {
      return nums1[start1 + k - 1];
    }
    // 边界情况 3：只需要找第 1 小的元素
    if (k === 1) {
      return Math.min(nums1[start1], nums2[start2]);
    }

    // 比较两个数组的第 k/2 个元素
    const half = Math.floor(k / 2);
    // 注意处理越界：如果不够 k/2 个元素，取最后一个
    const idx1 = Math.min(start1 + half, m) - 1;
    const idx2 = Math.min(start2 + half, n) - 1;

    if (nums1[idx1] <= nums2[idx2]) {
      // nums1 的前半部分可以排除
      // 排除了 idx1 - start1 + 1 个元素
      return findKth(k - (idx1 - start1 + 1), idx1 + 1, start2);
    } else {
      // nums2 的前半部分可以排除
      return findKth(k - (idx2 - start2 + 1), start1, idx2 + 1);
    }
  };

  const total = m + n;
  if (total % 2 === 1) {
    // 奇数个元素，返回第 (total+1)/2 小的
    return findKth(Math.floor(total / 2) + 1, 0, 0);
  } else {
    // 偶数个元素，返回中间两个的平均值
    const left = findKth(total / 2, 0, 0);
    const right = findKth(total / 2 + 1, 0, 0);
    return (left + right) / 2;
  }
}`,
        explanation: `## 查找第 K 小元素

### 核心思想
每次排除 k/2 个元素，时间复杂度 O(log k)

### 关键原理
比较两数组的第 k/2 个元素（A[k/2] 和 B[k/2]）：
- 如果 A[k/2] < B[k/2]，A 的前 k/2 个元素不可能是第 K 小
- 因为最多有 k/2-1 + k/2-1 = k-2 个元素比 A[k/2] 小

### 图示
\`\`\`
找第 7 小，k/2 = 3
A: [1, 3, 5, 7, 9]
       ↑ A[2]=5
B: [2, 4, 6, 8, 10]
       ↑ B[2]=6

5 < 6，排除 A 的前 3 个
继续找第 7-3=4 小

A: [7, 9]
B: [2, 4, 6, 8, 10]
\`\`\`

### 执行示例
nums1 = [1, 2], nums2 = [3, 4]
找第 2 小和第 3 小

**findKth(2, 0, 0)：**
- half = 1
- A[0]=1, B[0]=3
- 1 < 3，排除 A[0]
- findKth(1, 1, 0)
- k=1，返回 min(A[1], B[0]) = min(2, 3) = 2

**findKth(3, 0, 0)：**
- half = 1
- A[0]=1, B[0]=3
- 1 < 3，排除 A[0]
- findKth(2, 1, 0)
- half = 1
- A[1]=2, B[0]=3
- 2 < 3，排除 A[1]
- findKth(1, 2, 0)
- start1 >= m，返回 B[0] = 3

中位数 = (2 + 3) / 2 = 2.5 ✓`,
        timeComplexity: "O(log(m + n))",
        spaceComplexity: "O(log(m + n))",
        animation: {
          type: "two-pointers" as const,
          title: "查找第K小元素演示",
          steps: [
            {
              array: [1, 2, 3, 4],
              left: 0,
              right: 3,
              highlights: [],
              description: "nums1=[1,2], nums2=[3,4]。找第k小：k=(2+2)/2+1=3",
            },
            {
              array: [1, 2, 3, 4],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "A[0]=1" },
                { indices: [2], color: "yellow" as const, label: "B[0]=3" },
              ],
              description: "findKth(3)：比较A[0]=1和B[0]=3。1<3，排除A[0]",
            },
            {
              array: [1, 2, 3, 4],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "blue" as const, label: "A[1]=2" },
                { indices: [2], color: "yellow" as const, label: "B[0]=3" },
              ],
              description: "findKth(2)：比较A[1]=2和B[0]=3。2<3，排除A[1]",
            },
            {
              array: [1, 2, 3, 4],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "第3小" }],
              description: "findKth(1)：A用完，返回B[0]=3。中位数=(2+3)/2=2.5 ✓",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 8. 搜索插入位置 (35)
  {
    id: "search-insert-position",
    leetcodeId: 35,
    title: "搜索插入位置",
    titleEn: "Search Insert Position",
    difficulty: "easy",
    category: "binary-search",
    tags: ["数组", "二分查找"],
    frontendRelevance: "high",
    frontendNote: "二分查找插入位置",
    description: `给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 \`O(log n)\` 的算法。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,3,5,6], target = 5
输出：2
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,3,5,6], target = 2
输出：1
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1,3,5,6], target = 7
输出：4
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` 为 **无重复元素** 的 **升序** 排列数组
- \`-10^4 <= target <= 10^4\``,
    initialCode: `function searchInsert(nums, target) {
  // 在此处编写你的代码

}`,
    solution: `function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
    testCases: [
      {
        id: "1",
        name: "找到目标",
        input: [[1,3,5,6], 5],
        expected: 2
      },
      {
        id: "2",
        name: "插入中间",
        input: [[1,3,5,6], 2],
        expected: 1
      },
      {
        id: "3",
        name: "插入末尾",
        input: [[1,3,5,6], 7],
        expected: 4
      },
      {
        id: "4",
        name: "插入开头",
        input: [[1,3,5,6], 0],
        expected: 0
      }
    ],
    hints: [
      "标准的二分查找",
      "找不到时返回 left，即第一个大于 target 的位置",
      "注意边界情况"
    ],
    explanation: `## 解题思路

### 二分查找

1. 标准的二分查找流程
2. 如果找到 target，返回其索引
3. 如果没找到，left 指向第一个大于 target 的位置
4. 这就是 target 应该插入的位置

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["find-first-and-last-position", "search-a-2d-matrix"],
    solutions: [
      {
        name: "二分查找（推荐）",
        code: `/**
 * 搜索插入位置 - 二分查找
 *
 * 核心思想：
 * 标准的二分查找，但需要理解返回值的含义
 * - 如果找到 target，返回其索引
 * - 如果没找到，返回 target 应该插入的位置
 *
 * 关键观察：
 * 循环结束时 left > right，此时 left 指向第一个大于 target 的位置
 * 这正是 target 应该插入的位置
 *
 * 为什么 left 就是插入位置？
 * - 每次 left = mid + 1，说明 nums[mid] < target
 * - 最终 left 停在第一个 >= target 的位置
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      // 找到目标，直接返回索引
      return mid;
    } else if (nums[mid] < target) {
      // 中间值太小，在右半部分找
      left = mid + 1;
    } else {
      // 中间值太大，在左半部分找
      right = mid - 1;
    }
  }

  // 没找到，left 就是插入位置
  return left;
}`,
        explanation: `## 二分查找

### 核心思想
二分查找的"副产品"：找不到时 left 就是插入位置

### 执行示例 1：找到目标
nums = [1,3,5,6], target = 5

| 步骤 | left | right | mid | nums[mid] | 操作 |
|------|------|-------|-----|-----------|------|
| 1    | 0    | 3     | 1   | 3         | 3<5, left=2 |
| 2    | 2    | 3     | 2   | 5         | 找到！返回 2 |

### 执行示例 2：插入中间
nums = [1,3,5,6], target = 2

| 步骤 | left | right | mid | nums[mid] | 操作 |
|------|------|-------|-----|-----------|------|
| 1    | 0    | 3     | 1   | 3         | 3>2, right=0 |
| 2    | 0    | 0     | 0   | 1         | 1<2, left=1 |
| 结束 | left=1 > right=0，返回 1 |

2 应该插入到索引 1，数组变为 [1,2,3,5,6] ✓

### 执行示例 3：插入末尾
nums = [1,3,5,6], target = 7

| 步骤 | left | right | mid | nums[mid] | 操作 |
|------|------|-------|-----|-----------|------|
| 1    | 0    | 3     | 1   | 3         | 3<7, left=2 |
| 2    | 2    | 3     | 2   | 5         | 5<7, left=3 |
| 3    | 3    | 3     | 3   | 6         | 6<7, left=4 |
| 结束 | left=4 > right=3，返回 4 |

7 应该插入到索引 4（数组末尾）✓

### 为什么 left 是插入位置？
- 循环结束时：left = right + 1
- nums[right] < target < nums[left]
- 所以 target 应该插入到 left 的位置`,
        animation: {
          type: "two-pointers" as const,
          title: "搜索插入位置演示",
          steps: [
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 3,
              highlights: [],
              description: "nums=[1,3,5,6], target=2。找到位置或返回插入位置",
            },
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 3,
              highlights: [{ indices: [1], color: "yellow" as const, label: "mid=1" }],
              description: "mid=1, nums[1]=3>2，往左找，right=0",
            },
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "mid=0" }],
              description: "mid=0, nums[0]=1<2，往右找，left=1",
            },
            {
              array: [1, 3, 5, 6],
              left: 1,
              right: 0,
              highlights: [{ indices: [1], color: "green" as const, label: "插入位置" }],
              description: "left=1 > right=0，循环结束。插入位置=1 ✓ 变成[1,2,3,5,6]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "左闭右开写法",
        code: `/**
 * 搜索插入位置 - 左闭右开区间
 *
 * 核心思想：
 * 使用左闭右开区间 [left, right) 进行二分查找
 * 查找的是"第一个大于等于 target 的位置"（lower_bound）
 *
 * 区间定义：
 * - [left, right) 表示待搜索区间
 * - 循环条件是 left < right（区间非空）
 * - 找到答案时 right = mid（保留 mid，缩小区间）
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length;  // 右边界是 n，不是 n-1

  // 左闭右开区间 [left, right)
  while (left < right) {  // 注意是 <，不是 <=
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < target) {
      // mid 太小，不可能是答案，排除
      left = mid + 1;
    } else {
      // nums[mid] >= target，可能是答案
      // 不能排除 mid，所以 right = mid
      right = mid;
    }
  }

  // left == right，就是第一个 >= target 的位置
  return left;
}`,
        explanation: `## 左闭右开写法

### 核心概念
左闭右开区间 [left, right) 是另一种常见的二分写法

### 两种写法对比
| 特征 | 左闭右闭 | 左闭右开 |
|------|----------|----------|
| 初始 right | n - 1 | n |
| 循环条件 | left <= right | left < right |
| 更新 right | right = mid - 1 | right = mid |

### 执行示例
nums = [1,3,5,6], target = 2

| 步骤 | left | right | mid | nums[mid] | 操作 |
|------|------|-------|-----|-----------|------|
| 1    | 0    | 4     | 2   | 5         | 5>=2, right=2 |
| 2    | 0    | 2     | 1   | 3         | 3>=2, right=1 |
| 3    | 0    | 1     | 0   | 1         | 1<2, left=1 |
| 结束 | left == right == 1 |

### 这种写法的优点
- 找的是"第一个大于等于 target 的位置"
- 概念更清晰：这就是 lower_bound
- 不需要单独处理"找到"和"没找到"的情况

### lower_bound 的应用
- 查找插入位置
- 查找第一个等于 target 的位置
- 查找第一个大于 target 的位置（upper_bound）`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "左闭右开区间演示",
          steps: [
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 4,
              highlights: [],
              description: "nums=[1,3,5,6], target=2。右边界是n=4（左闭右开[0,4)）",
            },
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "mid=2" }],
              description: "mid=2，5>=2，right=mid=2，区间变[0,2)",
            },
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "yellow" as const, label: "mid=1" }],
              description: "mid=1，3>=2，right=mid=1，区间变[0,1)",
            },
            {
              array: [1, 3, 5, 6],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "插入位置" }],
              description: "mid=0，1<2，left=1。left==right=1 ✓ 第一个>=2的位置",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "递归实现",
        code: `/**
 * 搜索插入位置 - 递归实现
 *
 * 核心思想：
 * 递归版本的二分查找
 * 基准条件：区间为空时返回 left
 *
 * 递归逻辑：
 * - 找到 target：返回 mid
 * - target 在右边：递归右半部分
 * - target 在左边：递归左半部分
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(log n)，递归栈空间
 */
function searchInsert(nums, target) {
  /**
   * 递归二分查找
   * @param left 左边界
   * @param right 右边界
   */
  const binarySearch = (left, right) => {
    // 基准条件：区间为空
    if (left > right) {
      return left;  // left 就是插入位置
    }

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;  // 找到了
    } else if (nums[mid] < target) {
      // 在右半部分递归
      return binarySearch(mid + 1, right);
    } else {
      // 在左半部分递归
      return binarySearch(left, mid - 1);
    }
  };

  return binarySearch(0, nums.length - 1);
}`,
        explanation: `## 递归实现

### 核心思想
递归版本的二分查找，逻辑更直观

### 递归树示例
nums = [1,3,5,6], target = 2

\`\`\`
binarySearch(0, 3)
  mid = 1, nums[1] = 3 > 2
  → binarySearch(0, 0)
      mid = 0, nums[0] = 1 < 2
      → binarySearch(1, 0)
          left > right，返回 left = 1
\`\`\`

### 基准条件的重要性
\`\`\`
left > right 时返回 left
这保证了：
- 如果 target 比所有元素大，返回 n
- 如果 target 比所有元素小，返回 0
- 如果 target 在中间某处，返回正确的插入位置
\`\`\`

### 与迭代版本对比
| 方面 | 迭代 | 递归 |
|------|------|------|
| 代码量 | 较少 | 略多 |
| 可读性 | 中等 | 更直观 |
| 空间 | O(1) | O(log n) |
| 性能 | 略好 | 有栈开销 |

### 适用场景
- 学习理解二分查找
- 代码可读性要求高的场景
- 作为面试时的备选实现`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
        animation: {
          type: "two-pointers" as const,
          title: "递归二分搜索插入位置演示",
          steps: [
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 3,
              highlights: [{ indices: [1], color: "yellow" as const, label: "mid=1" }],
              description: "binarySearch(0,3)：mid=1，3>2，递归左边",
            },
            {
              array: [1, 3, 5, 6],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "mid=0" }],
              description: "binarySearch(0,0)：mid=0，1<2，递归右边",
            },
            {
              array: [1, 3, 5, 6],
              left: 1,
              right: 0,
              highlights: [{ indices: [1], color: "green" as const, label: "插入位置" }],
              description: "binarySearch(1,0)：left>right，返回left=1 ✓",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },
];
