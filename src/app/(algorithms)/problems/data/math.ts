import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const mathProblems: Problem[] = [
  // 1. 回文数 (9)
  {
    id: "palindrome-number",
    leetcodeId: 9,
    title: "回文数",
    titleEn: "Palindrome Number",
    difficulty: "easy",
    category: "math",
    tags: ["数学"],
    frontendRelevance: "low",
    frontendNote: "回文数，数学",
    description: `给你一个整数 \`x\`，如果 \`x\` 是一个回文整数，返回 \`true\`；否则，返回 \`false\`。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，\`121\` 是回文，而 \`123\` 不是。`,
    examples: `**示例 1：**
\`\`\`
输入：x = 121
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：x = -121
输出：false
解释：从左向右读，为 -121。从右向左读，为 121-。因此它不是一个回文数。
\`\`\`

**示例 3：**
\`\`\`
输入：x = 10
输出：false
解释：从右向左读，为 01。因此它不是一个回文数。
\`\`\``,
    constraints: `- \`-2^31 <= x <= 2^31 - 1\``,
    initialCode: `function isPalindrome(x) {
  // 在此处编写你的代码

}`,
    solution: `function isPalindrome(x) {
  // 负数和以 0 结尾的非零数不是回文
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 偶数位数：x === reversed
  // 奇数位数：x === Math.floor(reversed / 10)
  return x === reversed || x === Math.floor(reversed / 10);
}`,
    testCases: [
      {
        id: "1",
        name: "回文数",
        input: [121],
        expected: true
      },
      {
        id: "2",
        name: "负数",
        input: [-121],
        expected: false
      },
      {
        id: "3",
        name: "以0结尾",
        input: [10],
        expected: false
      }
    ],
    hints: [
      "负数不是回文数",
      "只需要反转一半的数字进行比较",
      "注意处理奇数位数和偶数位数的情况"
    ],
    explanation: `## 解题思路

### 反转一半数字

只需要反转数字的后半部分，然后与前半部分比较：
1. 负数不是回文
2. 以 0 结尾的非零数不是回文
3. 反转后半部分，当反转后的数 >= 原数时停止
4. 比较两部分是否相等

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["plus-one", "pow-x-n"],
    solutions: [
      {
        name: "反转一半数字（推荐）",
        animation: {
          type: "two-pointers" as const,
          title: "反转一半数字演示",
          steps: [
            {
              array: ["1", "2", "3", "2", "1"],
              left: 0,
              right: 4,
              highlights: [],
              description: "x=12321。反转后半部分与前半比较",
            },
            {
              array: ["x=1232", "rev=1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "yellow" as const, label: "取末位" }],
              description: "rev=0*10+12321%10=1, x=1232",
            },
            {
              array: ["x=123", "rev=12"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "yellow" as const, label: "取末位" }],
              description: "rev=1*10+1232%10=12, x=123",
            },
            {
              array: ["x=12", "rev=123"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "前半" },
                { indices: [1], color: "green" as const, label: "后半" },
              ],
              description: "x<=rev停止。12==123/10? 是回文!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 回文数 - 反转一半数字法
 *
 * 核心思想：只反转数字的后半部分，与前半部分比较
 *
 * 为什么只反转一半？
 * - 避免整数溢出问题（完全反转可能溢出）
 * - 当反转的数 >= 剩余的数时，说明已经处理了一半
 *
 * 特殊情况：
 * - 负数不是回文（-121 读作 121-）
 * - 以 0 结尾的非零数不是回文（10 反转是 01）
 *
 * 时间复杂度：O(log n)，每次迭代去掉一位数字
 * 空间复杂度：O(1)
 */
function isPalindrome(x) {
  // 特殊情况处理
  // 1. 负数不是回文
  // 2. 以 0 结尾的非零数不是回文（因为开头不能是 0）
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  // reversed 存储反转的后半部分
  let reversed = 0;

  /**
   * 反转后半部分数字
   *
   * 示例：x = 12321
   *
   * 初始：x=12321, reversed=0
   *
   * 第1轮：
   *   reversed = 0*10 + 12321%10 = 1
   *   x = floor(12321/10) = 1232
   *   x(1232) > reversed(1)，继续
   *
   * 第2轮：
   *   reversed = 1*10 + 1232%10 = 12
   *   x = floor(1232/10) = 123
   *   x(123) > reversed(12)，继续
   *
   * 第3轮：
   *   reversed = 12*10 + 123%10 = 123
   *   x = floor(123/10) = 12
   *   x(12) < reversed(123)，停止
   *
   * 奇数位数情况：中间数字在 reversed 中
   * x=12, reversed=123
   * 比较：x(12) === floor(reversed/10)(12) ✓
   */
  while (x > reversed) {
    // 取出 x 的最后一位，加到 reversed 上
    reversed = reversed * 10 + x % 10;
    // 去掉 x 的最后一位
    x = Math.floor(x / 10);
  }

  // 偶数位数：x === reversed（如 1221 → x=12, reversed=12）
  // 奇数位数：x === floor(reversed/10)（如 12321 → x=12, reversed=123）
  return x === reversed || x === Math.floor(reversed / 10);
}`,
        explanation: `## 反转一半数字

### 思路
只需要反转数字的后半部分，然后与前半部分比较：
1. 负数不是回文
2. 以 0 结尾的非零数不是回文
3. 反转后半部分，当反转后的数 >= 原数时停止
4. 比较两部分是否相等

### 示例
x = 12321
反转过程：
- x=12321, reversed=0 → x=1232, reversed=1
- x=1232, reversed=1 → x=123, reversed=12
- x=123, reversed=12 → x=12, reversed=123
此时 x < reversed，停止
x=12, reversed=123, 123/10=12=x，是回文`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "字符串反转",
        animation: {
          type: "two-pointers" as const,
          title: "字符串反转判断回文",
          steps: [
            {
              array: ["1", "2", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "原串" }],
              description: "x=121转为字符串\"121\"",
            },
            {
              array: ["1", "2", "1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "yellow" as const, label: "反转" }],
              description: "反转得\"121\"",
            },
            {
              array: ["\"121\"", "==", "\"121\""],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 2], color: "green" as const, label: "相等" }],
              description: "比较相等，是回文!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 回文数 - 字符串反转法
 *
 * 核心思想：将数字转为字符串，比较原字符串与反转后的字符串
 *
 * 实现步骤：
 * 1. 转为字符串
 * 2. 反转字符串
 * 3. 比较是否相等
 *
 * 时间复杂度：O(n)，n 为数字位数
 * 空间复杂度：O(n)，存储字符串
 */
function isPalindrome(x) {
  // 负数不是回文
  if (x < 0) return false;

  // 转为字符串
  const str = x.toString();

  /**
   * 反转字符串并比较
   *
   * 示例：x = 121
   *
   * str = "121"
   * str.split('') = ['1', '2', '1']
   * .reverse() = ['1', '2', '1']
   * .join('') = "121"
   *
   * "121" === "121" → true
   */
  return str === str.split('').reverse().join('');
}`,
        explanation: `## 字符串反转

### 思路
1. 负数直接返回 false
2. 将数字转为字符串
3. 比较字符串与其反转是否相等

### 特点
- 代码简洁
- 需要额外空间存储字符串`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "完全反转数字",
        animation: {
          type: "two-pointers" as const,
          title: "完全反转数字判断回文",
          steps: [
            {
              array: ["x=121", "rev=0"],
              left: 0,
              right: 1,
              highlights: [],
              description: "保存原数121，开始反转",
            },
            {
              array: ["x=12", "rev=1"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "yellow" as const, label: "取末位" }],
              description: "rev=0*10+121%10=1",
            },
            {
              array: ["x=0", "rev=121"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "完成" }],
              description: "rev=12*10+1=121",
            },
            {
              array: ["121", "==", "121"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 2], color: "green" as const, label: "相等" }],
              description: "121==121，是回文!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 回文数 - 完全反转数字法
 *
 * 核心思想：完全反转整个数字，与原数字比较
 *
 * 注意：
 * - 需要保存原始数字用于最后比较
 * - 对于很大的数字可能存在溢出问题（JS 中使用 Number 类型会自动处理）
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function isPalindrome(x) {
  // 负数不是回文
  if (x < 0) return false;

  // 保存原始值用于最后比较
  const original = x;
  // 存储反转后的数字
  let reversed = 0;

  /**
   * 完全反转数字
   *
   * 示例：x = 121
   *
   * 初始：x=121, reversed=0
   *
   * 第1轮：
   *   reversed = 0*10 + 121%10 = 1
   *   x = floor(121/10) = 12
   *
   * 第2轮：
   *   reversed = 1*10 + 12%10 = 12
   *   x = floor(12/10) = 1
   *
   * 第3轮：
   *   reversed = 12*10 + 1%10 = 121
   *   x = floor(1/10) = 0
   *
   * x = 0，退出循环
   * reversed = 121, original = 121
   * 121 === 121 → true
   */
  while (x > 0) {
    // 取出最后一位，加到 reversed
    reversed = reversed * 10 + x % 10;
    // 去掉最后一位
    x = Math.floor(x / 10);
  }

  // 比较反转后的数字与原始数字
  return original === reversed;
}`,
        explanation: `## 完全反转数字

### 思路
1. 保存原始数字
2. 完全反转数字
3. 比较反转后的数字与原始数字是否相等

### 注意
- 可能存在溢出问题（对于很大的数字）
- 需要额外变量保存原始值`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 2. 加一 (66)
  {
    id: "plus-one",
    leetcodeId: 66,
    title: "加一",
    titleEn: "Plus One",
    difficulty: "easy",
    category: "math",
    tags: ["数组", "数学"],
    frontendRelevance: "low",
    frontendNote: "加一，数学",
    description: `给定一个由 **整数** 组成的 **非空** 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位，数组中每个元素只存储 **单个** 数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。`,
    examples: `**示例 1：**
\`\`\`
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
\`\`\`

**示例 2：**
\`\`\`
输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。
\`\`\`

**示例 3：**
\`\`\`
输入：digits = [9]
输出：[1,0]
\`\`\``,
    constraints: `- \`1 <= digits.length <= 100\`
- \`0 <= digits[i] <= 9\``,
    initialCode: `function plusOne(digits) {
  // 在此处编写你的代码

}`,
    solution: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  // 所有位都是 9 的情况
  return [1, ...digits];
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[1,2,3]]],
        expected: [1,2,4]
      },
      {
        id: "2",
        name: "示例2",
        input: [[[4,3,2,1]]],
        expected: [4,3,2,2]
      },
      {
        id: "3",
        name: "进位",
        input: [[[9]]],
        expected: [1,0]
      }
    ],
    hints: [
      "从最低位开始处理进位",
      "如果当前位小于 9，直接加 1 返回",
      "如果是 9，变成 0 继续向前进位"
    ],
    explanation: `## 解题思路

### 模拟加法

从最低位开始：
1. 如果当前位 < 9，直接加 1 返回
2. 如果当前位 = 9，变成 0，继续处理下一位
3. 如果所有位都是 9，需要在最前面加 1

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["palindrome-number", "pow-x-n"],
    solutions: [
      {
        name: "模拟加法（推荐）",
        animation: {
          type: "two-pointers" as const,
          title: "模拟加法演示",
          steps: [
            {
              array: ["1", "2", "9"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "+1" }],
              description: "digits=[1,2,9]，从最低位9开始",
            },
            {
              array: ["1", "2", "0"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [2], color: "green" as const, label: "9→0" },
                { indices: [1], color: "yellow" as const, label: "进位" },
              ],
              description: "9+1=10，该位变0，进位",
            },
            {
              array: ["1", "3", "0"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "完成" }],
              description: "2+1=3<10，无需进位。结果[1,3,0]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 加一 - 模拟加法
 *
 * 核心思想：从最低位开始处理进位
 *
 * 关键观察：
 * - 如果当前位 < 9，加 1 后不会产生进位，直接返回
 * - 如果当前位 = 9，加 1 后变成 0，需要向前进位
 * - 只有所有位都是 9 时（如 999），才需要扩展数组
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，只有 999...9 情况需要 O(n)
 */
function plusOne(digits) {
  /**
   * 从最低位向最高位处理
   *
   * 示例1：digits = [1,2,3]
   *
   * i=2: digits[2]=3 < 9
   *      digits[2]++ → [1,2,4]
   *      直接返回 [1,2,4]
   *
   * 示例2：digits = [1,2,9]
   *
   * i=2: digits[2]=9
   *      digits[2]=0 → [1,2,0]
   *      继续
   * i=1: digits[1]=2 < 9
   *      digits[1]++ → [1,3,0]
   *      直接返回 [1,3,0]
   *
   * 示例3：digits = [9,9,9]
   *
   * i=2: digits[2]=9 → [9,9,0]
   * i=1: digits[1]=9 → [9,0,0]
   * i=0: digits[0]=9 → [0,0,0]
   * 循环结束，所有位都是 9
   * 返回 [1,0,0,0]
   */
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      // 不需要进位，直接加 1 返回
      digits[i]++;
      return digits;
    }
    // 需要进位，当前位变 0，继续处理下一位
    digits[i] = 0;
  }

  // 所有位都是 9 的情况（如 999 → 1000）
  // [0,0,0] → [1,0,0,0]
  return [1, ...digits];
}`,
        explanation: `## 模拟加法

### 思路
从最低位开始：
1. 如果当前位 < 9，直接加 1 返回
2. 如果当前位 = 9，变成 0，继续处理下一位
3. 如果所有位都是 9，需要在最前面加 1

### 示例
[9,9,9] → 第一轮 [9,9,0] → 第二轮 [9,0,0] → 第三轮 [0,0,0]
所有位都处理完了，在最前面加 1 → [1,0,0,0]`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "显式进位",
        animation: {
          type: "two-pointers" as const,
          title: "显式进位演示",
          steps: [
            {
              array: ["1", "9", "9"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "carry=1" }],
              description: "digits=[1,9,9]，carry=1初始",
            },
            {
              array: ["1", "9", "0"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "9+1=10" }],
              description: "9+1=10，该位=0，carry=1",
            },
            {
              array: ["2", "0", "0"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "完成" }],
              description: "处理完所有位。结果[2,0,0]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 加一 - 显式进位法
 *
 * 核心思想：使用 carry 变量显式跟踪进位
 *
 * 这是更通用的加法模拟方法，可以扩展为加任意数
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function plusOne(digits) {
  // 初始进位为 1（相当于 +1 操作）
  let carry = 1;

  /**
   * 从最低位开始，逐位处理
   *
   * 示例：digits = [1,9,9]
   *
   * 初始：carry = 1
   *
   * i=2: sum = 9 + 1 = 10
   *      digits[2] = 10 % 10 = 0
   *      carry = floor(10/10) = 1
   *      carry ≠ 0，继续
   *
   * i=1: sum = 9 + 1 = 10
   *      digits[1] = 10 % 10 = 0
   *      carry = floor(10/10) = 1
   *      carry ≠ 0，继续
   *
   * i=0: sum = 1 + 1 = 2
   *      digits[0] = 2 % 10 = 2
   *      carry = floor(2/10) = 0
   *      carry = 0，返回 [2,0,0]
   */
  for (let i = digits.length - 1; i >= 0; i--) {
    // 当前位 + 进位
    const sum = digits[i] + carry;
    // 新的当前位
    digits[i] = sum % 10;
    // 新的进位
    carry = Math.floor(sum / 10);

    // 如果没有进位了，可以提前返回
    if (carry === 0) return digits;
  }

  // 如果最后还有进位（如 999 + 1），在开头添加
  if (carry > 0) {
    digits.unshift(carry);
  }
  return digits;
}`,
        explanation: `## 显式进位

