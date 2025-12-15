"use client";

import { useState, useEffect, useRef } from "react";

// ============================================
// 队列的实现
// ============================================

class Queue<T> {
  private items: T[] = [];

  // 入队
  enqueue(item: T): void {
    this.items.push(item);
  }

  // 出队
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // 查看队首元素
  front(): T | undefined {
    return this.items[0];
  }

  // 判断是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取队列大小
  size(): number {
    return this.items.length;
  }

  // 清空队列
  clear(): void {
    this.items = [];
  }

  // 获取所有元素
  toArray(): T[] {
    return [...this.items];
  }
}

// ============================================
// 示例 1: 队列的基本操作可视化
// ============================================

function QueueVisualization() {
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const enqueue = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setMessage("请输入有效数字");
      return;
    }
    setQueue([...queue, num]);
    setInputValue("");
    setMessage(`入队: ${num}`);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage("队列为空，无法出队");
      return;
    }
    const removed = queue[0];
    setQueue(queue.slice(1));
    setMessage(`出队: ${removed}`);
  };

  const front = () => {
    if (queue.length === 0) {
      setMessage("队列为空");
      return;
    }
    setMessage(`队首元素: ${queue[0]}`);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 队列的基本操作</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入数字"
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          onKeyDown={(e) => e.key === "Enter" && enqueue()}
        />
        <button
          onClick={enqueue}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Enqueue 入队
        </button>
        <button
          onClick={dequeue}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Dequeue 出队
        </button>
        <button
          onClick={front}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Front 查看
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-md bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          {message}
        </div>
      )}

      {/* 队列的可视化 */}
      <div className="flex items-center gap-2 overflow-x-auto py-4">
        <div className="text-sm text-zinc-500">队首 →</div>
        <div className="flex min-h-[60px] min-w-[200px] items-center gap-1 rounded-lg border-2 border-zinc-400 bg-zinc-50 p-2 dark:border-zinc-600 dark:bg-zinc-900">
          {queue.length === 0 ? (
            <div className="text-sm text-zinc-400">空队列</div>
          ) : (
            queue.map((item, index) => (
              <div
                key={index}
                className={`flex h-10 w-10 items-center justify-center rounded font-mono text-white transition-all ${
                  index === 0 ? "bg-green-500" : "bg-zinc-500"
                }`}
              >
                {item}
              </div>
            ))
          )}
        </div>
        <div className="text-sm text-zinc-500">← 队尾</div>
      </div>

      <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>队列大小: {queue.length}</p>
        <p>是否为空: {queue.length === 0 ? "是" : "否"}</p>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>对比栈:</strong> 栈是后进先出(LIFO)，队列是先进先出(FIFO)。
        就像排队买票，先来的先服务。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 任务队列模拟
// ============================================

interface Task {
  id: number;
  name: string;
  duration: number;
}

