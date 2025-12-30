import { Problem } from "../types";

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
        code: `function search(nums, target) {
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
        explanation: `## 二分查找

### 思路
1. 旋转数组的特点：至少有一半是有序的
2. 通过比较 nums[left] 和 nums[mid] 判断哪一半有序
3. 如果左半有序且 target 在左半范围内，搜索左半；否则搜索右半
4. 如果右半有序且 target 在右半范围内，搜索右半；否则搜索左半

### 要点
- 关键是判断哪一半有序
- 在有序的一半判断 target 是否在范围内`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "先找旋转点",
        code: `function search(nums, target) {
  const n = nums.length;

  // 找到旋转点（最小值的索引）
  let left = 0, right = n - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const pivot = left;

  // 确定在哪一半搜索
  left = 0;
  right = n - 1;
  if (target >= nums[pivot] && target <= nums[n - 1]) {
    left = pivot;
  } else {
    right = pivot - 1;
  }

  // 标准二分查找
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
        explanation: `## 先找旋转点

### 思路
1. 先用二分查找找到旋转点（最小值位置）
2. 根据 target 值确定在旋转点的哪一侧搜索
3. 在确定的那一侧进行标准二分查找

### 优点
- 逻辑更清晰，分步处理
- 两次二分查找，时间复杂度仍然是 O(log n)`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "虚拟索引映射",
        code: `function search(nums, target) {
  const n = nums.length;

  // 找到旋转点
  let left = 0, right = n - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const pivot = left;

  // 使用虚拟索引进行二分
  left = 0;
  right = n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // 虚拟索引映射到实际索引
    const realMid = (mid + pivot) % n;

    if (nums[realMid] === target) return realMid;
    if (nums[realMid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
        explanation: `## 虚拟索引映射

### 思路
1. 找到旋转点后，将数组视为有序数组
2. 使用虚拟索引 [0, n-1]
3. 通过 (virtualIndex + pivot) % n 映射到实际索引
4. 在虚拟索引上进行标准二分查找

### 特点
- 将旋转数组"还原"为有序数组
- 索引映射处理旋转偏移`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
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
        code: `function findMin(nums) {
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
        explanation: `## 二分查找（与右端比较）

### 思路
1. 比较 nums[mid] 和 nums[right]
2. 如果 nums[mid] > nums[right]，说明最小值在右半部分
3. 否则最小值在左半部分（包含 mid）
4. 最终 left == right 时，找到最小值

### 要点
- 与右端比较更可靠
- 注意 right = mid 而不是 mid - 1`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找（与左端比较）",
        code: `function findMin(nums) {
  const n = nums.length;

  // 特殊情况：数组未旋转
  if (nums[0] <= nums[n - 1]) {
    return nums[0];
  }

  let left = 0;
  let right = n - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] >= nums[0]) {
      // mid 在左半部分，最小值在右边
      left = mid + 1;
    } else {
      // mid 在右半部分，最小值可能是 mid
      right = mid;
    }
  }

  return nums[left];
}`,
        explanation: `## 二分查找（与左端比较）

### 思路
1. 先处理未旋转的特殊情况
2. 比较 nums[mid] 和 nums[0]
3. 如果 nums[mid] >= nums[0]，说明 mid 在左半部分
4. 否则 mid 在右半部分，最小值可能就是 mid

### 特点
- 需要先处理边界情况
- 利用旋转数组的性质判断位置`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "寻找断点",
        code: `function findMin(nums) {
  const n = nums.length;

  // 特殊情况：单元素或未旋转
  if (n === 1 || nums[0] < nums[n - 1]) {
    return nums[0];
  }

  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 找到断点：当前元素大于下一个元素
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    }
    // 当前元素小于前一个元素
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];
    }

    if (nums[mid] > nums[0]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return nums[0];
}`,
        explanation: `## 寻找断点

### 思路
1. 最小值是唯一一个比前一个元素小的元素
2. 或者说，断点就是比下一个元素大的位置
3. 二分搜索找到这个断点

### 特点
- 直接寻找断点位置
- 需要处理边界情况`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
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
        code: `function searchMatrix(matrix, target) {
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
        explanation: `## 一维二分查找

### 思路
1. 将二维矩阵视为一维有序数组
2. 使用二分查找，索引范围是 [0, m*n-1]
3. 将一维索引 mid 转换为二维坐标：row = mid / n, col = mid % n
4. 标准二分查找流程

### 要点
- 索引转换：row = mid / n, col = mid % n
- 矩阵是全局有序的`,
        timeComplexity: "O(log(m × n))",
        spaceComplexity: "O(1)",
      },
      {
        name: "两次二分查找",
        code: `function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 第一次二分：找到 target 可能在的行
  let top = 0, bottom = m - 1;
  while (top <= bottom) {
    const mid = Math.floor((top + bottom) / 2);
    if (matrix[mid][0] <= target && target <= matrix[mid][n - 1]) {
      // 在这一行进行第二次二分
      let left = 0, right = n - 1;
      while (left <= right) {
        const col = Math.floor((left + right) / 2);
        if (matrix[mid][col] === target) return true;
        if (matrix[mid][col] < target) left = col + 1;
        else right = col - 1;
      }
      return false;
    } else if (matrix[mid][0] > target) {
      bottom = mid - 1;
    } else {
      top = mid + 1;
    }
  }

  return false;
}`,
        explanation: `## 两次二分查找

### 思路
1. 第一次二分：确定 target 可能在哪一行
2. 第二次二分：在确定的行内查找 target
3. 如果行首 <= target <= 行尾，则 target 可能在该行

### 特点
- 分两步进行，逻辑清晰
- 先定位行，再定位列`,
        timeComplexity: "O(log m + log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "从右上角开始",
        code: `function searchMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 从右上角开始
  let row = 0;
  let col = n - 1;

  while (row < m && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--; // 当前值太大，向左移动
    } else {
      row++; // 当前值太小，向下移动
    }
  }

  return false;
}`,
        explanation: `## 从右上角开始（搜索矩阵）

