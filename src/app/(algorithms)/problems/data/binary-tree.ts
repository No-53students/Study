import { Problem } from "../types";
import { TreeStep } from "../components/animations";

export const binaryTreeProblems: Problem[] = [
  // 1. 二叉树的最大深度 (104)
  {
    id: "maximum-depth-of-binary-tree",
    leetcodeId: 104,
    title: "二叉树的最大深度",
    titleEn: "Maximum Depth of Binary Tree",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "广度优先搜索", "二叉树"],
    frontendRelevance: "high",
    frontendNote: "递归基础",
    description: `给定一个二叉树 \`root\`，返回其最大深度。

二叉树的 **最大深度** 是指从根节点到最远叶子节点的最长路径上的节点数。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [3,9,20,null,null,15,7]
输出：3
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1,null,2]
输出：2
\`\`\``,
    constraints: `- 树中节点的数量在 \`[0, 10^4]\` 区间内。
- \`-100 <= Node.val <= 100\``,
    initialCode: `function maxDepth(root) {
  // 在此处编写你的代码

}`,
    solution: `function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,9,20,null,null,15,7]],
        expected: 3
      },
      {
        id: "2",
        name: "示例2",
        input: [[1,null,2]],
        expected: 2
      },
      {
        id: "3",
        name: "空树",
        input: [null],
        expected: 0
      },
      {
        id: "4",
        name: "单节点",
        input: [[1]],
        expected: 1
      }
    ],
    hints: [
      "使用递归：树的最大深度 = max(左子树深度, 右子树深度) + 1",
      "递归终止条件：空节点返回0",
      "也可以使用BFS层序遍历计算层数"
    ],
    explanation: `## 解题思路

### 方法一：递归（DFS）

树的最大深度等于左右子树的最大深度加1。

\`\`\`
maxDepth(root) = max(maxDepth(left), maxDepth(right)) + 1
\`\`\`

### 方法二：迭代（BFS）

使用层序遍历，统计层数即为最大深度。

### 复杂度分析
- 时间复杂度：O(n)，每个节点访问一次
- 空间复杂度：O(h)，h为树高，递归栈空间`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["same-tree", "invert-binary-tree"],
    solutions: [
      {
        name: "递归 DFS（推荐）",
        animation: {
          type: "tree" as const,
          title: "二叉树最大深度 - 递归 DFS 演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "3": ["root"] },
              description: "开始：从根节点3出发，计算最大深度",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "9": ["curr"] },
              highlights: [{ nodeIds: ["9"], color: "yellow" as const, label: "递归" }],
              description: "递归进入左子树：maxDepth(9)",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["9"], color: "green" as const, label: "深度=1" }],
              description: "节点9无子节点，返回 max(0,0)+1=1",
              visitPath: ["9"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "20": ["curr"] },
              highlights: [{ nodeIds: ["9"], color: "green" as const }, { nodeIds: ["20"], color: "yellow" as const, label: "递归" }],
              description: "递归进入右子树：maxDepth(20)",
              visitPath: ["9"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "15": ["curr"] },
              highlights: [{ nodeIds: ["9"], color: "green" as const }, { nodeIds: ["15"], color: "yellow" as const, label: "递归" }],
              description: "继续递归：maxDepth(15)",
              visitPath: ["9"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["9", "15"], color: "green" as const, label: "深度=1" }],
              description: "节点15无子节点，返回1",
              visitPath: ["9", "15"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["9", "15", "7"], color: "green" as const, label: "深度=1" }],
              description: "节点7无子节点，返回1",
              visitPath: ["9", "15", "7"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["9", "15", "7"], color: "green" as const }, { nodeIds: ["20"], color: "blue" as const, label: "深度=2" }],
              description: "节点20：max(1,1)+1=2",
              visitPath: ["9", "15", "7", "20"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3"], color: "purple" as const, label: "深度=3" }, { nodeIds: ["9", "15", "7", "20"], color: "green" as const }],
              description: "根节点3：max(1,2)+1=3。最大深度为3！",
              visitPath: ["9", "15", "7", "20", "3"],
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的最大深度 - 递归 DFS
 *
 * 核心思想：
 * 树的最大深度 = max(左子树深度, 右子树深度) + 1
 * 这是一个天然的递归问题，因为树本身就是递归定义的数据结构
 *
 * 递归三要素：
 * 1. 递归函数的功能：返回以当前节点为根的树的最大深度
 * 2. 递归终止条件：空节点返回 0
 * 3. 递归关系：当前深度 = max(左子树深度, 右子树深度) + 1
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - h 为树高，递归栈空间，最坏 O(n)
 */
function maxDepth(root) {
  // 递归终止条件：空节点深度为 0
  if (root === null) return 0;

  // 递归计算左子树的最大深度
  const leftDepth = maxDepth(root.left);
  // 递归计算右子树的最大深度
  const rightDepth = maxDepth(root.right);

  // 当前树的最大深度 = 左右子树中较大的深度 + 1（当前节点）
  return Math.max(leftDepth, rightDepth) + 1;
}`,
        explanation: `## 递归 DFS

### 思路
树的最大深度等于左右子树的最大深度加 1。

### 递归公式
\`\`\`
maxDepth(root) = max(maxDepth(left), maxDepth(right)) + 1
\`\`\`

### 执行过程示例

\`\`\`
      3
     / \\
    9  20
      /  \\
     15   7

maxDepth(3)
├── maxDepth(9)
│   ├── maxDepth(null) = 0
│   └── maxDepth(null) = 0
│   └── return max(0, 0) + 1 = 1
└── maxDepth(20)
    ├── maxDepth(15)
    │   ├── maxDepth(null) = 0
    │   └── maxDepth(null) = 0
    │   └── return max(0, 0) + 1 = 1
    └── maxDepth(7)
        ├── maxDepth(null) = 0
        └── maxDepth(null) = 0
        └── return max(0, 0) + 1 = 1
    └── return max(1, 1) + 1 = 2
└── return max(1, 2) + 1 = 3
\`\`\`

### 递归终止条件
- 空节点返回 0

### 优点
- 代码简洁，逻辑清晰
- 天然符合树的递归结构`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS（层序遍历）",
        animation: {
          type: "tree" as const,
          title: "二叉树最大深度 - BFS 层序遍历演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              description: "初始：队列=[3]，depth=0",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3"], color: "yellow" as const, label: "第1层" }],
              description: "处理第1层：取出3，depth=1，子节点9,20入队",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3"], color: "green" as const },
                { nodeIds: ["9", "20"], color: "yellow" as const, label: "第2层" },
              ],
              description: "处理第2层：取出9和20，depth=2，子节点15,7入队",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "9", "20"], color: "green" as const },
                { nodeIds: ["15", "7"], color: "yellow" as const, label: "第3层" },
              ],
              description: "处理第3层：取出15和7，depth=3，无子节点",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const }],
              description: "队列为空，最大深度 depth=3 ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的最大深度 - BFS 层序遍历
 *
 * 核心思想：
 * 使用队列进行层序遍历，每遍历完一层，深度计数器 +1
 * 遍历完所有层后，深度计数器的值就是最大深度
 *
 * 为什么能工作？
 * 层序遍历按层访问节点，层数就等于树的深度
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 最坏情况下队列存储整层节点（完全二叉树最后一层）
 */
function maxDepth(root) {
  // 边界情况：空树深度为 0
  if (root === null) return 0;

  const queue = [root];  // 初始化队列，根节点入队
  let depth = 0;         // 深度计数器

  // BFS：逐层遍历
  while (queue.length > 0) {
    const levelSize = queue.length;  // 当前层的节点数
    depth++;                          // 进入新的一层，深度 +1

    // 处理当前层的所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();           // 取出队首节点
      if (node.left) queue.push(node.left);   // 左子节点入队
      if (node.right) queue.push(node.right); // 右子节点入队
    }
  }

  return depth;  // 返回总层数即为最大深度
}`,
        explanation: `## 迭代 BFS

### 思路
使用层序遍历，每遍历完一层，深度加 1。

### 执行过程示例

\`\`\`
      3          depth = 0
     / \\
    9  20
      /  \\
     15   7

队列变化：
初始: [3]                    depth = 0
第1层: [3] → [9, 20]         depth = 1
第2层: [9, 20] → [15, 7]     depth = 2
第3层: [15, 7] → []          depth = 3

结果: depth = 3
\`\`\`

### 步骤
1. 根节点入队
2. 每次处理一层的所有节点
3. 统计遍历的层数

### 优点
- 避免递归，不会栈溢出
- 直观地按层统计`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代 DFS（显式栈）",
        animation: {
          type: "tree" as const,
          title: "二叉树最大深度 - 迭代 DFS 演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              description: "初始：栈=[[3,1]]，maxDepth=0",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "3": ["pop"] },
              highlights: [{ nodeIds: ["3"], color: "yellow" as const, label: "depth=1" }],
              description: "弹出[3,1]，maxDepth=1，入栈[9,2]和[20,2]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3"], color: "green" as const },
                { nodeIds: ["9"], color: "yellow" as const, label: "depth=2" },
              ],
              description: "弹出[9,2]，maxDepth=2，叶节点无子节点入栈",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "9"], color: "green" as const },
                { nodeIds: ["20"], color: "yellow" as const, label: "depth=2" },
              ],
              description: "弹出[20,2]，入栈[15,3]和[7,3]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "9", "20"], color: "green" as const },
                { nodeIds: ["15"], color: "yellow" as const, label: "depth=3" },
              ],
              description: "弹出[15,3]，maxDepth=3",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const }],
              description: "弹出[7,3]，栈空，最大深度 maxDepth=3 ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的最大深度 - 迭代 DFS（显式栈）
 *
 * 核心思想：
 * 用显式栈模拟递归调用栈，手动记录每个节点的深度
 * 栈中存储 [节点, 当前深度] 的元组，遍历过程中更新最大深度
 *
 * 与递归的关系：
 * - 递归：系统调用栈隐式记录深度
 * - 迭代：手动用栈 + 深度信息显式记录
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 栈空间，h 为树高，最坏 O(n)
 */
function maxDepth(root) {
  // 边界情况
  if (root === null) return 0;

  // 栈中存储 [节点, 该节点的深度]
  const stack = [[root, 1]];
  let maxDepth = 0;  // 记录遍历过程中的最大深度

  // DFS 遍历
  while (stack.length > 0) {
    const [node, depth] = stack.pop();  // 取出栈顶节点及其深度
    maxDepth = Math.max(maxDepth, depth);  // 更新最大深度

    // 子节点入栈时，深度 +1
    if (node.right) stack.push([node.right, depth + 1]);
    if (node.left) stack.push([node.left, depth + 1]);
  }

  return maxDepth;
}`,
        explanation: `## 迭代 DFS

### 思路
使用显式栈模拟递归，记录每个节点的深度。

### 数据结构
栈中存储 [节点, 当前深度] 的元组。

### 执行过程示例

\`\`\`
      3
     / \\
    9  20
      /  \\
     15   7

栈变化：
初始: [[3,1]]                        maxDepth = 0
弹出 [3,1]: [[9,2], [20,2]]          maxDepth = 1
弹出 [20,2]: [[9,2], [15,3], [7,3]]  maxDepth = 2
弹出 [7,3]: [[9,2], [15,3]]          maxDepth = 3
弹出 [15,3]: [[9,2]]                 maxDepth = 3
弹出 [9,2]: []                       maxDepth = 3

结果: maxDepth = 3
\`\`\`

### 特点
- 用栈替代递归调用栈
- 适合需要避免递归的场景
- 前序遍历顺序（根-左-右）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 2. 相同的树 (100)
  {
    id: "same-tree",
    leetcodeId: 100,
    title: "相同的树",
    titleEn: "Same Tree",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "广度优先搜索", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "树比较",
    description: `给你两棵二叉树的根节点 \`p\` 和 \`q\`，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。`,
    examples: `**示例 1：**
\`\`\`
输入：p = [1,2,3], q = [1,2,3]
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：p = [1,2], q = [1,null,2]
输出：false
\`\`\`

**示例 3：**
\`\`\`
输入：p = [1,2,1], q = [1,1,2]
输出：false
\`\`\``,
    constraints: `- 两棵树上的节点数目都在范围 \`[0, 100]\` 内
- \`-10^4 <= Node.val <= 10^4\``,
    initialCode: `function isSameTree(p, q) {
  // 在此处编写你的代码

}`,
    solution: `function isSameTree(p, q) {
  // 都为空
  if (p === null && q === null) return true;
  // 其中一个为空
  if (p === null || q === null) return false;
  // 值不相等
  if (p.val !== q.val) return false;

  // 递归比较左右子树
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    testCases: [
      {
        id: "1",
        name: "相同的树",
        input: [[1,2,3], [1,2,3]],
        expected: true
      },
      {
        id: "2",
        name: "结构不同",
        input: [[1,2], [1,null,2]],
        expected: false
      },
      {
        id: "3",
        name: "值不同",
        input: [[1,2,1], [1,1,2]],
        expected: false
      },
      {
        id: "4",
        name: "都为空",
        input: [null, null],
        expected: true
      }
    ],
    hints: [
      "递归比较：两个节点都为空则相同，一个为空则不同",
      "值相同且左右子树都相同，则两棵树相同",
      "也可以使用BFS同时遍历两棵树"
    ],
    explanation: `## 解题思路

### 递归比较

同时遍历两棵树，比较对应节点：
1. 两个节点都为空 → 相同
2. 其中一个为空 → 不同
3. 值不相等 → 不同
4. 递归比较左右子树

### 复杂度分析
- 时间复杂度：O(min(n, m))，n和m为两棵树的节点数
- 空间复杂度：O(min(h1, h2))，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["maximum-depth-of-binary-tree", "symmetric-tree"],
    solutions: [
      {
        name: "递归（推荐）",
        code: `/**
 * 相同的树 - 递归法
 *
 * 核心思想：
 * 两棵树相同的条件是：
 * 1. 根节点的值相同
 * 2. 左子树相同
 * 3. 右子树相同
 *
 * 递归终止条件：
 * - 两个节点都为空：相同 (true)
 * - 其中一个为空：不同 (false)
 * - 值不相等：不同 (false)
 *
 * 时间复杂度：O(min(n, m)) - n、m 分别为两棵树的节点数
 * 空间复杂度：O(min(h1, h2)) - 递归栈深度取决于较小的树高
 */
function isSameTree(p, q) {
  // 终止条件 1：两个节点都为空，结构相同
  if (p === null && q === null) return true;

  // 终止条件 2：其中一个为空，结构不同
  if (p === null || q === null) return false;

  // 终止条件 3：值不相等
  if (p.val !== q.val) return false;

  // 递归比较：左子树和右子树都必须相同
  // 使用 && 短路运算，左子树不同时直接返回 false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
        explanation: `## 递归法

### 思路
同时遍历两棵树，比较对应位置的节点：

\`\`\`
isSameTree(p, q) = {
  true,                           if p == null && q == null
  false,                          if p == null || q == null
  false,                          if p.val != q.val
  isSameTree(左) && isSameTree(右) otherwise
}
\`\`\`

### 执行过程示例

\`\`\`
p:   1        q:   1
    / \\          / \\
   2   3        2   3

isSameTree(1, 1)
├── 值相同: 1 == 1 ✓
├── isSameTree(2, 2)
│   ├── 值相同: 2 == 2 ✓
│   ├── isSameTree(null, null) = true
│   └── isSameTree(null, null) = true
│   └── return true && true = true
└── isSameTree(3, 3)
    ├── 值相同: 3 == 3 ✓
    ├── isSameTree(null, null) = true
    └── isSameTree(null, null) = true
    └── return true && true = true
└── return true && true = true
\`\`\`

### 优点
- 代码简洁直观
- 符合树的递归结构`,
        animation: {
          type: "tree" as const,
          title: "相同的树 - 递归比较演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "p1" },
                { value: 2, id: "p2" },
                { value: 3, id: "p3" },
              ],
              pointers: { p1: ["p"] },
              description: "树 p: [1,2,3]。同时准备树 q: [1,2,3]。开始递归比较",
            },
            {
              nodes: [
                { value: 1, id: "p1" },
                { value: 2, id: "p2" },
                { value: 3, id: "p3" },
              ],
              pointers: { p1: ["p", "q"] },
              highlights: [{ nodeIds: ["p1"], color: "green" as const }],
              description: "比较根节点：p.val=1, q.val=1，相等 ✓ 继续比较子树",
            },
            {
              nodes: [
                { value: 1, id: "p1" },
                { value: 2, id: "p2" },
                { value: 3, id: "p3" },
              ],
              pointers: { p2: ["p.left", "q.left"] },
              highlights: [
                { nodeIds: ["p1"], color: "green" as const },
                { nodeIds: ["p2"], color: "yellow" as const },
              ],
              description: "递归比较左子树：p.left.val=2, q.left.val=2，相等 ✓",
            },
            {
              nodes: [
                { value: 1, id: "p1" },
                { value: 2, id: "p2" },
                { value: 3, id: "p3" },
              ],
              highlights: [
                { nodeIds: ["p1"], color: "green" as const },
                { nodeIds: ["p2"], color: "green" as const },
              ],
              description: "节点2的左右子树都为null，返回 true。节点2子树相同 ✓",
              visitPath: ["p2"],
            },
            {
              nodes: [
                { value: 1, id: "p1" },
                { value: 2, id: "p2" },
                { value: 3, id: "p3" },
              ],
              pointers: { p3: ["p.right", "q.right"] },
              highlights: [
                { nodeIds: ["p1", "p2"], color: "green" as const },
                { nodeIds: ["p3"], color: "yellow" as const },
              ],
              description: "递归比较右子树：p.right.val=3, q.right.val=3，相等 ✓",
            },
            {
              nodes: [
                { value: 1, id: "p1" },
                { value: 2, id: "p2" },
                { value: 3, id: "p3" },
              ],
              highlights: [{ nodeIds: ["p1", "p2", "p3"], color: "green" as const }],
              description: "节点3的左右子树都为null，返回 true。所有节点都匹配，返回 true！",
              visitPath: ["p1", "p2", "p3"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(min(n, m))",
        spaceComplexity: "O(min(h1, h2))",
      },
      {
        name: "迭代 BFS",
        animation: {
          type: "tree" as const,
          title: "相同的树 - 迭代 BFS 演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              description: "树 p=[1,2,3]，树 q=[1,2,3]。队列=[[1p,1q]]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const, label: "比较" }],
              description: "取出[1,1]：p.val=1, q.val=1，相等 ✓ 入队子节点",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "green" as const },
                { nodeIds: ["2"], color: "yellow" as const, label: "比较" },
              ],
              description: "取出[2,2]：p.val=2, q.val=2，相等 ✓",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1", "2"], color: "green" as const },
                { nodeIds: ["3"], color: "yellow" as const, label: "比较" },
              ],
              description: "取出[3,3]：p.val=3, q.val=3，相等 ✓",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3"], color: "green" as const }],
              description: "队列中的[null,null]都跳过，队列空，返回 true ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 相同的树 - 迭代 BFS
 *
 * 核心思想：
 * 使用队列同时层序遍历两棵树，每次取出配对的两个节点进行比较
 * 如果发现任何不匹配，立即返回 false
 *
 * 技巧：
 * 队列中存储节点对 [node1, node2]，保证对应位置的节点同时出队
 *
 * 时间复杂度：O(min(n, m)) - 遍历到较小树的所有节点
 * 空间复杂度：O(min(n, m)) - 队列最多存储一层的节点对
 */
function isSameTree(p, q) {
  // 队列存储节点对，初始为两棵树的根节点
  const queue = [[p, q]];

  while (queue.length > 0) {
    const [node1, node2] = queue.shift();  // 取出一对节点

    // 情况 1：两个节点都为空，继续检查下一对
    if (node1 === null && node2 === null) continue;

    // 情况 2：其中一个为空，结构不同
    if (node1 === null || node2 === null) return false;

    // 情况 3：值不相等
    if (node1.val !== node2.val) return false;

    // 将左右子节点配对入队
    queue.push([node1.left, node2.left]);    // 左子节点对
    queue.push([node1.right, node2.right]);  // 右子节点对
  }

  // 遍历完成，没有发现不同
  return true;
}`,
        explanation: `## 迭代 BFS

### 思路
使用队列同时层序遍历两棵树，每次比较配对的节点。

### 执行过程示例

\`\`\`
p:   1        q:   1
    / \\          / \\
   2   3        2   3

队列变化：
初始: [[1,1]]
取出 [1,1]: 值相同，入队 [[2,2], [3,3]]
取出 [2,2]: 值相同，入队 [[3,3], [null,null], [null,null]]
取出 [3,3]: 值相同，入队 [[null,null], [null,null], [null,null], [null,null]]
取出所有 [null,null]: 继续...
队列空，返回 true
\`\`\`

### 提前终止示例

\`\`\`
p:   1        q:   1
    /              \\
   2                2

队列变化：
初始: [[1,1]]
取出 [1,1]: 值相同，入队 [[2,null], [null,2]]
取出 [2,null]: 其中一个为空，返回 false
\`\`\`

### 步骤
1. 将两棵树的根节点配对入队
2. 每次出队一对节点进行比较
3. 将子节点配对入队

### 特点
- 避免递归
- 可以提前终止`,
        timeComplexity: "O(min(n, m))",
        spaceComplexity: "O(min(n, m))",
      },
    ],
  },

  // 3. 翻转二叉树 (226)
  {
    id: "invert-binary-tree",
    leetcodeId: 226,
    title: "翻转二叉树",
    titleEn: "Invert Binary Tree",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "广度优先搜索", "二叉树"],
    frontendRelevance: "high",
    frontendNote: "递归操作树",
    description: `给你一棵二叉树的根节点 \`root\`，翻转这棵二叉树，并返回其根节点。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
\`\`\`

**示例 2：**
\`\`\`
输入：root = [2,1,3]
输出：[2,3,1]
\`\`\`

**示例 3：**
\`\`\`
输入：root = []
输出：[]
\`\`\``,
    constraints: `- 树中节点数目范围在 \`[0, 100]\` 内
- \`-100 <= Node.val <= 100\``,
    initialCode: `function invertTree(root) {
  // 在此处编写你的代码

}`,
    solution: `function invertTree(root) {
  if (root === null) return null;

  // 交换左右子树
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // 递归翻转子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[4,2,7,1,3,6,9]],
        expected: [4,7,2,9,6,3,1]
      },
      {
        id: "2",
        name: "示例2",
        input: [[2,1,3]],
        expected: [2,3,1]
      },
      {
        id: "3",
        name: "空树",
        input: [null],
        expected: null
      },
      {
        id: "4",
        name: "单节点",
        input: [[1]],
        expected: [1]
      }
    ],
    hints: [
      "递归：先交换当前节点的左右子节点，再递归翻转子树",
      "也可以使用BFS层序遍历来翻转",
      "注意处理空节点"
    ],
    explanation: `## 解题思路

### 递归翻转

对于每个节点：
1. 交换其左右子节点
2. 递归翻转左子树
3. 递归翻转右子树

### 复杂度分析
- 时间复杂度：O(n)，每个节点访问一次
- 空间复杂度：O(h)，递归栈深度，h为树高`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["same-tree", "symmetric-tree"],
    solutions: [
      {
        name: "递归（推荐）",
        animation: {
          type: "tree" as const,
          title: "翻转二叉树 - 递归演示",
          steps: [
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 7, id: "7" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 9, id: "9" },
              ],
              pointers: { "4": ["root"] },
              description: "原始树：4 的左子树是 2，右子树是 7",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 7, id: "7" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 9, id: "9" },
              ],
              pointers: { "4": ["swap"] },
              highlights: [{ nodeIds: ["2", "7"], color: "yellow" as const, label: "交换" }],
              description: "交换节点4的左右子树：2 ↔ 7",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
                { value: 6, id: "6" },
                { value: 9, id: "9" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: { "7": ["curr"] },
              highlights: [{ nodeIds: ["4"], color: "green" as const, label: "已处理" }, { nodeIds: ["7"], color: "yellow" as const, label: "递归" }],
              description: "交换完成！递归处理左子树（原右子树7）",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
                { value: 6, id: "6" },
                { value: 9, id: "9" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["4"], color: "green" as const }, { nodeIds: ["6", "9"], color: "yellow" as const, label: "交换" }],
              description: "交换节点7的左右子树：6 ↔ 9",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
                { value: 9, id: "9" },
                { value: 6, id: "6" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: { "2": ["curr"] },
              highlights: [{ nodeIds: ["4", "7", "9", "6"], color: "green" as const }, { nodeIds: ["2"], color: "yellow" as const, label: "递归" }],
              description: "节点7处理完毕！递归处理右子树（原左子树2）",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
                { value: 9, id: "9" },
                { value: 6, id: "6" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["4", "7", "9", "6"], color: "green" as const }, { nodeIds: ["1", "3"], color: "yellow" as const, label: "交换" }],
              description: "交换节点2的左右子树：1 ↔ 3",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
                { value: 9, id: "9" },
                { value: 6, id: "6" },
                { value: 3, id: "3" },
                { value: 1, id: "1" },
              ],
              highlights: [{ nodeIds: ["4", "7", "9", "6", "2", "3", "1"], color: "green" as const, label: "完成" }],
              description: "翻转完成！结果：4→[7,2], 7→[9,6], 2→[3,1]",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 翻转二叉树 - 递归法
 *
 * 核心思想：
 * 翻转二叉树 = 交换每个节点的左右子树
 * 递归地对每个节点执行：先交换左右子节点，再递归翻转子树
 *
 * 递归三要素：
 * 1. 函数功能：翻转以当前节点为根的树，返回翻转后的根
 * 2. 终止条件：空节点直接返回 null
 * 3. 递归关系：交换左右子节点，递归翻转左右子树
 *
 * 注意：先交换后递归（前序）或先递归后交换（后序）都可以
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function invertTree(root) {
  // 递归终止条件：空节点无需翻转
  if (root === null) return null;

  // 交换当前节点的左右子树（使用解构赋值）
  [root.left, root.right] = [root.right, root.left];

  // 递归翻转左子树
  invertTree(root.left);
  // 递归翻转右子树
  invertTree(root.right);

  // 返回翻转后的根节点
  return root;
}`,
        explanation: `## 递归法

### 思路
对于每个节点：
1. 交换其左右子节点
2. 递归翻转左子树
3. 递归翻转右子树

### 执行过程示例

\`\`\`
原始树:           翻转后:
     4               4
    / \\             / \\
   2   7    →     7   2
  / \\ / \\       / \\ / \\
 1  3 6  9     9  6 3  1

invertTree(4):
├── 交换 4 的左右子节点: [2,7] → [7,2]
├── invertTree(7):
│   ├── 交换 7 的左右子节点: [6,9] → [9,6]
│   ├── invertTree(9) → 叶节点
│   └── invertTree(6) → 叶节点
└── invertTree(2):
    ├── 交换 2 的左右子节点: [1,3] → [3,1]
    ├── invertTree(3) → 叶节点
    └── invertTree(1) → 叶节点
\`\`\`

### 优点
- 代码简洁
- 逻辑清晰直观`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS",
        animation: {
          type: "tree" as const,
          title: "翻转二叉树 - 迭代 BFS 演示",
          steps: [
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 7, id: "7" },
              ],
              description: "原始树 [4,2,7]。队列=[4]",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["2", "7"], color: "yellow" as const, label: "交换" }],
              description: "取出4，交换其左右子节点：2 ↔ 7",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [
                { nodeIds: ["4"], color: "green" as const },
                { nodeIds: ["7"], color: "yellow" as const, label: "处理" },
              ],
              description: "取出7（原位置在右），交换其子节点（无子节点）",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [
                { nodeIds: ["4", "7"], color: "green" as const },
                { nodeIds: ["2"], color: "yellow" as const, label: "处理" },
              ],
              description: "取出2（原位置在左），交换其子节点（无子节点）",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [{ nodeIds: ["4", "7", "2"], color: "green" as const, label: "完成" }],
              description: "队列空，翻转完成！结果：4→[7,2]",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 翻转二叉树 - 迭代 BFS（层序遍历）
 *
 * 核心思想：
 * 使用队列层序遍历每个节点，对每个节点交换其左右子节点
 * 遍历顺序不影响结果，因为每个节点都会被处理一次
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列最多存储一层节点，完全二叉树最后一层约 n/2 个节点
 */
function invertTree(root) {
  // 边界情况
  if (root === null) return null;

  // 使用队列进行层序遍历
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();  // 取出队首节点

    // 交换当前节点的左右子节点
    [node.left, node.right] = [node.right, node.left];

    // 将子节点入队继续处理
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
}`,
        explanation: `## 迭代 BFS

### 思路
使用层序遍历，对每个节点交换其左右子节点。

### 执行过程示例

\`\`\`
原始树:
     4
    / \\
   2   7
  / \\ / \\
 1  3 6  9

队列变化：
初始: [4]
取出 4: 交换 [2,7]→[7,2], 入队 [7,2]
取出 7: 交换 [6,9]→[9,6], 入队 [2,9,6]
取出 2: 交换 [1,3]→[3,1], 入队 [9,6,3,1]
取出 9,6,3,1: 都是叶节点

翻转后:
     4
    / \\
   7   2
  / \\ / \\
 9  6 3  1
\`\`\`

### 步骤
1. 根节点入队
2. 出队节点，交换其左右子节点
3. 子节点入队继续处理`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代 DFS",
        animation: {
          type: "tree" as const,
          title: "翻转二叉树 - 迭代 DFS 演示",
          steps: [
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 7, id: "7" },
              ],
              description: "原始树 [4,2,7]。栈=[4]",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["2", "7"], color: "yellow" as const, label: "交换" }],
              description: "弹出4，交换左右子节点：2 ↔ 7，入栈[7,2]",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [
                { nodeIds: ["4"], color: "green" as const },
                { nodeIds: ["2"], color: "yellow" as const, label: "pop" },
              ],
              description: "弹出2（栈顶），无子节点需交换",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [
                { nodeIds: ["4", "2"], color: "green" as const },
                { nodeIds: ["7"], color: "yellow" as const, label: "pop" },
              ],
              description: "弹出7，无子节点需交换",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [{ nodeIds: ["4", "7", "2"], color: "green" as const, label: "完成" }],
              description: "栈空，翻转完成！结果：4→[7,2]",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 翻转二叉树 - 迭代 DFS（显式栈）
 *
 * 核心思想：
 * 使用栈模拟 DFS 遍历，对每个节点交换其左右子节点
 * 与 BFS 的区别仅在于遍历顺序，结果相同
 *
 * 栈 vs 队列：
 * - 栈（LIFO）：深度优先，先处理子树再处理兄弟
 * - 队列（FIFO）：广度优先，先处理兄弟再处理子树
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 栈深度等于树高，最坏 O(n)
 */
