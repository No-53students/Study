import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

// 滑动窗口分类题目
export const slidingWindowProblems: Problem[] = [
  // 1. 长度最小的子数组 (209)
  {
    id: "minimum-size-subarray-sum",
    leetcodeId: 209,
    title: "长度最小的子数组",
    titleEn: "Minimum Size Subarray Sum",
    difficulty: "medium",
    category: "sliding-window",
    tags: ["滑动窗口", "数组", "二分查找"],
    frontendRelevance: "medium",
    frontendNote: "滑动窗口变体",
    description: `给定一个含有 \`n\` 个正整数的数组和一个正整数 \`target\`。

找出该数组中满足其总和大于等于 \`target\` 的长度最小的 **连续子数组** \`[numsl, numsl+1, ..., numsr-1, numsr]\`，并返回其长度。如果不存在符合条件的子数组，返回 \`0\`。`,
    examples: `**示例 1：**
\`\`\`
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
\`\`\`

**示例 2：**
\`\`\`
输入：target = 4, nums = [1,4,4]
输出：1
\`\`\`

**示例 3：**
\`\`\`
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
\`\`\``,
    constraints: `- \`1 <= target <= 10^9\`
- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`

**进阶：** 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。`,
    initialCode: `function minSubArrayLen(target, nums) {
  // 在此处编写你的代码

}`,
    solution: `function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    // 扩展窗口，加入右边元素
    sum += nums[right];

    // 收缩窗口，直到和小于 target
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
      { id: "2", name: "示例2", input: [4, [1, 4, 4]], expected: 1 },
      { id: "3", name: "无解", input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
      { id: "4", name: "整个数组", input: [15, [1, 2, 3, 4, 5]], expected: 5 },
    ],
    hints: [
      "使用滑动窗口，维护一个和大于等于 target 的窗口",
      "右指针负责扩展窗口，左指针负责收缩窗口",
      "当窗口和 >= target 时，尝试收缩窗口并更新最小长度",
    ],
    explanation: `## 解题思路

### 滑动窗口法

1. 使用两个指针 left 和 right 表示窗口的左右边界
2. right 指针向右移动，扩展窗口，累加和
3. 当窗口和 >= target 时：
   - 更新最小长度
   - left 指针右移，收缩窗口
   - 重复直到窗口和 < target
4. 继续移动 right，重复上述过程

### 为什么这样做是正确的？

- 数组元素都是正整数，所以窗口越大，和越大
- 当和 >= target 时，继续扩大窗口只会得到更长的子数组
- 所以应该尝试收缩窗口，找到最小长度

### 复杂度分析
- 时间复杂度：O(n)，每个元素最多被访问两次（一次被 right 访问，一次被 left 访问）
- 空间复杂度：O(1)，只使用常数额外空间`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["longest-substring-without-repeating"],
    solutions: [
      {
        name: "滑动窗口（推荐）",
        code: `/**
 * 长度最小的子数组 - 滑动窗口
 *
 * 核心思想：
 * 维护一个可变大小的窗口，当窗口和 >= target 时尝试收缩
 * 由于所有元素都是正整数，窗口扩大则和增大，收缩则和减小
 *
 * 为什么这样做是正确的？
 * 当窗口和已经 >= target 时，继续扩大窗口只会得到更长的子数组
 * 所以应该尝试收缩窗口，在满足条件的前提下找到最短长度
 *
 * 时间复杂度：O(n)，每个元素最多被访问两次
 * 空间复杂度：O(1)，只使用常数变量
 */
function minSubArrayLen(target, nums) {
  let left = 0;        // 窗口左边界
  let sum = 0;         // 窗口内元素之和
  let minLen = Infinity;  // 记录最小长度

  // right 指针遍历数组，扩展窗口
  for (let right = 0; right < nums.length; right++) {
    // 扩展窗口：将右边元素加入窗口
    sum += nums[right];

    // 收缩窗口：当窗口和 >= target 时
    while (sum >= target) {
      // 更新最小长度
      minLen = Math.min(minLen, right - left + 1);
      // 收缩窗口：移除左边元素
      sum -= nums[left];
      left++;
    }
  }

  // 如果没找到满足条件的子数组，返回 0
  return minLen === Infinity ? 0 : minLen;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "长度最小的子数组 - 滑动窗口演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "窗口" }],
              description: "target=7。扩展：right=0，加入 2，sum=2 < 7，继续扩展",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "窗口" }],
              description: "扩展：right=1，加入 3，sum=5 < 7，继续扩展",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "窗口" }],
              description: "扩展：right=2，加入 1，sum=6 < 7，继续扩展",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "满足!" }],
              description: "扩展：right=3，加入 2，sum=8 >= 7！minLen=4，开始收缩",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 1,
              right: 3,
              highlights: [{ indices: [1, 2, 3], color: "green" as const, label: "满足!" }],
              description: "收缩：left=1，移除 2，sum=6 < 7。minLen 仍为 4",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 1,
              right: 4,
              highlights: [{ indices: [1, 2, 3, 4], color: "green" as const, label: "满足!" }],
              description: "扩展：right=4，加入 4，sum=10 >= 7！minLen=4，收缩",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 2,
              right: 4,
              highlights: [{ indices: [2, 3, 4], color: "green" as const, label: "满足!" }],
              description: "收缩：left=2，移除 3，sum=7 >= 7！minLen=3，继续收缩",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 3,
              right: 4,
              highlights: [{ indices: [3, 4], color: "green" as const, label: "满足!" }],
              description: "收缩：left=3，移除 1，sum=6 < 7。minLen=2 更新！",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 3,
              right: 5,
              highlights: [{ indices: [3, 4, 5], color: "green" as const, label: "满足!" }],
              description: "扩展：right=5，加入 3，sum=9 >= 7！minLen=3，收缩",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 4,
              right: 5,
              highlights: [{ indices: [4, 5], color: "green" as const, label: "最优!" }],
              description: "收缩：left=4，移除 2，sum=7 >= 7！minLen=2（不变），继续收缩",
            },
            {
              array: [2, 3, 1, 2, 4, 3],
              left: 5,
              right: 5,
              highlights: [{ indices: [4, 5], color: "red" as const, label: "答案" }],
              description: "完成！最小长度 = 2，对应子数组 [4,3]，和为 7",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 滑动窗口

### 核心思想
维护一个可变大小的窗口，通过双指针实现：
- right 指针负责扩展窗口
- left 指针负责收缩窗口

### 执行示例
target = 7, nums = [2,3,1,2,4,3]

| right | 加入元素 | sum | left移动 | 窗口 | minLen |
|-------|---------|-----|----------|------|--------|
| 0     | 2       | 2   | -        | [2]  | ∞     |
| 1     | 3       | 5   | -        | [2,3] | ∞    |
| 2     | 1       | 6   | -        | [2,3,1] | ∞  |
| 3     | 2       | 8   | 0→1→2   | [1,2] | 4→3  |
| 4     | 4       | 7   | 2→3     | [2,4] | 3→2  |
| 5     | 3       | 8   | 3→4     | [4,3] | 2    |

最终结果：2（子数组 [4,3]）

### 为什么正确？
数组元素都是正整数，所以：
- 窗口越大，和越大
- 当和 >= target 时，应该尝试收缩窗口找最小长度`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "前缀和 + 二分查找",
        code: `/**
 * 长度最小的子数组 - 前缀和 + 二分查找
 *
 * 核心思想：
 * 前缀和可以将子数组和问题转化为两点差值问题
 * prefix[j] - prefix[i] >= target 表示子数组 [i, j-1] 的和 >= target
 *
 * 由于所有元素都是正整数，前缀和数组是严格递增的
 * 对于每个位置 i，可以用二分查找找到最小的 j
 *
 * 时间复杂度：O(n log n)，遍历 + 二分查找
 * 空间复杂度：O(n)，前缀和数组
 */
function minSubArrayLen(target, nums) {
  const n = nums.length;
  // 前缀和数组，prefix[i] = nums[0] + ... + nums[i-1]
  const prefix = new Array(n + 1).fill(0);

  // 计算前缀和
  for (let i = 1; i <= n; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1];
  }

  let minLen = Infinity;

  // 对于每个位置 i，二分查找满足条件的最小 j
  for (let i = 0; i <= n; i++) {
    // 目标：找到最小的 j 使得 prefix[j] >= prefix[i] + target
    const targetSum = prefix[i] + target;

    // 二分查找第一个 >= targetSum 的位置
    let left = i + 1, right = n;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (prefix[mid] >= targetSum) {
        // 找到一个满足条件的位置，尝试找更小的
        minLen = Math.min(minLen, mid - i);
        right = mid - 1;
      } else {
        // 和不够，需要更大的 j
        left = mid + 1;
      }
    }
  }

  return minLen === Infinity ? 0 : minLen;
}`,
        explanation: `## 前缀和 + 二分查找

### 核心思想
利用前缀和的性质：
- prefix[j] - prefix[i] = 子数组 [i, j-1] 的和
- 需要找：prefix[j] - prefix[i] >= target
- 即：prefix[j] >= prefix[i] + target

由于元素都是正数，前缀和严格递增，可以用二分查找。

### 执行示例
target = 7, nums = [2,3,1,2,4,3]
前缀和：[0, 2, 5, 6, 8, 12, 15]

| i | prefix[i] | 目标 | 二分找到 j | 长度 |
|---|-----------|------|-----------|------|
| 0 | 0         | 7    | 4 (=8)    | 4    |
| 1 | 2         | 9    | 5 (=12)   | 4    |
| 2 | 5         | 12   | 5 (=12)   | 3    |
| 3 | 6         | 13   | 6 (=15)   | 3    |
| 4 | 8         | 15   | 6 (=15)   | 2    |

最小长度：2

### 适用场景
这是进阶解法，展示了前缀和 + 二分查找的应用。
当元素可能为负数时，滑动窗口不适用，但前缀和仍可使用（需配合其他数据结构）。`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 2. 无重复字符的最长子串 (3)
  {
    id: "longest-substring-without-repeating",
    leetcodeId: 3,
    title: "无重复字符的最长子串",
    titleEn: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    category: "sliding-window",
    tags: ["滑动窗口", "哈希表", "字符串"],
    frontendRelevance: "high",
    frontendNote: "滑动窗口经典，面试高频",
    description: `给定一个字符串 \`s\`，请你找出其中不含有重复字符的 **最长子串** 的长度。`,
    examples: `**示例 1：**
\`\`\`
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
\`\`\`

**示例 2：**
\`\`\`
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
\`\`\`

**示例 3：**
\`\`\`
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
\`\`\``,
    constraints: `- \`0 <= s.length <= 5 * 10^4\`
- \`s\` 由英文字母、数字、符号和空格组成`,
    initialCode: `function lengthOfLongestSubstring(s) {
  // 在此处编写你的代码

}`,
    solution: `function lengthOfLongestSubstring(s) {
  const charIndex = new Map(); // 记录字符最后出现的位置
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // 如果字符已存在且在窗口内，移动左指针
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }

    // 更新字符位置
    charIndex.set(char, right);

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["abcabcbb"], expected: 3 },
      { id: "2", name: "全相同", input: ["bbbbb"], expected: 1 },
      { id: "3", name: "示例3", input: ["pwwkew"], expected: 3 },
      { id: "4", name: "空字符串", input: [""], expected: 0 },
      { id: "5", name: "单字符", input: ["a"], expected: 1 },
    ],
    hints: [
      "使用滑动窗口，维护一个无重复字符的窗口",
      "使用哈希表记录每个字符最后出现的位置",
      "遇到重复字符时，将左指针移动到重复字符的下一个位置",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 哈希表

1. 使用哈希表记录每个字符最后出现的位置
2. 右指针遍历字符串，扩展窗口
3. 如果当前字符已在窗口中存在（检查其位置是否 >= left）：
   - 将左指针移动到重复字符的下一个位置
4. 更新字符位置和最大长度

### 关键点
- 判断重复时，需要检查字符的位置是否在当前窗口内（>= left）
- 使用哈希表可以O(1)时间查找字符位置

### 复杂度分析
- 时间复杂度：O(n)，只遍历一次字符串
- 空间复杂度：O(min(m, n))，m 是字符集大小，n 是字符串长度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    relatedProblems: ["minimum-size-subarray-sum", "minimum-window-substring"],
    solutions: [
      {
        name: "滑动窗口 + 哈希表（推荐）",
        code: `/**
 * 无重复字符的最长子串 - 滑动窗口 + 哈希表
 *
 * 核心思想：
 * 用哈希表记录每个字符最后出现的位置
 * 遇到重复字符时，左指针直接跳转到重复字符的下一个位置
 *
 * 关键点：
 * 1. 判断重复时需要检查字符位置是否在当前窗口内（>= left）
 * 2. 左指针只能右移，不能左移（单调性）
 *
 * 时间复杂度：O(n)，只遍历一次字符串
 * 空间复杂度：O(min(m, n))，m 是字符集大小
 */
function lengthOfLongestSubstring(s) {
  // 哈希表：记录字符最后出现的位置
  const charIndex = new Map();
  let maxLen = 0;   // 记录最大长度
  let left = 0;     // 窗口左边界

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // 如果字符已存在且在当前窗口内
    // 需要检查 >= left，因为字符可能在窗口外（被之前的移动跳过了）
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      // 左指针直接跳转到重复字符的下一个位置
      left = charIndex.get(char) + 1;
    }

    // 更新字符位置（无论是否重复都要更新）
    charIndex.set(char, right);

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "无重复字符的最长子串 - 滑动窗口演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "窗口" }],
              description: "right=0，字符 'a' 不在窗口中，加入。窗口=\"a\"，maxLen=1",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "窗口" }],
              description: "right=1，字符 'b' 不在窗口中，加入。窗口=\"ab\"，maxLen=2",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "最优" }],
              description: "right=2，字符 'c' 不在窗口中，加入。窗口=\"abc\"，maxLen=3",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "red" as const, label: "重复" },
                { indices: [3], color: "yellow" as const, label: "当前" },
              ],
              description: "right=3，字符 'a' 在位置 0，在窗口内！left 跳到 0+1=1",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 1,
              right: 3,
              highlights: [{ indices: [1, 2, 3], color: "green" as const, label: "窗口" }],
              description: "left=1，窗口=\"bca\"，maxLen=3（不变）",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 2,
              right: 4,
              highlights: [{ indices: [2, 3, 4], color: "green" as const, label: "窗口" }],
              description: "right=4，'b' 在位置 1，在窗口内！left 跳到 2。窗口=\"cab\"",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 3,
              right: 5,
              highlights: [{ indices: [3, 4, 5], color: "green" as const, label: "窗口" }],
              description: "right=5，'c' 在位置 2，在窗口内！left 跳到 3。窗口=\"abc\"",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 5,
              right: 6,
              highlights: [{ indices: [5, 6], color: "green" as const, label: "窗口" }],
              description: "right=6，'b' 在位置 4，在窗口内！left 跳到 5。窗口=\"cb\"",
            },
            {
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              left: 7,
              right: 7,
              highlights: [
                { indices: [0, 1, 2], color: "purple" as const, label: "答案" },
              ],
              description: "right=7，'b' 在位置 6，在窗口内！left 跳到 7。完成！maxLen=3",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 滑动窗口 + 哈希表

### 核心思想
用哈希表记录每个字符最后出现的位置，遇到重复字符时可以直接跳转左指针。

### 执行示例
s = "abcabcbb"

| right | char | charIndex.get(char) | left | 窗口 | maxLen |
|-------|------|---------------------|------|------|--------|
| 0     | a    | -                   | 0    | "a"  | 1      |
| 1     | b    | -                   | 0    | "ab" | 2      |
| 2     | c    | -                   | 0    | "abc"| 3      |
| 3     | a    | 0 >= 0, 跳转        | 1    | "bca"| 3      |
| 4     | b    | 1 >= 1, 跳转        | 2    | "cab"| 3      |
| 5     | c    | 2 >= 2, 跳转        | 3    | "abc"| 3      |
| 6     | b    | 4 >= 3, 跳转        | 5    | "cb" | 3      |
| 7     | b    | 6 >= 5, 跳转        | 7    | "b"  | 3      |

### 为什么要检查 >= left？
考虑 s = "abba"：
- 遍历到第二个 'a' 时，第一个 'a' 的位置是 0
- 但此时 left = 2（因为遇到 'b' 时跳转过）
- 0 < 2，所以第一个 'a' 已不在窗口内，不算重复`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
      },
      {
        name: "滑动窗口 + Set",
        code: `/**
 * 无重复字符的最长子串 - 滑动窗口 + Set
 *
 * 核心思想：
 * 用 Set 记录窗口内的字符
 * 遇到重复字符时，逐步移动左指针直到消除重复
 *
 * 与哈希表方法的区别：
 * - 哈希表方法可以直接跳转左指针
 * - Set 方法需要逐步移动左指针
 *
 * 时间复杂度：O(n)，每个字符最多被访问两次
 * 空间复杂度：O(min(m, n))，m 是字符集大小
 */
function lengthOfLongestSubstring(s) {
  // Set 记录窗口内的字符
  const set = new Set();
  let maxLen = 0;   // 记录最大长度
  let left = 0;     // 窗口左边界

  for (let right = 0; right < s.length; right++) {
    // 如果当前字符在窗口内，收缩窗口直到不重复
    while (set.has(s[right])) {
      // 移除左边界字符
      set.delete(s[left]);
      left++;
    }

    // 添加当前字符到窗口
    set.add(s[right]);

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        explanation: `## 滑动窗口 + Set

### 核心思想
用 Set 维护窗口内的字符集合，保证窗口内无重复。

### 执行示例
s = "pwwkew"

| right | char | Set内容 | left | maxLen |
|-------|------|---------|------|--------|
| 0     | p    | {p}     | 0    | 1      |
| 1     | w    | {p,w}   | 0    | 2      |
| 2     | w    | 删除p,w → {w} | 2 | 2   |
| 3     | k    | {w,k}   | 2    | 2      |
| 4     | e    | {w,k,e} | 2    | 3      |
| 5     | w    | 删除w → {k,e,w} | 3 | 3 |

### 对比哈希表方法
- 思路更直观
- 但左指针需要逐步移动
- 最坏情况下（如 "abcd...za"）每个字符访问两次`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m, n))",
      },
      {
        name: "数组代替哈希表",
        code: `/**
 * 无重复字符的最长子串 - 数组优化
 *
 * 核心思想：
 * 使用固定大小的数组代替哈希表存储字符位置
 * 数组下标为字符的 ASCII 码，值为字符最后出现的位置
 *
 * 优点：
 * - 数组访问比哈希表更快（O(1) 真正的常数时间）
 * - 适用于 ASCII 字符集
 *
 * 时间复杂度：O(n)，只遍历一次字符串
 * 空间复杂度：O(1)，固定大小 128 的数组
 */
function lengthOfLongestSubstring(s) {
  // 使用数组记录字符最后出现的位置
  // 初始化为 -1 表示字符未出现过
  const lastIndex = new Array(128).fill(-1);
  let maxLen = 0;   // 记录最大长度
  let left = 0;     // 窗口左边界

  for (let right = 0; right < s.length; right++) {
    // 获取字符的 ASCII 码作为数组索引
    const code = s.charCodeAt(right);

    // 如果字符在窗口内出现过
    if (lastIndex[code] >= left) {
      // 左指针跳转到重复字符的下一个位置
      left = lastIndex[code] + 1;
    }

    // 更新字符最后出现的位置
    lastIndex[code] = right;

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
        explanation: `## 数组代替哈希表

### 核心思想
使用长度 128 的数组代替哈希表，数组下标是字符的 ASCII 码。

### 为什么是 128？
标准 ASCII 字符集包含 128 个字符（0-127）。
如果需要支持扩展字符，可以使用 256 或更大的数组。

### 性能对比
| 方法 | 查找时间 | 空间 |
|------|---------|------|
| Map  | O(1) 平均 | O(k) |
| 数组 | O(1) 真正 | O(128) |

数组访问是真正的 O(1)，不涉及哈希计算。

### 适用场景
- 字符集较小（如 ASCII）
- 追求极致性能
- 字符集已知且固定`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 3. 最小覆盖子串 (76)
  {
    id: "minimum-window-substring",
    leetcodeId: 76,
    title: "最小覆盖子串",
    titleEn: "Minimum Window Substring",
    difficulty: "hard",
    category: "sliding-window",
    tags: ["滑动窗口", "哈希表", "字符串"],
    frontendRelevance: "low",
    frontendNote: "最小覆盖子串Hard",
    description: `给你一个字符串 \`s\` 、一个字符串 \`t\`。返回 \`s\` 中涵盖 \`t\` 所有字符的最小子串。如果 \`s\` 中不存在涵盖 \`t\` 所有字符的子串，则返回空字符串 \`""\`。

**注意：**
- 对于 \`t\` 中重复字符，我们寻找的子字符串中该字符数量必须不少于 \`t\` 中该字符数量。
- 如果 \`s\` 中存在这样的子串，我们保证它是唯一的答案。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。
\`\`\`

**示例 3：**
\`\`\`
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
\`\`\``,
    constraints: `- \`m == s.length\`
- \`n == t.length\`
- \`1 <= m, n <= 10^5\`
- \`s\` 和 \`t\` 由英文字母组成

**进阶：** 你能设计一个在 O(m + n) 时间内解决此问题的算法吗？`,
    initialCode: `function minWindow(s, t) {
  // 在此处编写你的代码

}`,
    solution: `function minWindow(s, t) {
  if (s.length < t.length) return "";

  // 统计 t 中每个字符的数量
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map();
  let left = 0;
  let valid = 0; // 窗口中满足 need 条件的字符个数
  let start = 0;
  let minLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // 扩展窗口
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    // 收缩窗口
    while (valid === need.size) {
      // 更新最小覆盖子串
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      const d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { id: "2", name: "示例2", input: ["a", "a"], expected: "a" },
      { id: "3", name: "无解", input: ["a", "aa"], expected: "" },
      { id: "4", name: "相同字符串", input: ["abc", "abc"], expected: "abc" },
    ],
    hints: [
      "使用滑动窗口，维护一个包含 t 所有字符的窗口",
      "使用两个哈希表，一个记录需要的字符，一个记录窗口中的字符",
      "当窗口满足条件时，尝试收缩窗口并更新最小长度",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 双哈希表

1. 使用 need 哈希表统计 t 中每个字符的数量
2. 使用 window 哈希表统计当前窗口中的字符数量
3. 使用 valid 记录窗口中满足 need 条件的字符种类数
4. 右指针扩展窗口：
   - 如果当前字符在 need 中，加入 window
   - 如果该字符数量达到 need 的要求，valid++
5. 当 valid === need.size 时，窗口满足条件：
   - 更新最小覆盖子串
   - 左指针收缩窗口

### 关键点
- valid 记录的是"种类数"，不是"字符数"
- 只有当某个字符的数量恰好等于需要的数量时，才更新 valid
- 这样可以正确处理重复字符

### 复杂度分析
- 时间复杂度：O(m + n)，m 和 n 分别是 s 和 t 的长度
- 空间复杂度：O(k)，k 是字符集大小`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(k)",
    relatedProblems: ["longest-substring-without-repeating", "substring-with-concatenation"],
    solutions: [
      {
        name: "滑动窗口 + 双哈希表（推荐）",
        code: `/**
 * 最小覆盖子串 - 滑动窗口 + 双哈希表
 *
 * 核心思想：
 * 1. 用 need 哈希表记录 t 中每个字符需要的数量
 * 2. 用 window 哈希表记录当前窗口中的字符数量
 * 3. 用 valid 变量记录已满足要求的字符种类数
 *
 * 关键点：
 * - valid 记录的是"种类数"，不是"字符数"
 * - 只有当某个字符数量恰好等于需要的数量时，valid 才增加
 * - 这样可以正确处理 t 中有重复字符的情况
 *
 * 时间复杂度：O(m + n)，m 和 n 分别是 s 和 t 的长度
 * 空间复杂度：O(k)，k 是字符集大小
 */
function minWindow(s, t) {
  // 边界情况
  if (s.length < t.length) return "";

  // need: 记录 t 中每个字符需要的数量
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  // window: 记录当前窗口中的字符数量
  const window = new Map();
  let left = 0;           // 窗口左边界
  let valid = 0;          // 已满足要求的字符种类数
  let start = 0;          // 最小覆盖子串的起始位置
  let minLen = Infinity;  // 最小覆盖子串的长度

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // 扩展窗口：如果当前字符是需要的
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      // 当某个字符数量达到要求时，valid++
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    // 收缩窗口：当所有字符都满足要求时
    while (valid === need.size) {
      // 更新最小覆盖子串
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      // 准备移出左边界字符
      const d = s[left];
      left++;

      // 如果移出的字符是需要的
      if (need.has(d)) {
        // 如果移出后数量不再满足，valid--
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
        explanation: `## 滑动窗口 + 双哈希表

### 核心思想
维护两个哈希表：
- need：目标字符串 t 中每个字符需要的数量
- window：当前窗口中每个字符的数量

### 执行示例
s = "ADOBECODEBANC", t = "ABC"

初始：need = {A:1, B:1, C:1}, valid = 0

| right | char | window | valid | left | 结果 |
|-------|------|--------|-------|------|------|
| 0     | A    | {A:1}  | 1     | 0    | -    |
| 3     | B    | {A:1,B:1} | 2  | 0    | -    |
| 5     | C    | {A:1,B:1,C:1} | 3 | 0 | "ADOBEC" (6) |
| ...收缩... | | {B:1,C:1} | 2 | 1 | - |
| 10    | A    | {A:1,B:1,C:1} | 3 | 5 | - |
| ...   | ...  | ...    | ...   | ... | "BANC" (4) |

### 为什么 valid 记录种类数？
考虑 t = "AA"：
- 需要 2 个 A，not 2 种字符
- 只有当 window['A'] === 2 时，才算满足 A 的要求
- 所以 valid 记录的是"已满足要求的字符种类数"`,
        animation: {
          type: "two-pointers" as const,
          title: "最小覆盖子串演示",
          steps: [
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 0,
              right: 0,
              highlights: [],
              description: "s=\"ADOBECODEBANC\", t=\"ABC\"。需找包含ABC的最小子串",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "A" }],
              description: "right=0, 'A'在need中。window={A:1}, valid=1/3",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "green" as const },
                { indices: [3], color: "green" as const, label: "B" },
              ],
              description: "right=3, 'B'在need中。window={A:1,B:1}, valid=2/3",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0], color: "green" as const },
                { indices: [3], color: "green" as const },
                { indices: [5], color: "green" as const, label: "C" },
              ],
              description: "right=5, 'C'在need中。valid=3=need.size! 窗口满足",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0, 5], color: "yellow" as const },
                { indices: [1, 2, 3, 4], color: "blue" as const },
              ],
              description: "当前最小窗口: \"ADOBEC\"(长度6)。尝试收缩左边界",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 1,
              right: 5,
              highlights: [{ indices: [0], color: "red" as const, label: "移出A" }],
              description: "移出'A', valid=2<3，窗口不再满足，停止收缩",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 5,
              right: 10,
              highlights: [
                { indices: [5], color: "blue" as const },
                { indices: [9], color: "green" as const, label: "B" },
                { indices: [10], color: "green" as const, label: "A" },
              ],
              description: "继续扩展...right=10找到'A', valid=3再次满足",
            },
            {
              array: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"],
              left: 9,
              right: 12,
              highlights: [
                { indices: [9, 10], color: "green" as const },
                { indices: [11], color: "blue" as const },
                { indices: [12], color: "green" as const },
              ],
              description: "最终找到: \"BANC\"(长度4) ✓ 这是最小覆盖子串",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(k)",
      },
      {
        name: "计数器优化",
        code: `/**
 * 最小覆盖子串 - 计数器优化
 *
 * 核心思想：
 * 与双哈希表方法相同，但使用普通对象代替 Map
 * 代码更简洁，性能相近
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(k)，k 是字符集大小
 */
function minWindow(s, t) {
  // 使用对象记录 t 中字符的计数
  const count = {};
  for (const char of t) {
    count[char] = (count[char] || 0) + 1;
  }

  // required: t 中不同字符的数量
  let required = Object.keys(count).length;
  let left = 0;
  let formed = 0;     // 已满足的字符种类数
  let start = 0;      // 结果的起始位置
  let minLen = Infinity;

  // 窗口内字符计数
  const windowCounts = {};

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    // 更新窗口内字符计数
    windowCounts[c] = (windowCounts[c] || 0) + 1;

    // 如果当前字符数量满足要求
    if (count[c] && windowCounts[c] === count[c]) {
      formed++;
    }

    // 尝试收缩窗口
    while (formed === required) {
      // 更新最小覆盖子串
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        start = left;
      }

      // 移出左边界字符
      const d = s[left];
      windowCounts[d]--;
      // 如果移出后不再满足要求
      if (count[d] && windowCounts[d] < count[d]) {
        formed--;
      }
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
        explanation: `## 计数器优化

### 核心思想
使用普通对象代替 Map，逻辑与双哈希表方法相同。

### 变量说明
- count：目标字符串 t 中每个字符的计数
- required：t 中不同字符的数量（需要满足的种类数）
- formed：当前窗口中已满足条件的字符种类数
- windowCounts：当前窗口中每个字符的计数

### 代码简洁性
使用对象的 [] 访问语法更简洁：
- \`count[c]\` vs \`count.get(c)\`
- 不需要显式检查 undefined

### 注意事项
- 比较时使用 \`count[d] && ...\` 检查字符是否在 t 中
- 这避免了对不在 t 中的字符进行处理`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(k)",
      },
    ],
  },

  // 4. 串联所有单词的子串 (30)
  {
    id: "substring-with-concatenation",
    leetcodeId: 30,
    title: "串联所有单词的子串",
    titleEn: "Substring with Concatenation of All Words",
    difficulty: "hard",
    category: "sliding-window",
    tags: ["滑动窗口", "哈希表", "字符串"],
    frontendRelevance: "low",
    frontendNote: "串联所有单词Hard",
    description: `给定一个字符串 \`s\` 和一个字符串数组 \`words\`。\`words\` 中所有字符串 **长度相同**。

\`s\` 中的 **串联子串** 是指一个包含 \`words\` 中所有字符串以任意顺序排列连接起来的子串。

- 例如，如果 \`words = ["ab","cd","ef"]\`，那么 \`"abcdef"\`，\`"abefcd"\`，\`"cdabef"\`，\`"cdefab"\`，\`"efabcd"\`，和 \`"efcdab"\` 都是串联子串。\`"acdbef"\` 不是串联子串，因为他不是任何 \`words\` 排列的连接。

返回所有串联子串在 \`s\` 中的开始索引。你可以以 **任意顺序** 返回答案。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
输出顺序无关紧要。返回 [9,0] 也是可以的。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]
解释：因为 words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。
s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。
所以我们返回一个空数组。
\`\`\`

**示例 3：**
\`\`\`
输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
解释：因为 words.length == 3 并且 words[i].length == 3，所以串联子串的长度必须为 9。
子串 "foobarthe" 开始位置是 6。它是 words 中以 ["foo","bar","the"] 顺序排列的连接。
子串 "barthefoo" 开始位置是 9。它是 words 中以 ["bar","the","foo"] 顺序排列的连接。
子串 "thefoobar" 开始位置是 12。它是 words 中以 ["the","foo","bar"] 顺序排列的连接。
\`\`\``,
    constraints: `- \`1 <= s.length <= 10^4\`
- \`1 <= words.length <= 5000\`
- \`1 <= words[i].length <= 30\`
- \`words[i]\` 和 \`s\` 由小写英文字母组成`,
    initialCode: `function findSubstring(s, words) {
  // 在此处编写你的代码

}`,
    solution: `function findSubstring(s, words) {
  if (!s || !words.length) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const totalLen = wordLen * wordCount;
  const result = [];

  // 统计 words 中每个单词的数量
  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // 从 0 到 wordLen-1 开始滑动窗口
  for (let i = 0; i < wordLen; i++) {
    let left = i;
    let count = 0;
    const window = new Map();

    for (let right = i; right <= s.length - wordLen; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (wordMap.has(word)) {
        window.set(word, (window.get(word) || 0) + 1);
        count++;

        // 如果当前单词数量超过需要的数量，收缩窗口
        while (window.get(word) > wordMap.get(word)) {
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }

        // 如果窗口中包含所有单词
        if (count === wordCount) {
          result.push(left);
          // 移动左边界
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }
      } else {
        // 遇到不在 words 中的单词，重置窗口
        window.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["barfoothefoobarman", ["foo", "bar"]], expected: [0, 9] },
      { id: "2", name: "无解", input: ["wordgoodgoodgoodbestword", ["word", "good", "best", "word"]], expected: [] },
      { id: "3", name: "多个解", input: ["barfoofoobarthefoobarman", ["bar", "foo", "the"]], expected: [6, 9, 12] },
    ],
    hints: [
      "所有单词长度相同，可以将问题转化为滑动窗口",
      "从 0 到 wordLen-1 个起点分别进行滑动窗口",
      "使用哈希表统计窗口中每个单词的数量",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 哈希表

由于所有单词长度相同，可以将字符串按单词长度分组处理。

1. 统计 words 中每个单词的数量
2. 从 0 到 wordLen-1 个起点分别进行滑动窗口
3. 对于每个起点：
   - 右指针每次移动一个单词长度
   - 如果遇到有效单词，加入窗口
   - 如果某个单词数量超标，收缩窗口
   - 如果窗口包含所有单词，记录结果
   - 如果遇到无效单词，重置窗口

### 为什么需要多个起点？
- 单词长度为 wordLen，起点可以是 0, 1, ..., wordLen-1
- 例如 wordLen=3，起点为 0 时处理索引 0,3,6,9...
- 起点为 1 时处理索引 1,4,7,10...
- 这样可以覆盖所有可能的起始位置

### 复杂度分析
- 时间复杂度：O(n × wordLen)，n 是字符串长度
- 空间复杂度：O(m × wordLen)，m 是单词数量`,
    timeComplexity: "O(n × wordLen)",
    spaceComplexity: "O(m × wordLen)",
    relatedProblems: ["minimum-window-substring"],
    solutions: [
      {
        name: "滑动窗口（推荐）",
        code: `/**
 * 串联所有单词的子串 - 滑动窗口
 *
 * 核心思想：
 * 由于所有单词长度相同，可以将字符串按单词长度分组处理
 * 从 0 到 wordLen-1 个起点分别进行滑动窗口
 *
 * 为什么需要多个起点？
 * 单词长度为 wordLen，串联子串的起点可以是 0, 1, ..., wordLen-1
 * 例如 wordLen=3：
 * - 起点 0：处理索引 0,3,6,9...
 * - 起点 1：处理索引 1,4,7,10...
 * - 起点 2：处理索引 2,5,8,11...
 *
 * 时间复杂度：O(n × wordLen)，n 是字符串长度
 * 空间复杂度：O(m × wordLen)，m 是单词数量
 */
function findSubstring(s, words) {
  // 边界情况
  if (!s || !words.length) return [];

  const wordLen = words[0].length;  // 单词长度（都相同）
  const wordCount = words.length;   // 单词数量
  const totalLen = wordLen * wordCount;  // 串联子串的总长度
  const result = [];

  // 统计 words 中每个单词的数量
  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // 从 0 到 wordLen-1 个起点分别进行滑动窗口
  for (let i = 0; i < wordLen; i++) {
    let left = i;           // 窗口左边界
    let count = 0;          // 窗口内的单词数量
    const window = new Map();  // 窗口内的单词计数

    // 每次移动一个单词长度
    for (let right = i; right <= s.length - wordLen; right += wordLen) {
      // 取出当前单词
      const word = s.substring(right, right + wordLen);

      if (wordMap.has(word)) {
        // 当前单词是需要的，加入窗口
        window.set(word, (window.get(word) || 0) + 1);
        count++;

        // 如果当前单词数量超过需要的数量，收缩窗口
        while (window.get(word) > wordMap.get(word)) {
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }

        // 如果窗口包含所有单词
        if (count === wordCount) {
          result.push(left);
          // 移动左边界，继续寻找下一个
          const leftWord = s.substring(left, left + wordLen);
          window.set(leftWord, window.get(leftWord) - 1);
          count--;
          left += wordLen;
        }
      } else {
        // 遇到不在 words 中的单词，重置窗口
        window.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}`,
        explanation: `## 滑动窗口

### 核心思想
由于所有单词长度相同，可以按单词长度分组处理。

### 执行示例
s = "barfoothefoobarman", words = ["foo","bar"]
wordLen = 3, wordCount = 2

起点 0：处理索引 0,3,6,9,12,15
| right | 单词 | window | count | left | 结果 |
|-------|------|--------|-------|------|------|
| 0     | bar  | {bar:1}| 1     | 0    | -    |
| 3     | foo  | {bar:1,foo:1}| 2 | 0  | [0] (barfoo) |
| 6     | the  | 不在words，重置 | 0 | 9 | -  |
| 9     | foo  | {foo:1}| 1     | 9    | -    |
| 12    | bar  | {foo:1,bar:1}| 2 | 9  | [9] (foobar) |

### 为什么遇到无效单词要重置？
无效单词破坏了连续性，之前的窗口内容无法与后续单词组合。

### 时间复杂度分析
- 外层循环：wordLen 次
- 内层循环：n/wordLen 次
- 总时间：O(n)（但常数因子较大）`,
        animation: {
          type: "two-pointers" as const,
          title: "串联所有单词的子串演示",
          steps: [
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 0,
              right: 0,
              highlights: [],
              description: "s=\"barfoothefoobarman\", words=[\"foo\",\"bar\"]。每3字符为一词",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "bar" }],
              description: "起点0: right=0, 'bar'在words中。window={bar:1}, count=1",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const },
                { indices: [1], color: "green" as const, label: "foo" },
              ],
              description: "right=1, 'foo'在words中。count=2=wordCount! 找到位置0",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "yellow" as const },
                { indices: [1], color: "yellow" as const },
              ],
              description: "结果[0]: \"barfoo\" ✓ 是words的一种排列",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 1,
              right: 2,
              highlights: [{ indices: [2], color: "red" as const, label: "the" }],
              description: "right=2, 'the'不在words中！重置窗口，left=3",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "foo" }],
              description: "left=3: right=3, 'foo'在words中。window={foo:1}",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 3,
              right: 4,
              highlights: [
                { indices: [3], color: "green" as const },
                { indices: [4], color: "green" as const, label: "bar" },
              ],
              description: "right=4, 'bar'在words中。count=2! 找到位置9 (索引3×3)",
            },
            {
              array: ["bar", "foo", "the", "foo", "bar", "man"],
              left: 3,
              right: 4,
              highlights: [
                { indices: [3], color: "yellow" as const },
                { indices: [4], color: "yellow" as const },
              ],
              description: "结果[0,9]: \"foobar\" ✓ 完成！找到所有串联子串起始位置",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × wordLen)",
        spaceComplexity: "O(m × wordLen)",
      },
      {
        name: "暴力匹配",
        code: `/**
 * 串联所有单词的子串 - 暴力匹配
 *
 * 核心思想：
 * 对每个可能的起始位置，检查是否能匹配所有单词
 *
 * 时间复杂度：O(n × m × wordLen)
 * 空间复杂度：O(m × wordLen)
 */
function findSubstring(s, words) {
  // 边界情况
  if (!s || !words.length) return [];

  const wordLen = words[0].length;  // 单词长度
  const wordCount = words.length;   // 单词数量
  const totalLen = wordLen * wordCount;  // 串联子串总长度
  const result = [];

  // 统计 words 中每个单词的数量
  const wordMap = new Map();
  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // 遍历每个可能的起始位置
  for (let i = 0; i <= s.length - totalLen; i++) {
    // 记录当前窗口中看到的单词
    const seen = new Map();
    let j = 0;

    // 尝试匹配 wordCount 个单词
    while (j < wordCount) {
      // 取出第 j 个单词
      const word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);

      // 如果单词不在 words 中，直接失败
      if (!wordMap.has(word)) break;

      // 记录当前单词
      seen.set(word, (seen.get(word) || 0) + 1);

      // 如果当前单词数量超过需要的数量，失败
      if (seen.get(word) > wordMap.get(word)) break;

      j++;
    }

    // 如果成功匹配所有单词
    if (j === wordCount) {
      result.push(i);
    }
  }

  return result;
}`,
        explanation: `## 暴力匹配

### 核心思想
对每个可能的起始位置，检查从该位置开始的 totalLen 长度的子串是否是 words 的串联。

### 执行示例
s = "barfoothefoobarman", words = ["foo","bar"]

| 起点 i | 子串 | 单词1 | 单词2 | 结果 |
|--------|------|-------|-------|------|
| 0      | barfoo | bar ✓ | foo ✓ | [0] |
| 1      | arfoot | arf ✗ | -     | -   |
| 2      | rfooth | rfo ✗ | -     | -   |
| ...    | ...  | ...   | ...   | -   |
| 9      | foobar | foo ✓ | bar ✓ | [9] |

### 复杂度分析
- 遍历起点：O(n)
- 每个起点匹配 m 个单词：O(m)
- 每次截取单词：O(wordLen)
- 总时间：O(n × m × wordLen)

### 适用场景
- 代码简单直观
- 数据量不大时可以接受
- 作为验证其他算法的对照`,
        timeComplexity: "O(n × m × wordLen)",
        spaceComplexity: "O(m × wordLen)",
      },
    ],
  },

  // 5. 找到字符串中所有字母异位词 (438)
  {
    id: "find-all-anagrams-in-a-string",
    leetcodeId: 438,
    title: "找到字符串中所有字母异位词",
    titleEn: "Find All Anagrams in a String",
    difficulty: "medium",
    category: "sliding-window",
    tags: ["sliding-window", "hash-table", "string"],
    frontendRelevance: "medium",
    frontendNote: "滑动窗口+哈希",
    description: `给定两个字符串 \`s\` 和 \`p\`，找到 \`s\` 中所有 \`p\` 的 **异位词** 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

**异位词** 指由相同字母重排列形成的字符串（包括相同的字符串）。`,
    examples: `**示例 1:**
\`\`\`
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
\`\`\`

**示例 2:**
\`\`\`
输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
\`\`\``,
    constraints: `- \`1 <= s.length, p.length <= 3 * 10^4\`
- \`s\` 和 \`p\` 仅包含小写字母`,
    initialCode: `function findAnagrams(s, p) {
  // 在此处编写你的代码

}`,
    solution: `function findAnagrams(s, p) {
  const result = [];
  const sLen = s.length;
  const pLen = p.length;

  if (sLen < pLen) return result;

  const count = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  // 计算初始差异
  for (let i = 0; i < pLen; i++) {
    count[p.charCodeAt(i) - aCode]--;
    count[s.charCodeAt(i) - aCode]++;
  }

  // 统计差异数量
  let diff = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) diff++;
  }

  if (diff === 0) result.push(0);

  // 滑动窗口
  for (let i = pLen; i < sLen; i++) {
    const addIdx = s.charCodeAt(i) - aCode;
    const removeIdx = s.charCodeAt(i - pLen) - aCode;

    if (count[addIdx] === 0) diff++;
    count[addIdx]++;
    if (count[addIdx] === 0) diff--;

    if (count[removeIdx] === 0) diff++;
    count[removeIdx]--;
    if (count[removeIdx] === 0) diff--;

    if (diff === 0) result.push(i - pLen + 1);
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["cbaebabacd", "abc"], expected: [0, 6] },
      { id: "2", name: "示例2", input: ["abab", "ab"], expected: [0, 1, 2] },
      { id: "3", name: "无匹配", input: ["hello", "xyz"], expected: [] },
      { id: "4", name: "完全匹配", input: ["abc", "abc"], expected: [0] },
    ],
    hints: [
      "使用滑动窗口，窗口大小固定为 p 的长度",
      "维护窗口内字符频率与 p 的字符频率的差异",
      "当差异为 0 时，说明找到了一个异位词",
    ],
    explanation: `## 解题思路

### 滑动窗口 + 差异计数

1. 使用固定大小的滑动窗口（大小等于 p 的长度）
2. 维护窗口内字符频率与 p 的字符频率之间的差异
3. 使用 diff 变量记录有多少个字符的频率不同
4. 当 diff === 0 时，说明窗口内是 p 的异位词

### 关键点
- 使用数组代替哈希表存储字符频率，性能更好
- 通过增量更新 diff，避免每次都比较 26 个字符
- 窗口大小固定，每次移动只需 O(1) 操作`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "滑动窗口 + 数组计数",
        code: `/**
 * 找到字符串中所有字母异位词 - 滑动窗口 + 数组计数
 *
 * 核心思想：
 * 使用固定大小的滑动窗口（大小等于 p 的长度）
 * 维护窗口内字符的频率，与目标字符串 p 的字符频率比较
 *
 * 为什么用数组而不是哈希表？
 * 1. 数组访问是真正的 O(1)，不涉及哈希计算
 * 2. 只有 26 个小写字母，空间开销固定
 * 3. 比较两个数组是否相等更快
 *
 * 时间复杂度：O(n × 26) ≈ O(n)
 * 空间复杂度：O(1)，固定大小的数组
 */
function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  const sLen = s.length;
  const pLen = p.length;

  // 边界情况
  if (sLen < pLen) return result;

  // 使用数组存储字符频率（比哈希表更快）
  const pCount = new Array(26).fill(0);  // p 的字符频率
  const sCount = new Array(26).fill(0);  // 窗口的字符频率
  const aCode = 'a'.charCodeAt(0);

  // 初始化 p 的字符频率和 s 的第一个窗口
  for (let i = 0; i < pLen; i++) {
    pCount[p.charCodeAt(i) - aCode]++;
    sCount[s.charCodeAt(i) - aCode]++;
  }

  // 检查第一个窗口是否是异位词
  if (arraysEqual(pCount, sCount)) {
    result.push(0);
  }

  // 滑动窗口
  for (let i = pLen; i < sLen; i++) {
    // 添加新字符到窗口
    sCount[s.charCodeAt(i) - aCode]++;
    // 移除旧字符出窗口
    sCount[s.charCodeAt(i - pLen) - aCode]--;

    // 比较窗口和目标是否相同
    if (arraysEqual(pCount, sCount)) {
      result.push(i - pLen + 1);
    }
  }

  return result;
}

