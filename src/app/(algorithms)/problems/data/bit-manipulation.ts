import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const bitManipulationProblems: Problem[] = [
  // 1. 位1的个数 (191)
  {
    id: "number-of-1-bits",
    leetcodeId: 191,
    title: "位1的个数",
    titleEn: "Number of 1 Bits",
    difficulty: "easy",
    category: "bit-manipulation",
    tags: ["位运算", "分治"],
    frontendRelevance: "low",
    frontendNote: "位计数",
    description: `编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
\`\`\`

**示例 2：**
\`\`\`
输入：n = 00000000000000000000000010000000
输出：1
解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
\`\`\`

**示例 3：**
\`\`\`
输入：n = 11111111111111111111111111111101
输出：31
解释：输入的二进制串 11111111111111111111111111111101 中，共有三十一位为 '1'。
\`\`\``,
    constraints: `- 输入必须是长度为 \`32\` 的 **二进制串**`,
    initialCode: `function hammingWeight(n) {
  // 在此处编写你的代码

}`,
    solution: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // 消除最低位的 1
    count++;
  }
  return count;
}`,
    testCases: [
      {
        id: "1",
        name: "三个1",
        input: [11],
        expected: 3
      },
      {
        id: "2",
        name: "一个1",
        input: [128],
        expected: 1
      }
    ],
    hints: [
      "n & (n-1) 可以消除 n 最低位的 1",
      "循环直到 n 变为 0",
      "也可以逐位检查"
    ],
    explanation: `## 解题思路

### 位运算技巧

利用 n & (n-1) 可以消除 n 最低位的 1 这个性质：
- 每次操作消除一个 1
- 统计操作次数即可

### 复杂度分析
- 时间复杂度：O(k)，k 是 1 的个数
- 空间复杂度：O(1)`,
    timeComplexity: "O(k)",
    spaceComplexity: "O(1)",
    relatedProblems: ["counting-bits", "single-number"],
    solutions: [
      {
        name: "位运算技巧（推荐）",
        code: `/**
 * 位1的个数 - Brian Kernighan算法
 *
 * 核心思想：n & (n-1) 可以消除n二进制表示中最低位的1
 *
 * 原理解释：
 * - n-1 会把n最低位的1变成0，同时把它右边的所有0变成1
 * - n & (n-1) 就会把最低位的1消除掉
 *
 * 时间复杂度：O(k)，k是二进制中1的个数
 * 空间复杂度：O(1)
 */