function invertTree(root) {
  // 边界情况
  if (root === null) return null;

  // 使用栈进行深度优先遍历
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();  // 取出栈顶节点

    // 交换当前节点的左右子节点
    [node.left, node.right] = [node.right, node.left];

    // 将子节点入栈继续处理
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return root;
}`,
        explanation: `## 迭代 DFS

### 思路
使用栈模拟 DFS，对每个节点交换其左右子节点。

### 与 BFS 对比

| 特性 | DFS (栈) | BFS (队列) |
|------|---------|-----------|
| 数据结构 | 栈 (LIFO) | 队列 (FIFO) |
| 遍历顺序 | 先深后广 | 先广后深 |
| 空间复杂度 | O(h) | O(n) |
| 结果 | 相同 | 相同 |

### 执行过程示例

\`\`\`
原始树:
     4
    / \\
   2   7

栈变化：
初始: [4]
弹出 4: 交换 [2,7]→[7,2], 入栈 [7,2]
弹出 2: 交换, 入栈 [7, ...]
弹出 ...: 继续处理
\`\`\`

### 特点
- 与 BFS 类似，只是用栈替代队列
- 遍历顺序不同，但结果相同
- 空间复杂度更优（取决于树的形状）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 4. 对称二叉树 (101)
  {
    id: "symmetric-tree",
    leetcodeId: 101,
    title: "对称二叉树",
    titleEn: "Symmetric Tree",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "广度优先搜索", "二叉树"],
    frontendRelevance: "high",
    frontendNote: "树的对称性判断",
    description: `给你一个二叉树的根节点 \`root\`，检查它是否轴对称。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,2,3,4,4,3]
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1,2,2,null,3,null,3]
输出：false
\`\`\``,
    constraints: `- 树中节点数目在范围 \`[1, 1000]\` 内
- \`-100 <= Node.val <= 100\`

**进阶：** 你可以运用递归和迭代两种方法解决这个问题吗？`,
    initialCode: `function isSymmetric(root) {
  // 在此处编写你的代码

}`,
    solution: `function isSymmetric(root) {
  if (root === null) return true;

  const isMirror = (left, right) => {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    if (left.val !== right.val) return false;

    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  return isMirror(root.left, root.right);
}`,
    testCases: [
      {
        id: "1",
        name: "对称树",
        input: [[1,2,2,3,4,4,3]],
        expected: true
      },
      {
        id: "2",
        name: "非对称树",
        input: [[1,2,2,null,3,null,3]],
        expected: false
      },
      {
        id: "3",
        name: "单节点",
        input: [[1]],
        expected: true
      }
    ],
    hints: [
      "对称的定义：左子树的左节点 = 右子树的右节点，左子树的右节点 = 右子树的左节点",
      "可以用递归或迭代（队列）实现",
      "递归时同时检查镜像位置的节点"
    ],
    explanation: `## 解题思路

### 递归检查镜像

定义辅助函数 isMirror(left, right)：
1. 都为空 → 对称
2. 一个为空 → 不对称
3. 值不同 → 不对称
4. 递归检查：left.left 与 right.right，left.right 与 right.left

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["same-tree", "invert-binary-tree"],
    solutions: [
      {
        name: "递归（推荐）",
        animation: {
          type: "tree" as const,
          title: "对称二叉树 - 递归检查演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
                { value: 3, id: "3L" },
                { value: 4, id: "4L" },
                { value: 4, id: "4R" },
                { value: 3, id: "3R" },
              ],
              pointers: { "1": ["root"] },
              description: "检查树是否对称：比较左右子树是否互为镜像",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
                { value: 3, id: "3L" },
                { value: 4, id: "4L" },
                { value: 4, id: "4R" },
                { value: 3, id: "3R" },
              ],
              highlights: [{ nodeIds: ["2L", "2R"], color: "yellow" as const, label: "比较" }],
              description: "isMirror(2L, 2R)：值都是 2，相等 ✓",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
                { value: 3, id: "3L" },
                { value: 4, id: "4L" },
                { value: 4, id: "4R" },
                { value: 3, id: "3R" },
              ],
              highlights: [{ nodeIds: ["2L", "2R"], color: "green" as const }, { nodeIds: ["3L", "3R"], color: "yellow" as const, label: "外侧" }],
              description: "检查外侧：isMirror(3L, 3R)，值都是 3 ✓",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
                { value: 3, id: "3L" },
                { value: 4, id: "4L" },
                { value: 4, id: "4R" },
                { value: 3, id: "3R" },
              ],
              highlights: [{ nodeIds: ["2L", "2R", "3L", "3R"], color: "green" as const }, { nodeIds: ["4L", "4R"], color: "yellow" as const, label: "内侧" }],
              description: "检查内侧：isMirror(4L, 4R)，值都是 4 ✓",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
                { value: 3, id: "3L" },
                { value: 4, id: "4L" },
                { value: 4, id: "4R" },
                { value: 3, id: "3R" },
              ],
              highlights: [{ nodeIds: ["1", "2L", "2R", "3L", "3R", "4L", "4R"], color: "green" as const, label: "对称" }],
              description: "所有镜像检查都通过！树是对称的 ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 对称二叉树 - 递归法
 *
 * 核心思想：
 * 对称二叉树的定义：
 * - 根节点的左右子树互为镜像
 * - 镜像条件：左子树的左节点 = 右子树的右节点，左子树的右节点 = 右子树的左节点
 *
 * 转化问题：
 * 判断树是否对称 → 判断左右子树是否互为镜像
 * isMirror(left, right) 检查两棵树是否镜像对称
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function isSymmetric(root) {
  // 空树是对称的
  if (root === null) return true;

  /**
   * 辅助函数：检查两棵树是否互为镜像
   * @param left - 左子树
   * @param right - 右子树
   * @returns 是否镜像对称
   */
  const isMirror = (left, right) => {
    // 两个节点都为空，镜像
    if (left === null && right === null) return true;
    // 其中一个为空，不镜像
    if (left === null || right === null) return false;
    // 值不相等，不镜像
    if (left.val !== right.val) return false;

    // 递归检查：
    // left.left 和 right.right 必须镜像（外侧）
    // left.right 和 right.left 必须镜像（内侧）
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  // 检查根节点的左右子树是否镜像
  return isMirror(root.left, root.right);
}`,
        explanation: `## 递归法

### 思路
定义辅助函数 isMirror(left, right) 检查镜像关系：

\`\`\`
镜像对称的条件：
      1
     / \\
    2   2    ← 值相等
   / \\ / \\
  3  4 4  3  ← 外侧 (3=3)、内侧 (4=4)
\`\`\`

### 递归关系

\`\`\`
isMirror(L, R) = {
  true,                     if L == null && R == null
  false,                    if L == null || R == null
  false,                    if L.val != R.val
  isMirror(L.左, R.右) &&   外侧比较
  isMirror(L.右, R.左)      内侧比较
}
\`\`\`

### 执行过程示例

\`\`\`
      1
     / \\
    2   2
   / \\ / \\
  3  4 4  3

isMirror(2, 2):
├── 值相同: 2 == 2 ✓
├── isMirror(3, 3) 外侧 → true
└── isMirror(4, 4) 内侧 → true
└── return true
\`\`\`

### 关键
对称的定义是左子树的左节点等于右子树的右节点，左子树的右节点等于右子树的左节点。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS",
        animation: {
          type: "tree" as const,
          title: "对称二叉树 - 迭代 BFS 演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
              ],
              description: "树 [1,2,2]。队列=[[2L,2R]]（左右子树配对）",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
              ],
              highlights: [{ nodeIds: ["2L", "2R"], color: "yellow" as const, label: "比较" }],
              description: "取出[2L,2R]：值都是2，相等 ✓ 入队子节点配对",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
              ],
              highlights: [{ nodeIds: ["2L", "2R"], color: "green" as const }],
              description: "入队[2L.left, 2R.right]和[2L.right, 2R.left]（镜像配对）",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2L" },
                { value: 2, id: "2R" },
              ],
              highlights: [{ nodeIds: ["1", "2L", "2R"], color: "green" as const }],
              description: "所有[null,null]配对都跳过，队列空，返回 true ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 对称二叉树 - 迭代 BFS
 *
 * 核心思想：
 * 使用队列存储需要比较的节点对
 * 每次取出一对节点，检查它们是否镜像
 * 然后将它们的子节点按镜像关系配对入队
 *
 * 配对规则（镜像关系）：
 * - left.left 配对 right.right（外侧）
 * - left.right 配对 right.left（内侧）
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列最多存储一层的节点对
 */
function isSymmetric(root) {
  // 空树是对称的
  if (root === null) return true;

  // 队列存储需要比较的节点对，初始为左右子树的根
  const queue = [[root.left, root.right]];

  while (queue.length > 0) {
    const [left, right] = queue.shift();  // 取出一对节点

    // 两个都为空，继续检查下一对
    if (left === null && right === null) continue;
    // 其中一个为空，不对称
    if (left === null || right === null) return false;
    // 值不相等，不对称
    if (left.val !== right.val) return false;

    // 按镜像关系将子节点配对入队
    queue.push([left.left, right.right]);   // 外侧配对
    queue.push([left.right, right.left]);   // 内侧配对
  }

  // 所有节点对都通过检查
  return true;
}`,
        explanation: `## 迭代 BFS

### 思路
使用队列存储需要比较的节点对，每次比较镜像位置的节点。

### 入队规则（镜像配对）

\`\`\`
      1
     / \\
    L   R
   / \\ / \\
  L1 L2 R1 R2

配对入队：
[L.左, R.右] = [L1, R2]  外侧
[L.右, R.左] = [L2, R1]  内侧
\`\`\`

### 执行过程示例

\`\`\`
      1
     / \\
    2   2
   / \\ / \\
  3  4 4  3

队列变化：
初始: [[2,2]]
取出 [2,2]: 值相同，入队 [[3,3], [4,4]]
取出 [3,3]: 值相同，入队 [[4,4], [null,null], [null,null]]
取出 [4,4]: 值相同，继续...
所有 [null,null] 都通过
返回 true
\`\`\`

### 特点
- 避免递归
- 便于理解配对关系
- 可以处理任意深度的树`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 5. 从前序与中序遍历序列构造二叉树 (105)
  {
    id: "construct-binary-tree-from-preorder-and-inorder",
    leetcodeId: 105,
    title: "从前序与中序遍历序列构造二叉树",
    titleEn: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "数组", "哈希表", "分治", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "从遍历构建树",
    description: `给定两个整数数组 \`preorder\` 和 \`inorder\`，其中 \`preorder\` 是二叉树的**先序遍历**，\`inorder\` 是同一棵树的**中序遍历**，请构造二叉树并返回其根节点。`,
    examples: `**示例 1：**
\`\`\`
输入：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出：[3,9,20,null,null,15,7]
\`\`\`

**示例 2：**
\`\`\`
输入：preorder = [-1], inorder = [-1]
输出：[-1]
\`\`\``,
    constraints: `- \`1 <= preorder.length <= 3000\`
- \`inorder.length == preorder.length\`
- \`-3000 <= preorder[i], inorder[i] <= 3000\`
- \`preorder\` 和 \`inorder\` 均 **无重复** 元素
- \`inorder\` 均出现在 \`preorder\`
- \`preorder\` **保证** 为二叉树的前序遍历序列
- \`inorder\` **保证** 为二叉树的中序遍历序列`,
    initialCode: `function buildTree(preorder, inorder) {
  // 在此处编写你的代码

}`,
    solution: `function buildTree(preorder, inorder) {
  // 用哈希表存储中序遍历的值到索引的映射
  const indexMap = new Map();
  inorder.forEach((val, idx) => indexMap.set(val, idx));

  let preIndex = 0;

  const build = (inLeft, inRight) => {
    if (inLeft > inRight) return null;

    // 前序遍历的第一个节点是根节点
    const rootVal = preorder[preIndex++];
    const root = { val: rootVal, left: null, right: null };

    // 在中序遍历中找到根节点的位置
    const inIndex = indexMap.get(rootVal);

    // 递归构建左右子树
    root.left = build(inLeft, inIndex - 1);
    root.right = build(inIndex + 1, inRight);

    return root;
  };

  return build(0, inorder.length - 1);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,9,20,15,7], [9,3,15,20,7]],
        expected: [3,9,20,null,null,15,7]
      },
      {
        id: "2",
        name: "单节点",
        input: [[-1], [-1]],
        expected: [-1]
      },
      {
        id: "3",
        name: "左斜树",
        input: [[1,2,3], [3,2,1]],
        expected: [1,2,null,3]
      }
    ],
    hints: [
      "前序遍历的第一个元素是根节点",
      "在中序遍历中找到根节点，左边是左子树，右边是右子树",
      "用哈希表存储中序遍历的索引，加速查找"
    ],
    explanation: `## 解题思路

### 递归 + 哈希表

1. **前序遍历**：根 → 左 → 右，第一个元素是根
2. **中序遍历**：左 → 根 → 右，根左边是左子树，右边是右子树

**步骤：**
1. 从前序遍历取根节点
2. 在中序遍历中定位根节点，划分左右子树
3. 递归构建左右子树

**优化：** 用哈希表存储中序遍历的索引，O(1) 查找根节点位置。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)，哈希表 + 递归栈`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["construct-binary-tree-from-inorder-and-postorder", "binary-tree-level-order-traversal"],
    solutions: [
      {
        name: "递归 + 哈希表（推荐）",
        animation: {
          type: "tree" as const,
          title: "从前序与中序遍历构造二叉树演示",
          steps: [
            {
              nodes: [{ value: 3, id: "3" }],
              description: "preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]。取pre[0]=3为根",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
              ],
              highlights: [{ nodeIds: ["3"], color: "green" as const }],
              description: "中序中3的位置=1，左边[9]是左子树。取pre[1]=9为左子树根",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              highlights: [
                { nodeIds: ["3", "9"], color: "green" as const },
                { nodeIds: ["20"], color: "yellow" as const },
              ],
              description: "右边[15,20,7]是右子树。取pre[2]=20为右子树根",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "9", "20"], color: "green" as const },
                { nodeIds: ["15", "7"], color: "yellow" as const },
              ],
              description: "中序中20的位置，左边[15]→左子，右边[7]→右子",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const }],
              description: "构造完成！树结构：3→[9,20], 20→[15,7]",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 从前序与中序遍历序列构造二叉树 - 递归 + 哈希表
 *
 * 核心思想：
 * 利用前序和中序遍历的特性：
 * - 前序遍历：[根, 左子树, 右子树] → 第一个元素是根
 * - 中序遍历：[左子树, 根, 右子树] → 根把数组分成左右两部分
 *
 * 算法步骤：
 * 1. 从前序遍历取出根节点（当前第一个未处理的元素）
 * 2. 在中序遍历中找到根节点位置，确定左右子树的范围
 * 3. 递归构建左子树和右子树
 *
 * 优化：使用哈希表存储中序遍历的索引，O(1) 查找根节点位置
 *
 * 时间复杂度：O(n) - 每个节点处理一次
 * 空间复杂度：O(n) - 哈希表 + 递归栈
 */
function buildTree(preorder, inorder) {
  // 构建哈希表：中序遍历的值 → 索引
  // 用于 O(1) 时间查找根节点在中序遍历中的位置
  const indexMap = new Map();
  inorder.forEach((val, idx) => indexMap.set(val, idx));

  // preIndex 指向前序遍历中下一个要处理的根节点
  // 使用闭包变量，递归过程中自动递增
  let preIndex = 0;

  /**
   * 递归构建子树
   * @param inLeft - 当前子树在中序遍历中的左边界
   * @param inRight - 当前子树在中序遍历中的右边界
   * @returns 构建的子树根节点
   */
  const build = (inLeft, inRight) => {
    // 递归终止条件：左边界超过右边界，无节点可构建
    if (inLeft > inRight) return null;

    // 从前序遍历取出当前子树的根节点
    const rootVal = preorder[preIndex++];
    const root = { val: rootVal, left: null, right: null };

    // 在中序遍历中定位根节点
    const inIndex = indexMap.get(rootVal);

    // 递归构建左右子树
    // 关键：必须先构建左子树，因为前序遍历是 [根, 左, 右]
    // preIndex 会在构建左子树时递增到右子树的起始位置
    root.left = build(inLeft, inIndex - 1);    // 左子树范围
    root.right = build(inIndex + 1, inRight);  // 右子树范围

    return root;
  };

  return build(0, inorder.length - 1);
}`,
        explanation: `## 递归 + 哈希表

### 核心原理

\`\`\`
前序遍历: [根, ...左子树..., ...右子树...]
           ↑ 第一个是根

中序遍历: [...左子树..., 根, ...右子树...]
                        ↑ 根把数组分成两部分
\`\`\`

### 执行过程示例

\`\`\`
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]

第1步: 取 preorder[0]=3 作为根
       在 inorder 中找到 3 的位置 = 1
       左子树中序: [9]
       右子树中序: [15, 20, 7]

         3
        / \\
       ?   ?

第2步: preIndex=1, 取 preorder[1]=9
       在 inorder[0:0] 中，9 是叶节点

         3
        / \\
       9   ?

第3步: preIndex=2, 取 preorder[2]=20
       在 inorder[2:4] 中找到 20 的位置 = 3
       左子树: [15], 右子树: [7]

         3
        / \\
       9   20
          /  \\
         ?    ?

最终结果:
         3
        / \\
       9   20
          /  \\
         15   7
\`\`\`

### 关键点
- 先构建左子树，再构建右子树（与前序遍历顺序一致）
- preIndex 全局递增，自动指向下一个根节点`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归（传递索引）",
        animation: {
          type: "tree" as const,
          title: "从前序与中序遍历构造二叉树 - 传递索引演示",
          steps: [
            {
              nodes: [{ value: 3, id: "3" }],
              description: "preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]。build(0,4,0,4)：根=pre[0]=3",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
              ],
              highlights: [{ nodeIds: ["3"], color: "green" as const }],
              description: "中序查找3位置=1，leftSize=1。左子树build(1,1,0,0)：根=9",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              highlights: [
                { nodeIds: ["3", "9"], color: "green" as const },
                { nodeIds: ["20"], color: "yellow" as const },
              ],
              description: "右子树build(2,4,2,4)：根=pre[2]=20",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const }],
              description: "20的左子树build(3,3,2,2)→15，右子树build(4,4,4,4)→7。完成！",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 从前序与中序遍历序列构造二叉树 - 递归（传递索引范围）
 *
 * 核心思想：
 * 与哈希表方法类似，但通过传递前序和中序遍历的索引范围来划分子树
 * 不使用哈希表，而是线性查找根节点在中序遍历中的位置
 *
 * 索引关系计算：
 * - leftSize = inIndex - inStart（左子树的节点数）
 * - 前序左子树范围：[preStart+1, preStart+leftSize]
 * - 前序右子树范围：[preStart+leftSize+1, preEnd]
 *
 * 时间复杂度：O(n²) 最坏 - 每次需要线性查找根节点
 * 空间复杂度：O(n) - 递归栈
 */
function buildTree(preorder, inorder) {
  /**
   * 递归构建子树
   * @param preStart, preEnd - 当前子树在前序遍历中的范围
   * @param inStart, inEnd - 当前子树在中序遍历中的范围
   */
  const build = (preStart, preEnd, inStart, inEnd) => {
    // 递归终止条件
    if (preStart > preEnd) return null;

    // 前序遍历的第一个元素是根节点
    const rootVal = preorder[preStart];
    const root = { val: rootVal, left: null, right: null };

    // 在中序遍历中线性查找根节点位置
    let inIndex = inStart;
    while (inorder[inIndex] !== rootVal) inIndex++;

    // 计算左子树的节点数，用于确定前序遍历的分割点
    const leftSize = inIndex - inStart;

    // 递归构建左右子树
    // 前序: [根, 左子树(leftSize个), 右子树]
    // 中序: [左子树, 根, 右子树]
    root.left = build(
      preStart + 1,              // 左子树在前序中起始
      preStart + leftSize,       // 左子树在前序中结束
      inStart,                   // 左子树在中序中起始
      inIndex - 1                // 左子树在中序中结束
    );
    root.right = build(
      preStart + leftSize + 1,   // 右子树在前序中起始
      preEnd,                    // 右子树在前序中结束
      inIndex + 1,               // 右子树在中序中起始
      inEnd                      // 右子树在中序中结束
    );

    return root;
  };

  return build(0, preorder.length - 1, 0, inorder.length - 1);
}`,
        explanation: `## 递归（传递索引）

### 思路
通过传递前序和中序遍历的索引范围来划分子树。

### 索引计算图解

\`\`\`
preorder: [根, ...左子树(n个)..., ...右子树...]
           ↑  ↑              ↑  ↑            ↑
         pS  pS+1        pS+n pS+n+1        pE

inorder:  [...左子树..., 根, ...右子树...]
           ↑           ↑ ↑   ↑            ↑
          iS      iIdx-1 iIdx iIdx+1      iE

leftSize = iIdx - iS
\`\`\`

### 索引范围

| 子树 | 前序范围 | 中序范围 |
|------|---------|---------|
| 左子树 | [pS+1, pS+leftSize] | [iS, iIdx-1] |
| 右子树 | [pS+leftSize+1, pE] | [iIdx+1, iE] |

### 缺点
- 每次需要线性查找根节点在中序中的位置 O(n)
- 最坏情况（斜树）总时间复杂度 O(n²)
- 可以用哈希表优化为 O(n)`,
        timeComplexity: "O(n²) 最坏",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 6. 二叉树的层序遍历 (102)
  {
    id: "binary-tree-level-order-traversal",
    leetcodeId: 102,
    title: "二叉树的层序遍历",
    titleEn: "Binary Tree Level Order Traversal",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "广度优先搜索", "二叉树"],
    frontendRelevance: "high",
    frontendNote: "BFS层序遍历，React渲染树相关",
    description: `给你二叉树的根节点 \`root\`，返回其节点值的 **层序遍历**。（即逐层地，从左到右访问所有节点）。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1]
输出：[[1]]
\`\`\`

**示例 3：**
\`\`\`
输入：root = []
输出：[]
\`\`\``,
    constraints: `- 树中节点数目在范围 \`[0, 2000]\` 内
- \`-1000 <= Node.val <= 1000\``,
    initialCode: `function levelOrder(root) {
  // 在此处编写你的代码

}`,
    solution: `function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,9,20,null,null,15,7]],
        expected: [[3],[9,20],[15,7]]
      },
      {
        id: "2",
        name: "单节点",
        input: [[1]],
        expected: [[1]]
      },
      {
        id: "3",
        name: "空树",
        input: [null],
        expected: []
      }
    ],
    hints: [
      "使用队列进行BFS",
      "每次处理一层：记录当前队列大小，处理该数量的节点",
      "处理节点时将其子节点加入队列"
    ],
    explanation: `## 解题思路

### BFS + 队列

使用队列实现层序遍历：
1. 根节点入队
2. 每次处理一层：
   - 记录当前队列大小（该层节点数）
   - 依次出队处理，将子节点入队
3. 将每层结果加入答案

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)，队列最大存储一层节点`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["binary-tree-right-side-view", "binary-tree-zigzag-level-order-traversal"],
    solutions: [
      {
        name: "BFS + 队列（推荐）",
        animation: {
          type: "tree" as const,
          title: "二叉树层序遍历 - BFS 演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "3": ["queue"] },
              description: "初始化：根节点3入队。queue=[3]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3"], color: "green" as const, label: "第1层" }],
              description: "处理第1层：出队3，子节点9,20入队。结果：[[3]]",
              visitPath: ["3"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "9": ["queue"], "20": ["queue"] },
              highlights: [{ nodeIds: ["3"], color: "green" as const }, { nodeIds: ["9", "20"], color: "yellow" as const, label: "第2层" }],
              description: "处理第2层：出队9和20。queue=[9,20]",
              visitPath: ["3"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20"], color: "green" as const }],
              description: "第2层处理完毕。结果：[[3], [9,20]]。15和7入队",
              visitPath: ["3", "9", "20"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              pointers: { "15": ["queue"], "7": ["queue"] },
              highlights: [{ nodeIds: ["3", "9", "20"], color: "green" as const }, { nodeIds: ["15", "7"], color: "yellow" as const, label: "第3层" }],
              description: "处理第3层：出队15和7，无子节点",
              visitPath: ["3", "9", "20"],
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const, label: "完成" }],
              description: "遍历完成！结果：[[3], [9,20], [15,7]]",
              visitPath: ["3", "9", "20", "15", "7"],
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的层序遍历 - BFS + 队列
 *
 * 核心思想：
 * 使用队列实现广度优先搜索，按层遍历二叉树
 * 关键技巧：在处理每一层之前，先记录当前队列的大小
 * 这个大小就是当前层的节点数
 *
 * 为什么需要记录 levelSize？
 * - 队列中可能同时包含多层的节点
 * - 记录层大小确保我们只处理当前层的节点
 * - 新入队的子节点属于下一层，留到下一轮处理
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列最多存储一层节点，完全二叉树约 n/2
 */
function levelOrder(root) {
  // 边界情况：空树返回空数组
  if (root === null) return [];

  const result = [];      // 存储最终结果
  const queue = [root];   // BFS 队列，初始只有根节点

  // BFS 主循环：队列非空时继续
  while (queue.length > 0) {
    const levelSize = queue.length;  // 记录当前层的节点数
    const currentLevel = [];          // 存储当前层的节点值

    // 处理当前层的所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();           // 取出队首节点
      currentLevel.push(node.val);          // 记录节点值

      // 将子节点入队（下一层）
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);  // 将当前层加入结果
  }

  return result;
}`,
        explanation: `## BFS + 队列

### 核心思路
使用队列实现层序遍历，关键是在处理每层前记录当前队列大小。

### 执行过程示例

\`\`\`
      3
     / \\
    9  20
      /  \\
     15   7

队列变化：
初始: [3]               levelSize=1
处理层1: 取出3, 入队[9,20]
result = [[3]]

队列: [9,20]            levelSize=2
处理层2: 取出9,20, 入队[15,7]
result = [[3], [9,20]]

队列: [15,7]            levelSize=2
处理层3: 取出15,7, 无子节点
result = [[3], [9,20], [15,7]]
\`\`\`

### 关键点
- 每轮开始时记录 levelSize，确保只处理当前层的节点
- 子节点入队后会在下一轮处理
- 先左后右保证从左到右的顺序`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "DFS + 递归",
        animation: {
          type: "tree" as const,
          title: "二叉树层序遍历 - DFS + 递归演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              description: "DFS(3, level=0)：result[0]不存在，创建[]，加入3",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3"], color: "green" as const }, { nodeIds: ["9"], color: "yellow" as const }],
              description: "DFS(9, level=1)：result[1]不存在，创建[]，加入9",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9"], color: "green" as const }, { nodeIds: ["20"], color: "yellow" as const }],
              description: "DFS(20, level=1)：result[1]存在，加入20。result=[[3],[9,20]]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "9", "20"], color: "green" as const },
                { nodeIds: ["15", "7"], color: "yellow" as const },
              ],
              description: "DFS(15,level=2)和DFS(7,level=2)：result=[[3],[9,20],[15,7]]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const }],
              description: "完成！结果：[[3], [9, 20], [15, 7]]",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的层序遍历 - DFS + 递归
 *
 * 核心思想：
 * 虽然是深度优先遍历，但通过传递层级参数，可以将节点按层组织
 * 每个节点根据其层级被放入对应的数组中
 *
 * 为什么 DFS 也能实现层序遍历的效果？
 * - 层序遍历要求的是"按层分组"，而不是"按层访问顺序"
 * - DFS 虽然访问顺序不同，但只要正确记录层级，就能按层分组
 * - 由于先遍历左子树，同层节点自然从左到右排列
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function levelOrder(root) {
  const result = [];  // 二维数组，result[i] 存储第 i 层的节点值

  /**
   * 深度优先遍历辅助函数
   * @param node - 当前节点
   * @param level - 当前层级（从 0 开始）
   */
  const dfs = (node, level) => {
    // 递归终止条件
    if (node === null) return;

    // 如果当前层还没有数组，创建一个
    // 这发生在第一次访问某一层时
    if (result.length === level) {
      result.push([]);
    }

    // 将当前节点的值加入对应层级的数组
    result[level].push(node.val);

    // 递归处理子节点，层级 +1
    dfs(node.left, level + 1);   // 先左
    dfs(node.right, level + 1);  // 后右
  };

  dfs(root, 0);  // 从根节点开始，层级为 0
  return result;
}`,
        explanation: `## DFS + 递归

### 思路
使用 DFS 遍历，通过 level 参数记录当前层级。

### 执行过程示例