// 辅助函数：比较两个数组是否相等
function arraysEqual(a: number[], b: number[]): boolean {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}`,
        explanation: `## 滑动窗口 + 数组计数

### 核心思想
使用固定大小的滑动窗口，维护窗口内字符的频率。

### 执行示例
s = "cbaebabacd", p = "abc"

初始：pCount = [1,1,1,0,...] (a:1,b:1,c:1)

| 窗口 | sCount | 是否匹配 |
|------|--------|----------|
| cba  | [1,1,1,...] | ✓ 索引0 |
| bae  | [1,1,0,0,1,...] | ✗ |
| aeb  | [1,1,0,0,1,...] | ✗ |
| eba  | [1,1,0,0,1,...] | ✗ |
| bab  | [1,2,0,...] | ✗ |
| aba  | [2,1,0,...] | ✗ |
| bac  | [1,1,1,...] | ✓ 索引6 |
| acd  | [1,0,1,1,...] | ✗ |

### 复杂度分析
- 时间：O(n × 26) ≈ O(n)，每次窗口移动需要 O(26) 比较
- 空间：O(1)，只用固定大小的数组`,
        animation: {
          type: "two-pointers" as const,
          title: "找到字符串中所有字母异位词演示",
          steps: [
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 0,
              right: 2,
              highlights: [],
              description: "s=\"cbaebabacd\", p=\"abc\"。找所有p的异位词位置",
            },
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "c" },
                { indices: [1], color: "green" as const, label: "b" },
                { indices: [2], color: "green" as const, label: "a" },
              ],
              description: "窗口[0,2]=\"cba\"。count=[a:1,b:1,c:1]=pCount ✓ 找到索引0",
            },
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 1,
              right: 3,
              highlights: [
                { indices: [0], color: "blue" as const, label: "-c" },
                { indices: [3], color: "yellow" as const, label: "+e" },
              ],
              description: "窗口右移：移出c，加入e。\"bae\"含e不含c，不匹配",
            },
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 4,
              right: 6,
              highlights: [
                { indices: [4], color: "yellow" as const },
                { indices: [5], color: "yellow" as const },
                { indices: [6], color: "yellow" as const },
              ],
              description: "窗口[4,6]=\"bab\"。count=[a:1,b:2,c:0]，b多了，不匹配",
            },
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 6,
              right: 8,
              highlights: [
                { indices: [6], color: "green" as const, label: "b" },
                { indices: [7], color: "green" as const, label: "a" },
                { indices: [8], color: "green" as const, label: "c" },
              ],
              description: "窗口[6,8]=\"bac\"。count=[a:1,b:1,c:1]=pCount ✓ 找到索引6",
            },
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 7,
              right: 9,
              highlights: [
                { indices: [7], color: "yellow" as const },
                { indices: [8], color: "yellow" as const },
                { indices: [9], color: "yellow" as const, label: "+d" },
              ],
              description: "窗口[7,9]=\"acd\"。含d不含b，不匹配。遍历结束",
            },
            {
              array: ["c", "b", "a", "e", "b", "a", "b", "a", "c", "d"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const },
                { indices: [1], color: "green" as const },
                { indices: [2], color: "green" as const },
                { indices: [6], color: "green" as const },
                { indices: [7], color: "green" as const },
                { indices: [8], color: "green" as const },
              ],
              description: "结果: [0, 6] ✓ \"cba\"和\"bac\"都是\"abc\"的异位词",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "滑动窗口 + 差异计数优化",
        code: `/**
 * 找到字符串中所有字母异位词 - 差异计数优化
 *
 * 核心思想：
 * 维护一个差异计数器 diff，记录有多少个字符的频率不匹配
 * 当 diff === 0 时，说明是异位词
 *
 * 优化点：
 * 避免每次都比较 26 个字符的频率
 * 只在字符频率变化时更新 diff
 *
 * 时间复杂度：O(n)，每次窗口移动只需 O(1) 操作
 * 空间复杂度：O(1)，固定大小的数组
 */
