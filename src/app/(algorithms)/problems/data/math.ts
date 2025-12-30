import { Problem } from "../types";

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
        code: `function isPalindrome(x) {
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
        code: `function isPalindrome(x) {
  if (x < 0) return false;
  const str = x.toString();
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
        code: `function isPalindrome(x) {
  if (x < 0) return false;

  const original = x;
  let reversed = 0;

  while (x > 0) {
    reversed = reversed * 10 + x % 10;
    x = Math.floor(x / 10);
  }

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
        code: `function plusOne(digits) {
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
        code: `function plusOne(digits) {
  let carry = 1; // 初始进位为 1（相当于 +1）

  for (let i = digits.length - 1; i >= 0; i--) {
    const sum = digits[i] + carry;
    digits[i] = sum % 10;
    carry = Math.floor(sum / 10);

    if (carry === 0) return digits;
  }

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
        code: `function plusOne(digits) {
  const num = BigInt(digits.join('')) + 1n;
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
        code: `function myPow(x, n) {
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
        code: `function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  function quickPow(x, n) {
    if (n === 0) return 1;
    const half = quickPow(x, Math.floor(n / 2));
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
        code: `function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

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
        code: `function mySqrt(x) {
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
        code: `function mySqrt(x) {
  if (x < 2) return x;

  let r = x;
  while (r * r > x) {
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
        code: `function mySqrt(x) {
  if (x < 2) return x;

  // 使用位运算估算初始值
  // sqrt(x) 大约是 2^(log2(x)/2)
  let left = 1;
  let right = x;
  let ans = 0;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (mid <= x / mid) {
      ans = mid;
      left = mid + 1;
    } else {
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