\`\`\`
      3
     / \\
    9  20
      /  \\
     15   7

DFS 访问顺序: 3 → 9 → 20 → 15 → 7

dfs(3, 0): result[0].push(3)   → [[3]]
dfs(9, 1): result[1].push(9)   → [[3], [9]]
dfs(20, 1): result[1].push(20) → [[3], [9,20]]
dfs(15, 2): result[2].push(15) → [[3], [9,20], [15]]
dfs(7, 2): result[2].push(7)   → [[3], [9,20], [15,7]]
\`\`\`

### 特点
- 虽然是 DFS，但结果按层组织
- 因为先遍历左子树，所以同层节点从左到右排列
- 空间复杂度优于 BFS（取决于树的形状）

### 对比 BFS

| 特性 | BFS | DFS |
|------|-----|-----|
| 访问顺序 | 逐层 | 深度优先 |
| 结果分组 | 按层 | 按层 |
| 空间复杂度 | O(n) | O(h) |`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 7. 二叉树的右视图 (199)
  {
    id: "binary-tree-right-side-view",
    leetcodeId: 199,
    title: "二叉树的右视图",
    titleEn: "Binary Tree Right Side View",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "广度优先搜索", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "树的右视图",
    description: `给定一个二叉树的 **根节点** \`root\`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,3,null,5,null,4]
输出：[1,3,4]
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1,null,3]
输出：[1,3]
\`\`\`

**示例 3：**
\`\`\`
输入：root = []
输出：[]
\`\`\``,
    constraints: `- 二叉树的节点个数的范围是 \`[0, 100]\`
- \`-100 <= Node.val <= 100\``,
    initialCode: `function rightSideView(root) {
  // 在此处编写你的代码

}`,
    solution: `function rightSideView(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // 每层最后一个节点
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,3,null,5,null,4]],
        expected: [1,3,4]
      },
      {
        id: "2",
        name: "示例2",
        input: [[1,null,3]],
        expected: [1,3]
      },
      {
        id: "3",
        name: "空树",
        input: [null],
        expected: []
      }
    ],
    hints: [
      "使用BFS层序遍历",
      "每层的最后一个节点就是右视图能看到的节点",
      "也可以用DFS，优先访问右子树"
    ],
    explanation: `## 解题思路

### BFS层序遍历

层序遍历时，每层的最后一个节点就是从右侧能看到的节点。

### DFS方法

按照「根 → 右 → 左」的顺序遍历，每层第一个访问的节点就是右视图节点。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["binary-tree-level-order-traversal", "path-sum"],
    solutions: [
      {
        name: "BFS 层序遍历（推荐）",
        code: `/**
 * 二叉树的右视图 - BFS 层序遍历
 *
 * 核心思想：
 * 从右侧看树，能看到的是每一层最右边的节点
 * 使用 BFS 层序遍历，记录每层的最后一个节点即可
 *
 * 判断"最后一个节点"：
 * - 记录每层节点数 levelSize
 * - 当处理到 i === levelSize - 1 时，就是这层的最后一个
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列最多存储一层节点
 */
function rightSideView(root) {
  // 边界情况
  if (root === null) return [];

  const result = [];      // 存储右视图结果
  const queue = [root];   // BFS 队列

  while (queue.length > 0) {
    const levelSize = queue.length;  // 当前层的节点数

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // 关键：当前层的最后一个节点就是右视图能看到的
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      // 子节点入队（从左到右）
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}`,
        explanation: `## BFS 层序遍历

### 思路
层序遍历时，每层的最后一个节点就是从右侧能看到的节点。

### 执行过程示例

\`\`\`
      1
     / \\
    2   3
     \\   \\
      5   4

层序遍历：
第0层: [1]     → 最后一个: 1
第1层: [2,3]   → 最后一个: 3
第2层: [5,4]   → 最后一个: 4

右视图: [1, 3, 4]
\`\`\`

### 关键
- 记录每层的大小 levelSize
- 当 i === levelSize - 1 时，说明是这层最后一个节点

### 优点
- 直观，容易理解
- 适合处理"层"相关的问题`,
        animation: {
          type: "tree" as const,
          title: "二叉树右视图 - BFS演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                null,
                { value: 5, id: "5" },
                null,
                { value: 4, id: "4" },
              ],
              pointers: { "1": ["queue"] },
              description: "树: [1,2,3,null,5,null,4]。从右侧看能看到每层最右边的节点。队列初始化为[1]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                null,
                { value: 5, id: "5" },
                null,
                { value: 4, id: "4" },
              ],
              highlights: [{ nodeIds: ["1"], color: "green" as const, label: "右视图" }],
              description: "第0层: [1]。层大小=1，i=0是最后一个，记录1。result=[1]",
              visitPath: ["1"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                null,
                { value: 5, id: "5" },
                null,
                { value: 4, id: "4" },
              ],
              pointers: { "2": ["queue[0]"], "3": ["queue[1]"] },
              highlights: [
                { nodeIds: ["1"], color: "green" as const },
                { nodeIds: ["2", "3"], color: "yellow" as const },
              ],
              description: "第1层: [2,3]。层大小=2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                null,
                { value: 5, id: "5" },
                null,
                { value: 4, id: "4" },
              ],
              highlights: [
                { nodeIds: ["1", "3"], color: "green" as const, label: "右视图" },
                { nodeIds: ["2"], color: "blue" as const },
              ],
              description: "处理2(i=0)和3(i=1)。i=1是最后一个，记录3。result=[1,3]",
              visitPath: ["1", "3"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                null,
                { value: 5, id: "5" },
                null,
                { value: 4, id: "4" },
              ],
              pointers: { "5": ["queue[0]"], "4": ["queue[1]"] },
              highlights: [
                { nodeIds: ["1", "3"], color: "green" as const },
                { nodeIds: ["5", "4"], color: "yellow" as const },
              ],
              description: "第2层: [5,4]。层大小=2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                null,
                { value: 5, id: "5" },
                null,
                { value: 4, id: "4" },
              ],
              highlights: [{ nodeIds: ["1", "3", "4"], color: "green" as const, label: "右视图" }],
              description: "处理5(i=0)和4(i=1)。i=1是最后一个，记录4。result=[1,3,4] ✓",
              visitPath: ["1", "3", "4"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "DFS（根-右-左）",
        animation: {
          type: "tree" as const,
          title: "二叉树右视图 - DFS（根-右-左）演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "dfs(1, depth=0)：depth=result.length=0，记录1。result=[1]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "green" as const },
                { nodeIds: ["3"], color: "yellow" as const },
              ],
              description: "dfs(3, depth=1)：先遍历右子树！depth=1=result.length，记录3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1", "3"], color: "green" as const },
                { nodeIds: ["2"], color: "blue" as const },
              ],
              description: "dfs(2, depth=1)：depth=1≠result.length=2，不记录（已有该层）",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "3"], color: "green" as const, label: "右视图" }],
              description: "完成！右视图 result=[1,3]",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的右视图 - DFS（根-右-左）
 *
 * 核心思想：
 * 按照「根 → 右 → 左」的顺序遍历（前序遍历的镜像）
 * 这样每层第一个被访问的节点就是该层最右边的节点
 *
 * 判断"第一个访问"：
 * - depth === result.length 时，说明这是该深度第一次访问
 * - 因为先遍历右子树，所以第一个访问的一定是最右节点
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function rightSideView(root) {
  const result = [];  // 存储右视图结果

  /**
   * DFS 遍历（根-右-左顺序）
   * @param node - 当前节点
   * @param depth - 当前深度
   */
  const dfs = (node, depth) => {
    if (node === null) return;

    // 每层第一个访问的节点就是右视图节点
    // depth === result.length 意味着这是该层首次被访问
    if (depth === result.length) {
      result.push(node.val);
    }

    // 先右后左，保证每层第一个访问的是最右节点
    dfs(node.right, depth + 1);  // 先遍历右子树
    dfs(node.left, depth + 1);   // 再遍历左子树
  };

  dfs(root, 0);
  return result;
}`,
        explanation: `## DFS（根-右-左）

### 思路
按照「根 → 右 → 左」的顺序遍历，每层第一个访问的节点就是右视图节点。

### 执行过程示例

\`\`\`
      1
     / \\
    2   3
     \\   \\
      5   4

DFS 访问顺序: 1 → 3 → 4 → 2 → 5

dfs(1, 0): depth=0, len=0, 记录 1    result=[1]
dfs(3, 1): depth=1, len=1, 记录 3    result=[1,3]
dfs(4, 2): depth=2, len=2, 记录 4    result=[1,3,4]
dfs(2, 1): depth=1, len=3, 不记录
dfs(5, 2): depth=2, len=3, 不记录

右视图: [1, 3, 4]
\`\`\`

### 关键
- depth === result.length 时，说明这是该层第一个被访问的节点
- 先遍历右子树，保证右边的节点先被访问

### 优点
- 空间复杂度更优（递归栈深度）
- 代码简洁`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 8. 路径总和 (112)
  {
    id: "path-sum",
    leetcodeId: 112,
    title: "路径总和",
    titleEn: "Path Sum",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "广度优先搜索", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "路径和",
    description: `给你二叉树的根节点 \`root\` 和一个表示目标和的整数 \`targetSum\`。判断该树中是否存在 **根节点到叶子节点** 的路径，这条路径上所有节点值相加等于目标和 \`targetSum\`。如果存在，返回 \`true\`；否则，返回 \`false\`。

**叶子节点** 是指没有子节点的节点。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
解释：等于目标和的根节点到叶节点路径如上图所示。
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1,2,3], targetSum = 5
输出：false
解释：树中存在两条根节点到叶子节点的路径：
(1 --> 2): 和为 3
(1 --> 3): 和为 4
不存在 sum = 5 的根节点到叶子节点的路径。
\`\`\`

**示例 3：**
\`\`\`
输入：root = [], targetSum = 0
输出：false
解释：由于树是空的，所以不存在根节点到叶子节点的路径。
\`\`\``,
    constraints: `- 树中节点的数目在范围 \`[0, 5000]\` 内
- \`-1000 <= Node.val <= 1000\`
- \`-1000 <= targetSum <= 1000\``,
    initialCode: `function hasPathSum(root, targetSum) {
  // 在此处编写你的代码

}`,
    solution: `function hasPathSum(root, targetSum) {
  if (root === null) return false;

  // 到达叶子节点，检查剩余值是否等于当前节点值
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  // 递归检查左右子树
  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}`,
    testCases: [
      {
        id: "1",
        name: "存在路径",
        input: [[5,4,8,11,null,13,4,7,2,null,null,null,1], 22],
        expected: true
      },
      {
        id: "2",
        name: "不存在路径",
        input: [[1,2,3], 5],
        expected: false
      },
      {
        id: "3",
        name: "空树",
        input: [null, 0],
        expected: false
      }
    ],
    hints: [
      "使用递归，每次减去当前节点值",
      "到达叶子节点时，检查剩余值是否为0",
      "注意空树的边界情况"
    ],
    explanation: `## 解题思路

### 递归

从根节点开始，每次将 targetSum 减去当前节点值：
1. 空节点 → 返回 false
2. 叶子节点 → 检查当前值是否等于剩余目标
3. 非叶子节点 → 递归检查左右子树

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["binary-tree-maximum-path-sum", "lowest-common-ancestor"],
    solutions: [
      {
        name: "递归（推荐）",
        code: `/**
 * 路径总和 - 递归法
 *
 * 核心思想：
 * 从根节点出发，每走一步就减去当前节点的值
 * 当到达叶子节点时，检查剩余目标值是否等于叶子节点的值
 *
 * 递归三要素：
 * 1. 函数功能：检查从当前节点到叶子节点是否存在路径和等于 targetSum
 * 2. 终止条件：空节点返回 false，叶子节点检查值是否匹配
 * 3. 递归关系：左子树或右子树任意一边满足即可
 *
 * 为什么用减法而不是累加？
 * - 减法只需传递剩余目标值，而累加需要额外传递当前路径和
 * - 减法在叶子节点直接比较值，累加需要计算总和再比较
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function hasPathSum(root, targetSum) {
  // 空节点：路径不存在
  if (root === null) return false;

  // 叶子节点：检查当前值是否等于剩余目标值
  // 注意：必须是叶子节点（无左右子节点），中间节点不算
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  // 递归检查左右子树，目标值减去当前节点值
  const remaining = targetSum - root.val;
  // 使用 || 短路运算：左子树满足就不检查右子树
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}`,
        animation: {
          type: "tree" as const,
          title: "路径总和 - 递归 DFS 演示 (targetSum = 22)",
          steps: [
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
                { value: 11, id: "11" },
                null,
                { value: 13, id: "13" },
                { value: 4, id: "4r" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              pointers: { "5": ["root"] },
              highlights: [{ nodeIds: ["5"], color: "blue" as const, label: "当前节点" }],
              description: "开始：从根节点5出发，目标值 targetSum = 22，剩余 = 22",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
                { value: 11, id: "11" },
                null,
                { value: 13, id: "13" },
                { value: 4, id: "4r" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              pointers: { "4": ["curr"] },
              highlights: [
                { nodeIds: ["5"], color: "yellow" as const, label: "已访问" },
                { nodeIds: ["4"], color: "blue" as const, label: "当前" },
              ],
              description: "递归左子树：访问节点4，剩余 = 22 - 5 = 17",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
                { value: 11, id: "11" },
                null,
                { value: 13, id: "13" },
                { value: 4, id: "4r" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              pointers: { "11": ["curr"] },
              highlights: [
                { nodeIds: ["5", "4"], color: "yellow" as const, label: "已访问" },
                { nodeIds: ["11"], color: "blue" as const, label: "当前" },
              ],
              description: "继续左子树：访问节点11，剩余 = 17 - 4 = 13",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
                { value: 11, id: "11" },
                null,
                { value: 13, id: "13" },
                { value: 4, id: "4r" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              pointers: { "7": ["curr"] },
              highlights: [
                { nodeIds: ["5", "4", "11"], color: "yellow" as const, label: "路径" },
                { nodeIds: ["7"], color: "red" as const, label: "叶子节点" },
              ],
              description: "到达叶子节点7：剩余 = 13 - 11 = 2，但 7 ≠ 2，返回 false",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
                { value: 11, id: "11" },
                null,
                { value: 13, id: "13" },
                { value: 4, id: "4r" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              pointers: { "2": ["curr"] },
              highlights: [
                { nodeIds: ["5", "4", "11"], color: "yellow" as const, label: "路径" },
                { nodeIds: ["2"], color: "green" as const, label: "匹配！" },
              ],
              description: "检查右子节点2：剩余 = 2，2 === 2，找到路径！返回 true",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
                { value: 11, id: "11" },
                null,
                { value: 13, id: "13" },
                { value: 4, id: "4r" },
                { value: 7, id: "7" },
                { value: 2, id: "2" },
              ],
              highlights: [
                { nodeIds: ["5", "4", "11", "2"], color: "green" as const, label: "有效路径" },
              ],
              visitPath: ["5", "4", "11", "2"],
              description: "结果：找到路径 5→4→11→2，和为 5+4+11+2=22，返回 true",
            },
          ] as TreeStep[],
        },
        explanation: `## 递归法

### 思路
从根节点开始，每次将 targetSum 减去当前节点值：

\`\`\`
hasPathSum(node, target) = {
  false,                          if node == null
  node.val == target,             if 叶子节点
  hasPathSum(左, target-val) ||
  hasPathSum(右, target-val)      otherwise
}
\`\`\`

### 执行过程示例

\`\`\`
      5           targetSum = 22
     / \\
    4   8
   /   / \\
  11  13  4
 / \\       \\
7   2       1

路径 5→4→11→2: 5+4+11+2 = 22 ✓

递归过程:
hasPathSum(5, 22)
├── hasPathSum(4, 17)
│   └── hasPathSum(11, 13)
│       ├── hasPathSum(7, 2): 7≠2 → false
│       └── hasPathSum(2, 2): 叶子且 2==2 → true ✓
└── 短路，不再检查右子树

结果: true
\`\`\`

### 关键
- 必须到达叶子节点才算一条完整路径
- 用减法代替累加，更简洁`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS",
        animation: {
          type: "tree" as const,
          title: "路径总和 - 迭代 BFS 演示",
          steps: [
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              description: "targetSum=12。队列=[[5,5]]（节点,路径和）",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              highlights: [{ nodeIds: ["5"], color: "green" as const }],
              description: "取出[5,5]，非叶子。入队[4,9]和[8,13]",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              highlights: [
                { nodeIds: ["5"], color: "green" as const },
                { nodeIds: ["4"], color: "yellow" as const },
              ],
              description: "取出[4,9]，是叶子！sum=9≠12，继续",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              highlights: [
                { nodeIds: ["5", "4"], color: "green" as const },
                { nodeIds: ["8"], color: "yellow" as const },
              ],
              description: "取出[8,13]，是叶子！sum=13≠12，返回 false",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 路径总和 - 迭代 BFS
 *
 * 核心思想：
 * 使用队列进行层序遍历，同时记录到达每个节点时的路径和
 * 当到达叶子节点时，检查路径和是否等于目标值
 *
 * 队列元素结构：[节点, 当前路径和]
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列最多存储一层节点
 */
function hasPathSum(root, targetSum) {
  // 空树没有路径
  if (root === null) return false;

  // 队列存储 [节点, 到达该节点的路径和]
  const queue = [[root, root.val]];

  while (queue.length > 0) {
    const [node, sum] = queue.shift();

    // 叶子节点：检查路径和是否等于目标值
    if (node.left === null && node.right === null) {
      if (sum === targetSum) return true;  // 找到符合条件的路径
      continue;  // 继续检查其他路径
    }

    // 子节点入队，累加路径和
    if (node.left) queue.push([node.left, sum + node.left.val]);
    if (node.right) queue.push([node.right, sum + node.right.val]);
  }

  // 遍历完所有路径都没有找到
  return false;
}`,
        explanation: `## 迭代 BFS

### 思路
使用队列存储 [节点, 当前路径和]，层序遍历所有节点。

### 执行过程示例

\`\`\`
      5           targetSum = 22
     / \\
    4   8

队列变化：
初始: [[5, 5]]
取出 [5,5]: 入队 [[4,9], [8,13]]
取出 [4,9]: 入队 [[8,13], [11,20]]
...
取出 [2,22]: 叶子节点，22==22 → true
\`\`\`

### 步骤
1. 根节点和其值入队
2. 出队节点，判断是否为叶子节点
3. 若是叶子节点，检查路径和
4. 否则将子节点和更新后的路径和入队

### 特点
- 避免递归
- 可以提前返回`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代 DFS",
        animation: {
          type: "tree" as const,
          title: "路径总和 - 迭代 DFS 演示",
          steps: [
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              description: "targetSum=9。栈=[[5,4]]（节点,剩余值9-5=4）",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              highlights: [{ nodeIds: ["5"], color: "green" as const }],
              description: "弹出[5,4]，非叶子。入栈[8,-3]和[4,0]",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 4, id: "4" },
                { value: 8, id: "8" },
              ],
              highlights: [
                { nodeIds: ["5"], color: "green" as const },
                { nodeIds: ["4"], color: "yellow" as const },
              ],
              description: "弹出[4,0]（栈顶），是叶子！remaining=0，返回 true ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 路径总和 - 迭代 DFS
 *
 * 核心思想：
 * 使用栈模拟递归的深度优先遍历
 * 采用减法策略：栈中存储 [节点, 剩余目标值]
 * 到达叶子节点时检查剩余值是否为 0
 *
 * 栈元素结构：[节点, 剩余需要凑齐的值]
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 栈深度等于树高
 */
function hasPathSum(root, targetSum) {
  // 空树没有路径
  if (root === null) return false;

  // 栈存储 [节点, 到达该节点时剩余需要的值]
  const stack = [[root, targetSum - root.val]];

  while (stack.length > 0) {
    const [node, remaining] = stack.pop();

    // 叶子节点：检查剩余是否为 0
    if (node.left === null && node.right === null) {
      if (remaining === 0) return true;  // 找到符合条件的路径
      continue;  // 继续检查其他路径
    }

    // 子节点入栈，继续减去节点值
    if (node.right) stack.push([node.right, remaining - node.right.val]);
    if (node.left) stack.push([node.left, remaining - node.left.val]);
  }

  // 遍历完所有路径都没有找到
  return false;
}`,
        explanation: `## 迭代 DFS

### 思路
使用栈存储 [节点, 剩余目标值]，模拟递归过程。

### 执行过程示例

\`\`\`
      5           targetSum = 22
     / \\
    4   8
   /
  11
 / \\
7   2

栈变化：
初始: [[5, 17]]           剩余 = 22-5 = 17
弹出 [5,17]: 入栈 [[8,9], [4,13]]
弹出 [4,13]: 入栈 [[8,9], [11,2]]
弹出 [11,2]: 入栈 [[8,9], [2,0], [7,-5]]
弹出 [7,-5]: 叶子，-5≠0
弹出 [2,0]: 叶子，0==0 → true
\`\`\`

### 特点
- 使用减法，栈中存储剩余目标值
- 叶子节点时检查剩余是否为 0
- 先入右子节点，后入左子节点（保证先处理左边）`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 9. 二叉树的最近公共祖先 (236)
  {
    id: "lowest-common-ancestor",
    leetcodeId: 236,
    title: "二叉树的最近公共祖先",
    titleEn: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "最近公共祖先",
    description: `给定一个二叉树，找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为："对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。"`,
    examples: `**示例 1：**
\`\`\`
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3。
\`\`\`

**示例 2：**
\`\`\`
输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
\`\`\`

**示例 3：**
\`\`\`
输入：root = [1,2], p = 1, q = 2
输出：1
\`\`\``,
    constraints: `- 树中节点数目在范围 \`[2, 10^5]\` 内。
- \`-10^9 <= Node.val <= 10^9\`
- 所有 \`Node.val\` 互不相同。
- \`p != q\`
- \`p\` 和 \`q\` 均存在于给定的二叉树中。`,
    initialCode: `function lowestCommonAncestor(root, p, q) {
  // 在此处编写你的代码

}`,
    solution: `function lowestCommonAncestor(root, p, q) {
  // 递归终止条件：空节点或找到目标节点
  if (root === null || root === p || root === q) {
    return root;
  }

  // 在左右子树中查找
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果左右都找到了，说明当前节点是LCA
  if (left !== null && right !== null) {
    return root;
  }

  // 否则返回非空的那个
  return left !== null ? left : right;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,5,1,6,2,0,8,null,null,7,4], 5, 1],
        expected: 3
      },
      {
        id: "2",
        name: "示例2-自身祖先",
        input: [[3,5,1,6,2,0,8,null,null,7,4], 5, 4],
        expected: 5
      },
      {
        id: "3",
        name: "示例3",
        input: [[1,2], 1, 2],
        expected: 1
      }
    ],
    hints: [
      "递归在左右子树中查找p和q",
      "如果左右子树都找到了，当前节点就是LCA",
      "如果只有一边找到，LCA在那一边"
    ],
    explanation: `## 解题思路

### 递归

1. 如果当前节点是 null、p 或 q，直接返回当前节点
2. 递归在左右子树中查找 p 和 q
3. 根据返回值判断：
   - 左右都非空 → 当前节点是 LCA
   - 只有一边非空 → LCA 在那一边
   - 都为空 → 返回 null

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["path-sum", "binary-tree-maximum-path-sum"],
    solutions: [
      {
        name: "递归（推荐）",
        code: `/**
 * 二叉树的最近公共祖先 - 递归法（推荐）
 *
 * 核心思想：
 * 利用递归的后序遍历特性，自底向上查找：
 * - 如果当前节点是 p 或 q，直接返回当前节点
 * - 递归查找左右子树
 * - 根据左右子树的返回值判断 LCA 位置
 *
 * LCA 判定规则：
 * - 左右都非空 → p、q 分布在两侧，当前节点是 LCA
 * - 只有一边非空 → p、q 都在那一侧，返回那一侧的结果
 * - 都为空 → p、q 都不在当前子树中
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function lowestCommonAncestor(root, p, q) {
  // 递归终止条件：
  // 1. 空节点返回 null
  // 2. 找到 p 或 q，返回该节点（作为潜在的 LCA 或标记）
  if (root === null || root === p || root === q) {
    return root;
  }

  // 后序遍历：先递归查找左右子树
  // 在左子树中查找 p 和 q
  const left = lowestCommonAncestor(root.left, p, q);
  // 在右子树中查找 p 和 q
  const right = lowestCommonAncestor(root.right, p, q);

  // 根据左右子树的返回值判断 LCA
  // 情况1：左右都非空，说明 p 和 q 分别在左右子树中
  // 当前节点就是它们的最近公共祖先
  if (left !== null && right !== null) {
    return root;
  }

  // 情况2：只有一边非空
  // 说明 p 和 q 都在那一侧，返回非空的那个
  // （可能是 LCA，也可能是 p 或 q 本身）
  return left !== null ? left : right;
}`,
        animation: {
          type: "tree" as const,
          title: "最近公共祖先 - 递归 DFS 演示 (p=5, q=1)",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 0, id: "0" },
                { value: 8, id: "8" },
              ],
              pointers: { "3": ["root"] },
              highlights: [
                { nodeIds: ["5"], color: "blue" as const, label: "p" },
                { nodeIds: ["1"], color: "purple" as const, label: "q" },
              ],
              description: "开始：从根节点3出发，查找 p=5 和 q=1 的最近公共祖先",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 0, id: "0" },
                { value: 8, id: "8" },
              ],
              pointers: { "5": ["curr"] },
              highlights: [
                { nodeIds: ["5"], color: "green" as const, label: "找到p!" },
                { nodeIds: ["1"], color: "purple" as const, label: "q" },
              ],
              description: "递归左子树：访问节点5，发现 root === p，返回节点5",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 0, id: "0" },
                { value: 8, id: "8" },
              ],
              pointers: { "1": ["curr"] },
              highlights: [
                { nodeIds: ["5"], color: "green" as const, label: "left=5" },
                { nodeIds: ["1"], color: "green" as const, label: "找到q!" },
              ],
              description: "递归右子树：访问节点1，发现 root === q，返回节点1",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 0, id: "0" },
                { value: 8, id: "8" },
              ],
              pointers: { "3": ["LCA"] },
              highlights: [
                { nodeIds: ["5"], color: "blue" as const, label: "left非空" },
                { nodeIds: ["1"], color: "purple" as const, label: "right非空" },
                { nodeIds: ["3"], color: "green" as const, label: "LCA!" },
              ],
              description: "回到根节点3：left=5 非空，right=1 非空，说明 p、q 分布两侧",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 0, id: "0" },
                { value: 8, id: "8" },
              ],
              highlights: [
                { nodeIds: ["3"], color: "green" as const, label: "最近公共祖先" },
                { nodeIds: ["5", "1"], color: "yellow" as const, label: "p和q" },
              ],
              description: "结果：节点3是 p=5 和 q=1 的最近公共祖先，返回3",
            },
          ] as TreeStep[],
        },
        explanation: `## 递归法（推荐）

### 算法原理

利用递归的**后序遍历**特性，自底向上地查找 LCA。

### 核心逻辑

\`\`\`
递归函数的返回值含义：
- 返回 null：该子树中不含 p 也不含 q
- 返回非 null：返回的节点是 LCA，或者是 p/q 本身
\`\`\`

### 执行过程示例

\`\`\`
        3 (LCA)
       / \\
      5   1
     / \\
    6   2
       / \\
      7   4

查找 p=5, q=4 的 LCA：

1. 从根节点 3 开始
2. 递归左子树（以5为根）
   - 5 === p，返回 5
3. 递归右子树（以1为根）
   - 左右都是 null，返回 null
4. 回到节点 3：left=5, right=null
   - 返回 left = 5

最终 LCA = 5（p 本身是 q 的祖先）
\`\`\`

### 三种情况分析

| 情况 | 左子树返回 | 右子树返回 | 结论 |
|-----|----------|----------|-----|
| p、q 分布两侧 | 非空 | 非空 | 当前节点是 LCA |
| p、q 都在左侧 | 非空 | null | 返回左侧结果 |
| p、q 都在右侧 | null | 非空 | 返回右侧结果 |

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "存储父节点",
        animation: {
          type: "tree" as const,
          title: "二叉树最近公共祖先 - 存储父节点演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
              ],
              description: "查找p=5和q=1的LCA。BFS遍历构建父节点映射",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
              ],
              highlights: [{ nodeIds: ["3", "5", "1"], color: "yellow" as const }],
              description: "parent={5→3, 1→3}。从p=5向上收集祖先",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
              ],
              highlights: [{ nodeIds: ["5", "3"], color: "blue" as const, label: "p的祖先" }],
              description: "p的祖先集合: {5, 3}（包含自身）",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
              ],
              highlights: [
                { nodeIds: ["5", "3"], color: "blue" as const },
                { nodeIds: ["1"], color: "yellow" as const },
              ],
              description: "从q=1向上找：1不在集合中，继续；parent[1]=3在集合中！",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
              ],
              highlights: [{ nodeIds: ["3"], color: "green" as const, label: "LCA" }],
              description: "找到LCA=3 ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树的最近公共祖先 - 存储父节点法
 *
 * 核心思想：
 * 1. BFS 遍历整棵树，用哈希表记录每个节点的父节点
 * 2. 从 p 向上遍历到根，收集所有祖先节点
 * 3. 从 q 向上遍历，第一个在 p 祖先集合中的节点就是 LCA
 *
 * 适用场景：
 * - 需要多次查询不同 p、q 对的 LCA（预处理父节点后查询很快）
 * - 思路更直观，类似于链表找交点
 *
 * 时间复杂度：O(n) - 遍历所有节点
 * 空间复杂度：O(n) - 存储所有节点的父节点关系
 */
function lowestCommonAncestor(root, p, q) {
  // 用 Map 存储每个节点的父节点
  // key: 子节点, value: 父节点
  const parent = new Map();
  // 根节点的父节点设为 null（作为向上遍历的终止标志）
  parent.set(root, null);

  // ========== 第一步：BFS 遍历，记录父节点 ==========
  const queue = [root];
  // 遍历直到找到 p 和 q 的父节点都被记录
  while (!parent.has(p) || !parent.has(q)) {
    // 取出队首节点
    const node = queue.shift();
    // 处理左子节点：记录父子关系，加入队列
    if (node.left) {
      parent.set(node.left, node);
      queue.push(node.left);
    }
    // 处理右子节点：记录父子关系，加入队列
    if (node.right) {
      parent.set(node.right, node);
      queue.push(node.right);
    }
  }

  // ========== 第二步：收集 p 的所有祖先 ==========
  const ancestors = new Set();
  let current = p;
  // 从 p 向上遍历到根节点，收集路径上的所有节点
  while (current !== null) {
    ancestors.add(current);      // 将当前节点加入祖先集合
    current = parent.get(current); // 移动到父节点
  }

  // ========== 第三步：从 q 向上找，第一个在 p 祖先集合中的就是 LCA ==========
  current = q;
  // 不断向上，直到找到一个在 p 祖先集合中的节点
  while (!ancestors.has(current)) {
    current = parent.get(current);
  }

  // current 就是 p 和 q 的最近公共祖先
  return current;
}`,
        explanation: `## 存储父节点法

### 算法原理

把"找 LCA"转化为"两条链表找交点"问题：
1. 从 p 到根节点是一条路径
2. 从 q 到根节点是另一条路径
3. 两条路径的第一个交点就是 LCA

### 执行过程示例

\`\`\`
        3
       / \\
      5   1
     / \\   / \\
    6   2 0   8
       / \\
      7   4

查找 p=5, q=4 的 LCA：

第一步：BFS 建立父节点映射
parent = {
  3 → null,
  5 → 3,  1 → 3,
  6 → 5,  2 → 5,  0 → 1,  8 → 1,
  7 → 2,  4 → 2
}

第二步：收集 p=5 的祖先
5 → 3 → null
ancestors = {5, 3}

第三步：从 q=4 向上找
4 → 2 → 5 ✓ (5 在 ancestors 中)

LCA = 5
\`\`\`

### 与递归法对比

| 特性 | 递归法 | 存储父节点法 |
|-----|-------|------------|
| 空间 | O(h) | O(n) |
| 多次查询 | 每次 O(n) | 预处理后 O(h) |
| 代码简洁 | 更简洁 | 较长 |
| 思路 | 抽象 | 直观 |

### 复杂度
- 时间：O(n)，遍历所有节点建立映射
- 空间：O(n)，存储所有节点的父节点关系`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 10. 二叉树中的最大路径和 (124)
  {
    id: "binary-tree-maximum-path-sum",
    leetcodeId: 124,
    title: "二叉树中的最大路径和",
    titleEn: "Binary Tree Maximum Path Sum",
    difficulty: "hard",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "动态规划", "二叉树"],
    frontendRelevance: "low",
    frontendNote: "最大路径和Hard",
    description: `二叉树中的 **路径** 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 **至多出现一次**。该路径 **至少包含一个** 节点，且不一定经过根节点。

**路径和** 是路径中各节点值的总和。

给你一个二叉树的根节点 \`root\`，返回其 **最大路径和**。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
\`\`\`

**示例 2：**
\`\`\`
输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
\`\`\``,
    constraints: `- 树中节点数目范围是 \`[1, 3 * 10^4]\`
- \`-1000 <= Node.val <= 1000\``,
    initialCode: `function maxPathSum(root) {
  // 在此处编写你的代码

}`,
    solution: `function maxPathSum(root) {
  let maxSum = -Infinity;

  const maxGain = (node) => {
    if (node === null) return 0;

    // 递归计算左右子树的最大贡献值（负数贡献为0）
    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    // 经过当前节点的最大路径和
    const pathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathSum);

    // 返回当前节点的最大贡献值（只能选一边）
    return node.val + Math.max(leftGain, rightGain);
  };

  maxGain(root);
  return maxSum;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,3]],
        expected: 6
      },
      {
        id: "2",
        name: "示例2",
        input: [[-10,9,20,null,null,15,7]],
        expected: 42
      },
      {
        id: "3",
        name: "单节点负数",
        input: [[-3]],
        expected: -3
      }
    ],
    hints: [
      "对于每个节点，计算经过它的最大路径和",
      "节点的贡献值 = 节点值 + max(左子树贡献, 右子树贡献)",
      "负数贡献可以不选（贡献为0）",
      "全局维护最大路径和"
    ],
    explanation: `## 解题思路

