"use client";

import { useState } from "react";

// ============================================
// 示例 1: 二分查找
// ============================================

function BinarySearchDemo() {
  const [array] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  const [target, setTarget] = useState(11);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const binarySearch = async () => {
    setIsRunning(true);
    setFound(null);
    setSteps([]);
    const allSteps: string[] = [];

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    let l = 0;
    let r = array.length - 1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setLeft(l);
      setRight(r);
      setMid(m);

      allSteps.push(`left=${l}, right=${r}, mid=${m}, array[mid]=${array[m]}`);
      setSteps([...allSteps]);

      await delay(800);

      if (array[m] === target) {
        allSteps.push(`找到目标 ${target} 在索引 ${m}!`);
        setSteps([...allSteps]);
        setFound(m);
        setIsRunning(false);
        return;
      } else if (array[m] < target) {
        allSteps.push(`${array[m]} < ${target}, 搜索右半部分`);
        l = m + 1;
      } else {
        allSteps.push(`${array[m]} > ${target}, 搜索左半部分`);
        r = m - 1;
      }
      setSteps([...allSteps]);
    }

    allSteps.push(`未找到目标 ${target}`);
    setSteps([...allSteps]);
    setFound(-1);
    setLeft(-1);
    setRight(-1);
    setMid(-1);
    setIsRunning(false);
  };

  const reset = () => {
    setLeft(-1);
    setRight(-1);
    setMid(-1);
    setFound(null);
    setSteps([]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">二分查找 (Binary Search)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        在有序数组中查找目标值，每次将搜索范围缩小一半。时间复杂度 O(log n)。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          placeholder="目标值"
        />
        <button
          onClick={binarySearch}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "搜索中..." : "开始搜索"}
        </button>
        <button onClick={reset} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          重置
        </button>
      </div>

      {/* 数组可视化 */}
      <div className="flex gap-1 mb-4">
        {array.map((val, idx) => {
          let bgColor = "bg-zinc-200 dark:bg-zinc-700";
          if (found === idx) {
            bgColor = "bg-green-500 text-white";
          } else if (idx === mid) {
            bgColor = "bg-red-500 text-white";
          } else if (idx >= left && idx <= right && left !== -1) {
            bgColor = "bg-blue-200 dark:bg-blue-800";
          } else if (left !== -1) {
            bgColor = "bg-zinc-100 dark:bg-zinc-900 text-zinc-400";
          }

          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center w-10 h-12 rounded ${bgColor}`}
            >
              <span className="font-mono text-sm">{val}</span>
              <span className="text-xs opacity-70">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-xs mb-4">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-blue-200 dark:bg-blue-800"></span> 搜索范围</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-500"></span> 中点</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-500"></span> 找到</span>
      </div>

      {steps.length > 0 && (
        <div className="mb-4 max-h-32 overflow-y-auto rounded bg-zinc-100 p-2 dark:bg-zinc-800">
          {steps.map((step, i) => (
            <div key={i} className="text-xs font-mono">{step}</div>
          ))}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // 未找到
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: DFS 深度优先搜索
// ============================================

function DFSDemo() {
  const tree = [1, 2, 3, 4, 5, 6, 7];
  const [visited, setVisited] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [path, setPath] = useState<number[]>([]);

  const dfs = async () => {
    setIsRunning(true);
    setVisited([]);
    setPath([]);
    const visitedNodes: number[] = [];
    const currentPath: number[] = [];

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    const traverse = async (index: number) => {
      if (index >= tree.length || tree[index] === null) return;

      setCurrent(tree[index]);
      currentPath.push(tree[index]);
      setPath([...currentPath]);
      await delay(500);

      visitedNodes.push(tree[index]);
      setVisited([...visitedNodes]);

      // 递归左子树
      await traverse(2 * index + 1);
      // 递归右子树
      await traverse(2 * index + 2);

      currentPath.pop();
      setPath([...currentPath]);
    };

    await traverse(0);
    setCurrent(null);
    setIsRunning(false);
  };

  const reset = () => {
    setVisited([]);
    setCurrent(null);
    setPath([]);
  };

  // 计算节点位置
  const getNodePosition = (index: number, level: number, totalLevels: number) => {
    const nodesInLevel = Math.pow(2, level);
    const positionInLevel = index - (Math.pow(2, level) - 1);
    const spacing = 100 / (nodesInLevel + 1);
    return spacing * (positionInLevel + 1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">DFS 深度优先搜索</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        沿着一条路径走到底，然后回溯。使用栈（递归调用栈）实现。
      </p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={dfs}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "遍历中..." : "开始 DFS"}
        </button>
        <button onClick={reset} disabled={isRunning} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          重置
        </button>
      </div>

      {/* 树可视化 */}
      <div className="relative h-48 mb-4">
        {tree.map((val, idx) => {
          const level = Math.floor(Math.log2(idx + 1));
          const left = getNodePosition(idx, level, 3);
          const top = level * 60 + 10;

          return (
            <div
              key={idx}
              className={`absolute flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full font-mono text-white transition-all ${
                current === val
                  ? "bg-red-500 ring-4 ring-red-300"
                  : visited.includes(val)
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              style={{ left: `${left}%`, top: `${top}px` }}
            >
              {val}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-xs mb-4">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-500"></span> 当前节点</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-500"></span> 已访问</span>
      </div>

      <div className="mb-4">
        <span className="text-sm font-medium">访问顺序: </span>
        <span className="font-mono">[{visited.join(" → ")}]</span>
      </div>

      {path.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-medium">当前路径: </span>
          <span className="font-mono text-blue-600">[{path.join(" → ")}]</span>
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`// 递归实现
function dfs(node) {
  if (!node) return;

  visit(node);           // 访问当前节点
  dfs(node.left);        // 递归左子树
  dfs(node.right);       // 递归右子树
}

// 迭代实现（使用栈）
function dfsIterative(root) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    visit(node);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: BFS 广度优先搜索
// ============================================

function BFSDemo() {
  const tree = [1, 2, 3, 4, 5, 6, 7];
  const [visited, setVisited] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [queue, setQueue] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const bfs = async () => {
    setIsRunning(true);
    setVisited([]);
    setQueue([]);
    const visitedNodes: number[] = [];

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    const q = [0]; // 存储索引
    setQueue([tree[0]]);

    while (q.length > 0) {
      const index = q.shift()!;
      setCurrent(tree[index]);
      await delay(500);

      visitedNodes.push(tree[index]);
      setVisited([...visitedNodes]);

      // 添加子节点到队列
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (leftIndex < tree.length) q.push(leftIndex);
      if (rightIndex < tree.length) q.push(rightIndex);

      setQueue(q.map(i => tree[i]));
      await delay(300);
    }

    setCurrent(null);
    setIsRunning(false);
  };

  const reset = () => {
    setVisited([]);
    setCurrent(null);
    setQueue([]);
  };

  const getNodePosition = (index: number, level: number) => {
    const nodesInLevel = Math.pow(2, level);
    const positionInLevel = index - (Math.pow(2, level) - 1);
    const spacing = 100 / (nodesInLevel + 1);
    return spacing * (positionInLevel + 1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">BFS 广度优先搜索</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        逐层遍历，先访问离根节点近的节点。使用队列实现。
      </p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={bfs}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "遍历中..." : "开始 BFS"}
        </button>
        <button onClick={reset} disabled={isRunning} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          重置
        </button>
      </div>

      {/* 树可视化 */}
      <div className="relative h-48 mb-4">
        {tree.map((val, idx) => {
          const level = Math.floor(Math.log2(idx + 1));
          const left = getNodePosition(idx, level);
          const top = level * 60 + 10;

          return (
            <div
              key={idx}
              className={`absolute flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full font-mono text-white transition-all ${
                current === val
                  ? "bg-red-500 ring-4 ring-red-300"
                  : visited.includes(val)
                  ? "bg-green-500"
                  : queue.includes(val)
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
              style={{ left: `${left}%`, top: `${top}px` }}
            >
              {val}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-xs mb-4">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-500"></span> 当前节点</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-amber-500"></span> 队列中</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-500"></span> 已访问</span>
      </div>

      <div className="mb-4">
        <span className="text-sm font-medium">队列: </span>
        <span className="font-mono">[{queue.join(", ")}]</span>
      </div>

      <div className="mb-4">
        <span className="text-sm font-medium">访问顺序: </span>
        <span className="font-mono">[{visited.join(" → ")}]</span>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`function bfs(root) {
  const queue = [root];
  const result = [];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

// 层序遍历（按层分组）
function levelOrder(root) {
  const queue = [root];
  const result = [];

  while (queue.length) {
    const level = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }

  return result;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: DFS vs BFS 对比
// ============================================

function SearchComparison() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">DFS vs BFS 对比</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-600">
              <th className="p-2 text-left">特性</th>
              <th className="p-2 text-left">DFS 深度优先</th>
              <th className="p-2 text-left">BFS 广度优先</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="p-2 font-medium">数据结构</td>
              <td className="p-2">栈 (Stack) / 递归</td>
              <td className="p-2">队列 (Queue)</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="p-2 font-medium">遍历顺序</td>
              <td className="p-2">纵向深入</td>
              <td className="p-2">横向展开</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="p-2 font-medium">空间复杂度</td>
              <td className="p-2">O(h) 树高</td>
              <td className="p-2">O(w) 最大宽度</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="p-2 font-medium">适用场景</td>
              <td className="p-2">路径问题、回溯</td>
              <td className="p-2">最短路径、层级问题</td>
            </tr>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <td className="p-2 font-medium">是否找最短路径</td>
              <td className="p-2">否</td>
              <td className="p-2">是（无权图）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="font-medium text-purple-800 dark:text-purple-200">DFS 适用问题</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>判断路径是否存在</li>
            <li>回溯算法（排列组合）</li>
            <li>拓扑排序</li>
            <li>检测环</li>
            <li>连通分量</li>
          </ul>
        </div>
        <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="font-medium text-blue-800 dark:text-blue-200">BFS 适用问题</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>最短路径（无权图）</li>
            <li>层序遍历</li>
            <li>找最近的目标</li>
            <li>社交网络关系</li>
            <li>迷宫最短路</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function SearchingExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">搜索算法</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          搜索算法用于在数据结构中查找特定元素或遍历所有元素。掌握二分查找、DFS 和 BFS 是必备技能。
        </p>
      </div>

      <BinarySearchDemo />
      <DFSDemo />
      <BFSDemo />
      <SearchComparison />
    </div>
  );
}