function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  const sLen = s.length;
  const pLen = p.length;

  if (sLen < pLen) return result;

  // count[i] = sCount[i] - pCount[i]
  // 表示窗口内字符 i 的数量与 p 中字符 i 数量的差值
  const count = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  // 计算初始差异
  for (let i = 0; i < pLen; i++) {
    count[p.charCodeAt(i) - aCode]--;  // p 中的字符需要被匹配（减）
    count[s.charCodeAt(i) - aCode]++;  // s 中的字符提供匹配（加）
  }

  // 统计有多少个字符的频率不同
  let diff = 0;
  for (let i = 0; i < 26; i++) {
    if (count[i] !== 0) diff++;
  }

  // 如果第一个窗口就是异位词
  if (diff === 0) result.push(0);

  // 滑动窗口
  for (let i = pLen; i < sLen; i++) {
    const addIdx = s.charCodeAt(i) - aCode;        // 新加入的字符
    const removeIdx = s.charCodeAt(i - pLen) - aCode;  // 移出的字符

    // 处理新加入的字符
    if (count[addIdx] === 0) diff++;  // 原本平衡，加入后不平衡
    count[addIdx]++;
    if (count[addIdx] === 0) diff--;  // 加入后刚好平衡

    // 处理移出的字符
    if (count[removeIdx] === 0) diff++;  // 原本平衡，移出后不平衡
    count[removeIdx]--;
    if (count[removeIdx] === 0) diff--;  // 移出后刚好平衡

    // 检查是否是异位词
    if (diff === 0) result.push(i - pLen + 1);
  }

  return result;
}`,
        explanation: `## 滑动窗口 + 差异计数优化