### 递归 + 全局变量

对于每个节点，需要计算两个值：
1. **经过该节点的最大路径和**：左贡献 + 节点值 + 右贡献
2. **该节点对父节点的最大贡献**：节点值 + max(左贡献, 右贡献)

关键点：
- 负数贡献不如不选，设为 0
- 路径可以"拐弯"，但返回给父节点的贡献只能选一边

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["path-sum", "lowest-common-ancestor"],
    solutions: [
      {
        name: "递归 + 全局变量（推荐）",
        code: `/**
 * 二叉树中的最大路径和 - 递归 + 全局变量（推荐）
 *
 * 核心思想：
 * 对于每个节点，需要区分两个概念：
 * 1. 贡献值：节点能向父节点贡献的最大路径和（只能选一边）
 * 2. 路径和：经过节点的完整路径和（可以同时包含左右子树）
 *
 * 关键理解：
 * - 路径可以"拐弯"（从左子树经过当前节点到右子树）
 * - 但向上返回时只能选一边（路径不能分叉）
 * - 负贡献不如不选，设为 0
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function maxPathSum(root) {
  // 全局变量记录最大路径和
  // 初始化为负无穷，因为节点值可能为负
  let maxSum = -Infinity;

  /**
   * 计算节点的最大贡献值
   * @param node 当前节点
   * @returns 当前节点能向父节点贡献的最大值
   */
  const maxGain = (node) => {
    // 空节点贡献为 0
    if (node === null) return 0;

    // 递归计算左右子树的最大贡献值
    // 关键：如果贡献值为负数，不如不选（取 0）
    const leftGain = Math.max(maxGain(node.left), 0);   // 左子树贡献
    const rightGain = Math.max(maxGain(node.right), 0); // 右子树贡献

    // 计算经过当前节点的最大路径和
    // 这条路径可以"拐弯"：左子树 -> 当前节点 -> 右子树
    const pathSum = node.val + leftGain + rightGain;
    // 更新全局最大路径和
    maxSum = Math.max(maxSum, pathSum);

    // 返回当前节点的最大贡献值
    // 只能选择一边：要么走左边，要么走右边（路径不能分叉）
    return node.val + Math.max(leftGain, rightGain);
  };

  // 启动递归
  maxGain(root);
  // 返回全局最大路径和
  return maxSum;
}`,
        explanation: `## 递归 + 全局变量（推荐）

### 核心概念

\`\`\`
区分两个值：
┌─────────────┬────────────────────────────────┐
│ 贡献值       │ 节点向父节点提供的最大路径和    │
│             │ = 节点值 + max(左贡献, 右贡献)  │
├─────────────┼────────────────────────────────┤
│ 路径和       │ 经过节点的完整路径和            │
│             │ = 左贡献 + 节点值 + 右贡献      │
└─────────────┴────────────────────────────────┘
\`\`\`

### 为什么贡献值只能选一边？

\`\`\`
路径是一条线，不能分叉：

正确 ✓         错误 ✗
  1              1
 /              / \\
2              2   3

从父节点看，只能从左边来或右边来，不能同时
\`\`\`

### 执行过程示例

\`\`\`
    -10
    /  \\
   9   20
      /  \\
     15   7

递归过程：
1. 节点 9：贡献=9, 路径=9, maxSum=9
2. 节点 15：贡献=15, 路径=15, maxSum=15
3. 节点 7：贡献=7, 路径=7, maxSum=15
4. 节点 20：
   - leftGain=15, rightGain=7
   - 贡献=20+15=35
   - 路径=15+20+7=42, maxSum=42 ✓
5. 节点 -10：
   - leftGain=9, rightGain=35
   - 贡献=-10+35=25
   - 路径=9+(-10)+35=34, maxSum=42

最终结果：42
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        animation: {
          type: "tree" as const,
          title: "二叉树最大路径和演示",
          steps: [
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              description: "树: [-10,9,20,null,null,15,7]。找最大路径和。路径可以拐弯但不能分叉",
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["9"], color: "yellow" as const }],
              description: "节点9: 无子节点。贡献=9，路径和=9。maxSum=9",
              visitPath: ["9"],
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["15"], color: "yellow" as const }],
              description: "节点15: 无子节点。贡献=15，路径和=15。maxSum=15",
              visitPath: ["15"],
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["7"], color: "yellow" as const }],
              description: "节点7: 无子节点。贡献=7，路径和=7。maxSum=15",
              visitPath: ["7"],
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["20"], color: "yellow" as const },
                { nodeIds: ["15", "7"], color: "blue" as const },
              ],
              description: "节点20: 左贡献=15，右贡献=7。贡献=20+15=35。路径和=15+20+7=42。maxSum=42 ✓",
              visitPath: ["15", "20", "7"],
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["15", "20", "7"], color: "green" as const, label: "最大路径" }],
              description: "最大路径: 15→20→7，和=42。注意-10贡献为负，不选入最优路径",
              visitPath: ["15", "20", "7"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "递归（返回数组）",
        animation: {
          type: "tree" as const,
          title: "二叉树最大路径和 - 递归（返回数组）演示",
          steps: [
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              description: "递归函数返回[贡献值, 子树最大路径和]",
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              highlights: [{ nodeIds: ["9"], color: "yellow" as const }],
              description: "dfs(9)：叶节点，返回[9, 9]",
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              highlights: [{ nodeIds: ["9"], color: "green" as const }, { nodeIds: ["20"], color: "yellow" as const }],
              description: "dfs(20)：假设左=15,右=7。贡献=35，路径和=42。返回[35, 42]",
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              highlights: [{ nodeIds: ["r"], color: "yellow" as const }],
              description: "dfs(-10)：左贡献max(9,0)=9，右贡献max(35,0)=35。路径=-10+9+35=34",
            },
            {
              nodes: [
                { value: -10, id: "r" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
              ],
              highlights: [{ nodeIds: ["20"], color: "green" as const, label: "最大=42" }],
              description: "dfs(-10)返回[25, max(34,9,42)]=[ 25, 42]。最大路径和=42",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 二叉树中的最大路径和 - 递归（返回数组）
 *
 * 核心思想：
 * 不使用全局变量，而是让递归函数返回两个值：
 * 1. 当前节点的最大贡献值（向上传递）
 * 2. 当前子树的最大路径和（答案的候选）
 *
 * 函数式编程风格：
 * - 纯函数，无副作用
 * - 所有信息通过返回值传递
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function maxPathSum(root) {
  /**
   * 深度优先遍历
   * @param node 当前节点
   * @returns [贡献值, 子树最大路径和]
   */
  const dfs = (node) => {
    // 空节点：贡献为 0，最大路径和为负无穷（不影响比较）
    if (node === null) return [0, -Infinity];

    // 递归处理左右子树，获取贡献值和子树最大路径和
    const [leftGain, leftMax] = dfs(node.left);   // 左子树结果
    const [rightGain, rightMax] = dfs(node.right); // 右子树结果

    // 负贡献不如不选，取 0
    const left = Math.max(leftGain, 0);   // 左子树有效贡献
    const right = Math.max(rightGain, 0); // 右子树有效贡献

    // 计算经过当前节点的路径和
    // 路径可以"拐弯"：左 -> 当前 -> 右
    const currentPath = node.val + left + right;

    // 当前子树的最大路径和
    // 取三者最大值：经过当前节点的路径、左子树最大、右子树最大
    const currentMax = Math.max(currentPath, leftMax, rightMax);

    // 返回：[当前节点贡献值, 当前子树最大路径和]
    // 贡献值只能选一边（路径不能分叉）
    return [node.val + Math.max(left, right), currentMax];
  };

  // 返回整棵树的最大路径和（dfs 返回数组的第二个元素）
  return dfs(root)[1];
}`,
        explanation: `## 递归（返回数组）- 函数式风格

### 算法原理

让递归函数返回一个数组，包含两个信息：
\`\`\`
返回值：[贡献值, 子树最大路径和]

贡献值：向上传递，用于计算父节点的路径
最大路径和：向上传递，用于比较得出最终答案
\`\`\`

### 与全局变量方法对比

| 特性 | 全局变量 | 返回数组 |
|-----|---------|---------|
| 副作用 | 有 | 无 |
| 代码风格 | 命令式 | 函数式 |
| 可读性 | 更直观 | 稍复杂 |
| 可测试性 | 一般 | 更好 |

### 执行过程示例

\`\`\`
    -10
    /  \\
   9   20
      /  \\
     15   7

dfs(9)  = [9, 9]
dfs(15) = [15, 15]
dfs(7)  = [7, 7]
dfs(20) = [35, max(42, 15, 7)] = [35, 42]
dfs(-10)= [25, max(34, 9, 42)] = [25, 42]

最终返回 dfs(root)[1] = 42
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 11. 验证二叉搜索树 (98)
  {
    id: "validate-binary-search-tree",
    leetcodeId: 98,
    title: "验证二叉搜索树",
    titleEn: "Validate Binary Search Tree",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "二叉搜索树", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "BST验证",
    description: `给你一个二叉树的根节点 \`root\`，判断其是否是一个有效的二叉搜索树。

**有效** 二叉搜索树定义如下：

- 节点的左子树只包含 **小于** 当前节点的数。
- 节点的右子树只包含 **大于** 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [2,1,3]
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
\`\`\``,
    constraints: `- 树中节点数目范围在 \`[1, 10^4]\` 内
- \`-2^31 <= Node.val <= 2^31 - 1\``,
    initialCode: `function isValidBST(root) {
  // 在此处编写你的代码

}`,
    solution: `function isValidBST(root) {
  const validate = (node, min, max) => {
    if (node === null) return true;

    // 检查当前节点值是否在有效范围内
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // 递归验证左右子树
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  };

  return validate(root, -Infinity, Infinity);
}`,
    testCases: [
      {
        id: "1",
        name: "有效BST",
        input: [[2,1,3]],
        expected: true
      },
      {
        id: "2",
        name: "无效BST",
        input: [[5,1,4,null,null,3,6]],
        expected: false
      },
      {
        id: "3",
        name: "单节点",
        input: [[1]],
        expected: true
      }
    ],
    hints: [
      "不能只比较父子节点，需要维护整个子树的取值范围",
      "左子树所有节点 < 根节点 < 右子树所有节点",
      "递归时传递允许的最小值和最大值"
    ],
    explanation: `## 解题思路

### 递归 + 范围验证

维护每个节点的有效取值范围 (min, max)：
1. 根节点范围：(-∞, +∞)
2. 左子节点范围：(min, 父节点值)
3. 右子节点范围：(父节点值, max)

如果节点值不在范围内，返回 false。

### 中序遍历法

BST 的中序遍历是严格递增的，遍历时检查是否满足递增性。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["kth-smallest-element-in-bst", "binary-tree-level-order-traversal"],
    solutions: [
      {
        name: "递归 + 范围验证（推荐）",
        code: `/**
 * 验证二叉搜索树 - 递归 + 范围验证（推荐）
 *
 * 核心思想：
 * 利用 BST 的定义，每个节点都有一个有效的取值范围：
 * - 根节点范围：(-∞, +∞)
 * - 左子节点范围：(min, 父节点值) - 必须小于父节点
 * - 右子节点范围：(父节点值, max) - 必须大于父节点
 *
 * 关键理解：
 * 不能只比较父子节点！右子树的所有节点都必须大于根节点。
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function isValidBST(root) {
  /**
   * 验证节点是否在有效范围内
   * @param node 当前节点
   * @param min 允许的最小值（不包含）
   * @param max 允许的最大值（不包含）
   * @returns 是否有效
   */
  const validate = (node, min, max) => {
    // 空节点视为有效
    if (node === null) return true;

    // 检查当前节点值是否在有效范围 (min, max) 内
    // 注意：BST 不允许重复值，所以是严格不等号
    if (node.val <= min || node.val >= max) {
      return false;
    }

    // 递归验证子树
    // 左子树：范围变为 (min, node.val)
    // 右子树：范围变为 (node.val, max)
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  };

  // 从根节点开始，初始范围为 (-∞, +∞)
  return validate(root, -Infinity, Infinity);
}`,
        explanation: `## 递归 + 范围验证（推荐）

### 为什么不能只比较父子节点？

\`\`\`
错误的 BST（只看父子关系似乎正确）：
      5
     / \\
    1   6
       / \\
      3   7  ← 3 < 5，但在右子树中！

正确判断：3 应该在 (5, 6) 范围内，但 3 < 5，无效！
\`\`\`

### 范围传递过程

\`\`\`
      5 (−∞, +∞)
     / \\
    1   6
(−∞,5) (5,+∞)

验证节点 1：在 (−∞, 5) 内 ✓
验证节点 6：在 (5, +∞) 内 ✓

      5
     / \\
    1   6 (5,+∞)
       / \\
      3   7
   (5,6) (6,+∞)

验证节点 3：应在 (5, 6) 内，但 3 < 5 ✗
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        animation: {
          type: "tree" as const,
          title: "验证二叉搜索树演示",
          steps: [
            {
              nodes: [
                { value: 5, id: "n5" },
                { value: 1, id: "n1" },
                { value: 6, id: "n6" },
                null,
                null,
                { value: 3, id: "n3" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n5"], color: "blue" as const }],
              description: "验证这棵树是否是有效的 BST。从根节点 5 开始，初始范围 (-∞, +∞)",
            },
            {
              nodes: [
                { value: 5, id: "n5" },
                { value: 1, id: "n1" },
                { value: 6, id: "n6" },
                null,
                null,
                { value: 3, id: "n3" },
                { value: 7, id: "n7" },
              ],
              highlights: [
                { nodeIds: ["n5"], color: "green" as const },
                { nodeIds: ["n1"], color: "blue" as const },
              ],
              pointers: { n5: ["(-∞,+∞)"] },
              description: "节点 5 在 (-∞, +∞) 范围内 ✓。检查左子节点 1，范围变为 (-∞, 5)",
            },
            {
              nodes: [
                { value: 5, id: "n5" },
                { value: 1, id: "n1" },
                { value: 6, id: "n6" },
                null,
                null,
                { value: 3, id: "n3" },
                { value: 7, id: "n7" },
              ],
              highlights: [
                { nodeIds: ["n5", "n1"], color: "green" as const },
                { nodeIds: ["n6"], color: "blue" as const },
              ],
              pointers: { n1: ["(-∞,5)"] },
              description: "节点 1 在 (-∞, 5) 范围内 ✓。检查右子节点 6，范围变为 (5, +∞)",
            },
            {
              nodes: [
                { value: 5, id: "n5" },
                { value: 1, id: "n1" },
                { value: 6, id: "n6" },
                null,
                null,
                { value: 3, id: "n3" },
                { value: 7, id: "n7" },
              ],
              highlights: [
                { nodeIds: ["n5", "n1", "n6"], color: "green" as const },
                { nodeIds: ["n3"], color: "blue" as const },
              ],
              pointers: { n6: ["(5,+∞)"] },
              description: "节点 6 在 (5, +∞) 范围内 ✓。检查 6 的左子节点 3，范围变为 (5, 6)",
            },
            {
              nodes: [
                { value: 5, id: "n5" },
                { value: 1, id: "n1" },
                { value: 6, id: "n6" },
                null,
                null,
                { value: 3, id: "n3" },
                { value: 7, id: "n7" },
              ],
              highlights: [
                { nodeIds: ["n5", "n1", "n6"], color: "green" as const },
                { nodeIds: ["n3"], color: "red" as const },
              ],
              pointers: { n3: ["(5,6)?"] },
              description: "节点 3 应在 (5, 6) 范围内，但 3 < 5 ✗ 违反 BST 性质！",
            },
            {
              nodes: [
                { value: 5, id: "n5" },
                { value: 1, id: "n1" },
                { value: 6, id: "n6" },
                null,
                null,
                { value: 3, id: "n3" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n3"], color: "red" as const }],
              description: "发现无效节点！节点 3 在右子树中但小于根节点 5。返回 false，这不是有效的 BST",
            },
            {
              nodes: [
                { value: 2, id: "r2" },
                { value: 1, id: "r1" },
                { value: 3, id: "r3" },
              ],
              highlights: [{ nodeIds: ["r2"], color: "blue" as const }],
              description: "对比：这是一个有效的 BST [2,1,3]。验证根节点 2，范围 (-∞, +∞)",
            },
            {
              nodes: [
                { value: 2, id: "r2" },
                { value: 1, id: "r1" },
                { value: 3, id: "r3" },
              ],
              highlights: [
                { nodeIds: ["r2"], color: "green" as const },
                { nodeIds: ["r1"], color: "blue" as const },
              ],
              description: "节点 2 有效 ✓。左子节点 1 在 (-∞, 2) 范围内 ✓",
            },
            {
              nodes: [
                { value: 2, id: "r2" },
                { value: 1, id: "r1" },
                { value: 3, id: "r3" },
              ],
              highlights: [
                { nodeIds: ["r2", "r1"], color: "green" as const },
                { nodeIds: ["r3"], color: "blue" as const },
              ],
              description: "右子节点 3 在 (2, +∞) 范围内 ✓。所有节点都满足范围约束",
            },
            {
              nodes: [
                { value: 2, id: "r2" },
                { value: 1, id: "r1" },
                { value: 3, id: "r3" },
              ],
              highlights: [{ nodeIds: ["r2", "r1", "r3"], color: "green" as const }],
              description: "验证完成！[2,1,3] 是有效的 BST。返回 true",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "中序遍历",
        animation: {
          type: "tree" as const,
          title: "验证 BST - 中序遍历演示",
          steps: [
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              description: "中序遍历 BST 应该是严格递增的。prev=-∞",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "中序：先访问左子树。节点1：1>prev(-∞) ✓ prev=1",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "green" as const }, { nodeIds: ["2"], color: "yellow" as const }],
              description: "访问根节点2：2>prev(1) ✓ prev=2",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const }, { nodeIds: ["3"], color: "yellow" as const }],
              description: "访问右子树3：3>prev(2) ✓ prev=3",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3"], color: "green" as const }],
              description: "中序序列[1,2,3]严格递增，是有效 BST ✓",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 验证二叉搜索树 - 递归中序遍历
 *
 * 核心思想：
 * BST 的中序遍历结果是严格递增的！
 * 利用这个性质，在遍历过程中检查当前节点是否大于前一个节点。
 *
 * 中序遍历顺序：左子树 → 根节点 → 右子树
 * 对于 BST：小的先访问，大的后访问 → 严格递增
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function isValidBST(root) {
  // 用于记录中序遍历中前一个访问的节点值
  // 初始化为负无穷，确保第一个节点总是有效
  let prev = -Infinity;

  /**
   * 中序遍历并验证递增性
   * @param node 当前节点
   * @returns 是否有效
   */
  const inorder = (node) => {
    // 空节点视为有效
    if (node === null) return true;

    // 第一步：递归遍历左子树
    // 如果左子树无效，整棵树无效
    if (!inorder(node.left)) return false;

    // 第二步：处理当前节点
    // 检查当前节点值是否严格大于前一个值
    if (node.val <= prev) return false;
    // 更新 prev 为当前节点值
    prev = node.val;

    // 第三步：递归遍历右子树
    return inorder(node.right);
  };

  return inorder(root);
}`,
        explanation: `## 递归中序遍历

### 算法原理

BST 的中序遍历结果是严格递增的：
\`\`\`
      4
     / \\
    2   6
   / \\ / \\
  1  3 5  7

中序遍历：1 → 2 → 3 → 4 → 5 → 6 → 7
         严格递增！
\`\`\`

### 验证思路

在遍历过程中，只需检查当前节点是否大于前一个节点：
\`\`\`
prev = -∞
访问 1：1 > -∞ ✓，prev = 1
访问 2：2 > 1  ✓，prev = 2
访问 3：3 > 2  ✓，prev = 3
...
\`\`\`

### 无效 BST 示例

\`\`\`
      5
     / \\
    4   6
       / \\
      3   7

中序遍历：4 → 5 → 3 → 6 → 7
                 ↑
              3 < 5，不递增！
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代中序遍历",
        animation: {
          type: "tree" as const,
          title: "验证 BST - 迭代中序遍历演示",
          steps: [
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              description: "用栈模拟中序遍历。curr=2，一直向左入栈",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["2", "1"], color: "blue" as const, label: "栈" }],
              description: "入栈2，入栈1，curr=null。栈=[2,1]",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "弹出1，检查1>prev(-∞) ✓ prev=1，转向右子树(null)",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "green" as const }, { nodeIds: ["2"], color: "yellow" as const }],
              description: "弹出2，检查2>prev(1) ✓ prev=2，转向右子树3",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const }, { nodeIds: ["3"], color: "yellow" as const }],
              description: "入栈3，弹出3，检查3>prev(2) ✓ 是有效BST！",
            },
          ] as TreeStep[],
        },
        code: `/**
 * 验证二叉搜索树 - 迭代中序遍历
 *
 * 核心思想：
 * 使用栈模拟递归的中序遍历过程，同时检查递增性。
 *
 * 迭代中序遍历模板：
 * 1. 一直向左走，入栈（模拟递归调用）
 * 2. 弹出节点，处理（访问节点）
 * 3. 转向右子树（继续遍历）
 *
 * 优点：避免递归，可以随时终止遍历
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 栈的最大深度，h 为树高
 */
function isValidBST(root) {
  // 显式栈，模拟递归调用栈
  const stack = [];
  // 前一个访问的节点值
  let prev = -Infinity;
  // 当前指针
  let current = root;

  // 只要还有节点未处理（当前节点非空或栈非空）
  while (current !== null || stack.length > 0) {
    // ========== 阶段1：一直向左走，入栈 ==========
    // 模拟递归调用 inorder(node.left)
    while (current !== null) {
      stack.push(current);  // 记住当前节点
      current = current.left; // 转向左子节点
    }

    // ========== 阶段2：弹出节点，处理 ==========
    current = stack.pop(); // 回到最近的未处理节点

    // 检查是否严格大于前一个值
    if (current.val <= prev) return false;
    // 更新前一个值
    prev = current.val;

    // ========== 阶段3：转向右子树 ==========
    // 下一轮循环会处理右子树
    current = current.right;
  }

  // 所有节点都满足递增性
  return true;
}`,
        explanation: `## 迭代中序遍历

### 算法原理

使用栈模拟递归的中序遍历过程：
\`\`\`
递归版本：                  迭代版本：
inorder(node):             while (...):
  inorder(left)    →         一直向左，入栈
  visit(node)      →         弹出，处理
  inorder(right)   →         转向右子树
\`\`\`

### 执行过程示例

\`\`\`
      4
     / \\
    2   6

步骤：
1. 向左入栈：[4, 2]
2. 弹出 2，prev=2，转向右
3. 右为空，弹出 4，4>2 ✓，prev=4，转向右
4. 向左入栈：[6]
5. 弹出 6，6>4 ✓，prev=6，转向右
6. 栈空，结束，返回 true
\`\`\`

### 迭代 vs 递归

| 特性 | 递归 | 迭代 |
|-----|------|-----|
| 代码简洁 | 更简洁 | 较复杂 |
| 控制灵活 | 一般 | 可随时中断 |
| 栈溢出风险 | 有 | 无 |
| 理解难度 | 容易 | 需要理解模板 |

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，栈的最大深度`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 12. 二叉搜索树中第K小的元素 (230)
  {
    id: "kth-smallest-element-in-bst",
    leetcodeId: 230,
    title: "二叉搜索树中第K小的元素",
    titleEn: "Kth Smallest Element in a BST",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "二叉搜索树", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "BST第K小",
    description: `给定一个二叉搜索树的根节点 \`root\`，和一个整数 \`k\`，请你设计一个算法查找其中第 \`k\` 小的元素（从 1 开始计数）。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [3,1,4,null,2], k = 1
输出：1
\`\`\`

**示例 2：**
\`\`\`
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
\`\`\``,
    constraints: `- 树中的节点数为 \`n\`。
- \`1 <= k <= n <= 10^4\`
- \`0 <= Node.val <= 10^4\`

**进阶：** 如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？`,
    initialCode: `function kthSmallest(root, k) {
  // 在此处编写你的代码

}`,
    solution: `function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  const inorder = (node) => {
    if (node === null || result !== null) return;

    // 遍历左子树
    inorder(node.left);

    // 处理当前节点
    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    // 遍历右子树
    inorder(node.right);
  };

  inorder(root);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,1,4,null,2], 1],
        expected: 1
      },
      {
        id: "2",
        name: "示例2",
        input: [[5,3,6,2,4,null,null,1], 3],
        expected: 3
      }
    ],
    hints: [
      "BST的中序遍历是升序的",
      "中序遍历到第k个节点就是答案",
      "可以提前终止遍历以优化"
    ],
    explanation: `## 解题思路

### 中序遍历

BST 的中序遍历结果是升序排列的，第 k 个访问的节点就是第 k 小的元素。

**优化：** 找到答案后提前终止遍历。

### 复杂度分析
- 时间复杂度：O(H + k)，H 是树高
- 空间复杂度：O(H)，递归栈深度`,
    timeComplexity: "O(H + k)",
    spaceComplexity: "O(H)",
    relatedProblems: ["validate-binary-search-tree", "binary-tree-level-order-traversal"],
    solutions: [
      {
        name: "中序遍历（推荐）",
        code: `/**
 * 二叉搜索树中第K小的元素 - 递归中序遍历（推荐）
 *
 * 核心思想：
 * BST 的中序遍历结果是升序排列的！
 * 利用这个性质，中序遍历时计数到第 k 个节点就是答案。
 *
 * 优化：找到答案后提前终止遍历，不遍历剩余节点。
 *
 * 时间复杂度：O(H + k) - H 是到达最左节点的深度
 * 空间复杂度：O(H) - 递归栈深度
 */
function kthSmallest(root, k) {
  // 计数器：记录已访问的节点数
  let count = 0;
  // 结果：找到的第 k 小的值
  let result = null;

  /**
   * 中序遍历：左 → 根 → 右
   * @param node 当前节点
   */
  const inorder = (node) => {
    // 递归终止条件：
    // 1. 节点为空
    // 2. 已经找到答案（提前终止优化）
    if (node === null || result !== null) return;

    // 第一步：遍历左子树（访问较小的值）
    inorder(node.left);

    // 第二步：处理当前节点
    count++; // 计数加一
    if (count === k) {
      // 找到第 k 小的元素！
      result = node.val;
      return; // 提前终止
    }

    // 第三步：遍历右子树（访问较大的值）
    inorder(node.right);
  };

  // 启动中序遍历
  inorder(root);
  return result;
}`,
        explanation: `## 递归中序遍历（推荐）

### 算法原理

BST 的中序遍历产生升序序列：
\`\`\`
      5
     / \\
    3   6
   / \\
  2   4
 /
1

中序遍历：1 → 2 → 3 → 4 → 5 → 6
         ↑   ↑   ↑
        k=1 k=2 k=3
\`\`\`

### 执行过程示例

\`\`\`
查找 k=3（第3小）：

1. 递归到最左 1，count=1
2. 回到 2，count=2
3. 回到 3，count=3 === k，result=3 ✓
4. 提前终止，不再遍历 4, 5, 6
\`\`\`

### 提前终止优化

通过检查 \`result !== null\` 实现提前终止：
- 找到答案后，后续递归调用立即返回
- 避免遍历整棵树

### 复杂度
- 时间：O(H + k)，H 是到最左节点的深度
- 空间：O(H)，递归栈深度`,
        animation: {
          type: "tree" as const,
          title: "BST第K小元素 - 中序遍历演示",
          steps: [
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 4, id: "4" },
              ],
              description: "BST: [5,3,6,2,4]，找第k=3小的元素。BST中序遍历是升序的",
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 4, id: "4" },
              ],
              highlights: [{ nodeIds: ["2"], color: "yellow" as const }],
              description: "递归到最左节点2。count=1。k=3，继续遍历",
              visitPath: ["2"],
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 4, id: "4" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "blue" as const },
                { nodeIds: ["3"], color: "yellow" as const },
              ],
              description: "回到节点3。count=2。k=3，继续遍历",
              visitPath: ["2", "3"],
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 4, id: "4" },
              ],
              highlights: [
                { nodeIds: ["2", "3"], color: "blue" as const },
                { nodeIds: ["4"], color: "green" as const, label: "第3小" },
              ],
              description: "访问节点4。count=3=k。找到答案！result=4，提前终止",
              visitPath: ["2", "3", "4"],
            },
            {
              nodes: [
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 6, id: "6" },
                { value: 2, id: "2" },
                { value: 4, id: "4" },
              ],
              highlights: [{ nodeIds: ["4"], color: "green" as const, label: "答案" }],
              description: "中序遍历: 2→3→4→...。第3个元素是4。无需遍历5和6",
              visitPath: ["2", "3", "4"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(H + k)",
        spaceComplexity: "O(H)",
      },
      {
        name: "迭代中序遍历",
        code: `/**
 * 二叉搜索树中第K小的元素 - 迭代中序遍历
 *
 * 核心思想：
 * 使用栈模拟递归的中序遍历，计数到第 k 个节点时立即返回。
 *
 * 迭代中序遍历模板：
 * 1. 一直向左走，入栈
 * 2. 弹出节点，处理
 * 3. 转向右子树
 *
 * 优点：找到答案立即返回，无需遍历整棵树
 *
 * 时间复杂度：O(H + k) - H 是到最左节点的深度
 * 空间复杂度：O(H) - 栈的最大深度
 */
function kthSmallest(root, k) {
  // 显式栈，模拟递归调用栈
  const stack = [];
  // 当前访问的节点
  let current = root;
  // 已访问的节点计数
  let count = 0;

  // 只要还有节点未处理
  while (current !== null || stack.length > 0) {
    // ========== 阶段1：一直向左走，入栈 ==========
    // 先访问左子树（较小的值）
    while (current !== null) {
      stack.push(current);    // 记住当前节点
      current = current.left; // 移动到左子节点
    }

    // ========== 阶段2：弹出节点，处理 ==========
    current = stack.pop(); // 取出最近的未处理节点
    count++;               // 计数加一

    // 检查是否找到第 k 小
    if (count === k) return current.val;

    // ========== 阶段3：转向右子树 ==========
    // 下一轮循环处理右子树（较大的值）
    current = current.right;
  }

  // 正常情况下不会到达这里（题目保证 k 有效）
  return -1;
}`,
        explanation: `## 迭代中序遍历

### 算法原理

使用栈模拟递归调用：
\`\`\`
递归：                    迭代：
inorder(left)     →      一直向左，入栈
visit(node)       →      弹出，处理
inorder(right)    →      转向右子树
\`\`\`

### 执行过程示例

\`\`\`
      3
     / \\
    1   4
     \\
      2

查找 k=2：

步骤1：向左入栈 [3, 1]
步骤2：弹出 1，count=1，转向右（节点2）
步骤3：向左入栈 [3, 2]（2 没有左子节点）
步骤4：弹出 2，count=2 === k，返回 2 ✓
\`\`\`

### 与递归方法对比

| 特性 | 递归 | 迭代 |
|-----|------|-----|
| 代码简洁 | 更简洁 | 稍复杂 |
| 控制灵活 | 提前终止需检查 | 直接 return |
| 栈溢出 | 可能（深树） | 不会 |

### 复杂度
- 时间：O(H + k)
- 空间：O(H)，栈的最大深度`,
        timeComplexity: "O(H + k)",
        spaceComplexity: "O(H)",
      },
      {
        name: "记录子树大小",
        code: `/**
 * 二叉搜索树中第K小的元素 - 记录子树大小（进阶）
 *
 * 核心思想：
 * 利用 BST 的性质，通过比较 k 和左子树节点数来决定搜索方向：
 * - k === leftCount + 1：当前节点就是第 k 小
 * - k <= leftCount：答案在左子树
 * - k > leftCount + 1：答案在右子树，是右子树的第 (k-leftCount-1) 小
 *
 * 进阶优化：
 * 如果需要频繁查询，可以在每个节点存储子树大小，
 * 这样单次查询时间复杂度降为 O(H)。
 *
 * 时间复杂度：O(n) - 首次需要计算所有子树大小
 * 空间复杂度：O(H) - 递归栈深度
 */
function kthSmallest(root, k) {
  /**
   * 计算以 node 为根的子树的节点总数
   * @param node 子树根节点
   * @returns 节点数量
   */
  const countNodes = (node) => {
    if (node === null) return 0;
    // 节点数 = 1（自己）+ 左子树节点数 + 右子树节点数
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  /**
   * 在以 node 为根的 BST 中查找第 k 小的元素
   * @param node 当前子树根节点
   * @param k 要找第 k 小
   * @returns 第 k 小的值
   */
  const find = (node, k) => {
    // 计算左子树的节点数
    const leftCount = countNodes(node.left);

    if (k === leftCount + 1) {
      // 情况1：当前节点正好是第 k 小
      // 左子树有 leftCount 个节点，都比当前节点小
      // 当前节点是第 (leftCount + 1) 小
      return node.val;
    } else if (k <= leftCount) {
      // 情况2：第 k 小在左子树中
      // k 小于等于左子树节点数，答案一定在左子树
      return find(node.left, k);
    } else {
      // 情况3：第 k 小在右子树中
      // 排除左子树 leftCount 个和当前节点 1 个
      // 在右子树中找第 (k - leftCount - 1) 小
      return find(node.right, k - leftCount - 1);
    }
  };

  return find(root, k);
}`,
        explanation: `## 记录子树大小（进阶方法）

### 算法原理

利用 BST 性质进行二分查找：
\`\`\`
      5 (节点数=6)
     / \\
    3   6
   / \\
  2   4
 /
1

左子树节点数 = 4
右子树节点数 = 1

若 k=3：3 ≤ 4，答案在左子树
若 k=5：5 > 4+1，答案在右子树，找第 5-4-1=0...
等等，5=4+1，所以节点 5 就是答案！
\`\`\`

### 决策逻辑

\`\`\`
设 leftCount = 左子树节点数

┌───────────────────┬────────────────────────┐
│ k = leftCount + 1 │ 当前节点就是第 k 小     │
├───────────────────┼────────────────────────┤
│ k ≤ leftCount     │ 在左子树中找第 k 小     │
├───────────────────┼────────────────────────┤
│ k > leftCount + 1 │ 在右子树中找第           │
│                   │ (k-leftCount-1) 小      │
└───────────────────┴────────────────────────┘
\`\`\`

### 进阶优化

如果需要频繁查询不同的 k：
- 预处理：在每个节点存储子树大小
- 查询时间：O(H) 而不是 O(n)
- 适合场景：树结构稳定，多次查询

### 复杂度
- 时间：O(n) 首次，O(H) 后续（如果缓存子树大小）
- 空间：O(H)，递归栈深度`,
        timeComplexity: "O(n) 首次，O(H) 后续",
        spaceComplexity: "O(H)",
      },
    ],
  },

  // 13. 二叉树的中序遍历 (94)
  {
    id: "binary-tree-inorder-traversal",
    leetcodeId: 94,
    title: "二叉树的中序遍历",
    titleEn: "Binary Tree Inorder Traversal",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "栈", "二叉树"],
    frontendRelevance: "high",
    frontendNote: "树遍历基础，DOM操作思维",
    description: `给定一个二叉树的根节点 \`root\`，返回它的 **中序** 遍历。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,null,2,3]
输出：[1,3,2]
\`\`\`

**示例 2：**
\`\`\`
输入：root = []
输出：[]
\`\`\`

**示例 3：**
\`\`\`
输入：root = [1]
输出：[1]
\`\`\``,
    constraints: `- 树中节点数目在范围 \`[0, 100]\` 内
- \`-100 <= Node.val <= 100\`

**进阶：** 递归算法很简单，你可以通过迭代算法完成吗？`,
    initialCode: `function inorderTraversal(root) {
  // 在此处编写你的代码

}`,
    solution: `function inorderTraversal(root) {
  const result = [];

  const inorder = (node) => {
    if (node === null) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  };

  inorder(root);
  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,null,2,3]],
        expected: [1,3,2]
      },
      {
        id: "2",
        name: "空树",
        input: [null],
        expected: []
      },
      {
        id: "3",
        name: "单节点",
        input: [[1]],
        expected: [1]
      }
    ],
    hints: [
      "中序遍历顺序：左子树 → 根节点 → 右子树",
      "递归实现非常简单",
      "迭代实现可以使用栈"
    ],
    explanation: `## 解题思路

