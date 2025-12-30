import { Problem } from "../types";

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
        code: `function solution(nums1, m, nums2, n) {
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

  return nums1;
}`,
        explanation: `## 逆向双指针

### 思路
从后往前填充，利用 nums1 后面的空位。由于 nums1 的后半部分是空的，可以直接覆盖而不会丢失数据。

### 实现步骤
1. 设置三个指针：p1 指向 nums1 有效末尾，p2 指向 nums2 末尾，p 指向合并后位置
2. 从后往前比较，每次取较大者放入 nums1[p]
3. 当 p2 < 0 时结束，此时 nums1 剩余元素已在正确位置`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "先合并后排序",
        code: `function solution(nums1, m, nums2, n) {
  // 先将 nums2 复制到 nums1 后半部分
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  // 然后排序
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
        code: `function solution(nums1, m, nums2, n) {
  const temp = new Array(m + n);
  let p1 = 0, p2 = 0, p = 0;

  while (p1 < m && p2 < n) {
    if (nums1[p1] <= nums2[p2]) {
      temp[p++] = nums1[p1++];
    } else {
      temp[p++] = nums2[p2++];
    }
  }

  while (p1 < m) temp[p++] = nums1[p1++];
  while (p2 < n) temp[p++] = nums2[p2++];

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
        code: `function solution(nums, val) {
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
        explanation: `## 快慢双指针

### 思路
使用快慢双指针，快指针遍历数组，慢指针指向下一个不等于 val 的元素应该放置的位置。

### 实现步骤
1. 快指针遍历每个元素
2. 遇到不等于 val 的元素，复制到慢指针位置
3. 慢指针前进
4. 返回慢指针值（新数组长度）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "双向双指针",
        code: `function solution(nums, val) {
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
        code: `function solution(nums) {
  if (nums.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

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
        code: `function solution(nums) {
  if (nums.length <= 2) return nums.length;

  const k = 2;
  let slow = k;

  for (let fast = k; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow - k]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
}`,
        explanation: `## 通用双指针解法

### 思路
这是一个通用解法，可以处理"最多保留 k 个重复元素"的问题。

### 核心逻辑
如果 nums[fast] !== nums[slow - k]，说明当前元素放入后不会超过 k 个重复。

### 为什么比较 slow - k？
slow 指向下一个要填入的位置，如果 nums[fast] === nums[slow-k]，说明在 [slow-k, slow-1] 这 k 个位置都是这个值，再放入就会超过 k 个。`,
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
        code: `function solution(nums) {
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
        explanation: `## Boyer-Moore 投票算法

### 思路
把多数元素看作 +1，其他元素看作 -1，总和一定 > 0。

### 算法流程
1. 维护一个候选人 candidate 和计数器 count
2. 遍历数组：count=0 时更换候选人，相等则 count++，不等则 count--
3. 最后的候选人就是多数元素

### 为什么有效？
多数元素出现次数 > n/2，其他所有元素总共 < n/2。抵消后多数元素一定还有剩余。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表计数",
        code: `function solution(nums) {
  const map = new Map();
  const n = nums.length;

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
    if (map.get(num) > n / 2) return num;
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
        code: `function solution(nums) {
  nums.sort((a, b) => a - b);
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
        code: `function solution(nums, k) {
  const n = nums.length;
  k = k % n;

  const reverse = (start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);

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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "使用额外数组",
        code: `function solution(nums, k) {
  const n = nums.length;
  const temp = new Array(n);

  for (let i = 0; i < n; i++) {
    temp[(i + k) % n] = nums[i];
  }

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
        code: `function solution(nums, k) {
  const n = nums.length;
  k = k % n;
  let count = 0;

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
        code: `function solution(prices) {
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
        explanation: `## 一次遍历

### 思路
记录历史最低价格，计算当前能获得的最大利润。

### 实现步骤
1. 遍历数组，对于每一天
2. 更新历史最低价格
3. 计算如果今天卖出能获得的利润
4. 更新最大利润`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `function solution(prices) {
  const n = prices.length;
  // dp[i][0] = 第i天不持有股票的最大利润
  // dp[i][1] = 第i天持有股票的最大利润
  let dp0 = 0;           // 不持有股票
  let dp1 = -prices[0];  // 持有股票

  for (let i = 1; i < n; i++) {
    dp0 = Math.max(dp0, dp1 + prices[i]);
    dp1 = Math.max(dp1, -prices[i]);  // 只能买卖一次，所以是 -prices[i]
  }

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
        code: `function solution(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `function solution(prices) {
  const n = prices.length;
  let dp0 = 0;           // 不持有股票
  let dp1 = -prices[0];  // 持有股票

  for (let i = 1; i < n; i++) {
    const newDp0 = Math.max(dp0, dp1 + prices[i]);
    const newDp1 = Math.max(dp1, dp0 - prices[i]);
    dp0 = newDp0;
    dp1 = newDp1;
  }

  return dp0;
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
        code: `function solution(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
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
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `function solution(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(false);
  dp[0] = true;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && j + nums[j] >= i) {
        dp[i] = true;
        break;
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
        code: `function solution(nums) {
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
        explanation: `## 贪心算法

### 思路
在当前能跳到的范围内，找下一步能跳得最远的位置。

### 实现
维护三个变量：
- jumps: 跳跃次数
- currentEnd: 当前跳跃能到达的边界
- farthest: 在当前范围内能跳到的最远位置

当遍历到 currentEnd 时，必须跳一次，更新边界。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "BFS 思想",
        code: `function solution(nums) {
  if (nums.length <= 1) return 0;

  let jumps = 0;
  let start = 0;
  let end = 0;

  while (end < nums.length - 1) {
    let maxEnd = end;
    for (let i = start; i <= end; i++) {
      maxEnd = Math.max(maxEnd, i + nums[i]);
    }
    start = end + 1;
    end = maxEnd;
    jumps++;
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
        code: `function solution(citations) {
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
        explanation: `## 排序法

### 思路
降序排序后，找最大的 h 使得前 h 篇论文引用数都 >= h。

### 实现
1. 降序排序
2. 从左到右遍历，如果第 i+1 篇论文引用数 >= i+1
3. 说明至少有 i+1 篇论文引用数 >= i+1`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "计数排序",
        code: `function solution(citations) {
  const n = citations.length;
  const count = new Array(n + 1).fill(0);

  // 计数，超过 n 的都算作 n
  for (const c of citations) {
    count[Math.min(c, n)]++;
  }

  // 从大到小累计
  let total = 0;
  for (let i = n; i >= 0; i--) {
    total += count[i];
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
        code: `function solution(nums) {
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
        explanation: `## 左右乘积

### 思路
answer[i] = 左侧乘积 × 右侧乘积

### 实现
1. 第一次遍历：计算每个位置左侧所有元素的乘积
2. 第二次遍历：计算右侧乘积并与左侧乘积相乘

### 空间优化
使用 answer 数组存储左侧乘积，用变量存储右侧乘积`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "两个数组",
        code: `function solution(nums) {
  const n = nums.length;
  const left = new Array(n).fill(1);
  const right = new Array(n).fill(1);

  // 计算左侧乘积
  for (let i = 1; i < n; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  // 计算右侧乘积
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
        code: `function solution(gas, cost) {
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
        explanation: `## 贪心算法

### 思路
1. 如果 sum(gas) < sum(cost)，无解
2. 如果从 i 无法到达 j，则 i 到 j-1 之间的所有点都无法到达 j

### 实现
遍历一次，维护当前油量。当油量 < 0 时，说明当前起点不行，尝试下一个点作为起点。`,
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
        code: `function solution(ratings) {
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
        explanation: `## 两次遍历

### 思路
分别从两个方向遍历，确保满足左右邻居的约束。

### 实现
1. 从左到右：如果 ratings[i] > ratings[i-1]，则 candies[i] = candies[i-1] + 1
2. 从右到左：如果 ratings[i] > ratings[i+1]，则 candies[i] = max(candies[i], candies[i+1] + 1)`,
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
        code: `function solution(height) {
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
        explanation: `## 双指针法

### 思路
每个位置能接的水 = min(左边最高柱子, 右边最高柱子) - 当前高度

使用双指针从两端向中间移动：
- 维护 leftMax 和 rightMax 记录两边的最大高度
- 较矮的一边决定当前能接多少水
- 每次移动较矮的指针

### 关键点
- 如果 height[left] < height[right]，说明左边较矮
- 此时 leftMax 一定 <= rightMax（否则我们会处理右边）
- 所以当前位置能接的水 = leftMax - height[left]`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "单调栈",
        code: `function solution(height) {
  const stack = [];
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (stack.length === 0) break;

      const left = stack[stack.length - 1];
      const width = i - left - 1;
      const h = Math.min(height[left], height[i]) - height[top];
      water += width * h;
    }
    stack.push(i);
  }

  return water;
}`,
        explanation: `## 单调栈

### 思路
维护一个单调递减栈，存储柱子索引：
1. 遍历柱子，如果当前柱子比栈顶高，说明可能形成凹槽
2. 弹出栈顶作为凹槽底部
3. 新栈顶是凹槽左边界，当前柱子是右边界
4. 计算这一层能接的水

### 实现
- 横向计算水量（一层一层算）
- 水量 = 宽度 × 高度
- 宽度 = 右边界索引 - 左边界索引 - 1
- 高度 = min(左边界高度, 右边界高度) - 底部高度`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划",
        code: `function solution(height) {
  const n = height.length;
  if (n === 0) return 0;

  // 预计算每个位置左边的最大高度
  const leftMax = new Array(n);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // 预计算每个位置右边的最大高度
  const rightMax = new Array(n);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // 计算每个位置能接的水
  let water = 0;
  for (let i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return water;
}`,
        explanation: `## 动态规划

### 思路
每个位置能接的水 = min(左边最高, 右边最高) - 当前高度

先预计算两个数组：
- leftMax[i]：位置 i 及其左边的最大高度
- rightMax[i]：位置 i 及其右边的最大高度

然后遍历一遍计算总水量。

### 复杂度
- 需要两次遍历预计算，一次遍历计算答案
- 使用了两个额外数组`,
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
        code: `function solution(s) {
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
        explanation: `## 模拟法

### 思路
罗马数字的规则：
- 通常情况下，小的数字在大的数字右边，值相加
- 特殊情况下，小的数字在大的数字左边，需要减去

### 实现
遍历字符串，比较当前字符和下一个字符：
- 如果当前值 < 下一个值，说明是特殊情况，减去当前值
- 否则加上当前值

### 例子
MCMXCIV = 1000 + (-100 + 1000) + (-10 + 100) + (-1 + 5) = 1994`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "替换特殊组合",
        code: `function solution(s) {
  const map = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  // 将特殊组合替换为单独的符号
  s = s.replace('IV', 'a').replace('IX', 'b')
       .replace('XL', 'c').replace('XC', 'd')
       .replace('CD', 'e').replace('CM', 'f');

  const specialMap = {
    'a': 4, 'b': 9, 'c': 40, 'd': 90, 'e': 400, 'f': 900
  };

  let result = 0;
  for (const char of s) {
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
代码逻辑更简单，不需要处理特殊情况的判断。`,
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
        code: `function solution(num) {
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
        explanation: `## 贪心法

### 思路
将13个数值（7个基本符号 + 6个特殊组合）从大到小排列，每次尽可能多地使用大的数值。

### 实现步骤
1. 从最大的值（1000）开始
2. 如果 num >= 当前值，就添加对应符号，减去该值
3. 重复直到 num < 当前值
4. 移动到下一个较小的值

### 例子
1994:
- 1994 >= 1000 → M, 剩余 994
- 994 >= 900 → CM, 剩余 94
- 94 >= 90 → XC, 剩余 4
- 4 >= 4 → IV, 剩余 0
结果：MCMXCIV`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
      {
        name: "硬编码法",
        code: `function solution(num) {
  const thousands = ["", "M", "MM", "MMM"];
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return thousands[Math.floor(num / 1000)] +
         hundreds[Math.floor((num % 1000) / 100)] +
         tens[Math.floor((num % 100) / 10)] +
         ones[num % 10];
}`,
        explanation: `## 硬编码法

### 思路
由于 num 的范围是 1-3999，可以预先列出每一位（千位、百位、十位、个位）所有可能的罗马数字表示。

### 实现
- thousands: 千位 0-3 对应的罗马数字
- hundreds: 百位 0-9 对应的罗马数字
- tens: 十位 0-9 对应的罗马数字
- ones: 个位 0-9 对应的罗马数字

直接查表拼接即可。

### 优点
代码简洁，查表速度快，无需循环。`,
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
        code: `function solution(s) {
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
        explanation: `## 反向遍历

### 思路
从字符串末尾开始向前遍历，分两步：
1. 跳过末尾的所有空格
2. 计数字母直到遇到空格或到达开头

### 优点
- 只需要遍历最后一个单词的长度 + 末尾空格数
- 空间复杂度 O(1)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "内置函数",
        code: `function solution(s) {
  const words = s.trim().split(' ').filter(w => w.length > 0);
  return words[words.length - 1].length;
}`,
        explanation: `## 内置函数

### 思路
利用 JavaScript 内置函数：
1. trim() 去除首尾空格
2. split(' ') 按空格分割
3. filter 过滤空字符串
4. 取最后一个单词的长度

### 缺点
空间复杂度较高，需要创建数组存储所有单词。`,
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
        code: `function solution(strs) {
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
        explanation: `## 横向扫描

### 思路
以第一个字符串为初始前缀，与后续字符串逐一比较。

### 实现步骤
1. 取第一个字符串作为 prefix
2. 遍历其他字符串
3. 如果当前字符串不以 prefix 开头，就缩短 prefix
4. 重复直到匹配或 prefix 变空

### 例子
["flower", "flow", "flight"]
- prefix = "flower"
- 与 "flow" 比较：不匹配，缩短为 "flowe"、"flow"，匹配
- 与 "flight" 比较：不匹配，缩短为 "flo"、"fl"，匹配
- 返回 "fl"`,
        timeComplexity: "O(mn)",
        spaceComplexity: "O(1)",
      },
      {
        name: "纵向扫描",
        code: `function solution(strs) {
  if (strs.length === 0) return "";

  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].slice(0, i);
      }
    }
  }

  return strs[0];
}`,
        explanation: `## 纵向扫描

### 思路
逐个字符比较所有字符串的同一位置。

### 实现步骤
1. 以第一个字符串为基准，逐个字符遍历
2. 对于每个字符位置，检查所有字符串该位置是否相同
3. 如果发现不同或超出某字符串长度，返回当前前缀

### 优点
不需要缩短前缀，发现不匹配立即返回。`,
        timeComplexity: "O(mn)",
        spaceComplexity: "O(1)",
      },
      {
        name: "分治法",
        code: `function solution(strs) {
  if (strs.length === 0) return "";

  function commonPrefix(left, right) {
    if (left === right) return strs[left];

    const mid = Math.floor((left + right) / 2);
    const lcpLeft = commonPrefix(left, mid);
    const lcpRight = commonPrefix(mid + 1, right);

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

### 思路
将字符串数组分成两半，递归求解，然后合并结果。

### 实现步骤
1. 将数组分成左右两部分
2. 递归计算左半部分的最长公共前缀
3. 递归计算右半部分的最长公共前缀
4. 合并：找两个前缀的公共前缀

### 复杂度
时间复杂度 O(mn)，空间复杂度 O(m log m) 递归栈。`,
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
        code: `function solution(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}`,
        explanation: `## 内置函数

### 思路
利用 JavaScript 强大的内置函数，一行代码搞定：
1. trim() - 去除首尾空格
2. split(/\\s+/) - 按一个或多个空格分割成数组
3. reverse() - 反转数组
4. join(' ') - 用单个空格连接

### 优点
代码简洁，易于理解。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "双指针倒序",
        code: `function solution(s) {
  let result = "";
  let right = s.length - 1;

  while (right >= 0) {
    // 跳过末尾空格
    while (right >= 0 && s[right] === ' ') {
      right--;
    }
    if (right < 0) break;

    // 找到单词的开始位置
    let left = right;
    while (left >= 0 && s[left] !== ' ') {
      left--;
    }

    // 提取单词
    const word = s.slice(left + 1, right + 1);
    result += result.length > 0 ? ' ' + word : word;

    right = left;
  }

  return result;
}`,
        explanation: `## 双指针倒序

### 思路
从字符串末尾开始，用双指针提取每个单词。

### 实现步骤
1. right 指针跳过末尾空格
2. left 指针找到单词开始位置
3. 提取单词 s[left+1, right+1]
4. 添加到结果中
5. right 移动到 left，继续

### 优点
不依赖内置函数，逻辑清晰。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "原地算法思路（JavaScript 模拟）",
        code: `function solution(s) {
  // 转为数组模拟可变字符串
  let arr = s.trim().split('');

  // 去除多余空格
  let i = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] !== ' ' || (i > 0 && arr[i - 1] !== ' ')) {
      arr[i++] = arr[j];
    }
  }
  arr = arr.slice(0, i);

  // 反转整个数组
  arr.reverse();

  // 反转每个单词
  let start = 0;
  for (let end = 0; end <= arr.length; end++) {
    if (end === arr.length || arr[end] === ' ') {
      // 反转 [start, end-1]
      let left = start, right = end - 1;
      while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
      start = end + 1;
    }
  }

  return arr.join('');
}`,
        explanation: `## 原地算法思路

### 思路（适用于可变字符串语言如 C/C++）
1. 去除多余空格
2. 反转整个字符串
3. 再反转每个单词

### 例子
"the sky is blue"
- 去除空格后："the sky is blue"
- 整体反转："eulb si yks eht"
- 单词反转："blue is sky the"

### 注意
JavaScript 字符串不可变，这里用数组模拟。
真正的原地算法空间复杂度为 O(1)。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },
];
