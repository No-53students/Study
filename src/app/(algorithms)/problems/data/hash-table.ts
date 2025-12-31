import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

// 哈希表分类题目
export const hashTableProblems: Problem[] = [
  // 1. 两数之和 (1)
  {
    id: "two-sum",
    leetcodeId: 1,
    title: "两数之和",
    titleEn: "Two Sum",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数组"],
    frontendRelevance: "high",
    frontendNote: "哈希表经典入门，面试必考",
    description: `给定一个整数数组 \`nums\` 和一个整数目标值 \`target\`，请你在该数组中找出 **和为目标值** \`target\` 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。`,
    examples: `**示例 1：**
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
\`\`\``,
    constraints: `- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **只会存在一个有效答案**

**进阶：** 你可以想出一个时间复杂度小于 O(n²) 的算法吗？`,
    initialCode: `function twoSum(nums, target) {
  // 在此处编写你的代码

}`,
    solution: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // 题目保证有解，不会执行到这里
}`,
    // 多种解法
    solutions: [
      {
        name: "暴力法",
        code: `/**
 * 两数之和 - 暴力枚举解法
 *
 * 核心思想：
 * 枚举所有可能的两数组合，检查它们的和是否等于目标值
 *
 * 时间复杂度：O(n²)，双重循环
 * 空间复杂度：O(1)，只用常数变量
 */
function twoSum(nums, target) {
  // 外层循环：固定第一个数 nums[i]
  for (let i = 0; i < nums.length; i++) {
    // 内层循环：从 i+1 开始，避免使用同一个元素两次
    for (let j = i + 1; j < nums.length; j++) {
      // 检查两数之和是否等于目标值
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  // 题目保证有解，实际不会执行到这里
  return [];
}`,
        explanation: `## 暴力枚举法

### 思路
最直接的方法是枚举所有可能的两数组合，检查它们的和是否等于目标值。

### 执行示例
输入: nums = [2,7,11,15], target = 9
- i=0, j=1: nums[0]+nums[1] = 2+7 = 9 === target ✓
- 返回 [0, 1]

### 实现步骤
1. 使用两层循环遍历所有可能的数对
2. 外层循环 i 从 0 到 n-1
3. 内层循环 j 从 i+1 到 n-1（避免重复和使用相同元素）
4. 如果 nums[i] + nums[j] === target，返回 [i, j]

### 优点
- 实现简单，容易理解
- 不需要额外空间

### 缺点
- 时间复杂度较高，对于大数组效率低`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "两数之和 - 暴力枚举演示",
          steps: [
            {
              array: ["2", "7", "11", "15"],
              left: 0,
              right: 1,
              highlights: [],
              description: "nums=[2,7,11,15], target=9。双重循环枚举所有数对",
            },
            {
              array: ["2", "7", "11", "15"],
              left: 0,
              right: 1,
              comparing: [0, 1],
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "检查" }],
              description: "i=0, j=1: nums[0]+nums[1] = 2+7 = 9 === target ✓",
            },
            {
              array: ["0", "1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "找到答案！返回 [0, 1]",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "哈希表（推荐）",
        code: `/**
 * 两数之和 - 哈希表解法（一遍哈希）
 *
 * 核心思想：
 * 利用哈希表存储已遍历过的元素及其索引
 * 对于每个元素，检查它的"补数"（target - 当前值）是否在哈希表中
 *
 * 为什么边遍历边添加？
 * 避免使用相同元素两次。例如 [3,3], target=6
 * - 如果先把所有数加入再查找，会错误返回 [0,0]
 * - 边遍历边添加确保找到的补数是之前的元素
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(n)，哈希表存储
 */
function twoSum(nums, target) {
  // 创建哈希表：数值 -> 索引
  const map = new Map();

  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 计算需要的补数
    const complement = target - nums[i];

    // 检查补数是否已经在哈希表中
    if (map.has(complement)) {
      // 找到了！返回补数的索引和当前索引
      return [map.get(complement), i];
    }

    // 将当前元素和索引存入哈希表，供后续元素查找
    map.set(nums[i], i);
  }

  // 题目保证有解，实际不会执行到这里
  return [];
}`,
        explanation: `## 哈希表法（推荐）

### 思路
利用哈希表存储已遍历过的元素及其索引，将查找补数的时间从 O(n) 降低到 O(1)。

### 执行示例
输入: nums = [2,7,11,15], target = 9
- i=0, num=2, complement=7, map={}, 7不在map中, map={2:0}
- i=1, num=7, complement=2, map={2:0}, 2在map中！返回 [0,1]

### 实现步骤
1. 创建一个哈希表 Map，存储 "数值 -> 索引" 的映射
2. 遍历数组，对于每个元素 nums[i]：
   - 计算补数 complement = target - nums[i]
   - 检查补数是否在哈希表中
   - 如果在，说明找到了答案，返回 [map.get(complement), i]
   - 如果不在，将当前元素和索引存入哈希表

### 为什么边遍历边添加？
避免使用相同元素两次。如果先把所有数加入哈希表再查找：
- 对于 [3, 3], target = 6
- 会错误返回 [0, 0]（使用了同一个元素两次）

边遍历边添加可以确保找到的补数一定是之前遍历过的元素。

### 优点
- 时间复杂度 O(n)，只需遍历一次
- 代码简洁高效`,
        animation: {
          type: "two-pointers" as const,
          title: "两数之和演示",
          steps: [
            {
              array: ["2", "7", "11", "15"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[2,7,11,15], target=9。用哈希表存储已遍历元素",
            },
            {
              array: ["2", "7", "11", "15"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "当前" }],
              description: "i=0, num=2, 补数=9-2=7。Map为空，7不在Map中。Map={2:0}",
            },
            {
              array: ["2", "7", "11", "15"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "补数" }, { indices: [1], color: "green" as const, label: "当前" }],
              description: "i=1, num=7, 补数=9-7=2。2在Map中！Map.get(2)=0",
            },
            {
              array: ["0", "1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "找到答案！返回[0,1]，nums[0]+nums[1]=2+7=9",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "两遍哈希表",
        code: `/**
 * 两数之和 - 两遍哈希表解法
 *
 * 核心思想：
 * 分两步进行：先将所有元素存入哈希表，再遍历查找补数
 *
 * 与一遍哈希表的区别：
 * - 逻辑更清晰，分为"构建"和"查找"两个阶段
 * - 需要额外检查补数不是当前元素本身
 *
 * 时间复杂度：O(n)，两次遍历
 * 空间复杂度：O(n)，哈希表存储
 */
function twoSum(nums, target) {
  // 创建哈希表
  const map = new Map();

  // 第一遍：将所有元素及其索引存入哈希表
  // 注意：如果有重复元素，后面的索引会覆盖前面的
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  // 第二遍：查找每个元素的补数
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // 检查补数是否存在，且不是当前元素本身
    // 例如 target=6, nums[i]=3，需要确保找到的3不是nums[i]自己
    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }

  // 题目保证有解，实际不会执行到这里
  return [];
}`,
        explanation: `## 两遍哈希表法

### 思路
分两步进行：先将所有元素存入哈希表，再遍历查找补数。

### 执行示例
输入: nums = [3,3], target = 6
第一遍：map = {3: 1}（后面的索引覆盖前面的）
第二遍：
- i=0, complement=3, map.get(3)=1 !== 0 ✓
- 返回 [0, 1]

### 实现步骤
1. **第一遍遍历**：将所有元素及其索引存入哈希表
2. **第二遍遍历**：对于每个元素，查找其补数是否在哈希表中

### 注意事项
需要检查 \`map.get(complement) !== i\`，确保补数不是当前元素本身。

### 与一遍哈希表的区别
- 两遍哈希表需要遍历两次数组
- 但逻辑更清晰，易于理解
- 时间复杂度同样是 O(n)

### 重复元素处理
对于 [3, 3], target = 6：
- 第一遍后，map = {3 -> 1}（后面的索引覆盖前面的）
- 第二遍时，i=0, complement=3, map.get(3)=1 !== 0
- 正确返回 [0, 1]`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "两数之和 - 两遍哈希表演示",
          steps: [
            {
              array: ["3", "3"],
              left: 0,
              right: 1,
              highlights: [],
              description: "nums=[3,3], target=6。第一遍：构建哈希表",
            },
            {
              array: ["3", "3"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "blue" as const, label: "存入" }],
              description: "第一遍 i=0: map.set(3, 0) → map={3:0}",
            },
            {
              array: ["3", "3"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "覆盖" }],
              description: "第一遍 i=1: map.set(3, 1) → map={3:1}（覆盖）",
            },
            {
              array: ["3", "3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "查找" }],
              description: "第二遍 i=0: 补数=3，map.get(3)=1≠0 ✓",
            },
            {
              array: ["0", "1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "找到答案！返回 [0, 1]",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { id: "2", name: "示例2", input: [[3, 2, 4], 6], expected: [1, 2] },
      { id: "3", name: "相同元素", input: [[3, 3], 6], expected: [0, 1] },
      { id: "4", name: "负数", input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
    ],
    hints: [
      "暴力解法需要 O(n²) 时间，可以用哈希表优化",
      "遍历数组，对于每个数，检查 target - nums[i] 是否在哈希表中",
      "边遍历边添加到哈希表",
    ],
    explanation: `## 解题思路

### 哈希表法

1. 创建一个哈希表，存储数值到索引的映射
2. 遍历数组，对于每个数 nums[i]：
   - 计算需要的补数 complement = target - nums[i]
   - 检查补数是否在哈希表中
   - 如果在，返回两个索引
   - 如果不在，将当前数和索引加入哈希表

### 为什么边遍历边添加？
- 如果先把所有数加入哈希表，再遍历查找，会有问题
- 比如 [3,3], target=6，会返回 [0,0]
- 边遍历边添加可以确保找到的补数不是自己

### 复杂度分析
- 时间复杂度：O(n)，只遍历一次数组
- 空间复杂度：O(n)，哈希表存储 n 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["two-sum-ii", "three-sum"],
  },

  // 2. 字母异位词分组 (49)
  {
    id: "group-anagrams",
    leetcodeId: 49,
    title: "字母异位词分组",
    titleEn: "Group Anagrams",
    difficulty: "medium",
    category: "hash-table",
    tags: ["哈希表", "字符串", "排序"],
    frontendRelevance: "high",
    frontendNote: "哈希表分组技巧",
    description: `给你一个字符串数组，请你将 **字母异位词** 组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由重新排列源单词的所有字母得到的一个新单词。`,
    examples: `**示例 1：**
\`\`\`
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

**示例 2：**
\`\`\`
输入: strs = [""]
输出: [[""]]
\`\`\`

**示例 3：**
\`\`\`
输入: strs = ["a"]
输出: [["a"]]
\`\`\``,
    constraints: `- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` 仅包含小写字母`,
    initialCode: `function groupAnagrams(strs) {
  // 在此处编写你的代码

}`,
    solution: `function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 将字符串排序作为 key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}`,
    solutions: [
      {
        name: "排序作为Key",
        code: `/**
 * 字母异位词分组 - 排序作为Key
 *
 * 核心思想：
 * 字母异位词的特点是：包含相同的字母，只是排列顺序不同
 * 因此，将每个字符串排序后，异位词会变成完全相同的字符串
 * 利用这个特性，用排序后的字符串作为哈希表的key进行分组
 *
 * 时间复杂度：O(n × k log k)，n是字符串数量，k是最长字符串长度
 * 空间复杂度：O(n × k)，存储所有字符串和哈希表
 */
function groupAnagrams(strs) {
  // 创建哈希表：排序后的字符串 -> 原字符串数组
  const map = new Map();

  // 遍历每个字符串
  for (const str of strs) {
    // 将字符串拆分成字符数组，排序后再拼接
    // 例如："eat" -> ["e","a","t"] -> ["a","e","t"] -> "aet"
    const key = str.split('').sort().join('');

    // 如果这个key还不存在，创建一个空数组
    if (!map.has(key)) {
      map.set(key, []);
    }
    // 将原字符串加入对应的分组
    map.get(key).push(str);
  }

  // 返回所有分组（Map的values转为数组）
  return Array.from(map.values());
}`,
        explanation: `## 排序作为Key

### 思路
字母异位词排序后的结果相同，可以将排序后的字符串作为哈希表的key。

### 执行示例
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
- "eat" 排序后 -> "aet"
- "tea" 排序后 -> "aet"（与eat相同，加入同一组）
- "tan" 排序后 -> "ant"
- "ate" 排序后 -> "aet"（与eat、tea相同）
- "nat" 排序后 -> "ant"（与tan相同）
- "bat" 排序后 -> "abt"

最终分组：
- "aet": ["eat", "tea", "ate"]
- "ant": ["tan", "nat"]
- "abt": ["bat"]

### 实现步骤
1. 遍历所有字符串
2. 对每个字符串的字符进行排序，得到key
3. 将原字符串加入对应key的数组中
4. 返回所有数组

### 优点
- 思路直观，容易理解
- 实现简单`,
        animation: {
          type: "two-pointers" as const,
          title: "字母异位词分组演示",
          steps: [
            {
              array: ["eat", "tea", "tan", "ate", "nat", "bat"],
              left: 0,
              right: 5,
              highlights: [],
              description: "strs=[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]。排序后作为key分组",
            },
            {
              array: ["eat", "tea", "tan", "ate", "nat", "bat"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "aet" }],
              description: "\"eat\"排序→\"aet\"。Map={\"aet\":[\"eat\"]}",
            },
            {
              array: ["eat", "tea", "tan", "ate", "nat", "bat"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "aet" }],
              description: "\"tea\"排序→\"aet\"。Map={\"aet\":[\"eat\",\"tea\"]}",
            },
            {
              array: ["eat", "tea", "tan", "ate", "nat", "bat"],
              left: 0,
              right: 0,
              highlights: [{ indices: [2], color: "yellow" as const, label: "ant" }],
              description: "\"tan\"排序→\"ant\"。Map增加\"ant\"组",
            },
            {
              array: ["eat", "tea", "tan", "ate", "nat", "bat"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0, 1, 3], color: "blue" as const, label: "aet" }, { indices: [2, 4], color: "yellow" as const, label: "ant" }, { indices: [5], color: "red" as const, label: "abt" }],
              description: "处理完所有字符串，分成3组",
            },
            {
              array: ["[bat]", "[nat,tan]", "[ate,eat,tea]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "返回所有分组的数组",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n × k log k)",
        spaceComplexity: "O(n × k)",
      },
      {
        name: "字符计数（推荐）",
        code: `/**
 * 字母异位词分组 - 字符计数法
 *
 * 核心思想：
 * 异位词的字符组成完全相同，所以每个字符的出现次数也相同
 * 用字符计数结果作为key，避免排序的开销
 *
 * 为什么用 '#' 分隔？
 * 避免计数拼接产生歧义：
 * - "1" + "11" = "111"
 * - "11" + "1" = "111"
 * 使用分隔符后："1#11" 和 "11#1" 就不同了
 *
 * 时间复杂度：O(n × k)，n是字符串数量，k是最长字符串长度
 * 空间复杂度：O(n × k)，存储所有字符串和哈希表
 */
function groupAnagrams(strs) {
  // 创建哈希表：计数字符串 -> 原字符串数组
  const map = new Map();

  for (const str of strs) {
    // 创建长度26的计数数组（对应26个小写字母）
    const count = new Array(26).fill(0);

    // 统计每个字符出现的次数
    for (const char of str) {
      // 'a'的ASCII码是97，减去97得到0-25的索引
      count[char.charCodeAt(0) - 97]++;
    }

    // 用计数数组生成key，用'#'分隔
    // 例如 "eat": a出现1次，e出现1次，t出现1次
    // key = "1#0#0#0#1#0#0#0#0#0#0#0#0#0#0#0#0#0#0#1#0#0#0#0#0#0"
    const key = count.join('#');

    // 如果key不存在，创建新数组
    if (!map.has(key)) {
      map.set(key, []);
    }
    // 将原字符串加入分组
    map.get(key).push(str);
  }

  // 返回所有分组
  return Array.from(map.values());
}`,
        explanation: `## 字符计数法（推荐）

### 思路
统计每个字符串中各字符的数量，用计数结果作为key。

### 执行示例
输入: ["eat", "tea", "tan"]
- "eat": a=1, e=1, t=1 -> key="1#0#0#0#1#...#1#..."
- "tea": a=1, e=1, t=1 -> key相同，加入同一组
- "tan": a=1, n=1, t=1 -> key不同，新建分组

### 实现步骤
1. 对每个字符串，统计26个字母各出现多少次
2. 将计数数组转换为字符串作为key（如 "1#0#2#..."）
3. 相同key的字符串是异位词

### 为什么更优？
- 避免了排序操作，时间复杂度从 O(k log k) 降为 O(k)
- 特别是当字符串较长时，优势更明显

### 注意事项
- 使用 '#' 分隔计数，避免 "1" + "11" = "11" + "1" 的问题`,
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(n × k)",
        animation: {
          type: "two-pointers" as const,
          title: "字母异位词分组 - 字符计数演示",
          steps: [
            {
              array: ["eat", "tea", "tan"],
              left: 0,
              right: 0,
              highlights: [],
              description: "输入: [\"eat\", \"tea\", \"tan\"]。统计每个字符串的字符计数",
            },
            {
              array: ["eat", "tea", "tan"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "计数" }],
              description: "\"eat\": a=1,e=1,t=1 → key=\"1#0#0#0#1#...#1\"",
            },
            {
              array: ["eat", "tea", "tan"],
              left: 1,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "同组" }],
              description: "\"tea\": a=1,e=1,t=1 → key相同，与\"eat\"同组",
            },
            {
              array: ["eat", "tea", "tan"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "新组" }],
              description: "\"tan\": a=1,n=1,t=1 → key不同，新建分组",
            },
            {
              array: ["[eat,tea]", "[tan]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "完成！返回 [[\"eat\",\"tea\"], [\"tan\"]]",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
      { id: "2", name: "空字符串", input: [[""]], expected: [[""]] },
      { id: "3", name: "单字符", input: [["a"]], expected: [["a"]] },
    ],
    hints: [
      "字母异位词排序后的结果相同",
      "使用排序后的字符串作为哈希表的 key",
      "也可以用字符计数作为 key",
    ],
    explanation: `## 解题思路

### 方法一：排序作为 key

字母异位词的特点是：排序后的字符串相同。

1. 遍历所有字符串
2. 对每个字符串排序，得到 key
3. 将原字符串加入对应 key 的数组中
4. 返回所有数组

### 方法二：字符计数作为 key

1. 统计每个字符串中各字符的数量
2. 用类似 "a1b2c3" 的格式作为 key
3. 相同 key 的字符串是异位词

### 复杂度分析（方法一）
- 时间复杂度：O(n × k log k)，n 是字符串数量，k 是最长字符串长度
- 空间复杂度：O(n × k)，存储所有字符串`,
    timeComplexity: "O(n × k log k)",
    spaceComplexity: "O(n × k)",
    relatedProblems: ["valid-anagram", "two-sum"],
  },

  // 3. 有效的字母异位词 (242)
  {
    id: "valid-anagram",
    leetcodeId: 242,
    title: "有效的字母异位词",
    titleEn: "Valid Anagram",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串", "排序"],
    frontendRelevance: "high",
    frontendNote: "哈希表字符统计",
    description: `给定两个字符串 \`s\` 和 \`t\`，编写一个函数来判断 \`t\` 是否是 \`s\` 的字母异位词。

**注意：** 若 \`s\` 和 \`t\` 中每个字符出现的次数都相同，则称 \`s\` 和 \`t\` 互为字母异位词。`,
    examples: `**示例 1：**
\`\`\`
输入: s = "anagram", t = "nagaram"
输出: true
\`\`\`

**示例 2：**
\`\`\`
输入: s = "rat", t = "car"
输出: false
\`\`\``,
    constraints: `- \`1 <= s.length, t.length <= 5 * 10^4\`
- \`s\` 和 \`t\` 仅包含小写字母

**进阶：** 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？`,
    initialCode: `function isAnagram(s, t) {
  // 在此处编写你的代码

}`,
    solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}`,
    solutions: [
      {
        name: "排序比较",
        code: `/**
 * 有效的字母异位词 - 排序比较法
 *
 * 核心思想：
 * 字母异位词包含相同的字母，只是排列顺序不同
 * 排序后，异位词会变成完全相同的字符串
 *
 * 时间复杂度：O(n log n)，排序的时间复杂度
 * 空间复杂度：O(n)，split创建的数组
 */
function isAnagram(s, t) {
  // 长度不同，不可能是异位词
  if (s.length !== t.length) return false;

  // 将两个字符串排序后比较
  // split('') 将字符串转为字符数组
  // sort() 排序
  // join('') 重新拼接成字符串
  return s.split('').sort().join('') === t.split('').sort().join('');
}`,
        explanation: `## 排序比较法

### 思路
字母异位词排序后的结果相同。

### 执行示例
输入: s = "anagram", t = "nagaram"
- s 排序后: "aaagmnr"
- t 排序后: "aaagmnr"
- 相等，返回 true

输入: s = "rat", t = "car"
- s 排序后: "art"
- t 排序后: "acr"
- 不相等，返回 false

### 实现
1. 如果长度不同，返回 false
2. 将两个字符串排序
3. 比较排序后的字符串是否相等

### 优缺点
- 优点：实现简单，一行代码
- 缺点：排序时间复杂度较高`,
        animation: {
          type: "two-pointers" as const,
          title: "有效的字母异位词演示",
          steps: [
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 6,
              highlights: [],
              description: "s=\"anagram\", t=\"nagaram\"。用计数数组检测是否为异位词",
            },
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "+1" }],
              description: "s[0]='a'，count[a]++。t[0]='n'，count[n]--",
            },
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 0,
              highlights: [{ indices: [1], color: "green" as const, label: "+1" }],
              description: "s[1]='n'，count[n]++。t[1]='a'，count[a]--。计数抵消",
            },
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6], color: "blue" as const, label: "遍历" }],
              description: "继续遍历所有字符，+1和-1相互抵消",
            },
            {
              array: ["0", "0", "0", "0", "0", "0", "0"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6], color: "green" as const, label: "全0" }],
              description: "所有计数为0，s和t是异位词！返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "字符计数（推荐）",
        code: `/**
 * 有效的字母异位词 - 字符计数法
 *
 * 核心思想：
 * 异位词的每个字符出现次数相同
 * 用一个计数数组，s中的字符+1，t中的字符-1
 * 最后所有计数应该为0
 *
 * 优化：只需一次遍历，同时处理s和t
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(1)，固定大小的数组（26）
 */
function isAnagram(s, t) {
  // 长度不同，不可能是异位词
  if (s.length !== t.length) return false;

  // 创建长度26的计数数组，对应26个小写字母
  const count = new Array(26).fill(0);

  // 一次遍历，同时处理两个字符串
  for (let i = 0; i < s.length; i++) {
    // s中的字符，计数+1
    count[s.charCodeAt(i) - 97]++;
    // t中的字符，计数-1
    count[t.charCodeAt(i) - 97]--;
  }

  // 检查所有计数是否为0
  // 如果是异位词，+1和-1会相互抵消
  return count.every(c => c === 0);
}`,
        explanation: `## 字符计数法（推荐）

### 思路
统计两个字符串中各字符的出现次数，如果完全相同则是异位词。

### 执行示例
输入: s = "anagram", t = "nagaram"
遍历过程（简化展示）：
- i=0: s[0]='a' +1, t[0]='n' -1 -> count[a]=1, count[n]=-1
- i=1: s[1]='n' +1, t[1]='a' -1 -> count[a]=0, count[n]=0
- ...
最终所有计数为0，返回 true

### 实现
1. 使用长度26的数组统计字符出现次数
2. 遍历时，s中的字符+1，t中的字符-1
3. 最后检查数组是否全为0

### 优化点
- 只遍历一次两个字符串
- 使用数组比Map更快（O(1)访问）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "有效异位词 - 字符计数演示",
          steps: [
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 0,
              highlights: [],
              description: "s=\"anagram\", t=\"nagaram\"。用count数组统计",
            },
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "s[0]" }],
              description: "i=0: s[0]='a' count[a]++, t[0]='n' count[n]--",
            },
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 3,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "处理中" }],
              description: "继续遍历...每个字符s中+1,t中-1",
            },
            {
              array: ["0", "0", "0", "0", "0"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "全为0" }],
              description: "遍历完成，所有count为0 → 返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "哈希表（Unicode支持）",
        code: `/**
 * 有效的字母异位词 - 哈希表法（支持Unicode）
 *
 * 核心思想：
 * 使用Map统计字符频率，可以支持任意Unicode字符
 * 先统计s中所有字符，再遍历t进行消减
 *
 * 适用场景：
 * - 输入包含Unicode字符（如中文、emoji）
 * - 字符集不确定时
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(k)，k为字符集大小
 */
function isAnagram(s, t) {
  // 长度不同，不可能是异位词
  if (s.length !== t.length) return false;

  // 创建哈希表：字符 -> 出现次数
  const map = new Map();

  // 第一遍：统计s中每个字符的出现次数
  for (const char of s) {
    // 如果字符已存在，次数+1；否则设为1
    map.set(char, (map.get(char) || 0) + 1);
  }

  // 第二遍：遍历t，消减计数
  for (const char of t) {
    // 如果字符不存在或已用完，不是异位词
    if (!map.has(char) || map.get(char) === 0) {
      return false;
    }
    // 消减计数
    map.set(char, map.get(char) - 1);
  }

  // 能走到这里说明t中的每个字符在s中都找到了对应
  return true;
}`,
        explanation: `## 哈希表法（支持Unicode）

### 思路
使用Map统计字符频率，支持任意Unicode字符。

### 执行示例
输入: s = "anagram", t = "nagaram"
第一遍遍历s：map = {a:3, n:1, g:1, r:1, m:1}
第二遍遍历t：
- 'n': map[n]=0 ✓
- 'a': map[a]=2 ✓
- 'g': map[g]=0 ✓
- ...
全部匹配，返回 true

### 实现
1. 遍历s，统计每个字符的出现次数
2. 遍历t，减少对应字符的计数
3. 如果字符不存在或计数为0，返回false

### 适用场景
- 当输入包含Unicode字符时
- 字符集不确定时`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
        animation: {
          type: "two-pointers" as const,
          title: "有效异位词 - 哈希表演示",
          steps: [
            {
              array: ["a", "n", "a", "g", "r", "a", "m"],
              left: 0,
              right: 6,
              highlights: [],
              description: "s=\"anagram\"。第一遍：统计s中字符频率",
            },
            {
              array: ["a:3", "n:1", "g:1", "r:1", "m:1"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "map" }],
              description: "统计完成：map={a:3, n:1, g:1, r:1, m:1}",
            },
            {
              array: ["n", "a", "g", "a", "r", "a", "m"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0], color: "yellow" as const, label: "t[i]" }],
              description: "第二遍：遍历t=\"nagaram\"，消减计数",
            },
            {
              array: ["a:0", "n:0", "g:0", "r:0", "m:0"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "全匹配" }],
              description: "全部匹配成功 → 返回true",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: ["anagram", "nagaram"], expected: true },
      { id: "2", name: "示例2", input: ["rat", "car"], expected: false },
      { id: "3", name: "相同字符串", input: ["abc", "abc"], expected: true },
      { id: "4", name: "长度不同", input: ["ab", "abc"], expected: false },
    ],
    hints: [
      "如果两个字符串长度不同，肯定不是异位词",
      "可以用数组统计每个字符出现的次数",
      "s 中的字符加一，t 中的字符减一，最后检查是否全为0",
    ],
    explanation: `## 解题思路

### 方法一：字符计数

1. 如果长度不同，直接返回 false
2. 使用长度为 26 的数组统计字符出现次数
3. 遍历两个字符串，s 中的字符 +1，t 中的字符 -1
4. 最后检查数组是否全为 0

### 方法二：排序

1. 将两个字符串排序
2. 比较排序后的字符串是否相等

### 进阶：Unicode 字符

如果包含 Unicode 字符，可以使用哈希表代替数组：
- 使用 Map 统计字符频率
- 遍历 s 增加计数，遍历 t 减少计数
- 检查所有计数是否为 0

### 复杂度分析
- 时间复杂度：O(n)，n 是字符串长度
- 空间复杂度：O(1)，只使用固定大小的数组（26）`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["group-anagrams"],
  },

  // 4. 快乐数 (202)
  {
    id: "happy-number",
    leetcodeId: 202,
    title: "快乐数",
    titleEn: "Happy Number",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数学", "双指针"],
    frontendRelevance: "medium",
    frontendNote: "快乐数，哈希判环",
    description: `编写一个算法来判断一个数 \`n\` 是不是快乐数。

**「快乐数」** 定义为：
- 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
- 然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。
- 如果这个过程 **结果为** 1，那么这个数就是快乐数。

如果 \`n\` 是 *快乐数* 就返回 \`true\`；不是，则返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 19
输出：true
解释：
1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
1² + 0² + 0² = 1
\`\`\`

**示例 2：**
\`\`\`
输入：n = 2
输出：false
\`\`\``,
    constraints: `- \`1 <= n <= 2^31 - 1\``,
    initialCode: `function isHappy(n) {
  // 在此处编写你的代码

}`,
    solution: `function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }

  return n === 1;
}

function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
    solutions: [
      {
        name: "哈希表检测循环",
        code: `/**
 * 快乐数 - 哈希表检测循环
 *
 * 核心思想：
 * 不是快乐数的数会进入无限循环
 * 使用Set记录已出现的数，如果再次出现说明进入循环
 *
 * 为什么会循环？
 * 对于32位整数，最大值约21亿，其各位数字平方和最大约为9²×10=810
 * 所以平方和会快速收敛到一个较小的范围，最终要么到达1，要么进入循环
 *
 * 时间复杂度：O(log n)，取决于数字的位数
 * 空间复杂度：O(log n)，Set存储的数的个数
 */
function isHappy(n) {
  // 使用Set记录出现过的数
  const seen = new Set();

  // 当n不等于1且没有出现过时，继续计算
  while (n !== 1 && !seen.has(n)) {
    // 将当前数加入集合
    seen.add(n);
    // 计算各位数字的平方和
    n = getNext(n);
  }

  // 如果n等于1，是快乐数；否则进入了循环，不是快乐数
  return n === 1;
}

/**
 * 计算一个数各位数字的平方和
 * 例如：19 -> 1² + 9² = 1 + 81 = 82
 */
function getNext(n) {
  let sum = 0;
  while (n > 0) {
    // 取最后一位数字
    const digit = n % 10;
    // 加上该位数字的平方
    sum += digit * digit;
    // 去掉最后一位
    n = Math.floor(n / 10);
  }
  return sum;
}`,
        explanation: `## 哈希表检测循环

### 思路
如果不是快乐数，会进入无限循环。使用哈希表记录已出现的数来检测循环。

### 执行示例
输入: n = 19
- 19: 1² + 9² = 82
- 82: 8² + 2² = 68
- 68: 6² + 8² = 100
- 100: 1² + 0² + 0² = 1 ✓
返回 true

输入: n = 2
- 2 -> 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4（循环）
返回 false

### 实现
1. 使用Set记录出现过的数
2. 重复计算各位数字的平方和
3. 如果结果为1，返回true
4. 如果结果已在Set中，说明进入循环，返回false`,
        animation: {
          type: "two-pointers" as const,
          title: "快乐数演示",
          steps: [
            {
              array: ["19"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "n" }],
              description: "n=19，使用Set记录出现过的数来检测循环",
            },
            {
              array: ["19", "→", "82"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "seen" },
                { indices: [2], color: "blue" as const, label: "当前" },
              ],
              description: "19: 1²+9²=1+81=82。Set={19}",
            },
            {
              array: ["19", "→", "82", "→", "68"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 2], color: "gray" as const, label: "seen" },
                { indices: [4], color: "blue" as const, label: "当前" },
              ],
              description: "82: 8²+2²=64+4=68。Set={19,82}",
            },
            {
              array: ["19", "→", "82", "→", "68", "→", "100"],
              left: 0,
              right: 6,
              highlights: [
                { indices: [0, 2, 4], color: "gray" as const, label: "seen" },
                { indices: [6], color: "blue" as const, label: "当前" },
              ],
              description: "68: 6²+8²=36+64=100。Set={19,82,68}",
            },
            {
              array: ["19", "→", "82", "→", "68", "→", "100", "→", "1"],
              left: 0,
              right: 8,
              highlights: [
                { indices: [0, 2, 4, 6], color: "gray" as const, label: "seen" },
                { indices: [8], color: "green" as const, label: "=1!" },
              ],
              description: "100: 1²+0²+0²=1。n===1，是快乐数！返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "快慢指针（推荐）",
        code: `/**
 * 快乐数 - 快慢指针法（Floyd判圈算法）
 *
 * 核心思想：
 * 把计算平方和的过程看作一个链表（隐式链表）
 * - 当前数是节点
 * - 平方和是下一个节点
 * 问题转化为：检测链表是否有环，如果有环是否环的入口是1
 *
 * 快慢指针原理：
 * - 慢指针每次走一步
 * - 快指针每次走两步
 * - 如果有环，快慢指针一定会相遇
 * - 如果没有环（到达1），快指针会先到达1
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)，不需要额外存储
 */
function isHappy(n) {
  // 初始化快慢指针
  let slow = n;
  let fast = getNext(n);

  // 当快指针不等于1且快慢指针不相遇时，继续移动
  while (fast !== 1 && slow !== fast) {
    // 慢指针走一步
    slow = getNext(slow);
    // 快指针走两步
    fast = getNext(getNext(fast));
  }

  // 如果快指针等于1，说明是快乐数
  return fast === 1;
}

/**
 * 计算各位数字的平方和
 */
function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
        explanation: `## 快慢指针法（推荐）

### 思路
类似于检测链表循环，使用快慢指针。

### 执行示例
输入: n = 19
- slow=19, fast=82
- slow=82, fast=100
- slow=68, fast=1 ✓
fast === 1，返回 true

### 实现
1. 慢指针每次计算一次平方和
2. 快指针每次计算两次平方和
3. 如果是快乐数，快指针会先到达1
4. 如果不是，快慢指针会在循环中相遇

### 优点
- 空间复杂度O(1)，不需要额外存储`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "快乐数 - 快慢指针演示",
          steps: [
            {
              array: ["19", "82", "68", "100", "1"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "slow" },
                { indices: [1], color: "green" as const, label: "fast" },
              ],
              description: "n=19。初始化：slow=19, fast=getNext(19)=82",
            },
            {
              array: ["19", "82", "68", "100", "1"],
              left: 1,
              right: 3,
              highlights: [
                { indices: [1], color: "blue" as const, label: "slow" },
                { indices: [3], color: "green" as const, label: "fast" },
              ],
              description: "slow=getNext(19)=82, fast=getNext(getNext(82))=getNext(68)=100",
            },
            {
              array: ["19", "82", "68", "100", "1"],
              left: 2,
              right: 4,
              highlights: [
                { indices: [2], color: "blue" as const, label: "slow" },
                { indices: [4], color: "green" as const, label: "fast=1!" },
              ],
              description: "slow=68, fast=getNext(getNext(100))=getNext(1)=1。fast===1，是快乐数！",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "快指针先到达1，说明19是快乐数，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "数学规律",
        code: `/**
 * 快乐数 - 数学规律法
 *
 * 核心思想：
 * 数学证明：所有不快乐的数最终都会进入一个固定的循环
 * 循环序列：4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4
 *
 * 利用这个规律，可以直接判断是否进入循环
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)，只存储固定的循环数
 */
function isHappy(n) {
  // 已知的循环数集合（不快乐的数最终会进入这个循环）
  // 这个循环是数学证明的结果
  const cycle = new Set([4, 16, 37, 58, 89, 145, 42, 20]);

  // 当n不等于1且不在循环中时，继续计算
  while (n !== 1 && !cycle.has(n)) {
    n = getNext(n);
  }

  // 如果n等于1，是快乐数
  return n === 1;
}

/**
 * 计算各位数字的平方和
 */
function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}`,
        explanation: `## 数学规律法

### 思路
数学证明：不快乐的数最终都会进入一个固定的循环：
4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4

### 验证这个循环
- 4: 4² = 16
- 16: 1² + 6² = 37
- 37: 3² + 7² = 58
- 58: 5² + 8² = 89
- 89: 8² + 9² = 145
- 145: 1² + 4² + 5² = 42
- 42: 4² + 2² = 20
- 20: 2² + 0² = 4 (回到起点)

### 实现
1. 预先知道循环中的数
2. 如果遇到循环中的数，返回false
3. 如果到达1，返回true

### 优点
- 利用数学规律，直接判断`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "快乐数 - 数学规律演示",
          steps: [
            {
              array: ["4", "16", "37", "58", "89", "145", "42", "20"],
              left: 0,
              right: 7,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7], color: "red" as const, label: "循环集合" }],
              description: "预知的循环集合：{4,16,37,58,89,145,42,20}。任何不快乐数最终会进入此循环",
            },
            {
              array: ["2", "4"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "n=2" },
                { indices: [1], color: "yellow" as const, label: "下一步" },
              ],
              description: "n=2: 2²=4。检查4是否在循环集合中...",
            },
            {
              array: ["2", "4"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "red" as const, label: "在循环中!" },
              ],
              description: "4在循环集合中！说明2不是快乐数，返回false",
            },
            {
              array: ["false"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "结果" }],
              description: "数字2进入了不快乐循环，返回false",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [19], expected: true },
      { id: "2", name: "示例2", input: [2], expected: false },
      { id: "3", name: "1", input: [1], expected: true },
      { id: "4", name: "7", input: [7], expected: true },
    ],
    hints: [
      "如果不是快乐数，会进入无限循环",
      "使用哈希表记录已经出现过的数，检测循环",
      "也可以使用快慢指针检测循环",
    ],
    explanation: `## 解题思路

### 方法一：哈希表检测循环

1. 使用 Set 记录出现过的数
2. 重复计算各位数字的平方和
3. 如果结果为 1，返回 true
4. 如果结果已在 Set 中，说明进入循环，返回 false

### 方法二：快慢指针

类似于检测链表循环：
1. 慢指针每次计算一次平方和
2. 快指针每次计算两次平方和
3. 如果最终相遇且值为 1，是快乐数
4. 如果相遇但值不为 1，不是快乐数

### 复杂度分析
- 时间复杂度：O(log n)，数字的位数决定了迭代次数
- 空间复杂度：O(log n)，哈希表存储的数的个数`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["two-sum", "contains-duplicate"],
  },

  // 5. 存在重复元素 (217)
  {
    id: "contains-duplicate",
    leetcodeId: 217,
    title: "存在重复元素",
    titleEn: "Contains Duplicate",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数组", "排序"],
    frontendRelevance: "high",
    frontendNote: "哈希表判重",
    description: `给你一个整数数组 \`nums\`。如果任一值在数组中出现 **至少两次**，返回 \`true\`；如果数组中每个元素互不相同，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3,1]
输出：true
解释：元素 1 在下标 0 和 3 出现了两次。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,2,3,4]
输出：false
解释：所有元素都不同。
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    initialCode: `function containsDuplicate(nums) {
  // 在此处编写你的代码

}`,
    solution: `function containsDuplicate(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }

  return false;
}`,
    solutions: [
      {
        name: "暴力法",
        code: `/**
 * 存在重复元素 - 暴力枚举法
 *
 * 核心思想：
 * 检查每一对元素是否相等
 *
 * 时间复杂度：O(n²)，双重循环
 * 空间复杂度：O(1)，只用常数变量
 *
 * 注意：大数据量会超时，仅作为思路参考
 */
