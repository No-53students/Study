import { Problem } from "../types";

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
        code: `function summaryRanges(nums) {
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
        code: `function summaryRanges(nums) {
  const result = [];
  let left = 0;

  while (left < nums.length) {
    let right = left;

    // 找到连续区间的右边界
    while (right + 1 < nums.length && nums[right + 1] === nums[right] + 1) {
      right++;
    }

    // 生成区间字符串
    if (left === right) {
      result.push(String(nums[left]));
    } else {
      result.push(\`\${nums[left]}->\${nums[right]}\`);
    }

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
        code: `function merge(intervals) {
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
        code: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  // 按终点排序
  intervals.sort((a, b) => a[1] - b[1]);

  const result = [];
  let current = intervals[intervals.length - 1];

  for (let i = intervals.length - 2; i >= 0; i--) {
    if (intervals[i][1] >= current[0]) {
      // 有重叠，合并
      current[0] = Math.min(current[0], intervals[i][0]);
    } else {
      // 无重叠，保存当前区间
      result.unshift(current);
      current = intervals[i];
    }
  }
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
        code: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  return intervals.reduce((result, current) => {
    const last = result[result.length - 1];

    if (result.length === 0 || current[0] > last[1]) {
      result.push(current);
    } else {
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
        code: `function insert(intervals, newInterval) {
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
        code: `function insert(intervals, newInterval) {
  const n = intervals.length;
  if (n === 0) return [newInterval];

  // 二分查找第一个可能重叠的区间
  let left = 0, right = n;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (intervals[mid][1] < newInterval[0]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const result = intervals.slice(0, left);
  let i = left;

  // 合并重叠区间
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
        code: `function insert(intervals, newInterval) {
  // 将新区间插入到正确位置
  let inserted = false;
  const all = [];

  for (const interval of intervals) {
    if (!inserted && newInterval[0] < interval[0]) {
      all.push(newInterval);
      inserted = true;
    }
    all.push(interval);
  }
  if (!inserted) all.push(newInterval);

  // 合并区间（复用合并区间的逻辑）
  const result = [all[0]];
  for (let i = 1; i < all.length; i++) {
    const last = result[result.length - 1];
    if (all[i][0] <= last[1]) {
      last[1] = Math.max(last[1], all[i][1]);
    } else {
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
        code: `function findMinArrowShots(points) {
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
        code: `function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  // 按起点排序
  points.sort((a, b) => a[0] - b[0]);

  let arrows = 1;
  let end = points[0][1];

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) {
      // 需要新的箭
      arrows++;
      end = points[i][1];
    } else {
      // 可以用同一支箭，更新有效范围
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
        code: `function findMinArrowShots(points) {
  if (points.length === 0) return 0;

  points.sort((a, b) => a[0] - b[0]);

  let arrows = 0;
  let i = 0;

  while (i < points.length) {
    // 找到可以被同一支箭射中的所有气球
    let right = points[i][1];
    i++;

    while (i < points.length && points[i][0] <= right) {
      right = Math.min(right, points[i][1]);
      i++;
    }

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
