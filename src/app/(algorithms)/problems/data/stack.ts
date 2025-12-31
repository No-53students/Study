import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

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
    frontendRelevance: "high",
    frontendNote: "栈的经典应用，括号匹配必考",
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
        code: `/**
 * 有效的括号 - 栈匹配法
 *
 * 核心思想：
 * 括号匹配遵循"后进先出"原则，这正是栈的特性
 * - 遇到左括号：入栈
 * - 遇到右括号：检查栈顶是否是对应的左括号
 *
 * 匹配规则：
 * ')' 对应 '('
 * ']' 对应 '['
 * '}' 对应 '{'
 *
 * 时间复杂度：O(n)，遍历一次字符串
 * 空间复杂度：O(n)，最坏情况栈存储 n/2 个左括号
 */
function isValid(s) {
  const stack = [];  // 存储左括号

  // 建立右括号到左括号的映射
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      // 左括号：入栈
      stack.push(char);
    } else {
      // 右括号：检查栈顶是否匹配
      // 栈为空或栈顶不匹配，返回 false
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  // 栈为空说明全部匹配成功
  return stack.length === 0;
}`,
        explanation: `## 栈匹配

### 核心思想
括号匹配遵循"后进先出"原则：最后出现的左括号，应该最先被匹配

### 执行示例
s = "([{}])"

| 步骤 | 字符 | 操作 | 栈状态 |
|------|------|------|--------|
| 1    | (    | 入栈 | [(] |
| 2    | [    | 入栈 | [(, [] |
| 3    | {    | 入栈 | [(, [, {] |
| 4    | }    | 匹配 { | [(, [] |
| 5    | ]    | 匹配 [ | [(] |
| 6    | )    | 匹配 ( | [] |
| 结束 | 栈为空，返回 true |

### 失败示例
s = "(]"

| 步骤 | 字符 | 操作 | 栈状态 |
|------|------|------|--------|
| 1    | (    | 入栈 | [(] |
| 2    | ]    | 栈顶是 (，不匹配 ]，返回 false |

### 为什么用栈？
\`\`\`
字符串：( [ { } ] )
           └─┘     最后的 { 最先被 } 匹配
         └─────┘   中间的 [ 被 ] 匹配
       └─────────┘ 最先的 ( 最后被 ) 匹配
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "有效的括号演示",
          steps: [
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 0,
              highlights: [],
              description: "s=\"([{}])\"。用栈存储左括号，遇到右括号时匹配",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "入栈" }],
              description: "遇到'('，入栈。栈：['(']",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "入栈" }],
              description: "遇到'['，入栈。栈：['(', '[']",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "入栈" }],
              description: "遇到'{'，入栈。栈：['(', '[', '{']",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [2], color: "yellow" as const, label: "{" },
                { indices: [3], color: "yellow" as const, label: "}" },
              ],
              description: "遇到'}'，栈顶是'{'，匹配成功！栈：['(', '[']",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "[" },
                { indices: [4], color: "yellow" as const, label: "]" },
              ],
              description: "遇到']'，栈顶是'['，匹配成功！栈：['(']",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0], color: "yellow" as const, label: "(" },
                { indices: [5], color: "yellow" as const, label: ")" },
              ],
              description: "遇到')'，栈顶是'('，匹配成功！栈：[]",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const }],
              description: "栈为空，所有括号匹配成功！返回 true ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "替换法（不推荐）",
        animation: {
          type: "two-pointers" as const,
          title: "替换法验证括号演示",
          steps: [
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 0,
              right: 5,
              highlights: [],
              description: "s=\"([{}])\"。不断删除成对括号直到字符串为空",
            },
            {
              array: ["(", "[", "{", "}", "]", ")"],
              left: 2,
              right: 3,
              highlights: [
                { indices: [2, 3], color: "red" as const, label: "删除{}" },
              ],
              description: "找到{}，删除。字符串变为\"([])\"",
            },
            {
              array: ["(", "[", "]", ")"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1, 2], color: "red" as const, label: "删除[]" },
              ],
              description: "找到[]，删除。字符串变为\"()\"",
            },
            {
              array: ["(", ")"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "red" as const, label: "删除()" },
              ],
              description: "找到()，删除。字符串变为\"\"",
            },
            {
              array: ["true"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "有效" },
              ],
              description: "字符串为空 ✓ 括号有效！注意：此法O(n²)不推荐实际使用",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 有效的括号 - 替换法
 *
 * 核心思想：
 * 不断删除成对的括号 "()"、"[]"、"{}"
 * 如果最终字符串为空，说明括号有效
 *
 * 注意：此方法时间复杂度为 O(n²)，效率较低
 * 仅用于理解问题，实际应用中不推荐
 *
 * 时间复杂度：O(n²)，最坏情况需要 n/2 轮替换
 * 空间复杂度：O(n)，字符串操作
 */
function isValid(s) {
  // 循环直到没有可替换的括号对
  while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
    s = s.replace('()', '').replace('[]', '').replace('{}', '');
  }

  // 字符串为空说明所有括号都被成功匹配
  return s.length === 0;
}`,
        explanation: `## 替换法

### 核心思想
不断删除成对的括号，最后如果字符串为空，说明有效

### 执行示例
s = "([{}])"

| 轮次 | 字符串 | 找到的括号对 |
|------|--------|-------------|
| 0    | ([{}]) | 找到 {} |
| 1    | ([])   | 找到 [] |
| 2    | ()     | 找到 () |
| 3    | ""     | 空，结束 |

返回 true

### 为什么不推荐？
- 每次 includes 和 replace 都是 O(n)
- 最多需要 n/2 轮替换
- 总时间复杂度 O(n²)

### 适用场景
- 面试时作为初始思路展示
- 理解问题的直观方法`,
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
    frontendRelevance: "medium",
    frontendNote: "路径简化，URL处理相关",
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
        code: `/**
 * 简化路径 - 栈模拟法
 *
 * 核心思想：
 * Unix 路径的目录层级天然符合栈的特性
 * - 进入子目录：入栈
 * - 返回上级目录（..）：出栈
 * - 当前目录（.）：不操作
 *
 * 处理规则：
 * 1. 多个连续斜杠 "//" 视为单个 "/"
 * 2. "." 表示当前目录，跳过
 * 3. ".." 表示上级目录，出栈（根目录除外）
 * 4. 其他有效目录名，入栈
 *
 * 时间复杂度：O(n)，n 是路径长度
 * 空间复杂度：O(n)，栈存储目录名
 */
function simplifyPath(path) {
  const stack = [];  // 存储有效的目录名

  // 按 '/' 分割路径，得到各个部分
  // 注意："/home//foo/" 分割后是 ["", "home", "", "foo", ""]
  const parts = path.split('/');

  for (const part of parts) {
    if (part === '' || part === '.') {
      // 空字符串（来自 "//" 或开头结尾的 "/"）
      // 或 "." 表示当前目录
      // 两种情况都跳过，不做任何操作
      continue;
    } else if (part === '..') {
      // ".." 表示上级目录
      // 如果栈非空，弹出栈顶（返回上级）
      // 如果栈为空（已在根目录），不操作
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // 有效的目录名（包括 "...", "a.b" 等）
      // 入栈
      stack.push(part);
    }
  }

  // 用 '/' 连接所有目录名，并在开头加上 '/'
  return '/' + stack.join('/');
}`,
        explanation: `## 栈模拟

### 核心思想
Unix 路径的目录层级天然符合栈的特性：进入子目录入栈，返回上级出栈

### 执行示例
path = "/home/user/Documents/../Pictures"

| 步骤 | 部分 | 操作 | 栈状态 |
|------|------|------|--------|
| 1    | ""   | 跳过 | [] |
| 2    | "home" | 入栈 | [home] |
| 3    | "user" | 入栈 | [home, user] |
| 4    | "Documents" | 入栈 | [home, user, Documents] |
| 5    | ".." | 出栈 | [home, user] |
| 6    | "Pictures" | 入栈 | [home, user, Pictures] |

结果："/home/user/Pictures"

### 边界情况
\`\`\`
路径 "/../" 处理：
1. "" → 跳过
2. ".." → 栈为空，不操作
3. "" → 跳过
结果：栈为空，返回 "/"
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "简化路径演示",
          steps: [
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 0,
              highlights: [],
              description: "path=\"/home/user/../docs\"。分割后处理每个部分",
            },
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "空" }],
              description: "部分=\"\"，空字符串跳过。栈：[]",
            },
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "入栈" }],
              description: "部分=\"home\"，有效目录名，入栈。栈：[home]",
            },
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "入栈" }],
              description: "部分=\"user\"，有效目录名，入栈。栈：[home, user]",
            },
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "red" as const, label: "出栈" }],
              description: "部分=\"..\"，返回上级，出栈。栈：[home]",
            },
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "入栈" }],
              description: "部分=\"docs\"，有效目录名，入栈。栈：[home, docs]",
            },
            {
              array: ["", "home", "user", "..", "docs"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [1], color: "green" as const },
                { indices: [4], color: "green" as const },
              ],
              description: "完成！结果：\"/\" + [home, docs].join(\"/\") = \"/home/docs\" ✓",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "正则表达式简化",
        animation: {
          type: "two-pointers" as const,
          title: "正则简化路径演示",
          steps: [
            {
              array: ["/", "home", "/", "/", "foo", "/"],
              left: 0,
              right: 5,
              highlights: [],
              description: "path=\"/home//foo/\"。用正则/\\/+/分割处理多斜杠",
            },
            {
              array: ["home", "foo"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "有效目录" },
              ],
              description: "split(/\\/+/).filter(Boolean) → [\"home\",\"foo\"]",
            },
            {
              array: ["stack:", "home", "foo"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1, 2], color: "green" as const, label: "入栈" },
              ],
              description: "遍历parts，home和foo都是有效目录名，入栈",
            },
            {
              array: ["/home/foo"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "结果" },
              ],
              description: "\"/\" + stack.join(\"/\") = \"/home/foo\" ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 简化路径 - 正则表达式法
 *
 * 核心思想：
 * 使用正则表达式 /\\/+/ 一次性处理多个连续斜杠
 * filter(Boolean) 过滤掉空字符串
 *
 * 优点：
 * - 代码更简洁
 * - 不需要单独处理空字符串
 *
 * 缺点：
 * - 正则表达式有一定性能开销
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function simplifyPath(path) {
  const stack = [];  // 存储有效目录名

  // 使用正则按一个或多个斜杠分割
  // /\\/+/ 匹配一个或多个 '/'
  // filter(Boolean) 过滤掉空字符串
  const parts = path.split(/\\/+/).filter(Boolean);

  for (const part of parts) {
    if (part === '.') {
      // 当前目录，跳过
      continue;
    } else if (part === '..') {
      // 上级目录，出栈（如果有的话）
      stack.pop();  // 空栈时 pop() 返回 undefined，不会报错
    } else {
      // 有效目录名，入栈
      stack.push(part);
    }
  }

  // 拼接结果
  return '/' + stack.join('/');
}`,
        explanation: `## 正则表达式简化

### 核心思想
使用正则表达式 \`/\\/+/\` 分割，可以一次性处理多个连续斜杠

### 正则解释
\`\`\`javascript
/\\/+/
// \\/ → 匹配斜杠字符 '/'
// +   → 匹配一个或多个
// 所以 /\\/+/ 匹配 "/", "//", "///" 等
\`\`\`

### 对比普通分割
\`\`\`javascript
"/home//foo/".split('/')
// ["", "home", "", "foo", ""]  ← 有空字符串

"/home//foo/".split(/\\/+/).filter(Boolean)
// ["home", "foo"]  ← 干净的结果
\`\`\`

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
    frontendRelevance: "high",
    frontendNote: "栈设计题",
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
        code: `/**
 * 最小栈 - 辅助栈法
 *
 * 核心思想：
 * 使用两个栈同步记录信息：
 * - 主栈：存储所有元素
 * - 辅助栈：存储每个状态下的最小值
 *
 * 关键点：
 * 1. push 时，如果新值 <= 辅助栈顶，新值也入辅助栈
 * 2. pop 时，如果弹出值 === 辅助栈顶，辅助栈也弹出
 * 3. 使用 <= 而非 < 处理重复最小值
 *
 * 时间复杂度：所有操作 O(1)
 * 空间复杂度：O(n)，辅助栈最多存储 n 个元素
 */