function hammingWeight(n) {
  // 计数器，记录1的个数
  let count = 0;

  // 循环直到n变为0
  while (n !== 0) {
    /**
     * 关键操作：消除最低位的1
     *
     * 示例：n = 12 (1100)
     * 第1次：n = 1100 & 1011 = 1000, count = 1
     * 第2次：n = 1000 & 0111 = 0000, count = 2
     *
     * 示例：n = 11 (1011)
     * 第1次：n = 1011 & 1010 = 1010, count = 1
     * 第2次：n = 1010 & 1001 = 1000, count = 2
     * 第3次：n = 1000 & 0111 = 0000, count = 3
     */
    n = n & (n - 1);
    count++;
  }

  return count;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "位1的个数演示",
          steps: [
            {
              array: ["1", "0", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 2, 3], color: "green" as const, label: "1" }],
              description: "n=11 (1011)。统计二进制中1的个数。count=0",
            },
            {
              array: ["1", "0", "1", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 2], color: "green" as const, label: "1" }],
              description: "n & (n-1) = 1011 & 1010 = 1010。消除最低位的1，count=1",
            },
            {
              array: ["1", "0", "0", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "green" as const, label: "1" }],
              description: "n & (n-1) = 1010 & 1001 = 1000。消除最低位的1，count=2",
            },
            {
              array: ["0", "0", "0", "0"],
              left: 0,
              right: 3,
              highlights: [],
              description: "n & (n-1) = 1000 & 0111 = 0000。消除最低位的1，count=3",
            },
            {
              array: ["3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "n=0，循环结束。11的二进制有3个1",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 位运算技巧

### 思路
利用 n & (n-1) 可以消除 n 最低位的 1：
- 每次操作消除一个 1
- 统计操作次数即可

### 示例
n = 12 (1100)
n & (n-1) = 12 & 11 = 1100 & 1011 = 1000
再做一次 = 1000 & 0111 = 0000
共消除 2 次，所以有 2 个 1`,
        timeComplexity: "O(k)",
        spaceComplexity: "O(1)",
      },
      {
        name: "逐位检查",
        code: `/**
 * 位1的个数 - 逐位检查法
 *
 * 核心思想：检查每一位是否为1，从低位到高位依次检查
 *
 * 位运算技巧：
 * - n & 1：获取n的最低位（0或1）
 * - n >>> 1：无符号右移，高位补0（处理负数时安全）
 *
 * 时间复杂度：O(32)，固定检查32位
 * 空间复杂度：O(1)
 */
function hammingWeight(n) {
  // 计数器
  let count = 0;

  // 循环直到n变为0
  while (n !== 0) {
    /**
     * n & 1 检查最低位是否为1
     *
     * 示例：n = 11 (1011)
     * 第1次：11 & 1 = 1011 & 0001 = 1, count = 1
     * 第2次：5 & 1 = 0101 & 0001 = 1, count = 2
     * 第3次：2 & 1 = 0010 & 0001 = 0, count = 2
     * 第4次：1 & 1 = 0001 & 0001 = 1, count = 3
     */
    count += n & 1;

    /**
     * 无符号右移一位
     * 使用 >>> 而不是 >>，因为：
     * - >> 是有符号右移，负数高位补1
     * - >>> 是无符号右移，高位总是补0
     */
    n = n >>> 1;
  }

  return count;
}`,
        explanation: `## 逐位检查

### 思路
1. 检查最低位是否为 1
2. 右移一位，继续检查
3. 直到 n 为 0

### 注意
- 使用 >>> 无符号右移，处理负数`,
        animation: {
          type: "two-pointers" as const,
          title: "逐位检查演示",
          steps: [
            {
              array: ["1", "0", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "yellow" as const, label: "检查" }],
              description: "n=11 (1011)。从最低位开始检查，count=0",
            },
            {
              array: ["1", "0", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "是1" }],
              description: "n&1=1011&0001=1 ✓ count=1。然后右移",
            },
            {
              array: ["0", "1", "0", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "是1" }],
              description: "n=5 (0101)。n&1=1 ✓ count=2。继续右移",
            },
            {
              array: ["0", "0", "1", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "red" as const, label: "是0" }],
              description: "n=2 (0010)。n&1=0 ✗ count=2。继续右移",
            },
            {
              array: ["0", "0", "0", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "是1" }],
              description: "n=1 (0001)。n&1=1 ✓ count=3。右移后n=0，结束",
            },
            {
              array: ["3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "n=0，循环结束。11的二进制有3个1",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(32)",
        spaceComplexity: "O(1)",
      },
      {
        name: "内置函数",
        code: `/**
 * 位1的个数 - 字符串转换法
 *
 * 核心思想：利用JavaScript内置函数将数字转为二进制字符串，然后计算1的个数
 *
 * 步骤：
 * 1. n.toString(2) - 转换为二进制字符串
 * 2. split('0').join('') - 移除所有0，只保留1
 * 3. .length - 计算剩余字符串长度（即1的个数）
 *
 * 时间复杂度：O(32)，字符串操作
 * 空间复杂度：O(32)，存储二进制字符串
 */
function hammingWeight(n) {
  /**
   * 示例：n = 11 (1011)
   *
   * n.toString(2) = "1011"
   * "1011".split('0') = ["1", "11"]  // 按0分割
   * ["1", "11"].join('') = "111"     // 合并得到所有的1
   * "111".length = 3                  // 1的个数
   *
   * 另一种更直观的写法：
   * return n.toString(2).replace(/0/g, '').length;
   * 或者：
   * return n.toString(2).split('').filter(c => c === '1').length;
   */
  return n.toString(2).split('0').join('').length;
}`,
        explanation: `## 内置函数

### 思路
1. 转换为二进制字符串
2. 移除所有 0
3. 返回剩余字符串长度

### 特点
- 代码简洁
- 性能稍差`,
        animation: {
          type: "two-pointers" as const,
          title: "内置函数演示",
          steps: [
            {
              array: ["1", "1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "n=11" }],
              description: "n=11。首先用toString(2)转为二进制字符串",
            },
            {
              array: ["1", "0", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 2, 3], color: "green" as const, label: "1" }],
              description: "n.toString(2) = '1011'",
            },
            {
              array: ["1", "1", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "1" }],
              description: "split('0').join('') = '111'，移除所有0",
            },
            {
              array: ["3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "'111'.length = 3。11的二进制有3个1",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(32)",
        spaceComplexity: "O(32)",
      },
    ],
  },

  // 2. 只出现一次的数字 (136)
  {
    id: "single-number",
    leetcodeId: 136,
    title: "只出现一次的数字",
    titleEn: "Single Number",
    difficulty: "easy",
    category: "bit-manipulation",
    tags: ["位运算", "数组"],
    frontendRelevance: "high",
    frontendNote: "异或运算基础",
    description: `给你一个 **非空** 整数数组 \`nums\`，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [2,2,1]
输出：1
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [4,1,2,1,2]
输出：4
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [1]
输出：1
\`\`\``,
    constraints: `- \`1 <= nums.length <= 3 * 10^4\`
- \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`
- 除了某个元素只出现一次以外，其余每个元素均出现两次`,
    initialCode: `function singleNumber(nums) {
  // 在此处编写你的代码

}`,
    solution: `function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[2,2,1]]],
        expected: 1
      },
      {
        id: "2",
        name: "示例2",
        input: [[[4,1,2,1,2]]],
        expected: 4
      },
      {
        id: "3",
        name: "单元素",
        input: [[[1]]],
        expected: 1
      }
    ],
    hints: [
      "利用异或运算的性质：a ^ a = 0，a ^ 0 = a",
      "所有数字异或后，出现两次的数字都被抵消",
      "剩下的就是只出现一次的数字"
    ],
    explanation: `## 解题思路

### 异或运算

利用异或运算的性质：
- a ^ a = 0（相同为 0）
- a ^ 0 = a（与 0 异或等于自身）
- 异或满足交换律和结合律

将所有数字异或，出现两次的数字会相互抵消变成 0，最后剩下的就是只出现一次的数字。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["single-number-ii", "number-of-1-bits"],
    solutions: [
      {
        name: "异或运算（推荐）",
        code: `/**
 * 只出现一次的数字 - 异或运算法
 *
 * 核心思想：利用异或运算的三个关键性质
 * 1. a ^ a = 0  （相同的数异或结果为0）
 * 2. a ^ 0 = a  （任何数与0异或等于自身）
 * 3. 异或满足交换律和结合律
 *
 * 所有数字异或后，成对的数字相互抵消变成0，剩下的就是只出现一次的数字
 *
 * 时间复杂度：O(n)，遍历一次数组
 * 空间复杂度：O(1)，只用一个变量
 */