### 思路
1. 从右上角开始搜索
2. 如果当前值等于 target，返回 true
3. 如果当前值大于 target，向左移动
4. 如果当前值小于 target，向下移动

### 特点
- 每次可以排除一行或一列
- 时间复杂度 O(m + n)
- 不是最优但思路直观`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
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
        code: `function searchRange(nums, target) {
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
        explanation: `## 两次二分查找

### 思路
1. **找第一个位置**：找到 target 后，继续向左搜索
2. **找最后一个位置**：找到 target 后，继续向右搜索

### 要点
- 找到 target 后不立即返回，而是记录位置并继续搜索
- 两次二分方向不同`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "通用边界查找",
        code: `function searchRange(nums, target) {
  // 查找左边界（第一个 >= target 的位置）
  const lowerBound = (target) => {
    let left = 0, right = nums.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  };

  const first = lowerBound(target);

  // 如果 target 不存在
  if (first === nums.length || nums[first] !== target) {
    return [-1, -1];
  }

  // 最后一个位置 = 第一个 > target 的位置 - 1
  const last = lowerBound(target + 1) - 1;

  return [first, last];
}`,
        explanation: `## 通用边界查找（Lower Bound）

### 思路
1. 使用 lowerBound 函数找第一个 >= target 的位置
2. first = lowerBound(target)
3. last = lowerBound(target + 1) - 1
4. 如果 first 位置的值不是 target，说明不存在

### 优点
- 复用同一个查找函数
- 标准的边界查找模式`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归二分",
        code: `function searchRange(nums, target) {
  const binarySearch = (left, right, findFirst) => {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      if (findFirst) {
        // 检查是否是第一个
        if (mid === 0 || nums[mid - 1] !== target) {
          return mid;
        }
        return binarySearch(left, mid - 1, findFirst);
      } else {
        // 检查是否是最后一个
        if (mid === nums.length - 1 || nums[mid + 1] !== target) {
          return mid;
        }
        return binarySearch(mid + 1, right, findFirst);
      }
    } else if (nums[mid] < target) {
      return binarySearch(mid + 1, right, findFirst);
    } else {
      return binarySearch(left, mid - 1, findFirst);
    }
  };

  return [
    binarySearch(0, nums.length - 1, true),
    binarySearch(0, nums.length - 1, false)
  ];
}`,
        explanation: `## 递归二分

### 思路
1. 递归实现二分查找
2. 找到 target 后，检查是否是边界
3. 如果不是边界，继续向对应方向递归

### 特点
- 递归实现，代码结构对称
- 用参数控制查找方向`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
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
        code: `function findPeakElement(nums) {
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
        explanation: `## 二分查找

### 思路
1. 比较 nums[mid] 和 nums[mid+1]
2. 如果 nums[mid] > nums[mid+1]，说明我们在下坡，峰值在左边
3. 否则我们在上坡，峰值在右边
4. 最终 left == right 时找到峰值

### 要点
- 利用 nums[-1] = nums[n] = -∞ 的条件
- 只要沿着上坡方向走，一定能找到峰值`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "线性扫描",
        code: `function findPeakElement(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      return i;
    }
  }
  // 单调递增，最后一个是峰值
  return nums.length - 1;
}`,
        explanation: `## 线性扫描

### 思路
1. 从左到右扫描
2. 第一个比下一个元素大的位置就是峰值
3. 如果一直递增，最后一个元素是峰值

### 特点
- 实现简单
- 时间复杂度 O(n)，不是最优`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归二分",
        code: `function findPeakElement(nums) {
  const search = (left, right) => {
    if (left === right) return left;

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      return search(left, mid);
    } else {
      return search(mid + 1, right);
    }
  };

  return search(0, nums.length - 1);
}`,
        explanation: `## 递归二分

### 思路
1. 递归实现二分查找
2. 比较 mid 和 mid+1 决定递归方向
3. 基准条件：left == right 时返回