### 中序遍历

中序遍历的顺序是：左子树 → 根节点 → 右子树

### 递归实现

1. 递归遍历左子树
2. 访问根节点
3. 递归遍历右子树

### 迭代实现

使用栈模拟递归过程：
1. 一直向左走，将节点入栈
2. 弹出节点，访问
3. 转向右子树

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["validate-binary-search-tree", "kth-smallest-element-in-bst"],
    solutions: [
      {
        name: "递归（推荐）",
        code: `/**
 * 二叉树的中序遍历 - 递归法（推荐）
 *
 * 核心思想：
 * 中序遍历的定义本身就是递归的：
 * 1. 先遍历左子树（所有较小的值）
 * 2. 访问根节点（当前值）
 * 3. 再遍历右子树（所有较大的值）
 *
 * 重要性质：
 * 对于二叉搜索树(BST)，中序遍历结果是升序排列的！
 * 这是很多 BST 题目的关键技巧。
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 递归栈 + 结果数组
 */
function inorderTraversal(root) {
  // 存储遍历结果
  const result = [];

  /**
   * 中序遍历辅助函数
   * @param node 当前节点
   */
  const inorder = (node) => {
    // 递归终止：空节点
    if (node === null) return;

    // 第一步：递归遍历左子树
    inorder(node.left);

    // 第二步：访问当前节点（核心操作）
    result.push(node.val);

    // 第三步：递归遍历右子树
    inorder(node.right);
  };

  // 从根节点开始遍历
  inorder(root);
  return result;
}`,
        explanation: `## 递归法（推荐）

### 中序遍历顺序

\`\`\`
      1
       \\
        2
       /
      3

遍历顺序：
1. 访问 1 的左子树（空）
2. 访问 1 → 输出 1
3. 访问 1 的右子树（以 2 为根）
   a. 访问 2 的左子树（以 3 为根）
      - 访问 3 的左子树（空）
      - 访问 3 → 输出 3
      - 访问 3 的右子树（空）
   b. 访问 2 → 输出 2
   c. 访问 2 的右子树（空）

结果：[1, 3, 2]
\`\`\`

### 三种遍历对比

\`\`\`
      A
     / \\
    B   C

前序（根-左-右）：A, B, C
中序（左-根-右）：B, A, C  ← 本题
后序（左-右-根）：B, C, A
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(n)，递归栈（最坏 O(n)）+ 结果数组`,
        animation: {
          type: "tree" as const,
          title: "二叉树中序遍历演示",
          steps: [
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n4"], color: "blue" as const }],
              description: "中序遍历顺序：左子树 → 根节点 → 右子树。从根节点 4 开始",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n2"], color: "blue" as const }],
              description: "先访问左子树。进入节点 2 的子树",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1"], color: "blue" as const }],
              description: "继续访问节点 2 的左子树，进入节点 1",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1"], color: "green" as const }],
              visitPath: ["n1"],
              description: "节点 1 无左子树，访问节点 1。输出: [1]",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1", "n2"], color: "green" as const }],
              visitPath: ["n1", "n2"],
              description: "节点 1 无右子树，返回父节点。访问节点 2。输出: [1, 2]",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [
                { nodeIds: ["n1", "n2"], color: "green" as const },
                { nodeIds: ["n3"], color: "blue" as const },
              ],
              visitPath: ["n1", "n2"],
              description: "进入节点 2 的右子树，访问节点 3",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1", "n2", "n3"], color: "green" as const }],
              visitPath: ["n1", "n2", "n3"],
              description: "节点 3 无子节点，访问节点 3。输出: [1, 2, 3]",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1", "n2", "n3", "n4"], color: "green" as const }],
              visitPath: ["n1", "n2", "n3", "n4"],
              description: "左子树遍历完成，访问根节点 4。输出: [1, 2, 3, 4]",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [
                { nodeIds: ["n1", "n2", "n3", "n4"], color: "green" as const },
                { nodeIds: ["n6"], color: "blue" as const },
              ],
              visitPath: ["n1", "n2", "n3", "n4"],
              description: "进入右子树，访问节点 6 的子树",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1", "n2", "n3", "n4", "n5"], color: "green" as const }],
              visitPath: ["n1", "n2", "n3", "n4", "n5"],
              description: "访问节点 5（6 的左子节点）。输出: [1, 2, 3, 4, 5]",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1", "n2", "n3", "n4", "n5", "n6"], color: "green" as const }],
              visitPath: ["n1", "n2", "n3", "n4", "n5", "n6"],
              description: "访问节点 6。输出: [1, 2, 3, 4, 5, 6]",
            },
            {
              nodes: [
                { value: 4, id: "n4" },
                { value: 2, id: "n2" },
                { value: 6, id: "n6" },
                { value: 1, id: "n1" },
                { value: 3, id: "n3" },
                { value: 5, id: "n5" },
                { value: 7, id: "n7" },
              ],
              highlights: [{ nodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"], color: "green" as const }],
              visitPath: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
              description: "访问节点 7。完成！输出: [1, 2, 3, 4, 5, 6, 7]",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代（栈）",
        code: `/**
 * 二叉树的中序遍历 - 迭代法（栈）
 *
 * 核心思想：
 * 使用显式栈模拟递归调用过程。
 *
 * 迭代中序遍历模板（必须掌握！）：
 * 1. 一直向左走，将节点入栈
 * 2. 弹出节点，访问
 * 3. 转向右子树，重复步骤 1
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 栈 + 结果数组
 */
function inorderTraversal(root) {
  // 存储遍历结果
  const result = [];
  // 显式栈，模拟递归调用栈
  const stack = [];
  // 当前访问的节点
  let current = root;

  // 只要还有节点未处理（当前非空或栈非空）
  while (current !== null || stack.length > 0) {
    // ========== 阶段1：一直向左走，入栈 ==========
    // 模拟递归调用 inorder(node.left)
    while (current !== null) {
      stack.push(current);    // 记住当前节点
      current = current.left; // 移动到左子节点
    }

    // ========== 阶段2：弹出节点，访问 ==========
    // 此时 current 为 null，说明左边走到头了
    current = stack.pop();      // 回到最近的未处理节点
    result.push(current.val);   // 访问节点（核心操作）

    // ========== 阶段3：转向右子树 ==========
    // 下一轮循环会处理右子树
    current = current.right;
  }

  return result;
}`,
        explanation: `## 迭代法（栈）

### 算法原理

使用栈模拟递归：
\`\`\`
递归代码：              模拟过程：
function inorder(n)    while:
  inorder(n.left)  →     一直向左，入栈
  visit(n)         →     弹出，访问
  inorder(n.right) →     转向右子树
\`\`\`

### 执行过程示例

\`\`\`
      1
       \\
        2
       /
      3

步骤1：向左走，入栈 [1]，current=null
步骤2：弹出 1，输出 1，转向右（节点2）
步骤3：向左走，入栈 [2]，转到 3
步骤4：向左走，入栈 [2, 3]，current=null
步骤5：弹出 3，输出 3，转向右（null）
步骤6：弹出 2，输出 2，转向右（null）
步骤7：栈空，current=null，结束

结果：[1, 3, 2]
\`\`\`

### 迭代模板总结

\`\`\`javascript
while (current || stack.length) {
  while (current) {          // 向左走到底
    stack.push(current);
    current = current.left;
  }
  current = stack.pop();     // 弹出
  visit(current);            // 访问
  current = current.right;   // 转向右
}
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "Morris 遍历",
        code: `/**
 * 二叉树的中序遍历 - Morris 遍历（进阶）
 *
 * 核心思想：
 * 利用叶子节点的空指针建立临时"线索"，
 * 实现 O(1) 空间复杂度的遍历。
 *
 * 关键概念 - 前驱节点：
 * 在中序遍历中，一个节点的前驱是其左子树的最右节点。
 * 利用前驱节点的空右指针指向当前节点，形成"线索"。
 *
 * 时间复杂度：O(n) - 每个节点最多访问两次
 * 空间复杂度：O(1) - 只使用常数额外空间（不含结果数组）
 */
function inorderTraversal(root) {
  // 存储遍历结果
  const result = [];
  // 当前访问的节点
  let current = root;

  while (current !== null) {
    if (current.left === null) {
      // ========== 情况1：左子树为空 ==========
      // 直接访问当前节点，然后转向右子树
      result.push(current.val);
      current = current.right;
    } else {
      // ========== 情况2：左子树不为空 ==========
      // 找到左子树的最右节点（前驱节点）
      let predecessor = current.left;
      while (predecessor.right !== null && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (predecessor.right === null) {
        // 前驱的右指针为空：第一次到达当前节点
        // 建立线索：前驱指向当前节点
        predecessor.right = current;
        // 继续遍历左子树
        current = current.left;
      } else {
        // 前驱的右指针指向当前节点：第二次到达
        // 说明左子树已遍历完，恢复树结构
        predecessor.right = null;
        // 访问当前节点
        result.push(current.val);
        // 转向右子树
        current = current.right;
      }
    }
  }

  return result;
}`,
        explanation: `## Morris 遍历（进阶）

### 算法原理

利用空闲指针建立临时线索，避免使用栈：
\`\`\`
      1
     / \\
    2   3

步骤1：当前 1，有左子树
       找 1 的前驱（2 的最右）= 2
       2.right = null → 建立线索 2.right = 1
       转向左子树

步骤2：当前 2，无左子树
       访问 2，转向右（通过线索回到 1）

步骤3：当前 1（第二次）
       找前驱，2.right = 1 → 恢复 2.right = null
       访问 1，转向右子树

步骤4：当前 3，无左子树
       访问 3，结束

结果：[2, 1, 3]
\`\`\`

### 线索的建立与恢复

\`\`\`
原始树：            建立线索后：
    1                   1
   / \\                 / \\
  2   3               2   3
                       \\
                        → 1 (线索)

遍历完左子树后，通过线索回到 1，然后恢复原树结构
\`\`\`

### 为什么是 O(1) 空间？

- 不使用栈或递归
- 只用几个指针变量
- 利用树中已有的空指针

### 适用场景

- 内存受限环境
- 需要 O(1) 空间遍历
- 面试进阶题目

### 复杂度
- 时间：O(n)，每个节点最多访问两次
- 空间：O(1)，只用常数额外空间`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 14. 二叉树的直径 (543)
  {
    id: "diameter-of-binary-tree",
    leetcodeId: 543,
    title: "二叉树的直径",
    titleEn: "Diameter of Binary Tree",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "二叉树"],
    frontendRelevance: "high",
    frontendNote: "树的DFS",
    description: `给你一棵二叉树的根节点，返回该树的 **直径**。

二叉树的 **直径** 是指树中任意两个节点之间最长路径的 **长度**。这条路径可能经过也可能不经过根节点 \`root\`。

两节点之间路径的 **长度** 由它们之间边数表示。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,3,4,5]
输出：3
解释：3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1,2]
输出：1
\`\`\``,
    constraints: `- 树中节点数目在范围 \`[1, 10^4]\` 内
- \`-100 <= Node.val <= 100\``,
    initialCode: `function diameterOfBinaryTree(root) {
  // 在此处编写你的代码

}`,
    solution: `function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  const depth = (node) => {
    if (node === null) return 0;

    const leftDepth = depth(node.left);
    const rightDepth = depth(node.right);

    // 更新最大直径（经过当前节点的路径长度）
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

    // 返回当前节点的深度
    return Math.max(leftDepth, rightDepth) + 1;
  };

  depth(root);
  return maxDiameter;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,3,4,5]],
        expected: 3
      },
      {
        id: "2",
        name: "示例2",
        input: [[1,2]],
        expected: 1
      },
      {
        id: "3",
        name: "单节点",
        input: [[1]],
        expected: 0
      }
    ],
    hints: [
      "直径 = 左子树深度 + 右子树深度",
      "在计算深度的同时更新最大直径",
      "路径不一定经过根节点"
    ],
    explanation: `## 解题思路

### DFS + 深度计算

对于每个节点，经过它的最长路径 = 左子树深度 + 右子树深度。

在计算深度的过程中，同时更新全局最大直径。

### 关键点
- 直径是边的数量，不是节点数量
- 路径可以不经过根节点
- 需要检查每个节点作为"拐点"的情况

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["maximum-depth-of-binary-tree", "binary-tree-maximum-path-sum"],
    solutions: [
      {
        name: "DFS（推荐）",
        code: `/**
 * 二叉树的直径 - DFS 深度优先搜索（推荐）
 *
 * 核心思想：
 * 直径 = 某个节点的左子树深度 + 右子树深度
 * 在计算深度的过程中，同时更新全局最大直径。
 *
 * 关键理解：
 * 1. 直径是边的数量，不是节点数量
 * 2. 最长路径可能不经过根节点
 * 3. 需要检查每个节点作为"拐点"的情况
 *
 * 与"最大路径和"题目的区别：
 * - 直径：计算边数（深度之和）
 * - 路径和：计算节点值之和
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function diameterOfBinaryTree(root) {
  // 全局变量记录最大直径
  let maxDiameter = 0;

  /**
   * 计算节点的深度（从当前节点到叶子的最长路径）
   * 同时更新全局最大直径
   * @param node 当前节点
   * @returns 当前节点的深度
   */
  const depth = (node) => {
    // 空节点深度为 0
    if (node === null) return 0;

    // 递归计算左右子树的深度
    const leftDepth = depth(node.left);   // 左子树深度
    const rightDepth = depth(node.right); // 右子树深度

    // 更新最大直径
    // 经过当前节点的路径长度 = 左子树深度 + 右子树深度
    // （从左子树最深处，经过当前节点，到右子树最深处）
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

    // 返回当前节点的深度
    // 深度 = max(左深度, 右深度) + 1（当前节点到子节点的边）
    return Math.max(leftDepth, rightDepth) + 1;
  };

  // 启动递归
  depth(root);
  // 返回全局最大直径
  return maxDiameter;
}`,
        explanation: `## DFS 深度优先搜索（推荐）

### 算法原理

\`\`\`
        1
       / \\
      2   3
     / \\
    4   5

每个节点的"贡献"：
- 节点 4：左=0, 右=0，直径贡献=0
- 节点 5：左=0, 右=0，直径贡献=0
- 节点 2：左=1, 右=1，直径贡献=2
- 节点 3：左=0, 右=0，直径贡献=0
- 节点 1：左=2, 右=1，直径贡献=3 ✓

最大直径 = 3（路径 4-2-1-3 或 5-2-1-3）
\`\`\`

### 深度 vs 直径

\`\`\`
深度：从节点到最深叶子的边数
      返回给父节点用于计算

直径：经过节点的最长路径的边数
      左深度 + 右深度
\`\`\`

### 为什么要检查每个节点？

最长路径可能不经过根节点：
\`\`\`
      1
     /
    2
   / \\
  3   4
 /     \\
5       6

最长路径：5-3-2-4-6
经过节点 2，不经过根节点 1
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        animation: {
          type: "tree" as const,
          title: "二叉树直径演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              description: "树: [1,2,3,4,5]。直径=任意两点间最长路径的边数",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["4"], color: "yellow" as const }],
              description: "节点4: 左深度=0，右深度=0。直径贡献=0+0=0",
              visitPath: ["4"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["5"], color: "yellow" as const }],
              description: "节点5: 左深度=0，右深度=0。直径贡献=0+0=0",
              visitPath: ["5"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "yellow" as const },
                { nodeIds: ["4", "5"], color: "blue" as const },
              ],
              description: "节点2: 左深度=1，右深度=1。直径贡献=1+1=2。maxDiameter=2",
              visitPath: ["4", "2", "5"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["3"], color: "yellow" as const }],
              description: "节点3: 左深度=0，右深度=0。直径贡献=0。maxDiameter=2",
              visitPath: ["3"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["4", "2", "1", "3"], color: "green" as const, label: "直径路径" }],
              description: "节点1: 左深度=2，右深度=1。直径贡献=2+1=3。maxDiameter=3 ✓",
              visitPath: ["4", "2", "1", "3"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
    ],
  },

  // 15. 从中序与后序遍历序列构造二叉树 (106)
  {
    id: "construct-binary-tree-from-inorder-and-postorder-traversal",
    leetcodeId: 106,
    title: "从中序与后序遍历序列构造二叉树",
    titleEn: "Construct Binary Tree from Inorder and Postorder Traversal",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "数组", "哈希表", "分治", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "从遍历构建树",
    description: `给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。`,
    examples: `**示例 1：**
\`\`\`
输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
输出：[3,9,20,null,null,15,7]
解释：根据中序和后序遍历构造出二叉树
\`\`\`

**示例 2：**
\`\`\`
输入：inorder = [-1], postorder = [-1]
输出：[-1]
解释：单节点树
\`\`\``,
    constraints: `- \`1 <= inorder.length <= 3000\`
- \`postorder.length == inorder.length\`
- \`-3000 <= inorder[i], postorder[i] <= 3000\`
- \`inorder\` 和 \`postorder\` 都由不同的值组成
- \`postorder\` 中每一个值都在 \`inorder\` 中
- \`inorder\` 保证是树的中序遍历
- \`postorder\` 保证是树的后序遍历`,
    initialCode: `function buildTree(inorder, postorder) {
  // 在此处编写代码
}`,
    solution: `function buildTree(inorder, postorder) {
  const map = new Map();
  inorder.forEach((val, idx) => map.set(val, idx));

  let postIdx = postorder.length - 1;

  const build = (inLeft, inRight) => {
    if (inLeft > inRight) return null;

    const rootVal = postorder[postIdx--];
    const root = new TreeNode(rootVal);

    const inIdx = map.get(rootVal);

    // 先构建右子树，因为后序遍历中右子树在根节点之前
    root.right = build(inIdx + 1, inRight);
    root.left = build(inLeft, inIdx - 1);

    return root;
  };

  return build(0, inorder.length - 1);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[9,3,15,20,7], [9,15,7,20,3]],
        expected: [3,9,20,null,null,15,7]
      },
      {
        id: "2",
        name: "示例2",
        input: [[-1], [-1]],
        expected: [-1]
      },
      {
        id: "3",
        name: "完全二叉树",
        input: [[4,2,5,1,6,3,7], [4,5,2,6,7,3,1]],
        expected: [1,2,3,4,5,6,7]
      }
    ],
    hints: [
      "后序遍历的最后一个元素是根节点",
      "使用哈希表快速定位根节点在中序遍历中的位置",
      "注意：要先构建右子树，再构建左子树"
    ],
    explanation: `## 解题思路

### 递归 + 哈希表

利用后序遍历和中序遍历的特性：
- 后序遍历：左子树 → 右子树 → 根
- 中序遍历：左子树 → 根 → 右子树

后序遍历的最后一个元素就是根节点，在中序遍历中找到根节点位置，就可以划分左右子树。

### 关键点
1. 后序遍历**倒序**遍历，每次取最后一个作为根
2. 先构建右子树，再构建左子树（因为后序中右子树在左子树后面）
3. 使用哈希表O(1)查找根节点在中序中的位置

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["construct-binary-tree-from-preorder-and-inorder-traversal"],
    solutions: [
      {
        name: "递归 + 哈希表（推荐）",
        code: `/**
 * 从中序与后序遍历序列构造二叉树 - 递归 + 哈希表（推荐）
 *
 * 核心思想：
 * 利用遍历序列的特性：
 * - 后序遍历：左子树 → 右子树 → 根（最后一个是根！）
 * - 中序遍历：左子树 → 根 → 右子树（根在中间分割左右）
 *
 * 算法步骤：
 * 1. 后序的最后一个元素是根节点
 * 2. 在中序中找到根节点，划分左右子树
 * 3. 递归构建右子树（先右后左，因为后序倒序是根→右→左）
 * 4. 递归构建左子树
 *
 * 时间复杂度：O(n) - 每个节点处理一次
 * 空间复杂度：O(n) - 哈希表 + 递归栈
 */
function buildTree(inorder, postorder) {
  // 构建哈希表：值 → 在中序遍历中的索引
  // 用于 O(1) 时间定位根节点位置
  const map = new Map();
  inorder.forEach((val, idx) => map.set(val, idx));

  // 后序遍历的指针，从末尾开始（因为后序最后是根）
  let postIdx = postorder.length - 1;

  /**
   * 递归构建子树
   * @param inLeft 中序遍历的左边界
   * @param inRight 中序遍历的右边界
   * @returns 构建的子树根节点
   */
  const build = (inLeft, inRight) => {
    // 递归终止：区间无效
    if (inLeft > inRight) return null;

    // 从后序遍历取出当前根节点（从后往前取）
    const rootVal = postorder[postIdx--];
    // 创建根节点
    const root = new TreeNode(rootVal);

    // 在中序遍历中找到根节点的位置
    const inIdx = map.get(rootVal);

    // 关键：先构建右子树，再构建左子树！
    // 因为后序遍历倒序是：根 → 右 → 左
    // 右子树范围：[inIdx + 1, inRight]
    root.right = build(inIdx + 1, inRight);
    // 左子树范围：[inLeft, inIdx - 1]
    root.left = build(inLeft, inIdx - 1);

    return root;
  };

  // 从整个中序数组范围开始构建
  return build(0, inorder.length - 1);
}`,
        explanation: `## 递归 + 哈希表（推荐）

### 核心原理

\`\`\`
中序遍历：[9, 3, 15, 20, 7]
           左 根  右子树

后序遍历：[9, 15, 7, 20, 3]
           左  右子树    根
                        ↑ 最后一个是根！
\`\`\`

### 构建过程

\`\`\`
后序：[9, 15, 7, 20, 3]
                    ↑ postIdx=4，根=3

中序：[9, 3, 15, 20, 7]
       ↑  ↑
      左  根  右→→→→→

1. 根节点 = 3
2. 在中序中找到 3 的位置（索引1）
3. 左子树：中序[0,0]=[9]
4. 右子树：中序[2,4]=[15,20,7]
5. 先构建右子树（后序接下来是 20，然后 7, 15）
6. 再构建左子树（后序接下来是 9）
\`\`\`

### 为什么先右后左？

\`\`\`
后序遍历：左 → 右 → 根
倒序遍历：根 → 右 → 左

所以取完根后，下一个是右子树的根，再下一个是左子树
\`\`\`

### 复杂度
- 时间：O(n)，每个节点处理一次
- 空间：O(n)，哈希表 + 递归栈`,
        animation: {
          type: "tree" as const,
          title: "从中序与后序构造二叉树演示",
          steps: [
            {
              nodes: [],
              description: "中序: [9,3,15,20,7]，后序: [9,15,7,20,3]。后序最后一个3是根",
            },
            {
              nodes: [
                { value: 3, id: "3" },
              ],
              pointers: { "3": ["root"] },
              highlights: [{ nodeIds: ["3"], color: "green" as const }],
              description: "创建根节点3。在中序中找到3(索引1)，左子树[9]，右子树[15,20,7]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                null,
                { value: 20, id: "20" },
              ],
              highlights: [
                { nodeIds: ["3"], color: "green" as const },
                { nodeIds: ["20"], color: "yellow" as const },
              ],
              description: "先构建右子树！后序下一个20是右子树根。在中序[15,20,7]中找20，左[15]右[7]",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                null,
                { value: 20, id: "20" },
                null,
                null,
                null,
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "20"], color: "green" as const },
                { nodeIds: ["7"], color: "yellow" as const },
              ],
              description: "构建20的右子树：后序下一个7。7是叶节点",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                null,
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [
                { nodeIds: ["3", "20", "7"], color: "green" as const },
                { nodeIds: ["15"], color: "yellow" as const },
              ],
              description: "构建20的左子树：后序下一个15。15是叶节点",
            },
            {
              nodes: [
                { value: 3, id: "3" },
                { value: 9, id: "9" },
                { value: 20, id: "20" },
                null,
                null,
                { value: 15, id: "15" },
                { value: 7, id: "7" },
              ],
              highlights: [{ nodeIds: ["3", "9", "20", "15", "7"], color: "green" as const }],
              description: "最后构建3的左子树：后序下一个9。9是叶节点。构造完成！",
              visitPath: ["3", "20", "7", "15", "9"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代法",
        code: `/**
 * 从中序与后序遍历序列构造二叉树 - 迭代法
 *
 * 核心思想：
 * 使用栈模拟递归过程，从后序遍历末尾开始倒序处理。
 *
 * 关键观察：
 * - 后序倒序遍历时，先访问的是右子树
 * - 当栈顶元素等于中序当前元素时，说明要转向左子树
 *
 * 时间复杂度：O(n) - 每个节点处理一次
 * 空间复杂度：O(n) - 栈空间
 */
function buildTree(inorder, postorder) {
  // 边界情况
  if (postorder.length === 0) return null;

  // 创建根节点（后序最后一个元素）
  const root = new TreeNode(postorder[postorder.length - 1]);
  // 栈：维护当前处理路径
  const stack = [root];
  // 中序遍历的指针，从末尾开始
  let inorderIndex = inorder.length - 1;

  // 从后序倒数第二个开始（倒数第一个已作为根）
  for (let i = postorder.length - 2; i >= 0; i--) {
    const postorderVal = postorder[i];
    let node = stack[stack.length - 1];

    if (node.val !== inorder[inorderIndex]) {
      // 情况1：栈顶不等于中序当前值
      // 说明还在构建右子树，当前节点是栈顶的右孩子
      node.right = new TreeNode(postorderVal);
      stack.push(node.right);
    } else {
      // 情况2：栈顶等于中序当前值
      // 说明右子树构建完成，需要回溯找左子树的位置
      while (stack.length > 0 && stack[stack.length - 1].val === inorder[inorderIndex]) {
        node = stack.pop();
        inorderIndex--;
      }
      // node 是最后一个匹配的节点，当前值是它的左孩子
      node.left = new TreeNode(postorderVal);
      stack.push(node.left);
    }
  }

  return root;
}`,
        explanation: `## 迭代法

### 算法原理

利用栈模拟递归，关键是理解何时构建右子树、何时构建左子树。

### 核心逻辑

\`\`\`
后序倒序：根 → 右 → 左
中序倒序：右 → 根 → 左

当栈顶 ≠ 中序当前值：还在右子树路径上
当栈顶 = 中序当前值：需要回溯，转向左子树
\`\`\`

### 执行过程示例

\`\`\`
中序：[9, 3, 15, 20, 7]，inIdx 从 7 开始
后序：[9, 15, 7, 20, 3]，从 3 开始倒序

1. 根=3，stack=[3]
2. i=3(20)，3≠7，20是3的右孩子，stack=[3,20]
3. i=2(7)，20≠7，7是20的右孩子，stack=[3,20,7]
4. i=1(15)，7=7，弹出7，inIdx→20
   20=20，弹出20，inIdx→15
   15是20的左孩子，stack=[3,15]
5. i=0(9)，15=15，弹出15，inIdx→3
   3=3，弹出3，inIdx→9
   9是3的左孩子，stack=[9]
\`\`\`

### 适用场景

- 需要避免递归栈溢出
- 理解迭代构建树的思路

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 16. 二叉树展开为链表 (114)
  {
    id: "flatten-binary-tree-to-linked-list",
    leetcodeId: 114,
    title: "二叉树展开为链表",
    titleEn: "Flatten Binary Tree to Linked List",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["栈", "树", "深度优先搜索", "链表", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "树展开为链表",
    description: `给你二叉树的根结点 root ，请你将它展开为一个单链表：

- 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
- 展开后的单链表应该与二叉树 先序遍历 顺序相同。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]
解释：按先序遍历展开为链表
\`\`\`

**示例 2：**
\`\`\`
输入：root = []
输出：[]
解释：空树
\`\`\`

**示例 3：**
\`\`\`
输入：root = [0]
输出：[0]
解释：单节点
\`\`\``,
    constraints: `- 树中结点数在范围 \`[0, 2000]\` 内
- \`-100 <= Node.val <= 100\``,
    initialCode: `function flatten(root) {
  // 在此处编写代码，原地修改树
}`,
    solution: `function flatten(root) {
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      // 找到左子树的最右节点
      let predecessor = curr.left;
      while (predecessor.right !== null) {
        predecessor = predecessor.right;
      }

      // 将右子树接到左子树的最右节点
      predecessor.right = curr.right;

      // 将左子树移到右边
      curr.right = curr.left;
      curr.left = null;
    }

    curr = curr.right;
  }
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,5,3,4,null,6]],
        expected: [1,null,2,null,3,null,4,null,5,null,6]
      },
      {
        id: "2",
        name: "空树",
        input: [[]],
        expected: []
      },
      {
        id: "3",
        name: "单节点",
        input: [[0]],
        expected: [0]
      }
    ],
    hints: [
      "先序遍历的顺序是：根 → 左 → 右",
      "可以用递归或迭代，也可以用 Morris 遍历的思想",
      "关键是找到左子树的最右节点，将右子树接上去"
    ],
    explanation: `## 解题思路

### 方法：寻找前驱节点

对于每个节点：
1. 如果有左子树，找到左子树的最右节点（前驱节点）
2. 将当前节点的右子树接到前驱节点的右边
3. 将左子树移到右边，左指针置空
4. 移动到下一个节点

### 关键点
- 原地修改，不使用额外空间
- 类似 Morris 遍历的思想
- 每个节点最多被访问两次

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["binary-tree-preorder-traversal"],
    solutions: [
      {
        name: "迭代（O(1)空间，推荐）",
        code: `/**
 * 二叉树展开为链表 - 迭代法（O(1)空间，推荐）
 *
 * 核心思想：
 * 利用先序遍历的特点：左子树的所有节点都在右子树之前。
 * 对于每个有左子树的节点，找到左子树的最右节点（前驱），
 * 将右子树接到前驱的右边，然后把左子树移到右边。
 *
 * 类似 Morris 遍历的思想，原地修改指针。
 *
 * 时间复杂度：O(n) - 每个节点最多被访问两次
 * 空间复杂度：O(1) - 只使用常数额外空间
 */
function flatten(root) {
  // 当前处理的节点
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      // ========== 有左子树的情况 ==========

      // 步骤1：找到左子树的最右节点（前驱节点）
      // 这个节点在先序遍历中是右子树之前的最后一个节点
      let predecessor = curr.left;
      while (predecessor.right !== null) {
        predecessor = predecessor.right;
      }

      // 步骤2：将当前节点的右子树接到前驱节点的右边
      // 因为在先序遍历中，左子树的最右节点之后就是右子树
      predecessor.right = curr.right;

      // 步骤3：将整个左子树移到右边
      curr.right = curr.left;
      // 清空左指针
      curr.left = null;
    }

    // 移动到下一个节点（现在的右孩子）
    curr = curr.right;
  }
}`,
        explanation: `## 迭代法（O(1)空间，推荐）

### 算法原理

\`\`\`
原始树：          展开过程：
    1                1
   / \\               \\
  2   5       →       2
 / \\   \\             / \\
3   4   6           3   4
                         \\
                          5
                           \\
                            6
\`\`\`

### 详细步骤

\`\`\`
处理节点 1：
1. 找到左子树最右节点 = 4
2. 把右子树(5-6)接到 4 的右边
3. 把左子树移到右边，清空左指针

    1                    1
   / \\                    \\
  2   5      →            2
 / \\   \\                 / \\
3   4   6               3   4
                             \\
                              5
                               \\
                                6

然后继续处理 2, 3, 4, 5, 6...
\`\`\`

### 为什么是 O(n)？

虽然有两层循环，但每个节点最多被访问两次：
- 一次作为 curr
- 一次在寻找前驱时

### 复杂度
- 时间：O(n)
- 空间：O(1)，原地修改`,
        animation: {
          type: "tree" as const,
          title: "二叉树展开为链表演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              pointers: { "1": ["curr"] },
              description: "树: [1,2,5,3,4,null,6]。展开为链表，按先序遍历顺序",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              pointers: { "1": ["curr"], "4": ["前驱"] },
              highlights: [{ nodeIds: ["4"], color: "yellow" as const }],
              description: "节点1有左子树。找左子树最右节点=4（前驱）",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                null,
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                null,
                null,
                null,
                null,
                { value: 5, id: "5" },
                null,
                null,
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["4", "5"], color: "yellow" as const },
              ],
              description: "把右子树(5-6)接到4右边，把左子树移到右边",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                null,
                { value: 2, id: "2" },
                null,
                null,
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { value: 5, id: "5" },
              ],
              pointers: { "2": ["curr"] },
              description: "curr移到2。继续处理，找左子树最右节点=3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                null,
                { value: 2, id: "2" },
              ],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const }],
              description: "重复操作...最终展开为链表: 1→2→3→4→5→6",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归（后序）",
        code: `/**
 * 二叉树展开为链表 - 递归法（反向先序）
 *
 * 核心思想：
 * 使用反向的先序遍历：右 → 左 → 根
 * 这样处理的顺序正好是先序遍历的逆序。
 *
 * 用 prev 变量记录上一个处理的节点，
 * 当前节点的 right 指向 prev，形成链表。
 *
 * 为什么用反向先序？
 * 因为先序是 根→左→右，如果正向处理会丢失右子树。
 * 反向处理时，右子树已经处理完毕，不会丢失。
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function flatten(root) {
  // 记录上一个处理的节点（链表的"下一个"节点）
  let prev = null;

  /**
   * 反向先序遍历：右 → 左 → 根
   * @param node 当前节点
   */
  const dfs = (node) => {
    // 空节点直接返回
    if (node === null) return;

    // 第一步：先递归处理右子树
    dfs(node.right);
    // 第二步：再递归处理左子树
    dfs(node.left);

    // 第三步：处理当前节点
    // 当前节点的 right 指向 prev（上一个处理的节点）
    node.right = prev;
    // 清空左指针
    node.left = null;
    // 更新 prev 为当前节点
    prev = node;
  };

  dfs(root);
}`,
        explanation: `## 递归法（反向先序）

### 算法原理

先序遍历：根 → 左 → 右
反向先序：右 → 左 → 根（逆序）

\`\`\`
    1              处理顺序：6→5→4→3→2→1
   / \\             链表顺序：1→2→3→4→5→6
  2   5
 / \\   \\
3   4   6
\`\`\`

### 执行过程

\`\`\`
处理 6：prev=null → 6.right=null, prev=6
处理 5：prev=6   → 5.right=6, prev=5
处理 4：prev=5   → 4.right=5, prev=4
处理 3：prev=4   → 3.right=4, prev=3
处理 2：prev=3   → 2.right=3, prev=2
处理 1：prev=2   → 1.right=2, prev=1

最终：1→2→3→4→5→6
\`\`\`

### 为什么要反向？

正向先序处理会丢失右子树：
\`\`\`
处理 1 时，如果修改 1.right = 2
原来的右子树 5-6 就丢失了！
\`\`\`

反向处理时，右子树已经处理完，不会丢失。

### 复杂度
- 时间：O(n)
- 空间：O(h)，递归栈`,
        animation: {
          type: "tree" as const,
          title: "二叉树展开为链表 - 递归（反向先序）",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              description: "树: [1,2,5,3,4,null,6]。反向先序：右→左→根",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [{ nodeIds: ["6"], color: "yellow" as const }],
              description: "先递归右子树最深处。处理6：prev=null，6.right=null，prev=6",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["5"], color: "yellow" as const },
                { nodeIds: ["6"], color: "green" as const, label: "prev" },
              ],
              description: "处理5：prev=6，5.right=6，prev=5",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["4"], color: "yellow" as const },
                { nodeIds: ["5"], color: "green" as const, label: "prev" },
              ],
              description: "回到左子树。处理4：prev=5，4.right=5，prev=4",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["3"], color: "yellow" as const },
                { nodeIds: ["4"], color: "green" as const, label: "prev" },
              ],
              description: "处理3：prev=4，3.right=4，prev=3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "yellow" as const },
                { nodeIds: ["3"], color: "green" as const, label: "prev" },
              ],
              description: "处理2：prev=3，2.right=3，prev=2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                null,
                { value: 2, id: "2" },
              ],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const }],
              description: "处理1：prev=2，1.right=2。完成！链表：1→2→3→4→5→6",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "先序遍历 + 展开",
        code: `/**
 * 二叉树展开为链表 - 先序遍历 + 展开
 *
 * 核心思想：
 * 使用栈进行先序遍历，遍历过程中直接修改节点指针。
 * 关键：先将子节点入栈保存，再修改当前节点的指针。
 *
 * 注意事项：
 * 必须先入栈右子树再入栈左子树，保证左子树先出栈。
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 栈空间（最坏情况）
 */
function flatten(root) {
  // 边界情况
  if (root === null) return;

  // 栈：用于先序遍历
  const stack = [root];
  // 记录上一个处理的节点
  let prev = null;

  while (stack.length > 0) {
    // 弹出当前节点
    const curr = stack.pop();

    // 如果有前一个节点，将其右指针指向当前节点
    if (prev !== null) {
      prev.left = null;     // 清空左指针
      prev.right = curr;    // 右指针指向当前节点
    }

    // 关键：先入栈右子树，后入栈左子树
    // 这样左子树会先出栈，保证先序遍历的顺序
    if (curr.right !== null) stack.push(curr.right);
    if (curr.left !== null) stack.push(curr.left);

    // 更新 prev
    prev = curr;
  }
}`,
        explanation: `## 先序遍历 + 展开

### 算法原理

使用栈进行先序遍历，同时修改节点指针：
\`\`\`
栈的顺序：先压右，后压左
弹出顺序：先左，后右
结果顺序：根 → 左 → 右（先序）
\`\`\`

### 执行过程

\`\`\`
    1              stack: [1]
   / \\
  2   5

步骤1：pop 1, push 5, push 2
       stack: [5, 2], prev=1

步骤2：pop 2, prev.right=2
       push 4, push 3
       stack: [5, 4, 3], prev=2

步骤3：pop 3, prev.right=3
       stack: [5, 4], prev=3

步骤4：pop 4, prev.right=4
       stack: [5], prev=4

步骤5：pop 5, prev.right=5
       push 6
       stack: [6], prev=5

步骤6：pop 6, prev.right=6
       stack: [], prev=6

最终：1→2→3→4→5→6
\`\`\`

### 与递归方法对比

| 方法 | 空间复杂度 | 理解难度 |
|-----|----------|---------|
| 迭代O(1) | O(1) | 中等 |
| 递归 | O(h) | 需理解反向 |
| 栈先序 | O(n) | 最直观 |

### 复杂度
- 时间：O(n)
- 空间：O(n)，栈空间`,
        animation: {
          type: "tree" as const,
          title: "二叉树展开为链表 - 先序遍历+栈",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [{ nodeIds: ["1"], color: "blue" as const, label: "栈" }],
              description: "栈=[1]，prev=null。开始先序遍历",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "green" as const, label: "prev" },
                { nodeIds: ["5", "2"], color: "blue" as const, label: "栈" },
              ],
              description: "弹出1，push右5再push左2。栈=[5,2]，prev=1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "green" as const, label: "prev" },
                { nodeIds: ["5", "4", "3"], color: "blue" as const, label: "栈" },
              ],
              description: "弹出2，1.right=2。push右4再push左3。栈=[5,4,3]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["3"], color: "green" as const, label: "prev" },
                { nodeIds: ["5", "4"], color: "blue" as const, label: "栈" },
              ],
              description: "弹出3，2.right=3。3无子节点。栈=[5,4]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                null,
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["4"], color: "green" as const, label: "prev" },
                { nodeIds: ["5"], color: "blue" as const, label: "栈" },
              ],
              description: "弹出4，3.right=4。4无子节点。栈=[5]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                null,
                { value: 2, id: "2" },
              ],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const }],
              description: "弹出5,6依次处理。最终链表：1→2→3→4→5→6",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 17. 求根节点到叶节点数字之和 (129)
  {
    id: "sum-root-to-leaf-numbers",
    leetcodeId: 129,
    title: "求根节点到叶节点数字之和",
    titleEn: "Sum Root to Leaf Numbers",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "二叉树"],
    frontendRelevance: "low",
    frontendNote: "根到叶子数字之和",
    description: `给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。

每条从根节点到叶节点的路径都代表一个数字：
- 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。

计算从根节点到叶节点生成的 所有数字之和 。

叶节点 是指没有子节点的节点。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,3]
输出：25
解释：从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25
\`\`\`

**示例 2：**
\`\`\`
输入：root = [4,9,0,5,1]
输出：1026
解释：从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026
\`\`\``,
    constraints: `- 树中节点的数目在范围 \`[1, 1000]\` 内
- \`0 <= Node.val <= 9\`
- 树的深度不超过 10`,
    initialCode: `function sumNumbers(root) {
  // 在此处编写代码
}`,
    solution: `function sumNumbers(root) {
  const dfs = (node, currentSum) => {
    if (node === null) return 0;

    currentSum = currentSum * 10 + node.val;

    // 如果是叶子节点，返回当前路径的数字
    if (node.left === null && node.right === null) {
      return currentSum;
    }

    // 递归计算左右子树的数字之和
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  };

  return dfs(root, 0);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,3]],
        expected: 25
      },
      {
        id: "2",
        name: "示例2",
        input: [[4,9,0,5,1]],
        expected: 1026
      },
      {
        id: "3",
        name: "单节点",
        input: [[5]],
        expected: 5
      }
    ],
    hints: [
      "使用 DFS 遍历所有路径",
      "传递当前路径形成的数字作为参数",
      "到达叶子节点时返回当前数字"
    ],
    explanation: `## 解题思路

