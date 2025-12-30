import { Problem } from "../types";

// 栈分类题目
export const stackProblems: Problem[] = [
  // 1. 有效的括号 (20)
  {
    id: "valid-parentheses",
    leetcodeId: 20,
    title: "有效的括号",
    titleEn: "Valid Parentheses",
    difficulty: "easy",
    category: "stack",
    tags: ["栈", "字符串"],
    description: `给定一个只包括 \`'('\`，\`')'\`，\`'{'\`，\`'}'\`，\`'['\`，\`']'\` 的字符串 \`s\`，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "()"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：s = "()[]{}"
输出：true
\`\`\`

**示例 3：**
\`\`\`
输入：s = "(]"
输出：false
\`\`\`

**示例 4：**
\`\`\`
输入：s = "([])"
输出：true
\`\`\``,
    constraints: `- \`1 <= s.length <= 10^4\`
- \`s\` 仅由括号 \`'()[]{}'\` 组成`,
    initialCode: `function isValid(s) {
  // 在此处编写你的代码

}`,
    solution: `function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      // 左括号入栈
      stack.push(char);
    } else {
      // 右括号，检查栈顶是否匹配
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  // 栈为空说明全部匹配
  return stack.length === 0;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["()"], expected: true },
      { id: "2", name: "示例2", input: ["()[]{}"], expected: true },
      { id: "3", name: "不匹配", input: ["(]"], expected: false },
      { id: "4", name: "嵌套", input: ["([])"], expected: true },
      { id: "5", name: "只有左括号", input: ["("], expected: false },
    ],
    hints: [
      "使用栈来匹配括号",
      "遇到左括号入栈",
      "遇到右括号，检查栈顶是否是对应的左括号",
    ],
    explanation: `## 解题思路

### 栈匹配

1. 遍历字符串的每个字符
2. 如果是左括号，入栈
3. 如果是右括号：
   - 如果栈为空，返回 false
   - 弹出栈顶，检查是否匹配
   - 不匹配返回 false
4. 遍历结束后，检查栈是否为空

### 为什么用栈？

括号匹配遵循"后进先出"的原则：
- 最后出现的左括号，应该最先被匹配
- 这正是栈的特性

### 复杂度分析
- 时间复杂度：O(n)，遍历一次字符串
- 空间复杂度：O(n)，最坏情况栈存储 n/2 个左括号`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["simplify-path", "min-stack"],
    solutions: [
      {
        name: "栈匹配（推荐）",
        code: `function isValid(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
        explanation: `## 栈匹配

### 思路
1. 遇到左括号，入栈
2. 遇到右括号，检查栈顶是否匹配
3. 最后检查栈是否为空

### 为什么用栈？
括号匹配遵循"后进先出"原则：最后出现的左括号，应该最先被匹配。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "替换法（不推荐）",
        code: `function isValid(s) {
  while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
    s = s.replace('()', '').replace('[]', '').replace('{}', '');
  }
  return s.length === 0;
}`,
        explanation: `## 替换法

### 思路
不断删除成对的括号，最后如果字符串为空，说明有效。

### 缺点
- 时间复杂度 O(n²)，每次替换都要遍历字符串
- 不推荐，但思路直观简单`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 2. 简化路径 (71)
  {
    id: "simplify-path",
    leetcodeId: 71,
    title: "简化路径",
    titleEn: "Simplify Path",
    difficulty: "medium",
    category: "stack",
    tags: ["栈", "字符串"],
    description: `给你一个字符串 \`path\`，表示指向某一文件或目录的 Unix 风格 **绝对路径**（以 \`'/'\` 开头），请你将其转化为 **更加简洁的规范路径**。

在 Unix 风格的文件系统中规则如下：
- 一个点 \`'.'\` 表示当前目录本身。
- 两个点 \`'..'\` 表示将目录切换到上一级（指向父目录）。
- 多个斜杠（如 \`'//'\` 或 \`'///'\`）被视为单个斜杠 \`'/'\`。
- 任何其他格式的点（如 \`'...'\` 或 \`'....'\`）被视为有效的文件/目录名称。

返回的 **简化后的路径** 必须遵循下述格式：
- 始终以斜杠 \`'/'\` 开头。
- 两个目录名之间必须只有一个斜杠 \`'/'\`。
- 路径末尾不得有斜杠 \`'/'\`，除非这是根目录。
- 路径不得包含任何 \`'.'\` 或 \`'..'\`。`,
    examples: `**示例 1：**
\`\`\`
输入：path = "/home/"
输出："/home"
解释：注意，最后一个目录名后面没有斜杠。
\`\`\`

**示例 2：**
\`\`\`
输入：path = "/home//foo/"
输出："/home/foo"
解释：多个连续的斜杠被单个斜杠替换。
\`\`\`

**示例 3：**
\`\`\`
输入：path = "/home/user/Documents/../Pictures"
输出："/home/user/Pictures"
解释：两个点 ".." 表示上一级目录。
\`\`\`

**示例 4：**
\`\`\`
输入：path = "/../"
输出："/"
解释：根目录的上一级还是根目录。
\`\`\``,
    constraints: `- \`1 <= path.length <= 3000\`
- \`path\` 由英文字母、数字、句点 \`'.'\`、斜杠 \`'/'\` 或 \`'_'\` 组成
- \`path\` 是一个有效的 Unix 风格绝对路径`,
    initialCode: `function simplifyPath(path) {
  // 在此处编写你的代码

}`,
    solution: `function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');

  for (const part of parts) {
    if (part === '' || part === '.') {
      // 空字符串或当前目录，跳过
      continue;
    } else if (part === '..') {
      // 上级目录，出栈
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // 有效目录名，入栈
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["/home/"], expected: "/home" },
      { id: "2", name: "多斜杠", input: ["/home//foo/"], expected: "/home/foo" },
      { id: "3", name: "上级目录", input: ["/home/user/Documents/../Pictures"], expected: "/home/user/Pictures" },
      { id: "4", name: "根目录", input: ["/../"], expected: "/" },
      { id: "5", name: "复杂路径", input: ["/a/./b/../../c/"], expected: "/c" },
    ],
    hints: [
      "使用栈存储有效的目录名",
      "按 '/' 分割路径",
      "'.' 跳过，'..' 出栈，其他入栈",
    ],
    explanation: `## 解题思路

### 栈模拟路径

1. 按 '/' 分割路径字符串
2. 遍历每个部分：
   - 空字符串或 '.'：跳过
   - '..'：如果栈非空，弹出栈顶
   - 其他：有效目录名，入栈
3. 最后用 '/' 连接栈中的目录名

### 关键处理
- 多个斜杠分割后会产生空字符串，需要跳过
- '..' 在根目录时不做处理（栈为空时不弹出）
- 最后要加上开头的 '/'

### 复杂度分析
- 时间复杂度：O(n)，n 是路径长度
- 空间复杂度：O(n)，栈存储目录名`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["valid-parentheses", "evaluate-reverse-polish-notation"],
    solutions: [
      {
        name: "栈模拟（推荐）",
        code: `function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');

  for (const part of parts) {
    if (part === '' || part === '.') {
      // 空字符串或当前目录，跳过
      continue;
    } else if (part === '..') {
      // 上级目录，出栈
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // 有效目录名，入栈
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}`,
        explanation: `## 栈模拟

### 思路
1. 按 '/' 分割路径字符串
2. 遍历每个部分：
   - 空字符串或 '.'：跳过
   - '..'：如果栈非空，弹出栈顶
   - 其他：有效目录名，入栈
3. 最后用 '/' 连接栈中的目录名

### 关键点
- 多个斜杠分割后产生空字符串，需跳过
- '..' 在根目录时不做处理（栈为空时不弹出）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "正则表达式简化",
        code: `function simplifyPath(path) {
  const stack = [];
  // 使用正则按斜杠分割，过滤空字符串
  const parts = path.split(/\\/+/).filter(Boolean);

  for (const part of parts) {
    if (part === '.') {
      continue;
    } else if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}`,
        explanation: `## 正则表达式简化

### 思路
使用正则表达式 \`/\\/+/\` 分割，可以一次性处理多个连续斜杠。

### 优点
- 代码更简洁
- 不需要单独处理空字符串

### 缺点
- 正则表达式有一定性能开销`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 3. 最小栈 (155)
  {
    id: "min-stack",
    leetcodeId: 155,
    title: "最小栈",
    titleEn: "Min Stack",
    difficulty: "medium",
    category: "stack",
    tags: ["栈", "设计"],
    description: `设计一个支持 \`push\`，\`pop\`，\`top\` 操作，并能在常数时间内检索到最小元素的栈。

实现 \`MinStack\` 类:
- \`MinStack()\` 初始化堆栈对象。
- \`void push(int val)\` 将元素val推入堆栈。
- \`void pop()\` 删除堆栈顶部的元素。
- \`int top()\` 获取堆栈顶部的元素。
- \`int getMin()\` 获取堆栈中的最小元素。`,
    examples: `**示例 1：**
\`\`\`
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
\`\`\``,
    constraints: `- \`-2^31 <= val <= 2^31 - 1\`
- \`pop\`、\`top\` 和 \`getMin\` 操作总是在 **非空栈** 上调用
- \`push\`、\`pop\`、\`top\` 和 \`getMin\` 最多被调用 \`3 * 10^4\` 次`,
    initialCode: `class MinStack {
  constructor() {
    // 在此处初始化

  }

  push(val) {
    // 在此处编写你的代码

  }

  pop() {
    // 在此处编写你的代码

  }

  top() {
    // 在此处编写你的代码

  }

  getMin() {
    // 在此处编写你的代码

  }
}`,
    solution: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // 辅助栈，存储当前最小值
  }

  push(val) {
    this.stack.push(val);
    // 如果辅助栈为空，或者新值 <= 当前最小值，入辅助栈
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    // 如果弹出的是当前最小值，辅助栈也要弹出
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
    testCases: [
      { id: "1", name: "示例1", input: [["push", "push", "push", "getMin", "pop", "top", "getMin"], [[-2], [0], [-3], [], [], [], []]], expected: [null, null, null, -3, null, 0, -2] },
    ],
    hints: [
      "使用一个辅助栈来存储最小值",
      "每次 push 时，如果新值 <= 当前最小值，也入辅助栈",
      "每次 pop 时，如果弹出值等于辅助栈顶，辅助栈也弹出",
    ],
    explanation: `## 解题思路

### 辅助栈

使用两个栈：
1. 主栈：正常存储所有元素
2. 辅助栈：存储"当前最小值"的历史

**Push 操作：**
- 元素入主栈
- 如果辅助栈为空，或新值 <= 辅助栈顶，新值也入辅助栈

**Pop 操作：**
- 主栈弹出
- 如果弹出值等于辅助栈顶，辅助栈也弹出

**GetMin 操作：**
- 返回辅助栈顶

### 为什么用 <= 而不是 <？

如果有重复的最小值，比如 push 两次 -2：
- 使用 <：只有第一个 -2 入辅助栈
- 第一次 pop 后，辅助栈空了，但主栈还有一个 -2
- 使用 <=：两个 -2 都入辅助栈，正确处理

### 复杂度分析
- 时间复杂度：所有操作都是 O(1)
- 空间复杂度：O(n)，辅助栈最多存储 n 个元素`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    relatedProblems: ["valid-parentheses", "evaluate-reverse-polish-notation"],
    solutions: [
      {
        name: "辅助栈（推荐）",
        code: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // 辅助栈，存储当前最小值
  }

  push(val) {
    this.stack.push(val);
    // 如果辅助栈为空，或者新值 <= 当前最小值，入辅助栈
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    // 如果弹出的是当前最小值，辅助栈也要弹出
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}`,
        explanation: `## 辅助栈

### 思路
使用两个栈：
1. 主栈：正常存储所有元素
2. 辅助栈：存储"当前最小值"的历史

### Push 操作
- 元素入主栈
- 如果辅助栈为空，或新值 <= 辅助栈顶，新值也入辅助栈

### Pop 操作
- 主栈弹出
- 如果弹出值等于辅助栈顶，辅助栈也弹出

### 为什么用 <= 而不是 <？
如果有重复的最小值，比如 push 两次 -2：
- 使用 <：只有第一个 -2 入辅助栈，会出错
- 使用 <=：两个 -2 都入辅助栈，正确处理`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
      },
      {
        name: "存储差值",
        code: `class MinStack {
  constructor() {
    this.stack = [];  // 存储与当前最小值的差值
    this.min = null;
  }

  push(val) {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val;
    } else {
      // 存储差值
      this.stack.push(val - this.min);
      if (val < this.min) {
        this.min = val;
      }
    }
  }

  pop() {
    const diff = this.stack.pop();
    if (diff < 0) {
      // 弹出的是最小值，需要恢复之前的最小值
      this.min = this.min - diff;
    }
    if (this.stack.length === 0) {
      this.min = null;
    }
  }

  top() {
    const diff = this.stack[this.stack.length - 1];
    if (diff < 0) {
      return this.min;
    }
    return this.min + diff;
  }

  getMin() {
    return this.min;
  }
}`,
        explanation: `## 存储差值

### 思路
不直接存储值，而是存储当前值与最小值的差值。

### 关键点
- 差值 = 当前值 - 当前最小值
- 如果差值 < 0，说明当前值就是新的最小值
- pop 时如果差值 < 0，需要恢复之前的最小值

### 优点
- 不需要辅助栈，空间更优

### 缺点
- 可能有整数溢出风险（大数场景）
- 逻辑较复杂`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
      },
      {
        name: "存储元组",
        code: `class MinStack {
  constructor() {
    this.stack = []; // 每个元素是 [value, currentMin]
  }

  push(val) {
    if (this.stack.length === 0) {
      this.stack.push([val, val]);
    } else {
      const currentMin = Math.min(val, this.stack[this.stack.length - 1][1]);
      this.stack.push([val, currentMin]);
    }
  }

  pop() {
    this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1][0];
  }

  getMin() {
    return this.stack[this.stack.length - 1][1];
  }
}`,
        explanation: `## 存储元组

### 思路
每个栈元素存储一个元组 [value, currentMin]：
- value: 实际的值
- currentMin: 该元素入栈时的最小值

### 优点
- 实现简单，逻辑清晰
- 不需要额外的辅助栈

### 缺点
- 每个元素都存储了最小值，空间略有浪费`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 4. 逆波兰表达式求值 (150)
  {
    id: "evaluate-reverse-polish-notation",
    leetcodeId: 150,
    title: "逆波兰表达式求值",
    titleEn: "Evaluate Reverse Polish Notation",
    difficulty: "medium",
    category: "stack",
    tags: ["栈", "数学"],
    description: `给你一个字符串数组 \`tokens\`，表示一个根据 **逆波兰表示法** 表示的算术表达式。

请你计算该表达式。返回一个表示表达式值的整数。

**注意：**
- 有效的算符为 \`'+'\`、\`'-'\`、\`'*'\` 和 \`'/'\`。
- 每个操作数（运算对象）都可以是一个整数或者另一个表达式。
- 两个整数之间的除法总是 **向零截断**。
- 表达式中不含除零运算。
- 输入是一个根据逆波兰表示法表示的算术表达式。
- 答案及所有中间计算结果可以用 **32 位** 整数表示。`,
    examples: `**示例 1：**
\`\`\`
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
\`\`\`

**示例 2：**
\`\`\`
输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
\`\`\`

**示例 3：**
\`\`\`
输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
解释：该算式转化为常见的中缀算术表达式为：
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
\`\`\``,
    constraints: `- \`1 <= tokens.length <= 10^4\`
- \`tokens[i]\` 是一个算符（\`"+"\`、\`"-"\`、\`"*"\` 或 \`"/"\`），或是在范围 \`[-200, 200]\` 内的一个整数`,
    initialCode: `function evalRPN(tokens) {
  // 在此处编写你的代码

}`,
    solution: `function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      let result;

      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          // 向零截断
          result = Math.trunc(a / b);
          break;
      }

      stack.push(result);
    } else {
      // 数字，入栈
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}`,
    testCases: [
      { id: "1", name: "示例1", input: [["2", "1", "+", "3", "*"]], expected: 9 },
      { id: "2", name: "示例2", input: [["4", "13", "5", "/", "+"]], expected: 6 },
      { id: "3", name: "复杂表达式", input: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], expected: 22 },
    ],
    hints: [
      "使用栈存储操作数",
      "遇到数字入栈",
      "遇到运算符，弹出两个数进行运算，结果入栈",
    ],
    explanation: `## 解题思路

### 栈求值

逆波兰表达式的特点是：运算符在操作数之后。

1. 遍历 tokens
2. 如果是数字，入栈
3. 如果是运算符：
   - 弹出两个数 b 和 a（注意顺序，b 是后弹出的）
   - 计算 a 运算符 b
   - 结果入栈
4. 最后栈中只剩一个数，就是结果

### 注意事项
- 除法要向零截断，使用 Math.trunc()
- 弹出顺序：先弹出的是第二个操作数（b），后弹出的是第一个操作数（a）

### 为什么叫"逆波兰"？
- 波兰表示法：运算符在操作数之前，如 + 1 2
- 逆波兰表示法：运算符在操作数之后，如 1 2 +
- 逆波兰表示法不需要括号，直接用栈就能计算

### 复杂度分析
- 时间复杂度：O(n)，遍历一次数组
- 空间复杂度：O(n)，栈存储操作数`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["simplify-path", "basic-calculator"],
    solutions: [
      {
        name: "栈求值（推荐）",
        code: `function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      let result;

      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          // 向零截断
          result = Math.trunc(a / b);
          break;
      }

      stack.push(result);
    } else {
      // 数字，入栈
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}`,
        explanation: `## 栈求值

### 思路
逆波兰表达式的特点是：运算符在操作数之后。

1. 遍历 tokens
2. 如果是数字，入栈
3. 如果是运算符：
   - 弹出两个数 b 和 a（注意顺序）
   - 计算 a 运算符 b
   - 结果入栈
4. 最后栈中只剩一个数，就是结果

### 注意事项
- 除法要向零截断，使用 Math.trunc()
- 弹出顺序：先弹出 b，后弹出 a`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "Map 映射运算符",
        code: `function evalRPN(tokens) {
  const stack = [];
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (const token of tokens) {
    if (ops[token]) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[token](a, b));
    } else {
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}`,
        explanation: `## Map 映射运算符

### 思路
使用 Map/对象存储运算符对应的操作函数，代码更简洁。

### 优点
- 代码更优雅
- 易于扩展新运算符

### 缺点
- 函数调用有微小开销`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "数组模拟栈",
        code: `function evalRPN(tokens) {
  const stack = new Array(tokens.length);
  let top = -1;

  for (const token of tokens) {
    if (token === '+') {
      const b = stack[top--];
      stack[top] = stack[top] + b;
    } else if (token === '-') {
      const b = stack[top--];
      stack[top] = stack[top] - b;
    } else if (token === '*') {
      const b = stack[top--];
      stack[top] = stack[top] * b;
    } else if (token === '/') {
      const b = stack[top--];
      stack[top] = Math.trunc(stack[top] / b);
    } else {
      stack[++top] = parseInt(token, 10);
    }
  }

  return stack[0];
}`,
        explanation: `## 数组模拟栈

### 思路
使用固定大小的数组和指针来模拟栈操作。

### 优点
- 避免了 push/pop 的函数调用开销
- 内存分配更高效（预分配）

### 缺点
- 代码可读性稍差`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 5. 基本计算器 (224)
  {
    id: "basic-calculator",
    leetcodeId: 224,
    title: "基本计算器",
    titleEn: "Basic Calculator",
    difficulty: "hard",
    category: "stack",
    tags: ["栈", "数学", "字符串"],
    description: `给你一个字符串表达式 \`s\`，请你实现一个基本计算器来计算并返回它的值。

注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 \`eval()\`。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "1 + 1"
输出：2
\`\`\`

**示例 2：**
\`\`\`
输入：s = " 2-1 + 2 "
输出：3
\`\`\`

**示例 3：**
\`\`\`
输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
\`\`\``,
    constraints: `- \`1 <= s.length <= 3 * 10^5\`
- \`s\` 由数字、\`'+'\`、\`'-'\`、\`'('\`、\`')'\`、和 \`' '\` 组成
- \`s\` 表示一个有效的表达式
- \`'+'\` 不能用作一元运算（例如，\`"+1"\` 和 \`"+(2 + 3)"\` 无效）
- \`'-'\` 可以用作一元运算（即 \`"-1"\` 和 \`"-(2 + 3)"\` 是有效的）
- 输入中不存在两个连续的操作符
- 每个数字和运行的计算将适合于一个有符号的 32 位整数`,
    initialCode: `function calculate(s) {
  // 在此处编写你的代码

}`,
    solution: `function calculate(s) {
  const stack = [];
  let result = 0;
  let number = 0;
  let sign = 1; // 1 表示正，-1 表示负

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      // 构建多位数
      number = number * 10 + (char.charCodeAt(0) - 48);
    } else if (char === '+') {
      result += sign * number;
      number = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * number;
      number = 0;
      sign = -1;
    } else if (char === '(') {
      // 保存当前结果和符号
      stack.push(result);
      stack.push(sign);
      // 重置
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * number;
      number = 0;
      // 恢复括号前的符号和结果
      result *= stack.pop(); // 符号
      result += stack.pop(); // 之前的结果
    }
    // 空格跳过
  }

  // 处理最后一个数
  result += sign * number;

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["1 + 1"], expected: 2 },
      { id: "2", name: "示例2", input: [" 2-1 + 2 "], expected: 3 },
      { id: "3", name: "带括号", input: ["(1+(4+5+2)-3)+(6+8)"], expected: 23 },
      { id: "4", name: "负号", input: ["- (3 + (4 + 5))"], expected: -12 },
    ],
    hints: [
      "使用栈处理括号",
      "遇到左括号，保存当前结果和符号入栈",
      "遇到右括号，计算括号内结果，与栈中保存的结果合并",
    ],
    explanation: `## 解题思路

### 栈 + 符号处理

1. 使用变量：
   - result: 当前结果
   - number: 当前正在构建的数字
   - sign: 当前符号（+1 或 -1）
   - stack: 保存遇到括号时的状态

2. 遍历字符串：
   - 数字：构建多位数
   - \`+\`：累加结果，重置，符号设为 +1
   - \`-\`：累加结果，重置，符号设为 -1
   - \`(\`：保存当前 result 和 sign 入栈，重置
   - \`)\`：累加结果，与栈中状态合并
   - 空格：跳过

3. 遍历结束后，处理最后一个数

### 括号处理的关键
- 遇到 \`(\` 时，保存"括号前的结果"和"括号的符号"
- 遇到 \`)\` 时，先计算括号内的结果
- 然后：括号内结果 × 括号符号 + 括号前结果

### 复杂度分析
- 时间复杂度：O(n)，遍历一次字符串
- 空间复杂度：O(n)，最坏情况栈深度为 n/2`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["evaluate-reverse-polish-notation", "valid-parentheses"],
    solutions: [
      {
        name: "栈 + 符号处理（推荐）",
        code: `function calculate(s) {
  const stack = [];
  let result = 0;
  let number = 0;
  let sign = 1; // 1 表示正，-1 表示负

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      // 构建多位数
      number = number * 10 + (char.charCodeAt(0) - 48);
    } else if (char === '+') {
      result += sign * number;
      number = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * number;
      number = 0;
      sign = -1;
    } else if (char === '(') {
      // 保存当前结果和符号
      stack.push(result);
      stack.push(sign);
      // 重置
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * number;
      number = 0;
      // 恢复括号前的符号和结果
      result *= stack.pop(); // 符号
      result += stack.pop(); // 之前的结果
    }
    // 空格跳过
  }

  // 处理最后一个数
  result += sign * number;

  return result;
}`,
        explanation: `## 栈 + 符号处理

### 思路
1. 使用变量：
   - result: 当前结果
   - number: 当前正在构建的数字
   - sign: 当前符号（+1 或 -1）
   - stack: 保存遇到括号时的状态

2. 遍历字符串：
   - 数字：构建多位数
   - \`+\`：累加结果，重置，符号设为 +1
   - \`-\`：累加结果，重置，符号设为 -1
   - \`(\`：保存当前 result 和 sign 入栈，重置
   - \`)\`：累加结果，与栈中状态合并

### 括号处理的关键
- 遇到 \`(\` 时，保存"括号前的结果"和"括号的符号"
- 遇到 \`)\` 时，括号内结果 × 括号符号 + 括号前结果`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归处理括号",
        code: `function calculate(s) {
  let i = 0;

  function helper() {
    let result = 0;
    let number = 0;
    let sign = 1;

    while (i < s.length) {
      const char = s[i];
      i++;

      if (char >= '0' && char <= '9') {
        number = number * 10 + parseInt(char);
      } else if (char === '+') {
        result += sign * number;
        number = 0;
        sign = 1;
      } else if (char === '-') {
        result += sign * number;
        number = 0;
        sign = -1;
      } else if (char === '(') {
        // 递归计算括号内的值
        number = helper();
      } else if (char === ')') {
        // 结束当前层级
        result += sign * number;
        return result;
      }
    }

    return result + sign * number;
  }

  return helper();
}`,
        explanation: `## 递归处理括号

### 思路
遇到左括号时递归调用，遇到右括号时返回结果。

### 优点
- 逻辑更直观，括号嵌套自然对应递归层级
- 不需要显式使用栈

### 缺点
- 递归有调用栈开销
- 深度嵌套可能栈溢出`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "双栈法",
        code: `function calculate(s) {
  const numStack = [];
  const opStack = [];
  let num = 0;
  let i = 0;

  const calc = () => {
    if (numStack.length < 2 || opStack.length === 0) return;
    const b = numStack.pop();
    const a = numStack.pop();
    const op = opStack.pop();
    numStack.push(op === '+' ? a + b : a - b);
  };

  // 处理可能的开头负号
  s = s.replace(/^\\s*-/, '0-').replace(/\\(-/g, '(0-');

  while (i < s.length) {
    const char = s[i];

    if (char === ' ') {
      i++;
      continue;
    }

    if (char >= '0' && char <= '9') {
      num = 0;
      while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        num = num * 10 + parseInt(s[i]);
        i++;
      }
      numStack.push(num);
    } else if (char === '(') {
      opStack.push(char);
      i++;
    } else if (char === ')') {
      while (opStack.length && opStack[opStack.length - 1] !== '(') {
        calc();
      }
      opStack.pop(); // 弹出 '('
      i++;
    } else {
      while (opStack.length && opStack[opStack.length - 1] !== '(') {
        calc();
      }
      opStack.push(char);
      i++;
    }
  }

  while (opStack.length) {
    calc();
  }

  return numStack[0] || 0;
}`,
        explanation: `## 双栈法

### 思路
使用两个栈：数字栈和运算符栈。

### 处理流程
1. 数字直接入数字栈
2. 左括号入运算符栈
3. 右括号：计算到左括号为止
4. 运算符：先计算栈中同级运算符，再入栈

### 特殊处理
- 开头或括号后的负号，补充 0 处理

### 优点
- 通用性强，可扩展支持乘除等运算符`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },
];
