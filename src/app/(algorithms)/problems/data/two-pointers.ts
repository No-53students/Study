import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

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
    frontendRelevance: "low",
    frontendNote: "验证回文串",
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
        code: `/**
 * 验证回文串 - 双指针解法
 *
 * 核心思想：
 * 回文串的特点是从两端向中间读取是对称的
 * 使用双指针从两端向中间移动，跳过非字母数字字符，逐一比较
 *
 * 为什么用双指针？
 * - 只需要 O(1) 空间，不需要额外创建字符串
 * - 可以提前终止：一旦发现不匹配，立即返回 false
 *
 * 时间复杂度：O(n)，每个字符最多访问一次
 * 空间复杂度：O(1)，只用常数变量
 */
function isPalindrome(s) {
  // 初始化左右指针，分别指向字符串首尾
  let left = 0;
  let right = s.length - 1;

  // 当左指针小于右指针时继续比较
  while (left < right) {
    // 左指针跳过非字母数字字符
    // 例如 "A man" 中，left 会跳过空格
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    // 右指针跳过非字母数字字符
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // 比较两个指针指向的字符（转为小写后比较，忽略大小写）
    // 例如 'A' 和 'a' 应该视为相等
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;  // 不相等，不是回文串
    }

    // 两边指针向中间移动
    left++;
    right--;
  }

  // 所有字符都匹配，是回文串
  return true;
}

/**
 * 判断字符是否为字母或数字
 * 使用 ASCII 码判断，避免正则开销
 */
function isAlphanumeric(char) {
  const code = char.charCodeAt(0);
  return (code >= 48 && code <= 57) ||  // 0-9 的 ASCII 码是 48-57
         (code >= 65 && code <= 90) ||  // A-Z 的 ASCII 码是 65-90
         (code >= 97 && code <= 122);   // a-z 的 ASCII 码是 97-122
}`,
        explanation: `## 双指针法

### 思路
使用左右双指针从两端向中间移动：
1. 跳过非字母数字字符
2. 比较两个指针指向的字符（忽略大小写）
3. 如果不相等，返回 false

### 执行示例
输入: "A man, a plan, a canal: Panama"
- left=0('A'), right=29('a') → 相等，继续
- left=1(' '), 跳过 → left=2('m')
- right=28(':'), 跳过 → right=27('m')
- 'm' === 'm' → 相等，继续
- ... 依次比较直到 left >= right

### 优点
- 空间复杂度 O(1)，原地比较
- 一次遍历完成`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "验证回文串 - 双指针演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: ["A", " ", "m", "a", "n", ",", " ", "a", " ", "p", "l", "a", "n"],
              left: 0,
              right: 12,
              description: "初始化：left 指向开头 'A'，right 指向末尾 'n'",
            },
            {
              array: ["A", " ", "m", "a", "n", ",", " ", "a", " ", "p", "l", "a", "n"],
              left: 0,
              right: 12,
              comparing: [0, 12],
              description: "比较 s[0]='A' 和 s[12]='n'：转小写后 'a' vs 'n'",
            },
            {
              array: ["A", " ", "m", "a", "n", ",", " ", "a", " ", "p", "l", "a", "n"],
              left: 0,
              right: 12,
              comparing: [0, 12],
              highlights: [{ indices: [0, 12], color: "red" as const, label: "不匹配" }],
              description: "'a' ≠ 'n'，不是回文串！返回 false",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "正则 + 反转",
        code: `/**
 * 验证回文串 - 正则 + 反转解法
 *
 * 核心思想：
 * 先清洗字符串（去除非字母数字，转小写），然后反转比较
 *
 * 优点：代码简洁，一行核心逻辑
 * 缺点：需要 O(n) 额外空间
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，存储清洗后的字符串和反转后的字符串
 */
function isPalindrome(s) {
  // 1. 转换为小写
  // 2. 用正则 [^a-z0-9] 匹配所有非字母数字字符，替换为空
  // 例如 "A man, a plan" → "amanaplana"
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 反转字符串：split 拆成数组 → reverse 反转 → join 合并
  // 比较原字符串和反转后的字符串是否相等
  return cleaned === cleaned.split('').reverse().join('');
}`,
        explanation: `## 正则 + 反转

### 思路
1. 转换为小写
2. 用正则去除所有非字母数字字符
3. 反转字符串后与原字符串比较

### 执行示例
输入: "A man, a plan, a canal: Panama"
- toLowerCase: "a man, a plan, a canal: panama"
- replace: "amanaplanacanalpanama"
- reverse: "amanaplanacanalpanama"
- 相等 → true

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
    frontendRelevance: "low",
    frontendNote: "两数之和II，已排序",
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
        code: `/**
 * 两数之和 II - 双指针解法
 *
 * 核心思想：
 * 利用数组有序的特性，使用双指针从两端向中间收缩
 * - 如果两数之和太大，右指针左移（减小和）
 * - 如果两数之和太小，左指针右移（增大和）
 *
 * 为什么这样做是正确的？
 * 假设答案是 (i, j)，其中 i < j
 * - 当 left = i 时，如果 sum < target，那么 right 一定不能在 j 左边
 *   （因为 nums[right] < nums[j] 会使 sum 更小）
 * - 同理，当 right = j 时，如果 sum > target，left 一定不能在 i 右边
 * 所以双指针不会错过答案
 *
 * 时间复杂度：O(n)，每个元素最多访问一次
 * 空间复杂度：O(1)，只用常数变量
 */
function twoSum(numbers, target) {
  // 初始化双指针，分别指向数组首尾
  let left = 0;
  let right = numbers.length - 1;

  // 当左指针小于右指针时继续搜索
  while (left < right) {
    // 计算当前两数之和
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      // 找到答案！注意题目要求返回 1-indexed
      return [left + 1, right + 1];
    } else if (sum < target) {
      // 和太小，需要增大，左指针右移（数组有序，右边的数更大）
      left++;
    } else {
      // 和太大，需要减小，右指针左移（数组有序，左边的数更小）
      right--;
    }
  }

  // 题目保证有解，实际不会执行到这里
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

### 执行示例
输入: numbers = [2,7,11,15], target = 9
- left=0(2), right=3(15), sum=17 > 9, right--
- left=0(2), right=2(11), sum=13 > 9, right--
- left=0(2), right=1(7), sum=9 === 9, 返回 [1,2]

### 为什么正确？
因为数组有序，移动指针可以单调地改变和的大小。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "两数之和 II - 双指针演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 3,
              description: "初始化：left=0 指向 2，right=3 指向 15，target=9",
            },
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 3,
              comparing: [0, 3],
              description: "计算 sum = 2 + 15 = 17 > 9，和太大！",
            },
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 2,
              description: "右指针左移，right=2，现在指向 11",
            },
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 2,
              comparing: [0, 2],
              description: "计算 sum = 2 + 11 = 13 > 9，和还是太大！",
            },
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 1,
              description: "右指针左移，right=1，现在指向 7",
            },
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 1,
              comparing: [0, 1],
              description: "计算 sum = 2 + 7 = 9 === 9",
            },
            {
              array: [2, 7, 11, 15],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "找到答案" }],
              description: "找到答案！返回 [1, 2]（1-indexed）",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "二分查找",
        code: `/**
 * 两数之和 II - 二分查找解法
 *
 * 核心思想：
 * 固定第一个数，用二分查找在剩余范围内寻找第二个数
 *
 * 虽然时间复杂度不如双指针，但展示了另一种利用有序性的思路
 *
 * 时间复杂度：O(n log n)，外层 O(n)，内层二分 O(log n)
 * 空间复杂度：O(1)
 */
function twoSum(numbers, target) {
  // 遍历数组，固定第一个数
  for (let i = 0; i < numbers.length; i++) {
    // 计算需要找的第二个数
    const complement = target - numbers[i];

    // 在 i+1 到 n-1 范围内二分查找
    // 注意：从 i+1 开始，避免使用同一个元素两次
    let left = i + 1;
    let right = numbers.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (numbers[mid] === complement) {
        // 找到了！返回 1-indexed 结果
        return [i + 1, mid + 1];
      } else if (numbers[mid] < complement) {
        // 中间值太小，在右半部分找
        left = mid + 1;
      } else {
        // 中间值太大，在左半部分找
        right = mid - 1;
      }
    }
  }

  // 题目保证有解，实际不会执行到这里
  return [-1, -1];
}`,
        explanation: `## 二分查找

### 思路
1. 遍历数组，固定第一个数
2. 对于每个数，计算需要的另一个数
3. 在剩余范围内二分查找

### 执行示例
输入: numbers = [2,7,11,15], target = 9
- i=0, complement=9-2=7
- 在 [7,11,15] 中二分查找 7
- mid=1(11), 11>7, right=0
- mid=0(7), 7===7, 找到！返回 [1,2]

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
    frontendRelevance: "high",
    frontendNote: "双指针经典，面试常考",
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
        code: `/**
 * 三数之和 - 排序 + 双指针解法
 *
 * 核心思想：
 * 将三数之和问题转化为：固定一个数，在剩余部分找两数之和
 * 排序后可以利用双指针高效找到两数之和，同时方便去重
 *
 * 为什么要排序？
 * 1. 方便使用双指针（有序数组才能用双指针找两数之和）
 * 2. 方便去重（相同的数会相邻，跳过即可）
 * 3. 方便剪枝（如果最小的数都大于0，后面不可能有解）
 *
 * 时间复杂度：O(n²)，排序 O(n log n) + 双指针 O(n²)
 * 空间复杂度：O(log n)，排序所需的栈空间
 */
