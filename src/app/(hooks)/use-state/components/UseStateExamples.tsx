"use client";

import { useState } from "react";

// ============================================
// 示例 1: 基本计数器
// ============================================

export function BasicCounterExample() {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleChange = (newCount: number) => {
    setAnimate(true);
    setCount(newCount);
    setTimeout(() => setAnimate(false), 200);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本计数器</h3>

      <div className="mb-4 text-center">
        <span className={`text-4xl font-bold inline-block transition-transform duration-200 ${animate ? 'scale-125 text-blue-500' : 'scale-100'}`}>
          {count}
        </span>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => handleChange(count - 1)}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          -1
        </button>
        <button
          onClick={() => handleChange(0)}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          重置
        </button>
        <button
          onClick={() => handleChange(count + 1)}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          +1
        </button>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <code>const [count, setCount] = useState(0);</code>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 函数式更新
// ============================================

export function FunctionalUpdateExample() {
  const [count, setCount] = useState(0);

  // ❌ 错误方式：连续调用可能不会按预期工作
  const incrementThreeTimesWrong = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // 只会增加 1，因为 count 在这三行都是同一个值
  };

  // ✅ 正确方式：使用函数式更新
  const incrementThreeTimesCorrect = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    // 会增加 3
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 函数式更新</h3>

      <div className="mb-4 text-center">
        <span className="text-4xl font-bold">{count}</span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          onClick={() => setCount(0)}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          重置
        </button>
        <button
          onClick={incrementThreeTimesWrong}
          className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
        >
          ❌ 错误方式 +3
        </button>
        <button
          onClick={incrementThreeTimesCorrect}
          className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
        >
          ✅ 正确方式 +3
        </button>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <p>
          <strong>说明：</strong>
        </p>
        <ul className="mt-1 list-inside list-disc">
          <li>错误方式只增加 1（因为闭包中的 count 是同一个值）</li>
          <li>正确方式增加 3（函数式更新获取最新值）</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 对象状态
// ============================================

interface User {
  name: string;
  email: string;
  age: number;
}

export function ObjectStateExample() {
  const [user, setUser] = useState<User>({
    name: "张三",
    email: "zhangsan@example.com",
    age: 25,
  });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 对象状态</h3>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium">姓名</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">邮箱</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">年龄</label>
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">当前状态：</p>
        <pre className="mt-2 text-xs">{JSON.stringify(user, null, 2)}</pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>关键点：</strong> 更新对象时必须使用展开运算符{" "}
        <code>...user</code> 保留其他字段
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 数组状态
// ============================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function ArrayStateExample() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "学习 useState", completed: true },
    { id: 2, text: "理解状态更新", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
      setDeletingId(null);
    }, 300);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 数组状态</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="添加新待办..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTodo}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          添加
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className={`flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800 transition-all duration-300 ${
              deletingId === todo.id
                ? 'opacity-0 translate-x-4 scale-95'
                : 'opacity-100 translate-x-0 scale-100'
            }`}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInSlide 0.3s ease-out forwards'
            }}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 rounded cursor-pointer transition-transform duration-200 hover:scale-110"
              />
              <span
                className={`transition-all duration-300 ${
                  todo.completed ? "text-zinc-400 line-through" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 hover:scale-110"
            >
              删除
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">数组操作方法：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>
            添加：<code>[...todos, newItem]</code>
          </li>
          <li>
            删除：<code>todos.filter(t =&gt; t.id !== id)</code>
          </li>
          <li>
            更新：<code>todos.map(t =&gt; t.id === id ? newItem : t)</code>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 惰性初始化
// ============================================

export function LazyInitializationExample() {
  // 模拟复杂计算
  const [value, setValue] = useState(() => {
    console.log("惰性初始化：只在首次渲染时执行");
    // 模拟从 localStorage 读取或复杂计算
    return Math.floor(Math.random() * 100);
  });

  const [renderCount, setRenderCount] = useState(0);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 惰性初始化</h3>

      <div className="mb-4 space-y-2">
        <p className="text-sm">
          初始随机值：<span className="font-bold">{value}</span>
        </p>
        <p className="text-sm">
          重渲染次数：<span className="font-bold">{renderCount}</span>
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRenderCount((c) => c + 1)}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          触发重渲染
        </button>
        <button
          onClick={() => setValue(Math.floor(Math.random() * 100))}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          更新值
        </button>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <p>
          <strong>说明：</strong> 打开控制台，点击"触发重渲染"按钮，
          你会发现"惰性初始化"只在首次渲染时打印一次。
        </p>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <pre className="text-xs">
{`// ❌ 每次渲染都执行
useState(expensiveComputation())

// ✅ 只在首次渲染执行
useState(() => expensiveComputation())`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseStateExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useState Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useState 是 React 最基础的 Hook，用于在函数组件中添加状态。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const [state, setState] = useState(initialValue);

// 更新状态
setState(newValue);

// 函数式更新（基于旧值）
setState(prev => prev + 1);`}
          </pre>
        </div>
      </div>

      <BasicCounterExample />
      <FunctionalUpdateExample />
      <ObjectStateExample />
      <ArrayStateExample />
      <LazyInitializationExample />
    </div>
  );
}