class MinStack {
  constructor() {
    this.stack = [];     // 主栈：存储所有元素
    this.minStack = [];  // 辅助栈：存储"当前最小值"的历史
  }

  /**
   * 将元素入栈
   * @param {number} val - 要入栈的值
   */
  push(val) {
    // 主栈正常入栈
    this.stack.push(val);

    // 辅助栈：只在必要时入栈
    // 条件：辅助栈为空 OR 新值 <= 当前最小值
    // 注意：使用 <= 而非 <，处理重复的最小值
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  /**
   * 弹出栈顶元素
   */
  pop() {
    const val = this.stack.pop();

    // 如果弹出的是当前最小值，辅助栈也要弹出
    // 这样辅助栈顶就变成了"新的最小值"
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  /**
   * 获取栈顶元素（不弹出）
   * @returns {number} 栈顶元素
   */
  top() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * 获取栈中最小元素
   * @returns {number} 最小元素
   */
  getMin() {
    // 辅助栈顶就是当前的最小值
    return this.minStack[this.minStack.length - 1];
  }
}`,
        explanation: `## 辅助栈

### 核心思想
使用两个栈：
1. 主栈：正常存储所有元素
2. 辅助栈：存储"当前最小值"的历史

### 执行示例
操作序列：push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()

| 操作 | 主栈 | 辅助栈 | 返回值 |
|------|------|--------|--------|
| push(-2) | [-2] | [-2] | - |
| push(0) | [-2, 0] | [-2] | - |
| push(-3) | [-2, 0, -3] | [-2, -3] | - |
| getMin() | [-2, 0, -3] | [-2, -3] | -3 |
| pop() | [-2, 0] | [-2] | - |
| top() | [-2, 0] | [-2] | 0 |
| getMin() | [-2, 0] | [-2] | -2 |

### 为什么用 <= 而不是 <？
\`\`\`
如果 push 两次 -2：
使用 <：辅助栈 = [-2]，第一次 pop 后辅助栈空了，错误！
使用 <=：辅助栈 = [-2, -2]，第一次 pop 后仍有 -2，正确！
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "最小栈演示",
          steps: [
            {
              array: [-2, 0, -3],
              left: 0,
              right: 0,
              highlights: [],
              description: "操作序列：push(-2), push(0), push(-3), getMin, pop, getMin",
            },
            {
              array: [-2, 0, -3],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "push" }],
              description: "push(-2)：主栈=[-2]，-2<=空，辅助栈=[-2]",
            },
            {
              array: [-2, 0, -3],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "push" }],
              description: "push(0)：主栈=[-2,0]，0>-2不入辅助栈，辅助栈=[-2]",
            },
            {
              array: [-2, 0, -3],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "push" }],
              description: "push(-3)：主栈=[-2,0,-3]，-3<=-2，辅助栈=[-2,-3]",
            },
            {
              array: [-2, 0, -3],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "min=-3" }],
              description: "getMin()：返回辅助栈顶 -3 ✓",
            },
            {
              array: [-2, 0, -3],
              left: 0,
              right: 1,
              highlights: [{ indices: [2], color: "red" as const, label: "pop" }],
              description: "pop()：弹出-3，-3==辅助栈顶，辅助栈也弹出。辅助栈=[-2]",
            },
            {
              array: [-2, 0, -3],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "yellow" as const, label: "min=-2" }],
              description: "getMin()：返回辅助栈顶 -2 ✓ 完成！",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
      },
      {
        name: "存储差值",
        animation: {
          type: "two-pointers" as const,
          title: "差值存储法最小栈演示",
          steps: [
            {
              array: ["stack", "min"],
              left: 0,
              right: 1,
              highlights: [],
              description: "差值法：栈中存储(当前值-最小值)，维护min变量",
            },
            {
              array: ["diff=0", "min=-2"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "green" as const, label: "push(-2)" },
              ],
              description: "push(-2)：首元素差值=0，min=-2",
            },
            {
              array: ["0", "2", "min=-2"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [1], color: "blue" as const, label: "0-(-2)=2" },
              ],
              description: "push(0)：diff=0-(-2)=2>0，min不变=-2",
            },
            {
              array: ["0", "2", "-1", "min=-3"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [2], color: "yellow" as const, label: "-3-(-2)=-1" },
              ],
              description: "push(-3)：diff=-3-(-2)=-1<0，min更新为-3",
            },
            {
              array: ["0", "2", "min=-2"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [2], color: "red" as const, label: "恢复min" },
              ],
              description: "pop()：diff=-1<0，恢复min=(-3)-(-1)=-2 ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 最小栈 - 差值存储法
 *
 * 核心思想：
 * 不直接存储原值，而是存储"当前值与最小值的差值"
 * - 差值 = 当前值 - 当前最小值
 * - 如果差值 < 0，说明当前值成为新的最小值
 *
 * 优点：不需要辅助栈
 * 缺点：可能有整数溢出风险，逻辑较复杂
 *
 * 时间复杂度：所有操作 O(1)
 * 空间复杂度：O(n)
 */
class MinStack {
  constructor() {
    this.stack = [];    // 存储差值
    this.min = null;    // 当前最小值
  }

  push(val) {
    if (this.stack.length === 0) {
      // 第一个元素：差值为 0，最小值就是它自己
      this.stack.push(0);
      this.min = val;
    } else {
      // 存储差值：当前值 - 当前最小值
      this.stack.push(val - this.min);
      // 如果新值更小，更新最小值
      if (val < this.min) {
        this.min = val;
      }
    }
  }

  pop() {
    const diff = this.stack.pop();

    if (diff < 0) {
      // 差值 < 0 说明弹出的是最小值
      // 需要恢复之前的最小值
      // 之前的最小值 = 当前最小值 - 差值
      this.min = this.min - diff;
    }

    // 如果栈空了，重置最小值
    if (this.stack.length === 0) {
      this.min = null;
    }
  }

  top() {
    const diff = this.stack[this.stack.length - 1];

    if (diff < 0) {
      // 差值 < 0，说明栈顶就是最小值
      return this.min;
    }
    // 否则，原值 = 差值 + 最小值
    return this.min + diff;
  }

  getMin() {
    return this.min;
  }
}`,
        explanation: `## 存储差值

### 核心思想
不存储原值，存储与最小值的差值

### 差值含义
\`\`\`
diff = 当前值 - 当前最小值
- diff >= 0：当前值 >= 最小值，原值 = diff + min
- diff < 0：当前值 < 最小值，当前值就是新的 min
\`\`\`

### 恢复之前最小值
当弹出最小值时（diff < 0）：
\`\`\`
之前的 min = 当前 min - diff
\`\`\`

### 优点
- 不需要辅助栈，空间更优

### 缺点
- 可能有整数溢出风险（大数场景）
- 逻辑较复杂，不易理解`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
      },
      {
        name: "存储元组",
        animation: {
          type: "two-pointers" as const,
          title: "元组存储法最小栈演示",
          steps: [
            {
              array: ["stack"],
              left: 0,
              right: 0,
              highlights: [],
              description: "元组法：每个元素存[value, currentMin]",
            },
            {
              array: ["[-2,-2]"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "push(-2)" },
              ],
              description: "push(-2)：首元素，stack=[[-2,-2]]",
            },
            {
              array: ["[-2,-2]", "[0,-2]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "blue" as const, label: "min(-2,0)" },
              ],
              description: "push(0)：min(0,-2)=-2，stack=[[-2,-2],[0,-2]]",
            },
            {
              array: ["[-2,-2]", "[0,-2]", "[-3,-3]"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [2], color: "yellow" as const, label: "新min=-3" },
              ],
              description: "push(-3)：min(-3,-2)=-3，stack=[[-2,-2],[0,-2],[-3,-3]]",
            },
            {
              array: ["[-2,-2]", "[0,-2]"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [1], color: "green" as const, label: "getMin=-2" },
              ],
              description: "pop()后getMin()：返回栈顶[0,-2]的第二个值=-2 ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 最小栈 - 元组存储法
 *
 * 核心思想：
 * 每个栈元素存储一个元组 [value, currentMin]：
 * - value: 实际的值
 * - currentMin: 该元素入栈时的最小值
 *
 * 优点：
 * - 实现简单，逻辑清晰
 * - 不需要单独的辅助栈
 *
 * 缺点：
 * - 每个元素都存储了最小值，空间略有浪费
 *
 * 时间复杂度：所有操作 O(1)
 * 空间复杂度：O(n)
 */
class MinStack {
  constructor() {
    this.stack = [];  // 每个元素是 [value, currentMin]
  }

  push(val) {
    if (this.stack.length === 0) {
      // 第一个元素，最小值就是它自己
      this.stack.push([val, val]);
    } else {
      // 计算新的最小值：取当前值和已有最小值的较小者
      const currentMin = Math.min(val, this.stack[this.stack.length - 1][1]);
      this.stack.push([val, currentMin]);
    }
  }

  pop() {
    // 直接弹出，不需要特殊处理
    // 因为每个元素都记录了它入栈时的最小值
    this.stack.pop();
  }

  top() {
    // 返回元组的第一个元素（实际值）
    return this.stack[this.stack.length - 1][0];
  }

  getMin() {
    // 返回元组的第二个元素（当前最小值）
    return this.stack[this.stack.length - 1][1];
  }
}`,
        explanation: `## 存储元组

### 核心思想
每个栈元素存储一个元组 [value, currentMin]

### 执行示例
push(-2), push(0), push(-3)

| 操作 | 栈状态 |
|------|--------|
| push(-2) | [[-2, -2]] |
| push(0) | [[-2, -2], [0, -2]] |
| push(-3) | [[-2, -2], [0, -2], [-3, -3]] |
| pop() | [[-2, -2], [0, -2]] |
| getMin() | -2（取栈顶元组的第二个值）|

### 优点
- 实现简单，逻辑清晰
- 不需要额外的辅助栈结构

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
    frontendRelevance: "high",
    frontendNote: "栈的应用",
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
        code: `/**
 * 逆波兰表达式求值 - 栈方法
 *
 * 核心思想：
 * 逆波兰表达式（后缀表达式）的特点是：运算符在操作数之后
 * 例如：中缀 "1 + 2" → 后缀 "1 2 +"
 *
 * 计算规则：
 * 1. 遇到数字：入栈
 * 2. 遇到运算符：弹出两个数进行运算，结果入栈
 * 3. 最后栈中剩余一个数，即为结果
 *
 * 注意事项：
 * - 弹出顺序：先弹出的是第二个操作数（b），后弹出的是第一个（a）
 * - 除法向零截断：使用 Math.trunc()
 *
 * 时间复杂度：O(n)，遍历一次数组
 * 空间复杂度：O(n)，栈存储操作数
 */
function evalRPN(tokens) {
  const stack = [];  // 操作数栈

  for (const token of tokens) {
    // 判断是否是运算符
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      // 弹出两个操作数
      // 注意顺序：先弹出的是第二个操作数
      const b = stack.pop();  // 第二个操作数
      const a = stack.pop();  // 第一个操作数
      let result;

      // 根据运算符计算结果
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
          // 除法向零截断
          // Math.trunc() 直接截断小数部分
          // 例如：6/4=1.5 → 1，-6/4=-1.5 → -1
          result = Math.trunc(a / b);
          break;
      }

      // 计算结果入栈
      stack.push(result);
    } else {
      // 是数字，转换后入栈
      stack.push(parseInt(token, 10));
    }
  }

  // 最后栈中只剩一个数，就是最终结果
  return stack[0];
}`,
        explanation: `## 栈求值

### 核心思想
逆波兰表达式的特点是：运算符在操作数之后

### 执行示例
tokens = ["2", "1", "+", "3", "*"]

| 步骤 | token | 操作 | 栈状态 | 说明 |
|------|-------|------|--------|------|
| 1    | "2"   | 入栈 | [2] | 数字入栈 |
| 2    | "1"   | 入栈 | [2, 1] | 数字入栈 |
| 3    | "+"   | 计算 | [3] | 2 + 1 = 3 |
| 4    | "3"   | 入栈 | [3, 3] | 数字入栈 |
| 5    | "*"   | 计算 | [9] | 3 * 3 = 9 |

结果：9

### 为什么叫"逆波兰"？
\`\`\`
波兰表示法（前缀）：+ 1 2（运算符在前）
逆波兰表示法（后缀）：1 2 +（运算符在后）
中缀表示法：1 + 2（运算符在中间）
\`\`\`

### 注意事项
- 弹出顺序：先弹出 b，后弹出 a
- 除法要向零截断，使用 Math.trunc()`,
        animation: {
          type: "two-pointers" as const,
          title: "逆波兰表达式求值演示",
          steps: [
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 0,
              highlights: [],
              description: "tokens=[\"2\",\"1\",\"+\",\"3\",\"*\"]。数字入栈，运算符弹两数计算",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "入栈" }],
              description: "token=\"2\"，数字入栈。栈：[2]",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "入栈" }],
              description: "token=\"1\"，数字入栈。栈：[2, 1]",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "yellow" as const, label: "+" }],
              description: "token=\"+\"，弹出1和2，计算2+1=3，入栈。栈：[3]",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "入栈" }],
              description: "token=\"3\"，数字入栈。栈：[3, 3]",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 4,
              highlights: [{ indices: [4], color: "yellow" as const, label: "*" }],
              description: "token=\"*\"，弹出3和3，计算3*3=9，入栈。栈：[9]",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const }],
              description: "完成！栈中唯一元素9就是结果 ✓ 即(2+1)*3=9",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "Map 映射运算符",
        animation: {
          type: "two-pointers" as const,
          title: "Map映射法求逆波兰表达式演示",
          steps: [
            {
              array: ["ops", "+:add", "-:sub", "*:mul", "/:div"],
              left: 0,
              right: 4,
              highlights: [],
              description: "用Map存储运算符函数：ops={+:(a,b)=>a+b, ...}",
            },
            {
              array: ["4", "13", "5", "/", "+"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "入栈" },
              ],
              description: "\"4\",\"13\"入栈。栈：[4,13]",
            },
            {
              array: ["4", "13", "5", "/", "+"],
              left: 2,
              right: 2,
              highlights: [
                { indices: [2], color: "green" as const, label: "入栈" },
              ],
              description: "\"5\"入栈。栈：[4,13,5]",
            },
            {
              array: ["4", "13", "5", "/", "+"],
              left: 3,
              right: 3,
              highlights: [
                { indices: [3], color: "yellow" as const, label: "ops['/'](13,5)" },
              ],
              description: "\"/\"：ops['/'](13,5)=Math.trunc(13/5)=2。栈：[4,2]",
            },
            {
              array: ["4", "13", "5", "/", "+"],
              left: 4,
              right: 4,
              highlights: [
                { indices: [4], color: "yellow" as const, label: "ops['+'](4,2)" },
              ],
              description: "\"+\"：ops['+'](4,2)=6。结果=6 ✓ Map法代码更优雅可扩展",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 逆波兰表达式求值 - Map 映射法
 *
 * 核心思想：
 * 使用 Map/对象存储运算符对应的操作函数
 * 代码更简洁优雅，易于扩展新运算符
 *
 * 优点：
 * - 代码更优雅，可读性好
 * - 易于扩展新运算符（如 % 取模、^ 幂等）
 *
 * 缺点：
 * - 函数调用有微小开销
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function evalRPN(tokens) {
  const stack = [];

  // 运算符映射表：运算符 → 对应的计算函数
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),  // 向零截断
  };

  for (const token of tokens) {
    if (ops[token]) {
      // 是运算符：弹出两个数，调用对应函数计算
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[token](a, b));
    } else {
      // 是数字：入栈
      stack.push(parseInt(token, 10));
    }
  }

  return stack[0];
}`,
        explanation: `## Map 映射运算符