### 核心思想
不再每次比较 26 个字符，而是维护差异计数器。

### 差异计数的逻辑
count[i] 表示：窗口内字符 i 的数量 - p 中字符 i 的数量
- count[i] = 0：该字符频率匹配
- count[i] ≠ 0：该字符频率不匹配

diff 表示：有多少个字符的 count 不为 0

### 更新 diff 的关键
当某个字符的 count 值变化时：
1. 从 0 变为非 0：diff++（新增一个不匹配）
2. 从非 0 变为 0：diff--（减少一个不匹配）

### 执行示例
s = "cbaebabacd", p = "abc"

初始 count: [0,0,0,0,...] (p和s的第一个窗口恰好匹配)
diff = 0 → 找到索引 0

### 优化效果
- 时间：O(n)，真正的线性时间
- 每次移动窗口只需 O(1) 操作`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "滑动窗口 + 哈希表",
        code: `/**
 * 找到字符串中所有字母异位词 - 滑动窗口 + 哈希表
 *
 * 核心思想：
 * 使用哈希表记录需要匹配的字符及其频率
 * 通过 valid 变量记录已满足条件的字符种类数
 *
 * 与最小覆盖子串的区别：
 * - 窗口大小固定为 pLen
 * - 不需要收缩窗口找最小，而是精确匹配
 *
 * 时间复杂度：O(n)，每个字符最多进出窗口一次
 * 空间复杂度：O(k)，k 为字符集大小
 */