function TaskQueueDemo() {
  const [taskQueue, setTaskQueue] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const taskIdRef = useRef(0);

  const addTask = (name: string, duration: number) => {
    const newTask: Task = {
      id: ++taskIdRef.current,
      name,
      duration,
    };
    setTaskQueue((prev) => [...prev, newTask]);
  };

  const processQueue = () => {
    if (isProcessing || taskQueue.length === 0) return;
    setIsProcessing(true);
  };

  useEffect(() => {
    if (!isProcessing || taskQueue.length === 0) {
      if (isProcessing && taskQueue.length === 0) {
        setIsProcessing(false);
        setCurrentTask(null);
      }
      return;
    }

    const task = taskQueue[0];
    setCurrentTask(task);
    setTaskQueue((prev) => prev.slice(1));
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompletedTasks((completed) => [...completed, task]);
          setCurrentTask(null);
          return 0;
        }
        return prev + 100 / (task.duration * 10);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing, taskQueue, currentTask]);

  const clearCompleted = () => {
    setCompletedTasks([]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 任务队列模拟</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        模拟任务队列的处理过程，任务按照先进先出的顺序执行。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => addTask("下载文件", 2)}
          className="rounded-md bg-zinc-200 px-3 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          + 下载文件 (2s)
        </button>
        <button
          onClick={() => addTask("处理图片", 3)}
          className="rounded-md bg-zinc-200 px-3 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          + 处理图片 (3s)
        </button>
        <button
          onClick={() => addTask("上传数据", 1)}
          className="rounded-md bg-zinc-200 px-3 py-2 text-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          + 上传数据 (1s)
        </button>
        <button
          onClick={processQueue}
          disabled={isProcessing || taskQueue.length === 0}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? "处理中..." : "开始处理"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* 等待队列 */}
        <div>
          <div className="mb-2 text-sm font-medium">等待队列 ({taskQueue.length})</div>
          <div className="min-h-[150px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {taskQueue.map((task, index) => (
              <div
                key={task.id}
                className="mb-2 rounded bg-amber-100 p-2 text-sm dark:bg-amber-900/30"
              >
                <div className="font-medium">{task.name}</div>
                <div className="text-xs text-zinc-500">
                  {index === 0 ? "下一个" : `排队中 #${index + 1}`}
                </div>
              </div>
            ))}
            {taskQueue.length === 0 && (
              <div className="text-sm text-zinc-400">暂无任务</div>
            )}
          </div>
        </div>

        {/* 当前处理 */}
        <div>
          <div className="mb-2 text-sm font-medium">正在处理</div>
          <div className="min-h-[150px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {currentTask ? (
              <div className="rounded bg-blue-100 p-2 dark:bg-blue-900/30">
                <div className="font-medium text-blue-800 dark:text-blue-200">
                  {currentTask.name}
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded bg-zinc-300 dark:bg-zinc-600">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  {Math.round(progress)}%
                </div>
              </div>
            ) : (
              <div className="text-sm text-zinc-400">空闲中</div>
            )}
          </div>
        </div>

        {/* 已完成 */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>已完成 ({completedTasks.length})</span>
            {completedTasks.length > 0 && (
              <button
                onClick={clearCompleted}
                className="text-xs text-zinc-500 hover:text-zinc-700"
              >
                清空
              </button>
            )}
          </div>
          <div className="min-h-[150px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="mb-2 rounded bg-green-100 p-2 text-sm dark:bg-green-900/30"
              >
                <div className="font-medium text-green-800 dark:text-green-200">
                  ✓ {task.name}
                </div>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <div className="text-sm text-zinc-400">暂无完成</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 事件循环可视化
// ============================================

function EventLoopDemo() {
  const [callStack, setCallStack] = useState<string[]>([]);
  const [taskQueue, setTaskQueue] = useState<string[]>([]);
  const [microtaskQueue, setMicrotaskQueue] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDemo = async () => {
    setIsRunning(true);
    setCallStack([]);
    setTaskQueue([]);
    setMicrotaskQueue([]);
    setLogs([]);

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const logMessages: string[] = [];

    const addLog = (msg: string) => {
      logMessages.push(msg);
      setLogs([...logMessages]);
    };

    // 1. 同步代码入栈
    setCallStack(["main()"]);
    addLog("1. 执行同步代码 console.log('Start')");
    await delay(800);

    // 2. 遇到 setTimeout
    setTaskQueue(["setTimeout callback"]);
    addLog("2. setTimeout 回调加入宏任务队列");
    await delay(800);

    // 3. 遇到 Promise
    setMicrotaskQueue(["Promise.then callback"]);
    addLog("3. Promise.then 回调加入微任务队列");
    await delay(800);

    // 4. 继续同步代码
    addLog("4. 执行同步代码 console.log('End')");
    await delay(800);

    // 5. 同步代码执行完毕
    setCallStack([]);
    addLog("5. 同步代码执行完毕，调用栈清空");
    await delay(800);

    // 6. 执行微任务
    setCallStack(["Promise.then callback"]);
    setMicrotaskQueue([]);
    addLog("6. 执行微任务队列中的 Promise.then");
    await delay(800);

    // 7. 微任务执行完毕
    setCallStack([]);
    addLog("7. 微任务执行完毕");
    await delay(800);

    // 8. 执行宏任务
    setCallStack(["setTimeout callback"]);
    setTaskQueue([]);
    addLog("8. 执行宏任务队列中的 setTimeout");
    await delay(800);

    // 9. 完成
    setCallStack([]);
    addLog("9. 所有任务执行完毕！");
    addLog("");
    addLog("输出顺序: Start → End → Promise → Timeout");

    setIsRunning(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: JavaScript 事件循环</h3>

      <div className="mb-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');`}
        </pre>
      </div>

      <button
        onClick={runDemo}
        disabled={isRunning}
        className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRunning ? "执行中..." : "运行代码"}
      </button>

      <div className="grid gap-4 md:grid-cols-4">
        {/* 调用栈 */}
        <div>
          <div className="mb-2 text-sm font-medium">调用栈 (Call Stack)</div>
          <div className="flex min-h-[100px] flex-col-reverse rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {callStack.map((item, i) => (
              <div
                key={i}
                className="mb-1 rounded bg-blue-500 px-2 py-1 text-xs text-white"
              >
                {item}
              </div>
            ))}
            {callStack.length === 0 && (
              <span className="text-xs text-zinc-400">空</span>
            )}
          </div>
        </div>

        {/* 微任务队列 */}
        <div>
          <div className="mb-2 text-sm font-medium">微任务队列 (Microtask)</div>
          <div className="min-h-[100px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {microtaskQueue.map((item, i) => (
              <div
                key={i}
                className="mb-1 rounded bg-purple-500 px-2 py-1 text-xs text-white"
              >
                {item}
              </div>
            ))}
            {microtaskQueue.length === 0 && (
              <span className="text-xs text-zinc-400">空</span>
            )}
          </div>
        </div>

        {/* 宏任务队列 */}
        <div>
          <div className="mb-2 text-sm font-medium">宏任务队列 (Macrotask)</div>
          <div className="min-h-[100px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {taskQueue.map((item, i) => (
              <div
                key={i}
                className="mb-1 rounded bg-amber-500 px-2 py-1 text-xs text-white"
              >
                {item}
              </div>
            ))}
            {taskQueue.length === 0 && (
              <span className="text-xs text-zinc-400">空</span>
            )}
          </div>
        </div>

        {/* 执行日志 */}
        <div>
          <div className="mb-2 text-sm font-medium">执行日志</div>
          <div className="max-h-[200px] min-h-[100px] overflow-y-auto rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {logs.map((log, i) => (
              <div key={i} className="text-xs">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>事件循环执行顺序:</strong>
        <ol className="mt-2 list-inside list-decimal">
          <li>执行同步代码（调用栈）</li>
          <li>执行所有微任务（Promise.then, queueMicrotask）</li>
          <li>执行一个宏任务（setTimeout, setInterval）</li>
          <li>重复 2-3 步骤</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 循环队列