function threeSum(nums) {
  const result = [];
  const n = nums.length;

  // 先排序，这是使用双指针和去重的前提
  nums.sort((a, b) => a - b);

  // 遍历数组，固定第一个数 nums[i]
  for (let i = 0; i < n - 2; i++) {
    // 去重：跳过重复的第一个数
    // 注意是 i > 0 且与前一个相等才跳过，保证至少使用一次
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 剪枝优化1：如果最小的三个数之和都大于0，后面不可能有解
    // 因为数组已排序，nums[i] 是当前最小的
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;

    // 剪枝优化2：如果当前数与最大的两个数之和都小于0，跳过当前i
    // 说明当前 nums[i] 太小了，无论怎么选另外两个数都不够
    if (nums[i] + nums[n - 2] + nums[n - 1] < 0) continue;

    // 在 i+1 到 n-1 范围内使用双指针找两数之和为 -nums[i]
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        // 找到一个三元组！
        result.push([nums[i], nums[left], nums[right]]);

        // 去重：跳过重复的左指针
        while (left < right && nums[left] === nums[left + 1]) left++;
        // 去重：跳过重复的右指针
        while (left < right && nums[right] === nums[right - 1]) right--;

        // 找到后两边指针都要移动，继续找其他可能的组合
        left++;
        right--;
      } else if (sum < 0) {
        // 和太小，左指针右移增大和
        left++;
      } else {
        // 和太大，右指针左移减小和
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

### 执行示例
输入: [-1, 0, 1, 2, -1, -4]
排序后: [-4, -1, -1, 0, 1, 2]
- i=0(-4), left=1, right=5, sum=-4-1+2=-3 < 0, left++
- ... -4 太小，找不到
- i=1(-1), left=2, right=5, sum=-1-1+2=0 ✓ 找到 [-1,-1,2]
- left++, right--, sum=-1+0+1=0 ✓ 找到 [-1,0,1]
- i=2(-1) 跳过（与 i=1 相同）
- ...

### 剪枝优化
- nums[i] > 0 时可提前结束
- 最小三数和 > 0 时可提前结束
- 当前最大三数和 < 0 时跳过当前 i`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(log n)",
        animation: {
          type: "two-pointers" as const,
          title: "三数之和 - 排序 + 双指针演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 1,
              right: 5,
              highlights: [{ indices: [0], color: "purple" as const, label: "固定 i" }],
              description: "排序后数组。固定 i=0(-4)，在剩余部分用双指针找和为 4 的两数",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 1,
              right: 5,
              comparing: [1, 5],
              highlights: [{ indices: [0], color: "purple" as const, label: "固定 i" }],
              description: "sum = -4 + (-1) + 2 = -3 < 0，和太小，left++",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 2,
              right: 5,
              comparing: [2, 5],
              highlights: [{ indices: [0], color: "purple" as const, label: "固定 i" }],
              description: "sum = -4 + (-1) + 2 = -3 < 0，还是太小，继续尝试...",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 2,
              right: 5,
              highlights: [{ indices: [1], color: "purple" as const, label: "固定 i" }],
              description: "i=0 找不到解，移动到 i=1(-1)，在 [2,5] 范围找和为 1 的两数",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 2,
              right: 5,
              comparing: [2, 5],
              highlights: [{ indices: [1], color: "purple" as const, label: "固定 i" }],
              description: "sum = -1 + (-1) + 2 = 0 === 0",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 2,
              right: 5,
              highlights: [{ indices: [1, 2, 5], color: "green" as const, label: "找到三元组" }],
              description: "找到三元组 [-1, -1, 2]！继续寻找...",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 3,
              right: 4,
              comparing: [3, 4],
              highlights: [{ indices: [1], color: "purple" as const, label: "固定 i" }],
              description: "left++, right--, sum = -1 + 0 + 1 = 0 === 0",
            },
            {
              array: [-4, -1, -1, 0, 1, 2],
              left: 3,
              right: 4,
              highlights: [{ indices: [1, 3, 4], color: "green" as const, label: "找到三元组" }],
              description: "又找到三元组 [-1, 0, 1]！结果: [[-1,-1,2], [-1,0,1]]",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "哈希表法",
        code: `/**
 * 三数之和 - 哈希表解法
 *
 * 核心思想：
 * 固定第一个数，用哈希表存储遍历过的数
 * 对于每个新遍历的数，检查需要的补数是否在哈希表中
 *
 * 这种方法更直观，但需要额外空间
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n)，哈希表存储
 */
function threeSum(nums) {
  const result = [];
  const n = nums.length;

  // 排序用于去重
  nums.sort((a, b) => a - b);

  // 遍历数组，固定第一个数
  for (let i = 0; i < n - 2; i++) {
    // 跳过重复的第一个数
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // 哈希表存储遍历过的数
    const seen = new Set();

    for (let j = i + 1; j < n; j++) {
      // 计算需要的第三个数
      const complement = -nums[i] - nums[j];

      // 检查补数是否在哈希表中
      if (seen.has(complement)) {
        result.push([nums[i], complement, nums[j]]);
        // 跳过重复的 nums[j]
        while (j + 1 < n && nums[j] === nums[j + 1]) j++;
      }

      // 将当前数加入哈希表
      seen.add(nums[j]);
    }
  }

  return result;
}`,
        explanation: `## 哈希表法

### 思路
1. 排序数组（用于去重）
2. 固定第一个数
3. 用哈希表存储遍历过的数
4. 对于每个数，检查需要的补数是否在哈希表中

### 执行示例
输入: [-4, -1, -1, 0, 1, 2]
- i=0(-4), seen={}
  - j=1(-1), complement=5, 不在seen中, seen={-1}
  - j=2(-1), complement=5, 不在seen中, seen={-1}
  - ... 找不到
- i=1(-1), seen={}
  - j=2(-1), complement=2, 不在seen中, seen={-1}
  - j=3(0), complement=1, 不在seen中, seen={-1,0}
  - j=4(1), complement=0, 在seen中！找到 [-1,0,1]
  - j=5(2), complement=-1, 在seen中！找到 [-1,-1,2]

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
    frontendRelevance: "high",
    frontendNote: "双指针贪心",
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
        code: `/**
 * 盛最多水的容器 - 双指针解法
 *
 * 核心思想：
 * 容器的容量 = 宽度 × 高度（取两边较短的）
 * 使用双指针从两端向中间收缩，每次移动较短的那一边
 *
 * 为什么移动较短的边？（贪心思想的关键）
 * 设左边高度 h1，右边高度 h2，宽度 w，假设 h1 < h2
 * - 当前容量 = h1 × w
 * - 如果移动右边（较长边）：
 *   新宽度 = w - 1（变小）
 *   新高度 ≤ h1（因为 min 操作，不可能超过 h1）
 *   所以新容量 ≤ h1 × (w-1) < h1 × w，一定变小！
 * - 如果移动左边（较短边）：
 *   新宽度 = w - 1（变小）
 *   新高度可能增大（如果新的左边更高）
 *   所以新容量可能增大！
 *
 * 因此，移动较短边才可能找到更大容量
 *
 * 时间复杂度：O(n)，每个元素最多访问一次
 * 空间复杂度：O(1)，只用常数变量
 */
function maxArea(height) {
  // 初始化双指针，分别指向数组首尾
  let left = 0;
  let right = height.length - 1;
  // 记录最大容量
  let maxWater = 0;

  // 当左指针小于右指针时继续搜索
  while (left < right) {
    // 计算当前容器的宽度（两条边的距离）
    const width = right - left;
    // 计算当前容器的高度（取两边较短的，木桶原理）
    const h = Math.min(height[left], height[right]);
    // 更新最大容量
    maxWater = Math.max(maxWater, width * h);

    // 贪心策略：移动较短的边
    // 如果左边较短，左指针右移
    // 如果右边较短或相等，右指针左移
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

### 执行示例
输入: [1,8,6,2,5,4,8,3,7]
- left=0(1), right=8(7), width=8, h=1, water=8, maxWater=8
- height[0]<height[8], left++
- left=1(8), right=8(7), width=7, h=7, water=49, maxWater=49
- height[1]>height[8], right--
- left=1(8), right=7(3), width=6, h=3, water=18, maxWater=49
- ... 继续移动，但都无法超过49
- 最终返回 49

### 为什么移动较短边？
- 容量受限于较短边
- 移动较长边：宽度减小，高度不会增加，容量一定减小
- 移动较短边：宽度减小，但高度可能增加，容量可能增大

### 正确性证明
每次移动较短边，实际上排除了以该边为一端的所有情况，因为它们的容量一定不会更大。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "盛最多水的容器 - 双指针演示",
          config: { leftLabel: "left", rightLabel: "right" },
          steps: [
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 0,
              right: 8,
              description: "初始化：left=0(高度1)，right=8(高度7)，宽度=8",
            },
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 0,
              right: 8,
              comparing: [0, 8],
              description: "容量 = min(1,7) × 8 = 8，height[0]=1 较短，移动左边",
            },
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 1,
              right: 8,
              description: "left++ 后，left=1(高度8)，right=8(高度7)，宽度=7",
            },
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 1,
              right: 8,
              comparing: [1, 8],
              highlights: [{ indices: [1, 8], color: "green" as const, label: "最大容量" }],
              description: "容量 = min(8,7) × 7 = 49！这是最大值，height[8]=7 较短，移动右边",
            },
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 1,
              right: 7,
              comparing: [1, 7],
              description: "right-- 后，容量 = min(8,3) × 6 = 18 < 49，继续...",
            },
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 1,
              right: 6,
              comparing: [1, 6],
              description: "容量 = min(8,8) × 5 = 40 < 49，继续...",
            },
            {
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              left: 1,
              right: 8,
              highlights: [{ indices: [1, 8], color: "green" as const, label: "答案" }],
              description: "遍历结束，最大容量 = 49（在 left=1, right=8 时取得）",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "暴力法（不推荐）",
        code: `/**
 * 盛最多水的容器 - 暴力解法
 *
 * 核心思想：
 * 枚举所有可能的边组合，计算每对边形成的容量，取最大值
 *
 * 这种方法思路简单直接，但效率低
 * 对于大数据会超时，仅作为理解问题的基础
 *
 * 时间复杂度：O(n²)，双重循环
 * 空间复杂度：O(1)
 */
function maxArea(height) {
  let maxWater = 0;
  const n = height.length;

  // 枚举所有可能的边组合
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      // 计算容器宽度
      const width = j - i;
      // 计算容器高度（取较短边）
      const h = Math.min(height[i], height[j]);
      // 计算容量并更新最大值
      maxWater = Math.max(maxWater, width * h);
    }
  }

  return maxWater;
}`,
        explanation: `## 暴力法

