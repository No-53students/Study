import { Problem } from "../types";

// 双指针分类题目
export const twoPointersProblems: Problem[] = [
  // 1. 验证回文串 (125)
  {
    id: "valid-palindrome",
    leetcodeId: 125,
    title: "验证回文串",
    titleEn: "Valid Palindrome",
    difficulty: "easy",
    category: "two-pointers",
    tags: ["双指针", "字符串"],
    description: `如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 **回文串**。

字母和数字都属于字母数字字符。

给你一个字符串 \`s\`，如果它是 **回文串**，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入: s = "A man, a plan, a canal: Panama"
输出：true
解释："amanaplanacanalpanama" 是回文串。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "race a car"
输出：false
解释："raceacar" 不是回文串。
\`\`\`

**示例 3：**
\`\`\`
输入：s = " "
输出：true
解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
由于空字符串正着反着读都一样，所以是回文串。
\`\`\``,
    constraints: `- \`1 <= s.length <= 2 * 10^5\`
- \`s\` 仅由可打印的 ASCII 字符组成`,
    initialCode: `function isPalindrome(s) {
  // 在此处编写你的代码

}`,
    solution: `function isPalindrome(s) {
  // 双指针法
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // 跳过非字母数字字符
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // 比较字符（忽略大小写）
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char) {
  const code = char.charCodeAt(0);
  return (code >= 48 && code <= 57) ||  // 0-9
         (code >= 65 && code <= 90) ||  // A-Z
         (code >= 97 && code <= 122);   // a-z
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["A man, a plan, a canal: Panama"], expected: true },
      { id: "2", name: "示例2", input: ["race a car"], expected: false },
      { id: "3", name: "空格", input: [" "], expected: true },
      { id: "4", name: "单字符", input: ["a"], expected: true },
    ],
    hints: [
      "使用双指针，一个从头开始，一个从尾开始",
      "遇到非字母数字字符时跳过",
      "比较时注意忽略大小写",
    ],
    explanation: `## 解题思路

### 双指针法

1. 使用左右两个指针分别指向字符串的首尾
2. 左指针向右移动，右指针向左移动
3. 跳过所有非字母数字字符
4. 比较两个指针指向的字符（忽略大小写）
5. 如果不相等，返回 false
6. 如果遍历完成都相等，返回 true

### 复杂度分析
- 时间复杂度：O(n)，只需遍历一次
- 空间复杂度：O(1)，只使用常数额外空间`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["two-sum-ii"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // 跳过非字母数字字符
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // 比较字符（忽略大小写）
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(char) {
  const code = char.charCodeAt(0);
  return (code >= 48 && code <= 57) ||  // 0-9
         (code >= 65 && code <= 90) ||  // A-Z
         (code >= 97 && code <= 122);   // a-z
}`,
        explanation: `## 双指针法

### 思路
使用左右双指针从两端向中间移动：
1. 跳过非字母数字字符
2. 比较两个指针指向的字符（忽略大小写）
3. 如果不相等，返回 false

### 优点
- 空间复杂度 O(1)，原地比较
- 一次遍历完成`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "正则 + 反转",
        code: `function isPalindrome(s) {
  // 转换为小写，只保留字母数字
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 反转后比较
  return cleaned === cleaned.split('').reverse().join('');
}`,
        explanation: `## 正则 + 反转

### 思路
1. 转换为小写
2. 用正则去除所有非字母数字字符
3. 反转字符串后与原字符串比较

### 优缺点
- 优点：代码简洁易懂
- 缺点：需要额外空间存储处理后的字符串`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 2. 两数之和 II - 输入有序数组 (167)
  {
    id: "two-sum-ii",
    leetcodeId: 167,
    title: "两数之和 II - 输入有序数组",
    titleEn: "Two Sum II - Input Array Is Sorted",
    difficulty: "medium",
    category: "two-pointers",
    tags: ["双指针", "数组", "二分查找"],
    description: `给你一个下标从 **1** 开始的整数数组 \`numbers\`，该数组已按 **非递减顺序排列**，请你从数组中找出满足相加之和等于目标数 \`target\` 的两个数。如果设这两个数分别是 \`numbers[index1]\` 和 \`numbers[index2]\`，则 \`1 <= index1 < index2 <= numbers.length\`。

以长度为 2 的整数数组 \`[index1, index2]\` 的形式返回这两个整数的下标 \`index1\` 和 \`index2\`。

你可以假设每个输入 **只对应唯一的答案**，而且你 **不可以** 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。`,
    examples: `**示例 1：**
\`\`\`
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
\`\`\`

**示例 2：**
\`\`\`
输入：numbers = [2,3,4], target = 6
输出：[1,3]
解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
\`\`\`

**示例 3：**
\`\`\`
输入：numbers = [-1,0], target = -1
输出：[1,2]
解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
\`\`\``,
    constraints: `- \`2 <= numbers.length <= 3 * 10^4\`
- \`-1000 <= numbers[i] <= 1000\`
- \`numbers\` 按 **非递减顺序** 排列
- \`-1000 <= target <= 1000\`
- **仅存在一个有效答案**`,
    initialCode: `function twoSum(numbers, target) {
  // 在此处编写你的代码

}`,
    solution: `function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      // 注意：返回的是1-indexed
      return [left + 1, right + 1];
    } else if (sum < target) {
      // 和太小，左指针右移
      left++;
    } else {
      // 和太大，右指针左移
      right--;
    }
  }

  return [-1, -1]; // 题目保证有解，不会执行到这里
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { id: "2", name: "示例2", input: [[2, 3, 4], 6], expected: [1, 3] },
      { id: "3", name: "负数", input: [[-1, 0], -1], expected: [1, 2] },
      { id: "4", name: "相邻元素", input: [[1, 2, 3, 4, 5], 3], expected: [1, 2] },
    ],
    hints: [
      "数组已排序，可以利用这个特性",
      "使用双指针，一个从头，一个从尾",
      "根据当前和与目标值的比较，决定移动哪个指针",
    ],
    explanation: `## 解题思路

### 双指针法

利用数组已排序的特性：
1. 初始化左指针指向数组开头，右指针指向数组末尾
2. 计算两个指针指向的数之和
3. 如果和等于目标值，返回两个下标（注意是1-indexed）
4. 如果和小于目标值，左指针右移（增大和）
5. 如果和大于目标值，右指针左移（减小和）

### 为什么这样做是正确的？

因为数组是有序的：
- 左指针右移会使和变大
- 右指针左移会使和变小
- 这样可以保证不会错过答案

### 复杂度分析
- 时间复杂度：O(n)，最多遍历一次数组
- 空间复杂度：O(1)，只使用常数额外空间`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["valid-palindrome", "three-sum"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
}`,
        explanation: `## 双指针法

### 思路
利用数组已排序的特性：
1. 初始化左指针指向开头，右指针指向末尾
2. 计算两数之和
3. 如果和等于目标，返回结果
4. 如果和小于目标，左指针右移（增大和）
5. 如果和大于目标，右指针左移（减小和）

### 为什么正确？
因为数组有序，移动指针可以单调地改变和的大小。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找",
        code: `function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];

    // 在 i+1 到 n-1 范围内二分查找
    let left = i + 1;
    let right = numbers.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (numbers[mid] === complement) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] < complement) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return [-1, -1];
}`,
        explanation: `## 二分查找