### 核心思想
使用 Map/对象存储运算符对应的操作函数，代码更简洁

### 运算符映射
\`\`\`javascript
const ops = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => Math.trunc(a / b),
};
\`\`\`

### 扩展性
如果需要支持更多运算符，只需要添加到映射表：
\`\`\`javascript
const ops = {
  // ... 原有运算符
  '%': (a, b) => a % b,           // 取模
  '**': (a, b) => Math.pow(a, b), // 幂运算
};
\`\`\`

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
        animation: {
          type: "two-pointers" as const,
          title: "数组模拟栈求逆波兰演示",
          steps: [
            {
              array: ["stack[n]", "top=-1"],
              left: 0,
              right: 1,
              highlights: [],
              description: "预分配数组，用top指针模拟栈。避免push/pop开销",
            },
            {
              array: ["2", "1", "+", "3", "*"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "++top赋值" },
              ],
              description: "数字\"2\",\"1\"：stack[++top]=val。top=1",
            },
            {
              array: ["stack", 2, 1],
              left: 1,
              right: 2,
              highlights: [
                { indices: [2], color: "yellow" as const, label: "top--取值" },
              ],
              description: "\"+\"：b=stack[top--]=1，stack[top]+=b → stack[0]=3",
            },
            {
              array: ["stack", 3, 3],
              left: 1,
              right: 2,
              highlights: [
                { indices: [2], color: "green" as const, label: "++top" },
              ],
              description: "数字\"3\"：stack[++top]=3。top=1",
            },
            {
              array: ["stack", 9],
              left: 1,
              right: 1,
              highlights: [
                { indices: [1], color: "green" as const, label: "结果" },
              ],
              description: "\"*\"：b=stack[top--]=3，stack[0]*=b=9 ✓ 数组模拟更高效",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 逆波兰表达式求值 - 数组模拟栈（性能优化版）
 *
 * 核心思想：
 * 使用固定大小的数组和指针来模拟栈操作
 * 避免 push/pop 的函数调用开销
 *
 * 优化点：
 * 1. 预分配数组空间，避免动态扩容
 * 2. 使用下标操作代替 push/pop
 * 3. 直接在栈顶位置计算，减少操作
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function evalRPN(tokens) {
  // 预分配数组（最多需要 tokens.length 个位置）
  const stack = new Array(tokens.length);
  let top = -1;  // 栈顶指针，-1 表示空栈

  for (const token of tokens) {
    if (token === '+') {
      // 弹出一个数（top--）
      // 将结果存到新栈顶（stack[top]）
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
      // 数字入栈：先移动指针，再赋值
      stack[++top] = parseInt(token, 10);
    }
  }

  return stack[0];
}`,
        explanation: `## 数组模拟栈

### 核心思想
使用固定大小的数组和指针来模拟栈操作

### 指针操作
\`\`\`javascript
// 入栈
stack[++top] = value;  // 先移动指针，再赋值

// 出栈
value = stack[top--];  // 先取值，再移动指针

// 查看栈顶
value = stack[top];
\`\`\`

### 优化技巧
计算时直接在栈顶位置操作：
\`\`\`javascript
// 传统写法（3步）
const b = stack.pop();
const a = stack.pop();
stack.push(a + b);

// 优化写法（2步）
const b = stack[top--];
stack[top] = stack[top] + b;
\`\`\`

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
    frontendRelevance: "medium",
    frontendNote: "表达式计算",
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
        code: `/**
 * 基本计算器 - 栈 + 符号处理法
 *
 * 核心思想：
 * 1. 用栈处理括号嵌套
 * 2. 用 sign 变量跟踪当前符号状态
 * 3. 遇到括号时保存/恢复状态
 *
 * 变量说明：
 * - result: 当前括号层级内的累计结果
 * - number: 当前正在构建的数字
 * - sign: 当前符号（+1 或 -1）
 * - stack: 保存遇到左括号时的状态
 *
 * 时间复杂度：O(n)，遍历一次字符串
 * 空间复杂度：O(n)，最坏情况栈深度为 n/2
 */