### 思路
枚举所有可能的边组合，计算每对边形成的容量，取最大值。

### 执行示例
输入: [1,8,6,2]
- i=0, j=1: width=1, h=min(1,8)=1, water=1
- i=0, j=2: width=2, h=min(1,6)=1, water=2
- i=0, j=3: width=3, h=min(1,2)=1, water=3
- i=1, j=2: width=1, h=min(8,6)=6, water=6
- i=1, j=3: width=2, h=min(8,2)=2, water=4
- i=2, j=3: width=1, h=min(6,2)=2, water=2
- 最大值: 6

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
    frontendRelevance: "low",
    frontendNote: "判断子序列",
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
        code: `/**
 * 判断子序列 - 双指针解法
 *
 * 核心思想：
 * 子序列的定义是保持相对顺序的字符序列
 * 使用两个指针分别遍历 s 和 t，按顺序匹配字符
 *
 * 为什么这样做是正确的？
 * - 我们贪心地在 t 中寻找 s 的每个字符
 * - 一旦找到匹配，就继续找下一个
 * - 这样能保证相对顺序不变
 *
 * 时间复杂度：O(m + n)，m 和 n 分别是 s 和 t 的长度
 * 空间复杂度：O(1)，只用常数变量
 */
function isSubsequence(s, t) {
  // i 是 s 的指针，j 是 t 的指针
  let i = 0;
  let j = 0;

  // 当两个指针都没有到达末尾时继续
  while (i < s.length && j < t.length) {
    // 如果当前字符匹配，s 的指针右移
    if (s[i] === t[j]) {
      i++;
    }
    // 无论是否匹配，t 的指针都右移（继续在 t 中寻找）
    j++;
  }

  // 如果 i 到达 s 的末尾，说明 s 的所有字符都在 t 中找到了
  return i === s.length;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "判断子序列 - 双指针演示",
          config: { leftLabel: "i (s)", rightLabel: "j (t)" },
          steps: [
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: -1,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "检查" }],
              description: "s=\"abc\", t=\"ahbgdc\"。i=0 指向 s[0]='a'，j=0 指向 t[0]='a'",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: -1,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "匹配" }],
              description: "s[0]='a' === t[0]='a'，匹配成功！i++，现在 i=1 指向 'b'",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "已匹配" },
                { indices: [1], color: "red" as const, label: "不匹配" },
              ],
              description: "j=1，s[1]='b' !== t[1]='h'，不匹配。j 继续右移",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "已匹配" },
                { indices: [2], color: "green" as const, label: "匹配" },
              ],
              description: "j=2，s[1]='b' === t[2]='b'，匹配成功！i++，现在 i=2 指向 'c'",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 2], color: "green" as const, label: "已匹配" },
                { indices: [3], color: "red" as const, label: "不匹配" },
              ],
              description: "j=3，s[2]='c' !== t[3]='g'，不匹配。j 继续右移",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: 2,
              right: 4,
              highlights: [
                { indices: [0, 2], color: "green" as const, label: "已匹配" },
                { indices: [4], color: "red" as const, label: "不匹配" },
              ],
              description: "j=4，s[2]='c' !== t[4]='d'，不匹配。j 继续右移",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: 2,
              right: 5,
              highlights: [
                { indices: [0, 2], color: "green" as const, label: "已匹配" },
                { indices: [5], color: "green" as const, label: "匹配" },
              ],
              description: "j=5，s[2]='c' === t[5]='c'，匹配成功！i++，现在 i=3",
            },
            {
              array: ["a", "h", "b", "g", "d", "c"],
              left: 5,
              right: 6,
              highlights: [{ indices: [0, 2, 5], color: "green" as const, label: "匹配字符" }],
              description: "i=3 === s.length，所有字符都匹配成功！返回 true",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 双指针法

### 思路
1. 使用两个指针分别指向 s 和 t 的开头
2. 遍历 t，如果当前字符与 s 的当前字符匹配，s 的指针右移
3. 无论是否匹配，t 的指针都右移
4. 最后检查 s 的指针是否到达末尾

### 执行示例
输入: s = "abc", t = "ahbgdc"
- i=0('a'), j=0('a') → 匹配！i=1, j=1
- i=1('b'), j=1('h') → 不匹配，j=2
- i=1('b'), j=2('b') → 匹配！i=2, j=3
- i=2('c'), j=3('g') → 不匹配，j=4
- i=2('c'), j=4('d') → 不匹配，j=5
- i=2('c'), j=5('c') → 匹配！i=3, j=6
- i === s.length(3)，返回 true

### 为什么正确？
我们按顺序在 t 中寻找 s 的每个字符，保持了相对顺序。`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找（进阶）",
        code: `/**
 * 判断子序列 - 二分查找解法（进阶）
 *
 * 核心思想：
 * 预处理 t 中每个字符出现的所有位置
 * 对于 s 的每个字符，用二分查找找到下一个可用位置
 *
 * 适用场景：
 * 当有大量的 s 需要判断是否是同一个 t 的子序列时
 * 预处理一次 t，之后每次查询都很快
 *
 * 时间复杂度：O(m log n)，m 是 s 的长度
 * 空间复杂度：O(n)，存储每个字符的位置列表
 */
function isSubsequence(s, t) {
  // 预处理：记录 t 中每个字符出现的所有位置
  // charPos['a'] = [0, 3, 7] 表示 'a' 在位置 0, 3, 7 出现
  const charPos = {};
  for (let i = 0; i < t.length; i++) {
    if (!charPos[t[i]]) {
      charPos[t[i]] = [];
    }
    charPos[t[i]].push(i);
  }

  // 记录上一个匹配字符在 t 中的位置
  let prevIndex = -1;

  // 遍历 s 的每个字符
  for (const char of s) {
    // 如果该字符在 t 中没出现过，直接返回 false
    if (!charPos[char]) return false;

    const positions = charPos[char];

    // 二分查找：找第一个大于 prevIndex 的位置
    // 这确保了我们按顺序匹配
    let left = 0, right = positions.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (positions[mid] > prevIndex) {
        right = mid;  // 可能是答案，继续往左找
      } else {
        left = mid + 1;  // 太小了，往右找
      }
    }

    // 如果找不到比 prevIndex 大的位置，说明 s 不是 t 的子序列
    if (left === positions.length) return false;

    // 更新 prevIndex 为当前匹配位置
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

### 执行示例
t = "ahbgdc", 预处理:
- charPos = {a:[0], h:[1], b:[2], g:[3], d:[4], c:[5]}

s = "abc":
- char='a', prevIndex=-1, 在[0]中找>-1的, left=0, prevIndex=0
- char='b', prevIndex=0, 在[2]中找>0的, left=0, prevIndex=2
- char='c', prevIndex=2, 在[5]中找>2的, left=0, prevIndex=5
- 全部找到，返回 true

### 复杂度
- 预处理：O(n)
- 每次查询：O(m log n)
- 适合多次查询同一个 t`,
        timeComplexity: "O(m log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划预处理",
        code: `/**
 * 判断子序列 - 动态规划预处理解法
 *
 * 核心思想：
 * 预处理 dp[i][c]：从位置 i 开始，字符 c 第一次出现的位置
 * 查询时直接跳转到目标字符的位置
 *
 * 适用场景：
 * 多次查询同一个 t 的子序列问题，且需要 O(m) 单次查询
 *
 * 时间复杂度：预处理 O(26n)，查询 O(m)
 * 空间复杂度：O(26n)
 */
function isSubsequence(s, t) {
  const n = t.length;

  // dp[i][c] 表示从位置 i 开始，字符 c 第一次出现的位置
  // 初始化为 n+1 行（包含末尾哨兵）
  const dp = Array(n + 1).fill(null).map(() => ({}));

  // 初始化：从位置 n 开始，所有字符都找不到（用 n 表示）
  for (let c = 0; c < 26; c++) {
    dp[n][String.fromCharCode(97 + c)] = n;
  }

  // 从后往前填表（动态规划）
  for (let i = n - 1; i >= 0; i--) {
    for (let c = 0; c < 26; c++) {
      const char = String.fromCharCode(97 + c);
      if (t[i] === char) {
        // 当前位置就是这个字符，所以从 i 开始找 char，就是 i
        dp[i][char] = i;
      } else {
        // 当前位置不是这个字符，需要看后面的位置
        dp[i][char] = dp[i + 1][char];
      }
    }
  }

  // 查询：从位置 0 开始，逐个字符跳转
  let pos = 0;
  for (const char of s) {
    // 如果找不到（返回 n），说明 s 不是 t 的子序列
    if (dp[pos][char] === n) return false;
    // 跳转到下一个位置（当前匹配位置的下一位）
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

### 执行示例
t = "ahbgdc", 构建 dp 表:
位置 5(c): dp[5] = {a:6, b:6, c:5, d:6, ...}
位置 4(d): dp[4] = {a:6, b:6, c:5, d:4, ...}
位置 3(g): dp[3] = {a:6, b:6, c:5, d:4, g:3, ...}
...
位置 0(a): dp[0] = {a:0, b:2, c:5, d:4, g:3, h:1}

查询 s = "abc":
- pos=0, 找'a', dp[0]['a']=0, pos=1
- pos=1, 找'b', dp[1]['b']=2, pos=3
- pos=3, 找'c', dp[3]['c']=5, pos=6
- 全部找到，返回 true

### 复杂度
- 预处理：O(26n)
- 每次查询：O(m)`,
        timeComplexity: "O(m)",
        spaceComplexity: "O(26n)",
      },
    ],
  },

  // 6. 移动零 (283)
  {
    id: "move-zeroes",
    leetcodeId: 283,
    title: "移动零",
    titleEn: "Move Zeroes",
    difficulty: "easy",
    category: "two-pointers",
    tags: ["数组", "双指针"],
    frontendRelevance: "high",
    frontendNote: "双指针移动元素",
    description: `给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [0,1,0,3,12]
输出：[1,3,12,0,0]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0]
输出：[0]
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^4\`
- \`-2^31 <= nums[i] <= 2^31 - 1\``,
    initialCode: `function moveZeroes(nums) {
  // 在此处编写代码，原地修改数组
}`,
    solution: `function moveZeroes(nums) {
  let slow = 0;

  // 将非零元素移到前面
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // 剩余位置填充 0
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { id: "2", name: "单个零", input: [[0]], expected: [0] },
      { id: "3", name: "无零", input: [[1,2,3]], expected: [1,2,3] },
    ],
    hints: [
      "使用双指针",
      "慢指针指向下一个非零元素应该放置的位置",
      "快指针遍历数组找非零元素",
    ],
    explanation: `## 解题思路

### 双指针

使用快慢双指针：
- 慢指针 slow：指向下一个非零元素应该放置的位置
- 快指针 fast：遍历数组

### 算法流程

1. fast 遍历数组，遇到非零元素就放到 slow 位置
2. slow 后移
3. 遍历结束后，slow 之后的位置都填 0

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["remove-element"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `/**
 * 移动零 - 双指针解法（两次遍历）
 *
 * 核心思想：
 * 使用快慢双指针，将非零元素依次移到前面，最后补零
 *
 * 指针含义：
 * - slow（慢指针）：指向下一个非零元素应该放置的位置
 * - fast（快指针）：遍历数组寻找非零元素
 *
 * 为什么这样做？
 * 保持非零元素的相对顺序，同时将零都移到末尾
 *
 * 时间复杂度：O(n)，两次遍历
 * 空间复杂度：O(1)，原地修改
 */
function moveZeroes(nums) {
  // slow 指向下一个非零元素应该放置的位置
  let slow = 0;

  // 第一次遍历：将非零元素依次移到前面
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      // 找到非零元素，放到 slow 位置
      nums[slow] = nums[fast];
      // slow 右移，准备接收下一个非零元素
      slow++;
    }
    // 如果是零，fast 继续向右，slow 不动（等待非零元素）
  }

  // 第二次遍历：slow 之后的位置全部填充 0
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "移动零 - 双指针演示",
          config: { leftLabel: "slow", rightLabel: "fast" },
          steps: [
            {
              array: [0, 1, 0, 3, 12],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "检查" }],
              description: "初始化：slow=0, fast=0。检查 nums[0]=0，是零，fast 右移，slow 不动",
            },
            {
              array: [0, 1, 0, 3, 12],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "非零" }],
              description: "fast=1，nums[1]=1 是非零元素，将其复制到 slow=0 位置",
            },
            {
              array: [1, 1, 0, 3, 12],
              left: 1,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "已处理" }],
              description: "nums[0]=1，slow 右移到 1。fast=2，nums[2]=0 是零，跳过",
            },
            {
              array: [1, 1, 0, 3, 12],
              left: 1,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "非零" }],
              description: "fast=3，nums[3]=3 是非零元素，将其复制到 slow=1 位置",
            },
            {
              array: [1, 3, 0, 3, 12],
              left: 2,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "非零" }],
              description: "nums[1]=3，slow 右移到 2。fast=4，nums[4]=12 是非零元素，复制到 slow=2",
            },
            {
              array: [1, 3, 12, 3, 12],
              left: 3,
              right: 5,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "非零区域" }],
              description: "第一次遍历完成！nums[2]=12，slow=3。slow 之后的位置需要填充 0",
            },
            {
              array: [1, 3, 12, 0, 12],
              left: 3,
              right: 5,
              highlights: [{ indices: [3], color: "red" as const, label: "填零" }],
              description: "第二次遍历：nums[3] = 0",
            },
            {
              array: [1, 3, 12, 0, 0],
              left: 3,
              right: 5,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "非零" },
                { indices: [3, 4], color: "red" as const, label: "零" },
              ],
              description: "完成！nums[4] = 0。最终结果：[1, 3, 12, 0, 0]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 双指针法

### 核心思想
将非零元素依次移到前面，最后补零。

### 执行示例
输入: [0,1,0,3,12]
第一次遍历（移动非零元素）:
- fast=0(0), 是零，跳过
- fast=1(1), slow=0, nums[0]=1, slow=1, nums=[1,1,0,3,12]
- fast=2(0), 是零，跳过
- fast=3(3), slow=1, nums[1]=3, slow=2, nums=[1,3,0,3,12]
- fast=4(12), slow=2, nums[2]=12, slow=3, nums=[1,3,12,3,12]

第二次遍历（补零）:
- i=3, nums[3]=0, nums=[1,3,12,0,12]
- i=4, nums[4]=0, nums=[1,3,12,0,0]

### 两次遍历
1. 第一次：移动非零元素
2. 第二次：填充零`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "一次遍历交换",
        code: `/**
 * 移动零 - 一次遍历交换解法
 *
 * 核心思想：
 * 遇到非零元素时，直接与 slow 位置交换
 * 这样可以在一次遍历中完成所有操作
 *
 * 与两次遍历的区别：
 * - 两次遍历：先移动，后补零
 * - 一次遍历：边移动边交换，零自然被换到后面
 *
 * 优化点：当 slow === fast 时，可以不交换（自己和自己交换没意义）
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(1)，原地修改
 */
function moveZeroes(nums) {
  // slow 指向下一个非零元素应该放置的位置
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      // 优化：只有当 slow 和 fast 不同时才交换
      // 避免无意义的自我交换
      if (slow !== fast) {
        // 交换 slow 和 fast 位置的元素
        // slow 位置是零（或者还没被处理），fast 位置是非零
        [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      }
      // slow 右移，准备接收下一个非零元素
      slow++;
    }
  }
}`,
        explanation: `## 一次遍历交换

### 思路
遇到非零元素时，与 slow 位置交换。

### 执行示例
输入: [0,1,0,3,12]
- fast=0(0), 是零，跳过
- fast=1(1), slow=0, 交换, nums=[1,0,0,3,12], slow=1
- fast=2(0), 是零，跳过
- fast=3(3), slow=1, 交换, nums=[1,3,0,0,12], slow=2
- fast=4(12), slow=2, 交换, nums=[1,3,12,0,0], slow=3

### 特点
- 只需一次遍历
- 写操作次数最少
- 交换操作保证了零被自动移到后面`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
  // 6. 颜色分类 (75)
  {
    id: "sort-colors",
    leetcodeId: 75,
    title: "颜色分类",
    titleEn: "Sort Colors",
    difficulty: "medium" as const,
    category: "two-pointers",
    tags: ["Array", "Two Pointers", "Sorting"],
    frontendRelevance: "medium",
    frontendNote: "荷兰国旗问题",
    description: `给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。

必须在不使用库内置的 sort 函数的情况下解决这个问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [2,0,1]
输出：[0,1,2]
\`\`\``,
    constraints: `- n == nums.length
- 1 <= n <= 300
- nums[i] 为 0、1 或 2`,
    initialCode: `function sortColors(nums: number[]): void {
  // 在这里写你的代码
}`,
    solution: `function sortColors(nums: number[]): void {
  let p0 = 0, p2 = nums.length - 1;
  let curr = 0;

  while (curr <= p2) {
    if (nums[curr] === 0) {
      [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
      p0++;
      curr++;
    } else if (nums[curr] === 2) {
      [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
      p2--;
      // 注意：curr 不增加，因为交换来的元素还需要处理
    } else {
      curr++;
    }
  }
}`,
    testCases: [
      { id: "1", name: "标准情况", input: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2] },
      { id: "2", name: "简单情况", input: [[2, 0, 1]], expected: [0, 1, 2] },
    ],
    hints: [
      "荷兰国旗问题",
      "使用三个指针分别标记 0、1、2 的边界",
      "一次遍历完成排序",
    ],
    explanation: `## 解题思路

### 荷兰国旗问题
使用三指针将数组分成三部分：
- [0, p0): 全是 0
- [p0, curr): 全是 1
- (p2, n-1]: 全是 2

### 关键点
当 nums[curr] === 2 时，交换后 curr 不增加，因为交换过来的元素还未处理。`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "三指针（荷兰国旗）",
        code: `/**
 * 颜色分类 - 三指针解法（荷兰国旗问题）
 *
 * 核心思想：
 * 使用三个指针将数组分成四个区间：
 * - [0, p0): 全是 0（红色）
 * - [p0, curr): 全是 1（白色）
 * - [curr, p2]: 待处理区域
 * - (p2, n-1]: 全是 2（蓝色）
 *
 * 这就是著名的荷兰国旗问题（Dutch National Flag Problem）
 * 由 Dijkstra 提出，用于演示算法的优雅性
 *
 * 关键点：
 * - 遇到 0：交换到左边，p0 和 curr 都前进
 * - 遇到 1：curr 直接前进
 * - 遇到 2：交换到右边，只有 p2 后退，curr 不动！
 *   （因为交换过来的元素还未处理，可能是 0、1 或 2）
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(1)，原地排序
 */
function sortColors(nums: number[]): void {
  // p0: 0 的右边界（下一个 0 应该放的位置）
  let p0 = 0;
  // p2: 2 的左边界（下一个 2 应该放的位置）
  let p2 = nums.length - 1;
  // curr: 当前遍历位置
  let curr = 0;

  // 当 curr 超过 p2 时，所有元素都已处理
  while (curr <= p2) {
    if (nums[curr] === 0) {
      // 遇到 0，交换到左边
      // 交换后 p0 位置一定是 1（因为 p0 之前的都处理过了）
      // 所以 curr 可以安全前进
      [nums[curr], nums[p0]] = [nums[p0], nums[curr]];
      p0++;   // 0 的边界扩大
      curr++; // 继续处理下一个
    } else if (nums[curr] === 2) {
      // 遇到 2，交换到右边
      // 交换后 curr 位置的元素是从右边换来的，还未处理
      // 可能是 0、1 或 2，所以 curr 不能前进！
      [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
      p2--;   // 2 的边界扩大，curr 不动
    } else {
      // 遇到 1，是中间值，直接跳过
      curr++;
    }
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "颜色分类 - 三指针（荷兰国旗）演示",
          config: { leftLabel: "p0", rightLabel: "p2" },
          steps: [
            {
              array: [2, 0, 2, 1, 1, 0],
              left: 0,
              right: 5,
              highlights: [{ indices: [0], color: "purple" as const, label: "curr=0" }],
              description: "初始化：p0=0, curr=0, p2=5。nums[curr]=2，是蓝色，需要交换到右边",
            },
            {
              array: [0, 0, 2, 1, 1, 2],
              left: 0,
              right: 4,
              highlights: [
                { indices: [5], color: "blue" as const, label: "蓝色区" },
                { indices: [0], color: "purple" as const, label: "curr=0" },
              ],
              description: "交换 nums[0] 和 nums[5]，p2--=4。curr 不动（交换来的可能是 0/1/2）",
            },
            {
              array: [0, 0, 2, 1, 1, 2],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0], color: "red" as const, label: "红色" },
                { indices: [5], color: "blue" as const, label: "蓝色区" },
              ],
              description: "nums[curr]=0，是红色。由于 p0=curr=0，相当于和自己交换",
            },
            {
              array: [0, 0, 2, 1, 1, 2],
              left: 1,
              right: 4,
              highlights: [
                { indices: [0], color: "red" as const, label: "红色区" },
                { indices: [1], color: "purple" as const, label: "curr=1" },
                { indices: [5], color: "blue" as const, label: "蓝色区" },
              ],
              description: "p0++, curr++。现在 p0=1, curr=1。nums[1]=0，是红色",
            },
            {
              array: [0, 0, 2, 1, 1, 2],
              left: 2,
              right: 4,
              highlights: [
                { indices: [0, 1], color: "red" as const, label: "红色区" },
                { indices: [2], color: "purple" as const, label: "curr=2" },
                { indices: [5], color: "blue" as const, label: "蓝色区" },
              ],
              description: "交换后 p0++, curr++。p0=2, curr=2。nums[2]=2，是蓝色",
            },
            {
              array: [0, 0, 1, 1, 2, 2],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "red" as const, label: "红色区" },
                { indices: [2], color: "purple" as const, label: "curr=2" },
                { indices: [4, 5], color: "blue" as const, label: "蓝色区" },
              ],
              description: "交换 nums[2] 和 nums[4]，p2--=3。curr 不动，检查交换来的元素",
            },
            {
              array: [0, 0, 1, 1, 2, 2],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "red" as const, label: "红色区" },
                { indices: [2], color: "yellow" as const, label: "白色" },
                { indices: [4, 5], color: "blue" as const, label: "蓝色区" },
              ],
              description: "nums[2]=1，是白色，curr++。curr=3",
            },
            {
              array: [0, 0, 1, 1, 2, 2],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "red" as const, label: "红色区" },
                { indices: [2, 3], color: "yellow" as const, label: "白色区" },
                { indices: [4, 5], color: "blue" as const, label: "蓝色区" },
              ],
              description: "nums[3]=1，是白色，curr++。curr=4 > p2=3，循环结束！",
            },
            {
              array: [0, 0, 1, 1, 2, 2],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "red" as const, label: "0(红)" },
                { indices: [2, 3], color: "yellow" as const, label: "1(白)" },
                { indices: [4, 5], color: "blue" as const, label: "2(蓝)" },
              ],
              description: "完成！数组已按 0, 1, 2 顺序排列：[0,0,1,1,2,2]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 三指针（荷兰国旗）

### 核心思想
维护三个区间：
- [0, p0): 存放 0
- [p0, curr): 存放 1
- (p2, n-1]: 存放 2

### 执行示例
输入: [2,0,2,1,1,0]
- curr=0(2), 交换到右边, [0,0,2,1,1,2], p2=4
- curr=0(0), 交换到左边, [0,0,2,1,1,2], p0=1, curr=1
- curr=1(0), 交换到左边, [0,0,2,1,1,2], p0=2, curr=2
- curr=2(2), 交换到右边, [0,0,1,1,2,2], p2=3
- curr=2(1), 是1, curr=3
- curr=3(1), 是1, curr=4
- curr > p2, 结束
- 结果: [0,0,1,1,2,2]

### 关键
当遇到 2 交换后，curr 不前进，因为交换过来的可能是 0。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "两次遍历计数",
        code: `/**
 * 颜色分类 - 两次遍历计数解法
 *
 * 核心思想：
 * 第一次遍历统计 0、1、2 的数量
 * 第二次遍历按顺序重新填充数组
 *
 * 这种方法思路简单，但需要两次遍历
 * 适合理解问题，面试中通常需要用三指针的一次遍历解法
 *
 * 时间复杂度：O(n)，两次遍历
 * 空间复杂度：O(1)，只用常数变量
 */
function sortColors(nums: number[]): void {
  // 统计各颜色数量
  let count0 = 0, count1 = 0, count2 = 0;

  // 第一次遍历：统计
  for (const num of nums) {
    if (num === 0) count0++;
    else if (num === 1) count1++;
    else count2++;
  }

  // 第二次遍历：重新填充数组
  let i = 0;

  // 先填充所有的 0
  while (count0-- > 0) nums[i++] = 0;
  // 再填充所有的 1
  while (count1-- > 0) nums[i++] = 1;
  // 最后填充所有的 2
  while (count2-- > 0) nums[i++] = 2;
}`,
        explanation: `## 两次遍历计数

### 思路
1. 第一次遍历统计 0、1、2 的数量
2. 第二次遍历按顺序填充

### 执行示例
输入: [2,0,2,1,1,0]
第一次遍历：count0=2, count1=2, count2=2
第二次遍历：
- 填充 2 个 0: [0,0,_,_,_,_]
- 填充 2 个 1: [0,0,1,1,_,_]
- 填充 2 个 2: [0,0,1,1,2,2]

### 缺点
需要两次遍历，不如三指针优雅`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
  // 7. 寻找重复数 (287)
  {
    id: "find-the-duplicate-number",
    leetcodeId: 287,
    title: "寻找重复数",
    titleEn: "Find the Duplicate Number",
    difficulty: "medium" as const,
    category: "two-pointers",
    tags: ["Array", "Two Pointers", "Binary Search", "Bit Manipulation"],
    frontendRelevance: "medium",
    frontendNote: "Floyd判圈",
    description: `给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。

假设 nums 只有一个重复的整数 ，返回这个重复的数 。

你设计的解决方案必须 **不修改** 数组 nums 且只用常量级 O(1) 的额外空间。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,3,4,2,2]
输出：2
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,1,3,4,2]
输出：3
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [3,3,3,3,3]
输出：3
\`\`\``,
    constraints: `- 1 <= n <= 10^5
- nums.length == n + 1
- 1 <= nums[i] <= n
- nums 中只有一个整数出现两次或多次，其余整数均只出现一次`,
    initialCode: `function findDuplicate(nums: number[]): number {
  // 在这里写你的代码
}`,
    solution: `function findDuplicate(nums: number[]): number {
  // 快慢指针找环
  let slow = nums[0];
  let fast = nums[0];

  // 第一次相遇
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // 找环入口
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}`,
    testCases: [
      { id: "1", name: "标准情况", input: [[1, 3, 4, 2, 2]], expected: 2 },
      { id: "2", name: "中间重复", input: [[3, 1, 3, 4, 2]], expected: 3 },
      { id: "3", name: "全部重复", input: [[3, 3, 3, 3, 3]], expected: 3 },
    ],
    hints: [
      "将数组看作链表，nums[i] 指向下一个节点",
      "问题转化为找链表环的入口",
      "使用快慢指针（Floyd判圈算法）",
    ],
    explanation: `## 解题思路

### 链表视角
将数组看作链表：索引 i 指向 nums[i]。
- 由于有重复数字，必然形成环
- 重复的数字就是环的入口

### Floyd判圈算法
1. 快慢指针找到环内相遇点
2. 一个从起点，一个从相遇点，同速前进
3. 再次相遇点就是环入口`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "快慢指针（Floyd判圈）",
        code: `/**
 * 寻找重复数 - 快慢指针解法（Floyd判圈算法）
 *
 * 核心思想：
 * 将数组看作一个隐式的链表：
 * - 索引 i 看作节点 i
 * - nums[i] 看作节点 i 指向的下一个节点
 * - 例如 nums = [1,3,4,2,2]
 *   0 → 1 → 3 → 2 → 4 → 2 → 4 → 2 → ...（形成环）
 *
 * 由于有重复数字，必然有两个不同的索引指向同一个位置，形成环！
 * 重复的数字就是环的入口节点
 *
 * 这个问题等价于：链表中找环的入口（经典的 Floyd 判圈问题）
 *
 * Floyd 判圈算法分两阶段：
 * 1. 找相遇点：快指针走两步，慢指针走一步，必定在环内相遇
 * 2. 找入口：一个从起点，一个从相遇点，同速前进，再次相遇即入口
 *
 * 数学证明：
 * 设起点到入口距离为 a，入口到相遇点距离为 b，环长为 c
 * - 慢指针走了 a + b
 * - 快指针走了 a + b + kc = 2(a + b)，其中 k 是快指针多绕的圈数
 * - 所以 kc = a + b，即 a = kc - b = (k-1)c + (c-b)
 * - c - b 是从相遇点到入口的距离
 * - 所以从起点和相遇点同速走 a 步，会在入口相遇
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，不修改数组
 */
function findDuplicate(nums: number[]): number {
  // 将数组看作链表：i -> nums[i]
  // 从 nums[0] 开始（相当于链表头的下一个节点）
  let slow = nums[0];
  let fast = nums[0];

  // 第一阶段：找到环内的相遇点
  // 快指针每次走两步，慢指针每次走一步
  do {
    slow = nums[slow];      // 慢指针走一步
    fast = nums[nums[fast]]; // 快指针走两步
  } while (slow !== fast);
  // 此时 slow 和 fast 在环内某点相遇

  // 第二阶段：找环的入口（即重复的数字）
  // 一个从起点开始，一个从相遇点开始，都走一步
  slow = nums[0];  // slow 回到起点
  while (slow !== fast) {
    slow = nums[slow];  // 都走一步
    fast = nums[fast];
  }
  // 再次相遇的点就是环的入口，即重复的数字

  return slow;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "寻找重复数 - Floyd判圈演示",
          config: { leftLabel: "slow", rightLabel: "fast" },
          steps: [
            {
              array: [1, 3, 4, 2, 2],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "起点" }],
              description: "数组 [1,3,4,2,2] 构成链表：0→1→3→2→4→2（环）。slow=fast=nums[0]=1",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 1,
              right: 1,
              highlights: [
                { indices: [1], color: "green" as const, label: "slow" },
                { indices: [1], color: "blue" as const, label: "fast" },
              ],
              description: "第一阶段：找环内相遇点。slow=1, fast=1",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 3,
              right: 2,
              highlights: [
                { indices: [3], color: "green" as const, label: "slow=3" },
                { indices: [2], color: "blue" as const, label: "fast=2" },
              ],
              description: "slow=nums[1]=3, fast=nums[nums[1]]=nums[3]=2。slow≠fast，继续",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "purple" as const, label: "相遇!" }],
              description: "slow=nums[3]=2, fast=nums[nums[2]]=nums[4]=2。slow===fast=2，在节点2相遇！",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "slow=1" },
                { indices: [2], color: "blue" as const, label: "fast=2" },
              ],
              description: "第二阶段：找入口。slow 回到起点 nums[0]=1，fast 留在相遇点 2",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 3,
              right: 4,
              highlights: [
                { indices: [3], color: "green" as const, label: "slow=3" },
                { indices: [4], color: "blue" as const, label: "fast=4" },
              ],
              description: "slow=nums[1]=3, fast=nums[2]=4。slow≠fast，继续",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "red" as const, label: "入口=2" }],
              description: "slow=nums[3]=2, fast=nums[4]=2。slow===fast=2，找到环入口！",
            },
            {
              array: [1, 3, 4, 2, 2],
              left: 2,
              right: 2,
              highlights: [
                { indices: [2], color: "red" as const, label: "重复数" },
                { indices: [4], color: "red" as const, label: "重复数" },
              ],
              description: "完成！重复的数是 2（索引 3 和 4 都指向值 2）",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 快慢指针（Floyd判圈）

### 核心思想
将数组抽象为链表：
- 索引是节点
- nums[i] 是下一个节点的索引
- 重复数字导致多个节点指向同一位置，形成环

### 执行示例
输入: [1,3,4,2,2]
构建链表：0→1→3→2→4→2→4→2→...（在2和4之间形成环）

第一阶段（找相遇点）:
- slow=1, fast=1
- slow=nums[1]=3, fast=nums[nums[1]]=nums[3]=2
- slow=nums[3]=2, fast=nums[nums[2]]=nums[4]=2
- slow===fast=2，在节点2相遇

第二阶段（找入口）:
- slow=nums[0]=1, fast=2
- slow=nums[1]=3, fast=nums[2]=4
- slow=nums[3]=2, fast=nums[4]=2
- slow===fast=2，在节点2相遇

返回 2，这就是重复的数字！

### 数学证明
设起点到入口距离 a，入口到相遇点距离 b，环长 c。
- 慢指针走了 a + b
- 快指针走了 a + b + kc = 2(a + b)
- 所以 a = kc - b = (k-1)c + (c-b)
- 从头和从相遇点同速走，会在入口相遇`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找",
        code: `/**
 * 寻找重复数 - 二分查找解法
 *
 * 核心思想：
 * 二分的不是数组索引，而是数值范围 [1, n]
 *
 * 关键观察（抽屉原理）：
 * - 如果没有重复，[1, mid] 范围内的数最多有 mid 个
 * - 如果重复数在 [1, mid] 范围内，则 ≤mid 的数的个数 > mid
 *
 * 例如 nums = [1,3,4,2,2], n=4
 * - mid=2, 统计≤2的数：1,2,2，共3个 > 2，重复数在[1,2]
 * - mid=1, 统计≤1的数：1，共1个 = 1，重复数在[2,2]
 * - 返回 2
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(1)
 */
function findDuplicate(nums: number[]): number {
  // 二分的是数值范围，不是索引
  let left = 1, right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // 统计数组中 <= mid 的数的个数
    let count = 0;
    for (const num of nums) {
      if (num <= mid) count++;
    }

    // 抽屉原理：
    // 如果没有重复，[1,mid] 范围的数最多 mid 个
    // 如果 count > mid，说明 [1,mid] 中有重复
    if (count > mid) {
      // 重复数在 [left, mid] 范围
      right = mid;
    } else {
      // 重复数在 [mid+1, right] 范围
      left = mid + 1;
    }
  }

  // left === right，就是重复的数
  return left;
}`,
        explanation: `## 二分查找

### 思路
二分的是数值范围 [1, n]，不是索引。

### 关键观察（抽屉原理）
如果没有重复，[1, mid] 范围内的数最多有 mid 个。
如果重复数在 [1, mid] 范围内，count > mid。

### 执行示例
输入: [1,3,4,2,2], n=4
- left=1, right=4, mid=2
  统计≤2的数: 1,2,2，共3个
  3 > 2，重复数在[1,2], right=2
- left=1, right=2, mid=1
  统计≤1的数: 1，共1个
  1 = 1，重复数在[2,2], left=2
- left=right=2，返回2

### 复杂度
- 时间：O(n log n)，二分 log n 次，每次统计 O(n)
- 空间：O(1)`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