function containsDuplicate(nums) {
  // 外层循环：固定第一个元素
  for (let i = 0; i < nums.length; i++) {
    // 内层循环：从i+1开始，检查后续元素
    for (let j = i + 1; j < nums.length; j++) {
      // 如果找到相同的元素，返回true
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  // 没有找到重复元素
  return false;
}`,
        explanation: `## 暴力枚举法

### 思路
检查每一对元素是否相等。

### 执行示例
输入: [1, 2, 3, 1]
- i=0, j=1: 1 !== 2
- i=0, j=2: 1 !== 3
- i=0, j=3: 1 === 1 ✓
返回 true

### 实现
使用两层循环比较所有可能的元素对。

### 缺点
时间复杂度太高，大数据量会超时。`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "存在重复元素 - 暴力枚举演示",
          steps: [
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 1,
              highlights: [],
              description: "nums=[1,2,3,1]。双重循环检查每一对元素",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 1,
              comparing: [0, 1],
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "比较" }],
              description: "i=0, j=1: nums[0]=1 !== nums[1]=2",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 2,
              comparing: [0, 2],
              highlights: [{ indices: [0, 2], color: "yellow" as const, label: "比较" }],
              description: "i=0, j=2: nums[0]=1 !== nums[2]=3",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              comparing: [0, 3],
              highlights: [{ indices: [0, 3], color: "green" as const, label: "相等!" }],
              description: "i=0, j=3: nums[0]=1 === nums[3]=1 ✓ 找到重复！",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "存在重复元素，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "排序法",
        code: `/**
 * 存在重复元素 - 排序法
 *
 * 核心思想：
 * 排序后，相同的元素会相邻
 * 只需检查相邻元素是否相等
 *
 * 时间复杂度：O(n log n)，排序的时间复杂度
 * 空间复杂度：O(log n)，排序使用的栈空间
 *
 * 注意：会修改原数组
 */
function containsDuplicate(nums) {
  // 对数组进行排序（升序）
  // 排序后相同的元素会相邻
  nums.sort((a, b) => a - b);

  // 遍历检查相邻元素
  for (let i = 1; i < nums.length; i++) {
    // 如果当前元素等于前一个元素，找到重复
    if (nums[i] === nums[i - 1]) {
      return true;
    }
  }
  // 没有找到重复元素
  return false;
}`,
        explanation: `## 排序法

### 思路
排序后，相同元素会相邻，只需检查相邻元素。

### 执行示例
输入: [1, 2, 3, 1]
排序后: [1, 1, 2, 3]
- i=1: nums[1]=1 === nums[0]=1 ✓
返回 true

### 实现
1. 排序数组
2. 遍历检查相邻元素是否相等

### 注意
会修改原数组`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        animation: {
          type: "two-pointers" as const,
          title: "存在重复元素 - 排序法演示",
          steps: [
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              highlights: [],
              description: "原数组: [1,2,3,1]。先对数组进行排序",
            },
            {
              array: ["1", "1", "2", "3"],
              left: 0,
              right: 3,
              highlights: [],
              description: "排序后: [1,1,2,3]。相同元素变成相邻",
            },
            {
              array: ["1", "1", "2", "3"],
              left: 0,
              right: 1,
              comparing: [0, 1],
              highlights: [{ indices: [0, 1], color: "green" as const, label: "相邻相等!" }],
              description: "i=1: nums[1]=1 === nums[0]=1 ✓ 找到相邻重复！",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "存在重复元素，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "哈希表（推荐）",
        code: `/**
 * 存在重复元素 - 哈希表法（Set）
 *
 * 核心思想：
 * 使用Set存储已遍历的元素
 * Set的has操作是O(1)时间复杂度
 * 如果当前元素已在Set中，说明有重复
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(n)，Set最多存储n个元素
 */
function containsDuplicate(nums) {
  // 创建一个Set来存储已遍历的元素
  const set = new Set();

  // 遍历数组
  for (const num of nums) {
    // 如果当前元素已经在Set中，说明是重复元素
    if (set.has(num)) {
      return true;
    }
    // 将当前元素加入Set
    set.add(num);
  }

  // 遍历完成，没有找到重复元素
  return false;
}

// 一行解法（更简洁但不能提前返回）
// return new Set(nums).size !== nums.length;`,
        explanation: `## 哈希表法（推荐）

### 思路
使用Set存储已遍历的元素，O(1)时间检查重复。

### 执行示例
输入: [1, 2, 3, 1]
- num=1: set={}, 1不在set中, set={1}
- num=2: set={1}, 2不在set中, set={1,2}
- num=3: set={1,2}, 3不在set中, set={1,2,3}
- num=1: set={1,2,3}, 1在set中 ✓
返回 true

### 实现
1. 遍历数组
2. 如果当前元素在Set中，返回true
3. 否则将元素加入Set

### 一行解法
\`return new Set(nums).size !== nums.length;\`
- 将数组转为Set会自动去重
- 如果去重后大小不同，说明有重复`,
        animation: {
          type: "two-pointers" as const,
          title: "存在重复元素演示",
          steps: [
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[1,2,3,1]。用Set存储已遍历元素，检测重复",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "当前" }],
              description: "num=1，Set为空，1不在Set中。Set={1}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "seen" },
                { indices: [1], color: "blue" as const, label: "当前" },
              ],
              description: "num=2，Set={1}，2不在Set中。Set={1,2}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "seen" },
                { indices: [2], color: "blue" as const, label: "当前" },
              ],
              description: "num=3，Set={1,2}，3不在Set中。Set={1,2,3}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "seen" },
                { indices: [3], color: "red" as const, label: "重复!" },
              ],
              description: "num=1，Set={1,2,3}，1已在Set中！发现重复，返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 1]], expected: true },
      { id: "2", name: "示例2", input: [[1, 2, 3, 4]], expected: false },
      { id: "3", name: "多重复", input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
      { id: "4", name: "单元素", input: [[1]], expected: false },
    ],
    hints: [
      "使用 Set 存储已遍历的元素",
      "如果当前元素已在 Set 中，说明有重复",
      "也可以比较 Set 的大小和数组长度",
    ],
    explanation: `## 解题思路

### 方法一：哈希表（Set）

1. 遍历数组
2. 如果当前元素在 Set 中，返回 true
3. 否则将元素加入 Set
4. 遍历结束返回 false

### 方法二：一行解法

\`\`\`javascript
return new Set(nums).size !== nums.length;
\`\`\`

### 方法三：排序

1. 排序数组
2. 检查相邻元素是否相同

### 复杂度分析
- 时间复杂度：O(n)，遍历一次数组
- 空间复杂度：O(n)，Set 最多存储 n 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["happy-number", "contains-duplicate-ii"],
  },

  // 6. 存在重复元素 II (219)
  {
    id: "contains-duplicate-ii",
    leetcodeId: 219,
    title: "存在重复元素 II",
    titleEn: "Contains Duplicate II",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "数组", "滑动窗口"],
    frontendRelevance: "medium",
    frontendNote: "滑动窗口+哈希",
    description: `给你一个整数数组 \`nums\` 和一个整数 \`k\`，判断数组中是否存在两个 **不同的索引** \`i\` 和 \`j\`，满足 \`nums[i] == nums[j]\` 且 \`abs(i - j) <= k\`。如果存在，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3,1], k = 3
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,0,1,1], k = 1
输出：true
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1,2,3,1,2,3], k = 2
输出：false
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`0 <= k <= 10^5\``,
    initialCode: `function containsNearbyDuplicate(nums, k) {
  // 在此处编写你的代码

}`,
    solution: `function containsNearbyDuplicate(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }

  return false;
}`,
    solutions: [
      {
        name: "哈希表记录位置",
        code: `/**
 * 存在重复元素 II - 哈希表记录位置
 *
 * 核心思想：
 * 使用Map记录每个数最后出现的索引
 * 当遇到重复数时，检查当前索引与记录索引的差是否 <= k
 *
 * 为什么记录最后出现的位置？
 * 如果一个数出现多次，只需检查最近的两次出现
 * 因为如果最近两次的距离都 > k，更早的出现距离只会更大
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(min(n, k))，Map最多存储min(n, k+1)个元素
 */
function containsNearbyDuplicate(nums, k) {
  // 创建哈希表：数值 -> 最后出现的索引
  const map = new Map();

  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 如果当前数已经在Map中
    if (map.has(nums[i])) {
      // 检查当前索引与上次出现索引的差
      if (i - map.get(nums[i]) <= k) {
        // 差值 <= k，满足条件
        return true;
      }
    }
    // 更新该数的最后出现位置为当前索引
    // 无论是新数还是已存在的数，都要更新
    map.set(nums[i], i);
  }

  // 没有找到满足条件的重复元素
  return false;
}`,
        explanation: `## 哈希表记录位置

### 思路
使用Map记录每个数最后出现的索引，判断距离是否满足条件。

### 执行示例
输入: nums = [1,2,3,1], k = 3
- i=0, num=1: map={}, 1不在map中, map={1:0}
- i=1, num=2: map={1:0}, 2不在map中, map={1:0,2:1}
- i=2, num=3: map={1:0,2:1}, 3不在map中, map={1:0,2:1,3:2}
- i=3, num=1: map中有1, i-map.get(1)=3-0=3<=3 ✓
返回 true

### 实现
1. 遍历数组，对于每个数
2. 如果已在Map中，检查当前索引与记录索引的差是否 <= k
3. 更新Map中该数的索引为当前索引

### 为什么记录最后出现的位置？
如果一个数出现多次，只需检查最近的两次出现。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, k))",
        animation: {
          type: "two-pointers" as const,
          title: "存在重复元素 II - 哈希表记录位置演示",
          steps: [
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              highlights: [],
              description: "nums=[1,2,3,1], k=3。用Map记录每个数最后出现的索引",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "存入" }],
              description: "i=0: num=1不在Map中，map.set(1,0) → map={1:0}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "map" },
                { indices: [1], color: "blue" as const, label: "存入" },
              ],
              description: "i=1: num=2不在Map中，map.set(2,1) → map={1:0,2:1}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "map" },
                { indices: [2], color: "blue" as const, label: "存入" },
              ],
              description: "i=2: num=3不在Map中，map.set(3,2) → map={1:0,2:1,3:2}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              comparing: [0, 3],
              highlights: [{ indices: [0, 3], color: "yellow" as const, label: "检查距离" }],
              description: "i=3: num=1在Map中！检查距离: i-map.get(1)=3-0=3",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 3], color: "green" as const, label: "满足k=3" }],
              description: "距离3 <= k=3 ✓ 满足条件！返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "滑动窗口（推荐）",
        code: `/**
 * 存在重复元素 II - 滑动窗口法
 *
 * 核心思想：
 * 维护一个大小为k的滑动窗口
 * 窗口内的元素索引差一定 <= k
 * 只需检查当前元素是否在窗口中存在
 *
 * 与哈希表方法的区别：
 * - 哈希表方法存储所有数的位置
 * - 滑动窗口只存储最近k个数
 * - 空间更可控
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(min(n, k))，Set最多存储k+1个元素
 */
function containsNearbyDuplicate(nums, k) {
  // 使用Set维护滑动窗口中的元素
  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    // 维护窗口大小为 k
    // 当 i > k 时，需要移除窗口最左边的元素
    // 窗口范围是 [i-k, i]，所以要移除 nums[i-k-1]
    if (i > k) {
      set.delete(nums[i - k - 1]);
    }

    // 检查当前元素是否已在窗口中
    // 如果在，说明在k距离内有重复
    if (set.has(nums[i])) {
      return true;
    }

    // 将当前元素加入窗口
    set.add(nums[i]);
  }

  // 没有找到满足条件的重复元素
  return false;
}`,
        explanation: `## 滑动窗口法（推荐）

### 思路
维护一个大小为k的滑动窗口，检查当前元素是否在窗口中。

### 执行示例
输入: nums = [1,2,3,1], k = 3
- i=0: set={}, 1不在set中, set={1}
- i=1: set={1}, 2不在set中, set={1,2}
- i=2: set={1,2}, 3不在set中, set={1,2,3}
- i=3: set={1,2,3}, 1在set中 ✓
返回 true

输入: nums = [1,2,3,1,2,3], k = 2
- i=0: set={}, set={1}
- i=1: set={1}, set={1,2}
- i=2: set={1,2}, set={1,2,3}
- i=3: i>k, 删除nums[0]=1, set={2,3}, 1不在set中, set={2,3,1}
- i=4: 删除nums[1]=2, set={3,1}, 2不在set中, set={3,1,2}
- i=5: 删除nums[2]=3, set={1,2}, 3不在set中, set={1,2,3}
返回 false

### 实现
1. 使用Set维护窗口中的元素
2. 如果窗口大小超过k，删除最左边的元素
3. 检查当前元素是否在Set中

### 优点
- 空间复杂度严格为 O(min(n, k))
- 思路更清晰`,
        animation: {
          type: "two-pointers" as const,
          title: "存在重复元素 II 演示",
          steps: [
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[1,2,3,1], k=3。维护大小为k的滑动窗口，检测窗口内重复",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "窗口" }],
              description: "i=0, num=1，窗口为空，1不在窗口中。窗口={1}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "窗口" }],
              description: "i=1, num=2，2不在窗口{1}中。窗口={1,2}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "窗口" }],
              description: "i=2, num=3，3不在窗口{1,2}中。窗口={1,2,3}",
            },
            {
              array: ["1", "2", "3", "1"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2], color: "blue" as const, label: "窗口" },
                { indices: [3], color: "red" as const, label: "重复!" },
              ],
              description: "i=3, num=1，1在窗口{1,2,3}中！距离3-0=3<=k，返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, k))",
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 1], 3], expected: true },
      { id: "2", name: "示例2", input: [[1, 0, 1, 1], 1], expected: true },
      { id: "3", name: "示例3", input: [[1, 2, 3, 1, 2, 3], 2], expected: false },
      { id: "4", name: "k=0", input: [[1, 2, 1], 0], expected: false },
    ],
    hints: [
      "使用哈希表记录每个数最后出现的位置",
      "如果当前数已在哈希表中，检查距离是否 <= k",
      "更新哈希表中的位置为当前位置",
    ],
    explanation: `## 解题思路

### 哈希表记录位置

1. 使用 Map 记录每个数最后出现的索引
2. 遍历数组，对于每个数：
   - 如果已在 Map 中，检查当前索引与记录索引的差是否 <= k
   - 如果满足条件，返回 true
   - 更新 Map 中该数的索引为当前索引
3. 遍历结束返回 false

### 为什么记录最后出现的位置？

如果一个数出现多次，我们只需要检查最近的两次出现。
因为如果最近两次的距离都 > k，更早的出现距离只会更大。

### 复杂度分析
- 时间复杂度：O(n)，遍历一次数组
- 空间复杂度：O(min(n, k))，Map 最多存储 min(n, k+1) 个元素`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, k))",
    relatedProblems: ["contains-duplicate", "longest-consecutive-sequence"],
  },

  // 7. 最长连续序列 (128)
  {
    id: "longest-consecutive-sequence",
    leetcodeId: 128,
    title: "最长连续序列",
    titleEn: "Longest Consecutive Sequence",
    difficulty: "medium",
    category: "hash-table",
    tags: ["哈希表", "数组", "并查集"],
    frontendRelevance: "high",
    frontendNote: "哈希表+并查集思想",
    description: `给定一个未排序的整数数组 \`nums\`，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 \`O(n)\` 的算法解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
\`\`\``,
    constraints: `- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    initialCode: `function longestConsecutive(nums) {
  // 在此处编写你的代码

}`,
    solution: `function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // 只从序列的起点开始计数
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}`,
    solutions: [
      {
        name: "排序法",
        code: `/**
 * 最长连续序列 - 排序法
 *
 * 核心思想：
 * 排序后，连续的数字会相邻
 * 遍历排序后的数组，统计最长连续序列
 *
 * 时间复杂度：O(n log n)，排序的时间复杂度
 * 空间复杂度：O(log n)，排序使用的栈空间
 *
 * 注意：不满足题目O(n)的要求，但思路直观
 */
function longestConsecutive(nums) {
  // 处理空数组
  if (nums.length === 0) return 0;

  // 排序数组
  nums.sort((a, b) => a - b);

  let maxLength = 1;     // 最长连续序列长度
  let currentLength = 1; // 当前连续序列长度

  // 遍历排序后的数组
  for (let i = 1; i < nums.length; i++) {
    // 跳过重复元素
    // 例如 [1,2,2,3]，两个2只算一个
    if (nums[i] === nums[i - 1]) {
      continue;
    }

    // 如果当前数是前一个数+1，说明连续
    if (nums[i] === nums[i - 1] + 1) {
      currentLength++;
    } else {
      // 不连续，更新最大长度，重新开始计数
      maxLength = Math.max(maxLength, currentLength);
      currentLength = 1;
    }
  }

  // 返回最大长度（别忘了最后一个序列）
  return Math.max(maxLength, currentLength);
}`,
        explanation: `## 排序法

### 思路
排序后，连续的数字会相邻。

### 执行示例
输入: [100, 4, 200, 1, 3, 2]
排序后: [1, 2, 3, 4, 100, 200]
- i=1: 2 === 1+1, length=2
- i=2: 3 === 2+1, length=3
- i=3: 4 === 3+1, length=4
- i=4: 100 !== 4+1, maxLength=4, length=1
- i=5: 200 !== 100+1, maxLength=4, length=1
返回 4

### 实现
1. 排序数组
2. 遍历，跳过重复元素
3. 如果当前数等于前一个数+1，长度加1
4. 否则重新开始计数

### 注意
- 需要处理重复元素
- 时间复杂度不满足O(n)要求`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        animation: {
          type: "two-pointers" as const,
          title: "最长连续序列 - 排序法演示",
          steps: [
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 0,
              right: 5,
              highlights: [],
              description: "原数组: [100,4,200,1,3,2]。先进行排序",
            },
            {
              array: ["1", "2", "3", "4", "100", "200"],
              left: 0,
              right: 5,
              highlights: [],
              description: "排序后: [1,2,3,4,100,200]。现在统计连续序列",
            },
            {
              array: ["1", "2", "3", "4", "100", "200"],
              left: 0,
              right: 1,
              comparing: [0, 1],
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "连续" }],
              description: "i=1: 2===1+1 ✓ 连续，currentLength=2",
            },
            {
              array: ["1", "2", "3", "4", "100", "200"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "连续" }],
              description: "i=2: 3===2+1 ✓ 连续，currentLength=3",
            },
            {
              array: ["1", "2", "3", "4", "100", "200"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "序列1" }],
              description: "i=3: 4===3+1 ✓ 连续，currentLength=4",
            },
            {
              array: ["1", "2", "3", "4", "100", "200"],
              left: 4,
              right: 4,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "max=4" },
                { indices: [4], color: "yellow" as const, label: "新序列" },
              ],
              description: "i=4: 100!==4+1 ✗ 不连续，maxLength=4，重新计数",
            },
            {
              array: ["4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "遍历完成，最长连续序列长度=4 [1,2,3,4]",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "哈希表+序列起点（推荐）",
        code: `/**
 * 最长连续序列 - 哈希表+序列起点
 *
 * 核心思想：
 * 1. 将所有数字存入Set，实现O(1)查找
 * 2. 只从序列的起点开始计数，避免重复计算
 * 3. 如何判断是起点？num-1不在Set中，说明num是序列起点
 *
 * 为什么只从起点开始？
 * 假设序列是 [1,2,3,4]：
 * - 如果从2开始计数，会得到长度3
 * - 如果从1开始计数，会得到长度4（正确答案）
 * - 只从起点开始，保证每个数最多被访问两次（一次判断起点，一次计数）
 *
 * 时间复杂度：O(n)，每个数最多被访问两次
 * 空间复杂度：O(n)，Set存储所有数字
 */
function longestConsecutive(nums) {
  // 将所有数字加入Set
  const numSet = new Set(nums);
  let maxLength = 0;

  // 遍历Set中的每个数
  for (const num of numSet) {
    // 只从序列的起点开始计数
    // 如果num-1在Set中，说明num不是起点，跳过
    if (!numSet.has(num - 1)) {
      // num是序列起点，开始向后计数
      let currentNum = num;
      let currentLength = 1;

      // 不断检查下一个数是否存在
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      // 更新最大长度
      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}`,
        explanation: `## 哈希表+序列起点（推荐）

### 思路
使用Set存储所有数字，只从序列起点开始计数。

### 执行示例
输入: [100, 4, 200, 1, 3, 2]
Set = {100, 4, 200, 1, 3, 2}

遍历Set：
- num=100: 99不在Set中，100是起点
  - 101在Set中? 否
  - 长度=1
- num=4: 3在Set中，4不是起点，跳过
- num=200: 199不在Set中，200是起点
  - 201在Set中? 否
  - 长度=1
- num=1: 0不在Set中，1是起点
  - 2在Set中? 是，length=2
  - 3在Set中? 是，length=3
  - 4在Set中? 是，length=4
  - 5在Set中? 否
  - 长度=4 ✓
- num=3: 2在Set中，3不是起点，跳过
- num=2: 1在Set中，2不是起点，跳过

返回 4

### 实现
1. 将所有数字加入Set
2. 遍历Set中的每个数
3. 只有当num-1不在Set中时，num才是起点
4. 从起点开始，不断检查num+1是否在Set中

### 为什么只从起点开始？
避免重复计算，保证每个数只被访问一次。`,
        animation: {
          type: "two-pointers" as const,
          title: "最长连续序列演示",
          steps: [
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[100,4,200,1,3,2]。先将所有数存入Set，然后只从序列起点开始计数",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "起点" }],
              description: "num=100，99不在Set中，100是起点。101不在Set中，长度=1",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "gray" as const, label: "跳过" }],
              description: "num=4，3在Set中，4不是起点，跳过",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "起点" }],
              description: "num=200，199不在Set中，200是起点。201不在Set中，长度=1",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "起点" }],
              description: "num=1，0不在Set中，1是起点！开始向后计数",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 3,
              right: 5,
              highlights: [
                { indices: [3], color: "green" as const, label: "1" },
                { indices: [5], color: "blue" as const, label: "2" },
              ],
              description: "2在Set中，继续。长度=2",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 3,
              right: 4,
              highlights: [
                { indices: [3, 5], color: "green" as const, label: "1,2" },
                { indices: [4], color: "blue" as const, label: "3" },
              ],
              description: "3在Set中，继续。长度=3",
            },
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 3,
              right: 1,
              highlights: [
                { indices: [3, 5, 4, 1], color: "green" as const, label: "序列" },
              ],
              description: "4在Set中，长度=4。5不在Set中，序列[1,2,3,4]结束。返回4",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "并查集",
        code: `/**
 * 最长连续序列 - 并查集法
 *
 * 核心思想：
 * 将相邻的数合并到同一个集合中
 * 最后找最大集合的大小
 *
 * 并查集操作：
 * - find: 找到元素所属的集合（根节点）
 * - union: 合并两个集合
 *
 * 适用场景：
 * - 需要动态维护连续序列时
 * - 可以扩展处理更复杂的问题
 *
 * 时间复杂度：O(n × α(n))，α是阿克曼函数的反函数，近似O(n)
 * 空间复杂度：O(n)，存储parent和size
 */
function longestConsecutive(nums) {
  if (nums.length === 0) return 0;

  // parent: 存储每个数的父节点
  const parent = new Map();
  // size: 存储每个集合的大小
  const size = new Map();

  // 查找元素所属的集合（带路径压缩）
  const find = (x) => {
    // 路径压缩：将x的父节点直接指向根节点
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)));
    }
    return parent.get(x);
  };

  // 合并两个集合
  const union = (x, y) => {
    const px = find(x); // x的根
    const py = find(y); // y的根
    if (px !== py) {
      // 将x的根指向y的根
      parent.set(px, py);
      // 更新y的集合大小
      size.set(py, size.get(py) + size.get(px));
    }
  };

  // 初始化：每个数自成一个集合
  for (const num of nums) {
    if (!parent.has(num)) {
      parent.set(num, num);
      size.set(num, 1);
    }
  }

  // 合并相邻的数
  for (const num of nums) {
    // 如果num+1存在，合并num和num+1
    if (parent.has(num + 1)) {
      union(num, num + 1);
    }
  }

  // 找最大集合的大小
  let maxLength = 0;
  for (const s of size.values()) {
    maxLength = Math.max(maxLength, s);
  }

  return maxLength;
}`,
        explanation: `## 并查集法