function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];
  const sLen = s.length;
  const pLen = p.length;

  if (sLen < pLen) return result;

  // 统计 p 中字符频率
  const need = new Map<string, number>();
  for (const c of p) {
    need.set(c, (need.get(c) || 0) + 1);
  }

  // 窗口内字符频率
  const window = new Map<string, number>();
  let valid = 0;  // 已满足的字符种类数
  let left = 0;

  for (let right = 0; right < sLen; right++) {
    const c = s[right];

    // 扩大窗口
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      // 当某字符数量满足要求时，valid++
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    // 当窗口大小等于 p 的长度时
    while (right - left + 1 >= pLen) {
      // 判断是否找到异位词
      if (valid === need.size) {
        result.push(left);
      }

      // 缩小窗口
      const d = s[left];
      left++;

      if (need.has(d)) {
        // 如果移出后不再满足要求，valid--
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d)! - 1);
      }
    }
  }

  return result;
}`,
        explanation: `## 滑动窗口 + 哈希表

### 核心思想
使用哈希表维护字符频率，valid 记录已满足条件的字符种类数。

### 与数组方法对比
| 特性 | 数组方法 | 哈希表方法 |
|------|---------|-----------|
| 查找速度 | O(1) 真正常数 | O(1) 平均 |
| 空间 | O(26) | O(k) |
| 通用性 | 仅小写字母 | 任意字符 |

