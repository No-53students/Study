"use client";

import { useState, useCallback } from "react";

// ============================================
// 链表节点和链表类定义
// ============================================

class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ============================================
// 示例 1: 链表的基本操作可视化
// ============================================

function LinkedListVisualization() {
  const [nodes, setNodes] = useState<number[]>([1, 2, 3]);
  const [inputValue, setInputValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [message, setMessage] = useState("");

  // 在末尾添加
  const append = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setMessage("请输入有效数字");
      return;
    }
    setNodes([...nodes, num]);
    setInputValue("");
    setMessage(`在末尾添加: ${num}`);
  };

  // 在开头添加
  const prepend = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setMessage("请输入有效数字");
      return;
    }
    setNodes([num, ...nodes]);
    setInputValue("");
    setMessage(`在开头添加: ${num}`);
  };

  // 在指定位置插入
  const insertAt = () => {
    const num = parseInt(inputValue);
    const index = parseInt(insertIndex);
    if (isNaN(num) || isNaN(index)) {
      setMessage("请输入有效的数字和索引");
      return;
    }
    if (index < 0 || index > nodes.length) {
      setMessage(`索引超出范围 (0-${nodes.length})`);
      return;
    }
    const newNodes = [...nodes];
    newNodes.splice(index, 0, num);
    setNodes(newNodes);
    setInputValue("");
    setInsertIndex("");
    setMessage(`在索引 ${index} 处插入: ${num}`);
  };

  // 删除指定位置
  const deleteAt = (index: number) => {
    const deleted = nodes[index];
    setNodes(nodes.filter((_, i) => i !== index));
    setMessage(`删除索引 ${index} 的节点: ${deleted}`);
  };

  // 查找
  const find = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setMessage("请输入要查找的数字");
      return;
    }
    const index = nodes.indexOf(num);
    if (index === -1) {
      setMessage(`未找到 ${num}`);
    } else {
      setMessage(`找到 ${num}，位于索引 ${index}`);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 链表的基本操作</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="值"
          className="w-20 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={prepend}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          头部插入
        </button>
        <button
          onClick={append}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          尾部插入
        </button>
        <button
          onClick={find}
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          查找
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="number"
          value={insertIndex}
          onChange={(e) => setInsertIndex(e.target.value)}
          placeholder="索引"
          className="w-20 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={insertAt}
          className="rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          在索引处插入
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-md bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          {message}
        </div>
      )}

      {/* 链表可视化 */}
      <div className="overflow-x-auto py-4">
        <div className="flex items-center gap-1">
          <div className="rounded bg-zinc-300 px-2 py-1 text-xs dark:bg-zinc-600">
            HEAD
          </div>
          <div className="text-zinc-400">→</div>
          {nodes.length === 0 ? (
            <div className="text-sm text-zinc-400">NULL (空链表)</div>
          ) : (
            nodes.map((node, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="group relative">
                  <div className="flex h-12 w-20 items-center justify-between rounded border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30">
                    <div className="flex-1 text-center font-mono font-bold">
                      {node}
                    </div>
                    <div className="h-full w-6 border-l-2 border-blue-500 bg-blue-100 dark:bg-blue-800/50">
                      <div className="flex h-full items-center justify-center text-xs">
                        →
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 left-0 right-0 text-center text-xs text-zinc-500">
                    [{index}]
                  </div>
                  <button
                    onClick={() => deleteAt(index)}
                    className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white group-hover:flex"
                  >
                    ×
                  </button>
                </div>
                {index < nodes.length - 1 && (
                  <div className="text-zinc-400">→</div>
                )}
              </div>
            ))
          )}
          {nodes.length > 0 && (
            <>
              <div className="text-zinc-400">→</div>
              <div className="rounded bg-zinc-300 px-2 py-1 text-xs dark:bg-zinc-600">
                NULL
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
        <p>链表长度: {nodes.length}</p>
        <p className="mt-1 text-xs">提示: 悬停在节点上可以看到删除按钮</p>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>链表结构:</strong> 每个节点包含两部分：数据域(存储值)和指针域(指向下一个节点)
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 反转链表（经典算法题）
// ============================================

function ReverseLinkedList() {
  const [nodes, setNodes] = useState<number[]>([1, 2, 3, 4, 5]);
  const [steps, setSteps] = useState<{ prev: number | null; current: number; next: number | null; result: number[] }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const reverse = useCallback(async () => {
    setIsAnimating(true);
    setSteps([]);
    setCurrentStep(-1);

    const arr = [...nodes];
    const allSteps: { prev: number | null; current: number; next: number | null; result: number[] }[] = [];

    // 模拟反转过程
    let prev: number | null = null;
    let result: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const next = i < arr.length - 1 ? arr[i + 1] : null;

      // 当前节点指向 prev
      result = [current, ...result.filter((_, idx) => idx < result.length)];

      allSteps.push({
        prev,
        current,
        next,
        result: [...result],
      });

      prev = current;
    }

    setSteps(allSteps);

    // 动画展示每一步
    for (let i = 0; i < allSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 1000));
    }

    setNodes([...nodes].reverse());
    setIsAnimating(false);
  }, [nodes]);

  const reset = () => {
    setNodes([1, 2, 3, 4, 5]);
    setSteps([]);
    setCurrentStep(-1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 反转链表（LeetCode 206）</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={reverse}
          disabled={isAnimating}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAnimating ? "反转中..." : "开始反转"}
        </button>
        <button
          onClick={reset}
          disabled={isAnimating}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          重置
        </button>
      </div>

      {/* 原始链表 */}
      <div className="mb-4">
        <div className="mb-2 text-sm font-medium">原始链表:</div>
        <div className="flex items-center gap-1">
          {nodes.map((node, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-500 font-mono text-white">
                {node}
              </div>
              {index < nodes.length - 1 && <div className="text-zinc-400">→</div>}
            </div>
          ))}
          <div className="text-zinc-400">→</div>
          <span className="text-sm text-zinc-400">NULL</span>
        </div>
      </div>

      {/* 当前步骤 */}
      {currentStep >= 0 && steps[currentStep] && (
        <div className="mb-4 rounded-md bg-amber-50 p-4 dark:bg-amber-900/30">
          <div className="mb-2 text-sm font-medium">
            步骤 {currentStep + 1}/{steps.length}
          </div>
          <div className="space-y-1 text-sm">
            <p>prev = {steps[currentStep].prev ?? "NULL"}</p>
            <p>current = {steps[currentStep].current}</p>
            <p>next = {steps[currentStep].next ?? "NULL"}</p>
          </div>
          <div className="mt-2">
            <div className="text-sm">已反转部分:</div>
            <div className="flex items-center gap-1 mt-1">
              {steps[currentStep].result.map((node, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-mono text-sm text-white">
                    {node}
                  </div>
                  {index < steps[currentStep].result.length - 1 && (
                    <div className="text-zinc-400">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next; // 保存下一个节点
    current.next = prev;       // 反转指针
    prev = current;            // prev 前进
    current = next;            // current 前进
  }

  return prev; // 新的头节点
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 检测环形链表
// ============================================

function CycleDetection() {
  const [hasCycle, setHasCycle] = useState(true);
  const [slowPos, setSlowPos] = useState(-1);
  const [fastPos, setFastPos] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const nodes = [1, 2, 3, 4, 5, 6];
  const cycleStart = hasCycle ? 2 : -1; // 环起点索引

  const detectCycle = async () => {
    setIsRunning(true);
    setResult(null);
    setSlowPos(0);
    setFastPos(0);

    let slow = 0;
    let fast = 0;

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (fast < nodes.length) {
      await delay(500);

      // 慢指针移动一步
      if (hasCycle && slow >= cycleStart) {
        slow = cycleStart + ((slow - cycleStart + 1) % (nodes.length - cycleStart));
      } else {
        slow = slow + 1;
      }

      // 快指针移动两步
      for (let i = 0; i < 2; i++) {
        if (hasCycle && fast >= cycleStart) {
          fast = cycleStart + ((fast - cycleStart + 1) % (nodes.length - cycleStart));
        } else {
          fast = fast + 1;
        }
      }

      setSlowPos(slow);
      setFastPos(fast);

      // 检测是否相遇
      if (hasCycle && slow === fast) {
        setResult("检测到环！快慢指针相遇");
        setIsRunning(false);
        return;
      }

      // 无环情况：快指针到达末尾
      if (!hasCycle && fast >= nodes.length) {
        setResult("无环，快指针到达末尾");
        setIsRunning(false);
        return;
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 检测环形链表（LeetCode 141）</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        使用快慢指针（Floyd 判圈算法）检测链表中是否存在环。
        快指针每次移动两步，慢指针每次移动一步。如果有环，它们必定相遇。
      </p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setHasCycle(!hasCycle)}
          disabled={isRunning}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          {hasCycle ? "有环链表" : "无环链表"}
        </button>
        <button
          onClick={detectCycle}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRunning ? "检测中..." : "开始检测"}
        </button>
      </div>

      {/* 链表可视化 */}
      <div className="overflow-x-auto py-4">
        <div className="flex items-center gap-2">
          {nodes.map((node, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-mono text-white ${
                    index === slowPos && index === fastPos
                      ? "bg-purple-500 ring-4 ring-purple-300"
                      : index === slowPos
                      ? "bg-green-500 ring-2 ring-green-300"
                      : index === fastPos
                      ? "bg-red-500 ring-2 ring-red-300"
                      : hasCycle && index >= cycleStart
                      ? "bg-amber-500"
                      : "bg-zinc-500"
                  }`}
                >
                  {node}
                </div>
                <div className="absolute -bottom-5 left-0 right-0 text-center text-xs text-zinc-500">
                  [{index}]
                </div>
              </div>
              {index < nodes.length - 1 && <div className="text-zinc-400">→</div>}
            </div>
          ))}
          {hasCycle ? (
            <div className="flex items-center">
              <div className="text-zinc-400">→</div>
              <div className="rounded bg-amber-200 px-2 py-1 text-xs dark:bg-amber-800">
                回到 [{cycleStart}]
              </div>
            </div>
          ) : (
            <>
              <div className="text-zinc-400">→</div>
              <span className="text-sm text-zinc-400">NULL</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-green-500"></span> 慢指针
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-red-500"></span> 快指针
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-purple-500"></span> 相遇点
        </span>
        {hasCycle && (
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-amber-500"></span> 环中节点
          </span>
        )}
      </div>

      {result && (
        <div className={`mt-4 rounded-md p-3 text-sm ${
          result.includes("检测到环")
            ? "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200"
            : "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200"
        }`}>
          {result}
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;       // 慢指针走一步
    fast = fast.next.next;  // 快指针走两步

    if (slow === fast) {
      return true; // 相遇说明有环
    }
  }

  return false; // 快指针到达末尾，无环
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 合并两个有序链表
// ============================================

function MergeSortedLists() {
  const [list1, setList1] = useState([1, 3, 5, 7]);
  const [list2, setList2] = useState([2, 4, 6, 8]);
  const [merged, setMerged] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const merge = async () => {
    setIsAnimating(true);
    setMerged([]);
    setStep(0);

    const result: number[] = [];
    let i = 0;
    let j = 0;

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (i < list1.length && j < list2.length) {
      await delay(600);
      if (list1[i] <= list2[j]) {
        result.push(list1[i]);
        i++;
      } else {
        result.push(list2[j]);
        j++;
      }
      setMerged([...result]);
      setStep((s) => s + 1);
    }

    // 添加剩余元素
    while (i < list1.length) {
      await delay(400);
      result.push(list1[i]);
      i++;
      setMerged([...result]);
    }

    while (j < list2.length) {
      await delay(400);
      result.push(list2[j]);
      j++;
      setMerged([...result]);
    }

    setIsAnimating(false);
  };

  const reset = () => {
    setMerged([]);
    setStep(0);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 合并两个有序链表（LeetCode 21）</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={merge}
          disabled={isAnimating}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAnimating ? "合并中..." : "开始合并"}
        </button>
        <button
          onClick={reset}
          disabled={isAnimating}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          重置
        </button>
      </div>

      <div className="space-y-4">
        {/* 链表1 */}
        <div>
          <div className="mb-1 text-sm font-medium text-blue-600">链表 1:</div>
          <div className="flex items-center gap-1">
            {list1.map((node, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-mono text-white">
                  {node}
                </div>
                {index < list1.length - 1 && <div className="text-zinc-400">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 链表2 */}
        <div>
          <div className="mb-1 text-sm font-medium text-green-600">链表 2:</div>
          <div className="flex items-center gap-1">
            {list2.map((node, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-mono text-white">
                  {node}
                </div>
                {index < list2.length - 1 && <div className="text-zinc-400">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 合并结果 */}
        <div>
          <div className="mb-1 text-sm font-medium text-purple-600">合并结果:</div>
          <div className="flex items-center gap-1 min-h-[40px]">
            {merged.length === 0 ? (
              <span className="text-sm text-zinc-400">等待合并...</span>
            ) : (
              merged.map((node, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-mono text-white">
                    {node}
                  </div>
                  {index < merged.length - 1 && <div className="text-zinc-400">→</div>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // 连接剩余部分
  current.next = l1 || l2;

  return dummy.next;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function LinkedListExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">链表 (Linked List) 数据结构</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          链表是一种线性数据结构，元素通过指针相连。与数组不同，链表元素在内存中不必连续存储。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 链表节点定义</p>
          <pre className="text-green-400">
{`class ListNode<T> {
  value: T;              // 数据域
  next: ListNode | null; // 指针域

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}`}
          </pre>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200">优点</h4>
            <ul className="mt-2 list-inside list-disc text-sm text-green-700 dark:text-green-300">
              <li>动态大小，无需预分配</li>
              <li>插入/删除 O(1)（已知位置）</li>
              <li>内存利用灵活</li>
            </ul>
          </div>
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
            <h4 className="font-semibold text-red-800 dark:text-red-200">缺点</h4>
            <ul className="mt-2 list-inside list-disc text-sm text-red-700 dark:text-red-300">
              <li>随机访问 O(n)</li>
              <li>额外的指针存储开销</li>
              <li>缓存不友好</li>
            </ul>
          </div>
        </div>
      </div>

      <LinkedListVisualization />
      <ReverseLinkedList />
      <CycleDetection />
      <MergeSortedLists />
    </div>
  );
}