### 思路
1. 遍历数组，固定第一个数
2. 对于每个数，计算需要的另一个数
3. 在剩余范围内二分查找

### 复杂度
时间 O(n log n)，空间 O(1)。
虽然比双指针慢，但展示了利用有序性的另一种方式。`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 3. 三数之和 (15)
  {
    id: "three-sum",
    leetcodeId: 15,
    title: "三数之和",
    titleEn: "3Sum",
    difficulty: "medium",
    category: "two-pointers",
    tags: ["双指针", "数组", "排序"],
    description: `给你一个整数数组 \`nums\`，判断是否存在三元组 \`[nums[i], nums[j], nums[k]]\` 满足 \`i != j\`、\`i != k\` 且 \`j != k\`，同时还满足 \`nums[i] + nums[j] + nums[k] == 0\`。请你返回所有和为 \`0\` 且不重复的三元组。

**注意：** 答案中不可以包含重复的三元组。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
\`\`\``,
    constraints: `- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\``,
    initialCode: `function threeSum(nums) {
  // 在此处编写你的代码

}`,
    solution: `function threeSum(nums) {
  const result = [];
  const n = nums.length;

  // 先排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 2; i++) {
    // 跳过重复的第一个数
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // 如果最小的三个数之和都大于0，后面不可能有解
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) {
      break;
    }

    // 如果当前数与最大的两个数之和都小于0，跳过
    if (nums[i] + nums[n - 2] + nums[n - 1] < 0) {
      continue;
    }

    // 双指针找另外两个数
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // 跳过重复的左指针
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        // 跳过重复的右指针
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { id: "2", name: "无解", input: [[0, 1, 1]], expected: [] },
      { id: "3", name: "全零", input: [[0, 0, 0]], expected: [[0, 0, 0]] },
      { id: "4", name: "多个解", input: [[-2, 0, 1, 1, 2]], expected: [[-2, 0, 2], [-2, 1, 1]] },
    ],
    hints: [
      "先对数组排序，方便去重和使用双指针",
      "固定第一个数，对剩余部分使用双指针",
      "注意跳过重复元素以避免重复三元组",
    ],
    explanation: `## 解题思路