### 代码复用
这个模式与"最小覆盖子串"几乎相同：
- 使用 need 和 window 两个哈希表
- 使用 valid 记录满足条件的字符种类数
- 区别只在于窗口大小固定

### 适用场景
- 字符集较大或不确定时
- 需要处理 Unicode 字符时`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
      },
    ],
  },

  // 6. 滑动窗口最大值 (239)
  {
    id: "sliding-window-maximum",
    leetcodeId: 239,
    title: "滑动窗口最大值",
    titleEn: "Sliding Window Maximum",
    difficulty: "hard",
    category: "sliding-window",
    tags: ["数组", "队列", "滑动窗口", "单调队列", "堆"],
    frontendRelevance: "low",
    frontendNote: "滑动窗口最大值Hard",
    description: `给你一个整数数组 \`nums\`，有一个大小为 \`k\` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 \`k\` 个数字。滑动窗口每次只向右移动一位。

返回 **滑动窗口中的最大值**。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1], k = 1
输出：[1]
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= k <= nums.length\``,
    initialCode: `function maxSlidingWindow(nums, k) {
  // 在此处编写你的代码

}`,
    solution: `function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // 存储索引，保持对应值单调递减

  for (let i = 0; i < nums.length; i++) {
    // 移除队列中所有小于当前元素的值
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 移除超出窗口范围的元素
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // 当窗口形成后，记录最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
      { id: "2", name: "单元素", input: [[1], 1], expected: [1] },
      { id: "3", name: "递减", input: [[9,8,7,6,5], 3], expected: [9,8,7] },
      { id: "4", name: "递增", input: [[1,2,3,4,5], 3], expected: [3,4,5] },
    ],
    hints: [
      "使用单调队列（双端队列）",
      "队列中存储索引，保持对应值单调递减",
      "队首元素就是当前窗口的最大值",
    ],
    explanation: `## 解题思路