function calculate(s) {
  const stack = [];  // 保存括号前的状态
  let result = 0;    // 当前结果
  let number = 0;    // 当前数字
  let sign = 1;      // 当前符号：1 表示正，-1 表示负

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      // 数字字符：构建多位数
      // number * 10 实现左移，加上新数字
      // 使用 charCodeAt - 48 将字符转数字（'0' 的 ASCII 码是 48）
      number = number * 10 + (char.charCodeAt(0) - 48);
    } else if (char === '+') {
      // 加号：累加之前的数字，重置，符号设为正
      result += sign * number;
      number = 0;
      sign = 1;
    } else if (char === '-') {
      // 减号：累加之前的数字，重置，符号设为负
      result += sign * number;
      number = 0;
      sign = -1;
    } else if (char === '(') {
      // 左括号：保存当前状态入栈，然后重置
      // 栈中保存：[当前结果, 当前符号]
      stack.push(result);
      stack.push(sign);
      // 重置，开始计算括号内的表达式
      result = 0;
      sign = 1;
    } else if (char === ')') {
      // 右括号：先累加括号内最后一个数
      result += sign * number;
      number = 0;
      // 恢复括号前的状态并合并
      // result = 括号内结果 × 括号符号 + 括号前结果
      result *= stack.pop();  // 括号的符号
      result += stack.pop();  // 括号前的结果
    }
    // 空格字符直接跳过
  }

  // 处理最后一个数字（可能没有被后续运算符触发累加）
  result += sign * number;

  return result;
}`,
        explanation: `## 栈 + 符号处理

### 核心思想
用栈处理括号嵌套，遇到左括号保存状态，遇到右括号恢复状态

### 执行示例
s = "(1+(4+5+2)-3)+(6+8)"

| 步骤 | 字符 | result | sign | stack | number | 说明 |
|------|------|--------|------|-------|--------|------|
| 1    | (    | 0 | 1 | [0, 1] | 0 | 保存状态，重置 |
| 2    | 1    | 0 | 1 | [0, 1] | 1 | 构建数字 |
| 3    | +    | 1 | 1 | [0, 1] | 0 | 累加，符号+ |
| 4    | (    | 0 | 1 | [0, 1, 1, 1] | 0 | 保存状态 |
| 5    | 4+5+2 | 11 | 1 | [0, 1, 1, 1] | 0 | 计算内层 |
| 6    | )    | 12 | 1 | [0, 1] | 0 | 合并：11×1+1 |
| 7    | -    | 12 | -1 | [0, 1] | 0 | 符号- |
| 8    | 3    | 12 | -1 | [0, 1] | 3 | 构建数字 |
| 9    | )    | 9 | 1 | [] | 0 | 合并：(12-3)×1+0 |
| ...继续处理 |