### DFS 递归

从根节点开始，每往下走一层，当前数字就乘以 10 再加上当前节点的值。

当到达叶子节点时，返回当前累积的数字。

最终答案是所有叶子节点返回值的和。

### 关键点
- 当前数字 = 父节点数字 × 10 + 当前节点值
- 只有叶子节点才贡献最终结果
- 使用 DFS 或 BFS 都可以

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(h)，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    relatedProblems: ["path-sum", "binary-tree-maximum-path-sum"],
    solutions: [
      {
        name: "DFS（推荐）",
        code: `/**
 * 求根节点到叶节点数字之和 - DFS（推荐）
 *
 * 核心思想：
 * 从根到叶子的路径形成一个数字，每往下走一层相当于十进制左移一位。
 * 使用 DFS 递归传递当前累积的数字，到达叶子节点时返回该数字。
 *
 * 数字计算公式：
 * 当前数字 = 父节点传递的数字 × 10 + 当前节点值
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(h) - 递归栈深度，h 为树高
 */
function sumNumbers(root) {
  /**
   * DFS 辅助函数
   * @param {TreeNode} node - 当前节点
   * @param {number} currentSum - 从根到当前节点形成的数字
   * @returns {number} - 当前子树所有路径数字之和
   */
  const dfs = (node, currentSum) => {
    // 边界情况：空节点不贡献任何数字
    if (node === null) return 0;

    // 计算到达当前节点时的累积数字
    // 相当于十进制左移一位后加上当前值
    currentSum = currentSum * 10 + node.val;

    // 如果是叶子节点，返回当前路径形成的完整数字
    if (node.left === null && node.right === null) {
      return currentSum;
    }

    // 非叶子节点：返回左右子树所有路径数字之和
    // 左子树的数字和 + 右子树的数字和
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  };

  // 从根节点开始，初始数字为 0
  return dfs(root, 0);
}`,
        explanation: `## DFS 递归法

### 算法原理

从根到叶子的路径 [a, b, c] 形成的数字是：
\`\`\`
a×100 + b×10 + c = ((a×10 + b)×10) + c
\`\`\`

递推关系：
- 到达 a 时：num = 0×10 + a = a
- 到达 b 时：num = a×10 + b
- 到达 c 时：num = (a×10+b)×10 + c

### 执行过程

\`\`\`
    1           dfs(1, 0):
   / \\            currentSum = 0×10 + 1 = 1
  2   3           返回 dfs(2,1) + dfs(3,1)

dfs(2, 1):        dfs(3, 1):
  currentSum = 1×10 + 2 = 12    currentSum = 1×10 + 3 = 13
  是叶子，返回 12               是叶子，返回 13

最终：12 + 13 = 25
\`\`\`

### 完整示例

\`\`\`
      4              路径 4→9→5：495
     / \\             路径 4→9→1：491
    9   0            路径 4→0：40
   / \\
  5   1              总和 = 495 + 491 + 40 = 1026
\`\`\`

### 复杂度
- 时间：O(n)，每个节点访问一次
- 空间：O(h)，递归栈深度`,
        animation: {
          type: "tree" as const,
          title: "求根到叶节点数字之和演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              pointers: { "1": ["curr"] },
              description: "树: [1,2,3]。每条路径形成一个数字，求所有数字之和",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "从根节点1开始，currentSum = 0×10 + 1 = 1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "green" as const, label: "12" },
              ],
              description: "递归左子树：到节点2，currentSum = 1×10 + 2 = 12。是叶子，返回12",
              visitPath: ["1", "2"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["3"], color: "green" as const, label: "13" },
              ],
              description: "递归右子树：到节点3，currentSum = 1×10 + 3 = 13。是叶子，返回13",
              visitPath: ["1", "3"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3"], color: "green" as const }],
              description: "总和 = 12 + 13 = 25 ✓ 路径1→2形成12，路径1→3形成13",
              visitPath: ["1", "2", "3"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "BFS",
        code: `/**
 * 求根节点到叶节点数字之和 - BFS（层序遍历）
 *
 * 核心思想：
 * 使用队列进行层序遍历，每个节点携带从根到该节点形成的数字。
 * 当遇到叶子节点时，将该数字累加到总和中。
 *
 * 队列元素：[节点, 到达该节点时的累积数字]
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列空间（最坏情况完全二叉树最后一层）
 */
function sumNumbers(root) {
  // 边界情况：空树
  if (root === null) return 0;

  // 累积总和
  let sum = 0;
  // 队列：存储 [节点, 到达该节点的累积数字]
  // 根节点的累积数字就是它的值
  const queue = [[root, root.val]];

  while (queue.length > 0) {
    // 取出队首元素
    const [node, num] = queue.shift();

    // 如果是叶子节点，将当前路径数字加入总和
    if (node.left === null && node.right === null) {
      sum += num;
    }

    // 处理左子节点
    // 新数字 = 当前数字 × 10 + 左子节点值
    if (node.left !== null) {
      queue.push([node.left, num * 10 + node.left.val]);
    }
    // 处理右子节点
    // 新数字 = 当前数字 × 10 + 右子节点值
    if (node.right !== null) {
      queue.push([node.right, num * 10 + node.right.val]);
    }
  }

  return sum;
}`,
        explanation: `## BFS 层序遍历法

### 算法原理

BFS 遍历时，队列中每个元素携带两个信息：
1. 当前节点
2. 从根到该节点形成的数字

遇到叶子节点时，将数字累加到结果。

### 执行过程

\`\`\`
    1              初始队列：[(1, 1)]
   / \\
  2   3

步骤1：取出 (1, 1)
       非叶子，加入 (2, 12), (3, 13)
       队列：[(2, 12), (3, 13)]

步骤2：取出 (2, 12)
       是叶子，sum += 12
       sum = 12

步骤3：取出 (3, 13)
       是叶子，sum += 13
       sum = 25

最终结果：25
\`\`\`

### 完整示例

\`\`\`
      4              队列变化：
     / \\             [(4,4)]
    9   0            → [(9,49), (0,40)]
   / \\               → [(0,40), (5,495), (1,491)]
  5   1              → [(5,495), (1,491)]  sum+=40
                     → [(1,491)]  sum+=495
                     → []  sum+=491

总和 = 40 + 495 + 491 = 1026
\`\`\`

### DFS vs BFS 对比

| 特性 | DFS | BFS |
|-----|-----|-----|
| 空间复杂度 | O(h) | O(n) |
| 实现方式 | 递归/栈 | 队列 |
| 遍历顺序 | 深度优先 | 层序 |

### 复杂度
- 时间：O(n)
- 空间：O(n)，最坏情况完全二叉树`,
        animation: {
          type: "tree" as const,
          title: "求根到叶节点数字之和 - BFS演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "blue" as const, label: "队列" }],
              description: "队列=[(1,num=1)]，sum=0。BFS层序遍历",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "yellow" as const },
                { nodeIds: ["2", "3"], color: "blue" as const, label: "队列" },
              ],
              description: "取出(1,1)，非叶子。加入(2,12)和(3,13)。队列=[(2,12),(3,13)]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "green" as const, label: "叶子:12" },
                { nodeIds: ["3"], color: "blue" as const, label: "队列" },
              ],
              description: "取出(2,12)，是叶子！sum += 12 = 12",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "green" as const },
                { nodeIds: ["3"], color: "green" as const, label: "叶子:13" },
              ],
              description: "取出(3,13)，是叶子！sum += 13 = 25",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3"], color: "green" as const }],
              description: "队列空，完成！总和 = 12 + 13 = 25 ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 18. 二叉树的锯齿形层序遍历 (103)
  {
    id: "binary-tree-zigzag-level-order-traversal",
    leetcodeId: 103,
    title: "二叉树的锯齿形层序遍历",
    titleEn: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "广度优先搜索", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "锯齿遍历",
    description: `给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]
解释：第一层从左到右：[3]
第二层从右到左：[20,9]
第三层从左到右：[15,7]
\`\`\`

**示例 2：**
\`\`\`
输入：root = [1]
输出：[[1]]
解释：单节点
\`\`\`

**示例 3：**
\`\`\`
输入：root = []
输出：[]
解释：空树
\`\`\``,
    constraints: `- 树中节点数目在范围 \`[0, 2000]\` 内
- \`-100 <= Node.val <= 100\``,
    initialCode: `function zigzagLevelOrder(root) {
  // 在此处编写代码
}`,
    solution: `function zigzagLevelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,9,20,null,null,15,7]],
        expected: [[3],[20,9],[15,7]]
      },
      {
        id: "2",
        name: "单节点",
        input: [[1]],
        expected: [[1]]
      },
      {
        id: "3",
        name: "空树",
        input: [[]],
        expected: []
      }
    ],
    hints: [
      "基于普通层序遍历进行修改",
      "使用一个标志位记录当前层的遍历方向",
      "可以用 unshift 或 reverse 来处理反向"
    ],
    explanation: `## 解题思路

### BFS + 方向交替

在普通层序遍历的基础上，用一个布尔变量记录当前层是从左到右还是从右到左。

- 从左到右：正常 push 到 level 数组末尾
- 从右到左：unshift 到 level 数组开头

每处理完一层，翻转方向。

### 关键点
- 遍历顺序始终是从左到右（先左子树后右子树）
- 只是在构建结果数组时改变插入位置
- 使用 unshift 或者先正常添加再 reverse

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["binary-tree-level-order-traversal"],
    solutions: [
      {
        name: "BFS + unshift（推荐）",
        code: `/**
 * 二叉树的锯齿形层序遍历 - BFS + unshift（推荐）
 *
 * 核心思想：
 * 在标准层序遍历基础上，用方向标志控制节点值的插入位置：
 * - 从左到右：push 到数组末尾
 * - 从右到左：unshift 到数组开头
 *
 * 注意：遍历顺序始终是左到右，只是改变结果数组的构建方式。
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列和结果数组
 */
function zigzagLevelOrder(root) {
  // 边界情况：空树
  if (root === null) return [];

  const result = [];         // 最终结果
  const queue = [root];      // BFS 队列
  let leftToRight = true;    // 方向标志：true=左到右，false=右到左

  while (queue.length > 0) {
    // 当前层的节点数量
    const levelSize = queue.length;
    // 当前层的节点值数组
    const level = [];

    // 处理当前层的所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // 根据方向决定插入位置
      if (leftToRight) {
        // 从左到右：正常追加到末尾
        level.push(node.val);
      } else {
        // 从右到左：插入到开头（实现反向效果）
        level.unshift(node.val);
      }

      // 子节点入队（顺序始终是左子树在前）
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // 当前层处理完毕，加入结果
    result.push(level);
    // 翻转方向
    leftToRight = !leftToRight;
  }

  return result;
}`,
        explanation: `## BFS + unshift 方法

### 算法原理

锯齿形遍历 = 标准层序遍历 + 交替改变结果顺序

\`\`\`
遍历顺序：始终从左到右访问节点
结果顺序：奇数层从左到右，偶数层从右到左
实现方式：push（正序）vs unshift（倒序）
\`\`\`

### 执行过程

\`\`\`
       3           第1层（左→右）：
      / \\           queue: [3]
     9  20          弹出3，push(3) → level=[3]
       /  \\         result: [[3]]
      15   7

                   第2层（右→左）：
                    queue: [9, 20]
                    弹出9，unshift(9) → level=[9]
                    弹出20，unshift(20) → level=[20,9]
                    result: [[3], [20,9]]

                   第3层（左→右）：
                    queue: [15, 7]
                    弹出15，push(15) → level=[15]
                    弹出7，push(7) → level=[15,7]
                    result: [[3], [20,9], [15,7]]
\`\`\`

### unshift 的作用

\`\`\`
遍历顺序：9 → 20
push:     [9, 20]  ← 正序
unshift:  [20, 9]  ← 反序

unshift(x) = 在数组开头插入 x
后处理的元素反而在前面
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        animation: {
          type: "tree" as const,
          title: "锯齿形层序遍历演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              description: "树: [3,9,20,null,null,15,7]。锯齿遍历：奇数层左→右，偶数层右→左",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["1"], color: "green" as const, label: "→" }],
              description: "第1层（左→右）：遍历节点3，level=[3]",
              visitPath: ["1"],
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "yellow" as const },
                { nodeIds: ["3"], color: "green" as const, label: "←" },
              ],
              description: "第2层（右→左）：遍历9,20，用unshift插入 → level=[20,9]",
              visitPath: ["1", "3", "2"],
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "3"], color: "blue" as const },
                { nodeIds: ["4"], color: "yellow" as const, label: "→" },
                { nodeIds: ["5"], color: "green" as const },
              ],
              description: "第3层（左→右）：遍历15,7，正常push → level=[15,7]",
              visitPath: ["1", "2", "3", "4", "5"],
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "结果: [[3], [20,9], [15,7]] ✓ 锯齿形遍历完成",
              visitPath: ["1", "2", "3", "4", "5"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "BFS + reverse",
        code: `/**
 * 二叉树的锯齿形层序遍历 - BFS + reverse
 *
 * 核心思想：
 * 先正常进行层序遍历收集每层节点，
 * 如果当前层需要反向，则 reverse 整个层数组。
 *
 * 优点：代码更直观易懂
 * 缺点：reverse 操作有额外开销
 *
 * 时间复杂度：O(n) - 每个节点访问一次，reverse 不改变总体复杂度
 * 空间复杂度：O(n) - 队列和结果数组
 */
function zigzagLevelOrder(root) {
  // 边界情况：空树
  if (root === null) return [];

  const result = [];         // 最终结果
  const queue = [root];      // BFS 队列
  let leftToRight = true;    // 方向标志

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    // 正常层序遍历：从左到右处理所有节点
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      // 先正常收集节点值
      level.push(node.val);

      // 子节点入队
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // 如果当前层需要从右到左，反转数组
    if (!leftToRight) {
      level.reverse();
    }

    result.push(level);
    // 翻转方向
    leftToRight = !leftToRight;
  }

  return result;
}`,
        explanation: `## BFS + reverse 方法

### 算法原理

两步策略：
1. 正常层序遍历，收集每层节点
2. 需要反向的层，直接 reverse

\`\`\`
第1层：正常 [3]
第2层：正常收集 [9, 20] → reverse → [20, 9]
第3层：正常 [15, 7]
\`\`\`

### unshift vs reverse 对比

| 方法 | 优点 | 缺点 |
|-----|-----|-----|
| unshift | 边遍历边构建 | unshift 是 O(k) 操作 |
| reverse | 代码更直观 | reverse 是 O(k) 操作 |

两种方法时间复杂度相同，都是 O(n)。

### reverse 的性能分析

\`\`\`
每层最多 n/2 个节点（完全二叉树最后一层）
reverse 该层：O(n/2)
所有反向层加起来：O(n/4) 次 reverse
总体仍是 O(n)
\`\`\`

### 代码可读性

reverse 方法更直观：
1. 正常遍历
2. 需要反向就反转

不需要在遍历时考虑插入位置。

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        animation: {
          type: "tree" as const,
          title: "锯齿形遍历 - BFS+reverse",
          steps: [
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["1"], color: "blue" as const }],
              description: "第1层：正常收集[3]，无需reverse",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["2", "3"], color: "yellow" as const }],
              description: "第2层：正常收集[9,20]，需要reverse→[20,9]",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["4", "5"], color: "green" as const }],
              description: "第3层：正常收集[15,7]，无需reverse",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "结果: [[3], [20,9], [15,7]] ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "DFS",
        code: `/**
 * 二叉树的锯齿形层序遍历 - DFS 递归
 *
 * 核心思想：
 * 使用 DFS 遍历，传递当前层级信息。
 * 根据层级的奇偶性决定使用 push 还是 unshift。
 * - 偶数层（0, 2, 4...）：从左到右，用 push
 * - 奇数层（1, 3, 5...）：从右到左，用 unshift
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 递归栈 + 结果数组
 */
function zigzagLevelOrder(root) {
  const result = [];

  /**
   * DFS 辅助函数
   * @param {TreeNode} node - 当前节点
   * @param {number} level - 当前层级（从 0 开始）
   */
  const dfs = (node, level) => {
    // 边界情况：空节点
    if (node === null) return;

    // 如果当前层还没有对应的数组，创建一个
    // 这保证了层级数组按顺序创建
    if (result.length === level) {
      result.push([]);
    }

    // 根据层级奇偶性决定插入方式
    if (level % 2 === 0) {
      // 偶数层：从左到右，正常追加
      result[level].push(node.val);
    } else {
      // 奇数层：从右到左，插入到开头
      result[level].unshift(node.val);
    }

    // 递归遍历子节点（先左后右，保证遍历顺序）
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  // 从根节点开始，层级为 0
  dfs(root, 0);
  return result;
}`,
        explanation: `## DFS 递归法

### 算法原理

DFS 遍历时携带层级信息：
- 层级 0（偶数）：push → 从左到右
- 层级 1（奇数）：unshift → 从右到左
- 层级 2（偶数）：push → 从左到右
- ...

### 执行过程

\`\`\`
       3              dfs(3, 0)：偶数层，push(3)
      / \\               result: [[3]]
     9  20
       /  \\           dfs(9, 1)：奇数层，unshift(9)
      15   7            result: [[3], [9]]

                      dfs(20, 1)：奇数层，unshift(20)
                        result: [[3], [20,9]]

                      dfs(15, 2)：偶数层，push(15)
                        result: [[3], [20,9], [15]]

                      dfs(7, 2)：偶数层，push(7)
                        result: [[3], [20,9], [15,7]]
\`\`\`

### DFS 顺序的关键

\`\`\`
遍历顺序：先左后右
第1层：先访问9，后访问20
使用 unshift：
  unshift(9) → [9]
  unshift(20) → [20, 9]

这样就实现了"从右到左"的效果！
\`\`\`

### BFS vs DFS 对比

| 方法 | 特点 |
|-----|-----|
| BFS | 自然按层处理，更直观 |
| DFS | 代码更简洁，递归思维 |

两者时间复杂度相同，都是 O(n)。

### 复杂度
- 时间：O(n)
- 空间：O(n)，递归栈 + 结果数组`,
        animation: {
          type: "tree" as const,
          title: "锯齿形遍历 - DFS递归",
          steps: [
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "dfs(3, level=0)：偶数层push。result=[[3]]",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["2"], color: "yellow" as const }],
              description: "dfs(9, level=1)：奇数层unshift(9)。result=[[3],[9]]",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["3"], color: "yellow" as const }],
              description: "dfs(20, level=1)：奇数层unshift(20)。result=[[3],[20,9]]",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 9, id: "2" },
                { value: 20, id: "3" },
                null,
                null,
                { value: 15, id: "4" },
                { value: 7, id: "5" },
              ],
              highlights: [{ nodeIds: ["4", "5"], color: "green" as const }],
              description: "dfs(15,2)和dfs(7,2)：偶数层push。result=[[3],[20,9],[15,7]] ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 19. 路径总和 III (437)
  {
    id: "path-sum-iii",
    leetcodeId: 437,
    title: "路径总和 III",
    titleEn: "Path Sum III",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "深度优先搜索", "二叉树", "前缀和"],
    frontendRelevance: "medium",
    frontendNote: "路径和III",
    description: `给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3
解释：和等于 8 的路径有 3 条：
5 -> 3
5 -> 2 -> 1
-3 -> 11
\`\`\`

**示例 2：**
\`\`\`
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：3
解释：和等于 22 的路径有 3 条
\`\`\``,
    constraints: `- 二叉树的节点个数的范围是 \`[0,1000]\`
- \`-10^9 <= Node.val <= 10^9\`
- \`-1000 <= targetSum <= 1000\``,
    initialCode: `function pathSum(root, targetSum) {
  // 在此处编写代码
}`,
    solution: `function pathSum(root, targetSum) {
  const prefixSum = new Map();
  prefixSum.set(0, 1);

  const dfs = (node, currentSum) => {
    if (node === null) return 0;

    currentSum += node.val;
    let count = prefixSum.get(currentSum - targetSum) || 0;

    prefixSum.set(currentSum, (prefixSum.get(currentSum) || 0) + 1);

    count += dfs(node.left, currentSum);
    count += dfs(node.right, currentSum);

    prefixSum.set(currentSum, prefixSum.get(currentSum) - 1);

    return count;
  };

  return dfs(root, 0);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[10,5,-3,3,2,null,11,3,-2,null,1], 8],
        expected: 3
      },
      {
        id: "2",
        name: "示例2",
        input: [[5,4,8,11,null,13,4,7,2,null,null,5,1], 22],
        expected: 3
      },
      {
        id: "3",
        name: "空树",
        input: [[], 0],
        expected: 0
      }
    ],
    hints: [
      "使用前缀和可以将问题转化为：找有多少个前缀和差值等于 targetSum",
      "用哈希表存储前缀和出现的次数",
      "注意回溯时要恢复哈希表的状态"
    ],
    explanation: `## 解题思路