### 排序 + 双指针

1. **排序**：先对数组排序，这样可以方便去重和使用双指针
2. **固定一个数**：遍历数组，固定第一个数 nums[i]
3. **双指针**：对于剩余部分，使用双指针找到和为 -nums[i] 的两个数
4. **去重**：跳过相同的数，避免重复三元组

### 优化剪枝
- 如果 nums[i] > 0，后面不可能有和为0的三元组
- 如果 nums[i] + nums[i+1] + nums[i+2] > 0，也不可能有解
- 如果 nums[i] + nums[n-2] + nums[n-1] < 0，当前 i 无解，继续下一个

### 复杂度分析
- 时间复杂度：O(n²)，排序 O(n log n) + 双指针 O(n²)
- 空间复杂度：O(log n)，排序所需的栈空间`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["two-sum-ii", "container-with-most-water"],
    solutions: [
      {
        name: "排序 + 双指针（推荐）",
        code: `function threeSum(nums) {
  const result = [];
  const n = nums.length;

  // 先排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 2; i++) {
    // 跳过重复的第一个数
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 剪枝优化
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;
    if (nums[i] + nums[n - 2] + nums[n - 1] < 0) continue;

    // 双指针找另外两个数
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // 跳过重复
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}`,
        explanation: `## 排序 + 双指针

### 思路
1. 先排序，方便去重和使用双指针
2. 固定第一个数 nums[i]
3. 对剩余部分使用双指针找和为 -nums[i] 的两个数
4. 跳过重复元素避免重复结果

### 剪枝优化
- nums[i] > 0 时可提前结束
- 最小三数和 > 0 时可提前结束
- 当前最大三数和 < 0 时跳过当前 i`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "哈希表法",
        code: `function threeSum(nums) {
  const result = [];
  const n = nums.length;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    const seen = new Set();
    for (let j = i + 1; j < n; j++) {
      const complement = -nums[i] - nums[j];

      if (seen.has(complement)) {
        result.push([nums[i], complement, nums[j]]);
        // 跳过重复
        while (j + 1 < n && nums[j] === nums[j + 1]) j++;
      }

      seen.add(nums[j]);
    }
  }

  return result;
}`,
        explanation: `## 哈希表法

### 思路
1. 排序数组
2. 固定第一个数
3. 用哈希表存储遍历过的数
4. 对于每个数，检查需要的补数是否在哈希表中

