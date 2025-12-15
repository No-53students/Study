"use client";

import { useState } from "react";

// ============================================
// 栈的实现
// ============================================

class Stack<T> {
  private items: T[] = [];

  // 入栈
  push(item: T): void {
    this.items.push(item);
  }

  // 出栈
  pop(): T | undefined {
    return this.items.pop();
  }

  // 查看栈顶元素
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // 判断是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取栈大小
  size(): number {
    return this.items.length;
  }

  // 清空栈
  clear(): void {
    this.items = [];
  }

  // 获取所有元素（用于可视化）
  toArray(): T[] {
    return [...this.items];
  }
}

// ============================================
// 示例 1: 栈的基本操作可视化
// ============================================

function StackVisualization() {
  const [stack, setStack] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const push = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setMessage("请输入有效数字");
      return;
    }
    setStack([...stack, num]);
    setInputValue("");
    setMessage(`入栈: ${num}`);
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage("栈为空，无法出栈");
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`出栈: ${popped}`);
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage("栈为空");
      return;
    }
    setMessage(`栈顶元素: ${stack[stack.length - 1]}`);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 栈的基本操作</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入数字"
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          onKeyDown={(e) => e.key === "Enter" && push()}
        />
        <button
          onClick={push}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Push 入栈
        </button>
        <button
          onClick={pop}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Pop 出栈
        </button>
        <button
          onClick={peek}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Peek 查看
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-md bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          {message}
        </div>
      )}

      {/* 栈的可视化 */}
      <div className="flex flex-col items-center">
        <div className="mb-2 text-sm text-zinc-500">← 栈顶 (Top)</div>
        <div className="flex min-h-[200px] w-32 flex-col-reverse items-center justify-start rounded-b-lg border-2 border-t-0 border-zinc-400 bg-zinc-50 p-2 dark:border-zinc-600 dark:bg-zinc-900">
          {stack.length === 0 ? (
            <div className="text-sm text-zinc-400">空栈</div>
          ) : (
            stack.map((item, index) => (
              <div
                key={index}
                className={`mb-1 w-full rounded px-4 py-2 text-center font-mono text-white transition-all ${
                  index === stack.length - 1
                    ? "bg-green-500"
                    : "bg-zinc-500"
                }`}
              >
                {item}
              </div>
            ))
          )}
        </div>
        <div className="mt-2 text-sm text-zinc-500">栈底 (Bottom) →</div>
      </div>

      <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>栈大小: {stack.length}</p>
        <p>是否为空: {stack.length === 0 ? "是" : "否"}</p>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 括号匹配
// ============================================