function singleNumber(nums) {
  // result 初始化为0，因为 0 ^ x = x
  let result = 0;

  // 遍历数组，将所有数字异或
  for (const num of nums) {
    /**
     * 异或运算过程
     *
     * 示例：nums = [4,1,2,1,2]
     *
     * result = 0
     * 0 ^ 4 = 4
     * 4 ^ 1 = 5
     * 5 ^ 2 = 7
     * 7 ^ 1 = 6  (1异或1抵消)
     * 6 ^ 2 = 4  (2异或2抵消)
     *
     * 利用交换律重新排列：
     * 4 ^ 1 ^ 2 ^ 1 ^ 2
     * = 4 ^ (1 ^ 1) ^ (2 ^ 2)
     * = 4 ^ 0 ^ 0
     * = 4
     */
    result ^= num;
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "只出现一次的数字演示",
          steps: [
            {
              array: ["4", "1", "2", "1", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "当前" }],
              description: "nums=[4,1,2,1,2]。利用异或运算。result=0",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "4" }],
              description: "result ^= 4 → 0 ^ 4 = 4",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "1" }],
              description: "result ^= 1 → 4 ^ 1 = 5 (0100 ^ 0001 = 0101)",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "blue" as const, label: "2" }],
              description: "result ^= 2 → 5 ^ 2 = 7 (0101 ^ 0010 = 0111)",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 3,
              right: 3,
              highlights: [{ indices: [1, 3], color: "red" as const, label: "抵消" }],
              description: "result ^= 1 → 7 ^ 1 = 6。两个1相互抵消",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 4,
              right: 4,
              highlights: [{ indices: [2, 4], color: "red" as const, label: "抵消" }],
              description: "result ^= 2 → 6 ^ 2 = 4。两个2相互抵消，剩余4",
            },
            {
              array: ["4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "遍历完成。只出现一次的数字是4",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 异或运算

### 思路
利用异或运算的性质：
- a ^ a = 0（相同为 0）
- a ^ 0 = a（与 0 异或等于自身）
- 异或满足交换律和结合律

将所有数字异或，出现两次的数字会相互抵消变成 0，最后剩下的就是只出现一次的数字。

### 示例
[4,1,2,1,2]
4 ^ 1 ^ 2 ^ 1 ^ 2
= 4 ^ (1 ^ 1) ^ (2 ^ 2)
= 4 ^ 0 ^ 0
= 4`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        code: `/**
 * 只出现一次的数字 - 哈希表计数法
 *
 * 核心思想：使用哈希表统计每个数字出现的次数，找出出现1次的
 *
 * 步骤：
 * 1. 遍历数组，用Map记录每个数字出现的次数
 * 2. 遍历Map，找出出现次数为1的数字
 *
 * 时间复杂度：O(n)，遍历两次
 * 空间复杂度：O(n)，哈希表存储
 */
function singleNumber(nums) {
  // 使用Map统计每个数字出现的次数
  const count = new Map();

  // 第一次遍历：统计频次
  for (const num of nums) {
    /**
     * 计数过程
     *
     * nums = [4,1,2,1,2]
     *
     * num=4: count = {4: 1}
     * num=1: count = {4: 1, 1: 1}
     * num=2: count = {4: 1, 1: 1, 2: 1}
     * num=1: count = {4: 1, 1: 2, 2: 1}
     * num=2: count = {4: 1, 1: 2, 2: 2}
     */
    count.set(num, (count.get(num) || 0) + 1);
  }

  // 第二次遍历：找出出现1次的数字
  for (const [num, cnt] of count) {
    if (cnt === 1) return num;
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "哈希表计数演示",
          steps: [
            {
              array: ["4", "1", "2", "1", "2"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[4,1,2,1,2]。用哈希表统计每个数字出现次数",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "4" }],
              description: "遍历4：count={4:1}",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "1" }],
              description: "遍历1：count={4:1, 1:1}",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "blue" as const, label: "2" }],
              description: "遍历2：count={4:1, 1:1, 2:1}",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 3,
              right: 3,
              highlights: [{ indices: [1, 3], color: "yellow" as const, label: "1×2" }],
              description: "遍历1：count={4:1, 1:2, 2:1}",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 4,
              right: 4,
              highlights: [{ indices: [2, 4], color: "yellow" as const, label: "2×2" }],
              description: "遍历2：count={4:1, 1:2, 2:2}",
            },
            {
              array: ["4:1", "1:2", "2:2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "count=1" }],
              description: "遍历哈希表，找出count=1的数字：4",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 哈希表

### 思路
1. 使用哈希表统计每个数字出现的次数
2. 遍历哈希表，找出出现一次的数字

### 特点
- 思路直观
- 空间复杂度为 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "数学方法",
        code: `/**
 * 只出现一次的数字 - 数学公式法
 *
 * 核心思想：利用数学公式 x = 2 × (集合之和) - (数组之和)
 *
 * 推导：
 * 设数组中不重复的数为 a, b, c...，单独的数为 x
 * - 数组之和 = 2a + 2b + 2c + ... + x
 * - 集合之和 = a + b + c + ... + x
 * - 2 × 集合之和 = 2a + 2b + 2c + ... + 2x
 * - x = 2 × 集合之和 - 数组之和
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，Set存储
 */
function singleNumber(nums) {
  /**
   * 示例：nums = [4,1,2,1,2]
   *
   * set = {4, 1, 2}
   * sumOfSet = 4 + 1 + 2 = 7
   * sumOfNums = 4 + 1 + 2 + 1 + 2 = 10
   *
   * result = 2 * 7 - 10 = 14 - 10 = 4
   *
   * 验证：
   * 数组之和 = 2×1 + 2×2 + 4 = 2 + 4 + 4 = 10 ✓
   * 集合之和 = 1 + 2 + 4 = 7 ✓
   */

  // 创建集合，去除重复元素
  const set = new Set(nums);

  // 计算集合元素之和
  const sumOfSet = [...set].reduce((a, b) => a + b, 0);

  // 计算数组元素之和
  const sumOfNums = nums.reduce((a, b) => a + b, 0);

  // 应用公式
  return 2 * sumOfSet - sumOfNums;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "数学公式法演示",
          steps: [
            {
              array: ["4", "1", "2", "1", "2"],
              left: 0,
              right: 4,
              highlights: [],
              description: "nums=[4,1,2,1,2]。公式：x = 2×集合和 - 数组和",
            },
            {
              array: ["4", "1", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "集合" }],
              description: "创建Set去重：{4, 1, 2}",
            },
            {
              array: ["4", "1", "2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "sum=7" }],
              description: "集合之和：4 + 1 + 2 = 7",
            },
            {
              array: ["4", "1", "2", "1", "2"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "yellow" as const, label: "sum=10" }],
              description: "数组之和：4 + 1 + 2 + 1 + 2 = 10",
            },
            {
              array: ["2×7", "-", "10", "=", "4"],
              left: 0,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "答案" }],
              description: "x = 2×7 - 10 = 14 - 10 = 4",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 数学方法

### 思路
设数组中不重复的数为 a, b, c...，单独的数为 x
- 数组之和 = 2a + 2b + 2c + ... + x
- 集合之和 = a + b + c + ... + x
- x = 2 × 集合之和 - 数组之和

### 特点
- 利用数学公式
- 需要额外空间存储集合`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 3. 只出现一次的数字 II (137)
  {
    id: "single-number-ii",
    leetcodeId: 137,
    title: "只出现一次的数字 II",
    titleEn: "Single Number II",
    difficulty: "medium",
    category: "bit-manipulation",
    tags: ["位运算", "数组"],
    frontendRelevance: "low",
    frontendNote: "位运算进阶",
    description: `给你一个整数数组 \`nums\`，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**。请你找出并返回那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [2,2,3,2]
输出：3
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,1,0,1,0,1,99]
输出：99
\`\`\``,
    constraints: `- \`1 <= nums.length <= 3 * 10^4\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- \`nums\` 中，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**`,
    initialCode: `function singleNumber(nums) {
  // 在此处编写你的代码

}`,
    solution: `function singleNumber(nums) {
  let ones = 0, twos = 0;
  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }
  return ones;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[2,2,3,2]]],
        expected: 3
      },
      {
        id: "2",
        name: "示例2",
        input: [[[0,1,0,1,0,1,99]]],
        expected: 99
      }
    ],
    hints: [
      "使用两个变量 ones 和 twos 来记录位的出现次数",
      "ones 记录出现 1 次的位，twos 记录出现 2 次的位",
      "出现 3 次时清零"
    ],
    explanation: `## 解题思路

### 位运算状态机

使用两个变量 ones 和 twos 来跟踪每一位出现的次数：
- ones：记录出现 1 次（或 4 次、7 次...）的位
- twos：记录出现 2 次（或 5 次、8 次...）的位
- 出现 3 次时，ones 和 twos 对应位都清零

状态转换：
- 00 -> 01 -> 10 -> 00（出现 0/1/2/3 次）

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["single-number", "number-of-1-bits"],
    solutions: [
      {
        name: "位运算状态机（推荐）",
        code: `/**
 * 只出现一次的数字 II - 状态机法
 *
 * 核心思想：设计一个状态机来模拟每个位出现0/1/2/3次的状态转换
 *
 * 状态定义（用 twos, ones 两个变量表示）：
 * - 出现0次：twos=0, ones=0  (00)
 * - 出现1次：twos=0, ones=1  (01)
 * - 出现2次：twos=1, ones=0  (10)
 * - 出现3次：twos=0, ones=0  (00) 回到初始状态
 *
 * 状态转换图：
 * 00 → 01 → 10 → 00
 *  ↑______________|
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function singleNumber(nums) {
  /**
   * ones：记录某一位出现1次的状态
   * twos：记录某一位出现2次的状态
   *
   * 状态转换公式推导：
   *
   * 输入num后，新的状态：
   * 1. 如果当前是00状态，来了个1，变成01
   * 2. 如果当前是01状态，来了个1，变成10
   * 3. 如果当前是10状态，来了个1，变成00
   *
   * ones的更新：
   * - ones先异或num（可能变1或变0）
   * - 但如果twos位是1，ones必须是0（因为10状态）
   * - 所以 ones = (ones ^ num) & ~twos
   *
   * twos的更新：
   * - twos先异或num
   * - 但如果ones位是1，twos必须是0（因为01状态）
   * - 所以 twos = (twos ^ num) & ~ones
   */
  let ones = 0, twos = 0;

  for (const num of nums) {
    /**
     * 状态转换过程示例：nums = [2,2,3,2]
     *
     * 初始：ones=0, twos=0
     *
     * num=2 (10)：
     *   ones = (0 ^ 2) & ~0 = 2 & 1...1 = 2 (10)
     *   twos = (0 ^ 2) & ~2 = 2 & 1...01 = 0
     *   状态：01（出现1次）
     *
     * num=2 (10)：
     *   ones = (2 ^ 2) & ~0 = 0 & 1...1 = 0
     *   twos = (0 ^ 2) & ~0 = 2 & 1...1 = 2 (10)
     *   状态：10（出现2次）
     *
     * num=3 (11)：
     *   ones = (0 ^ 3) & ~2 = 3 & 1...01 = 1 (01)
     *   twos = (2 ^ 3) & ~1 = 1 & 1...10 = 0
     *   状态：3的第1位01，2的第2位10
     *
     * num=2 (10)：
     *   ones = (1 ^ 2) & ~0 = 3 & 1...1 = 3 (11)
     *   twos = (0 ^ 2) & ~3 = 2 & 1...00 = 0
     *   最终2出现3次清零，ones中只剩3
     */
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }

  // ones 中保存的就是只出现一次的数字
  return ones;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "只出现一次的数字II演示",
          steps: [
            {
              array: ["2", "2", "3", "2"],
              left: 0,
              right: 0,
              highlights: [],
              description: "nums=[2,2,3,2]。ones=0, twos=0。状态机：00→01→10→00",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "第1个2" }],
              description: "处理2：ones=(0^2)&~0=2, twos=(0^2)&~2=0。状态01(出现1次)",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 1,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "2×2" }],
              description: "处理2：ones=(2^2)&~0=0, twos=(0^2)&~0=2。状态10(出现2次)",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "3" }],
              description: "处理3：ones=(0^3)&~2=1, twos=(2^3)&~1=0。3进入ones",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 3,
              right: 3,
              highlights: [{ indices: [0, 1, 3], color: "red" as const, label: "3×2" }],
              description: "处理2：ones=(1^2)&~0=3, twos=(0^2)&~3=0。2出现3次清零",
            },
            {
              array: ["3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "答案" }],
              description: "遍历完成。ones=3，只出现一次的数字是3",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 位运算状态机

### 思路
使用两个变量 ones 和 twos 来跟踪每一位出现的次数：
- ones：记录出现 1 次（或 4 次、7 次...）的位
- twos：记录出现 2 次（或 5 次、8 次...）的位
- 出现 3 次时，ones 和 twos 对应位都清零

状态转换：
- 00 -> 01 -> 10 -> 00（出现 0/1/2/3 次）

### 公式推导
- ones = (ones ^ num) & ~twos
- twos = (twos ^ num) & ~ones`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "按位计数",
        code: `/**
 * 只出现一次的数字 II - 按位统计法
 *
 * 核心思想：统计所有数字在每一位上1的个数，如果不是3的倍数，
 * 说明那个单独的数字在该位上是1
 *
 * 原理：
 * - 每个数字有32位
 * - 对于每一位，出现3次的数字贡献的1的个数是3的倍数
 * - 如果某位1的总数不是3的倍数，多出的1来自单独的数字
 *
 * 时间复杂度：O(32n) = O(n)
 * 空间复杂度：O(1)
 */
function singleNumber(nums) {
  let result = 0;

  // 遍历32位
  for (let i = 0; i < 32; i++) {
    /**
     * 统计所有数字在第i位上1的个数
     *
     * 示例：nums = [2,2,3,2]
     * 二进制：[10, 10, 11, 10]
     *
     * 第0位(i=0)：
     *   (2>>0)&1 = 0
     *   (2>>0)&1 = 0
     *   (3>>0)&1 = 1
     *   (2>>0)&1 = 0
     *   count = 1, 1 % 3 = 1 ≠ 0 → 结果第0位是1
     *
     * 第1位(i=1)：
     *   (2>>1)&1 = 1
     *   (2>>1)&1 = 1
     *   (3>>1)&1 = 1
     *   (2>>1)&1 = 1
     *   count = 4, 4 % 3 = 1 ≠ 0 → 结果第1位是1
     *
     * 结果 = 11(二进制) = 3
     */
    let count = 0;

    // 统计第i位上1的个数
    for (const num of nums) {
      // (num >> i) & 1 获取num的第i位
      count += (num >> i) & 1;
    }

    // 如果不是3的倍数，说明单独的数字在该位是1
    if (count % 3 !== 0) {
      // 将结果的第i位设为1
      result |= (1 << i);
    }
  }

  // result >> 0 处理JavaScript中的负数
  // 将无符号32位转为有符号32位
  return result >> 0;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "按位计数演示",
          steps: [
            {
              array: ["2", "2", "3", "2"],
              left: 0,
              right: 3,
              highlights: [],
              description: "nums=[2,2,3,2]。二进制：[10,10,11,10]。逐位统计1的个数",
            },
            {
              array: ["0", "0", "1", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [2], color: "green" as const, label: "1" }],
              description: "第0位：2的第0位=0, 2的=0, 3的=1, 2的=0。count=1",
            },
            {
              array: ["0", "0", "1", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [2], color: "green" as const, label: "1%3≠0" }],
              description: "1 % 3 = 1 ≠ 0 → 结果第0位是1",
            },
            {
              array: ["1", "1", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "1" }],
              description: "第1位：2的第1位=1, 2的=1, 3的=1, 2的=1。count=4",
            },
            {
              array: ["1", "1", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "4%3≠0" }],
              description: "4 % 3 = 1 ≠ 0 → 结果第1位是1",
            },
            {
              array: ["1", "1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "=3" }],
              description: "结果 = 11(二进制) = 3。只出现一次的数字是3",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 按位计数

### 思路
1. 对于每一位，统计所有数字在该位上的 1 的个数
2. 如果个数不是 3 的倍数，说明单独的数字在该位是 1
3. 还原出单独的数字

### 示例
[2,2,3,2] = [10,10,11,10]
第0位：0+0+1+0 = 1，1 % 3 = 1 → 结果第0位是1
第1位：1+1+1+1 = 4，4 % 3 = 1 → 结果第1位是1
结果 = 11 = 3`,
        timeComplexity: "O(32n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表计数",
        code: `/**
 * 只出现一次的数字 II - 哈希表法
 *
 * 核心思想：使用哈希表统计每个数字出现的次数，找出出现1次的
 *
 * 步骤：
 * 1. 遍历数组，用Map记录每个数字出现的次数
 * 2. 遍历Map，找出出现次数为1的数字
 *
 * 注意：此方法不满足O(1)空间复杂度的要求，但思路简单直观
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function singleNumber(nums) {
  // 使用Map统计频次
  const count = new Map();

  // 第一次遍历：统计每个数字出现的次数
  for (const num of nums) {
    /**
     * 示例：nums = [2,2,3,2]
     *
     * num=2: count = {2: 1}
     * num=2: count = {2: 2}
     * num=3: count = {2: 2, 3: 1}
     * num=2: count = {2: 3, 3: 1}
     */
    count.set(num, (count.get(num) || 0) + 1);
  }

  // 第二次遍历：找出出现1次的数字
  for (const [num, cnt] of count) {
    if (cnt === 1) return num;
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "哈希表计数演示",
          steps: [
            {
              array: ["2", "2", "3", "2"],
              left: 0,
              right: 3,
              highlights: [],
              description: "nums=[2,2,3,2]。用哈希表统计每个数字出现次数",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "2" }],
              description: "遍历2：count={2:1}",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 1,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "2" }],
              description: "遍历2：count={2:2}",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "3" }],
              description: "遍历3：count={2:2, 3:1}",
            },
            {
              array: ["2", "2", "3", "2"],
              left: 3,
              right: 3,
              highlights: [{ indices: [0, 1, 3], color: "blue" as const, label: "2" }],
              description: "遍历2：count={2:3, 3:1}",
            },
            {
              array: ["2:3", "3:1"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "count=1" }],
              description: "遍历哈希表，找出count=1的数字：3",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 哈希表计数

### 思路
1. 使用哈希表统计每个数字出现的次数
2. 找出只出现一次的数字

### 特点
- 思路简单直观
- 不满足 O(1) 空间复杂度的要求`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 4. 比特位计数 (338)
  {
    id: "counting-bits",
    leetcodeId: 338,
    title: "比特位计数",
    titleEn: "Counting Bits",
    difficulty: "easy",
    category: "bit-manipulation",
    tags: ["位运算", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "位计数DP",
    description: `给你一个整数 \`n\`，对于 \`0 <= i <= n\` 中的每个 \`i\`，计算其二进制表示中 **1 的个数**，返回一个长度为 \`n + 1\` 的数组 \`ans\` 作为答案。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 2
输出：[0,1,1]
解释：
0 --> 0
1 --> 1
2 --> 10
\`\`\`

**示例 2：**
\`\`\`
输入：n = 5
输出：[0,1,1,2,1,2]
解释：
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
\`\`\``,
    constraints: `- \`0 <= n <= 10^5\``,
    initialCode: `function countBits(n) {
  // 在此处编写你的代码

}`,
    solution: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // i & (i-1) 消除最低位的 1
    // 所以 ans[i] = ans[i & (i-1)] + 1
    ans[i] = ans[i & (i - 1)] + 1;
  }
  return ans;
}`,
    testCases: [
      {
        id: "1",
        name: "n=2",
        input: [2],
        expected: [0,1,1]
      },
      {
        id: "2",
        name: "n=5",
        input: [5],
        expected: [0,1,1,2,1,2]
      }
    ],
    hints: [
      "利用 i & (i-1) 消除最低位 1 的性质",
      "ans[i] = ans[i & (i-1)] + 1",
      "这是一个动态规划问题"
    ],
    explanation: `## 解题思路

### 动态规划 + 位运算

利用 i & (i-1) 可以消除 i 最低位的 1 这个性质：
- ans[i] = ans[i & (i-1)] + 1
- i & (i-1) 比 i 少一个 1，所以加 1 即可

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)（不计输出数组）`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["number-of-1-bits", "single-number"],
    solutions: [
      {
        name: "动态规划 - 消除最低位（推荐）",
        code: `/**
 * 比特位计数 - 动态规划（消除最低位）
 *
 * 核心思想：利用 i & (i-1) 消除最低位1的性质建立状态转移
 *
 * 状态转移方程：
 * ans[i] = ans[i & (i-1)] + 1
 *
 * 原理解释：
 * - i & (i-1) 消除了i的最低位的1
 * - 所以 i 比 i & (i-1) 多一个1
 * - ans[i] = ans[i去掉一个1后的数] + 1
 *
 * 时间复杂度：O(n)，每个数只计算一次
 * 空间复杂度：O(1)，不计输出数组
 */
function countBits(n) {
  // ans[i] 表示数字i的二进制中1的个数
  const ans = new Array(n + 1).fill(0);

  // 从1开始遍历（ans[0] = 0 已初始化）
  for (let i = 1; i <= n; i++) {
    /**
     * 状态转移：ans[i] = ans[i & (i-1)] + 1
     *
     * 执行过程（n = 7）：
     *
     * i=1: i&(i-1) = 1&0 = 0, ans[1] = ans[0] + 1 = 1
     *      1 (001) 去掉一个1 → 0 (000)
     *
     * i=2: i&(i-1) = 2&1 = 0, ans[2] = ans[0] + 1 = 1
     *      2 (010) 去掉一个1 → 0 (000)
     *
     * i=3: i&(i-1) = 3&2 = 2, ans[3] = ans[2] + 1 = 2
     *      3 (011) 去掉一个1 → 2 (010)
     *
     * i=4: i&(i-1) = 4&3 = 0, ans[4] = ans[0] + 1 = 1
     *      4 (100) 去掉一个1 → 0 (000)
     *
     * i=5: i&(i-1) = 5&4 = 4, ans[5] = ans[4] + 1 = 2
     *      5 (101) 去掉一个1 → 4 (100)
     *
     * i=6: i&(i-1) = 6&5 = 4, ans[6] = ans[4] + 1 = 2
     *      6 (110) 去掉一个1 → 4 (100)
     *
     * i=7: i&(i-1) = 7&6 = 6, ans[7] = ans[6] + 1 = 3
     *      7 (111) 去掉一个1 → 6 (110)
     *
     * 结果：[0,1,1,2,1,2,2,3]
     */
    ans[i] = ans[i & (i - 1)] + 1;
  }

  return ans;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "比特位计数演示",
          steps: [
            {
              array: ["0", "?", "?", "?", "?", "?"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "0" }],
              description: "n=5。ans[0]=0 (0的二进制没有1)。使用DP：ans[i]=ans[i&(i-1)]+1",
            },
            {
              array: ["0", "1", "?", "?", "?", "?"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "1" }],
              description: "i=1: 1&0=0, ans[1]=ans[0]+1=1。1(001)有1个1",
            },
            {
              array: ["0", "1", "1", "?", "?", "?"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "blue" as const, label: "1" }],
              description: "i=2: 2&1=0, ans[2]=ans[0]+1=1。2(010)有1个1",
            },
            {
              array: ["0", "1", "1", "2", "?", "?"],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "blue" as const, label: "2" }],
              description: "i=3: 3&2=2, ans[3]=ans[2]+1=2。3(011)有2个1",
            },
            {
              array: ["0", "1", "1", "2", "1", "?"],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "blue" as const, label: "1" }],
              description: "i=4: 4&3=0, ans[4]=ans[0]+1=1。4(100)有1个1",
            },
            {
              array: ["0", "1", "1", "2", "1", "2"],
              left: 5,
              right: 5,
              highlights: [{ indices: [5], color: "blue" as const, label: "2" }],
              description: "i=5: 5&4=4, ans[5]=ans[4]+1=2。5(101)有2个1",
            },
            {
              array: ["0", "1", "1", "2", "1", "2"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "结果" }],
              description: "完成！[0,1,1,2,1,2] 分别是0-5的二进制中1的个数",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 动态规划 - 消除最低位

### 思路
利用 i & (i-1) 可以消除 i 最低位的 1 这个性质：
- ans[i] = ans[i & (i-1)] + 1
- i & (i-1) 比 i 少一个 1，所以加 1 即可

### 示例
i = 7 (111)
i & (i-1) = 7 & 6 = 111 & 110 = 110 = 6
ans[7] = ans[6] + 1

i = 6 (110)
i & (i-1) = 6 & 5 = 110 & 101 = 100 = 4
ans[6] = ans[4] + 1`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 最低有效位",
        code: `/**
 * 比特位计数 - 动态规划（最低有效位）
 *
 * 核心思想：利用右移操作和最低位建立状态转移
 *
 * 状态转移方程：
 * ans[i] = ans[i >> 1] + (i & 1)
 *
 * 原理解释：
 * - i >> 1 是i右移一位，相当于去掉最低位
 * - i & 1 是i的最低位（0或1）
 * - i的1的个数 = (i右移一位后的1的个数) + (i的最低位)
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，不计输出数组
 */
function countBits(n) {
  // ans[i] 表示数字i的二进制中1的个数
  const ans = new Array(n + 1).fill(0);

  // 从1开始遍历
  for (let i = 1; i <= n; i++) {
    /**
     * 状态转移：ans[i] = ans[i >> 1] + (i & 1)
     *
     * 执行过程（n = 7）：
     *
     * i=1 (001): 1>>1=0, 1&1=1, ans[1] = ans[0] + 1 = 1
     * i=2 (010): 2>>1=1, 2&1=0, ans[2] = ans[1] + 0 = 1
     * i=3 (011): 3>>1=1, 3&1=1, ans[3] = ans[1] + 1 = 2
     * i=4 (100): 4>>1=2, 4&1=0, ans[4] = ans[2] + 0 = 1
     * i=5 (101): 5>>1=2, 5&1=1, ans[5] = ans[2] + 1 = 2
     * i=6 (110): 6>>1=3, 6&1=0, ans[6] = ans[3] + 0 = 2
     * i=7 (111): 7>>1=3, 7&1=1, ans[7] = ans[3] + 1 = 3
     *
     * 关系图：
     * 7 (111) = 3 (011) + 最低位1 → ans[7] = ans[3] + 1
     * 6 (110) = 3 (011) + 最低位0 → ans[6] = ans[3] + 0
     * 5 (101) = 2 (010) + 最低位1 → ans[5] = ans[2] + 1
     * 4 (100) = 2 (010) + 最低位0 → ans[4] = ans[2] + 0
     */
    ans[i] = ans[i >> 1] + (i & 1);
  }

  return ans;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "最低有效位DP演示",
          steps: [
            {
              array: ["0", "?", "?", "?", "?", "?"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "0" }],
              description: "n=5。ans[0]=0。公式：ans[i] = ans[i>>1] + (i&1)",
            },
            {
              array: ["0", "1", "?", "?", "?", "?"],
              left: 1,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "0→1" }],
              description: "i=1: 1>>1=0, 1&1=1, ans[1]=ans[0]+1=1",
            },
            {
              array: ["0", "1", "1", "?", "?", "?"],
              left: 2,
              right: 2,
              highlights: [{ indices: [1, 2], color: "blue" as const, label: "1→2" }],
              description: "i=2: 2>>1=1, 2&1=0, ans[2]=ans[1]+0=1",
            },
            {
              array: ["0", "1", "1", "2", "?", "?"],
              left: 3,
              right: 3,
              highlights: [{ indices: [1, 3], color: "blue" as const, label: "1→3" }],
              description: "i=3: 3>>1=1, 3&1=1, ans[3]=ans[1]+1=2",
            },
            {
              array: ["0", "1", "1", "2", "1", "?"],
              left: 4,
              right: 4,
              highlights: [{ indices: [2, 4], color: "blue" as const, label: "2→4" }],
              description: "i=4: 4>>1=2, 4&1=0, ans[4]=ans[2]+0=1",
            },
            {
              array: ["0", "1", "1", "2", "1", "2"],
              left: 5,
              right: 5,
              highlights: [{ indices: [2, 5], color: "blue" as const, label: "2→5" }],
              description: "i=5: 5>>1=2, 5&1=1, ans[5]=ans[2]+1=2",
            },
            {
              array: ["0", "1", "1", "2", "1", "2"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "结果" }],
              description: "完成！[0,1,1,2,1,2]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 动态规划 - 最低有效位