// ============================================

function CircularQueueDemo() {
  const [size] = useState(5);
  const [queue, setQueue] = useState<(number | null)[]>(Array(5).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const enqueue = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setMessage("请输入有效数字");
      return;
    }

    // 检查是否已满
    if ((rear + 1) % size === front) {
      setMessage("队列已满！");
      return;
    }

    const newQueue = [...queue];
    if (front === -1) {
      setFront(0);
    }
    const newRear = (rear + 1) % size;
    newQueue[newRear] = num;
    setRear(newRear);
    setQueue(newQueue);
    setInputValue("");
    setMessage(`入队: ${num}，rear = ${newRear}`);
  };

  const dequeue = () => {
    if (front === -1) {
      setMessage("队列为空！");
      return;
    }

    const removed = queue[front];
    const newQueue = [...queue];
    newQueue[front] = null;

    if (front === rear) {
      // 队列变空
      setFront(-1);
      setRear(-1);
    } else {
      setFront((front + 1) % size);
    }
    setQueue(newQueue);
    setMessage(`出队: ${removed}`);
  };

  const reset = () => {
    setQueue(Array(size).fill(null));
    setFront(-1);
    setRear(-1);
    setMessage("");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 循环队列</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        循环队列通过取模运算复用数组空间，避免了普通队列出队后空间浪费的问题。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入数字"
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          onKeyDown={(e) => e.key === "Enter" && enqueue()}
        />
        <button
          onClick={enqueue}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          入队
        </button>
        <button
          onClick={dequeue}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          出队
        </button>
        <button
          onClick={reset}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          重置
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-md bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          {message}
        </div>
      )}

      {/* 循环队列可视化 */}
      <div className="flex justify-center">
        <div className="relative h-48 w-48">
          {queue.map((item, index) => {
            const angle = (index * 360) / size - 90;
            const radian = (angle * Math.PI) / 180;
            const x = 80 + 60 * Math.cos(radian);
            const y = 80 + 60 * Math.sin(radian);

            let bgColor = "bg-zinc-300 dark:bg-zinc-600";
            if (item !== null) {
              if (index === front && index === rear) {
                bgColor = "bg-purple-500"; // 同时是队首和队尾
              } else if (index === front) {
                bgColor = "bg-green-500"; // 队首
              } else if (index === rear) {
                bgColor = "bg-blue-500"; // 队尾
              } else {
                bgColor = "bg-zinc-500";
              }
            }

            return (
              <div
                key={index}
                className={`absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-sm text-white ${bgColor}`}
                style={{ left: x, top: y }}
              >
                {item !== null ? item : "-"}
                <span className="absolute -bottom-5 text-xs text-zinc-500">
                  [{index}]
                </span>
              </div>
            );
          })}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xs text-zinc-500">front: {front}</div>
            <div className="text-xs text-zinc-500">rear: {rear}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-green-500"></span> 队首
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-blue-500"></span> 队尾
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-purple-500"></span> 队首=队尾
        </span>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <pre className="text-xs overflow-x-auto">
{`class CircularQueue {
  constructor(k) {
    this.size = k;
    this.queue = new Array(k);
    this.front = -1;
    this.rear = -1;
  }

  enqueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.front = 0;
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = value;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return false;
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.size;
    }
    return true;
  }
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function QueueExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">队列 (Queue) 数据结构</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          队列是一种先进先出(FIFO - First In First Out)的数据结构，只能在队尾添加元素，在队首删除元素。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 队列的核心操作</p>
          <pre className="text-green-400">
{`class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void   // 入队（队尾添加）
  dequeue(): T | undefined // 出队（队首移除）
  front(): T | undefined   // 查看队首
  isEmpty(): boolean       // 是否为空
  size(): number           // 队列大小
}`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">前端常见应用场景:</h4>
          <ul className="mt-2 list-inside list-disc text-sm text-blue-700 dark:text-blue-300">
            <li>JavaScript 事件循环（宏任务队列、微任务队列）</li>
            <li>异步任务调度</li>
            <li>消息队列</li>
            <li>广度优先搜索 (BFS)</li>
            <li>打印任务队列</li>
            <li>请求限流队列</li>
          </ul>
        </div>
      </div>

      <QueueVisualization />
      <TaskQueueDemo />
      <EventLoopDemo />
      <CircularQueueDemo />
    </div>
  );
}