### 复杂度
时间 O(n²)，空间 O(n)。
比双指针多用了空间，但思路更直接。`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 4. 盛最多水的容器 (11)
  {
    id: "container-with-most-water",
    leetcodeId: 11,
    title: "盛最多水的容器",
    titleEn: "Container With Most Water",
    difficulty: "medium",
    category: "two-pointers",
    tags: ["双指针", "数组", "贪心"],
    description: `给定一个长度为 \`n\` 的整数数组 \`height\`。有 \`n\` 条垂线，第 \`i\` 条线的两个端点是 \`(i, 0)\` 和 \`(i, height[i])\`。

找出其中的两条线，使得它们与 \`x\` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：** 你不能倾斜容器。`,
    examples: `**示例 1：**
\`\`\`
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
\`\`\`

**示例 2：**
\`\`\`
输入：height = [1,1]
输出：1
\`\`\``,
    constraints: `- \`n == height.length\`
- \`2 <= n <= 10^5\`
- \`0 <= height[i] <= 10^4\``,
    initialCode: `function maxArea(height) {
  // 在此处编写你的代码

}`,
    solution: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    // 计算当前容器的水量
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const water = width * h;

    maxWater = Math.max(maxWater, water);

    // 移动较短的那条边
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { id: "2", name: "示例2", input: [[1, 1]], expected: 1 },
      { id: "3", name: "递增", input: [[1, 2, 3, 4, 5]], expected: 6 },
      { id: "4", name: "递减", input: [[5, 4, 3, 2, 1]], expected: 6 },
    ],
    hints: [
      "容器的水量 = 宽度 × 高度（取两边较短的）",
      "使用双指针，从两端向中间移动",
      "每次移动较短的那条边，因为移动较长的边不可能得到更大的容量",
    ],
    explanation: `## 解题思路

### 双指针法

1. 使用左右两个指针，分别指向数组的首尾
2. 计算当前两条边形成的容器容量
3. 每次移动较短的那条边

### 为什么移动较短的边？

假设左边高度为 h1，右边高度为 h2，宽度为 w
- 容量 = min(h1, h2) × w
- 如果 h1 < h2，移动右边（较长边）：
  - 宽度减小
  - 高度最多等于 h1（因为取 min）
  - 容量一定减小
- 如果移动左边（较短边）：
  - 宽度减小
  - 但高度可能增加
  - 容量可能增大

所以应该移动较短的边，才有可能找到更大的容量。

### 复杂度分析
- 时间复杂度：O(n)，每个元素最多被访问一次
- 空间复杂度：O(1)，只使用常数额外空间`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["three-sum", "trapping-rain-water"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * h);

    // 移动较短的边
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}`,
        explanation: `## 双指针法

### 思路
1. 使用左右指针，分别指向数组首尾
2. 计算当前容量 = 宽度 × min(左高度, 右高度)
3. 每次移动较短的边

### 为什么移动较短边？
- 容量受限于较短边
- 移动较长边：宽度减小，高度不会增加，容量一定减小
- 移动较短边：宽度减小，但高度可能增加，容量可能增大

### 正确性证明
每次移动较短边，实际上排除了以该边为一端的所有情况，因为它们的容量一定不会更大。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "暴力法（不推荐）",
        code: `function maxArea(height) {
  let maxWater = 0;
  const n = height.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const width = j - i;
      const h = Math.min(height[i], height[j]);
      maxWater = Math.max(maxWater, width * h);
    }
  }

  return maxWater;
}`,
        explanation: `## 暴力法

### 思路
枚举所有可能的边组合，计算每对边形成的容量，取最大值。

### 复杂度
时间 O(n²)，空间 O(1)。
对于大数据会超时，但思路简单直接。`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 5. 判断子序列 (392)
  {
    id: "is-subsequence",
    leetcodeId: 392,
    title: "判断子序列",
    titleEn: "Is Subsequence",
    difficulty: "easy",
    category: "two-pointers",
    tags: ["双指针", "字符串", "动态规划"],
    description: `给定字符串 \`s\` 和 \`t\`，判断 \`s\` 是否为 \`t\` 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，\`"ace"\` 是 \`"abcde"\` 的一个子序列，而 \`"aec"\` 不是）。

**进阶：**
如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？`,
    examples: `**示例 1：**
\`\`\`
输入：s = "abc", t = "ahbgdc"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：s = "axc", t = "ahbgdc"
输出：false
\`\`\``,
    constraints: `- \`0 <= s.length <= 100\`
- \`0 <= t.length <= 10^4\`
- 两个字符串都只由小写字符组成`,
    initialCode: `function isSubsequence(s, t) {
  // 在此处编写你的代码

}`,
    solution: `function isSubsequence(s, t) {
  let i = 0; // s 的指针
  let j = 0; // t 的指针

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }

  // 如果 i 到达 s 的末尾，说明 s 是 t 的子序列
  return i === s.length;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["abc", "ahbgdc"], expected: true },
      { id: "2", name: "示例2", input: ["axc", "ahbgdc"], expected: false },
      { id: "3", name: "空字符串", input: ["", "ahbgdc"], expected: true },
      { id: "4", name: "相同字符串", input: ["abc", "abc"], expected: true },
      { id: "5", name: "s更长", input: ["abcd", "abc"], expected: false },
    ],
    hints: [
      "使用双指针，分别指向 s 和 t",
      "遍历 t，如果当前字符与 s 的当前字符匹配，s 的指针右移",
      "最后检查 s 的指针是否到达末尾",
    ],
    explanation: `## 解题思路

### 双指针法

1. 使用两个指针 i 和 j，分别指向 s 和 t 的开头
2. 遍历 t：
   - 如果 s[i] === t[j]，说明找到一个匹配字符，i++
   - 无论是否匹配，j 都右移
3. 最后检查 i 是否等于 s.length
   - 如果是，说明 s 的所有字符都在 t 中找到了匹配
   - 如果否，说明 s 不是 t 的子序列

### 为什么这样做是正确的？

我们按顺序在 t 中寻找 s 的每个字符：
- 子序列要求保持相对顺序
- 我们从左到右遍历，确保顺序正确
- 每找到一个匹配字符，就继续找下一个

### 进阶思路
如果有大量的 s 需要判断，可以预处理 t：
- 对 t 中的每个位置，记录每个字符下一次出现的位置
- 使用二分查找加速匹配

### 复杂度分析
- 时间复杂度：O(m + n)，m 和 n 分别是 s 和 t 的长度
- 空间复杂度：O(1)，只使用常数额外空间`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["valid-palindrome", "two-sum-ii"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `function isSubsequence(s, t) {
  let i = 0; // s 的指针
  let j = 0; // t 的指针

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }

  return i === s.length;
}`,
        explanation: `## 双指针法