### 思路
对于任意数 i：
- i >> 1 是 i 右移一位后的数
- i & 1 是 i 的最低位（0 或 1）
- ans[i] = ans[i >> 1] + (i & 1)

### 示例
i = 7 (111)
i >> 1 = 3 (11)
i & 1 = 1
ans[7] = ans[3] + 1 = 2 + 1 = 3`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 最高有效位",
        code: `/**
 * 比特位计数 - 动态规划（最高有效位）
 *
 * 核心思想：利用最高有效位（2的幂）建立状态转移
 *
 * 状态转移方程：
 * ans[i] = ans[i - highBit] + 1
 *
 * 原理解释：
 * - highBit 是不超过i的最大2的幂（即i的最高有效位对应的数）
 * - i - highBit 是去掉最高位后剩下的部分
 * - i的1的个数 = (去掉最高位1后的1的个数) + 1
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，不计输出数组
 */
function countBits(n) {
  // ans[i] 表示数字i的二进制中1的个数
  const ans = new Array(n + 1).fill(0);

  // highBit 记录当前遇到的最大的2的幂
  let highBit = 0;

  for (let i = 1; i <= n; i++) {
    /**
     * 检测i是否是2的幂
     *
     * i & (i-1) === 0 说明i只有一个1，即i是2的幂
     * 例如：
     * 1 (001): 1 & 0 = 0 ✓ → highBit = 1
     * 2 (010): 2 & 1 = 0 ✓ → highBit = 2
     * 4 (100): 4 & 3 = 0 ✓ → highBit = 4
     * 3 (011): 3 & 2 = 2 ≠ 0
     */
    if ((i & (i - 1)) === 0) {
      highBit = i;
    }

    /**
     * 状态转移：ans[i] = ans[i - highBit] + 1
     *
     * 执行过程（n = 7）：
     *
     * i=1: highBit=1, ans[1] = ans[0] + 1 = 1
     *      1 = 1 + 0, 去掉最高位得0
     *
     * i=2: highBit=2, ans[2] = ans[0] + 1 = 1
     *      2 = 2 + 0, 去掉最高位得0
     *
     * i=3: highBit=2, ans[3] = ans[1] + 1 = 2
     *      3 = 2 + 1, 去掉最高位得1
     *
     * i=4: highBit=4, ans[4] = ans[0] + 1 = 1
     *      4 = 4 + 0, 去掉最高位得0
     *
     * i=5: highBit=4, ans[5] = ans[1] + 1 = 2
     *      5 = 4 + 1, 去掉最高位得1
     *
     * i=6: highBit=4, ans[6] = ans[2] + 1 = 2
     *      6 = 4 + 2, 去掉最高位得2
     *
     * i=7: highBit=4, ans[7] = ans[3] + 1 = 3
     *      7 = 4 + 3, 去掉最高位得3
     */
    ans[i] = ans[i - highBit] + 1;
  }

  return ans;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "最高有效位DP演示",
          steps: [
            {
              array: ["0", "?", "?", "?", "?", "?"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "0" }],
              description: "n=5。ans[0]=0, highBit=0。公式：ans[i]=ans[i-highBit]+1",
            },
            {
              array: ["0", "1", "?", "?", "?", "?"],
              left: 1,
              right: 1,
              highlights: [{ indices: [1], color: "yellow" as const, label: "2^0" }],
              description: "i=1是2的幂，highBit=1。ans[1]=ans[0]+1=1",
            },
            {
              array: ["0", "1", "1", "?", "?", "?"],
              left: 2,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "2^1" }],
              description: "i=2是2的幂，highBit=2。ans[2]=ans[0]+1=1",
            },
            {
              array: ["0", "1", "1", "2", "?", "?"],
              left: 3,
              right: 3,
              highlights: [{ indices: [1, 3], color: "blue" as const, label: "3-2=1" }],
              description: "i=3, highBit=2。ans[3]=ans[3-2]+1=ans[1]+1=2",
            },
            {
              array: ["0", "1", "1", "2", "1", "?"],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "yellow" as const, label: "2^2" }],
              description: "i=4是2的幂，highBit=4。ans[4]=ans[0]+1=1",
            },
            {
              array: ["0", "1", "1", "2", "1", "2"],
              left: 5,
              right: 5,
              highlights: [{ indices: [1, 5], color: "blue" as const, label: "5-4=1" }],
              description: "i=5, highBit=4。ans[5]=ans[5-4]+1=ans[1]+1=2",
            },
            {
              array: ["0", "1", "1", "2", "1", "2"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "结果" }],
              description: "完成！[0,1,1,2,1,2]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 动态规划 - 最高有效位

### 思路
对于任意数 i：
- 找到 i 的最高有效位对应的 2 的幂 highBit
- ans[i] = ans[i - highBit] + 1

### 示例
i = 7 = 4 + 3
highBit = 4
ans[7] = ans[7 - 4] + 1 = ans[3] + 1 = 2 + 1 = 3`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
