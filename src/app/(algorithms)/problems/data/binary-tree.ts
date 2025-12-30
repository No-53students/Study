import { Problem } from "../types";

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
        code: `function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}`,
        explanation: `## 递归 DFS

### 思路
树的最大深度等于左右子树的最大深度加 1。

### 递归公式
\`\`\`
maxDepth(root) = max(maxDepth(left), maxDepth(right)) + 1
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
        code: `function maxDepth(root) {
  if (root === null) return 0;

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    depth++;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}`,
        explanation: `## 迭代 BFS

### 思路
使用层序遍历，每遍历完一层，深度加 1。

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
        code: `function maxDepth(root) {
  if (root === null) return 0;

  const stack = [[root, 1]]; // [节点, 深度]
  let maxDepth = 0;

  while (stack.length > 0) {
    const [node, depth] = stack.pop();
    maxDepth = Math.max(maxDepth, depth);

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

### 特点
- 用栈替代递归调用栈
- 适合需要避免递归的场景`,
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
        code: `function isSameTree(p, q) {
  // 都为空
  if (p === null && q === null) return true;
  // 其中一个为空
  if (p === null || q === null) return false;
  // 值不相等
  if (p.val !== q.val) return false;

  // 递归比较左右子树
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
        explanation: `## 递归法

### 思路
同时遍历两棵树，比较对应位置的节点：
1. 两个节点都为空 → 相同
2. 其中一个为空 → 不同
3. 值不相等 → 不同
4. 递归比较左右子树

### 优点
- 代码简洁直观
- 符合树的递归结构`,
        timeComplexity: "O(min(n, m))",
        spaceComplexity: "O(min(h1, h2))",
      },
      {
        name: "迭代 BFS",
        code: `function isSameTree(p, q) {
  const queue = [[p, q]];

  while (queue.length > 0) {
    const [node1, node2] = queue.shift();

    // 都为空，继续下一对
    if (node1 === null && node2 === null) continue;
    // 其中一个为空或值不同
    if (node1 === null || node2 === null) return false;
    if (node1.val !== node2.val) return false;

    // 将左右子节点配对入队
    queue.push([node1.left, node2.left]);
    queue.push([node1.right, node2.right]);
  }

  return true;
}`,
        explanation: `## 迭代 BFS

### 思路
使用队列同时层序遍历两棵树，每次比较配对的节点。

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
        code: `function invertTree(root) {
  if (root === null) return null;

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归翻转子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
}`,
        explanation: `## 递归法

### 思路
对于每个节点：
1. 交换其左右子节点
2. 递归翻转左子树
3. 递归翻转右子树

### 优点
- 代码简洁
- 逻辑清晰直观`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS",
        code: `function invertTree(root) {
  if (root === null) return null;

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    // 交换左右子节点
    [node.left, node.right] = [node.right, node.left];

    // 子节点入队
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
}`,
        explanation: `## 迭代 BFS

### 思路
使用层序遍历，对每个节点交换其左右子节点。

### 步骤
1. 根节点入队
2. 出队节点，交换其左右子节点
3. 子节点入队继续处理`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "迭代 DFS",
        code: `function invertTree(root) {
  if (root === null) return null;

  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();

    // 交换左右子节点
    [node.left, node.right] = [node.right, node.left];

    // 子节点入栈
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return root;
}`,
        explanation: `## 迭代 DFS

### 思路
使用栈模拟 DFS，对每个节点交换其左右子节点。

### 特点
- 与 BFS 类似，只是用栈替代队列
- 遍历顺序不同，但结果相同`,
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
        code: `function isSymmetric(root) {
  if (root === null) return true;

  const isMirror = (left, right) => {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    if (left.val !== right.val) return false;

    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  return isMirror(root.left, root.right);
}`,
        explanation: `## 递归法

### 思路
定义辅助函数 isMirror(left, right) 检查镜像关系：
1. 都为空 → 对称
2. 一个为空 → 不对称
3. 值不同 → 不对称
4. 递归检查：left.left 与 right.right，left.right 与 right.left

### 关键
对称的定义是左子树的左节点等于右子树的右节点，左子树的右节点等于右子树的左节点。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS",
        code: `function isSymmetric(root) {
  if (root === null) return true;

  const queue = [[root.left, root.right]];

  while (queue.length > 0) {
    const [left, right] = queue.shift();

    if (left === null && right === null) continue;
    if (left === null || right === null) return false;
    if (left.val !== right.val) return false;

    // 镜像位置的节点配对入队
    queue.push([left.left, right.right]);
    queue.push([left.right, right.left]);
  }

  return true;
}`,
        explanation: `## 迭代 BFS

### 思路
使用队列存储需要比较的节点对，每次比较镜像位置的节点。

### 入队规则
- left.left 与 right.right 配对
- left.right 与 right.left 配对