### 思路
1. 使用两个指针分别指向 s 和 t 的开头
2. 遍历 t，如果当前字符与 s 的当前字符匹配，s 的指针右移
3. 无论是否匹配，t 的指针都右移
4. 最后检查 s 的指针是否到达末尾

### 为什么正确？
我们按顺序在 t 中寻找 s 的每个字符，保持了相对顺序。`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找（进阶）",
        code: `function isSubsequence(s, t) {
  // 预处理：记录 t 中每个字符出现的位置
  const charPos = {};
  for (let i = 0; i < t.length; i++) {
    if (!charPos[t[i]]) {
      charPos[t[i]] = [];
    }
    charPos[t[i]].push(i);
  }

  let prevIndex = -1;

  for (const char of s) {
    if (!charPos[char]) return false;

    const positions = charPos[char];

    // 二分查找第一个大于 prevIndex 的位置
    let left = 0, right = positions.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (positions[mid] > prevIndex) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    if (left === positions.length) return false;

    prevIndex = positions[left];
  }

  return true;
}`,
        explanation: `## 二分查找（进阶）

### 适用场景
当有大量的 s 需要判断是否是同一个 t 的子序列时。

### 思路
1. 预处理 t：记录每个字符出现的所有位置
2. 对于 s 的每个字符，二分查找下一个可用位置

### 复杂度
- 预处理：O(n)
- 每次查询：O(m log n)
- 适合多次查询同一个 t`,
        timeComplexity: "O(m log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划预处理",
        code: `function isSubsequence(s, t) {
  const n = t.length;

  // dp[i][c] 表示从位置 i 开始，字符 c 第一次出现的位置
  const dp = Array(n + 1).fill(null).map(() => ({}));

  // 初始化：从位置 n 开始，所有字符都找不到
  for (let c = 0; c < 26; c++) {
    dp[n][String.fromCharCode(97 + c)] = n;
  }

  // 从后往前填表
  for (let i = n - 1; i >= 0; i--) {
    for (let c = 0; c < 26; c++) {
      const char = String.fromCharCode(97 + c);
      if (t[i] === char) {
        dp[i][char] = i;
      } else {
        dp[i][char] = dp[i + 1][char];
      }
    }
  }

  // 查询
  let pos = 0;
  for (const char of s) {
    if (dp[pos][char] === n) return false;
    pos = dp[pos][char] + 1;
  }

  return true;
}`,
        explanation: `## 动态规划预处理

### 适用场景
多次查询同一个 t 的子序列问题。

### 思路
预处理 dp[i][c]：从位置 i 开始，字符 c 第一次出现的位置。
查询时直接跳转到目标字符的位置。

### 复杂度
- 预处理：O(26n)
- 每次查询：O(m)`,
        timeComplexity: "O(m)",
        spaceComplexity: "O(26n)",
      },
    ],
  },
];