### 括号处理关键
\`\`\`
遇到 '('：保存 [result, sign]，重置
遇到 ')'：result = 括号内结果 × 符号 + 括号前结果
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "基本计算器演示",
          steps: [
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [],
              description: "s=\"(1+(4+5)-3)\"。使用栈保存括号前的结果和符号",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "(" }],
              description: "遇到'('，保存当前result=0和sign=1入栈，重置。栈=[0,1]",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [1], color: "green" as const, label: "num" }],
              description: "遇到'1'，number=1",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [2], color: "yellow" as const, label: "+" }],
              description: "遇到'+'，result=0+1×1=1，sign=1。栈=[0,1]",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [3], color: "blue" as const, label: "(" }],
              description: "遇到'('，保存result=1和sign=1入栈。栈=[0,1,1,1]，重置result=0",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [4, 5, 6], color: "green" as const, label: "4+5" }],
              description: "处理4+5：result=4，遇'+'累加，result=4+5=9",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [7], color: "red" as const, label: ")" }],
              description: "遇到')'，result=9。弹出sign=1和prev=1，result=9×1+1=10",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [8, 9], color: "yellow" as const, label: "-3" }],
              description: "遇到'-'，sign=-1。遇'3'，number=3",
            },
            {
              array: ["(", "1", "+", "(", "4", "+", "5", ")", "-", "3", ")"],
              left: 0,
              right: 0,
              highlights: [{ indices: [10], color: "red" as const, label: ")" }],
              description: "遇到')'，result=10+(-1)×3=7。弹出sign=1和prev=0，result=7×1+0=7",
            },
            {
              array: ["7"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "计算完成！(1+(4+5)-3) = 7",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归处理括号",
        animation: {
          type: "two-pointers" as const,
          title: "递归法计算器演示",
          steps: [
            {
              array: ["(", "1", "+", "2", ")", "*", "3"],
              left: 0,
              right: 6,
              highlights: [],
              description: "s=\"(1+2)*3\"。递归处理括号，遇到(递归，遇到)返回",
            },
            {
              array: ["(", "1", "+", "2", ")"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0], color: "blue" as const, label: "递归" },
              ],
              description: "遇到'('，递归进入子表达式处理",
            },
            {
              array: ["1", "+", "2"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "yellow" as const, label: "1+2=3" },
              ],
              description: "子表达式：1+2=3",
            },
            {
              array: ["(", "1", "+", "2", ")"],
              left: 4,
              right: 4,
              highlights: [
                { indices: [4], color: "red" as const, label: "返回3" },
              ],
              description: "遇到')'，返回子表达式结果3",
            },
            {
              array: ["3", "*", "3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "3*3=9" },
              ],
              description: "继续处理：3*3=9 ✓ 递归法逻辑清晰但有调用栈开销",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 基本计算器 - 递归法
 *
 * 核心思想：
 * 将括号嵌套自然映射到递归调用
 * - 遇到左括号：递归调用，计算括号内的值
 * - 遇到右括号：返回当前结果，结束递归
 *
 * 优点：
 * - 逻辑更直观，括号嵌套对应递归层级
 * - 不需要显式使用栈
 *
 * 缺点：
 * - 递归有调用栈开销
 * - 深度嵌套可能栈溢出
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，递归栈深度
 */
function calculate(s) {
  let i = 0;  // 全局索引，递归间共享

  // 递归辅助函数
  function helper() {
    let result = 0;
    let number = 0;
    let sign = 1;

    while (i < s.length) {
      const char = s[i];
      i++;  // 先移动指针

      if (char >= '0' && char <= '9') {
        // 构建多位数
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
        // 递归返回的值作为当前的 number
        number = helper();
      } else if (char === ')') {
        // 遇到右括号，结束当前层级的计算
        result += sign * number;
        return result;
      }
      // 空格跳过
    }

    // 处理最后一个数字
    return result + sign * number;
  }

  return helper();
}`,
        explanation: `## 递归处理括号

### 核心思想
遇到左括号时递归调用，遇到右括号时返回结果

### 递归结构
\`\`\`
calculate("1+(2+(3+4))")
  └─ helper()               → 计算 "1+(...)"
       └─ helper()          → 计算 "2+(...)"
            └─ helper()     → 计算 "3+4" = 7
       ← 返回 9              ← 2 + 7 = 9
  ← 返回 10                  ← 1 + 9 = 10
\`\`\`

### 关键点
1. 全局索引 i 在递归间共享
2. 遇到 '(' 时递归，返回值作为 number
3. 遇到 ')' 时 return，结束当前层级

### 优点
- 代码结构清晰，符合嵌套的直觉
- 不需要显式使用栈

### 缺点
- 递归有调用栈开销
- 深度嵌套可能栈溢出`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "双栈法",
        code: `/**
 * 基本计算器 - 双栈法
 *
 * 核心思想：
 * 使用两个栈分别存储数字和运算符
 * 这是一种通用的表达式求值方法，可扩展支持乘除
 *
 * 栈说明：
 * - numStack: 数字栈，存储操作数
 * - opStack: 运算符栈，存储运算符和括号
 *
 * 特殊处理：
 * - 开头或括号后的负号，补充 0 处理
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function calculate(s) {
  const numStack = [];  // 数字栈
  const opStack = [];   // 运算符栈
  let num = 0;
  let i = 0;

  // 计算函数：弹出两个数和一个运算符，计算并入栈
  const calc = () => {
    if (numStack.length < 2 || opStack.length === 0) return;
    const b = numStack.pop();
    const a = numStack.pop();
    const op = opStack.pop();
    numStack.push(op === '+' ? a + b : a - b);
  };

  // 预处理：处理开头的负号和括号后的负号
  // "-(1+2)" → "0-(1+2)"
  // "-1+2" → "0-1+2"
  s = s.replace(/^\\s*-/, '0-').replace(/\\(-/g, '(0-');

  while (i < s.length) {
    const char = s[i];

    if (char === ' ') {
      // 跳过空格
      i++;
      continue;
    }

    if (char >= '0' && char <= '9') {
      // 读取完整的多位数
      num = 0;
      while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        num = num * 10 + parseInt(s[i]);
        i++;
      }
      numStack.push(num);
    } else if (char === '(') {
      // 左括号入运算符栈
      opStack.push(char);
      i++;
    } else if (char === ')') {
      // 计算括号内所有运算
      while (opStack.length && opStack[opStack.length - 1] !== '(') {
        calc();
      }
      opStack.pop();  // 弹出 '('
      i++;
    } else {
      // 运算符：先计算栈中同级运算符
      while (opStack.length && opStack[opStack.length - 1] !== '(') {
        calc();
      }
      opStack.push(char);
      i++;
    }
  }

  // 处理剩余运算
  while (opStack.length) {
    calc();
  }

  return numStack[0] || 0;
}`,
        explanation: `## 双栈法

### 核心思想
使用两个栈：数字栈和运算符栈

### 处理流程
1. 数字直接入数字栈
2. 左括号入运算符栈
3. 右括号：计算到左括号为止
4. 运算符：先计算栈中同级运算符，再入栈

### 特殊处理
开头或括号后的负号，补充 0：
\`\`\`
"-1+2" → "0-1+2"
"-(1+2)" → "0-(1+2)"
\`\`\`

### 通用性
这种方法可以扩展支持乘除等运算符：
\`\`\`javascript
// 添加优先级判断
const priority = { '+': 1, '-': 1, '*': 2, '/': 2 };

// 在入栈前比较优先级
while (priority[opStack.top()] >= priority[char]) {
  calc();
}
\`\`\``,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 6. 字符串解码 (394)
  {
    id: "decode-string",
    leetcodeId: 394,
    title: "字符串解码",
    titleEn: "Decode String",
    difficulty: "medium",
    category: "stack",
    tags: ["栈", "递归", "字符串"],
    frontendRelevance: "high",
    frontendNote: "栈处理嵌套结构，模板渲染相关",
    description: `给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "3[a]2[bc]"
输出："aaabcbc"
\`\`\`

**示例 2：**
\`\`\`
输入：s = "3[a2[c]]"
输出："accaccacc"
\`\`\`

**示例 3：**
\`\`\`
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"
\`\`\``,
    constraints: `- \`1 <= s.length <= 30\`
- \`s\` 由小写英文字母、数字和方括号 \`'[]'\` 组成
- \`s\` 保证是一个 有效 的输入
- \`s\` 中所有整数的取值范围为 \`[1, 300]\``,
    initialCode: `function decodeString(s) {
  // 在此处编写代码
}`,
    solution: `function decodeString(s) {
  const numStack = [];
  const strStack = [];
  let currentStr = '';
  let currentNum = 0;

  for (const char of s) {
    if (char >= '0' && char <= '9') {
      currentNum = currentNum * 10 + parseInt(char);
    } else if (char === '[') {
      numStack.push(currentNum);
      strStack.push(currentStr);
      currentNum = 0;
      currentStr = '';
    } else if (char === ']') {
      const num = numStack.pop();
      const prevStr = strStack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
}`,
    testCases: [
      { id: "1", name: "示例1", input: ["3[a]2[bc]"], expected: "aaabcbc" },
      { id: "2", name: "嵌套", input: ["3[a2[c]]"], expected: "accaccacc" },
      { id: "3", name: "混合", input: ["2[abc]3[cd]ef"], expected: "abcabccdcdcdef" },
    ],
    hints: [
      "使用两个栈，一个存储数字，一个存储字符串",
      "遇到 '[' 时，将当前数字和字符串入栈",
      "遇到 ']' 时，弹出栈顶进行组合",
    ],
    explanation: `## 解题思路

### 双栈法

使用两个栈：
1. 数字栈：存储重复次数
2. 字符串栈：存储之前的字符串

### 处理流程

1. 遇到数字：累加到 currentNum
2. 遇到 '['：将 currentNum 和 currentStr 入栈，重置
3. 遇到 ']'：弹出栈，组合字符串
4. 遇到字母：追加到 currentStr

### 核心操作

当遇到 ']' 时：
\`\`\`
currentStr = prevStr + currentStr.repeat(num)
\`\`\`

### 复杂度分析
- 时间复杂度：O(解码后字符串长度)
- 空间复杂度：O(嵌套层数)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["number-of-atoms", "brace-expansion"],
    solutions: [
      {
        name: "双栈法（推荐）",
        code: `/**
 * 字符串解码 - 双栈法
 *
 * 核心思想：
 * 使用两个栈处理嵌套的编码结构：
 * - numStack: 存储重复次数
 * - strStack: 存储之前的字符串
 *
 * 处理规则：
 * 1. 数字：累加到 currentNum（处理多位数）
 * 2. '[': 保存当前状态入栈，重置
 * 3. ']': 弹出栈，组合字符串
 * 4. 字母：追加到 currentStr
 *
 * 时间复杂度：O(解码后字符串长度)
 * 空间复杂度：O(嵌套层数)
 */
function decodeString(s) {
  const numStack = [];  // 存储重复次数
  const strStack = [];  // 存储括号前的字符串
  let currentStr = '';  // 当前正在构建的字符串
  let currentNum = 0;   // 当前正在构建的数字

  for (const char of s) {
    if (char >= '0' && char <= '9') {
      // 数字字符：构建多位数
      // 例如 "123" → 1 → 12 → 123
      currentNum = currentNum * 10 + parseInt(char);
    } else if (char === '[') {
      // 遇到左括号：保存当前状态，开始新的一层
      // 保存重复次数和之前的字符串
      numStack.push(currentNum);
      strStack.push(currentStr);
      // 重置，开始构建括号内的字符串
      currentNum = 0;
      currentStr = '';
    } else if (char === ']') {
      // 遇到右括号：结束当前层，组合字符串
      const num = numStack.pop();      // 取出重复次数
      const prevStr = strStack.pop();  // 取出括号前的字符串
      // 组合：括号前字符串 + 当前字符串重复 num 次
      currentStr = prevStr + currentStr.repeat(num);
    } else {
      // 字母字符：追加到当前字符串
      currentStr += char;
    }
  }

  return currentStr;
}`,
        explanation: `## 双栈法

### 核心思想
用两个栈分别存储数字和字符串，处理嵌套结构

### 执行示例
s = "3[a2[c]]"

| 步骤 | 字符 | numStack | strStack | currentNum | currentStr |
|------|------|----------|----------|------------|------------|
| 1    | 3    | [] | [] | 3 | "" |
| 2    | [    | [3] | [""] | 0 | "" |
| 3    | a    | [3] | [""] | 0 | "a" |
| 4    | 2    | [3] | [""] | 2 | "a" |
| 5    | [    | [3,2] | ["","a"] | 0 | "" |
| 6    | c    | [3,2] | ["","a"] | 0 | "c" |
| 7    | ]    | [3] | [""] | 0 | "acc" |
| 8    | ]    | [] | [] | 0 | "accaccacc" |

### 关键操作
遇到 ']' 时的组合公式：
\`\`\`javascript
currentStr = prevStr + currentStr.repeat(num)
// "a" + "c".repeat(2) = "acc"
// "" + "acc".repeat(3) = "accaccacc"
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "字符串解码演示",
          steps: [
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [],
              description: "s=\"3[a2[c]]\"。使用双栈处理嵌套结构",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "num" }],
              description: "遇到'3'，currentNum=3",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [1], color: "yellow" as const, label: "[" }],
              description: "遇到'['，numStack=[3]，strStack=[\"\"]，重置currentNum=0，currentStr=\"\"",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [2], color: "green" as const, label: "字母" }],
              description: "遇到'a'，currentStr=\"a\"",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [3], color: "blue" as const, label: "num" }],
              description: "遇到'2'，currentNum=2",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [4], color: "yellow" as const, label: "[" }],
              description: "遇到'['，numStack=[3,2]，strStack=[\"\",\"a\"]，重置",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [5], color: "green" as const, label: "字母" }],
              description: "遇到'c'，currentStr=\"c\"",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [6], color: "red" as const, label: "]" }],
              description: "遇到']'，弹出num=2，prevStr=\"a\"。currentStr=\"a\"+\"c\".repeat(2)=\"acc\"",
            },
            {
              array: ["3", "[", "a", "2", "[", "c", "]", "]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [7], color: "red" as const, label: "]" }],
              description: "遇到']'，弹出num=3，prevStr=\"\"。currentStr=\"\"+\"acc\".repeat(3)=\"accaccacc\"",
            },
            {
              array: ["a", "c", "c", "a", "c", "c", "a", "c", "c"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: "结果" }],
              description: "解码完成！3[a2[c]] = \"accaccacc\"",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归法",
        animation: {
          type: "two-pointers" as const,
          title: "递归法字符串解码演示",
          steps: [
            {
              array: ["2", "[", "a", "b", "]"],
              left: 0,
              right: 4,
              highlights: [],
              description: "s=\"2[ab]\"。递归处理嵌套括号",
            },
            {
              array: ["2", "[", "a", "b", "]"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "blue" as const, label: "num=2" },
              ],
              description: "遇到数字'2'，构建num=2",
            },
            {
              array: ["2", "[", "a", "b", "]"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "递归" },
              ],
              description: "遇到'['，递归调用处理括号内内容",
            },
            {
              array: ["a", "b"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "收集" },
              ],
              description: "递归层：收集字母，currentStr=\"ab\"",
            },
            {
              array: ["2", "[", "a", "b", "]"],
              left: 4,
              right: 4,
              highlights: [
                { indices: [4], color: "red" as const, label: "返回ab" },
              ],
              description: "遇到']'，返回\"ab\"。外层：\"ab\".repeat(2)=\"abab\"",
            },
            {
              array: ["a", "b", "a", "b"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "结果" },
              ],
              description: "解码完成！2[ab] = \"abab\" ✓",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 字符串解码 - 递归法
 *
 * 核心思想：
 * 将嵌套的括号结构自然映射到递归调用
 * - 遇到 '[': 递归处理括号内的内容
 * - 遇到 ']': 返回当前结果
 *
 * 递归结构：
 * "3[a2[c]]" 的解析过程
 *   └─ decode() → 处理 "3[...]"
 *        └─ decode() → 处理 "a2[...]"
 *             └─ decode() → 处理 "c" → 返回 "c"
 *        ← 返回 "acc"
 *   ← 返回 "accaccacc"
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，递归栈深度
 */
function decodeString(s) {
  let i = 0;  // 全局索引，在递归间共享

  const decode = () => {
    let result = '';
    let num = 0;

    while (i < s.length) {
      const char = s[i];

      if (char >= '0' && char <= '9') {
        // 构建多位数
        num = num * 10 + parseInt(char);
        i++;
      } else if (char === '[') {
        // 进入括号：递归处理括号内容
        i++;  // 跳过 '['
        const str = decode();  // 递归，返回括号内解码结果
        result += str.repeat(num);  // 重复 num 次
        num = 0;  // 重置数字
      } else if (char === ']') {
        // 退出括号：返回当前结果
        i++;  // 跳过 ']'
        return result;
      } else {
        // 字母：追加到结果
        result += char;
        i++;
      }
    }

    return result;
  };

  return decode();
}`,
        explanation: `## 递归法

### 核心思想
将问题分解为子问题，每对括号内的内容递归处理

### 递归结构
\`\`\`
"3[a2[c]]"
  └─ 外层递归：处理 "3[...]"
       ├─ 遇到 3
       ├─ 遇到 [ → 进入内层递归
       └─ 内层递归：处理 "a2[c]"
            ├─ 遇到 a → result = "a"
            ├─ 遇到 2
            ├─ 遇到 [ → 进入最内层递归
            └─ 最内层递归：处理 "c"
                 ├─ 遇到 c → result = "c"
                 ├─ 遇到 ] → 返回 "c"
            ← 返回 "cc"
            ← result = "a" + "cc" = "acc"
            ← 遇到 ] → 返回 "acc"
       ← 返回 "accaccacc"
\`\`\`

### 处理流程
1. 遇到数字：累加
2. 遇到 '['：递归处理括号内容
3. 遇到 ']'：返回当前结果
4. 遇到字母：追加

### 优点
- 代码结构清晰，符合嵌套的直觉`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 7. 每日温度 (739)
  {
    id: "daily-temperatures",
    leetcodeId: 739,
    title: "每日温度",
    titleEn: "Daily Temperatures",
    difficulty: "medium",
    category: "stack",
    tags: ["栈", "数组", "单调栈"],
    frontendRelevance: "high",
    frontendNote: "单调栈入门",
    description: `给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。`,
    examples: `**示例 1：**
\`\`\`
输入：temperatures = [73,74,75,71,69,72,76,73]
输出：[1,1,4,2,1,1,0,0]
\`\`\`

**示例 2：**
\`\`\`
输入：temperatures = [30,40,50,60]
输出：[1,1,1,0]
\`\`\`

**示例 3：**
\`\`\`
输入：temperatures = [30,60,90]
输出：[1,1,0]
\`\`\``,
    constraints: `- \`1 <= temperatures.length <= 10^5\`
- \`30 <= temperatures[i] <= 100\``,
    initialCode: `function dailyTemperatures(temperatures) {
  // 在此处编写代码
}`,
    solution: `function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // 存储索引

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { id: "2", name: "递增", input: [[30,40,50,60]], expected: [1,1,1,0] },
      { id: "3", name: "简单", input: [[30,60,90]], expected: [1,1,0] },
    ],
    hints: [
      "使用单调递减栈",
      "栈中存储索引而非温度值",
      "遇到更高温度时，弹出栈中所有较小温度的索引",
    ],
    explanation: `## 解题思路

### 单调栈

使用单调递减栈（从栈底到栈顶温度递减）：
1. 遍历每天的温度
2. 如果当前温度高于栈顶，弹出栈顶并计算天数差
3. 将当前索引入栈

### 为什么用单调栈？

我们需要找"下一个更大元素"，这是单调栈的经典应用：
- 栈中存储的是"还没找到更高温度的日子"
- 当遇到更高温度时，可以一次性处理所有温度更低的日子

### 复杂度分析
- 时间复杂度：O(n)，每个元素最多入栈出栈各一次
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["next-greater-element-i"],
    solutions: [
      {
        name: "单调栈（推荐）",
        code: `/**
 * 每日温度 - 单调栈法
 *
 * 核心思想：
 * 使用单调递减栈（从栈底到栈顶温度递减）
 * 栈中存储的是"还没找到更高温度的日子的索引"
 *
 * 为什么用单调栈？
 * - 我们需要找"下一个更大元素"，这是单调栈的经典应用
 * - 当遇到更高温度时，可以一次性处理所有温度更低的日子
 *
 * 算法流程：
 * 1. 遍历每天的温度
 * 2. 如果当前温度 > 栈顶温度，弹出栈顶并计算天数差
 * 3. 将当前索引入栈
 *
 * 时间复杂度：O(n)，每个元素最多入栈出栈各一次
 * 空间复杂度：O(n)，栈存储索引
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);  // 默认为 0（没有更高温度）
  const stack = [];  // 单调递减栈，存储索引

  for (let i = 0; i < n; i++) {
    // 当栈非空，且当前温度 > 栈顶索引对应的温度
    // 说明找到了栈顶那天的"下一个更高温度"
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();  // 弹出等待的日子
      result[prevIndex] = i - prevIndex;  // 计算天数差
    }
    // 当前索引入栈（等待找到它的"下一个更高温度"）
    stack.push(i);
  }

  // 栈中剩余的索引，说明后面没有更高温度，保持 0

  return result;
}`,
        explanation: `## 单调栈法

### 核心思想
维护一个单调递减栈，栈中存储索引

### 为什么存索引？
因为我们需要计算天数差，需要知道位置

### 执行示例
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

| i | temp | 栈状态 | 弹出 | result |
|---|------|--------|------|--------|
| 0 | 73 | [0] | - | [0,0,0,0,0,0,0,0] |
| 1 | 74 | [1] | 0 | [1,0,0,0,0,0,0,0] |
| 2 | 75 | [2] | 1 | [1,1,0,0,0,0,0,0] |
| 3 | 71 | [2,3] | - | [1,1,0,0,0,0,0,0] |
| 4 | 69 | [2,3,4] | - | [1,1,0,0,0,0,0,0] |
| 5 | 72 | [2,3,5] | 4,3 | [1,1,0,2,1,0,0,0] |
| 6 | 76 | [6] | 5,2 | [1,1,4,2,1,1,0,0] |
| 7 | 73 | [6,7] | - | [1,1,4,2,1,1,0,0] |

### 单调性分析
\`\`\`
栈中温度递减的原因：
- 如果新温度 <= 栈顶温度，直接入栈
- 如果新温度 > 栈顶温度，弹出栈顶
所以栈中温度保持递减
\`\`\``,
        animation: {
          type: "two-pointers" as const,
          title: "每日温度演示",
          steps: [
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [],
              description: "temperatures=[73,74,75,71,69,72,76,73]。使用单调递减栈存储索引",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "入栈" }],
              description: "i=0，温度73入栈。栈=[0]，result=[0,0,0,0,0,0,0,0]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "red" as const, label: "弹出" }, { indices: [1], color: "green" as const, label: "当前" }],
              description: "i=1，74>73，弹出0，result[0]=1-0=1。栈=[1]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [1], color: "red" as const, label: "弹出" }, { indices: [2], color: "green" as const, label: "当前" }],
              description: "i=2，75>74，弹出1，result[1]=2-1=1。栈=[2]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [2, 3], color: "blue" as const, label: "栈" }],
              description: "i=3，71<75，直接入栈。栈=[2,3]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [2, 3, 4], color: "blue" as const, label: "栈" }],
              description: "i=4，69<71，直接入栈。栈=[2,3,4]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [3, 4], color: "red" as const, label: "弹出" }, { indices: [5], color: "green" as const, label: "当前" }],
              description: "i=5，72>69>71，弹出4和3。result[4]=1，result[3]=2。栈=[2,5]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [2, 5], color: "red" as const, label: "弹出" }, { indices: [6], color: "green" as const, label: "当前" }],
              description: "i=6，76>72>75，弹出5和2。result[5]=1，result[2]=4。栈=[6]",
            },
            {
              array: ["73", "74", "75", "71", "69", "72", "76", "73"],
              left: 0,
              right: 0,
              highlights: [{ indices: [6, 7], color: "blue" as const, label: "栈" }],
              description: "i=7，73<76，直接入栈。栈=[6,7]。栈中剩余保持0",
            },
            {
              array: ["1", "1", "4", "2", "1", "1", "0", "0"],
              left: 0,
              right: 7,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7], color: "green" as const, label: "结果" }],
              description: "完成！result=[1,1,4,2,1,1,0,0]",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "暴力法（用于理解）",
        animation: {
          type: "two-pointers" as const,
          title: "暴力法每日温度演示",
          steps: [
            {
              array: [73, 74, 75, 71, 69],
              left: 0,
              right: 4,
              highlights: [],
              description: "暴力法：对每天，向后遍历找第一个更高温度",
            },
            {
              array: [73, 74, 75, 71, 69],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "i=0,73" },
                { indices: [1], color: "green" as const, label: "74>73✓" },
              ],
              description: "i=0(73)：向后找，74>73 ✓ result[0]=1-0=1",
            },
            {
              array: [73, 74, 75, 71, 69],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "blue" as const, label: "i=1,74" },
                { indices: [2], color: "green" as const, label: "75>74✓" },
              ],
              description: "i=1(74)：向后找，75>74 ✓ result[1]=2-1=1",
            },
            {
              array: [73, 74, 75, 71, 69],
              left: 2,
              right: 4,
              highlights: [
                { indices: [2], color: "blue" as const, label: "i=2,75" },
                { indices: [3, 4], color: "yellow" as const, label: "71,69<75" },
              ],
              description: "i=2(75)：向后找71,69都<75，没有更高 result[2]=0",
            },
            {
              array: [1, 1, 0, 0, 0],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1, 2, 3, 4], color: "green" as const, label: "结果" },
              ],
              description: "结果=[1,1,0,0,0]。暴力法O(n²)会超时，仅用于理解",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 每日温度 - 暴力法
 *
 * 核心思想：
 * 对每一天，向后遍历找第一个更高温度的日子
 *
 * 注意：此方法时间复杂度为 O(n²)，会超时
 * 仅用于理解问题，实际应用中不推荐
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)，不计结果数组
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    // 从第 i+1 天开始向后找
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j] > temperatures[i]) {
        // 找到第一个更高温度
        result[i] = j - i;  // 记录天数差
        break;  // 找到后就停止
      }
    }
    // 如果循环结束没找到，result[i] 保持 0
  }

  return result;
}`,
        explanation: `## 暴力法

