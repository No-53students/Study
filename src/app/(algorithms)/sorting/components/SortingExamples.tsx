"use client";

import { useState, useRef, useEffect } from "react";

// ============================================
// 排序可视化组件
// ============================================

interface SortVisualizerProps {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
  pivot?: number;
}

function SortVisualizer({ array, comparing = [-1, -1], swapping = [-1, -1], sorted = [], pivot }: SortVisualizerProps) {
  const maxVal = Math.max(...array);

  return (
    <div className="flex items-end justify-center gap-1 h-48 p-4">
      {array.map((val, idx) => {
        let bgColor = "bg-blue-500";
        if (sorted.includes(idx)) {
          bgColor = "bg-green-500";
        } else if (swapping.includes(idx)) {
          bgColor = "bg-red-500";
        } else if (comparing.includes(idx)) {
          bgColor = "bg-yellow-500";
        } else if (pivot === idx) {
          bgColor = "bg-purple-500";
        }

        return (
          <div
            key={idx}
            className={`${bgColor} transition-all duration-100 rounded-t w-8 flex items-end justify-center text-white text-xs pb-1`}
            style={{ height: `${(val / maxVal) * 100}%` }}
          >
            {val}
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// 示例 1: 冒泡排序
// ============================================

function BubbleSortDemo() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [comparing, setComparing] = useState<[number, number]>([-1, -1]);
  const [swapping, setSwapping] = useState<[number, number]>([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);

  const bubbleSort = async () => {
    setIsRunning(true);
    setSorted([]);
    const arr = [...array];
    const n = arr.length;
    const sortedIndices: number[] = [];

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await delay(speed);

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          await delay(speed);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
        setSwapping([-1, -1]);
      }
      sortedIndices.push(n - 1 - i);
      setSorted([...sortedIndices]);
    }

    sortedIndices.push(0);
    setSorted([...sortedIndices]);
    setComparing([-1, -1]);
    setIsRunning(false);
  };

  const reset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setSorted([]);
    setComparing([-1, -1]);
    setSwapping([-1, -1]);
  };

  const randomize = () => {
    setArray(Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10));
    setSorted([]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">冒泡排序 (Bubble Sort)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        反复比较相邻元素，如果顺序错误就交换。每轮将最大的元素"冒泡"到末尾。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={bubbleSort}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "排序中..." : "开始排序"}
        </button>
        <button onClick={reset} disabled={isRunning} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          重置
        </button>
        <button onClick={randomize} disabled={isRunning} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          随机数组
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm">速度:</span>
          <input
            type="range"
            min="50"
            max="500"
            value={500 - speed}
            onChange={(e) => setSpeed(500 - parseInt(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      <SortVisualizer array={array} comparing={comparing} swapping={swapping} sorted={sorted} />

      <div className="mt-4 flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-yellow-500"></span> 比较中</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-500"></span> 交换中</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-500"></span> 已排序</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-zinc-900 p-3 text-sm">
          <pre className="text-green-400 text-xs overflow-x-auto">
{`function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`}
          </pre>
        </div>
        <div className="rounded-md bg-amber-50 p-3 dark:bg-amber-900/30 text-sm">
          <div className="font-medium">复杂度分析</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>时间复杂度: O(n²)</li>
            <li>空间复杂度: O(1)</li>
            <li>稳定排序</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 快速排序
// ============================================

function QuickSortDemo() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 45]);
  const [comparing, setComparing] = useState<[number, number]>([-1, -1]);
  const [swapping, setSwapping] = useState<[number, number]>([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);

  const quickSort = async () => {
    setIsRunning(true);
    setSorted([]);
    const arr = [...array];
    const sortedIndices = new Set<number>();

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    const partition = async (low: number, high: number): Promise<number> => {
      const pivotVal = arr[high];
      setPivot(high);
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setComparing([j, high]);
        await delay(speed);

        if (arr[j] < pivotVal) {
          i++;
          if (i !== j) {
            setSwapping([i, j]);
            await delay(speed);
            [arr[i], arr[j]] = [arr[j], arr[i]];
            setArray([...arr]);
          }
        }
        setSwapping([-1, -1]);
      }

      if (i + 1 !== high) {
        setSwapping([i + 1, high]);
        await delay(speed);
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
      }

      sortedIndices.add(i + 1);
      setSorted([...sortedIndices]);
      setPivot(undefined);
      setSwapping([-1, -1]);

      return i + 1;
    };

    const sort = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      } else if (low === high) {
        sortedIndices.add(low);
        setSorted([...sortedIndices]);
      }
    };

    await sort(0, arr.length - 1);
    setComparing([-1, -1]);
    setIsRunning(false);
  };

  const reset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90, 45]);
    setSorted([]);
    setComparing([-1, -1]);
    setSwapping([-1, -1]);
    setPivot(undefined);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">快速排序 (Quick Sort)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        选择一个基准元素(pivot)，将数组分为两部分：小于基准的在左边，大于基准的在右边，然后递归排序。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={quickSort}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "排序中..." : "开始排序"}
        </button>
        <button onClick={reset} disabled={isRunning} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          重置
        </button>
      </div>

      <SortVisualizer array={array} comparing={comparing} swapping={swapping} sorted={sorted} pivot={pivot} />

      <div className="mt-4 flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-purple-500"></span> 基准(pivot)</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-yellow-500"></span> 比较中</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-500"></span> 已确定位置</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-zinc-900 p-3 text-sm">
          <pre className="text-green-400 text-xs overflow-x-auto">
{`function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}
          </pre>
        </div>
        <div className="rounded-md bg-green-50 p-3 dark:bg-green-900/30 text-sm">
          <div className="font-medium">复杂度分析</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>平均时间: O(n log n)</li>
            <li>最坏时间: O(n²) - 已排序数组</li>
            <li>空间复杂度: O(log n)</li>
            <li>不稳定排序</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 归并排序
// ============================================

function MergeSortDemo() {
  const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [comparing, setComparing] = useState<[number, number]>([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const mergeSort = async () => {
    setIsRunning(true);
    setSorted([]);
    setSteps([]);
    const arr = [...array];
    const allSteps: string[] = [];

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

    const merge = async (left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      allSteps.push(`合并 [${leftArr.join(',')}] 和 [${rightArr.join(',')}]`);
      setSteps([...allSteps]);

      let i = 0, j = 0, k = left;

      while (i < leftArr.length && j < rightArr.length) {
        setComparing([left + i, mid + 1 + j]);
        await delay(300);

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
        k++;
        setArray([...arr]);
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
        setArray([...arr]);
        await delay(200);
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
        setArray([...arr]);
        await delay(200);
      }

      allSteps.push(`结果: [${arr.slice(left, right + 1).join(',')}]`);
      setSteps([...allSteps]);
    };

    const sort = async (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await sort(left, mid);
        await sort(mid + 1, right);
        await merge(left, mid, right);
      }
    };

    await sort(0, arr.length - 1);
    setSorted(Array.from({ length: arr.length }, (_, i) => i));
    setComparing([-1, -1]);
    setIsRunning(false);
  };

  const reset = () => {
    setArray([38, 27, 43, 3, 9, 82, 10]);
    setSorted([]);
    setSteps([]);
    setComparing([-1, -1]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">归并排序 (Merge Sort)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        分治思想：将数组分成两半，分别排序后再合并。合并时按顺序比较两个有序数组的元素。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={mergeSort}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "排序中..." : "开始排序"}
        </button>
        <button onClick={reset} disabled={isRunning} className="rounded-md bg-zinc-200 px-4 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700">
          重置
        </button>
      </div>

      <SortVisualizer array={array} comparing={comparing} sorted={sorted} />

      {steps.length > 0 && (
        <div className="mt-4 max-h-32 overflow-y-auto rounded bg-zinc-100 p-2 dark:bg-zinc-800">
          {steps.map((step, i) => (
            <div key={i} className="text-xs font-mono">{step}</div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-zinc-900 p-3 text-sm">
          <pre className="text-green-400 text-xs overflow-x-auto">
{`function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}`}
          </pre>
        </div>
        <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-900/30 text-sm">
          <div className="font-medium">复杂度分析</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>时间复杂度: O(n log n) - 总是</li>
            <li>空间复杂度: O(n)</li>
            <li>稳定排序</li>
            <li>适合链表排序</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 排序算法比较
// ============================================

function SortComparison() {
  const algorithms = [
    { name: "冒泡排序", time: "O(n²)", space: "O(1)", stable: true, best: "O(n)", worst: "O(n²)" },
    { name: "选择排序", time: "O(n²)", space: "O(1)", stable: false, best: "O(n²)", worst: "O(n²)" },
    { name: "插入排序", time: "O(n²)", space: "O(1)", stable: true, best: "O(n)", worst: "O(n²)" },
    { name: "快速排序", time: "O(n log n)", space: "O(log n)", stable: false, best: "O(n log n)", worst: "O(n²)" },
    { name: "归并排序", time: "O(n log n)", space: "O(n)", stable: true, best: "O(n log n)", worst: "O(n log n)" },
    { name: "堆排序", time: "O(n log n)", space: "O(1)", stable: false, best: "O(n log n)", worst: "O(n log n)" },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">排序算法比较</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-300 dark:border-zinc-600">
              <th className="p-2 text-left">算法</th>
              <th className="p-2 text-left">平均时间</th>
              <th className="p-2 text-left">最好</th>
              <th className="p-2 text-left">最坏</th>
              <th className="p-2 text-left">空间</th>
              <th className="p-2 text-left">稳定性</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((algo, i) => (
              <tr key={i} className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2 font-medium">{algo.name}</td>
                <td className="p-2 font-mono text-xs">{algo.time}</td>
                <td className="p-2 font-mono text-xs">{algo.best}</td>
                <td className="p-2 font-mono text-xs">{algo.worst}</td>
                <td className="p-2 font-mono text-xs">{algo.space}</td>
                <td className="p-2">
                  <span className={`rounded px-2 py-0.5 text-xs ${algo.stable ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"}`}>
                    {algo.stable ? "稳定" : "不稳定"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 dark:bg-amber-900/30 text-sm">
        <div className="font-medium">稳定性说明</div>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          稳定排序：相同值的元素在排序后保持原来的相对顺序。
          例如：排序 [(3,a), (1,b), (3,c)]，稳定排序结果为 [(1,b), (3,a), (3,c)]
        </p>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 dark:bg-blue-900/30 text-sm">
        <div className="font-medium">前端常用场景</div>
        <ul className="mt-2 text-xs list-inside list-disc">
          <li>Array.prototype.sort() - V8 使用 TimSort (归并+插入)</li>
          <li>小数据量（&lt;10）- 插入排序更快</li>
          <li>大数据量 - 快速排序/归并排序</li>
          <li>需要稳定性 - 归并排序</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function SortingExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">排序算法</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          排序是最基础的算法之一，掌握各种排序算法的原理和复杂度是必备技能。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// JavaScript 内置排序</p>
          <pre className="text-green-400">
{`// 默认按字符串排序（可能不是你想要的）
[10, 2, 1].sort();  // [1, 10, 2] ❌

// 数字排序需要比较函数
[10, 2, 1].sort((a, b) => a - b);  // [1, 2, 10] ✓

// 降序
[10, 2, 1].sort((a, b) => b - a);  // [10, 2, 1]`}
          </pre>
        </div>
      </div>

      <BubbleSortDemo />
      <QuickSortDemo />
      <MergeSortDemo />
      <SortComparison />
    </div>
  );
}