### 单调队列

1. 使用双端队列，存储元素索引
2. 保持队列中的元素对应的值**单调递减**
3. 队首元素始终是当前窗口的最大值

### 操作步骤
1. 遍历数组，对于每个新元素：
   - 移除队尾所有小于当前元素的索引
   - 将当前索引加入队尾
   - 移除队首超出窗口范围的索引
   - 如果窗口已形成，记录队首对应的值

### 复杂度分析
- 时间复杂度：O(n)，每个元素最多入队出队一次
- 空间复杂度：O(k)，队列最多存储 k 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    relatedProblems: ["minimum-window-substring", "longest-substring-without-repeating-characters"],
    solutions: [
      {
        name: "单调队列（推荐）",
        code: `/**
 * 滑动窗口最大值 - 单调队列
 *
 * 核心思想：
 * 维护一个单调递减的双端队列，队首元素始终是当前窗口的最大值
 *
 * 为什么可以移除比当前元素小的元素？
 * 因为这些较小的元素：
 * 1. 不可能成为当前窗口的最大值（当前元素更大）
 * 2. 不可能成为后续窗口的最大值（它们会先于当前元素离开窗口）
 *
 * 为什么存储索引而非值？
 * 方便判断队首元素是否已经超出窗口范围
 *
 * 时间复杂度：O(n)，每个元素最多入队出队一次
 * 空间复杂度：O(k)，队列最多存储 k 个元素
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  // 双端队列：存储索引，保持对应值单调递减
  const deque = [];

  for (let i = 0; i < nums.length; i++) {
    // 步骤1：移除队尾所有比当前元素小的索引
    // 因为它们不可能成为任何后续窗口的最大值
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // 步骤2：将当前索引加入队尾
    deque.push(i);

    // 步骤3：移除队首超出窗口范围的索引
    // 当队首索引 <= i - k 时，说明它已不在窗口内
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // 步骤4：当窗口形成后（i >= k-1），记录最大值
    // 队首元素对应的值就是当前窗口的最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}`,
        explanation: `## 单调队列

### 核心思想
维护一个**单调递减**的双端队列：
- 队首始终是当前窗口的最大值
- 新元素入队前，移除所有比它小的元素

### 执行示例
nums = [1,3,-1,-3,5,3,6,7], k = 3

| i | nums[i] | 操作 | deque(索引) | deque(值) | 结果 |
|---|---------|------|-------------|-----------|------|
| 0 | 1       | push | [0]         | [1]       | -    |
| 1 | 3       | pop,push | [1]     | [3]       | -    |
| 2 | -1      | push | [1,2]       | [3,-1]    | 3    |
| 3 | -3      | push | [1,2,3]     | [3,-1,-3] | 3    |
| 4 | 5       | pop×3,push,shift | [4] | [5]   | 5    |
| 5 | 3       | push | [4,5]       | [5,3]     | 5    |
| 6 | 6       | pop×2,push | [6]   | [6]       | 6    |
| 7 | 7       | pop,push | [7]     | [7]       | 7    |

### 为什么是 O(n)？
虽然有嵌套的 while 循环，但每个元素最多入队一次、出队一次，总操作数 ≤ 2n。

### 队列存储索引的好处
1. 可以判断元素是否超出窗口范围
2. 通过索引可以获取对应的值`,
        animation: {
          type: "two-pointers" as const,
          title: "滑动窗口最大值演示",
          steps: [
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 0,
              right: 2,
              highlights: [],
              description: "nums=[1,3,-1,-3,5,3,6,7], k=3。用单调递减队列维护最大值",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "1" }],
              description: "i=0: push(0)。deque=[0](值:[1])",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "red" as const, label: "pop" },
                { indices: [1], color: "green" as const, label: "3" },
              ],
              description: "i=1: 3>1，pop(0)，push(1)。deque=[1](值:[3])",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 0,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "max" },
                { indices: [2], color: "yellow" as const, label: "-1" },
              ],
              description: "i=2: -1<3，push(2)。deque=[1,2]。窗口形成，max=3",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 1,
              right: 3,
              highlights: [
                { indices: [1], color: "green" as const, label: "max" },
                { indices: [3], color: "yellow" as const, label: "-3" },
              ],
              description: "i=3: -3<-1，push(3)。deque=[1,2,3]。max=3",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 2,
              right: 4,
              highlights: [
                { indices: [1], color: "red" as const },
                { indices: [2], color: "red" as const },
                { indices: [3], color: "red" as const },
                { indices: [4], color: "green" as const, label: "5=max" },
              ],
              description: "i=4: 5>所有，pop三个，push(4)。deque=[4]。max=5",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 3,
              right: 5,
              highlights: [
                { indices: [4], color: "green" as const, label: "max" },
                { indices: [5], color: "yellow" as const, label: "3" },
              ],
              description: "i=5: 3<5，push(5)。deque=[4,5]。max=5",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 4,
              right: 6,
              highlights: [{ indices: [6], color: "green" as const, label: "6=max" }],
              description: "i=6: 6>5,3，pop两个。deque=[6]。max=6",
            },
            {
              array: [1, 3, -1, -3, 5, 3, 6, 7],
              left: 5,
              right: 7,
              highlights: [{ indices: [7], color: "green" as const, label: "7=max" }],
              description: "i=7: 7>6，pop。deque=[7]。max=7。结果:[3,3,5,5,6,7] ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
      },
      {
        name: "分块 + 预处理",
        code: `/**
 * 滑动窗口最大值 - 分块预处理
 *
 * 核心思想：
 * 将数组分成大小为 k 的块，预处理两个数组：
 * - left[i]: 从块起点到 i 的最大值
 * - right[i]: 从 i 到块终点的最大值
 *
 * 对于窗口 [i, i+k-1]，最大值 = max(right[i], left[i+k-1])
 *
 * 为什么这样是对的？
 * 窗口 [i, i+k-1] 可能跨越最多两个块
 * right[i] 覆盖了从 i 到其所在块末尾的最大值
 * left[i+k-1] 覆盖了从新块起点到 i+k-1 的最大值
 * 两者的最大值就是整个窗口的最大值
 *
 * 时间复杂度：O(n)，预处理 O(n)，遍历 O(n)
 * 空间复杂度：O(n)，两个辅助数组
 */
function maxSlidingWindow(nums, k) {
  const n = nums.length;
  if (n === 0 || k === 0) return [];

  // left[i]: 从块起点到 i 的最大值
  const left = new Array(n);
  // right[i]: 从 i 到块终点的最大值
  const right = new Array(n);

  for (let i = 0; i < n; i++) {
    // 处理从左到右的最大值
    if (i % k === 0) {
      // 块的起点，重新开始
      left[i] = nums[i];
    } else {
      // 继承之前的最大值
      left[i] = Math.max(left[i - 1], nums[i]);
    }

    // 处理从右到左的最大值
    const j = n - 1 - i;
    if ((j + 1) % k === 0 || j === n - 1) {
      // 块的终点，重新开始
      right[j] = nums[j];
    } else {
      // 继承之后的最大值
      right[j] = Math.max(right[j + 1], nums[j]);
    }
  }

  // 计算每个窗口的最大值
  const result = [];
  for (let i = 0; i <= n - k; i++) {
    // 窗口 [i, i+k-1] 的最大值
    result.push(Math.max(right[i], left[i + k - 1]));
  }

  return result;
}`,
        explanation: `## 分块 + 预处理

### 核心思想
将数组分成大小为 k 的块，利用预处理快速求出任意窗口的最大值。

### 预处理示例
nums = [1,3,-1,-3,5,3,6,7], k = 3

分块：[1,3,-1] | [-3,5,3] | [6,7]

| i | left[i] | right[i] |
|---|---------|----------|
| 0 | 1       | 3        |
| 1 | 3       | 3        |
| 2 | 3       | -1       |
| 3 | -3      | 5        |
| 4 | 5       | 5        |
| 5 | 5       | 3        |
| 6 | 6       | 7        |
| 7 | 7       | 7        |

### 查询示例
窗口 [1,3]（即 3,-1,-3）：
max(right[1], left[3]) = max(3, -3) = 3 ✓

窗口 [4,6]（即 5,3,6）：
max(right[4], left[6]) = max(5, 6) = 6 ✓

### 特点
- 无需复杂数据结构
- 代码易于理解和实现
- 空间换时间的思路`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "暴力解法",
        code: `/**
 * 滑动窗口最大值 - 暴力解法
 *
 * 核心思想：
 * 对于每个窗口位置，直接遍历窗口内的所有元素找最大值
 *
 * 时间复杂度：O(n × k)，n 个窗口，每个窗口 k 个元素
 * 空间复杂度：O(1)，只用常数变量
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const n = nums.length;

  // 遍历每个窗口的起始位置
  for (let i = 0; i <= n - k; i++) {
    // 在当前窗口中找最大值
    let max = nums[i];
    for (let j = i + 1; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    result.push(max);
  }

  return result;
}`,
        explanation: `## 暴力解法

### 核心思想
最直接的方法：对每个窗口位置，遍历窗口内所有元素找最大值。

### 执行示例
nums = [1,3,-1,-3,5,3,6,7], k = 3

| 窗口 | 元素 | 最大值 |
|------|------|--------|
| [0,2] | 1,3,-1 | 3 |
| [1,3] | 3,-1,-3 | 3 |
| [2,4] | -1,-3,5 | 5 |
| [3,5] | -3,5,3 | 5 |
| [4,6] | 5,3,6 | 6 |
| [5,7] | 3,6,7 | 7 |

### 复杂度分析
- 窗口数量：n - k + 1
- 每个窗口需要 k 次比较
- 总时间：O((n-k+1) × k) ≈ O(n × k)

### 适用场景
- k 很小时可以接受
- 作为对照验证其他算法的正确性
- 理解问题的基础解法`,
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
