# 二叉树 (Binary Tree)

## 概念介绍

**二叉树**是每个节点最多有两个子节点（左子节点和右子节点）的树形数据结构。它是数据结构中最重要的概念之一，也是面试高频考点。

### 基本术语

| 术语 | 描述 |
|------|------|
| 根节点 (Root) | 树的顶部节点 |
| 叶节点 (Leaf) | 没有子节点的节点 |
| 深度 (Depth) | 从根节点到该节点的边数 |
| 高度 (Height) | 从该节点到最远叶节点的边数 |
| 层 (Level) | 深度 + 1 |

### 二叉树类型

```
完全二叉树          满二叉树           二叉搜索树
    1                  1                  8
   / \               / \               / \
  2   3             2   3             4   12
 / \               / \ / \           / \ / \
4   5             4  5 6  7         2  6 10 14
```

- **完全二叉树**: 除最后一层外都是满的，最后一层从左到右填充
- **满二叉树**: 每个节点要么有0个要么有2个子节点
- **二叉搜索树(BST)**: 左子树 < 根 < 右子树

## 节点定义

```typescript
class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

// 从数组构建二叉树
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length && i < arr.length) {
    const node = queue.shift()!;

    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]!);
      queue.push(node.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]!);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}
```

## 四种遍历方式

### 前序遍历 (根-左-右)

```javascript
// 递归
function preorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    result.push(node.val);   // 访问根
    traverse(node.left);      // 遍历左子树
    traverse(node.right);     // 遍历右子树
  }

  traverse(root);
  return result;
}

// 迭代（使用栈）
function preorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);

    // 先右后左入栈，保证左子树先处理
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}
```

### 中序遍历 (左-根-右)

```javascript
// 递归
function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    traverse(node.left);      // 遍历左子树
    result.push(node.val);   // 访问根
    traverse(node.right);     // 遍历右子树
  }

  traverse(root);
  return result;
}

// 迭代
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length) {
    // 一路向左
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}
```

### 后序遍历 (左-右-根)

```javascript
// 递归
function postorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    traverse(node.left);      // 遍历左子树
    traverse(node.right);     // 遍历右子树
    result.push(node.val);   // 访问根
  }

  traverse(root);
  return result;
}

// 迭代（技巧：前序的变形，然后反转）
function postorderIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);

    // 先左后右（与前序相反）
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result.reverse(); // 反转得到后序
}
```

### 层序遍历 (BFS)

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
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
}
```

## 面试高频题

### 1. 二叉树的最大深度 (LeetCode 104)

```javascript
function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
```

### 2. 反转二叉树 (LeetCode 226)

```javascript
function invertTree(root) {
  if (!root) return null;

  [root.left, root.right] = [root.right, root.left];

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
```

### 3. 对称二叉树 (LeetCode 101)

```javascript
function isSymmetric(root) {
  if (!root) return true;

  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return left.val === right.val &&
           isMirror(left.left, right.right) &&
           isMirror(left.right, right.left);
  }

  return isMirror(root.left, root.right);
}
```

### 4. 二叉树的直径 (LeetCode 543)

```javascript
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function depth(node) {
    if (!node) return 0;

    const left = depth(node.left);
    const right = depth(node.right);

    // 更新最大直径
    maxDiameter = Math.max(maxDiameter, left + right);

    return Math.max(left, right) + 1;
  }

  depth(root);
  return maxDiameter;
}
```

### 5. 路径总和 (LeetCode 112)

```javascript
function hasPathSum(root, targetSum) {
  if (!root) return false;

  // 到达叶节点
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  const remaining = targetSum - root.val;
  return hasPathSum(root.left, remaining) ||
         hasPathSum(root.right, remaining);
}
```

### 6. 二叉树的最近公共祖先 (LeetCode 236)

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root; // p, q 分别在左右子树
  return left || right;           // 都在同一侧
}
```

### 7. 验证二叉搜索树 (LeetCode 98)

```javascript
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }

  return validate(root, -Infinity, Infinity);
}
```

### 8. 二叉搜索树中第K小的元素 (LeetCode 230)

```javascript
function kthSmallest(root, k) {
  const stack = [];
  let current = root;
  let count = 0;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    count++;

    if (count === k) {
      return current.val;
    }

    current = current.right;
  }
}
```

## 二叉搜索树 (BST)

### 特性

- 左子树所有节点值 < 根节点值
- 右子树所有节点值 > 根节点值
- 中序遍历得到有序序列
- 查找、插入、删除平均 O(log n)

### 查找

```javascript
function searchBST(root, val) {
  if (!root || root.val === val) return root;

  if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}
```

### 插入

```javascript
function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}
```

### 删除

```javascript
function deleteNode(root, key) {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // 找到要删除的节点
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // 有两个子节点，找右子树最小值替换
    let minNode = root.right;
    while (minNode.left) {
      minNode = minNode.left;
    }
    root.val = minNode.val;
    root.right = deleteNode(root.right, minNode.val);
  }

  return root;
}
```

## 解题技巧

### 1. 递归三要素

1. **终止条件**: 通常是 `if (!node) return ...`
2. **单层逻辑**: 当前节点需要做什么
3. **返回值**: 向上层返回什么信息

### 2. 遍历选择

- **前序**: 第一时间处理当前节点
- **中序**: BST 获取有序序列
- **后序**: 需要子树信息后才能处理当前节点
- **层序**: 层级相关问题

### 3. 常见模式

```javascript
// 模式1: 自顶向下（传递参数）
function topDown(node, param) {
  if (!node) return;
  // 处理当前节点
  topDown(node.left, newParam);
  topDown(node.right, newParam);
}

// 模式2: 自底向上（收集返回值）
function bottomUp(node) {
  if (!node) return 初始值;
  const left = bottomUp(node.left);
  const right = bottomUp(node.right);
  // 根据 left, right 处理当前节点
  return result;
}
```

## 复杂度

| 操作 | 平均 | 最坏 |
|------|------|------|
| 查找 | O(log n) | O(n) |
| 插入 | O(log n) | O(n) |
| 删除 | O(log n) | O(n) |
| 遍历 | O(n) | O(n) |
| 空间(递归) | O(h) | O(n) |

> h 为树的高度，平衡时 h = log n，退化为链表时 h = n
