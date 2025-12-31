import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const intervalProblems: Problem[] = [
  // 1. 汇总区间 (228)
  {
    id: "summary-ranges",
    leetcodeId: 228,
    title: "汇总区间",
    titleEn: "Summary Ranges",
    difficulty: "easy",
    category: "intervals",
    tags: ["数组"],
    frontendRelevance: "low",
    frontendNote: "汇总区间",
    description: `给定一个 **无重复元素** 的 **有序** 整数数组 \`nums\`。

返回 **恰好覆盖数组中所有数字** 的 **最小有序** 区间范围列表。也就是说，\`nums\` 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 \`nums\` 的数字 \`x\`。

列表中的每个区间范围 \`[a,b]\` 应该按如下格式输出：
- \`"a->b"\`，如果 \`a != b\`
- \`"a"\`，如果 \`a == b\``,
    examples: `**示例 1：**
\`\`\`
输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]
解释：区间范围是：
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,2,3,4,6,8,9]
输出：["0","2->4","6","8->9"]
解释：区间范围是：
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
\`\`\``,
    constraints: `- \`0 <= nums.length <= 20\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- \`nums\` 中的所有值都 **互不相同**
- \`nums\` 按升序排列`,
    initialCode: `function summaryRanges(nums) {
  // 在此处编写你的代码

}`,
    solution: `function summaryRanges(nums) {
  const result = [];
  let i = 0;

  while (i < nums.length) {
    const start = nums[i];

    // 找到连续区间的末尾
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }

    // 生成区间字符串
    if (start === nums[i]) {
      result.push(String(start));
    } else {
      result.push(\`\${start}->\${nums[i]}\`);
    }

    i++;
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[0, 1, 2, 4, 5, 7]], expected: ["0->2", "4->5", "7"] },
      { id: "2", name: "示例2", input: [[0, 2, 3, 4, 6, 8, 9]], expected: ["0", "2->4", "6", "8->9"] },
      { id: "3", name: "空数组", input: [[]], expected: [] },
      { id: "4", name: "单元素", input: [[-1]], expected: ["-1"] },
    ],
    hints: [
      "遍历数组，记录每个区间的起点",
      "当下一个数不连续时，结束当前区间",
      "根据起点和终点是否相同，生成不同格式的字符串",
    ],
    explanation: `## 解题思路

### 一次遍历

1. 遍历数组，记录区间起点
2. 继续遍历直到找到不连续的位置
3. 生成区间字符串并加入结果

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)（不计输出）`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["merge-intervals", "insert-interval"],
    solutions: [
      {
        name: "一次遍历（推荐）",
        code: `/**
 * 汇总区间 - 一次遍历法
 *
 * 核心思想：遍历数组，找出所有连续的数字序列并格式化为区间
 *
 * 连续区间判定：nums[i+1] === nums[i] + 1
 *
 * 输出格式：
 * - 单个数字："a"
 * - 连续区间："a->b"
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，不计输出
 */
function summaryRanges(nums) {
  const result = [];
  let i = 0;

  /**
   * 遍历数组，找出所有连续区间
   *
   * 示例：nums = [0,1,2,4,5,7]
   *
   * 第一轮：
   *   start = 0
   *   内循环：i=0 → 1(连续) → 2(连续) → 停止(4≠3)
   *   i=2, nums[i]=2
   *   start(0) ≠ nums[i](2)，输出 "0->2"
   *   i++, i=3
   *
   * 第二轮：
   *   start = 4
   *   内循环：i=3 → 4(连续) → 停止(7≠6)
   *   i=4, nums[i]=5
   *   start(4) ≠ nums[i](5)，输出 "4->5"
   *   i++, i=5
   *
   * 第三轮：
   *   start = 7
   *   内循环：停止(没有下一个元素)
   *   start(7) === nums[i](7)，输出 "7"
   *   i++, i=6, 退出外循环
   *
   * 结果：["0->2", "4->5", "7"]
   */
  while (i < nums.length) {
    // 记录区间起点
    const start = nums[i];

    // 找到连续区间的末尾
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
      i++;
    }

    // 生成区间字符串
    if (start === nums[i]) {
      // 单个数字
      result.push(String(start));
    } else {
      // 连续区间
      result.push(\`\${start}->\${nums[i]}\`);
    }

    i++;
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "汇总区间演示",
          steps: [
            {
              array: ["0", "1", "2", "4", "5", "7"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "起点" }],
              description: "nums=[0,1,2,4,5,7]。从0开始找连续区间",
            },
            {
              array: ["0", "1", "2", "4", "5", "7"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "连续" }],
              description: "0→1→2 连续。4不连续，区间结束。生成\"0->2\"",
            },
            {
              array: ["0", "1", "2", "4", "5", "7"],
              left: 3,
              right: 4,
              highlights: [{ indices: [3, 4], color: "blue" as const, label: "连续" }],
              description: "4→5 连续。7不连续，区间结束。生成\"4->5\"",
            },
            {
              array: ["0", "1", "2", "4", "5", "7"],
              left: 5,
              right: 5,
              highlights: [{ indices: [5], color: "red" as const, label: "单独" }],
              description: "7 单独一个。生成\"7\"",
            },
            {
              array: ["0->2", "4->5", "7"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "遍历完成。结果=[\"0->2\",\"4->5\",\"7\"]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 一次遍历

### 思路
1. 遍历数组，记录区间起点
2. 继续遍历直到找到不连续的位置
3. 生成区间字符串并加入结果

### 示例
nums = [0,1,2,4,5,7]
- 从 0 开始，连续到 2，生成 "0->2"
- 从 4 开始，连续到 5，生成 "4->5"
- 7 单独一个，生成 "7"`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "双指针",
        animation: {
          type: "two-pointers" as const,
          title: "双指针汇总区间演示",
          steps: [
            {
              array: ["0", "2", "3", "4", "6", "8", "9"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "blue" as const, label: "left" },
              ],
              description: "nums=[0,2,3,4,6,8,9]。left指向区间起点",
            },
            {
              array: ["0", "2", "3", "4", "6", "8", "9"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "'0'" },
              ],
              description: "0不连续(0+1≠2)，单独区间'0'。left移到1",
            },
            {
              array: ["0", "2", "3", "4", "6", "8", "9"],
              left: 1,
              right: 3,
              highlights: [
                { indices: [1, 2, 3], color: "green" as const, label: "'2->4'" },
              ],
              description: "2,3,4连续，right扩展到4。生成'2->4'",
            },
            {
              array: ["'0'", "'2->4'", "'6'", "'8->9'"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "结果" },
              ],
              description: "继续处理得：['0','2->4','6','8->9']",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 汇总区间 - 双指针法
 *
 * 核心思想：使用 left 和 right 两个指针分别标记区间的起点和终点
 *
 * 指针职责：
 * - left：标记当前区间的起点
 * - right：从 left 出发，向右扩展找到连续区间的终点
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，不计输出
 */
function summaryRanges(nums) {
  const result = [];
  // left 指向区间起点
  let left = 0;

  /**
   * 遍历数组，找出所有连续区间
   *
   * 示例：nums = [0,2,3,4,6,8,9]
   *
   * 第一轮：
   *   left = 0, right = 0
   *   内循环：nums[1](2) ≠ nums[0](0)+1，停止
   *   left(0) === right(0)，输出 "0"
   *   left = 0 + 1 = 1
   *
   * 第二轮：
   *   left = 1, right = 1
   *   内循环：right=1 → 2(3=2+1) → 3(4=3+1) → 停止(6≠5)
   *   right = 3
   *   left(1) ≠ right(3)，输出 "2->4"
   *   left = 3 + 1 = 4
   *
   * 第三轮：
   *   left = 4, right = 4
   *   内循环：nums[5](8) ≠ nums[4](6)+1，停止
   *   left(4) === right(4)，输出 "6"
   *   left = 4 + 1 = 5
   *
   * 第四轮：
   *   left = 5, right = 5
   *   内循环：right=5 → 6(9=8+1) → 停止(越界)
   *   right = 6
   *   left(5) ≠ right(6)，输出 "8->9"
   *   left = 6 + 1 = 7, 退出外循环
   *
   * 结果：["0", "2->4", "6", "8->9"]
   */
  while (left < nums.length) {
    // right 从 left 开始，向右扩展
    let right = left;

    // 找到连续区间的右边界
    while (right + 1 < nums.length && nums[right + 1] === nums[right] + 1) {
      right++;
    }

    // 生成区间字符串
    if (left === right) {
      // 单个数字：left 和 right 指向同一位置
      result.push(String(nums[left]));
    } else {
      // 连续区间：left 到 right
      result.push(\`\${nums[left]}->\${nums[right]}\`);
    }

    // left 跳到下一个区间的起点
    left = right + 1;
  }

  return result;
}`,
        explanation: `## 双指针

### 思路
使用 left 和 right 两个指针：
1. left 指向区间起点
2. right 向右移动找到连续区间终点
3. 生成区间后，left 移动到 right+1

### 特点
- 思路更清晰
- 变量命名更直观`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 2. 合并区间 (56)
  {
    id: "merge-intervals",
    leetcodeId: 56,
    title: "合并区间",
    titleEn: "Merge Intervals",
    difficulty: "medium",
    category: "intervals",
    tags: ["数组", "排序"],
    frontendRelevance: "medium",
    frontendNote: "区间合并",
    description: `以数组 \`intervals\` 表示若干个区间的集合，其中单个区间为 \`intervals[i] = [starti, endi]\`。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。`,
    examples: `**示例 1：**
\`\`\`
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
\`\`\`

**示例 2：**
\`\`\`
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
\`\`\``,
    constraints: `- \`1 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti <= endi <= 10^4\``,
    initialCode: `function merge(intervals) {
  // 在此处编写你的代码

}`,
    solution: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // 按起点排序
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      // 有重叠，合并
      last[1] = Math.max(last[1], current[1]);
    } else {
      // 无重叠，添加新区间
      result.push(current);
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { id: "2", name: "示例2", input: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { id: "3", name: "无重叠", input: [[[1, 2], [3, 4]]], expected: [[1, 2], [3, 4]] },
      { id: "4", name: "完全重叠", input: [[[1, 4], [2, 3]]], expected: [[1, 4]] },
    ],
    hints: [
      "先按区间起点排序",
      "遍历时，如果当前区间与上一个重叠，则合并",
      "合并时取两个区间终点的较大值",
    ],
    explanation: `## 解题思路

### 排序 + 一次遍历

1. 按区间起点排序
2. 遍历区间：
   - 如果当前区间的起点 <= 上一个区间的终点，说明重叠
   - 合并：更新终点为两者的较大值
   - 否则：添加新区间

### 复杂度分析
- 时间复杂度：O(n log n)，排序
- 空间复杂度：O(log n)，排序栈空间`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["summary-ranges", "insert-interval"],
    solutions: [
      {
        name: "排序 + 一次遍历（推荐）",
        code: `/**
 * 合并区间 - 排序 + 一次遍历法
 *
 * 核心思想：先按起点排序，然后遍历区间，合并重叠的区间
 *
 * 重叠判定：当前区间的起点 <= 上一个区间的终点
 * 合并操作：更新终点为两者的较大值
 *
 * 时间复杂度：O(n log n)，排序主导
 * 空间复杂度：O(log n)，排序的栈空间
 */
function merge(intervals) {
  // 边界处理：0个或1个区间无需合并
  if (intervals.length <= 1) return intervals;

  // 按起点升序排序
  // 排序后，相邻的区间如果有重叠，一定是连续的
  intervals.sort((a, b) => a[0] - b[0]);

  // 初始化结果数组，放入第一个区间
  const result = [intervals[0]];

  /**
   * 遍历合并区间
   *
   * 示例：intervals = [[1,3],[2,6],[8,10],[15,18]]
   * 排序后已有序
   *
   * 初始：result = [[1,3]]
   *
   * i=1: current=[2,6], last=[1,3]
   *      2 <= 3 (重叠)
   *      合并：last[1] = max(3,6) = 6
   *      result = [[1,6]]
   *
   * i=2: current=[8,10], last=[1,6]
   *      8 > 6 (不重叠)
   *      添加：result.push([8,10])
   *      result = [[1,6],[8,10]]
   *
   * i=3: current=[15,18], last=[8,10]
   *      15 > 10 (不重叠)
   *      添加：result.push([15,18])
   *      result = [[1,6],[8,10],[15,18]]
   */
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      // 有重叠：合并区间，取终点的较大值
      last[1] = Math.max(last[1], current[1]);
    } else {
      // 无重叠：添加新区间
      result.push(current);
    }
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "合并区间演示",
          steps: [
            {
              array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 3,
              highlights: [],
              description: "intervals=[[1,3],[2,6],[8,10],[15,18]]。按起点排序（已排序）",
            },
            {
              array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "重叠" }],
              description: "[1,3]和[2,6]：2<=3重叠。合并为[1,6]",
            },
            {
              array: ["[1,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "已合并" },
                { indices: [1], color: "blue" as const, label: "检查" },
              ],
              description: "[1,6]和[8,10]：8>6不重叠。保持独立",
            },
            {
              array: ["[1,6]", "[8,10]", "[15,18]"],
              left: 1,
              right: 2,
              highlights: [{ indices: [2], color: "blue" as const, label: "检查" }],
              description: "[8,10]和[15,18]：15>10不重叠。保持独立",
            },
            {
              array: ["[1,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "完成！结果=[[1,6],[8,10],[15,18]]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 排序 + 一次遍历

### 思路
1. 按区间起点排序
2. 遍历区间：
   - 如果当前区间的起点 <= 上一个区间的终点，说明重叠
   - 合并：更新终点为两者的较大值
   - 否则：添加新区间

### 示例
[[1,3],[2,6],[8,10],[15,18]]
排序后已有序
- [1,3] 加入结果
- [2,6] 与 [1,3] 重叠，合并为 [1,6]
- [8,10] 不重叠，加入
- [15,18] 不重叠，加入`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "按终点排序",
        animation: {
          type: "two-pointers" as const,
          title: "按终点排序演示",
          steps: [
            {
              array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "blue" as const, label: "区间" },
              ],
              description: "按终点排序后，从右往左处理",
            },
            {
              array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
              left: 3,
              right: 3,
              highlights: [
                { indices: [3], color: "green" as const, label: "加入" },
              ],
              description: "[15,18]加入结果。继续向左",
            },
            {
              array: ["[1,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "yellow" as const, label: "合并" },
              ],
              description: "[1,3]和[2,6]重叠，合并为[1,6]",
            },
            {
              array: ["[1,6]", "[8,10]", "[15,18]"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "结果" },
              ],
              description: "最终结果：[[1,6],[8,10],[15,18]]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 合并区间 - 按终点排序法
 *
 * 核心思想：按终点排序，从后往前遍历，合并重叠的区间
 *
 * 与按起点排序的区别：
 * - 按起点排序：从左往右处理，终点取 max
 * - 按终点排序：从右往左处理，起点取 min
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(log n)
 */
function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // 按终点升序排序
  intervals.sort((a, b) => a[1] - b[1]);

  const result = [];
  // 从最后一个区间开始（终点最大）
  let current = intervals[intervals.length - 1];

  /**
   * 从后往前遍历
   *
   * 示例：intervals = [[1,3],[2,6],[8,10],[15,18]]
   * 按终点排序：[[1,3],[2,6],[8,10],[15,18]] (恰好有序)
   *
   * 初始：current = [15,18]
   *
   * i=2: intervals[2]=[8,10]
   *      10 < 15 (不重叠)
   *      result.unshift([15,18])
   *      current = [8,10]
   *
   * i=1: intervals[1]=[2,6]
   *      6 < 8 (不重叠)
   *      result.unshift([8,10])
   *      current = [2,6]
   *
   * i=0: intervals[0]=[1,3]
   *      3 >= 2 (重叠)
   *      合并：current[0] = min(2,1) = 1
   *      current = [1,6]
   *
   * 最后：result.unshift([1,6])
   * 结果：[[1,6],[8,10],[15,18]]
   */
  for (let i = intervals.length - 2; i >= 0; i--) {
    if (intervals[i][1] >= current[0]) {
      // 有重叠：合并，取起点的较小值
      current[0] = Math.min(current[0], intervals[i][0]);
    } else {
      // 无重叠：保存当前区间，开始处理新区间
      result.unshift(current);
      current = intervals[i];
    }
  }
  // 别忘了最后一个区间
  result.unshift(current);

  return result;
}`,
        explanation: `## 按终点排序

### 思路
1. 按终点排序
2. 从后往前遍历
3. 合并逻辑与按起点排序类似

### 特点
- 另一种思路
- 适合某些特殊场景`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "使用 reduce",
        animation: {
          type: "two-pointers" as const,
          title: "reduce合并演示",
          steps: [
            {
              array: ["[1,4]", "[4,5]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "区间" },
              ],
              description: "intervals=[[1,4],[4,5]]。使用reduce累积",
            },
            {
              array: ["acc:[]", "cur:[1,4]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "处理" },
              ],
              description: "累积器为空，直接push [1,4]",
            },
            {
              array: ["acc:[[1,4]]", "cur:[4,5]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "yellow" as const, label: "重叠" },
              ],
              description: "[4,5]与[1,4]重叠(4<=4)，合并为[1,5]",
            },
            {
              array: ["[1,5]"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "结果" },
              ],
              description: "reduce返回：[[1,5]]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 合并区间 - reduce 函数式写法
 *
 * 核心思想：使用 reduce 累积结果，逻辑与一次遍历相同
 *
 * reduce 参数：
 * - result：累积器，存储合并后的区间
 * - current：当前遍历的区间
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(log n)
 */
function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // 先按起点排序
  intervals.sort((a, b) => a[0] - b[0]);

  /**
   * 使用 reduce 累积合并结果
   *
   * 示例：intervals = [[1,4],[4,5]]
   *
   * 初始累积器：[]
   *
   * current=[1,4]:
   *   result.length === 0
   *   result.push([1,4])
   *   result = [[1,4]]
   *
   * current=[4,5]:
   *   last = [1,4]
   *   4 > 4? 否 (4 <= 4，重叠)
   *   last[1] = max(4,5) = 5
   *   result = [[1,5]]
   *
   * 最终结果：[[1,5]]
   */
  return intervals.reduce((result, current) => {
    const last = result[result.length - 1];

    if (result.length === 0 || current[0] > last[1]) {
      // 结果为空 或 无重叠：添加新区间
      result.push(current);
    } else {
      // 有重叠：合并
      last[1] = Math.max(last[1], current[1]);
    }

    return result;
  }, []);
}`,
        explanation: `## 使用 reduce

### 思路
使用 reduce 函数式风格重写：
1. 排序
2. 使用 reduce 累积结果

### 特点
- 函数式编程风格
- 代码更简洁`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
    ],
  },

  // 3. 插入区间 (57)
  {
    id: "insert-interval",
    leetcodeId: 57,
    title: "插入区间",
    titleEn: "Insert Interval",
    difficulty: "medium",
    category: "intervals",
    tags: ["数组"],
    frontendRelevance: "medium",
    frontendNote: "区间插入",
    description: `给你一个 **无重叠的**，按照区间起始端点排序的区间列表 \`intervals\`，其中 \`intervals[i] = [starti, endi]\` 表示第 \`i\` 个区间的开始和结束，并且 \`intervals\` 按照 \`starti\` 升序排列。同样给定一个区间 \`newInterval = [start, end]\` 表示另一个区间的开始和结束。

在 \`intervals\` 中插入区间 \`newInterval\`，使得 \`intervals\` 依然按照 \`starti\` 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。

返回插入之后的 \`intervals\`。

**注意** 你不需要原地修改 \`intervals\`。你可以创建一个新数组然后返回它。`,
    examples: `**示例 1：**
\`\`\`
输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
\`\`\`

**示例 2：**
\`\`\`
输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
\`\`\``,
    constraints: `- \`0 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti <= endi <= 10^5\`
- \`intervals\` 根据 \`starti\` 按 **升序** 排列
- \`newInterval.length == 2\`
- \`0 <= start <= end <= 10^5\``,
    initialCode: `function insert(intervals, newInterval) {
  // 在此处编写你的代码

}`,
    solution: `function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // 添加所有在 newInterval 之前的区间
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // 合并所有与 newInterval 重叠的区间
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // 添加所有在 newInterval 之后的区间
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]] },
      { id: "2", name: "示例2", input: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]] },
      { id: "3", name: "空数组", input: [[], [5, 7]], expected: [[5, 7]] },
      { id: "4", name: "无重叠-前", input: [[[3, 5]], [1, 2]], expected: [[1, 2], [3, 5]] },
    ],
    hints: [
      "分三个阶段处理：前、重叠、后",
      "先添加所有在新区间之前结束的区间",
      "合并所有与新区间重叠的区间",
      "最后添加剩余区间",
    ],
    explanation: `## 解题思路

### 三阶段处理

1. **第一阶段**：添加所有在 newInterval 之前的区间
   - 条件：intervals[i][1] < newInterval[0]

2. **第二阶段**：合并所有与 newInterval 重叠的区间
   - 条件：intervals[i][0] <= newInterval[1]
   - 更新 newInterval 的起点和终点

3. **第三阶段**：添加剩余区间

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)（不计输出）`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["merge-intervals", "summary-ranges"],
    solutions: [
      {
        name: "三阶段处理（推荐）",
        code: `/**
 * 插入区间 - 三阶段处理法
 *
 * 核心思想：将区间分为三部分依次处理
 * 1. 在新区间之前的区间（完全不重叠，直接添加）
 * 2. 与新区间重叠的区间（合并后添加）
 * 3. 在新区间之后的区间（完全不重叠，直接添加）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，不计输出
 */
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  /**
   * 阶段一：添加所有在 newInterval 之前的区间
   *
   * 判断条件：intervals[i][1] < newInterval[0]
   * 即当前区间的终点 < 新区间的起点（完全在左边，无重叠）
   *
   * 示例：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
   *
   * i=0: [1,2][1]=2 < [4,8][0]=4 ✓
   *      添加 [1,2]
   * i=1: [3,5][1]=5 >= [4,8][0]=4 ✗
   *      退出阶段一
   *
   * result = [[1,2]]
   */
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  /**
   * 阶段二：合并所有与 newInterval 重叠的区间
   *
   * 判断条件：intervals[i][0] <= newInterval[1]
   * 即当前区间的起点 <= 新区间的终点（有重叠）
   *
   * 合并操作：
   * - 起点取 min
   * - 终点取 max
   *
   * 继续示例：
   * i=1: [3,5][0]=3 <= [4,8][1]=8 ✓
   *      newInterval = [min(4,3), max(8,5)] = [3,8]
   * i=2: [6,7][0]=6 <= [3,8][1]=8 ✓
   *      newInterval = [min(3,6), max(8,7)] = [3,8]
   * i=3: [8,10][0]=8 <= [3,8][1]=8 ✓
   *      newInterval = [min(3,8), max(8,10)] = [3,10]
   * i=4: [12,16][0]=12 > [3,10][1]=10 ✗
   *      退出阶段二
   *
   * 添加合并后的 newInterval = [3,10]
   * result = [[1,2],[3,10]]
   */
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  /**
   * 阶段三：添加所有在 newInterval 之后的区间
   *
   * 继续示例：
   * i=4: 添加 [12,16]
   *
   * 最终结果：[[1,2],[3,10],[12,16]]
   */
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "插入区间演示",
          steps: [
            {
              array: ["[1,3]", "[6,9]", "new:[2,5]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "blue" as const, label: "待插入" }],
              description: "intervals=[[1,3],[6,9]], newInterval=[2,5]。三阶段处理",
            },
            {
              array: ["[1,3]", "[6,9]", "[2,5]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "检查" }],
              description: "阶段1：[1,3]终点3 >= [2,5]起点2。不满足「在前」条件，进入阶段2",
            },
            {
              array: ["[1,3]", "[6,9]", "[2,5]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 2], color: "red" as const, label: "重叠" }],
              description: "阶段2：[1,3]起点1 <= [2,5]终点5。重叠！合并为[1,5]",
            },
            {
              array: ["[1,5]", "[6,9]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "已合并" },
                { indices: [1], color: "gray" as const, label: "在后" },
              ],
              description: "阶段3：[6,9]起点6 > [1,5]终点5。不重叠，直接添加",
            },
            {
              array: ["[1,5]", "[6,9]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "完成！结果=[[1,5],[6,9]]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 三阶段处理

### 思路
1. **第一阶段**：添加所有在 newInterval 之前的区间
   - 条件：intervals[i][1] < newInterval[0]

2. **第二阶段**：合并所有与 newInterval 重叠的区间
   - 条件：intervals[i][0] <= newInterval[1]
   - 更新 newInterval 的起点和终点

3. **第三阶段**：添加剩余区间

### 示例
intervals = [[1,3],[6,9]], newInterval = [2,5]
- 阶段1：无（[1,3]的终点3 >= 2）
- 阶段2：合并[1,3]和[2,5]得到[1,5]
- 阶段3：添加[6,9]`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找优化",
        animation: {
          type: "two-pointers" as const,
          title: "二分查找优化演示",
          steps: [
            {
              array: ["[1,2]", "[3,5]", "[6,7]", "[8,10]"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "blue" as const, label: "原区间" },
              ],
              description: "新区间[4,8]。二分查找第一个重叠位置",
            },
            {
              array: ["[1,2]", "[3,5]", "[6,7]", "[8,10]"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "二分定位" },
              ],
              description: "二分找到索引1：[3,5]终点5>=4，可能重叠",
            },
            {
              array: ["[1,2]", "[3,10]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "green" as const, label: "合并" },
              ],
              description: "[3,5],[6,7],[8,10]与[4,8]重叠，合并为[3,10]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 插入区间 - 二分查找优化法
 *
 * 核心思想：用二分查找快速定位第一个可能重叠的区间
 *
 * 优化点：阶段一从 O(n) 优化到 O(log n)
 * 但整体仍是 O(n)，因为还需要遍历重叠区间和复制结果
 *
 * 适用场景：区间很多但重叠很少时效率更高
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function insert(intervals, newInterval) {
  const n = intervals.length;
  if (n === 0) return [newInterval];

  /**
   * 二分查找：找到第一个可能与 newInterval 重叠的区间
   *
   * 查找条件：找到第一个 intervals[mid][1] >= newInterval[0] 的位置
   * 即第一个终点 >= 新区间起点的区间
   *
   * 示例：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
   *
   * left=0, right=5
   * mid=2: intervals[2][1]=7 >= 4 → right=2
   * mid=1: intervals[1][1]=5 >= 4 → right=1
   * mid=0: intervals[0][1]=2 < 4 → left=1
   *
   * 结果：left=1，即 [3,5] 是第一个可能重叠的区间
   */
  let left = 0, right = n;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (intervals[mid][1] < newInterval[0]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // 直接复制前 left 个区间（都在 newInterval 之前）
  const result = intervals.slice(0, left);
  let i = left;

  // 合并重叠区间（与标准方法相同）
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // 添加剩余区间
  while (i < n) {
    result.push(intervals[i++]);
  }

  return result;
}`,
        explanation: `## 二分查找优化

### 思路
1. 使用二分查找找到第一个可能重叠的区间
2. 后续处理与标准方法相同

### 特点
- 在区间很多但重叠很少时更高效
- 查找阶段 O(log n)，但整体仍是 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "先插入后合并",
        animation: {
          type: "two-pointers" as const,
          title: "先插入后合并演示",
          steps: [
            {
              array: ["[1,3]", "[6,9]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "原区间" },
              ],
              description: "新区间[2,5]。先插入到正确位置，再合并",
            },
            {
              array: ["[1,3]", "[2,5]", "[6,9]"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "插入" },
              ],
              description: "步骤1：[2,5]起点2<[6,9]起点6，插入到中间",
            },
            {
              array: ["[1,5]", "[6,9]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "合并" },
              ],
              description: "步骤2：[1,3]和[2,5]重叠，合并为[1,5]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 插入区间 - 先插入后合并法
 *
 * 核心思想：
 * 1. 将新区间插入到正确位置（保持有序）
 * 2. 使用"合并区间"的标准算法处理
 *
 * 优点：代码复用，易于理解
 * 缺点：需要额外的空间存储中间结果
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function insert(intervals, newInterval) {
  /**
   * 步骤一：将新区间插入到正确位置
   *
   * 示例：intervals = [[1,3],[6,9]], newInterval = [2,5]
   *
   * 遍历过程：
   * - [1,3]：newInterval[0]=2 >= interval[0]=1，继续
   * - [6,9]：newInterval[0]=2 < interval[0]=6
   *   插入 [2,5]，然后添加 [6,9]
   *
   * all = [[1,3],[2,5],[6,9]]
   */
  let inserted = false;
  const all = [];

  for (const interval of intervals) {
    if (!inserted && newInterval[0] < interval[0]) {
      // 找到插入位置
      all.push(newInterval);
      inserted = true;
    }
    all.push(interval);
  }
  // 如果还没插入，说明应该放在最后
  if (!inserted) all.push(newInterval);

  /**
   * 步骤二：合并区间（复用合并区间的逻辑）
   *
   * all = [[1,3],[2,5],[6,9]]
   *
   * 初始：result = [[1,3]]
   *
   * [2,5]：2 <= 3 (重叠)
   *        result = [[1,5]]
   *
   * [6,9]：6 > 5 (不重叠)
   *        result = [[1,5],[6,9]]
   */
  const result = [all[0]];
  for (let i = 1; i < all.length; i++) {
    const last = result[result.length - 1];
    if (all[i][0] <= last[1]) {
      // 有重叠，合并
      last[1] = Math.max(last[1], all[i][1]);
    } else {
      // 无重叠，添加
      result.push(all[i]);
    }
  }

  return result;
}`,
        explanation: `## 先插入后合并

### 思路
1. 先将新区间插入到正确位置（保持有序）
2. 然后用合并区间的算法处理

### 特点
- 复用合并区间的逻辑
- 代码更容易理解`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 4. 用最少数量的箭引爆气球 (452)
  {
    id: "minimum-number-of-arrows",
    leetcodeId: 452,
    title: "用最少数量的箭引爆气球",
    titleEn: "Minimum Number of Arrows to Burst Balloons",
    difficulty: "medium",
    category: "intervals",
    tags: ["数组", "贪心", "排序"],
    frontendRelevance: "low",
    frontendNote: "区间射箭",
    description: `有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 \`points\` 中，其中 \`points[i] = [xstart, xend]\` 表示水平直径在 \`xstart\` 和 \`xend\` 之间的气球。你不知道气球的确切 y 坐标。

一支弓箭可以沿着 x 轴从不同点 **完全垂直** 地射出。在坐标 \`x\` 处射出一支箭，若有一个气球的直径的开始和结束坐标为 \`xstart\`，\`xend\`，且满足 \`xstart ≤ x ≤ xend\`，则该气球会被 **引爆**。可以射出的弓箭的数量 **没有限制**。弓箭一旦被射出之后，可以无限地前进。

给你一个数组 \`points\`，**返回引爆所有气球所必须射出的 最小 弓箭数**。`,
    examples: `**示例 1：**
\`\`\`
输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：气球可以用2支箭来爆破:
- 在x = 6处射出箭，击破气球[2,8]和[1,6]。
- 在x = 11处射出箭，击破气球[10,16]和[7,12]。
\`\`\`

**示例 2：**
\`\`\`
输入：points = [[1,2],[3,4],[5,6],[7,8]]
输出：4
解释：每个气球需要射出一支箭，总共需要4支箭。
\`\`\`

**示例 3：**
\`\`\`
输入：points = [[1,2],[2,3],[3,4],[4,5]]
输出：2
解释：气球可以用2支箭来爆破:
- 在x = 2处发射箭，击破气球[1,2]和[2,3]。
- 在x = 4处发射箭，击破气球[3,4]和[4,5]。
\`\`\``,
    constraints: `- \`1 <= points.length <= 10^5\`
- \`points[i].length == 2\`
- \`-2^31 <= xstart < xend <= 2^31 - 1\``,
    initialCode: `function findMinArrowShots(points) {
  // 在此处编写你的代码

}`,
    solution: `function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  // 按终点排序
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let end = points[0][1];

  for (let i = 1; i < points.length; i++) {
    // 如果当前气球的起点大于上一支箭的位置，需要新的一支箭
    if (points[i][0] > end) {
      arrows++;
      end = points[i][1];
    }
  }

  return arrows;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[[10, 16], [2, 8], [1, 6], [7, 12]]], expected: 2 },
      { id: "2", name: "示例2", input: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expected: 4 },
      { id: "3", name: "示例3", input: [[[1, 2], [2, 3], [3, 4], [4, 5]]], expected: 2 },
      { id: "4", name: "单气球", input: [[[1, 2]]], expected: 1 },
    ],
    hints: [
      "按气球的终点排序",
      "贪心思想：尽可能在当前气球的最右边射箭",
      "如果下一个气球的起点 > 当前箭的位置，需要新箭",
    ],
    explanation: `## 解题思路

### 贪心算法

1. 按气球终点升序排序
2. 在第一个气球的终点位置射箭
3. 遍历所有气球：
   - 如果当前气球的起点 > 上一支箭的位置，需要新的一支箭
   - 更新箭的位置为当前气球的终点

### 为什么按终点排序？

按终点排序后，我们总是在当前能覆盖的最右边射箭，这样能覆盖尽可能多的后续气球。

### 复杂度分析
- 时间复杂度：O(n log n)，排序
- 空间复杂度：O(log n)，排序栈空间`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["merge-intervals", "insert-interval"],
    solutions: [
      {
        name: "按终点排序（推荐）",
        code: `/**
 * 用最少数量的箭引爆气球 - 按终点排序（贪心）
 *
 * 核心思想：尽可能让一支箭射中更多的气球
 *
 * 贪心策略：
 * 1. 按气球终点排序
 * 2. 在第一个气球的终点位置射箭
 * 3. 这支箭能射中所有起点 <= 当前终点的气球
 * 4. 当遇到起点 > 当前终点的气球时，需要新的一支箭
 *
 * 为什么按终点排序？
 * - 按终点排序后，在终点射箭能覆盖尽可能多的后续气球
 * - 因为后续气球的终点更大，只要起点在当前终点之前就能被射中
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(log n)
 */
function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  // 按终点升序排序
  points.sort((a, b) => a[1] - b[1]);

  // 至少需要一支箭
  let arrows = 1;
  // 记录当前箭的位置（在第一个气球的终点）
  let end = points[0][1];

  /**
   * 遍历所有气球，判断是否需要新箭
   *
   * 示例：points = [[10,16],[2,8],[1,6],[7,12]]
   * 按终点排序：[[1,6],[2,8],[7,12],[10,16]]
   *
   * 初始：arrows=1, end=6（在x=6处射箭）
   *
   * i=1: [2,8]
   *      起点2 <= end(6)，被x=6的箭射中
   *      不需要新箭
   *
   * i=2: [7,12]
   *      起点7 > end(6)，无法被射中
   *      需要新箭：arrows=2, end=12（在x=12处射箭）
   *
   * i=3: [10,16]
   *      起点10 <= end(12)，被x=12的箭射中
   *      不需要新箭
   *
   * 结果：2支箭
   * 第1支在 x=6：射中 [1,6] 和 [2,8]
   * 第2支在 x=12：射中 [7,12] 和 [10,16]
   */
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      // 当前气球的起点大于上一支箭的位置，需要新的一支箭
      arrows++;
      // 更新箭的位置为当前气球的终点
      end = points[i][1];
    }
    // 如果 points[i][0] <= end，说明当前箭可以射中这个气球
  }

  return arrows;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "用最少数量的箭引爆气球演示",
          steps: [
            {
              array: ["[10,16]", "[2,8]", "[1,6]", "[7,12]"],
              left: 0,
              right: 3,
              highlights: [],
              description: "points=[[10,16],[2,8],[1,6],[7,12]]。按终点排序",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "箭1@6" }],
              description: "排序后。在第一个气球终点x=6射箭。arrows=1",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "箭1射中" }],
              description: "[2,8]起点2<=6，被箭1射中。无需新箭",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "red" as const, label: "需新箭" }],
              description: "[7,12]起点7>6，需要新箭。在x=12射箭。arrows=2",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 2,
              right: 3,
              highlights: [{ indices: [2, 3], color: "blue" as const, label: "箭2射中" }],
              description: "[10,16]起点10<=12，被箭2射中。无需新箭",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "完成！最少需要2支箭",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 按终点排序

### 思路
1. 按气球终点升序排序
2. 在第一个气球的终点位置射箭
3. 遍历所有气球：
   - 如果当前气球的起点 > 上一支箭的位置，需要新的一支箭
   - 更新箭的位置为当前气球的终点

### 为什么按终点排序？
按终点排序后，我们总是在当前能覆盖的最右边射箭，这样能覆盖尽可能多的后续气球。

### 示例
[[10,16],[2,8],[1,6],[7,12]]
按终点排序：[[1,6],[2,8],[7,12],[10,16]]
- 箭1在6：覆盖[1,6]和[2,8]
- 箭2在12：覆盖[7,12]和[10,16]`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "按起点排序",
        animation: {
          type: "two-pointers" as const,
          title: "按起点排序演示",
          steps: [
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "blue" as const, label: "气球" },
              ],
              description: "按起点排序。维护当前箭的有效射击范围",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "箭1" },
              ],
              description: "[1,6]和[2,8]有交集[2,6]，同一支箭可射中",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [2], color: "yellow" as const, label: "新箭" },
              ],
              description: "[7,12]起点7>有效范围6，需要新箭",
            },
            {
              array: ["箭1", "箭2"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "结果" },
              ],
              description: "共需2支箭。与按终点排序结果相同",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 用最少数量的箭引爆气球 - 按起点排序（贪心）
 *
 * 核心思想：维护当前箭能射中的有效范围
 *
 * 与按终点排序的区别：
 * - 按终点排序：箭的位置固定在终点，只需判断起点
 * - 按起点排序：需要动态维护箭的有效射击范围
 *
 * 有效范围：所有能被同一支箭射中的气球的交集
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(log n)
 */
function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  // 按起点升序排序
  points.sort((a, b) => a[0] - b[0]);

  let arrows = 1;
  // end 表示当前箭能射中的最右位置（有效范围的右边界）
  let end = points[0][1];

  /**
   * 遍历所有气球
   *
   * 示例：points = [[1,2],[2,3],[3,4],[4,5]]
   * 已按起点排序
   *
   * 初始：arrows=1, end=2
   *
   * i=1: [2,3]
   *      起点2 <= end(2)，可以用同一支箭
   *      更新 end = min(2, 3) = 2
   *      （箭必须在 x<=2 的位置才能同时射中 [1,2] 和 [2,3]）
   *
   * i=2: [3,4]
   *      起点3 > end(2)，需要新箭
   *      arrows=2, end=4
   *
   * i=3: [4,5]
   *      起点4 <= end(4)，可以用同一支箭
   *      更新 end = min(4, 5) = 4
   *
   * 结果：2支箭
   * 第1支在 x=2：射中 [1,2] 和 [2,3]
   * 第2支在 x=4：射中 [3,4] 和 [4,5]
   */
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      // 需要新的箭
      arrows++;
      end = points[i][1];
    } else {
      // 可以用同一支箭，更新有效范围的右边界
      // 取 min 是因为箭必须在所有气球的交集范围内
      end = Math.min(end, points[i][1]);
    }
  }

  return arrows;
}`,
        explanation: `## 按起点排序

### 思路
1. 按起点排序
2. 维护当前箭能覆盖的最右边界
3. 遍历气球：
   - 如果起点 > 当前边界，需要新箭
   - 否则，更新边界为 min(边界, 当前终点)

### 与按终点排序的区别
需要额外维护有效射箭范围的右边界`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "区间交集思路",
        animation: {
          type: "two-pointers" as const,
          title: "区间交集思路演示",
          steps: [
            {
              array: ["[10,16]", "[2,8]", "[1,6]", "[7,12]"],
              left: 0,
              right: 3,
              highlights: [],
              description: "points=[[10,16],[2,8],[1,6],[7,12]]。按起点排序",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "组1" }],
              description: "排序后。第一组从[1,6]开始，right=6",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "组1" }],
              description: "[2,8]起点2<=6，加入组1。right=min(6,8)=6",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已处理" },
                { indices: [2], color: "yellow" as const, label: "新组" },
              ],
              description: "[7,12]起点7>6，开始新组。arrows=1",
            },
            {
              array: ["[1,6]", "[2,8]", "[7,12]", "[10,16]"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已处理" },
                { indices: [2, 3], color: "green" as const, label: "组2" },
              ],
              description: "[10,16]起点10<=12，加入组2。arrows=2",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 用最少数量的箭引爆气球 - 区间交集思路
 *
 * 核心思想：找到所有能被同一支箭射中的气球组（它们的交集不为空）
 *
 * 交集计算：
 * - 两个区间 [a,b] 和 [c,d] 有交集当且仅当 max(a,c) <= min(b,d)
 * - 多个区间的交集 = 连续计算两两交集
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(log n)
 */
function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  // 按起点排序
  points.sort((a, b) => a[0] - b[0]);

  let arrows = 0;
  let i = 0;

  /**
   * 逐组处理，每组是能被同一支箭射中的所有气球
   *
   * 示例：points = [[10,16],[2,8],[1,6],[7,12]]
   * 按起点排序：[[1,6],[2,8],[7,12],[10,16]]
   *
   * 第一组：
   *   i=0: [1,6], right=6
   *   i=1: [2,8], 起点2 <= right(6)
   *        right = min(6, 8) = 6
   *   i=2: [7,12], 起点7 > right(6)
   *        退出内循环
   *   arrows=1（这支箭在 x∈[2,6] 范围内都可以射中 [1,6] 和 [2,8]）
   *
   * 第二组：
   *   i=2: [7,12], right=12
   *   i=3: [10,16], 起点10 <= right(12)
   *        right = min(12, 16) = 12
   *   i=4: 越界
   *   arrows=2
   *
   * 结果：2支箭
   */
  while (i < points.length) {
    // 当前组的交集右边界，初始为第一个气球的终点
    let right = points[i][1];
    i++;

    // 找到所有能被同一支箭射中的气球（交集不为空）
    while (i < points.length && points[i][0] <= right) {
      // 更新交集的右边界
      right = Math.min(right, points[i][1]);
      i++;
    }

    // 这一组用一支箭
    arrows++;
  }

  return arrows;
}`,
        explanation: `## 区间交集思路

### 思路
1. 找到所有可以被同一支箭射中的气球（它们的交集不为空）
2. 维护交集的右边界
3. 当下一个气球的起点超过交集右边界时，需要新箭

### 特点
- 思路更直观
- 显式计算区间交集`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
    ],
  },
];