### 思路
将相邻的数合并到同一个集合中。

### 执行示例
输入: [100, 4, 200, 1, 3, 2]
初始化：每个数自成一个集合
- parent = {100:100, 4:4, 200:200, 1:1, 3:3, 2:2}
- size = {100:1, 4:1, 200:1, 1:1, 3:1, 2:1}

合并相邻的数：
- 100+1=101不存在
- 4+1=5不存在
- 200+1=201不存在
- 1+1=2存在，union(1,2)，size[2]=2
- 3+1=4存在，union(3,4)，size[4]=2
- 2+1=3存在，union(2,3)，最终size[4]=4

最大集合大小=4

### 实现
1. 初始化每个数的父节点为自己
2. 遍历数组，如果num+1存在，合并num和num+1
3. 返回最大集合的大小

### 适用场景
- 需要动态维护连续序列时
- 可以扩展处理更复杂的问题`,
        timeComplexity: "O(n × α(n))",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "最长连续序列 - 并查集演示",
          steps: [
            {
              array: ["100", "4", "200", "1", "3", "2"],
              left: 0,
              right: 5,
              highlights: [],
              description: "nums=[100,4,200,1,3,2]。初始化：每个数自成一个集合",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "blue" as const, label: "集合1" },
                { indices: [1], color: "yellow" as const, label: "集合2" },
                { indices: [2], color: "purple" as const, label: "集合3" },
                { indices: [3], color: "orange" as const, label: "集合4" },
              ],
              description: "关注1,2,3,4。初始：每个数的parent指向自己",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "union" }],
              description: "1+1=2存在，union(1,2)。将集合{1}和{2}合并",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "size=2" },
                { indices: [2, 3], color: "yellow" as const, label: "union" },
              ],
              description: "3+1=4存在，union(3,4)。将集合{3}和{4}合并",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 1,
              right: 2,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "union all" }],
              description: "2+1=3存在，union(2,3)。将{1,2}和{3,4}合并成{1,2,3,4}",
            },
            {
              array: ["4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "最大集合{1,2,3,4}大小为4，返回4",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
      { id: "2", name: "示例2", input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
      { id: "3", name: "空数组", input: [[]], expected: 0 },
      { id: "4", name: "单元素", input: [[1]], expected: 1 },
    ],
    hints: [
      "使用 Set 存储所有数字，O(1) 查找",
      "只从序列的起点开始计数，避免重复",
      "如果 num-1 不在 Set 中，说明 num 是序列起点",
    ],
    explanation: `## 解题思路