### 前缀和 + 哈希表

利用前缀和的思想：如果当前前缀和为 currSum，我们要找的是有多少个之前的前缀和等于 currSum - targetSum。

因为 currSum - prefixSum = targetSum，即从那个位置到当前位置的路径和等于 targetSum。

### 关键点
1. 使用哈希表记录每个前缀和出现的次数
2. 初始化 prefixSum[0] = 1，处理从根开始的路径
3. 回溯时需要恢复哈希表状态

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["path-sum", "path-sum-ii", "binary-tree-maximum-path-sum"],
    solutions: [
      {
        name: "前缀和 + 哈希表（推荐）",
        code: `/**
 * 路径总和 III - 前缀和 + 哈希表（推荐）
 *
 * 核心思想：
 * 利用前缀和的性质：如果存在两个前缀和 prefixA 和 prefixB，
 * 满足 prefixB - prefixA = targetSum，则从 A 到 B 的路径和等于 targetSum。
 *
 * 算法：
 * 1. 维护从根到当前节点的前缀和 currentSum
 * 2. 用哈希表记录每个前缀和出现的次数
 * 3. 查找 currentSum - targetSum 在哈希表中的次数
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 哈希表和递归栈
 */
function pathSum(root, targetSum) {
  // 哈希表：记录前缀和 → 出现次数
  // 初始化 prefixSum[0] = 1，处理从根节点开始的路径
  const prefixSum = new Map();
  prefixSum.set(0, 1);

  /**
   * DFS 遍历，计算满足条件的路径数
   * @param {TreeNode} node - 当前节点
   * @param {number} currentSum - 从根到当前节点的前缀和
   * @returns {number} - 当前子树中满足条件的路径数
   */
  const dfs = (node, currentSum) => {
    if (node === null) return 0;

    // 更新当前前缀和
    currentSum += node.val;

    // 查找有多少个前缀和等于 currentSum - targetSum
    // 这些前缀和对应的位置到当前节点的路径和 = targetSum
    let count = prefixSum.get(currentSum - targetSum) || 0;

    // 将当前前缀和加入哈希表
    prefixSum.set(currentSum, (prefixSum.get(currentSum) || 0) + 1);

    // 递归处理左右子树
    count += dfs(node.left, currentSum);
    count += dfs(node.right, currentSum);

    // 回溯：恢复哈希表状态（因为不同分支不能共享前缀和）
    prefixSum.set(currentSum, prefixSum.get(currentSum) - 1);

    return count;
  };

  return dfs(root, 0);
}`,
        explanation: `## 前缀和 + 哈希表

### 算法原理

前缀和性质：
\`\`\`
sum(A→B) = prefixSum(B) - prefixSum(A)

如果 sum(A→B) = targetSum
则 prefixSum(A) = prefixSum(B) - targetSum
\`\`\`

所以，找满足条件的路径数 = 找有多少个前缀和等于 currentSum - targetSum。

### 执行过程

\`\`\`
       10         targetSum = 8
      /  \\
     5   -3       前缀和变化：
    / \\    \\       10 → 15 → 18/17 → ...
   3   2   11

节点 10：prefixSum=10，找 10-8=2（没有）
节点 5：prefixSum=15，找 15-8=7（没有）
节点 3：prefixSum=18，找 18-8=10（有！count++）
        → 路径 5→3 的和 = 18-10 = 8 ✓

节点 2：prefixSum=17，找 17-8=9（没有）
节点 1：prefixSum=18，找 18-8=10（有！count++）
        → 路径 5→2→1 的和 = 18-10 = 8 ✓

节点 -3：prefixSum=7，找 7-8=-1（没有）
节点 11：prefixSum=18，找 18-8=10（有！count++）
         → 路径 -3→11 的和 = 18-10 = 8 ✓
\`\`\`

### 为什么要初始化 prefixSum[0] = 1？

处理从根节点开始的路径：
\`\`\`
如果从根到某节点的前缀和 = targetSum
则需要 prefixSum[0] 存在
\`\`\`

### 为什么要回溯？

不同分支的前缀和不能互相影响：
\`\`\`
     1            左分支前缀和 [1, 3]
    / \\           右分支前缀和 [1, 4]
   2   3          不能在右分支中找到左分支的 3
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        animation: {
          type: "tree" as const,
          title: "路径总和 III 演示",
          steps: [
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              description: "树: [10,5,-3,3,2,null,11]，targetSum=8。用前缀和找路径",
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              pointers: { "1": ["curr"] },
              highlights: [{ nodeIds: ["1"], color: "yellow" as const, label: "sum=10" }],
              description: "节点10：prefixSum=10，查找10-8=2（无），map={0:1, 10:1}",
              visitPath: ["1"],
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              pointers: { "2": ["curr"] },
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "yellow" as const, label: "sum=15" },
              ],
              description: "节点5：prefixSum=15，查找15-8=7（无），map={0:1, 10:1, 15:1}",
              visitPath: ["1", "2"],
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              pointers: { "4": ["curr"] },
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2", "4"], color: "green" as const, label: "5→3=8" },
              ],
              description: "节点3：prefixSum=18，查找18-8=10（有！）→ 路径5→3=8 ✓ count=1",
              visitPath: ["1", "2", "4"],
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              pointers: { "5": ["curr"] },
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "yellow" as const },
                { nodeIds: ["5"], color: "yellow" as const, label: "sum=17" },
              ],
              description: "节点2：prefixSum=17，查找17-8=9（无）",
              visitPath: ["1", "2", "5"],
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              pointers: { "3": ["curr"] },
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["3"], color: "yellow" as const, label: "sum=7" },
              ],
              description: "节点-3：prefixSum=7，查找7-8=-1（无）",
              visitPath: ["1", "3"],
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              pointers: { "6": ["curr"] },
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["3", "6"], color: "green" as const, label: "-3→11=8" },
              ],
              description: "节点11：prefixSum=18，查找18-8=10（有！）→ 路径-3→11=8 ✓ count=2",
              visitPath: ["1", "3", "6"],
            },
            {
              nodes: [
                { value: 10, id: "1" },
                { value: 5, id: "2" },
                { value: -3, id: "3" },
                { value: 3, id: "4" },
                { value: 2, id: "5" },
                null,
                { value: 11, id: "6" },
              ],
              highlights: [
                { nodeIds: ["2", "4"], color: "green" as const },
                { nodeIds: ["3", "6"], color: "green" as const },
              ],
              description: "找到2条路径：5→3=8，-3→11=8。答案=2 ✓",
              visitPath: ["1", "2", "3", "4", "5", "6"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "双重递归（暴力）",
        code: `/**
 * 路径总和 III - 双重递归（暴力解法）
 *
 * 核心思想：
 * 对于每个节点，计算以它为起点的所有向下路径中和等于 targetSum 的数量。
 * 然后递归处理所有节点。
 *
 * 两层递归：
 * - 外层：遍历所有节点，作为路径起点
 * - 内层：从某个起点出发，统计满足条件的路径
 *
 * 时间复杂度：O(n²) - 最坏情况，每个节点都要遍历其所有子节点
 * 空间复杂度：O(n) - 递归栈深度
 */
function pathSum(root, targetSum) {
  if (root === null) return 0;

  /**
   * 计算以 node 为起点的满足条件的路径数
   * @param {TreeNode} node - 路径起点
   * @param {number} sum - 剩余需要凑的和
   * @returns {number} - 满足条件的路径数
   */
  const pathsFromNode = (node, sum) => {
    if (node === null) return 0;

    let count = 0;
    // 如果当前节点值等于剩余和，找到一条路径
    if (node.val === sum) count++;

    // 继续向下搜索（路径可以在任意节点结束）
    count += pathsFromNode(node.left, sum - node.val);
    count += pathsFromNode(node.right, sum - node.val);

    return count;
  };

  // 以当前节点为起点的路径数 + 以左子树节点为起点 + 以右子树节点为起点
  return pathsFromNode(root, targetSum) +
         pathSum(root.left, targetSum) +
         pathSum(root.right, targetSum);
}`,
        explanation: `## 双重递归（暴力解法）

### 算法原理

两层递归的分工：
\`\`\`
pathSum(node)      - 遍历所有节点作为起点
pathsFromNode(node) - 计算从某起点出发的路径数
\`\`\`

### 执行过程

\`\`\`
       10         targetSum = 8
      /  \\
     5   -3
    / \\    \\
   3   2   11
      /
     1

pathSum(10)：
  pathsFromNode(10, 8)：10→... 没有
  + pathSum(5)：
      pathsFromNode(5, 8)：5→3=8 ✓，5→2→1=8 ✓
      + pathSum(3) + pathSum(2)
  + pathSum(-3)：
      pathsFromNode(-3, 8)：-3→11=8 ✓
      + pathSum(11)
\`\`\`

### 时间复杂度分析

\`\`\`
对于每个节点，pathsFromNode 遍历其所有子节点
最坏情况（链表形态）：
  节点1: 遍历 n 个节点
  节点2: 遍历 n-1 个节点
  ...
  总计: O(n²)

平均情况（平衡树）：O(n log n)
\`\`\`

### 优缺点

| 方面 | 评价 |
|-----|-----|
| 优点 | 思路直观，容易理解 |
| 缺点 | 时间复杂度高，有重复计算 |
| 适用 | 面试中作为初始解法 |

### 复杂度
- 时间：O(n²) 最坏，O(n log n) 平均
- 空间：O(n)，递归栈`,
        animation: {
          type: "tree" as const,
          title: "路径总和 III - 双重递归",
          steps: [
            {
              nodes: [
                { value: 5, id: "1" },
                { value: 3, id: "2" },
                { value: 2, id: "3" },
              ],
              description: "简化例子：树[5,3,2]，targetSum=8。双重递归：外层遍历起点，内层计数",
            },
            {
              nodes: [
                { value: 5, id: "1" },
                { value: 3, id: "2" },
                { value: 2, id: "3" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const, label: "起点" }],
              description: "以5为起点：pathsFromNode(5,8)，5≠8继续向下",
            },
            {
              nodes: [
                { value: 5, id: "1" },
                { value: 3, id: "2" },
                { value: 2, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1", "2"], color: "green" as const, label: "5+3=8 ✓" },
              ],
              description: "从5往下到3：5+3=8 ✓ 找到一条路径！count=1",
            },
            {
              nodes: [
                { value: 5, id: "1" },
                { value: 3, id: "2" },
                { value: 2, id: "3" },
              ],
              highlights: [{ nodeIds: ["2"], color: "yellow" as const, label: "起点" }],
              description: "以3为起点：pathsFromNode(3,8)，3≠8，往下没有=5的",
            },
            {
              nodes: [
                { value: 5, id: "1" },
                { value: 3, id: "2" },
                { value: 2, id: "3" },
              ],
              highlights: [{ nodeIds: ["3"], color: "yellow" as const, label: "起点" }],
              description: "以2为起点：pathsFromNode(2,8)，2≠8，无子节点",
            },
            {
              nodes: [
                { value: 5, id: "1" },
                { value: 3, id: "2" },
                { value: 2, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const }],
              description: "总共找到1条路径：5→3=8。答案=1 ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 20. 将有序数组转换为二叉搜索树 (108)
  {
    id: "convert-sorted-array-to-binary-search-tree",
    leetcodeId: 108,
    title: "将有序数组转换为二叉搜索树",
    titleEn: "Convert Sorted Array to Binary Search Tree",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["树", "二叉搜索树", "数组", "分治", "二叉树"],
    frontendRelevance: "medium",
    frontendNote: "有序数组转BST",
    description: `给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也是一个合法答案
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,3]
输出：[3,1]
解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` 按 严格递增 顺序排列`,
    initialCode: `function sortedArrayToBST(nums) {
  // 在此处编写代码
}`,
    solution: `function sortedArrayToBST(nums) {
  const build = (left, right) => {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);

    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);

    return root;
  };

  return build(0, nums.length - 1);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[-10,-3,0,5,9]],
        expected: [0,-3,9,-10,null,5]
      },
      {
        id: "2",
        name: "示例2",
        input: [[1,3]],
        expected: [3,1]
      },
      {
        id: "3",
        name: "单元素",
        input: [[0]],
        expected: [0]
      }
    ],
    hints: [
      "选择中间元素作为根节点可以保证平衡",
      "递归构建左右子树",
      "有序数组的中序遍历就是 BST"
    ],
    explanation: `## 解题思路

### 分治法

要构建平衡的 BST，关键是让左右子树的节点数尽量相等。

对于有序数组，选择中间元素作为根：
- 左半部分构成左子树
- 右半部分构成右子树

递归执行这个过程即可。

### 关键点
- 中间元素作为根保证了平衡性
- 有序数组保证了 BST 性质
- 左子树 < 根 < 右子树

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(log n)，递归栈深度`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["convert-sorted-list-to-binary-search-tree"],
    solutions: [
      {
        name: "分治（推荐）",
        code: `/**
 * 将有序数组转换为二叉搜索树 - 分治法（推荐）
 *
 * 核心思想：
 * 要构建高度平衡的 BST，关键是让左右子树的节点数尽量相等。
 * 对于有序数组，选择中间元素作为根节点，这样：
 * - 左半部分（比根小）构成左子树
 * - 右半部分（比根大）构成右子树
 *
 * BST 性质保证：有序数组 + 中序遍历
 * 平衡性保证：每次选中间元素
 *
 * 时间复杂度：O(n) - 每个元素访问一次
 * 空间复杂度：O(log n) - 递归栈深度（平衡树）
 */
function sortedArrayToBST(nums) {
  /**
   * 递归构建 BST
   * @param {number} left - 当前子数组的左边界
   * @param {number} right - 当前子数组的右边界
   * @returns {TreeNode|null} - 构建的子树根节点
   */
  const build = (left, right) => {
    // 边界情况：空区间
    if (left > right) return null;

    // 选择中间元素作为根（偏左）
    // 这保证左右子树节点数差不超过 1
    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);

    // 递归构建左子树：使用 [left, mid-1] 区间
    root.left = build(left, mid - 1);
    // 递归构建右子树：使用 [mid+1, right] 区间
    root.right = build(mid + 1, right);

    return root;
  };

  // 从整个数组开始构建
  return build(0, nums.length - 1);
}`,
        explanation: `## 分治法

### 算法原理

有序数组 → 平衡 BST 的关键：
\`\`\`
选择中间元素作为根
├── 左半部分 → 左子树
└── 右半部分 → 右子树
\`\`\`

### 执行过程

\`\`\`
nums = [-10, -3, 0, 5, 9]

build(0, 4)：mid=2, root=0
├── build(0, 1)：mid=0, root=-10
│   ├── build(0, -1)：null
│   └── build(1, 1)：mid=1, root=-3
└── build(3, 4)：mid=3, root=5
    ├── build(3, 2)：null
    └── build(4, 4)：mid=4, root=9

结果：
       0
      / \\
   -10   5
     \\    \\
     -3    9
\`\`\`

### 为什么是平衡的？

每次选中间元素：
- 左右子树节点数差 ≤ 1
- 递归下去，每层都保持平衡
- 最终树高 = O(log n)

### BST 性质为什么满足？

\`\`\`
有序数组：[a, b, c, d, e]
选择 c 作为根：
- 左边 [a, b] 都 < c → 构成左子树 ✓
- 右边 [d, e] 都 > c → 构成右子树 ✓
\`\`\`

### 复杂度
- 时间：O(n)，每个元素访问一次
- 空间：O(log n)，递归栈深度`,
        animation: {
          type: "tree" as const,
          title: "有序数组转换为BST演示",
          steps: [
            {
              nodes: [],
              description: "数组 nums = [-10, -3, 0, 5, 9]。选中间元素作根，递归构建平衡BST",
            },
            {
              nodes: [{ value: 0, id: "1" }],
              highlights: [{ nodeIds: ["1"], color: "green" as const, label: "mid=2" }],
              description: "build(0,4): mid=2，选nums[2]=0作为根节点",
              visitPath: ["1"],
            },
            {
              nodes: [
                { value: 0, id: "1" },
                { value: -10, id: "2" },
                null,
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "green" as const, label: "mid=0" },
              ],
              description: "build(0,1): mid=0，选nums[0]=-10作为左子树根",
              visitPath: ["1", "2"],
            },
            {
              nodes: [
                { value: 0, id: "1" },
                { value: -10, id: "2" },
                null,
                null,
                { value: -3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "blue" as const },
                { nodeIds: ["3"], color: "green" as const, label: "mid=1" },
              ],
              description: "build(1,1): mid=1，选nums[1]=-3作为-10的右子节点",
              visitPath: ["1", "2", "3"],
            },
            {
              nodes: [
                { value: 0, id: "1" },
                { value: -10, id: "2" },
                { value: 5, id: "4" },
                null,
                { value: -3, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2", "3"], color: "blue" as const },
                { nodeIds: ["4"], color: "green" as const, label: "mid=3" },
              ],
              description: "build(3,4): mid=3，选nums[3]=5作为右子树根",
              visitPath: ["1", "2", "3", "4"],
            },
            {
              nodes: [
                { value: 0, id: "1" },
                { value: -10, id: "2" },
                { value: 5, id: "4" },
                null,
                { value: -3, id: "3" },
                null,
                { value: 9, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "3", "4"], color: "blue" as const },
                { nodeIds: ["5"], color: "green" as const, label: "mid=4" },
              ],
              description: "build(4,4): mid=4，选nums[4]=9作为5的右子节点",
              visitPath: ["1", "2", "3", "4", "5"],
            },
            {
              nodes: [
                { value: 0, id: "1" },
                { value: -10, id: "2" },
                { value: 5, id: "4" },
                null,
                { value: -3, id: "3" },
                null,
                { value: 9, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "完成！平衡BST: [0,-10,5,null,-3,null,9]，高度差≤1 ✓",
              visitPath: ["1", "2", "3", "4", "5"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "分治（选择中间偏右）",
        code: `/**
 * 将有序数组转换为二叉搜索树 - 分治法（中间偏右）
 *
 * 核心思想：
 * 与标准分治法相同，唯一区别是当数组长度为偶数时，
 * 选择中间偏右的元素作为根节点。
 *
 * 两种选择都能产生高度平衡的 BST，只是结构略有不同。
 *
 * 时间复杂度：O(n) - 每个元素访问一次
 * 空间复杂度：O(log n) - 递归栈深度
 */
function sortedArrayToBST(nums) {
  /**
   * 递归构建 BST（选择中间偏右的元素）
   */
  const build = (left, right) => {
    if (left > right) return null;

    // 选择中间偏右的元素作为根
    // 当 left + right 为奇数时，+1 后向上取整
    const mid = Math.floor((left + right + 1) / 2);
    const root = new TreeNode(nums[mid]);

    // 递归构建左右子树
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);

    return root;
  };

  return build(0, nums.length - 1);
}`,
        explanation: `## 分治法（中间偏右）

### 与中间偏左的区别

当数组长度为偶数时：
\`\`\`
nums = [1, 2, 3, 4]

偏左：mid = (0+3)/2 = 1 → 选择 2
偏右：mid = (0+3+1)/2 = 2 → 选择 3
\`\`\`

### 两种方式的结果

\`\`\`
偏左：          偏右：
    2               3
   / \\             / \\
  1   3           2   4
       \\         /
        4       1
\`\`\`

两者都是高度平衡的 BST，只是结构不同。

### 何时使用偏右？

题目可能要求特定结构：
- 某些 OJ 期望特定答案
- 或者题目有额外约束

一般情况下两种方式都可以。

### 复杂度
- 时间：O(n)
- 空间：O(log n)`,
        animation: {
          type: "tree" as const,
          title: "有序数组转BST - 中间偏右",
          steps: [
            {
              nodes: [],
              description: "nums = [1,2,3,4]。中间偏右：mid=(0+3+1)/2=2，选3作根",
            },
            {
              nodes: [{ value: 3, id: "1" }],
              highlights: [{ nodeIds: ["1"], color: "green" as const, label: "root" }],
              description: "build(0,3): mid=2，选nums[2]=3作为根节点",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 2, id: "2" },
                { value: 4, id: "3" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2", "3"], color: "green" as const },
              ],
              description: "build(0,1): mid=1选2。build(3,3): mid=3选4",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 2, id: "2" },
                { value: 4, id: "3" },
                { value: 1, id: "4" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "3"], color: "blue" as const },
                { nodeIds: ["4"], color: "green" as const },
              ],
              description: "build(0,0): mid=0选1作为2的左子节点",
            },
            {
              nodes: [
                { value: 3, id: "1" },
                { value: 2, id: "2" },
                { value: 4, id: "3" },
                { value: 1, id: "4" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4"], color: "green" as const }],
              description: "完成！与偏左结构不同但都是平衡BST ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(log n)",
      },
    ],
  },

  // 21. 填充每个节点的下一个右侧节点指针 II (117)
  {
    id: "populating-next-right-pointers-in-each-node-ii",
    leetcodeId: 117,
    title: "填充每个节点的下一个右侧节点指针 II",
    titleEn: "Populating Next Right Pointers in Each Node II",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["树", "广度优先搜索", "链表", "二叉树"],
    frontendRelevance: "low",
    frontendNote: "填充右指针II",
    description: `给定一个二叉树：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,3,4,5,null,7]
输出：[1,#,2,3,#,4,5,7,#]
解释：使用 # 表示每一层的末尾
\`\`\`

**示例 2：**
\`\`\`
输入：root = []
输出：[]
解释：空树
\`\`\``,
    constraints: `- 树中的节点数在范围 \`[0, 6000]\` 内
- \`-100 <= Node.val <= 100\``,
    initialCode: `function connect(root) {
  // 在此处编写代码
}`,
    solution: `function connect(root) {
  if (root === null) return null;

  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (i < size - 1) {
        node.next = queue[0];
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return root;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,3,4,5,null,7]],
        expected: [1,null,2,3,null,4,5,7,null]
      },
      {
        id: "2",
        name: "空树",
        input: [[]],
        expected: []
      }
    ],
    hints: [
      "可以使用层序遍历（BFS）",
      "也可以利用已建立的 next 指针进行 O(1) 空间的遍历",
      "每一层从左到右连接"
    ],
    explanation: `## 解题思路

### BFS 层序遍历

使用队列进行层序遍历，同一层的节点依次连接：
- 当前节点的 next 指向队列中的下一个节点
- 每层最后一个节点的 next 为 null

### O(1) 空间解法

利用已建立的 next 指针：
1. 用一个 dummy 节点作为下一层的头
2. 遍历当前层，把下一层的节点连接起来
3. 移动到下一层重复

### 复杂度分析
- BFS：时间 O(n)，空间 O(n)
- O(1) 空间：时间 O(n)，空间 O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["populating-next-right-pointers-in-each-node", "binary-tree-level-order-traversal"],
    solutions: [
      {
        name: "BFS 层序遍历",
        code: `/**
 * 填充每个节点的下一个右侧节点指针 II - BFS 层序遍历
 *
 * 核心思想：
 * 使用队列进行层序遍历，同一层的节点按顺序出队。
 * 当处理某个节点时，队首的下一个节点就是它的右侧节点。
 *
 * 关键观察：
 * 在处理同一层时，queue[0] 就是当前节点的下一个右侧节点。
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 队列空间（最坏情况完全二叉树）
 */
function connect(root) {
  // 边界情况：空树
  if (root === null) return null;

  // BFS 队列
  const queue = [root];

  while (queue.length > 0) {
    // 当前层的节点数
    const size = queue.length;

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      // 连接同层的下一个节点
      // 如果不是当前层的最后一个节点，则 next 指向队首
      if (i < size - 1) {
        node.next = queue[0];
      }
      // 最后一个节点的 next 默认为 null，无需设置

      // 子节点入队（用于处理下一层）
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return root;
}`,
        explanation: `## BFS 层序遍历

### 算法原理

利用 BFS 按层处理的特性：
\`\`\`
队列中同一层的节点是连续的
处理节点 A 时，queue[0] 就是 A 的右侧节点
\`\`\`

### 执行过程

\`\`\`
       1              初始：queue = [1]
      / \\
     2   3            第1层：
    / \\    \\           处理 1，是最后一个，next=null
   4   5   7           queue = [2, 3]

                      第2层：
                        处理 2，next=queue[0]=3
                        处理 3，是最后一个，next=null
                        queue = [4, 5, 7]

                      第3层：
                        处理 4，next=queue[0]=5
                        处理 5，next=queue[0]=7
                        处理 7，是最后一个，next=null
\`\`\`

### 为什么 queue[0] 是右侧节点？

\`\`\`
处理顺序：从左到右
入队顺序：先左后右
所以 queue[0] 一定是当前节点的右侧
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(n)，队列空间`,
        animation: {
          type: "tree" as const,
          title: "填充右侧节点指针演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                null,
                { value: 7, id: "6" },
              ],
              description: "树: [1,2,3,4,5,null,7]。将每层节点用next指针连接",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                null,
                { value: 7, id: "6" },
              ],
              highlights: [{ nodeIds: ["1"], color: "green" as const, label: "→null" }],
              description: "第1层：节点1是唯一节点，1.next = null",
              visitPath: ["1"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                null,
                { value: 7, id: "6" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2"], color: "yellow" as const, label: "→3" },
                { nodeIds: ["3"], color: "green" as const, label: "→null" },
              ],
              description: "第2层：2.next = 3，3.next = null",
              visitPath: ["1", "2", "3"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                null,
                { value: 7, id: "6" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "3"], color: "blue" as const },
                { nodeIds: ["4"], color: "yellow" as const, label: "→5" },
                { nodeIds: ["5"], color: "yellow" as const, label: "→7" },
                { nodeIds: ["6"], color: "green" as const, label: "→null" },
              ],
              description: "第3层：4.next = 5，5.next = 7，7.next = null",
              visitPath: ["1", "2", "3", "4", "5", "6"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                null,
                { value: 7, id: "6" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5", "6"], color: "green" as const }],
              description: "完成！每层形成链表：[1,#] → [2→3,#] → [4→5→7,#]",
              visitPath: ["1", "2", "3", "4", "5", "6"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "O(1) 空间（推荐）",
        code: `/**
 * 填充每个节点的下一个右侧节点指针 II - O(1) 空间
 *
 * 核心思想：
 * 利用已建立的 next 指针来遍历当前层，同时连接下一层的节点。
 * 使用 dummy 节点作为下一层链表的虚拟头节点。
 *
 * 算法流程：
 * 1. 遍历当前层（通过 next 指针）
 * 2. 将下一层的节点用 next 指针串联起来
 * 3. 移动到下一层，重复过程
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(1) - 只使用常数额外空间
 */
function connect(root) {
  // cur 指向当前层的起始节点
  let cur = root;

  while (cur !== null) {
    // dummy 节点：下一层链表的虚拟头
    const dummy = new Node(0);
    // tail 指针：用于构建下一层的链表
    let tail = dummy;

    // 遍历当前层（通过 next 指针），连接下一层
    while (cur !== null) {
      // 如果有左子节点，加入下一层链表
      if (cur.left !== null) {
        tail.next = cur.left;
        tail = tail.next;
      }
      // 如果有右子节点，加入下一层链表
      if (cur.right !== null) {
        tail.next = cur.right;
        tail = tail.next;
      }
      // 移动到当前层的下一个节点
      cur = cur.next;
    }

    // 移动到下一层的第一个节点
    cur = dummy.next;
  }

  return root;
}`,
        explanation: `## O(1) 空间解法

### 算法原理

利用上一层已建立的 next 指针：
\`\`\`
当前层：通过 next 指针遍历
下一层：用 tail 指针串联成链表
\`\`\`

### 执行过程

\`\`\`
       1              第1层处理（cur=1）：
      / \\               dummy → tail
     2   3              遍历 1：tail.next=2, tail.next=3
    / \\    \\             dummy → 2 → 3
   4   5   7

                       第2层处理（cur=2）：
                         dummy → tail
                         遍历 2：tail.next=4, tail.next=5
                         遍历 3（通过 2.next）：tail.next=7
                         dummy → 4 → 5 → 7

                       第3层处理（cur=4）：
                         4, 5, 7 都没有子节点
                         dummy.next = null
                         结束
\`\`\`

### dummy 节点的作用

\`\`\`
避免处理头节点的特殊情况：
- dummy.next 始终指向下一层的第一个节点
- 不需要单独判断下一层的头是谁
\`\`\`

### 为什么是 O(1) 空间？

\`\`\`
不使用队列
只用固定数量的指针：cur, dummy, tail
利用节点本身的 next 指针存储信息
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(1)`,
        animation: {
          type: "tree" as const,
          title: "填充右指针 - O(1)空间",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["1"], color: "yellow" as const, label: "cur" }],
              description: "cur=1。利用next指针遍历当前层，同时连接下一层",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2", "3"], color: "green" as const, label: "2→3" },
              ],
              description: "遍历1的子节点：tail连接2和3。下一层链表：2→3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "yellow" as const, label: "cur" },
                { nodeIds: ["3"], color: "blue" as const },
              ],
              description: "cur移到下一层头dummy.next=2。通过next遍历2→3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["2", "3"], color: "blue" as const },
                { nodeIds: ["4", "5"], color: "green" as const, label: "4→5" },
              ],
              description: "遍历2的子节点4,5。下一层链表：4→5",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "完成！每层形成链表，O(1)空间 ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 22. 二叉搜索树迭代器 (173)
  {
    id: "binary-search-tree-iterator",
    leetcodeId: 173,
    title: "二叉搜索树迭代器",
    titleEn: "Binary Search Tree Iterator",
    difficulty: "medium",
    category: "binary-tree",
    tags: ["栈", "树", "设计", "二叉搜索树", "二叉树", "迭代器"],
    frontendRelevance: "low",
    frontendNote: "BST迭代器",
    description: `实现一个二叉搜索树迭代器类 BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：

- BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
- boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
- int next() 将指针向右移动，然后返回指针处的数字。

注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。

你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。`,
    examples: `**示例：**
\`\`\`
输入：
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
输出：
[null, 3, 7, true, 9, true, 15, true, 20, false]
解释：按中序遍历顺序返回节点值
\`\`\``,
    constraints: `- 树中节点的数目在范围 \`[1, 10^5]\` 内
- \`0 <= Node.val <= 10^6\`
- 最多调用 \`10^5\` 次 \`hasNext\` 和 \`next\` 操作`,
    initialCode: `class BSTIterator {
  constructor(root) {
    // 在此处编写代码
  }

  next() {
    // 在此处编写代码
  }

  hasNext() {
    // 在此处编写代码
  }
}`,
    solution: `class BSTIterator {
  constructor(root) {
    this.stack = [];
    this._pushLeft(root);
  }

  _pushLeft(node) {
    while (node !== null) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next() {
    const node = this.stack.pop();
    this._pushLeft(node.right);
    return node.val;
  }

  hasNext() {
    return this.stack.length > 0;
  }
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[7,3,15,null,null,9,20]],
        expected: [3,7,9,15,20]
      }
    ],
    hints: [
      "使用栈来模拟中序遍历",
      "只需要存储从根到当前节点的路径",
      "每次 next() 后，将右子树的左链入栈"
    ],
    explanation: `## 解题思路

### 受控递归（栈模拟）

使用栈来模拟中序遍历的过程：
1. 初始化时，将根节点的左链全部入栈
2. next() 时，弹出栈顶，将其右子树的左链入栈
3. hasNext() 检查栈是否为空

### 关键点
- 栈中存储的是"待访问"的节点
- 每次 pop 后，需要处理右子树
- 平均时间复杂度 O(1)

### 复杂度分析
- 时间复杂度：next() 平均 O(1)，hasNext() O(1)
- 空间复杂度：O(h)，h 为树的高度`,
    timeComplexity: "O(1) 平均",
    spaceComplexity: "O(h)",
    relatedProblems: ["binary-tree-inorder-traversal", "flatten-2d-vector"],
    solutions: [
      {
        name: "栈模拟（推荐）",
        code: `/**
 * 二叉搜索树迭代器 - 栈模拟（推荐）
 *
 * 核心思想：
 * 使用栈来模拟中序遍历的递归过程，实现"受控递归"。
 * 栈中存储的是"待访问"的节点（已访问完左子树，等待访问自身和右子树）。
 *
 * 关键操作：
 * - _pushLeft：将某节点及其所有左子节点入栈（模拟递归进入左子树）
 * - next：弹出栈顶，处理其右子树
 *
 * 时间复杂度：next() 平均 O(1)，hasNext() O(1)
 * 空间复杂度：O(h) - h 为树的高度
 */
class BSTIterator {
  /**
   * 构造函数
   * @param {TreeNode} root - BST 的根节点
   */
  constructor(root) {
    // 栈：存储待访问的节点
    this.stack = [];
    // 初始化：将根节点的左链入栈
    this._pushLeft(root);
  }

  /**
   * 将节点及其所有左子节点入栈
   * 模拟中序遍历进入左子树的过程
   * @param {TreeNode} node - 起始节点
   */
  _pushLeft(node) {
    while (node !== null) {
      this.stack.push(node);
      node = node.left;
    }
  }

  /**
   * 返回 BST 中的下一个最小元素
   * @returns {number} - 下一个最小值
   */
  next() {
    // 弹出栈顶节点（当前最小）
    const node = this.stack.pop();
    // 处理右子树：将右子树的左链入栈
    this._pushLeft(node.right);
    return node.val;
  }

  /**
   * 检查是否还有下一个元素
   * @returns {boolean} - 是否有下一个元素
   */
  hasNext() {
    return this.stack.length > 0;
  }
}`,
        explanation: `## 栈模拟中序遍历

### 算法原理

中序遍历的递归过程：
1. 递归访问左子树
2. 访问当前节点
3. 递归访问右子树

用栈模拟：
- 栈中节点 = 已完成步骤1，等待步骤2、3
- pop 时执行步骤2，然后对右子树执行步骤1

### 执行过程

\`\`\`
       7              初始化：
      / \\               pushLeft(7)
     3  15              stack: [7, 3]
       /  \\
      9   20

next():
  pop 3 → 返回 3
  pushLeft(3.right=null)
  stack: [7]

next():
  pop 7 → 返回 7
  pushLeft(7.right=15)
  stack: [15, 9]

next():
  pop 9 → 返回 9
  pushLeft(9.right=null)
  stack: [15]

...以此类推，输出 3, 7, 9, 15, 20
\`\`\`

### 为什么平均 O(1)？

\`\`\`
每个节点：入栈1次，出栈1次
n 次 next() 操作：共 2n 次栈操作
平均每次：O(1)
\`\`\`

### 栈空间分析

\`\`\`
栈中最多存储：从根到叶子的路径
空间复杂度：O(h)，h 为树高
平衡 BST：O(log n)
链状 BST：O(n)
\`\`\`

### 复杂度
- 时间：next() 平均 O(1)，hasNext() O(1)
- 空间：O(h)`,
        animation: {
          type: "tree" as const,
          title: "BST迭代器演示",
          steps: [
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              description: "BST: [7,3,15,null,null,9,20]。用栈模拟中序遍历",
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2"], color: "yellow" as const, label: "入栈" },
              ],
              description: "初始化：pushLeft(7)，将7和3入栈，stack=[7,3]",
              visitPath: ["1", "2"],
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "yellow" as const },
                { nodeIds: ["2"], color: "green" as const, label: "pop→3" },
              ],
              description: "next(): pop 3，返回3。3无右子树，stack=[7]",
              visitPath: ["2"],
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "blue" as const },
                { nodeIds: ["1"], color: "green" as const, label: "pop→7" },
                { nodeIds: ["3", "4"], color: "yellow" as const, label: "入栈" },
              ],
              description: "next(): pop 7，返回7。pushLeft(15)，stack=[15,9]",
              visitPath: ["1", "3", "4"],
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2"], color: "blue" as const },
                { nodeIds: ["4"], color: "green" as const, label: "pop→9" },
                { nodeIds: ["3"], color: "yellow" as const },
              ],
              description: "next(): pop 9，返回9。9无右子树，stack=[15]",
              visitPath: ["4"],
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "4"], color: "blue" as const },
                { nodeIds: ["3"], color: "green" as const, label: "pop→15" },
                { nodeIds: ["5"], color: "yellow" as const, label: "入栈" },
              ],
              description: "next(): pop 15，返回15。pushLeft(20)，stack=[20]",
              visitPath: ["3", "5"],
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
                null,
                null,
                { value: 9, id: "4" },
                { value: 20, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "next(): pop 20，返回20。stack=[]，hasNext()=false。完成：3,7,9,15,20",
              visitPath: ["1", "2", "3", "4", "5"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(1) 平均",
        spaceComplexity: "O(h)",
      },
      {
        name: "预处理（数组存储）",
        code: `/**
 * 二叉搜索树迭代器 - 预处理法
 *
 * 核心思想：
 * 在构造函数中进行完整的中序遍历，将结果存入数组。
 * 之后的 next() 和 hasNext() 直接操作数组。
 *
 * 优点：next() 和 hasNext() 都是严格 O(1)
 * 缺点：空间复杂度 O(n)，不够"懒"
 *
 * 时间复杂度：构造 O(n)，next() O(1)，hasNext() O(1)
 * 空间复杂度：O(n) - 存储所有节点值
 */
class BSTIterator {
  /**
   * 构造函数
   * @param {TreeNode} root - BST 的根节点
   */
  constructor(root) {
    // 存储中序遍历结果的数组
    this.nodes = [];
    // 当前指针位置
    this.index = 0;
    // 进行完整的中序遍历
    this._inorder(root);
  }

  /**
   * 中序遍历，将节点值存入数组
   * @param {TreeNode} node - 当前节点
   */
  _inorder(node) {
    if (node === null) return;
    this._inorder(node.left);    // 左
    this.nodes.push(node.val);   // 根
    this._inorder(node.right);   // 右
  }

  /**
   * 返回下一个最小元素
   * @returns {number} - 下一个最小值
   */
  next() {
    // 返回当前位置的值，并移动指针
    return this.nodes[this.index++];
  }

  /**
   * 检查是否还有下一个元素
   * @returns {boolean} - 是否有下一个元素
   */
  hasNext() {
    return this.index < this.nodes.length;
  }
}`,
        explanation: `## 预处理法

### 算法原理

一次性完成所有工作：
\`\`\`
构造函数：完整中序遍历 → 数组
next()：数组访问 → O(1)
hasNext()：索引比较 → O(1)
\`\`\`

### 执行过程

\`\`\`
       7              _inorder(root):
      / \\               nodes = [3, 7, 9, 15, 20]
     3  15              index = 0
       /  \\
      9   20

next(): nodes[0]=3, index=1
next(): nodes[1]=7, index=2
next(): nodes[2]=9, index=3
...
\`\`\`

### 与栈模拟对比

| 方面 | 栈模拟 | 预处理 |
|-----|-------|--------|
| 构造时间 | O(h) | O(n) |
| next() | 平均 O(1) | 严格 O(1) |
| 空间 | O(h) | O(n) |
| 懒加载 | 是 | 否 |

### 何时使用预处理？

- 确定会遍历所有元素
- 需要严格 O(1) 的 next()
- 空间不是瓶颈

### 复杂度
- 时间：构造 O(n)，next() O(1)，hasNext() O(1)
- 空间：O(n)`,
        animation: {
          type: "tree" as const,
          title: "BST迭代器 - 预处理法",
          steps: [
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
              ],
              description: "BST: [7,3,15]。预处理：先中序遍历存入数组",
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
              ],
              highlights: [{ nodeIds: ["2"], color: "yellow" as const }],
              visitPath: ["2"],
              description: "中序遍历：先访问左子树，nodes=[3]",
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
              ],
              highlights: [
                { nodeIds: ["2"], color: "blue" as const },
                { nodeIds: ["1"], color: "yellow" as const },
              ],
              visitPath: ["2", "1"],
              description: "访问根节点，nodes=[3,7]",
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
              ],
              highlights: [
                { nodeIds: ["2", "1"], color: "blue" as const },
                { nodeIds: ["3"], color: "yellow" as const },
              ],
              visitPath: ["2", "1", "3"],
              description: "访问右子树，nodes=[3,7,15]",
            },
            {
              nodes: [
                { value: 7, id: "1" },
                { value: 3, id: "2" },
                { value: 15, id: "3" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3"], color: "green" as const }],
              description: "预处理完成！next()只需O(1)访问数组",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(1)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 23. 完全二叉树的节点个数 (222)
  {
    id: "count-complete-tree-nodes",
    leetcodeId: 222,
    title: "完全二叉树的节点个数",
    titleEn: "Count Complete Tree Nodes",
    difficulty: "easy",
    category: "binary-tree",
    tags: ["位运算", "树", "二分查找", "二叉树"],
    frontendRelevance: "low",
    frontendNote: "完全二叉树节点数",
    description: `给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1 ~ 2^h 个节点。`,
    examples: `**示例 1：**
\`\`\`
输入：root = [1,2,3,4,5,6]
输出：6
解释：完全二叉树有 6 个节点
\`\`\`

**示例 2：**
\`\`\`
输入：root = []
输出：0
解释：空树
\`\`\`

**示例 3：**
\`\`\`
输入：root = [1]
输出：1
解释：单节点
\`\`\``,
    constraints: `- 树中节点的数目范围是 \`[0, 5 * 10^4]\`
- \`0 <= Node.val <= 5 * 10^4\`
- 题目数据保证输入的树是 完全二叉树`,
    initialCode: `function countNodes(root) {
  // 在此处编写代码
}`,
    solution: `function countNodes(root) {
  if (root === null) return 0;

  let leftDepth = 0, rightDepth = 0;
  let left = root, right = root;

  while (left !== null) {
    leftDepth++;
    left = left.left;
  }

  while (right !== null) {
    rightDepth++;
    right = right.right;
  }

  // 如果左右深度相等，是满二叉树
  if (leftDepth === rightDepth) {
    return Math.pow(2, leftDepth) - 1;
  }

  // 否则递归计算
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,3,4,5,6]],
        expected: 6
      },
      {
        id: "2",
        name: "空树",
        input: [[]],
        expected: 0
      },
      {
        id: "3",
        name: "单节点",
        input: [[1]],
        expected: 1
      }
    ],
    hints: [
      "完全二叉树的特殊性质可以优化计算",
      "如果左右子树高度相等，左子树是满二叉树",
      "可以用二分查找最后一层的节点数"
    ],
    explanation: `## 解题思路

### 利用完全二叉树性质

对于完全二叉树：
1. 如果左右最深路径相等，则是满二叉树，节点数 = 2^h - 1
2. 否则递归计算左右子树

由于完全二叉树的性质，每次递归至少有一半是满二叉树，可以直接计算。

### 复杂度分析
- 时间复杂度：O(log²n)
- 空间复杂度：O(log n)`,
    timeComplexity: "O(log²n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["closest-binary-search-tree-value"],
    solutions: [
      {
        name: "利用完全二叉树性质（推荐）",
        code: `/**
 * 完全二叉树的节点个数 - 利用完全二叉树性质（推荐）
 *
 * 核心思想：
 * 利用完全二叉树的特殊性质进行优化：
 * 1. 如果最左路径深度 = 最右路径深度，则是满二叉树
 * 2. 满二叉树的节点数 = 2^h - 1
 * 3. 否则递归计算左右子树
 *
 * 关键观察：
 * 对于完全二叉树，左右子树中至少有一个是满二叉树。
 *
 * 时间复杂度：O(log²n) - 递归 O(log n) 层，每层 O(log n) 计算深度
 * 空间复杂度：O(log n) - 递归栈深度
 */
function countNodes(root) {
  // 边界情况：空树
  if (root === null) return 0;

  // 计算最左路径深度和最右路径深度
  let leftDepth = 0, rightDepth = 0;
  let left = root, right = root;

  // 最左路径：一直向左走
  while (left !== null) {
    leftDepth++;
    left = left.left;
  }

  // 最右路径：一直向右走
  while (right !== null) {
    rightDepth++;
    right = right.right;
  }

  // 如果左右深度相等，是满二叉树
  // 满二叉树节点数 = 2^h - 1
  if (leftDepth === rightDepth) {
    return Math.pow(2, leftDepth) - 1;
  }

  // 否则递归计算：1（当前节点）+ 左子树 + 右子树
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
        explanation: `## 利用完全二叉树性质

### 算法原理

完全二叉树的特性：
\`\`\`
如果 leftDepth == rightDepth → 满二叉树
如果 leftDepth != rightDepth → 最后一层未填满
\`\`\`

满二叉树节点数公式：
\`\`\`
2^h - 1（h 是层数/深度）
\`\`\`

### 为什么这样判断？

\`\`\`
完全二叉树的定义：
- 除最后一层外，其他层都是满的
- 最后一层的节点都靠左

所以：
- 最左路径 = 树的最大深度
- 最右路径 ≤ 最大深度
- 如果相等，说明最后一层也填满了 → 满二叉树
\`\`\`

### 执行过程

\`\`\`
       1              leftDepth=3, rightDepth=3
      / \\             相等 → 满二叉树 → 2^3-1=7
     2   3
    /\\   /\\
   4  5 6  7

       1              leftDepth=3, rightDepth=2
      / \\             不相等 → 递归
     2   3              = 1 + countNodes(2) + countNodes(3)
    /\\
   4  5

countNodes(2)：leftDepth=2=rightDepth → 2^2-1=3
countNodes(3)：leftDepth=1=rightDepth → 2^1-1=1
总计：1 + 3 + 1 = 5
\`\`\`

### 时间复杂度分析

\`\`\`
递归深度：O(log n)
每次递归计算深度：O(log n)
但关键是：每次递归至少一边是满二叉树！
所以总体：O(log²n)
\`\`\`

### 复杂度
- 时间：O(log²n)
- 空间：O(log n)，递归栈`,
        animation: {
          type: "tree" as const,
          title: "完全二叉树节点个数演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              description: "完全二叉树 [1,2,3,4,5,6]。利用完全二叉树性质快速计算节点数",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              pointers: { "1": ["root"] },
              highlights: [
                { nodeIds: ["1", "2", "4"], color: "yellow" as const, label: "左深=3" },
                { nodeIds: ["1", "3"], color: "blue" as const, label: "右深=2" },
              ],
              description: "计算根节点：左深度=3，右深度=2，不相等→需递归",
              visitPath: ["1"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2", "4"], color: "yellow" as const, label: "左=2" },
                { nodeIds: ["2", "5"], color: "green" as const, label: "右=2" },
              ],
              description: "递归左子树(2)：左深=右深=2 → 满二叉树！节点数=2²-1=3",
              visitPath: ["1", "2"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["1"], color: "blue" as const },
                { nodeIds: ["2", "4", "5"], color: "blue" as const },
                { nodeIds: ["3", "6"], color: "yellow" as const, label: "左=2" },
                { nodeIds: ["3"], color: "green" as const, label: "右=1" },
              ],
              description: "递归右子树(3)：左深=2≠右深=1 → 继续递归",
              visitPath: ["1", "3"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "4", "5"], color: "blue" as const },
                { nodeIds: ["6"], color: "green" as const, label: "满=1" },
                { nodeIds: ["3"], color: "yellow" as const },
              ],
              description: "节点6：左=右=1 → 满二叉树=1。节点3右子树为空=0",
              visitPath: ["3", "6"],
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5", "6"], color: "green" as const }],
              description: "汇总：1 + 左子树(3) + 右子树(1+1+0) = 1+3+2 = 6 ✓",
              visitPath: ["1", "2", "3", "4", "5", "6"],
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(log²n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "普通递归",
        code: `/**
 * 完全二叉树的节点个数 - 普通递归
 *
 * 核心思想：
 * 最简单的递归方法，遍历所有节点计数。
 * 节点数 = 1 + 左子树节点数 + 右子树节点数
 *
 * 优点：代码简洁，适用于任何二叉树
 * 缺点：没有利用完全二叉树的性质
 *
 * 时间复杂度：O(n) - 遍历所有节点
 * 空间复杂度：O(log n) - 递归栈（完全二叉树高度）
 */
function countNodes(root) {
  // 边界情况：空节点
  if (root === null) return 0;

  // 递归计算：当前节点 + 左子树 + 右子树
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
        explanation: `## 普通递归

### 算法原理

最基本的树遍历计数：
\`\`\`
count(node) = 1 + count(left) + count(right)
count(null) = 0
\`\`\`

### 执行过程

\`\`\`
       1              countNodes(1)
      / \\               = 1 + countNodes(2) + countNodes(3)
     2   3              = 1 + (1 + 1 + 1) + (1 + 1 + 0)
    /\\   /               = 1 + 3 + 2 = 6
   4  5 6
\`\`\`

### 与优化方法对比

| 方法 | 时间复杂度 | 适用范围 |
|-----|----------|---------|
| 普通递归 | O(n) | 任何二叉树 |
| 利用性质 | O(log²n) | 完全二叉树 |

### 何时使用？

- 树规模较小
- 需要处理非完全二叉树
- 代码简洁优先

### 复杂度
- 时间：O(n)
- 空间：O(log n)，递归栈`,
        animation: {
          type: "tree" as const,
          title: "普通递归计数",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              description: "完全二叉树 [1,2,3,4,5]。递归：count = 1 + 左 + 右",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["4"], color: "green" as const, label: "1" }],
              description: "countNodes(4)：无子节点，返回1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["4"], color: "blue" as const },
                { nodeIds: ["5"], color: "green" as const, label: "1" },
              ],
              description: "countNodes(5)：无子节点，返回1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["2", "4", "5"], color: "green" as const, label: "3" },
              ],
              description: "countNodes(2)：1+1+1=3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["2", "4", "5"], color: "blue" as const },
                { nodeIds: ["3"], color: "green" as const, label: "1" },
              ],
              description: "countNodes(3)：无子节点，返回1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "countNodes(1)：1+3+1=5 ✓",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "二分查找",
        code: `/**
 * 完全二叉树的节点个数 - 二分查找
 *
 * 核心思想：
 * 1. 先计算树的高度 h
 * 2. 前 h-1 层是满的，节点数 = 2^h - 1
 * 3. 用二分查找确定最后一层有多少节点
 *
 * 路径编码：
 * 用二进制表示到达最后一层某位置的路径：
 * 0 = 向左走，1 = 向右走
 *
 * 时间复杂度：O(log²n) - 二分 O(log n)，每次检查 O(log n)
 * 空间复杂度：O(1) - 只使用常数空间
 */
function countNodes(root) {
  // 边界情况：空树
  if (root === null) return 0;

  // 计算树的高度（从 0 开始计数）
  let h = 0;
  let node = root;
  while (node.left !== null) {
    h++;
    node = node.left;
  }

  // 最后一层的节点编号范围：[0, 2^h - 1]
  // 用二分查找找到最后一个存在的节点
  let left = 0, right = Math.pow(2, h) - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // 检查编号为 mid 的节点是否存在
    if (exists(root, h, mid)) {
      left = mid + 1;  // 存在，继续找更大的
    } else {
      right = mid - 1; // 不存在，找更小的
    }
  }

  // 前 h 层节点数 + 最后一层节点数
  return Math.pow(2, h) - 1 + left;

  /**
   * 检查最后一层编号为 idx 的节点是否存在
   * @param {TreeNode} root - 根节点
   * @param {number} h - 树高度
   * @param {number} idx - 最后一层的节点编号
   * @returns {boolean} - 节点是否存在
   */
  function exists(root, h, idx) {
    let node = root;
    // 路径范围：用于确定每一步走左还是走右
    let left = 0, right = Math.pow(2, h) - 1;

    // 走 h 步到达最后一层
    for (let i = 0; i < h; i++) {
      const mid = Math.floor((left + right) / 2);
      // 如果 idx <= mid，走左边；否则走右边
      if (idx <= mid) {
        node = node.left;
        right = mid;
      } else {
        node = node.right;
        left = mid + 1;
      }
    }

    // 检查节点是否存在
    return node !== null;
  }
}`,
        explanation: `## 二分查找法

### 算法原理

将问题转化为二分查找：
\`\`\`
总节点数 = 前 h 层（满的）+ 最后一层的节点数
         = (2^h - 1) + 最后一层节点数
\`\`\`

### 最后一层的编号

\`\`\`
       1              最后一层编号：0, 1, 2, 3
      / \\
     2   3            h=2 时，最后一层范围 [0, 3]
    /\\   /\\
   4  5 6  7          节点 4,5,6,7 对应编号 0,1,2,3
\`\`\`

### 路径编码

\`\`\`
编号 0 (二进制 00)：左 → 左
编号 1 (二进制 01)：左 → 右
编号 2 (二进制 10)：右 → 左
编号 3 (二进制 11)：右 → 右
\`\`\`

### 执行过程

\`\`\`
       1              h=2，最后一层范围 [0,3]
      / \\
     2   3            二分查找：
    /\\                  mid=1, exists? → true
   4  5                 mid=2, exists? → false
                        mid=1 是最后存在的

总节点 = (2^2-1) + 2 = 3 + 2 = 5
\`\`\`

### 与其他方法对比

| 方法 | 时间 | 空间 |
|-----|-----|-----|
| 普通递归 | O(n) | O(log n) |
| 利用性质 | O(log²n) | O(log n) |
| 二分查找 | O(log²n) | O(1) |

### 复杂度
- 时间：O(log²n)
- 空间：O(1)，迭代实现`,
        animation: {
          type: "tree" as const,
          title: "二分查找计数",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              description: "完全二叉树 [1,2,3,4,5]。用二分查找最后一层有多少节点",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "4"], color: "yellow" as const }],
              description: "计算高度h=2。前h层节点=2²-1=3。最后一层范围[0,3]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "3"], color: "blue" as const },
                { nodeIds: ["5"], color: "green" as const, label: "mid=1" },
              ],
              description: "二分：mid=1，检查索引1的节点(5)是否存在→存在！left=2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [
                { nodeIds: ["1", "2", "3"], color: "blue" as const },
                { nodeIds: ["4", "5"], color: "yellow" as const },
              ],
              description: "二分：mid=2，检查索引2的节点→不存在！right=1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const }],
              description: "left=2。总节点=(2²-1)+2=3+2=5 ✓ O(1)空间！",
            },
          ] as TreeStep[],
        },
        timeComplexity: "O(log²n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