### 思路
对每一天，向后遍历找第一个更高温度的日子

### 执行过程
\`\`\`
i=0, temp=73: 向后找 → 74 > 73 ✓, result[0] = 1
i=1, temp=74: 向后找 → 75 > 74 ✓, result[1] = 1
i=2, temp=75: 向后找 → 71,69,72,76 → 76 > 75 ✓, result[2] = 4
...
\`\`\`

### 时间复杂度分析
\`\`\`
最坏情况：温度递减 [100, 99, 98, ..., 1]
- 第 0 天要找 n-1 次
- 第 1 天要找 n-2 次
- ...
总共：(n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)
\`\`\`

### 缺点
- 时间复杂度 O(n²)，会超时
- 仅用于理解问题`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 8. 柱状图中最大的矩形 (84)
  {
    id: "largest-rectangle-in-histogram",
    leetcodeId: 84,
    title: "柱状图中最大的矩形",
    titleEn: "Largest Rectangle in Histogram",
    difficulty: "hard",
    category: "stack",
    tags: ["栈", "数组", "单调栈"],
    frontendRelevance: "low",
    frontendNote: "柱状图最大矩形Hard",
    description: `给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。`,
    examples: `**示例 1：**
\`\`\`
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
\`\`\`

**示例 2：**
\`\`\`
输入：heights = [2,4]
输出：4
\`\`\``,
    constraints: `- \`1 <= heights.length <= 10^5\`
- \`0 <= heights[i] <= 10^4\``,
    initialCode: `function largestRectangleArea(heights) {
  // 在此处编写代码
}`,
    solution: `function largestRectangleArea(heights) {
  const n = heights.length;
  const stack = [-1]; // 哨兵
  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    while (stack[stack.length - 1] !== -1 && heights[i] < heights[stack[stack.length - 1]]) {
      const h = heights[stack.pop()];
      const w = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    stack.push(i);
  }

  // 处理栈中剩余元素
  while (stack[stack.length - 1] !== -1) {
    const h = heights[stack.pop()];
    const w = n - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, h * w);
  }

  return maxArea;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[2,1,5,6,2,3]], expected: 10 },
      { id: "2", name: "示例2", input: [[2,4]], expected: 4 },
      { id: "3", name: "单个", input: [[5]], expected: 5 },
    ],
    hints: [
      "使用单调递增栈",
      "对每个柱子，找到左右两边第一个比它矮的柱子",
      "矩形宽度 = 右边界 - 左边界 - 1",
    ],
    explanation: `## 解题思路

### 单调栈

对于每个柱子，我们需要找到：
1. 左边第一个比它矮的柱子位置
2. 右边第一个比它矮的柱子位置

以这个柱子的高度为矩形高度时，矩形的最大宽度就确定了。

### 算法流程

使用单调递增栈：
1. 遍历柱子，当前柱子比栈顶矮时，弹出栈顶
2. 弹出时计算以该柱子为高的矩形面积
3. 宽度 = 当前位置 - 新栈顶位置 - 1

### 哨兵技巧

在栈底放一个 -1 作为哨兵：
- 避免特判栈为空的情况
- 简化左边界的计算

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["maximal-rectangle"],
    solutions: [
      {
        name: "单调栈（推荐）",
        code: `/**
 * 柱状图中最大的矩形 - 单调栈法
 *
 * 核心思想：
 * 对于每个柱子，以它的高度作为矩形高度时，
 * 需要找到左右两边第一个比它矮的柱子，确定矩形宽度
 *
 * 算法设计：
 * 使用单调递增栈（从栈底到栈顶高度递增）
 * - 当遇到更矮的柱子时，说明找到了"右边界"
 * - 弹出栈顶，此时新栈顶就是"左边界"
 * - 计算以弹出柱子为高度的矩形面积
 *
 * 哨兵技巧：
 * 在栈底放一个 -1 作为哨兵，避免特判栈为空的情况
 *
 * 时间复杂度：O(n)，每个元素最多入栈出栈各一次
 * 空间复杂度：O(n)，栈存储索引
 */
function largestRectangleArea(heights) {
  const n = heights.length;
  const stack = [-1];  // 哨兵：简化左边界计算
  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    // 当前柱子比栈顶柱子矮时，处理栈顶
    // 说明栈顶柱子找到了右边界（当前位置 i）
    while (stack[stack.length - 1] !== -1 && heights[i] < heights[stack[stack.length - 1]]) {
      const h = heights[stack.pop()];  // 矩形高度
      // 宽度 = 右边界(i) - 左边界(新栈顶) - 1
      const w = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, h * w);
    }
    // 当前索引入栈
    stack.push(i);
  }

  // 处理栈中剩余元素（右边界是数组末尾）
  while (stack[stack.length - 1] !== -1) {
    const h = heights[stack.pop()];
    // 右边界是 n（数组末尾之后）
    const w = n - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, h * w);
  }

  return maxArea;
}`,
        explanation: `## 单调栈法

### 核心思想
维护单调递增栈，当遇到更矮的柱子时，计算以弹出柱子为高的矩形面积

### 关键公式
\`\`\`
宽度 = 右边界(i) - 左边界(栈顶) - 1
面积 = 高度 × 宽度
\`\`\`

### 执行示例
heights = [2, 1, 5, 6, 2, 3]

| i | h | 栈状态 | 弹出 | 计算 |
|---|---|--------|------|------|
| 0 | 2 | [-1, 0] | - | - |
| 1 | 1 | [-1, 1] | 0 | 2×(1-(-1)-1) = 2 |
| 2 | 5 | [-1,1,2] | - | - |
| 3 | 6 | [-1,1,2,3] | - | - |
| 4 | 2 | [-1,1,4] | 3,2 | 6×1=6, 5×2=10 |
| 5 | 3 | [-1,1,4,5] | - | - |
| 结束 | - | [-1] | 5,4,1 | 3×1, 2×3, 1×6 |

最大面积：10

### 哨兵作用
栈底的 -1 确保：
1. 栈永远不为空（避免特判）
2. 左边界计算正确（第一个柱子的左边界是 -1）`,
        animation: {
          type: "two-pointers" as const,
          title: "柱状图中最大的矩形演示",
          steps: [
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [],
              description: "heights=[2,1,5,6,2,3]。使用单调递增栈，栈底放哨兵-1",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0], color: "blue" as const, label: "入栈" }],
              description: "i=0，高度2入栈。栈=[-1,0]",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0], color: "red" as const, label: "弹出" }, { indices: [1], color: "green" as const, label: "当前" }],
              description: "i=1，高度1<2，弹出0。面积=2×(1-(-1)-1)=2。栈=[-1,1]",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [1, 2], color: "blue" as const, label: "栈" }],
              description: "i=2，高度5>1，入栈。栈=[-1,1,2]",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [1, 2, 3], color: "blue" as const, label: "栈" }],
              description: "i=3，高度6>5，入栈。栈=[-1,1,2,3]",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [2, 3], color: "red" as const, label: "弹出" }, { indices: [4], color: "green" as const, label: "当前" }],
              description: "i=4，高度2<6<5，弹出3和2。面积6×1=6，5×2=10。maxArea=10",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [1, 4, 5], color: "blue" as const, label: "栈" }],
              description: "i=5，高度3>2，入栈。栈=[-1,1,4,5]",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [5], color: "red" as const, label: "处理" }],
              description: "遍历结束，处理栈中剩余。弹出5，面积=3×(6-4-1)=3",
            },
            {
              array: ["2", "1", "5", "6", "2", "3"],
              left: 0,
              right: 5,
              highlights: [{ indices: [4], color: "red" as const, label: "处理" }],
              description: "弹出4，面积=2×(6-1-1)=8。弹出1，面积=1×(6-(-1)-1)=6",
            },
            {
              array: ["10"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "最大面积" }],
              description: "完成！最大矩形面积=10（高度5，宽度2）",
            },
          ] as TwoPointersStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "预计算左右边界",
        animation: {
          type: "two-pointers" as const,
          title: "预计算边界法柱状图最大矩形演示",
          steps: [
            {
              array: [2, 1, 5, 6, 2, 3],
              left: 0,
              right: 5,
              highlights: [],
              description: "heights=[2,1,5,6,2,3]。分两遍计算每个柱子的左右边界",
            },
            {
              array: ["left", -1, -1, 1, 2, 1, 4],
              left: 1,
              right: 6,
              highlights: [
                { indices: [1, 2], color: "blue" as const, label: "边界" },
              ],
              description: "第一遍→：计算左边界。left=[-1,-1,1,2,1,4]",
            },
            {
              array: ["right", 1, 6, 4, 4, 6, 6],
              left: 1,
              right: 6,
              highlights: [
                { indices: [1, 2], color: "yellow" as const, label: "边界" },
              ],
              description: "第二遍←：计算右边界。right=[1,6,4,4,6,6]",
            },
            {
              array: ["面积", "2×1", "1×6", "5×2", "6×1", "2×4", "3×1"],
              left: 1,
              right: 6,
              highlights: [
                { indices: [3], color: "green" as const, label: "max=10" },
              ],
              description: "第三遍：area[i]=heights[i]×(right[i]-left[i]-1)。max=5×2=10",
            },
            {
              array: [10],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "结果" },
              ],
              description: "最大矩形面积=10 ✓ 预计算法逻辑清晰",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 柱状图中最大的矩形 - 预计算边界法
 *
 * 核心思想：
 * 分两次遍历，预先计算每个柱子的左右边界
 * - left[i]: 左边第一个比 heights[i] 小的柱子的索引
 * - right[i]: 右边第一个比 heights[i] 小的柱子的索引
 *
 * 算法流程：
 * 1. 从左到右遍历，用单调栈计算左边界
 * 2. 从右到左遍历，用单调栈计算右边界
 * 3. 遍历每个柱子，计算以它为高的矩形面积
 *
 * 优点：逻辑更清晰，易于理解
 * 缺点：需要遍历三次，空间占用略多
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function largestRectangleArea(heights) {
  const n = heights.length;
  const left = new Array(n);   // 左边界数组
  const right = new Array(n);  // 右边界数组
  const stack = [];

  // 第一遍：从左到右，计算每个位置的左边界
  // left[i] = 左边第一个比 heights[i] 小的柱子的索引
  for (let i = 0; i < n; i++) {
    // 弹出所有 >= 当前高度的柱子
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    // 栈顶就是左边界，栈空则为 -1
    left[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  // 清空栈，准备第二遍
  stack.length = 0;

  // 第二遍：从右到左，计算每个位置的右边界
  // right[i] = 右边第一个比 heights[i] 小的柱子的索引
  for (let i = n - 1; i >= 0; i--) {
    // 弹出所有 >= 当前高度的柱子
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    // 栈顶就是右边界，栈空则为 n
    right[i] = stack.length ? stack[stack.length - 1] : n;
    stack.push(i);
  }

  // 第三遍：计算最大面积
  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    // 宽度 = 右边界 - 左边界 - 1
    const width = right[i] - left[i] - 1;
    const area = heights[i] * width;
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}`,
        explanation: `## 预计算边界法

### 核心思想
分两次遍历，预先计算每个柱子的左右边界

### 边界数组含义
\`\`\`
left[i] = 左边第一个比 heights[i] 小的柱子的索引
right[i] = 右边第一个比 heights[i] 小的柱子的索引
\`\`\`

### 执行示例
heights = [2, 1, 5, 6, 2, 3]

| i | heights[i] | left[i] | right[i] | 宽度 | 面积 |
|---|------------|---------|----------|------|------|
| 0 | 2 | -1 | 1 | 1 | 2 |
| 1 | 1 | -1 | 6 | 6 | 6 |
| 2 | 5 | 1 | 4 | 2 | 10 |
| 3 | 6 | 2 | 4 | 1 | 6 |
| 4 | 2 | 1 | 6 | 4 | 8 |
| 5 | 3 | 4 | 6 | 1 | 3 |

最大面积：10

### 优点
- 逻辑更清晰，易于理解
- 便于调试（可以打印边界数组）

### 缺点
- 需要遍历三次
- 空间占用略多（两个额外数组）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },
];
