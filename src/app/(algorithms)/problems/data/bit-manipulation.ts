import { Problem } from "../types";

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
        code: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // 消除最低位的 1
    count++;
  }
  return count;
}`,
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
        code: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;  // 检查最低位
    n = n >>> 1;     // 无符号右移
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
        timeComplexity: "O(32)",
        spaceComplexity: "O(1)",
      },
      {
        name: "内置函数",
        code: `function hammingWeight(n) {
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
        code: `function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}`,
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
        code: `function singleNumber(nums) {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  for (const [num, cnt] of count) {
    if (cnt === 1) return num;
  }
}`,
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
        code: `function singleNumber(nums) {
  const set = new Set(nums);
  const sumOfSet = [...set].reduce((a, b) => a + b, 0);
  const sumOfNums = nums.reduce((a, b) => a + b, 0);
  return 2 * sumOfSet - sumOfNums;
}`,
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
        code: `function singleNumber(nums) {
  let ones = 0, twos = 0;
  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }
  return ones;
}`,
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
        code: `function singleNumber(nums) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    let count = 0;
    for (const num of nums) {
      count += (num >> i) & 1;
    }
    if (count % 3 !== 0) {
      result |= (1 << i);
    }
  }
  // 处理负数
  return result >> 0;
}`,
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
        code: `function singleNumber(nums) {
  const count = new Map();
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }
  for (const [num, cnt] of count) {
    if (cnt === 1) return num;
  }
}`,
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
        code: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // i & (i-1) 消除最低位的 1
    // 所以 ans[i] = ans[i & (i-1)] + 1
    ans[i] = ans[i & (i - 1)] + 1;
  }
  return ans;
}`,
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
        code: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // i 右移一位得到 i >> 1
    // 加上 i 的最低位 i & 1
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
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
        code: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  let highBit = 0;
  for (let i = 1; i <= n; i++) {
    // 检查是否是 2 的幂
    if ((i & (i - 1)) === 0) {
      highBit = i;
    }
    ans[i] = ans[i - highBit] + 1;
  }
  return ans;
}`,
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