### 思路
1. 使用 carry 变量跟踪进位，初始值为 1
2. 从最低位开始，计算 sum = digits[i] + carry
3. 当前位 = sum % 10，进位 = sum / 10
4. 如果进位为 0，直接返回
5. 最后如果还有进位，在数组开头添加

### 特点
- 思路更通用，可以扩展为加任意数`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "BigInt 方法",
        animation: {
          type: "two-pointers" as const,
          title: "BigInt方法演示",
          steps: [
            {
              array: ["9", "9", "9"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "数组" }],
              description: "[9,9,9].join('')=\"999\"",
            },
            {
              array: ["999n", "+", "1n"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 2], color: "yellow" as const, label: "BigInt" }],
              description: "BigInt(\"999\")+1n=1000n",
            },
            {
              array: ["1", "0", "0", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "结果" }],
              description: "\"1000\".split('').map(Number)=[1,0,0,0]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 加一 - BigInt 方法
 *
 * 核心思想：利用 JavaScript 的 BigInt 处理大数运算
 *
 * 实现步骤：
 * 1. 数组 → 字符串 → BigInt
 * 2. BigInt + 1n
 * 3. BigInt → 字符串 → 数组
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function plusOne(digits) {
  /**
   * 示例：digits = [9,9,9]
   *
   * digits.join('') = "999"
   * BigInt("999") = 999n
   * 999n + 1n = 1000n
   * (1000n).toString() = "1000"
   * "1000".split('') = ['1','0','0','0']
   * .map(Number) = [1,0,0,0]
   */
  // 将数组转为 BigInt 数字
  const num = BigInt(digits.join('')) + 1n;
  // 转回数组
  return num.toString().split('').map(Number);
}`,
        explanation: `## BigInt 方法

### 思路
1. 将数组转为 BigInt 数字
2. 加 1
3. 转回数组

### 特点
- 代码简洁
- 使用 BigInt 避免大数溢出
- 效率相对较低`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 3. Pow(x, n) (50)
  {
    id: "pow-x-n",
    leetcodeId: 50,
    title: "Pow(x, n)",
    titleEn: "Pow(x, n)",
    difficulty: "medium",
    category: "math",
    tags: ["递归", "数学"],
    frontendRelevance: "low",
    frontendNote: "快速幂",
    description: `实现 \`pow(x, n)\`，即计算 \`x\` 的整数 \`n\` 次幂函数（即，\`x^n\`）。`,
    examples: `**示例 1：**
\`\`\`
输入：x = 2.00000, n = 10
输出：1024.00000
\`\`\`

**示例 2：**
\`\`\`
输入：x = 2.10000, n = 3
输出：9.26100
\`\`\`

**示例 3：**
\`\`\`
输入：x = 2.00000, n = -2
输出：0.25000
解释：2^-2 = 1/2^2 = 1/4 = 0.25
\`\`\``,
    constraints: `- \`-100.0 < x < 100.0\`
- \`-2^31 <= n <= 2^31 - 1\`
- \`n\` 是一个整数
- \`-10^4 <= x^n <= 10^4\``,
    initialCode: `function myPow(x, n) {
  // 在此处编写你的代码

}`,
    solution: `function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let result = 1;
  while (n > 0) {
    if (n & 1) {
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "正指数",
        input: [2.0, 10],
        expected: 1024.0
      },
      {
        id: "2",
        name: "小数底数",
        input: [2.1, 3],
        expected: 9.261
      },
      {
        id: "3",
        name: "负指数",
        input: [2.0, -2],
        expected: 0.25
      }
    ],
    hints: [
      "使用快速幂算法",
      "x^n = x^(n/2) * x^(n/2)（n 为偶数）",
      "x^n = x^(n/2) * x^(n/2) * x（n 为奇数）"
    ],
    explanation: `## 解题思路

### 快速幂

利用分治思想：
- x^n = x^(n/2) × x^(n/2)（n 为偶数）
- x^n = x^(n/2) × x^(n/2) × x（n 为奇数）

使用位运算优化：
- n & 1 判断奇偶
- n >>= 1 等价于 n /= 2

### 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["sqrt-x", "palindrome-number"],
    solutions: [
      {
        name: "快速幂-迭代（推荐）",
        code: `/**
 * Pow(x, n) - 快速幂迭代法
 *
 * 核心思想：利用二进制分解指数，将 O(n) 优化到 O(log n)
 *
 * 数学原理：
 * - x^n 可以分解为 x^(二进制位的加权和)
 * - 例如：x^13 = x^(1101₂) = x^8 × x^4 × x^1
 *
 * 关键操作：
 * - n & 1：判断 n 的最低位是否为 1（奇偶性）
 * - n >>= 1 或 n /= 2：右移一位（去掉最低位）
 * - x *= x：底数平方，对应二进制位的权重翻倍
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(1)
 */
function myPow(x, n) {
  // 任何数的 0 次方都是 1
  if (n === 0) return 1;

  // 处理负指数：x^(-n) = (1/x)^n
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  // 结果累积器
  let result = 1;

  /**
   * 快速幂迭代过程
   *
   * 示例：x = 2, n = 13 (二进制: 1101)
   *
   * 初始：result=1, x=2, n=13
   *
   * 第1轮：n=13, 二进制最低位=1
   *   n & 1 = 1 → result = 1 × 2 = 2
   *   x = 2 × 2 = 4
   *   n = 13 >> 1 = 6
   *   （相当于累积了 x^1）
   *
   * 第2轮：n=6, 二进制最低位=0
   *   n & 1 = 0 → result 不变 = 2
   *   x = 4 × 4 = 16
   *   n = 6 >> 1 = 3
   *   （跳过 x^2）
   *
   * 第3轮：n=3, 二进制最低位=1
   *   n & 1 = 1 → result = 2 × 16 = 32
   *   x = 16 × 16 = 256
   *   n = 3 >> 1 = 1
   *   （累积了 x^4，result = x^1 × x^4 = x^5）
   *
   * 第4轮：n=1, 二进制最低位=1
   *   n & 1 = 1 → result = 32 × 256 = 8192
   *   x = 256 × 256 = 65536
   *   n = 1 >> 1 = 0
   *   （累积了 x^8，result = x^5 × x^8 = x^13）
   *
   * n = 0，退出循环
   * result = 8192 = 2^13
   */
  while (n > 0) {
    if (n & 1) {
      // 当前二进制位为 1，将当前的 x 累积到结果
      result *= x;
    }
    // 底数平方，对应下一个二进制位
    x *= x;
    // 右移一位
    n = Math.floor(n / 2);
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "快速幂演示",
          steps: [
            {
              array: ["1", "1", "0", "1"],
              left: 0,
              right: 3,
              highlights: [],
              description: "计算2^13。n=13的二进制=1101。x=2, result=1",
            },
            {
              array: ["1", "1", "0", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "bit=1" }],
              description: "n=13, 最低位=1。result=1×2=2, x=2×2=4, n=6",
            },
            {
              array: ["0", "1", "1", "0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "gray" as const, label: "bit=0" }],
              description: "n=6(0110), 最低位=0。跳过。x=4×4=16, n=3",
            },
            {
              array: ["0", "0", "1", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "bit=1" }],
              description: "n=3(0011), 最低位=1。result=2×16=32, x=16×16=256, n=1",
            },
            {
              array: ["0", "0", "0", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "bit=1" }],
              description: "n=1(0001), 最低位=1。result=32×256=8192, n=0",
            },
            {
              array: ["8", "1", "9", "2"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "结果" }],
              description: "n=0, 退出循环。result=8192=2^13 ✓",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 快速幂-迭代

### 思路
利用二进制分解指数：
- 将 n 用二进制表示
- 对于每个二进制位，决定是否乘入结果

### 示例
x^13 = x^(1101₂) = x^8 × x^4 × x^1

n=13(1101)：
- n&1=1, result=x, x=x², n=6
- n&1=0, x=x⁴, n=3
- n&1=1, result=x×x⁴=x⁵, x=x⁸, n=1
- n&1=1, result=x⁵×x⁸=x¹³`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "快速幂-递归",
        animation: {
          type: "two-pointers" as const,
          title: "快速幂递归演示",
          steps: [
            {
              array: ["pow(2,10)"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "调用" }],
              description: "计算2^10。递归调用pow(2,5)",
            },
            {
              array: ["pow(2,10)", "pow(2,5)"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "递归" }],
              description: "pow(2,5)→递归调用pow(2,2)",
            },
            {
              array: ["pow(2,10)", "pow(2,5)", "pow(2,2)", "pow(2,1)", "pow(2,0)=1"],
              left: 0,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "基准" }],
              description: "继续递归直到n=0，返回1",
            },
            {
              array: ["pow(2,1)=2", "pow(2,2)=4", "pow(2,5)=32", "pow(2,10)=1024"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "yellow" as const, label: "回溯" }],
              description: "回溯：1²×2=2, 2²=4, 4²×2=32, 32²=1024",
            },
            {
              array: ["1024"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "2^10=1024 ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * Pow(x, n) - 快速幂递归法
 *
 * 核心思想：利用分治思想，将问题规模减半
 *
 * 递归关系：
 * - x^0 = 1（基准情况）
 * - x^n = (x^(n/2))² × x^(n%2)
 *   - n 为偶数：x^n = (x^(n/2))²
 *   - n 为奇数：x^n = (x^(n/2))² × x
 *
 * 时间复杂度：O(log n)
 * 空间复杂度：O(log n)，递归栈深度
 */
function myPow(x, n) {
  if (n === 0) return 1;

  // 处理负指数
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  /**
   * 递归计算快速幂
   *
   * 示例：x = 2, n = 10
   *
   * quickPow(2, 10)
   *   half = quickPow(2, 5)
   *     half = quickPow(2, 2)
   *       half = quickPow(2, 1)
   *         half = quickPow(2, 0) = 1
   *         1%2=1, return 1 * 1 * 2 = 2
   *       2%2=0, return 2 * 2 = 4
   *     5%2=1, return 4 * 4 * 2 = 32
   *   10%2=0, return 32 * 32 = 1024
   *
   * 结果：1024 = 2^10
   */
  function quickPow(x, n) {
    if (n === 0) return 1;

    // 递归计算 x^(n/2)
    const half = quickPow(x, Math.floor(n / 2));

    // 根据 n 的奇偶性返回结果
    return n % 2 === 0 ? half * half : half * half * x;
  }

  return quickPow(x, n);
}`,
        explanation: `## 快速幂-递归

### 思路
利用分治思想：
- x^n = x^(n/2) × x^(n/2)（n 为偶数）
- x^n = x^(n/2) × x^(n/2) × x（n 为奇数）

### 特点
- 代码更直观
- 有递归调用开销`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "暴力法（仅作对比）",
        animation: {
          type: "two-pointers" as const,
          title: "暴力法演示",
          steps: [
            {
              array: ["2", "2", "2", "2", "2"],
              left: 0,
              right: 4,
              highlights: [],
              description: "计算2^5。循环乘5次。result=1",
            },
            {
              array: ["2", "2", "2", "2", "2"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0], color: "yellow" as const, label: "×2" }],
              description: "i=0: result=1×2=2",
            },
            {
              array: ["2", "2", "2", "2", "2"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "×2" }],
              description: "i=1: result=2×2=4",
            },
            {
              array: ["2", "2", "2", "2", "2"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "完成" }],
              description: "继续...i=4: result=16×2=32。2^5=32 ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * Pow(x, n) - 暴力法
 *
 * 核心思想：直接循环 n 次，每次乘以 x
 *
 * 注意：此方法仅用于理解问题，实际会超时
 * 当 n = 2^31 - 1 时，需要循环约 21 亿次
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function myPow(x, n) {
  if (n === 0) return 1;

  // 处理负指数
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  /**
   * 简单循环乘法
   *
   * 示例：x = 2, n = 5
   *
   * i=0: result = 1 × 2 = 2
   * i=1: result = 2 × 2 = 4
   * i=2: result = 4 × 2 = 8
   * i=3: result = 8 × 2 = 16
   * i=4: result = 16 × 2 = 32
   *
   * 结果：32 = 2^5
   */
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}`,
        explanation: `## 暴力法

### 思路
直接循环 n 次，每次乘以 x

### 注意
- 时间复杂度 O(n)，当 n 很大时会超时
- 仅用于理解问题，实际不可行`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 4. x 的平方根 (69)
  {
    id: "sqrt-x",
    leetcodeId: 69,
    title: "x 的平方根",
    titleEn: "Sqrt(x)",
    difficulty: "easy",
    category: "math",
    tags: ["数学", "二分查找"],
    frontendRelevance: "low",
    frontendNote: "平方根，二分/牛顿",
    description: `给你一个非负整数 \`x\`，计算并返回 \`x\` 的 **算术平方根**。

由于返回类型是整数，结果只保留 **整数部分**，小数部分将被 **舍去**。

**注意**：不允许使用任何内置指数函数和算符，例如 \`pow(x, 0.5)\` 或者 \`x ** 0.5\`。`,
    examples: `**示例 1：**
\`\`\`
输入：x = 4
输出：2
\`\`\`

**示例 2：**
\`\`\`
输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842...，由于返回类型是整数，小数部分将被舍去。
\`\`\``,
    constraints: `- \`0 <= x <= 2^31 - 1\``,
    initialCode: `function mySqrt(x) {
  // 在此处编写你的代码

}`,
    solution: `function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}`,
    testCases: [
      {
        id: "1",
        name: "完全平方数",
        input: [4],
        expected: 2
      },
      {
        id: "2",
        name: "非完全平方数",
        input: [8],
        expected: 2
      }
    ],
    hints: [
      "使用二分查找",
      "在 [1, x/2] 范围内查找",
      "注意整数溢出问题"
    ],
    explanation: `## 解题思路

### 二分查找

在 [1, x/2] 范围内二分查找：
- 如果 mid² = x，找到答案
- 如果 mid² < x，在右半部分查找
- 如果 mid² > x，在左半部分查找

最终返回 right（不超过平方根的最大整数）。

### 复杂度分析
- 时间复杂度：O(log x)
- 空间复杂度：O(1)`,
    timeComplexity: "O(log x)",
    spaceComplexity: "O(1)",
    relatedProblems: ["pow-x-n", "palindrome-number"],
    solutions: [
      {
        name: "二分查找（推荐）",
        code: `/**
 * x 的平方根 - 二分查找法
 *
 * 核心思想：在 [1, x/2] 范围内二分查找平方根
 *
 * 为什么上界是 x/2？
 * - 对于 x >= 4，sqrt(x) <= x/2（因为 (x/2)² = x²/4 >= x）
 * - 对于 x < 4（即 0, 1, 2, 3），直接特殊处理
 *
 * 二分查找条件：
 * - mid² = x：找到精确平方根
 * - mid² < x：答案在右半部分
 * - mid² > x：答案在左半部分
 *
 * 时间复杂度：O(log x)
 * 空间复杂度：O(1)
 */
function mySqrt(x) {
  // 特殊处理 0 和 1
  if (x < 2) return x;

  // 搜索范围 [1, x/2]
  let left = 1;
  let right = Math.floor(x / 2);

  /**
   * 二分查找过程
   *
   * 示例：x = 8
   * 搜索范围：[1, 4]
   *
   * 第1轮：
   *   mid = (1+4)/2 = 2
   *   square = 2² = 4 < 8
   *   在右半部分查找，left = 3
   *
   * 第2轮：
   *   mid = (3+4)/2 = 3
   *   square = 3² = 9 > 8
   *   在左半部分查找，right = 2
   *
   * left(3) > right(2)，退出循环
   * 返回 right = 2
   *
   * 验证：2² = 4 <= 8 < 9 = 3²，正确
   */
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      // 找到精确平方根
      return mid;
    } else if (square < x) {
      // mid 太小，在右半部分查找
      left = mid + 1;
    } else {
      // mid 太大，在左半部分查找
      right = mid - 1;
    }
  }

  // 返回 right，即不超过平方根的最大整数
  return right;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "x的平方根二分查找演示",
          steps: [
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 3,
              highlights: [],
              description: "x=8。搜索范围[1, 4]。找不超过sqrt(8)≈2.83的最大整数",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 3,
              highlights: [{ indices: [1], color: "blue" as const, label: "mid=2" }],
              description: "mid=(1+4)/2=2。2²=4<8, 在右半部分查找。left=3",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 2,
              right: 3,
              highlights: [{ indices: [2], color: "blue" as const, label: "mid=3" }],
              description: "left=3, right=4。mid=3。3²=9>8, 在左半部分。right=2",
            },
            {
              array: ["1", "2", "3", "4"],
              left: 2,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "right=2" }],
              description: "left=3>right=2, 退出循环。返回right=2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "验证：2²=4≤8<9=3²。答案正确！sqrt(8)取整=2",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 二分查找

### 思路
在 [1, x/2] 范围内二分查找：
- 如果 mid² = x，找到答案
- 如果 mid² < x，在右半部分查找
- 如果 mid² > x，在左半部分查找

最终返回 right（不超过平方根的最大整数）。

### 为什么上界是 x/2？
对于 x >= 4，sqrt(x) <= x/2
对于 x < 4，直接特殊处理`,
        timeComplexity: "O(log x)",
        spaceComplexity: "O(1)",
      },
      {
        name: "牛顿迭代法",
        animation: {
          type: "two-pointers" as const,
          title: "牛顿迭代法演示",
          steps: [
            {
              array: ["r=8"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "初始" }],
              description: "x=8, r=8。公式：r=(r+x/r)/2",
            },
            {
              array: ["r=8", "→", "r=4"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "迭代1" }],
              description: "r²=64>8。r=(8+8/8)/2=(8+1)/2=4",
            },
            {
              array: ["r=4", "→", "r=3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "迭代2" }],
              description: "r²=16>8。r=(4+8/4)/2=(4+2)/2=3",
            },
            {
              array: ["r=3", "→", "r=2"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "迭代3" }],
              description: "r²=9>8。r=(3+8/3)/2=2.83→2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "r²=4<8, 退出循环。sqrt(8)=2 ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * x 的平方根 - 牛顿迭代法
 *
 * 核心思想：求 f(r) = r² - x = 0 的根
 *
 * 牛顿迭代公式：
 *   r_new = r - f(r) / f'(r)
 *         = r - (r² - x) / (2r)
 *         = (r + x/r) / 2
 *
 * 收敛性：
 * - 牛顿法具有二次收敛性
 * - 每次迭代精度大约翻倍
 *
 * 时间复杂度：O(log x)
 * 空间复杂度：O(1)
 */
function mySqrt(x) {
  if (x < 2) return x;

  // 初始猜测值
  let r = x;

  /**
   * 牛顿迭代过程
   *
   * 示例：x = 8
   *
   * 初始：r = 8
   *
   * 第1轮：r² = 64 > 8
   *   r = (8 + 8/8) / 2 = (8 + 1) / 2 = 4
   *
   * 第2轮：r² = 16 > 8
   *   r = (4 + 8/4) / 2 = (4 + 2) / 2 = 3
   *
   * 第3轮：r² = 9 > 8
   *   r = (3 + 8/3) / 2 = (3 + 2.67) / 2 = 2.83
   *   floor(2.83) = 2
   *
   * 第4轮：r² = 4 < 8
   *   退出循环
   *
   * 返回 r = 2
   */
  while (r * r > x) {
    // 牛顿迭代公式
    r = Math.floor((r + x / r) / 2);
  }

  return r;
}`,
        explanation: `## 牛顿迭代法

### 思路
求 sqrt(x) 等价于求 f(r) = r² - x = 0 的根

牛顿迭代公式：
r_new = r - f(r) / f'(r)
     = r - (r² - x) / (2r)
     = (r + x/r) / 2

### 特点
- 收敛速度快
- 每次迭代精度翻倍`,
        timeComplexity: "O(log x)",
        spaceComplexity: "O(1)",
      },
      {
        name: "位运算 + 二分",
        animation: {
          type: "two-pointers" as const,
          title: "位运算+二分演示",
          steps: [
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8"],
              left: 0,
              right: 7,
              highlights: [],
              description: "x=8。搜索[1,8]。避免溢出：mid<=x/mid",
            },
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8"],
              left: 0,
              right: 7,
              highlights: [{ indices: [3], color: "blue" as const, label: "mid=4" }],
              description: "mid=4。4<=8/4=2? 否。right=3",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [1], color: "blue" as const, label: "mid=2" }],
              description: "left=1,right=3。mid=2。2<=8/2=4? 是。ans=2,left=3",
            },
            {
              array: ["3"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "mid=3" }],
              description: "left=3,right=3。mid=3。3<=8/3=2? 否。right=2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "ans=2" }],
              description: "left>right, 退出。返回ans=2 ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * x 的平方根 - 位运算优化二分法
 *
 * 核心思想：避免整数溢出的安全实现
 *
 * 优化点：
 * - 使用 mid <= x / mid 代替 mid * mid <= x，避免乘法溢出
 * - 使用位运算 >> 1 代替 / 2
 *
 * 时间复杂度：O(log x)
 * 空间复杂度：O(1)
 */
function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = x;
  let ans = 0;

  /**
   * 安全的二分查找
   *
   * 示例：x = 8
   *
   * 第1轮：
   *   mid = 1 + (8-1)/2 = 4
   *   4 <= 8/4 = 2? 否
   *   right = 3
   *
   * 第2轮：
   *   mid = 1 + (3-1)/2 = 2
   *   2 <= 8/2 = 4? 是
   *   ans = 2, left = 3
   *
   * 第3轮：
   *   mid = 3 + (3-3)/2 = 3
   *   3 <= 8/3 = 2? 否
   *   right = 2
   *
   * left(3) > right(2)，退出
   * 返回 ans = 2
   */
  while (left <= right) {
    // 使用位运算优化除法
    const mid = left + ((right - left) >> 1);

    // 使用除法避免乘法溢出
    if (mid <= x / mid) {
      // mid 可能是答案，记录并继续在右半部分查找
      ans = mid;
      left = mid + 1;
    } else {
      // mid 太大，在左半部分查找
      right = mid - 1;
    }
  }

  return ans;
}`,
        explanation: `## 位运算 + 二分

### 思路
1. 使用 mid <= x / mid 代替 mid * mid <= x，避免溢出
2. 使用位运算优化除法

### 特点
- 避免整数溢出问题
- 更加安全的实现`,
        timeComplexity: "O(log x)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