### 特点
- 避免递归
- 便于理解配对关系`,
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
        code: `function buildTree(preorder, inorder) {
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

    // 递归构建左右子树（注意顺序：先左后右）
    root.left = build(inLeft, inIndex - 1);
    root.right = build(inIndex + 1, inRight);

    return root;
  };

  return build(0, inorder.length - 1);
}`,
        explanation: `## 递归 + 哈希表

### 思路
1. **前序遍历**：根 → 左 → 右，第一个元素是根
2. **中序遍历**：左 → 根 → 右，根左边是左子树，右边是右子树

### 步骤
1. 从前序遍历取根节点
2. 用哈希表 O(1) 在中序遍历中定位根节点
3. 递归构建左右子树

### 关键点
- 先构建左子树，再构建右子树（与前序遍历顺序一致）
- preIndex 全局递增，自动指向下一个根节点`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归（传递索引）",
        code: `function buildTree(preorder, inorder) {
  const build = (preStart, preEnd, inStart, inEnd) => {
    if (preStart > preEnd) return null;

    const rootVal = preorder[preStart];
    const root = { val: rootVal, left: null, right: null };

    // 在中序遍历中找根节点
    let inIndex = inStart;
    while (inorder[inIndex] !== rootVal) inIndex++;

    // 左子树的节点数
    const leftSize = inIndex - inStart;

    // 递归构建左右子树
    root.left = build(preStart + 1, preStart + leftSize, inStart, inIndex - 1);
    root.right = build(preStart + leftSize + 1, preEnd, inIndex + 1, inEnd);

    return root;
  };

  return build(0, preorder.length - 1, 0, inorder.length - 1);
}`,
        explanation: `## 递归（传递索引）

### 思路
通过传递前序和中序遍历的索引范围来划分子树。

### 索引计算
- 左子树节点数 = inIndex - inStart
- 前序左子树范围：[preStart + 1, preStart + leftSize]
- 前序右子树范围：[preStart + leftSize + 1, preEnd]