### 特点
- 递归实现，代码简洁
- 空间复杂度 O(log n) 由于递归栈`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
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
        code: `function minEatingSpeed(piles, h) {
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
        explanation: `## 二分查找答案

### 思路
1. 速度 k 的范围是 [1, max(piles)]
2. 二分查找最小的满足条件的速度
3. 对于每个速度，计算吃完所有香蕉需要的时间
4. 如果时间 <= h，尝试更小的速度；否则需要更大的速度

### 要点
- 这是"二分答案"的典型应用
- 验证函数判断给定速度是否可行`,
        timeComplexity: "O(n × log(max))",
        spaceComplexity: "O(1)",
      },
      {
        name: "优化：避免使用 Math.max",
        code: `function minEatingSpeed(piles, h) {
  // 不使用展开运算符，避免栈溢出
  let maxPile = 0;
  for (const pile of piles) {
    if (pile > maxPile) maxPile = pile;
  }

  let left = 1;
  let right = maxPile;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
      if (hours > h) break; // 提前退出
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

### 优化点
1. 手动计算最大值，避免展开运算符的栈溢出风险
2. 在计算小时数时提前退出，减少不必要的计算

### 适用场景
- 数组非常大时
- 需要避免栈溢出风险`,
        timeComplexity: "O(n × log(max))",
        spaceComplexity: "O(1)",
      },
      {
        name: "使用位运算优化",
        code: `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = 0;
  for (const pile of piles) {
    if (pile > right) right = pile;
  }

  while (left < right) {
    const mid = (left + right) >>> 1; // 无符号右移，等价于 Math.floor

    let hours = 0;
    for (const pile of piles) {
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
        explanation: `## 使用位运算优化

### 优化点
1. 使用 >>> 1 代替 Math.floor((left + right) / 2)
2. 使用整数除法代替 Math.ceil
3. (pile + mid - 1) / mid | 0 等价于 Math.ceil(pile / mid)

### 特点
- 性能略有提升
- 避免浮点数运算`,
        timeComplexity: "O(n × log(max))",
        spaceComplexity: "O(1)",
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
        code: `function findMedianSortedArrays(nums1, nums2) {
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
        explanation: `## 二分查找分割点

### 思路
1. 在较短的数组上二分查找分割点 i
2. 根据 i 计算另一个数组的分割点 j = (m+n+1)/2 - i
3. 确保左半部分的最大值 <= 右半部分的最小值
4. 根据总元素个数的奇偶性计算中位数

### 要点
- 在较短数组上二分，保证 j 不越界
- 用 ±Infinity 处理边界情况`,
        timeComplexity: "O(log(min(m, n)))",
        spaceComplexity: "O(1)",
      },
      {
        name: "合并数组",
        code: `function findMedianSortedArrays(nums1, nums2) {
  const merged = [];
  let i = 0, j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);

  const n = merged.length;
  if (n % 2 === 1) {
    return merged[Math.floor(n / 2)];
  } else {
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
  }
}`,
        explanation: `## 合并数组

### 思路
1. 使用归并排序的合并步骤
2. 将两个有序数组合并成一个
3. 直接取中位数

### 特点
- 思路直观，容易理解
- 时间复杂度 O(m+n)，不满足题目要求但可以通过`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
      },
      {
        name: "查找第 K 小元素",
        code: `function findMedianSortedArrays(nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;

  // 查找两个数组中第 k 小的元素
  const findKth = (k, start1, start2) => {
    // 边界情况
    if (start1 >= m) return nums2[start2 + k - 1];
    if (start2 >= n) return nums1[start1 + k - 1];
    if (k === 1) return Math.min(nums1[start1], nums2[start2]);

    // 比较两个数组的第 k/2 个元素
    const half = Math.floor(k / 2);
    const idx1 = Math.min(start1 + half, m) - 1;
    const idx2 = Math.min(start2 + half, n) - 1;

    if (nums1[idx1] <= nums2[idx2]) {
      // 排除 nums1 的前半部分
      return findKth(k - (idx1 - start1 + 1), idx1 + 1, start2);
    } else {
      // 排除 nums2 的前半部分
      return findKth(k - (idx2 - start2 + 1), start1, idx2 + 1);
    }
  };

  const total = m + n;
  if (total % 2 === 1) {
    return findKth(Math.floor(total / 2) + 1, 0, 0);
  } else {
    const left = findKth(total / 2, 0, 0);
    const right = findKth(total / 2 + 1, 0, 0);
    return (left + right) / 2;
  }
}`,
        explanation: `## 查找第 K 小元素

### 思路
1. 将问题转化为查找第 K 小的元素
2. 每次排除 k/2 个元素
3. 比较两数组第 k/2 个元素，较小的那边可以排除

### 特点
- 分治思想
- 每次排除一半待查找元素
- 时间复杂度 O(log(m+n))`,
        timeComplexity: "O(log(m + n))",
        spaceComplexity: "O(log(m + n))",
      },
    ],
  },
];