function BracketMatching() {
  const [input, setInput] = useState("({[]})");
  const [result, setResult] = useState<{ valid: boolean; steps: string[] } | null>(null);

  const checkBrackets = () => {
    const stack: string[] = [];
    const steps: string[] = [];
    const pairs: Record<string, string> = {
      ")": "(",
      "]": "[",
      "}": "{",
    };

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if ("([{".includes(char)) {
        stack.push(char);
        steps.push(`遇到 '${char}'，入栈。栈: [${stack.join(", ")}]`);
      } else if (")]}".includes(char)) {
        if (stack.length === 0) {
          steps.push(`遇到 '${char}'，栈为空，匹配失败！`);
          setResult({ valid: false, steps });
          return;
        }
        const top = stack.pop();
        if (top !== pairs[char]) {
          steps.push(`遇到 '${char}'，栈顶 '${top}' 不匹配，失败！`);
          setResult({ valid: false, steps });
          return;
        }
        steps.push(`遇到 '${char}'，与栈顶 '${top}' 匹配，出栈。栈: [${stack.join(", ")}]`);
      }
    }

    if (stack.length === 0) {
      steps.push("遍历完成，栈为空，括号匹配成功！");
      setResult({ valid: true, steps });
    } else {
      steps.push(`遍历完成，栈不为空 [${stack.join(", ")}]，匹配失败！`);
      setResult({ valid: false, steps });
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 括号匹配（经典算法题）</h3>

      <div className="mb-4">
        <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
          判断字符串中的括号是否有效匹配。支持 ()、[]、{}
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入括号字符串"
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          <button
            onClick={checkBrackets}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            检查匹配
          </button>
        </div>
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        {["()", "({[]})", "([)]", "((())", "{[]}", ""].map((example) => (
          <button
            key={example}
            onClick={() => setInput(example)}
            className="rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700"
          >
            {example || '""'}
          </button>
        ))}
      </div>

      {result && (
        <div className={`rounded-md p-4 ${result.valid ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"}`}>
          <div className={`mb-2 font-semibold ${result.valid ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
            {result.valid ? "✓ 匹配成功" : "✗ 匹配失败"}
          </div>
          <div className="space-y-1 text-sm">
            {result.steps.map((step, index) => (
              <div key={index} className="font-mono text-xs">
                {index + 1}. {step}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <pre className="text-xs overflow-x-auto">
{`function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (')]}'.includes(char)) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 浏览器历史记录
// ============================================

function BrowserHistory() {
  const [backStack, setBackStack] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState("首页");
  const [newPage, setNewPage] = useState("");

  const visit = (page: string) => {
    if (!page.trim()) return;
    setBackStack([...backStack, currentPage]);
    setCurrentPage(page);
    setForwardStack([]); // 访问新页面时清空前进栈
    setNewPage("");
  };

  const goBack = () => {
    if (backStack.length === 0) return;
    const newBackStack = [...backStack];
    const prevPage = newBackStack.pop()!;
    setBackStack(newBackStack);
    setForwardStack([...forwardStack, currentPage]);
    setCurrentPage(prevPage);
  };

  const goForward = () => {
    if (forwardStack.length === 0) return;
    const newForwardStack = [...forwardStack];
    const nextPage = newForwardStack.pop()!;
    setForwardStack(newForwardStack);
    setBackStack([...backStack, currentPage]);
    setCurrentPage(nextPage);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 浏览器历史记录</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        浏览器的前进/后退功能就是用两个栈实现的！
      </p>

      <div className="mb-4 flex gap-2">
        <button
          onClick={goBack}
          disabled={backStack.length === 0}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          ← 后退
        </button>
        <button
          onClick={goForward}
          disabled={forwardStack.length === 0}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          前进 →
        </button>
      </div>

      <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">当前页面:</div>
        <div className="text-xl font-bold text-blue-700 dark:text-blue-300">
          {currentPage}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newPage}
          onChange={(e) => setNewPage(e.target.value)}
          placeholder="输入页面名称"
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          onKeyDown={(e) => e.key === "Enter" && visit(newPage)}
        />
        <button
          onClick={() => visit(newPage)}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          访问
        </button>
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        {["关于我们", "产品介绍", "联系方式", "帮助中心"].map((page) => (
          <button
            key={page}
            onClick={() => visit(page)}
            className="rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700"
          >
            {page}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2 text-sm font-medium">后退栈 (Back Stack):</div>
          <div className="min-h-[100px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {backStack.length === 0 ? (
              <span className="text-xs text-zinc-400">空</span>
            ) : (
              backStack.map((page, i) => (
                <div key={i} className="mb-1 rounded bg-zinc-300 px-2 py-1 text-xs dark:bg-zinc-600">
                  {page}
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">前进栈 (Forward Stack):</div>
          <div className="min-h-[100px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {forwardStack.length === 0 ? (
              <span className="text-xs text-zinc-400">空</span>
            ) : (
              forwardStack.map((page, i) => (
                <div key={i} className="mb-1 rounded bg-zinc-300 px-2 py-1 text-xs dark:bg-zinc-600">
                  {page}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 函数调用栈
// ============================================

function CallStackDemo() {
  const [callStack, setCallStack] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDemo = async () => {
    setIsRunning(true);
    setCallStack([]);
    setOutput([]);

    const stack: string[] = [];
    const logs: string[] = [];

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // 模拟函数调用
    const updateUI = (newStack: string[], newLog?: string) => {
      setCallStack([...newStack]);
      if (newLog) {
        logs.push(newLog);
        setOutput([...logs]);
      }
    };

    // main 函数入栈
    stack.push("main()");
    updateUI(stack, "→ 调用 main()");
    await delay(800);

    // foo 函数入栈
    stack.push("foo()");
    updateUI(stack, "→ main 调用 foo()");
    await delay(800);

    // bar 函数入栈
    stack.push("bar()");
    updateUI(stack, "→ foo 调用 bar()");
    await delay(800);

    // console.log 入栈
    stack.push("console.log()");
    updateUI(stack, "→ bar 调用 console.log('Hello')");
    await delay(800);

    // console.log 出栈
    stack.pop();
    updateUI(stack, "← console.log 执行完毕，出栈");
    await delay(800);

    // bar 出栈
    stack.pop();
    updateUI(stack, "← bar 执行完毕，出栈");
    await delay(800);

    // foo 出栈
    stack.pop();
    updateUI(stack, "← foo 执行完毕，出栈");
    await delay(800);

    // main 出栈
    stack.pop();
    updateUI(stack, "← main 执行完毕，出栈");
    await delay(500);

    logs.push("✓ 程序执行完毕，调用栈清空");
    setOutput([...logs]);
    setIsRunning(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 函数调用栈可视化</h3>

      <div className="mb-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function bar() {
  console.log('Hello');
}
function foo() {
  bar();
}
function main() {
  foo();
}
main();`}
        </pre>
      </div>

      <button
        onClick={runDemo}
        disabled={isRunning}
        className="mb-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRunning ? "执行中..." : "运行代码"}
      </button>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2 text-sm font-medium">调用栈 (Call Stack):</div>
          <div className="flex min-h-[200px] flex-col-reverse rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {callStack.length === 0 ? (
              <span className="text-xs text-zinc-400">空</span>
            ) : (
              callStack.map((func, i) => (
                <div
                  key={i}
                  className={`mb-1 rounded px-3 py-2 text-sm font-mono text-white ${
                    i === callStack.length - 1 ? "bg-green-500" : "bg-zinc-500"
                  }`}
                >
                  {func}
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">执行日志:</div>
          <div className="min-h-[200px] rounded bg-zinc-100 p-2 dark:bg-zinc-800">
            {output.map((log, i) => (
              <div key={i} className="mb-1 text-xs font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>重要概念：</strong> JavaScript 是单线程语言，函数调用通过调用栈管理。
        栈溢出(Stack Overflow)就是因为递归太深导致调用栈超出限制。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function StackExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">栈 (Stack) 数据结构</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          栈是一种后进先出(LIFO - Last In First Out)的数据结构，只能在一端进行插入和删除操作。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 栈的核心操作</p>
          <pre className="text-green-400">
{`class Stack<T> {
  private items: T[] = [];

  push(item: T): void    // 入栈
  pop(): T | undefined   // 出栈
  peek(): T | undefined  // 查看栈顶
  isEmpty(): boolean     // 是否为空
  size(): number         // 栈大小
}`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">前端常见应用场景:</h4>
          <ul className="mt-2 list-inside list-disc text-sm text-blue-700 dark:text-blue-300">
            <li>浏览器前进/后退历史</li>
            <li>撤销/重做功能 (Ctrl+Z / Ctrl+Y)</li>
            <li>函数调用栈</li>
            <li>括号匹配验证</li>
            <li>表达式求值</li>
            <li>深度优先搜索 (DFS)</li>
          </ul>
        </div>
      </div>

      <StackVisualization />
      <BracketMatching />
      <BrowserHistory />
      <CallStackDemo />
    </div>
  );
}