### 缺点
- 每次需要线性查找根节点在中序中的位置
- 可以用哈希表优化`,
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
        code: `function levelOrder(root) {
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
        explanation: `## BFS + 队列

### 思路
使用队列实现层序遍历：
1. 根节点入队
2. 每次处理一层：记录当前队列大小，依次出队处理
3. 处理节点时将子节点入队

### 关键点
- 每轮开始时记录 levelSize，确保只处理当前层的节点
- 子节点入队后会在下一轮处理`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "DFS + 递归",
        code: `function levelOrder(root) {
  const result = [];

  const dfs = (node, level) => {
    if (node === null) return;

    // 如果当前层还没有数组，创建一个
    if (result.length === level) {
      result.push([]);
    }

    // 将当前节点加入对应层
    result[level].push(node.val);

    // 递归处理子节点
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  dfs(root, 0);
  return result;
}`,
        explanation: `## DFS + 递归

### 思路
使用 DFS 遍历，通过 level 参数记录当前层级。

### 步骤
1. 传递当前层级 level
2. 若 result[level] 不存在则创建
3. 将节点值加入对应层级的数组

### 特点
- 虽然是 DFS，但结果按层组织
- 因为先遍历左子树，所以同层节点从左到右排列`,
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
        code: `function rightSideView(root) {
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
        explanation: `## BFS 层序遍历

### 思路
层序遍历时，每层的最后一个节点就是从右侧能看到的节点。

### 关键
- 记录每层的大小 levelSize
- 当 i === levelSize - 1 时，说明是这层最后一个节点

### 优点
- 直观，容易理解
- 适合处理"层"相关的问题`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "DFS（根-右-左）",
        code: `function rightSideView(root) {
  const result = [];

  const dfs = (node, depth) => {
    if (node === null) return;

    // 每层第一个访问的节点就是右视图节点
    if (depth === result.length) {
      result.push(node.val);
    }

    // 先右后左，保证每层第一个访问的是最右节点
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  };

  dfs(root, 0);
  return result;
}`,
        explanation: `## DFS（根-右-左）

### 思路
按照「根 → 右 → 左」的顺序遍历，每层第一个访问的节点就是右视图节点。

### 关键
- depth === result.length 时，说明这是该层第一个被访问的节点
- 先遍历右子树，保证右边的节点先被访问

### 优点
- 空间复杂度更优（递归栈深度）`,
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
        code: `function hasPathSum(root, targetSum) {
  if (root === null) return false;

  // 到达叶子节点，检查剩余值是否等于当前节点值
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  // 递归检查左右子树
  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}`,
        explanation: `## 递归法

### 思路
从根节点开始，每次将 targetSum 减去当前节点值：
1. 空节点 → 返回 false
2. 叶子节点 → 检查当前值是否等于剩余目标
3. 非叶子节点 → 递归检查左右子树（只要有一边满足即可）

### 关键
- 必须到达叶子节点才算一条完整路径
- 用减法代替累加，更简洁`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代 BFS",
        code: `function hasPathSum(root, targetSum) {
  if (root === null) return false;

  const queue = [[root, root.val]];

  while (queue.length > 0) {
    const [node, sum] = queue.shift();

    // 叶子节点，检查路径和
    if (node.left === null && node.right === null) {
      if (sum === targetSum) return true;
      continue;
    }

    // 子节点入队，累加路径和
    if (node.left) queue.push([node.left, sum + node.left.val]);
    if (node.right) queue.push([node.right, sum + node.right.val]);
  }

  return false;
}`,
        explanation: `## 迭代 BFS

### 思路
使用队列存储 [节点, 当前路径和]，层序遍历所有节点。

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
        code: `function hasPathSum(root, targetSum) {
  if (root === null) return false;

  const stack = [[root, targetSum - root.val]];

  while (stack.length > 0) {
    const [node, remaining] = stack.pop();

    // 叶子节点，检查剩余是否为 0
    if (node.left === null && node.right === null) {
      if (remaining === 0) return true;
      continue;
    }

    // 子节点入栈
    if (node.right) stack.push([node.right, remaining - node.right.val]);
    if (node.left) stack.push([node.left, remaining - node.left.val]);
  }

  return false;
}`,
        explanation: `## 迭代 DFS

### 思路
使用栈存储 [节点, 剩余目标值]，模拟递归过程。

### 特点
- 使用减法，栈中存储剩余目标值
- 叶子节点时检查剩余是否为 0`,
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
        code: `function lowestCommonAncestor(root, p, q) {
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
        explanation: `## 递归法

### 思路
1. 如果当前节点是 null、p 或 q，直接返回当前节点
2. 递归在左右子树中查找 p 和 q
3. 根据返回值判断：
   - 左右都非空 → 当前节点是 LCA
   - 只有一边非空 → LCA 在那一边
   - 都为空 → 返回 null

### 关键理解
- 如果 p 和 q 分别在左右子树中，当前节点就是 LCA
- 如果 p 和 q 都在某一侧，LCA 就在那一侧`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "存储父节点",
        code: `function lowestCommonAncestor(root, p, q) {
  const parent = new Map();
  parent.set(root, null);

  // BFS 遍历，记录每个节点的父节点
  const queue = [root];
  while (!parent.has(p) || !parent.has(q)) {
    const node = queue.shift();
    if (node.left) {
      parent.set(node.left, node);
      queue.push(node.left);
    }
    if (node.right) {
      parent.set(node.right, node);
      queue.push(node.right);
    }
  }

  // 收集 p 的所有祖先
  const ancestors = new Set();
  let current = p;
  while (current !== null) {
    ancestors.add(current);
    current = parent.get(current);
  }

  // 从 q 向上找，第一个在 p 祖先集合中的就是 LCA
  current = q;
  while (!ancestors.has(current)) {
    current = parent.get(current);
  }

  return current;
}`,
        explanation: `## 存储父节点法

### 思路
1. BFS 遍历，用哈希表记录每个节点的父节点
2. 从 p 向上遍历，收集所有祖先节点
3. 从 q 向上遍历，第一个在 p 祖先集合中的节点就是 LCA

### 优点
- 思路直观
- 可以多次查询不同的 p, q（预处理后）

### 缺点
- 需要额外空间存储父节点关系`,
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
        code: `function maxPathSum(root) {
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
        explanation: `## 递归 + 全局变量

### 思路
对于每个节点，需要计算两个值：
1. **经过该节点的最大路径和**：左贡献 + 节点值 + 右贡献
2. **该节点对父节点的最大贡献**：节点值 + max(左贡献, 右贡献)

### 关键点
- 负数贡献不如不选，设为 0
- 路径可以"拐弯"（经过左右子树），但返回给父节点的贡献只能选一边
- 用全局变量记录最大路径和

### 为什么只能选一边？
因为路径是一条线，不能分叉。从父节点的角度看，只能选择从左边来或从右边来。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "递归（返回数组）",
        code: `function maxPathSum(root) {
  // 返回 [maxGain, maxPathSum]
  const dfs = (node) => {
    if (node === null) return [0, -Infinity];

    const [leftGain, leftMax] = dfs(node.left);
    const [rightGain, rightMax] = dfs(node.right);

    // 左右贡献取非负
    const left = Math.max(leftGain, 0);
    const right = Math.max(rightGain, 0);

    // 经过当前节点的路径和
    const currentPath = node.val + left + right;

    // 当前子树的最大路径和
    const currentMax = Math.max(currentPath, leftMax, rightMax);

    // 返回贡献值和最大路径和
    return [node.val + Math.max(left, right), currentMax];
  };

  return dfs(root)[1];
}`,
        explanation: `## 递归（返回数组）

### 思路
不使用全局变量，而是让递归函数返回两个值：
1. 当前节点的最大贡献值
2. 当前子树的最大路径和

### 优点
- 纯函数，无副作用
- 更符合函数式编程风格

### 缺点
- 代码稍复杂
- 需要在返回值中传递更多信息`,
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
        code: `function isValidBST(root) {
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
        explanation: `## 递归 + 范围验证

### 思路
维护每个节点的有效取值范围 (min, max)：
1. 根节点范围：(-∞, +∞)
2. 左子节点范围：(min, 父节点值)
3. 右子节点范围：(父节点值, max)

### 关键
- 不能只比较父子节点，必须确保整个子树都满足范围约束
- 例如：右子树的所有节点都必须大于根节点`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "中序遍历",
        code: `function isValidBST(root) {
  let prev = -Infinity;

  const inorder = (node) => {
    if (node === null) return true;

    // 遍历左子树
    if (!inorder(node.left)) return false;

    // 检查当前节点是否大于前一个节点
    if (node.val <= prev) return false;
    prev = node.val;

    // 遍历右子树
    return inorder(node.right);
  };

  return inorder(root);
}`,
        explanation: `## 中序遍历法

### 思路
BST 的中序遍历结果是严格递增的。在遍历过程中检查当前节点是否大于前一个节点。

### 步骤
1. 用 prev 变量记录前一个访问的节点值
2. 中序遍历（左-根-右）
3. 每次访问节点时，检查是否大于 prev

### 优点
- 利用 BST 的本质特性
- 无需显式传递范围`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
      },
      {
        name: "迭代中序遍历",
        code: `function isValidBST(root) {
  const stack = [];
  let prev = -Infinity;
  let current = root;

  while (current !== null || stack.length > 0) {
    // 一直向左走
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // 弹出节点
    current = stack.pop();

    // 检查是否大于前一个值
    if (current.val <= prev) return false;
    prev = current.val;

    // 转向右子树
    current = current.right;
  }

  return true;
}`,
        explanation: `## 迭代中序遍历

### 思路
使用栈模拟中序遍历，同时检查递增性。

### 优点
- 避免递归
- 可以提前终止

### 迭代中序遍历模板
1. 一直向左走，入栈
2. 弹出节点，处理
3. 转向右子树`,
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
        code: `function kthSmallest(root, k) {
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
        explanation: `## 中序遍历法

### 思路
BST 的中序遍历结果是升序排列的，第 k 个访问的节点就是第 k 小的元素。

### 优化
找到答案后提前终止遍历（通过检查 result !== null）。

### 关键
- 利用 BST 中序遍历的有序性
- 计数到 k 即可返回`,
        timeComplexity: "O(H + k)",
        spaceComplexity: "O(H)",
      },
      {
        name: "迭代中序遍历",
        code: `function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;

  while (current !== null || stack.length > 0) {
    // 一直向左走
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // 弹出节点
    current = stack.pop();
    count++;

    // 找到第 k 小
    if (count === k) return current.val;

    // 转向右子树
    current = current.right;
  }

  return -1; // 不会到达这里
}`,
        explanation: `## 迭代中序遍历

### 思路
使用栈模拟中序遍历，计数到 k 时返回。

### 优点
- 避免递归
- 找到答案立即返回，无需遍历整棵树

### 迭代模板
1. 一直向左走，入栈
2. 弹出节点，计数
3. 转向右子树`,
        timeComplexity: "O(H + k)",
        spaceComplexity: "O(H)",
      },
      {
        name: "记录子树大小",
        code: `function kthSmallest(root, k) {
  // 计算每个节点的左子树大小
  const countNodes = (node) => {
    if (node === null) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  const find = (node, k) => {
    const leftCount = countNodes(node.left);

    if (k === leftCount + 1) {
      return node.val; // 当前节点就是第 k 小
    } else if (k <= leftCount) {
      return find(node.left, k); // 在左子树中
    } else {
      return find(node.right, k - leftCount - 1); // 在右子树中
    }
  };

  return find(root, k);
}`,
        explanation: `## 记录子树大小

### 思路
利用 BST 的性质，通过比较 k 和左子树节点数来决定搜索方向：
- k === leftCount + 1：当前节点就是答案
- k <= leftCount：答案在左子树
- k > leftCount + 1：答案在右子树，且是右子树中第 (k - leftCount - 1) 小

### 进阶优化
如果需要频繁查询，可以在每个节点存储其子树大小，查询时间复杂度降为 O(H)。

### 适用场景
- 树结构稳定，多次查询不同 k`,
        timeComplexity: "O(n) 首次，O(H) 后续",
        spaceComplexity: "O(H)",
      },
    ],
  },
];
