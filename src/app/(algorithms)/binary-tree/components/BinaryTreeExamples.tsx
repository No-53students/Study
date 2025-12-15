"use client";

import { useState, useCallback } from "react";

// ============================================
// 二叉树节点类
// ============================================

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

// 构建示例树
function buildExampleTree(): TreeNode {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(7);
  return root;
}

// ============================================
// 示例 1: 二叉树可视化与遍历
// ============================================

interface TreeVisualizationProps {
  tree: (number | null)[];
  highlightNodes?: number[];
  currentNode?: number | null;
}

function TreeVisualization({ tree, highlightNodes = [], currentNode }: TreeVisualizationProps) {
  // 计算树的层数
  const levels: (number | null)[][] = [];
  let levelSize = 1;
  let index = 0;

  while (index < tree.length) {
    const level: (number | null)[] = [];
    for (let i = 0; i < levelSize && index < tree.length; i++) {
      level.push(tree[index]);
      index++;
    }
    if (level.some((v) => v !== null)) {
      levels.push(level);
    }
    levelSize *= 2;
  }

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex flex-col items-center gap-2 min-w-[400px]">
        {levels.map((level, levelIndex) => (
          <div key={levelIndex} className="flex justify-center gap-2" style={{ width: `${100}%` }}>
            {level.map((node, nodeIndex) => (
              <div
                key={nodeIndex}
                className="flex flex-col items-center"
                style={{ flex: 1 }}
              >
                {node !== null ? (
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-white transition-all ${
                      currentNode === node
                        ? "bg-red-500 ring-4 ring-red-300"
                        : highlightNodes.includes(node)
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {node}
                  </div>
                ) : (
                  <div className="h-10 w-10" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TreeTraversalDemo() {
  const tree = [1, 2, 3, 4, 5, 6, 7];
  const [traversalType, setTraversalType] = useState<"preorder" | "inorder" | "postorder" | "levelorder">("preorder");
  const [result, setResult] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const traverse = async () => {
    setIsRunning(true);
    setResult([]);
    setCurrentNode(null);

    const nodes: number[] = [];
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const visit = async (val: number) => {
      setCurrentNode(val);
      await delay(500);
      nodes.push(val);
      setResult([...nodes]);
    };

    // 前序遍历：根 -> 左 -> 右
    const preorder = async (index: number) => {
      if (index >= tree.length || tree[index] === null) return;
      await visit(tree[index]!);
      await preorder(2 * index + 1); // 左子节点
      await preorder(2 * index + 2); // 右子节点
    };

    // 中序遍历：左 -> 根 -> 右
    const inorder = async (index: number) => {
      if (index >= tree.length || tree[index] === null) return;
      await inorder(2 * index + 1);
      await visit(tree[index]!);
      await inorder(2 * index + 2);
    };

    // 后序遍历：左 -> 右 -> 根
    const postorder = async (index: number) => {
      if (index >= tree.length || tree[index] === null) return;
      await postorder(2 * index + 1);
      await postorder(2 * index + 2);
      await visit(tree[index]!);
    };

    // 层序遍历
    const levelorder = async () => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i] !== null) {
          await visit(tree[i]!);
        }
      }
    };

    switch (traversalType) {
      case "preorder":
        await preorder(0);
        break;
      case "inorder":
        await inorder(0);
        break;
      case "postorder":
        await postorder(0);
        break;
      case "levelorder":
        await levelorder();
        break;
    }

    setCurrentNode(null);
    setIsRunning(false);
  };

  const traversalNames = {
    preorder: "前序遍历 (根-左-右)",
    inorder: "中序遍历 (左-根-右)",
    postorder: "后序遍历 (左-右-根)",
    levelorder: "层序遍历 (BFS)",
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 二叉树遍历</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(traversalNames) as Array<keyof typeof traversalNames>).map((type) => (
          <button
            key={type}
            onClick={() => setTraversalType(type)}
            className={`rounded-md px-3 py-2 text-sm ${
              traversalType === type
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            {traversalNames[type]}
          </button>
        ))}
      </div>

      <button
        onClick={traverse}
        disabled={isRunning}
        className="mb-4 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {isRunning ? "遍历中..." : "开始遍历"}
      </button>

      <TreeVisualization tree={tree} highlightNodes={result} currentNode={currentNode} />

      <div className="mt-4">
        <div className="text-sm font-medium">遍历结果:</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {result.map((node, i) => (
            <span
              key={i}
              className="rounded bg-green-100 px-2 py-1 font-mono text-sm dark:bg-green-900/30"
            >
              {node}
            </span>
          ))}
          {result.length === 0 && (
            <span className="text-sm text-zinc-400">等待遍历...</span>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-zinc-900 p-3 text-sm">
          <div className="text-zinc-400 mb-1">递归实现</div>
          <pre className="text-green-400 text-xs overflow-x-auto">
{traversalType === "preorder" ? `function preorder(node) {
  if (!node) return;
  visit(node.val);  // 根
  preorder(node.left);  // 左
  preorder(node.right); // 右
}` : traversalType === "inorder" ? `function inorder(node) {
  if (!node) return;
  inorder(node.left);   // 左
  visit(node.val);      // 根
  inorder(node.right);  // 右
}` : traversalType === "postorder" ? `function postorder(node) {
  if (!node) return;
  postorder(node.left);  // 左
  postorder(node.right); // 右
  visit(node.val);       // 根
}` : `function levelorder(root) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    visit(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}`}
          </pre>
        </div>
        <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="font-medium text-blue-800 dark:text-blue-200 text-sm">
            {traversalNames[traversalType]}
          </div>
          <div className="mt-2 text-xs text-blue-700 dark:text-blue-300">
            {traversalType === "preorder" && "适用于：复制树、序列化"}
            {traversalType === "inorder" && "适用于：二叉搜索树获取有序序列"}
            {traversalType === "postorder" && "适用于：删除树、计算子树属性"}
            {traversalType === "levelorder" && "适用于：层级相关问题、最短路径"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 二叉树的最大深度
// ============================================

function MaxDepthDemo() {
  const [tree, setTree] = useState([1, 2, 3, 4, 5, null, 7, 8]);
  const [depth, setDepth] = useState<number | null>(null);
  const [highlightPath, setHighlightPath] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const calculateDepth = async () => {
    setIsRunning(true);
    setDepth(null);
    setHighlightPath([]);

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const path: number[] = [];

    const maxDepthHelper = async (index: number, currentDepth: number): Promise<number> => {
      if (index >= tree.length || tree[index] === null) {
        return currentDepth;
      }

      path.push(tree[index]!);
      setHighlightPath([...path]);
      await delay(300);

      const leftDepth = await maxDepthHelper(2 * index + 1, currentDepth + 1);
      const rightDepth = await maxDepthHelper(2 * index + 2, currentDepth + 1);

      path.pop();
      setHighlightPath([...path]);

      return Math.max(leftDepth, rightDepth);
    };

    const result = await maxDepthHelper(0, 0);
    setDepth(result);
    setIsRunning(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 二叉树的最大深度（LeetCode 104）</h3>

      <button
        onClick={calculateDepth}
        disabled={isRunning}
        className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isRunning ? "计算中..." : "计算深度"}
      </button>

      <TreeVisualization tree={tree as number[]} highlightNodes={highlightPath} />

      {depth !== null && (
        <div className="mt-4 rounded-md bg-green-50 p-3 text-green-800 dark:bg-green-900/30 dark:text-green-200">
          最大深度: {depth}
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function maxDepth(root) {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 反转二叉树
// ============================================

function InvertTreeDemo() {
  const [tree, setTree] = useState([4, 2, 7, 1, 3, 6, 9]);
  const [isInverted, setIsInverted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const invertTree = async () => {
    setIsRunning(true);
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const newTree = [...tree];

    // 逐层反转
    const invertNode = async (index: number) => {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < newTree.length || rightIndex < newTree.length) {
        // 交换左右子节点
        [newTree[leftIndex], newTree[rightIndex]] = [newTree[rightIndex], newTree[leftIndex]];
        setTree([...newTree]);
        await delay(500);

        // 递归反转子树
        if (leftIndex < newTree.length) await invertNode(leftIndex);
        if (rightIndex < newTree.length) await invertNode(rightIndex);
      }
    };

    await invertNode(0);
    setIsInverted(!isInverted);
    setIsRunning(false);
  };

  const reset = () => {
    setTree([4, 2, 7, 1, 3, 6, 9]);
    setIsInverted(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 反转二叉树（LeetCode 226）</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        这道题源自 Homebrew 作者 Max Howell 的一个经历，是非常经典的递归应用。
      </p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={invertTree}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "反转中..." : "反转二叉树"}
        </button>
        <button
          onClick={reset}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          重置
        </button>
      </div>

      <TreeVisualization tree={tree} />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function invertTree(root) {
  if (!root) return null;

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归反转子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 二叉搜索树
// ============================================

function BSTDemo() {
  const [bst, setBst] = useState<(number | null)[]>([8, 4, 12, 2, 6, 10, 14]);
  const [searchValue, setSearchValue] = useState("");
  const [insertValue, setInsertValue] = useState("");
  const [searchPath, setSearchPath] = useState<number[]>([]);
  const [message, setMessage] = useState("");

  const search = async () => {
    const val = parseInt(searchValue);
    if (isNaN(val)) {
      setMessage("请输入有效数字");
      return;
    }

    setSearchPath([]);
    setMessage("");
    const path: number[] = [];
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    let index = 0;
    while (index < bst.length && bst[index] !== null) {
      path.push(bst[index]!);
      setSearchPath([...path]);
      await delay(500);

      if (bst[index] === val) {
        setMessage(`找到 ${val}！`);
        return;
      } else if (val < bst[index]!) {
        index = 2 * index + 1; // 左子树
      } else {
        index = 2 * index + 2; // 右子树
      }
    }

    setMessage(`未找到 ${val}`);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 二叉搜索树 (BST)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        二叉搜索树的特点：左子树所有节点 &lt; 根节点 &lt; 右子树所有节点。
        查找时间复杂度为 O(log n)。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="搜索值"
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={search}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          搜索
        </button>
      </div>

      {message && (
        <div className={`mb-4 rounded-md p-2 text-sm ${
          message.includes("找到") ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
        }`}>
          {message}
        </div>
      )}

      <TreeVisualization tree={bst as number[]} highlightNodes={searchPath} />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function searchBST(root, val) {
  if (!root) return null;

  if (val === root.val) {
    return root;
  } else if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>BST 中序遍历得到有序序列！</strong> 对上面的树进行中序遍历：2 → 4 → 6 → 8 → 10 → 12 → 14
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function BinaryTreeExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">二叉树 (Binary Tree)</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          二叉树是每个节点最多有两个子节点的树形数据结构。它是算法中最核心的数据结构之一。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 二叉树节点定义</p>
          <pre className="text-green-400">
{`class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}`}
          </pre>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">常见二叉树类型</h4>
            <ul className="mt-2 list-inside list-disc text-sm text-blue-700 dark:text-blue-300">
              <li>完全二叉树</li>
              <li>满二叉树</li>
              <li>二叉搜索树 (BST)</li>
              <li>平衡二叉树 (AVL)</li>
              <li>红黑树</li>
            </ul>
          </div>
          <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200">遍历方式</h4>
            <ul className="mt-2 list-inside list-disc text-sm text-green-700 dark:text-green-300">
              <li>前序遍历 (根-左-右)</li>
              <li>中序遍历 (左-根-右)</li>
              <li>后序遍历 (左-右-根)</li>
              <li>层序遍历 (BFS)</li>
            </ul>
          </div>
        </div>
      </div>

      <TreeTraversalDemo />
      <MaxDepthDemo />
      <InvertTreeDemo />
      <BSTDemo />
    </div>
  );
}