### 哈希表 + 序列起点

1. 将所有数字加入 Set
2. 遍历 Set 中的每个数：
   - 只有当 num-1 不在 Set 中时，num 才是一个序列的起点
   - 从起点开始，不断检查 num+1 是否在 Set 中
   - 统计序列长度
3. 返回最长序列长度

### 为什么只从起点开始？

假设序列是 [1,2,3,4]：
- 如果从 2 开始计数，会得到长度 3
- 但从 1 开始计数，会得到长度 4
- 如果每个数都作为起点，会有重复计算
- 只从起点开始，保证每个数只被访问一次

### 复杂度分析
- 时间复杂度：O(n)，每个数最多被访问两次
- 空间复杂度：O(n)，Set 存储所有数字`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["contains-duplicate-ii", "ransom-note"],
  },

  // 8. 赎金信 (383)
  {
    id: "ransom-note",
    leetcodeId: 383,
    title: "赎金信",
    titleEn: "Ransom Note",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串", "计数"],
    frontendRelevance: "medium",
    frontendNote: "字符统计",
    description: `给你两个字符串：\`ransomNote\` 和 \`magazine\`，判断 \`ransomNote\` 能不能由 \`magazine\` 里面的字符构成。

如果可以，返回 \`true\`；否则返回 \`false\`。

\`magazine\` 中的每个字符只能在 \`ransomNote\` 中使用一次。`,
    examples: `**示例 1：**
\`\`\`
输入：ransomNote = "a", magazine = "b"
输出：false
\`\`\`

**示例 2：**
\`\`\`
输入：ransomNote = "aa", magazine = "ab"
输出：false
\`\`\`

**示例 3：**
\`\`\`
输入：ransomNote = "aa", magazine = "aab"
输出：true
\`\`\``,
    constraints: `- \`1 <= ransomNote.length, magazine.length <= 10^5\`
- \`ransomNote\` 和 \`magazine\` 由小写英文字母组成`,
    initialCode: `function canConstruct(ransomNote, magazine) {
  // 在此处编写你的代码

}`,
    solution: `function canConstruct(ransomNote, magazine) {
  const count = new Array(26).fill(0);

  // 统计 magazine 中每个字符的数量
  for (const char of magazine) {
    count[char.charCodeAt(0) - 97]++;
  }

  // 检查 ransomNote 中的字符是否足够
  for (const char of ransomNote) {
    const index = char.charCodeAt(0) - 97;
    if (count[index] === 0) {
      return false;
    }
    count[index]--;
  }

  return true;
}`,
    solutions: [
      {
        name: "字符计数（数组）",
        code: `/**
 * 赎金信 - 字符计数法（数组实现）
 *
 * 核心思想：
 * magazine 中的每个字符只能使用一次
 * 统计 magazine 中每个字符的数量
 * 遍历 ransomNote，检查每个字符是否有足够的库存
 *
 * 为什么用数组而不是Map？
 * - 题目说明只有小写字母，共26个
 * - 数组访问比Map更快
 * - 空间复杂度是O(1)而不是O(n)
 *
 * 时间复杂度：O(m + n)，m和n分别是两个字符串的长度
 * 空间复杂度：O(1)，固定大小的数组（26）
 */
function canConstruct(ransomNote, magazine) {
  // 创建长度26的计数数组，对应26个小写字母
  const count = new Array(26).fill(0);

  // 第一遍：统计 magazine 中每个字符的数量
  for (const char of magazine) {
    // 'a'的ASCII码是97，减去97得到0-25的索引
    count[char.charCodeAt(0) - 97]++;
  }

  // 第二遍：检查 ransomNote 中的字符是否足够
  for (const char of ransomNote) {
    const index = char.charCodeAt(0) - 97;
    // 如果该字符的库存为0，无法构成赎金信
    if (count[index] === 0) {
      return false;
    }
    // 使用一个字符，库存减1
    count[index]--;
  }

  // 所有字符都够用
  return true;
}`,
        explanation: `## 字符计数法（数组实现）

### 思路
统计 magazine 中每个字符的数量，然后遍历 ransomNote 消耗字符。

### 执行示例
输入: ransomNote = "aa", magazine = "aab"
第一遍遍历 magazine：count[a]=2, count[b]=1
第二遍遍历 ransomNote：
- 'a': count[a]=2 > 0, count[a]-- -> count[a]=1
- 'a': count[a]=1 > 0, count[a]-- -> count[a]=0
返回 true

输入: ransomNote = "aa", magazine = "ab"
第一遍遍历 magazine：count[a]=1, count[b]=1
第二遍遍历 ransomNote：
- 'a': count[a]=1 > 0, count[a]-- -> count[a]=0
- 'a': count[a]=0 === 0 ✗
返回 false

### 实现
1. 统计 magazine 中每个字符的数量
2. 遍历 ransomNote，检查每个字符是否足够
3. 如果不够返回 false，否则减少计数`,
        animation: {
          type: "two-pointers" as const,
          title: "赎金信演示",
          steps: [
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 2,
              highlights: [],
              description: "ransomNote=\"aa\", magazine=\"aab\"。先统计magazine中每个字符的数量",
            },
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "统计" }],
              description: "遍历magazine: count={'a':2, 'b':1}",
            },
            {
              array: ["a", "a"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "检查" }],
              description: "ransomNote[0]='a'，count[a]=2>0，可用！count[a]--→1",
            },
            {
              array: ["a", "a"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已用" },
                { indices: [1], color: "green" as const, label: "检查" },
              ],
              description: "ransomNote[1]='a'，count[a]=1>0，可用！count[a]--→0",
            },
            {
              array: ["a", "a"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "完成" }],
              description: "所有字符都够用，返回true。ransomNote可以由magazine构成",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表（Map）",
        code: `/**
 * 赎金信 - 哈希表法（Map实现）
 *
 * 核心思想：
 * 与数组方法相同，但使用Map存储计数
 * 适用于字符集不确定的情况（如Unicode字符）
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(k)，k为magazine中不同字符的数量
 */
function canConstruct(ransomNote, magazine) {
  // 创建哈希表：字符 -> 出现次数
  const map = new Map();

  // 统计 magazine 中每个字符的数量
  for (const char of magazine) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  // 检查 ransomNote 中的字符是否足够
  for (const char of ransomNote) {
    // 如果字符不存在或已用完
    if (!map.has(char) || map.get(char) === 0) {
      return false;
    }
    // 使用一个字符
    map.set(char, map.get(char) - 1);
  }

  return true;
}`,
        explanation: `## 哈希表法（Map实现）

### 思路
使用Map存储字符计数，适用于更通用的场景。

### 与数组方法的区别
- 数组：仅适用于已知字符集（如26个小写字母）
- Map：适用于任意字符集（Unicode等）

### 实现
1. 用Map统计magazine中每个字符的出现次数
2. 遍历ransomNote，检查并消耗字符
3. 字符不存在或用完则返回false`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(k)",
        animation: {
          type: "two-pointers" as const,
          title: "赎金信 - 哈希表（Map）演示",
          steps: [
            {
              array: ["a", "a", "b"],
              left: 0,
              right: 2,
              highlights: [],
              description: "ransomNote='aa', magazine='aab'。用Map统计magazine字符",
            },
            {
              array: ["a:2", "b:1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "map" }],
              description: "统计magazine: map={a:2, b:1}",
            },
            {
              array: ["a:2", "b:1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "消耗a" }],
              description: "检查ransomNote[0]='a': map.get('a')=2>0 ✓ 消耗后map={a:1,b:1}",
            },
            {
              array: ["a:1", "b:1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "消耗a" }],
              description: "检查ransomNote[1]='a': map.get('a')=1>0 ✓ 消耗后map={a:0,b:1}",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "所有字符都够用，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "提前长度检查",
        code: `/**
 * 赎金信 - 提前长度检查优化
 *
 * 核心思想：
 * 在字符计数之前，先检查长度
 * 如果 ransomNote 比 magazine 长，肯定无法构成
 *
 * 这是一个小优化，可以避免不必要的计算
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(1)
 */
function canConstruct(ransomNote, magazine) {
  // 优化：如果ransomNote比magazine长，肯定无法构成
  if (ransomNote.length > magazine.length) {
    return false;
  }

  // 创建计数数组
  const count = new Array(26).fill(0);

  // 统计 magazine 中每个字符的数量
  for (const char of magazine) {
    count[char.charCodeAt(0) - 97]++;
  }

  // 检查 ransomNote 中的字符是否足够
  for (const char of ransomNote) {
    const index = char.charCodeAt(0) - 97;
    if (count[index] === 0) {
      return false;
    }
    count[index]--;
  }

  return true;
}`,
        explanation: `## 提前长度检查优化

### 思路
在进行字符计数之前，先检查长度。
如果 ransomNote 比 magazine 长，肯定无法构成。

### 优化效果
- 最好情况：O(1) 直接返回
- 最坏情况：仍然是 O(m + n)

### 适用场景
- 大量数据且很多情况下长度不匹配时`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "赎金信 - 提前长度检查演示",
          steps: [
            {
              array: ["a", "b", "c", "d"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "ransomNote" }],
              description: "ransomNote='abcd'(长度4), magazine='ab'(长度2)",
            },
            {
              array: ["a", "b"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "magazine" }],
              description: "长度检查: ransomNote.length(4) > magazine.length(2)",
            },
            {
              array: ["false"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "结果" }],
              description: "ransomNote比magazine长，肯定无法构成，直接返回false",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: ["a", "b"], expected: false },
      { id: "2", name: "示例2", input: ["aa", "ab"], expected: false },
      { id: "3", name: "示例3", input: ["aa", "aab"], expected: true },
      { id: "4", name: "相同字符串", input: ["abc", "abc"], expected: true },
    ],
    hints: [
      "统计 magazine 中每个字符的数量",
      "遍历 ransomNote，检查每个字符是否足够",
      "可以使用数组或 Map 来统计",
    ],
    explanation: `## 解题思路

### 字符计数

1. 使用长度为 26 的数组统计 magazine 中每个字符的数量
2. 遍历 ransomNote：
   - 如果当前字符的计数为 0，返回 false
   - 否则将计数减 1
3. 遍历结束返回 true

### 为什么这样做是正确的？

- magazine 的字符只能用一次，所以用完就减 1
- 如果某个字符用完了（计数为 0），就无法构成 ransomNote

### 复杂度分析
- 时间复杂度：O(m + n)，m 和 n 分别是两个字符串的长度
- 空间复杂度：O(1)，只使用固定大小的数组（26）`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["longest-consecutive-sequence", "word-pattern"],
  },

  // 9. 单词规律 (290)
  {
    id: "word-pattern",
    leetcodeId: 290,
    title: "单词规律",
    titleEn: "Word Pattern",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串"],
    frontendRelevance: "medium",
    frontendNote: "单词规律",
    description: `给定一种规律 \`pattern\` 和一个字符串 \`s\`，判断 \`s\` 是否遵循相同的规律。

这里的 **遵循** 指完全匹配，例如，\`pattern\` 里的每个字母和字符串 \`s\` 中的每个非空单词之间存在着双向连接的对应规律。`,
    examples: `**示例 1：**
\`\`\`
输入：pattern = "abba", s = "dog cat cat dog"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：pattern = "abba", s = "dog cat cat fish"
输出：false
\`\`\`

**示例 3：**
\`\`\`
输入：pattern = "aaaa", s = "dog cat cat dog"
输出：false
\`\`\``,
    constraints: `- \`1 <= pattern.length <= 300\`
- \`pattern\` 只包含小写英文字母
- \`1 <= s.length <= 3000\`
- \`s\` 只包含小写英文字母和 \`' '\`
- \`s\` **不包含** 任何前导或尾随对空格
- \`s\` 中每个单词都被 **单个空格** 分隔`,
    initialCode: `function wordPattern(pattern, s) {
  // 在此处编写你的代码

}`,
    solution: `function wordPattern(pattern, s) {
  const words = s.split(' ');

  if (pattern.length !== words.length) {
    return false;
  }

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    // 检查双向映射
    if (charToWord.has(char) && charToWord.get(char) !== word) {
      return false;
    }
    if (wordToChar.has(word) && wordToChar.get(word) !== char) {
      return false;
    }

    charToWord.set(char, word);
    wordToChar.set(word, char);
  }

  return true;
}`,
    solutions: [
      {
        name: "双向哈希表（推荐）",
        code: `/**
 * 单词规律 - 双向哈希表法
 *
 * 核心思想：
 * pattern中的字符和s中的单词需要建立一一对应的映射关系
 * - 相同字符必须对应相同单词
 * - 不同字符必须对应不同单词（双向映射）
 *
 * 为什么需要双向映射？
 * 只用单向映射会漏掉情况：
 * - pattern = "abba", s = "dog dog dog dog"
 * - 单向：'a'->"dog", 'b'->"dog"，都合法
 * - 但实际上不同字符映射到了相同单词，应该返回false
 *
 * 时间复杂度：O(n + m)，n是pattern长度，m是s长度
 * 空间复杂度：O(n)，两个Map存储映射
 */
function wordPattern(pattern, s) {
  // 按空格分割成单词数组
  const words = s.split(' ');

  // 长度不同，肯定不匹配
  if (pattern.length !== words.length) {
    return false;
  }

  // 建立双向映射
  const charToWord = new Map(); // 字符 -> 单词
  const wordToChar = new Map(); // 单词 -> 字符

  // 遍历pattern和单词
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    // 检查字符到单词的映射
    if (charToWord.has(char) && charToWord.get(char) !== word) {
      // 字符已映射到其他单词，不匹配
      return false;
    }

    // 检查单词到字符的映射
    if (wordToChar.has(word) && wordToChar.get(word) !== char) {
      // 单词已映射到其他字符，不匹配
      return false;
    }

    // 建立双向映射
    charToWord.set(char, word);
    wordToChar.set(word, char);
  }

  return true;
}`,
        explanation: `## 双向哈希表法（推荐）

### 思路
建立字符到单词和单词到字符的双向映射，确保一一对应。

### 执行示例
输入: pattern = "abba", s = "dog cat cat dog"
words = ["dog", "cat", "cat", "dog"]

遍历：
- i=0: char='a', word="dog"
  - charToWord={}, wordToChar={}
  - 建立映射：charToWord={'a':"dog"}, wordToChar={"dog":'a'}
- i=1: char='b', word="cat"
  - 'b'不在charToWord中，"cat"不在wordToChar中
  - 建立映射：charToWord={'a':"dog",'b':"cat"}, wordToChar={"dog":'a',"cat":'b'}
- i=2: char='b', word="cat"
  - charToWord.get('b')="cat" === "cat" ✓
  - wordToChar.get("cat")='b' === 'b' ✓
- i=3: char='a', word="dog"
  - charToWord.get('a')="dog" === "dog" ✓
  - wordToChar.get("dog")='a' === 'a' ✓

返回 true

### 为什么需要双向映射？
考虑 pattern = "abba", s = "dog dog dog dog"
- 单向映射：'a'->"dog", 'b'->"dog" 都合法
- 但实际上不同字符映射到了相同单词
- wordToChar可以检测这种情况`,
        animation: {
          type: "two-pointers" as const,
          title: "单词规律演示",
          steps: [
            {
              array: ["a", "b", "b", "a"],
              left: 0,
              right: 3,
              highlights: [],
              description: "pattern=\"abba\", s=\"dog cat cat dog\"。建立字符↔单词的双向映射",
            },
            {
              array: ["a", "b", "b", "a"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "a→dog" }],
              description: "i=0: char='a', word='dog'。建立映射：a↔dog",
            },
            {
              array: ["a", "b", "b", "a"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "a↔dog" },
                { indices: [1], color: "blue" as const, label: "b→cat" },
              ],
              description: "i=1: char='b', word='cat'。建立映射：b↔cat",
            },
            {
              array: ["a", "b", "b", "a"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "a↔dog" },
                { indices: [1, 2], color: "green" as const, label: "b↔cat✓" },
              ],
              description: "i=2: char='b', word='cat'。验证：b已映射cat，cat已映射b，一致！",
            },
            {
              array: ["a", "b", "b", "a"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 3], color: "green" as const, label: "a↔dog✓" },
                { indices: [1, 2], color: "green" as const, label: "b↔cat✓" },
              ],
              description: "i=3: char='a', word='dog'。验证：a已映射dog，dog已映射a，一致！返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(n)",
      },
      {
        name: "索引映射法",
        code: `/**
 * 单词规律 - 索引映射法
 *
 * 核心思想：
 * 将字符和单词都映射到它们首次出现的索引
 * 如果字符和对应单词的首次出现索引相同，则匹配
 *
 * 例如：
 * pattern = "abba" -> 索引签名 [0,1,1,0]
 * s = "dog cat cat dog" -> 索引签名 [0,1,1,0]
 * 两个签名相同，所以匹配
 *
 * 时间复杂度：O(n + m)
 * 空间复杂度：O(n)
 */
function wordPattern(pattern, s) {
  const words = s.split(' ');

  if (pattern.length !== words.length) {
    return false;
  }

  // 记录字符和单词首次出现的索引
  const charIndex = new Map();
  const wordIndex = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    // 如果是首次出现，记录索引
    if (!charIndex.has(char)) {
      charIndex.set(char, i);
    }
    if (!wordIndex.has(word)) {
      wordIndex.set(word, i);
    }

    // 比较首次出现的索引是否相同
    if (charIndex.get(char) !== wordIndex.get(word)) {
      return false;
    }
  }

  return true;
}`,
        explanation: `## 索引映射法

### 思路
将字符和单词映射到它们首次出现的索引，比较索引是否一致。

### 执行示例
pattern = "abba" -> 首次出现索引：a=0, b=1
s = "dog cat cat dog" -> 首次出现索引：dog=0, cat=1

遍历比较：
- i=0: charIndex[a]=0, wordIndex[dog]=0, 相等 ✓
- i=1: charIndex[b]=1, wordIndex[cat]=1, 相等 ✓
- i=2: charIndex[b]=1, wordIndex[cat]=1, 相等 ✓
- i=3: charIndex[a]=0, wordIndex[dog]=0, 相等 ✓

返回 true

### 优点
- 思路直观
- 只需要记录首次出现的索引`,
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "单词规律 - 索引映射法演示",
          steps: [
            {
              array: ["a", "b", "b", "a"],
              left: 0,
              right: 3,
              highlights: [],
              description: "pattern='abba', words=['dog','cat','cat','dog']。比较首次出现索引",
            },
            {
              array: ["a:0", "dog:0"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "首次出现" }],
              description: "i=0: char='a'首次出现→索引0, word='dog'首次出现→索引0, 相等✓",
            },
            {
              array: ["b:1", "cat:1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "首次出现" }],
              description: "i=1: char='b'首次出现→索引1, word='cat'首次出现→索引1, 相等✓",
            },
            {
              array: ["b:1", "cat:1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "已记录" }],
              description: "i=2: char='b'→索引1, word='cat'→索引1, 相等✓",
            },
            {
              array: ["a:0", "dog:0"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "匹配" }],
              description: "i=3: char='a'→索引0, word='dog'→索引0, 相等✓ 所有索引都匹配！",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "pattern和words的索引签名相同，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
    testCases: [
      { id: "1", name: "示例1", input: ["abba", "dog cat cat dog"], expected: true },
      { id: "2", name: "示例2", input: ["abba", "dog cat cat fish"], expected: false },
      { id: "3", name: "示例3", input: ["aaaa", "dog cat cat dog"], expected: false },
      { id: "4", name: "长度不同", input: ["abc", "dog cat"], expected: false },
    ],
    hints: [
      "需要建立双向映射：字符到单词，单词到字符",
      "先检查 pattern 和单词数量是否相同",
      "遍历时检查映射是否一致",
    ],
    explanation: `## 解题思路

### 双向哈希表

1. 将字符串按空格分割成单词数组
2. 检查 pattern 长度和单词数量是否相同
3. 使用两个 Map 建立双向映射：
   - charToWord: 字符 -> 单词
   - wordToChar: 单词 -> 字符
4. 遍历 pattern 和单词：
   - 如果字符已有映射且不等于当前单词，返回 false
   - 如果单词已有映射且不等于当前字符，返回 false
   - 建立双向映射

### 为什么需要双向映射？

- 示例 3 中，pattern = "aaaa"，s = "dog cat cat dog"
- 如果只检查 charToWord，'a' 先映射到 "dog"，然后 "cat" 不等于 "dog"，可以检测
- 但考虑 pattern = "abba", s = "dog dog dog dog"
- 只检查 charToWord：'a'->"dog", 'b'->"dog"，都合法
- 但这违反了双向对应，所以需要 wordToChar

### 复杂度分析
- 时间复杂度：O(n + m)，n 是 pattern 长度，m 是 s 长度
- 空间复杂度：O(n)，两个 Map 存储映射`,
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(n)",
    relatedProblems: ["ransom-note", "isomorphic-strings"],
  },

  // 10. 同构字符串 (205)
  {
    id: "isomorphic-strings",
    leetcodeId: 205,
    title: "同构字符串",
    titleEn: "Isomorphic Strings",
    difficulty: "easy",
    category: "hash-table",
    tags: ["哈希表", "字符串"],
    frontendRelevance: "medium",
    frontendNote: "同构字符串",
    description: `给定两个字符串 \`s\` 和 \`t\`，判断它们是否是同构的。

如果 \`s\` 中的字符可以按某种映射关系替换得到 \`t\`，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "egg", t = "add"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：s = "foo", t = "bar"
输出：false
\`\`\`

**示例 3：**
\`\`\`
输入：s = "paper", t = "title"
输出：true
\`\`\``,
    constraints: `- \`1 <= s.length <= 5 * 10^4\`
- \`t.length == s.length\`
- \`s\` 和 \`t\` 由任意有效的 ASCII 字符组成`,
    initialCode: `function isIsomorphic(s, t) {
  // 在此处编写你的代码

}`,
    solution: `function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // 检查双向映射
    if (sToT.has(charS) && sToT.get(charS) !== charT) {
      return false;
    }
    if (tToS.has(charT) && tToS.get(charT) !== charS) {
      return false;
    }

    sToT.set(charS, charT);
    tToS.set(charT, charS);
  }

  return true;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["egg", "add"], expected: true },
      { id: "2", name: "示例2", input: ["foo", "bar"], expected: false },
      { id: "3", name: "示例3", input: ["paper", "title"], expected: true },
      { id: "4", name: "单字符", input: ["a", "b"], expected: true },
    ],
    hints: [
      "需要建立双向映射：s 到 t 和 t 到 s",
      "使用两个哈希表分别记录映射关系",
      "遍历时检查映射是否一致",
    ],
    explanation: `## 解题思路

### 双向哈希表

1. 使用两个 Map 建立双向映射：
   - sToT: s 中字符 -> t 中字符
   - tToS: t 中字符 -> s 中字符
2. 遍历两个字符串：
   - 如果 s[i] 已有映射且不等于 t[i]，返回 false
   - 如果 t[i] 已有映射且不等于 s[i]，返回 false
   - 建立双向映射
3. 遍历结束返回 true

### 为什么需要双向映射？

考虑 s = "ab", t = "aa"：
- 如果只检查 sToT：'a'->'a', 'b'->'a'，都合法
- 但这违反了"不同字符不能映射到同一个字符"
- 所以需要 tToS 来检测这种情况

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(字符集大小)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["word-pattern", "valid-anagram"],
    solutions: [
      {
        name: "双向哈希表（推荐）",
        code: `/**
 * 同构字符串 - 双向哈希表法
 *
 * 核心思想：
 * 同构字符串要求字符之间一一对应：
 * - s中的相同字符必须映射到t中的相同字符
 * - s中的不同字符必须映射到t中的不同字符
 *
 * 使用两个Map建立双向映射，确保一一对应
 *
 * 为什么需要双向映射？
 * 只用单向映射会漏掉情况：
 * - s = "ab", t = "aa"
 * - 单向 sToT：'a'->'a', 'b'->'a'，都合法
 * - 但实际上不同字符映射到了相同字符
 * - tToS 可以检测这种情况
 *
 * 时间复杂度：O(n)，遍历一次字符串
 * 空间复杂度：O(字符集大小)，最多存储所有不同字符
 */
function isIsomorphic(s, t) {
  // 长度不同，肯定不同构
  if (s.length !== t.length) return false;

  // 建立双向映射
  const sToT = new Map(); // s中字符 -> t中字符
  const tToS = new Map(); // t中字符 -> s中字符

  // 遍历两个字符串
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // 检查 s -> t 的映射
    if (sToT.has(charS) && sToT.get(charS) !== charT) {
      // s中的字符已映射到t中的其他字符，不同构
      return false;
    }

    // 检查 t -> s 的映射
    if (tToS.has(charT) && tToS.get(charT) !== charS) {
      // t中的字符已映射到s中的其他字符，不同构
      return false;
    }

    // 建立双向映射
    sToT.set(charS, charT);
    tToS.set(charT, charS);
  }

  return true;
}`,
        explanation: `## 双向哈希表

### 思路
1. 建立 s 到 t 和 t 到 s 的双向映射
2. 遍历时检查映射是否一致
3. 任一方向映射冲突则返回 false

### 执行示例
输入: s = "egg", t = "add"
- i=0: charS='e', charT='a'
  - sToT={}, tToS={}
  - 建立映射：sToT={'e':'a'}, tToS={'a':'e'}
- i=1: charS='g', charT='d'
  - 'g'不在sToT中，'d'不在tToS中
  - 建立映射：sToT={'e':'a','g':'d'}, tToS={'a':'e','d':'g'}
- i=2: charS='g', charT='d'
  - sToT.get('g')='d' === 'd' ✓
  - tToS.get('d')='g' === 'g' ✓

返回 true

### 要点
- 双向映射确保一一对应关系
- Map 支持任意字符作为键`,
        animation: {
          type: "two-pointers" as const,
          title: "同构字符串演示",
          steps: [
            {
              array: ["e", "g", "g"],
              left: 0,
              right: 2,
              highlights: [],
              description: "s=\"egg\", t=\"add\"。建立s↔t的双向字符映射",
            },
            {
              array: ["e", "g", "g"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "e↔a" }],
              description: "i=0: s[0]='e', t[0]='a'。建立映射：e↔a",
            },
            {
              array: ["e", "g", "g"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "e↔a" },
                { indices: [1], color: "blue" as const, label: "g↔d" },
              ],
              description: "i=1: s[1]='g', t[1]='d'。建立映射：g↔d",
            },
            {
              array: ["e", "g", "g"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "e↔a" },
                { indices: [1, 2], color: "green" as const, label: "g↔d✓" },
              ],
              description: "i=2: s[2]='g', t[2]='d'。验证：g已映射d，d已映射g，一致！返回true",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(字符集大小)",
      },
      {
        name: "索引映射法",
        code: `/**
 * 同构字符串 - 索引映射法
 *
 * 核心思想：
 * 将每个字符串转换为"索引签名"
 * - 每个字符用它首次出现的编号来表示
 * - 例如 "egg" -> [0,1,1]，"add" -> [0,1,1]
 * - 如果两个字符串的索引签名相同，则它们同构
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，存储签名数组
 */
function isIsomorphic(s, t) {
  // 长度不同，肯定不同构
  if (s.length !== t.length) return false;

  /**
   * 获取字符串的索引签名
   * 将每个字符映射到它首次出现的编号
   */
  const getIndexSignature = (str) => {
    const map = new Map(); // 字符 -> 首次出现的编号
    const signature = [];  // 索引签名数组
    let nextId = 0;        // 下一个可用的编号

    for (const char of str) {
      // 如果字符首次出现，分配一个新编号
      if (!map.has(char)) {
        map.set(char, nextId++);
      }
      // 将字符的编号加入签名
      signature.push(map.get(char));
    }

    // 返回签名字符串（用逗号连接）
    return signature.join(',');
  };

  // 比较两个字符串的索引签名
  return getIndexSignature(s) === getIndexSignature(t);
}`,
        explanation: `## 索引映射法

### 思路
1. 将每个字符串转换为"索引签名"
2. 例如 "egg" -> "0,1,1"，"add" -> "0,1,1"
3. 如果两个字符串的索引签名相同，则它们同构

### 执行示例
s = "egg"
- 'e' 首次出现，编号0 -> [0]
- 'g' 首次出现，编号1 -> [0,1]
- 'g' 已存在，编号1 -> [0,1,1]
签名 = "0,1,1"

t = "add"
- 'a' 首次出现，编号0 -> [0]
- 'd' 首次出现，编号1 -> [0,1]
- 'd' 已存在，编号1 -> [0,1,1]
签名 = "0,1,1"

"0,1,1" === "0,1,1"，返回 true

### 特点
- 思路直观
- 生成签名字符串有额外开销`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        animation: {
          type: "two-pointers" as const,
          title: "同构字符串 - 索引映射法演示",
          steps: [
            {
              array: ["e", "g", "g"],
              left: 0,
              right: 2,
              highlights: [],
              description: "s='egg', t='add'。将每个字符串转换为索引签名",
            },
            {
              array: ["e→0", "g→1", "g→1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "s签名" }],
              description: "s='egg': e首次出现→0, g首次出现→1, g已存在→1。签名=[0,1,1]",
            },
            {
              array: ["a→0", "d→1", "d→1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "yellow" as const, label: "t签名" }],
              description: "t='add': a首次出现→0, d首次出现→1, d已存在→1。签名=[0,1,1]",
            },
            {
              array: ["0,1,1", "=", "0,1,1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "比较" }],
              description: "比较签名: [0,1,1] === [0,1,1] ✓",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "两个签名相同，s和t同构，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
      {
        name: "首次出现位置",
        code: `/**
 * 同构字符串 - 首次出现位置法
 *
 * 核心思想：
 * 对于每个位置 i，检查 s[i] 和 t[i] 在各自字符串中首次出现的位置
 * 如果首次出现位置不同，则不同构
 *
 * 原理：
 * 如果两个字符串同构，那么对应位置的字符应该有相同的"模式"
 * 即：同一个字符应该在相同的位置首次出现
 *
 * 时间复杂度：O(n²)，indexOf每次调用是O(n)
 * 空间复杂度：O(1)，不需要额外空间
 *
 * 注意：这种方法代码简洁但效率较低，适合字符串较短的情况
 */
function isIsomorphic(s, t) {
  // 长度不同，肯定不同构
  if (s.length !== t.length) return false;

  for (let i = 0; i < s.length; i++) {
    // 比较 s[i] 在 s 中首次出现的位置
    // 和 t[i] 在 t 中首次出现的位置
    // indexOf 返回字符首次出现的索引
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false;
    }
  }

  return true;
}`,
        explanation: `## 首次出现位置

### 思路
1. 对于每个位置 i，检查 s[i] 和 t[i] 在各自字符串中首次出现的位置
2. 如果首次出现位置不同，则不同构

### 执行示例
s = "egg", t = "add"
- i=0: s.indexOf('e')=0, t.indexOf('a')=0, 相等 ✓
- i=1: s.indexOf('g')=1, t.indexOf('d')=1, 相等 ✓
- i=2: s.indexOf('g')=1, t.indexOf('d')=1, 相等 ✓
返回 true

s = "foo", t = "bar"
- i=0: s.indexOf('f')=0, t.indexOf('b')=0, 相等 ✓
- i=1: s.indexOf('o')=1, t.indexOf('a')=1, 相等 ✓
- i=2: s.indexOf('o')=1, t.indexOf('r')=2, 不相等 ✗
返回 false

### 特点
- 代码简洁
- indexOf 每次调用是 O(n)，总体时间复杂度 O(n²)
- 适合字符串较短的情况`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "同构字符串 - 首次出现位置法演示",
          steps: [
            {
              array: ["e", "g", "g"],
              left: 0,
              right: 2,
              highlights: [],
              description: "s='egg', t='add'。比较每个字符首次出现的位置",
            },
            {
              array: ["e:0", "a:0"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "indexOf" }],
              description: "i=0: s.indexOf('e')=0, t.indexOf('a')=0, 相等✓",
            },
            {
              array: ["g:1", "d:1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "indexOf" }],
              description: "i=1: s.indexOf('g')=1, t.indexOf('d')=1, 相等✓",
            },
            {
              array: ["g:1", "d:1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "匹配" }],
              description: "i=2: s.indexOf('g')=1, t.indexOf('d')=1, 相等✓",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "所有位置的首次出现索引都相等，返回true",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },

  // 11. 和为 K 的子数组 (560)
  {
    id: "subarray-sum-equals-k",
    leetcodeId: 560,
    title: "和为 K 的子数组",
    titleEn: "Subarray Sum Equals K",
    difficulty: "medium",
    category: "hash-table",
    tags: ["数组", "哈希表", "前缀和"],
    frontendRelevance: "medium",
    frontendNote: "前缀和+哈希表",
    description: `给你一个整数数组 \`nums\` 和一个整数 \`k\`，请你统计并返回 **该数组中和为 \`k\` 的子数组的个数**。

子数组是数组中元素的连续非空序列。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,1,1], k = 2
输出：2
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,2,3], k = 3
输出：2
\`\`\``,
    constraints: `- \`1 <= nums.length <= 2 * 10^4\`
- \`-1000 <= nums[i] <= 1000\`
- \`-10^7 <= k <= 10^7\``,
    initialCode: `function subarraySum(nums, k) {
  // 在此处编写你的代码

}`,
    solution: `function subarraySum(nums, k) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1); // 前缀和为 0 出现 1 次

  let count = 0;
  let prefixSum = 0;

  for (const num of nums) {
    prefixSum += num;

    // 如果存在前缀和为 prefixSum - k，说明找到了和为 k 的子数组
    if (prefixSumCount.has(prefixSum - k)) {
      count += prefixSumCount.get(prefixSum - k);
    }

    // 更新当前前缀和的出现次数
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }

  return count;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1,1,1], 2], expected: 2 },
      { id: "2", name: "示例2", input: [[1,2,3], 3], expected: 2 },
      { id: "3", name: "负数", input: [[1,-1,0], 0], expected: 3 },
      { id: "4", name: "单元素", input: [[1], 1], expected: 1 },
    ],
    hints: [
      "使用前缀和",
      "prefixSum[j] - prefixSum[i] = k 表示子数组 [i+1, j] 的和为 k",
      "用哈希表记录每个前缀和出现的次数",
    ],
    explanation: `## 解题思路

### 前缀和 + 哈希表

1. **核心思想**：如果 prefixSum[j] - prefixSum[i] = k，则子数组 [i+1, j] 的和为 k
2. 遍历数组，计算当前前缀和 prefixSum
3. 查找有多少个之前的前缀和等于 prefixSum - k
4. 用哈希表记录每个前缀和出现的次数

### 边界条件
- 初始化 prefixSumCount.set(0, 1)，表示前缀和为 0 出现 1 次
- 这样可以处理从数组开头到当前位置的子数组和恰好为 k 的情况

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["two-sum", "continuous-subarray-sum"],
    solutions: [
      {
        name: "前缀和 + 哈希表（推荐）",
        code: `/**
 * 和为K的子数组 - 前缀和 + 哈希表
 *
 * 核心思想：
 * 利用前缀和的性质：prefixSum[j] - prefixSum[i] = k
 * 表示子数组 [i+1, j] 的和为 k
 *
 * 转换问题：
 * 对于每个位置 j，我们需要找有多少个位置 i 满足：
 * prefixSum[i] = prefixSum[j] - k
 *
 * 为什么初始化 map.set(0, 1)？
 * 处理从数组开头开始的子数组，比如 [1,2,3] 中 [1,2] 和为 3
 * prefixSum[1] = 3，需要找 prefixSum[i] = 3 - 3 = 0
 *
 * 时间复杂度：O(n)，一次遍历
 * 空间复杂度：O(n)，哈希表存储前缀和
 */
function subarraySum(nums, k) {
  // 哈希表：记录每个前缀和出现的次数
  const prefixSumCount = new Map();

  // 初始化：前缀和为 0 出现 1 次（空前缀）
  // 这样当 prefixSum === k 时，能找到一个有效子数组
  prefixSumCount.set(0, 1);

  let count = 0;       // 符合条件的子数组数量
  let prefixSum = 0;   // 当前前缀和

  for (const num of nums) {
    // 累加当前元素到前缀和
    prefixSum += num;

    // 查找：有多少个之前的前缀和等于 prefixSum - k
    // 如果存在，说明从那些位置到当前位置的子数组和为 k
    if (prefixSumCount.has(prefixSum - k)) {
      count += prefixSumCount.get(prefixSum - k);
    }

    // 更新：记录当前前缀和（必须在查找之后！）
    // 先查找再更新，避免子数组长度为 0 的情况
    prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }

  return count;
}`,
        explanation: `## 前缀和 + 哈希表

### 核心思想
prefixSum[j] - prefixSum[i] = k
=> prefixSum[i] = prefixSum[j] - k

对于每个位置 j，我们需要找之前有多少个位置 i 的前缀和等于 prefixSum[j] - k。

### 执行示例
nums = [1, 1, 1], k = 2

| 步骤 | num | prefixSum | 查找 prefixSum-k | map状态 | count |
|------|-----|-----------|-----------------|---------|-------|
| 初始 |  -  |     0     |        -        | {0:1}   |   0   |
|  1   |  1  |     1     |   1-2=-1 无     | {0:1,1:1} |  0  |
|  2   |  1  |     2     |   2-2=0 有1个   | {0:1,1:1,2:1} | 1 |
|  3   |  1  |     3     |   3-2=1 有1个   | {0:1,1:1,2:1,3:1} | 2 |

找到的子数组：[1,1]（索引0-1）和 [1,1]（索引1-2）

### 为什么先查找再更新？
避免子数组长度为 0 的情况。如果 k=0，当 prefixSum 第一次等于某个值时，不应该匹配自己。

### 复杂度分析
- 时间复杂度：O(n)，一次遍历
- 空间复杂度：O(n)，最多存储 n 个不同的前缀和`,
        animation: {
          type: "two-pointers" as const,
          title: "和为K的子数组演示",
          steps: [
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[1,1,1], k=2。用前缀和+哈希表，map初始化{0:1}",
            },
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "sum=1" }],
              description: "i=0: prefixSum=1，查找1-2=-1不在map中。map={0:1,1:1}，count=0",
            },
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "子数组!" },
              ],
              description: "i=1: prefixSum=2，查找2-2=0在map中（1次）！map={0:1,1:1,2:1}，count=1",
            },
            {
              array: ["1", "1", "1"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已找到" },
                { indices: [1, 2], color: "green" as const, label: "子数组!" },
              ],
              description: "i=2: prefixSum=3，查找3-2=1在map中（1次）！map={0:1,1:1,2:1,3:1}，count=2",
            },
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "完成" }],
              description: "遍历结束。找到2个和为k的子数组：[0,1]和[1,2]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "暴力枚举",
        code: `/**
 * 和为K的子数组 - 暴力枚举
 *
 * 核心思想：
 * 枚举所有可能的子数组，计算每个子数组的和
 *
 * 优化技巧：
 * 不需要三层循环来计算子数组和
 * 固定起点 i 后，j 向右扩展时可以递推计算和
 * sum[i..j] = sum[i..j-1] + nums[j]
 *
 * 时间复杂度：O(n²)，双重循环
 * 空间复杂度：O(1)，只用常数变量
 */
function subarraySum(nums, k) {
  let count = 0;        // 符合条件的子数组数量
  const n = nums.length;

  // 枚举子数组的起点 i
  for (let i = 0; i < n; i++) {
    let sum = 0;  // 当前子数组 [i..j] 的和

    // 枚举子数组的终点 j
    for (let j = i; j < n; j++) {
      // 递推计算和：sum[i..j] = sum[i..j-1] + nums[j]
      sum += nums[j];

      // 检查当前子数组的和是否等于 k
      if (sum === k) {
        count++;
      }
      // 注意：即使 sum === k，也要继续遍历
      // 因为后面可能有负数，使得 sum 再次等于 k
    }
  }

  return count;
}`,
        explanation: `## 暴力枚举

### 核心思想
直接枚举所有子数组，统计和为 k 的数量。

### 执行示例
nums = [1, 2, 3], k = 3

| i | j | 子数组 | sum | count |
|---|---|--------|-----|-------|
| 0 | 0 | [1]    |  1  |   0   |
| 0 | 1 | [1,2]  |  3  |   1   |
| 0 | 2 | [1,2,3]|  6  |   1   |
| 1 | 1 | [2]    |  2  |   1   |
| 1 | 2 | [2,3]  |  5  |   1   |
| 2 | 2 | [3]    |  3  |   2   |

找到的子数组：[1,2] 和 [3]

### 为什么不能提前终止？
数组可能包含负数！sum 超过 k 后还可能回到 k。

### 复杂度分析
- 时间复杂度：O(n²)，枚举所有子数组
- 空间复杂度：O(1)，只用常数变量

### 适用场景
- 数据量小（n ≤ 1000）
- 面试时先写出暴力解，再优化`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        animation: {
          type: "two-pointers" as const,
          title: "和为K的子数组 - 暴力枚举演示",
          steps: [
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [],
              description: "nums=[1,2,3], k=3。枚举所有子数组，统计和为k的数量",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "sum=1" }],
              description: "i=0, j=0: [1], sum=1≠3",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "sum=3!" }],
              description: "i=0, j=1: [1,2], sum=3===3 ✓ count=1",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "yellow" as const, label: "sum=6" }],
              description: "i=0, j=2: [1,2,3], sum=6≠3",
            },
            {
              array: ["1", "2", "3"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "sum=3!" }],
              description: "i=2, j=2: [3], sum=3===3 ✓ count=2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "遍历完成，找到2个和为3的子数组：[1,2]和[3]",
            },
          ] as TwoPointersStep[],
        },
      },
    ],
  },
];
