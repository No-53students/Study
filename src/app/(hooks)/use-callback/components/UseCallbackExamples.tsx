"use client";
"use no memo"; // 禁用 React Compiler 优化，以便观察 useCallback 的效果

/**
 * useCallback Hook 使用示例
 *
 * useCallback 是 React 的性能优化 Hook，用于缓存函数引用
 * 主要解决：当组件重新渲染时，避免不必要的函数重新创建
 *
 * 本文件已禁用 React Compiler (use no memo)，以便清楚地观察 useCallback 的作用
 */

import { useState, useCallback, memo, useEffect } from "react";

// ============================================
// 示例 1: 基础用法对比
// ============================================

/**
 * 子组件 - 没有使用 useCallback 的版本
 * 使用 memo 包裹，理论上只有 props 改变时才会重新渲染
 */
const ChildWithoutCallback = memo(function ChildWithoutCallback({
  onClick,
  onRender,
}: {
  onClick: () => void;
  onRender: () => void;
}) {
  useEffect(() => {
    onRender();
  }, [onRender]); // 只在 onRender 变化时执行

  return (
    <div className="rounded-md border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
      <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">
        ❌ 没有 useCallback
      </p>
      <button
        onClick={onClick}
        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        点击我
      </button>
    </div>
  );
});

/**
 * 子组件 - 使用 useCallback 的版本
 */
const ChildWithCallback = memo(function ChildWithCallback({
  onClick,
  onRender,
}: {
  onClick: () => void;
  onRender: () => void;
}) {
  useEffect(() => {
    onRender();
  }, [onRender]); // 只在 onRender 变化时执行

  return (
    <div className="rounded-md border-2 border-green-300 bg-green-50 p-4 dark:border-green-700 dark:bg-green-900/20">
      <p className="mb-2 text-sm font-medium text-green-600 dark:text-green-400">
        ✅ 使用 useCallback
      </p>
      <button
        onClick={onClick}
        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
      >
        点击我
      </button>
    </div>
  );
});

/**
 * 基础对比示例
 */
export function BasicComparisonExample() {
  const [parentRenderCount, setParentRenderCount] = useState(0);
  const [renderCountWithout, setRenderCountWithout] = useState(0);
  const [renderCountWith, setRenderCountWith] = useState(0);

  // ❌ 普通函数：每次父组件渲染都会创建【新的函数】
  // 新函数 !== 旧函数，所以 memo 认为 props 变了，子组件会重新渲染
  const handleClickWithout = () => {
    console.log("点击了按钮");
  };

  // ✅ useCallback：只在依赖项变化时才创建新函数
  // 依赖项是 []，所以永远返回【同一个函数】
  // 同一个函数 === 同一个函数，memo 认为 props 没变，子组件不会重新渲染
  const handleClickWith = useCallback(() => {
    console.log("点击了按钮");
  }, []);

  // 用 useCallback 包裹 onRender，避免它本身导致重新渲染
  const handleRenderWithout = useCallback(() => {
    setRenderCountWithout((c) => c + 1);
  }, []);

  const handleRenderWith = useCallback(() => {
    setRenderCountWith((c) => c + 1);
  }, []);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基础用法对比</h3>

      {/* 原理说明 */}
      <div className="mb-4 rounded-md bg-blue-50 p-4 text-sm dark:bg-blue-900/20">
        <p className="font-medium text-blue-800 dark:text-blue-200">核心原理：</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-blue-700 dark:text-blue-300">
          <li>父组件每次渲染，普通函数都会<strong>重新创建</strong>（新地址）</li>
          <li>memo 子组件发现 onClick prop 变了（地址不同），就会重新渲染</li>
          <li>useCallback 可以<strong>缓存函数</strong>，保持地址不变</li>
        </ul>
      </div>

      {/* 父组件状态 */}
      <div className="mb-4 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          父组件渲染次数: <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{parentRenderCount + 1}</span>
        </p>
        <button
          onClick={() => setParentRenderCount((c) => c + 1)}
          className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          让父组件重新渲染
        </button>
      </div>

      {/* 两个子组件对比 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-center text-2xl font-bold text-red-600">{renderCountWithout}</p>
          <ChildWithoutCallback onClick={handleClickWithout} onRender={handleRenderWithout} />
        </div>
        <div>
          <p className="mb-2 text-center text-2xl font-bold text-green-600">{renderCountWith}</p>
          <ChildWithCallback onClick={handleClickWith} onRender={handleRenderWith} />
        </div>
      </div>

      {/* 结果说明 */}
      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>观察结果：</strong> 点击&ldquo;让父组件重新渲染&rdquo;按钮后：
        <ul className="mt-1 list-inside list-disc">
          <li>左边红色数字会增加（每次都重新渲染）</li>
          <li>右边绿色数字保持为 1（只渲染一次）</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 依赖项的使用
// ============================================

/**
 * 搜索结果子组件
 */
const SearchButton = memo(function SearchButton({
  onSearch,
  label,
}: {
  onSearch: () => void;
  label: string;
}) {
  console.log(`SearchButton "${label}" 重新渲染了`);

  return (
    <button
      onClick={onSearch}
      className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
    >
      {label}
    </button>
  );
});

/**
 * 依赖项示例
 * 展示如何正确使用依赖项
 */
export function DependenciesExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  // ✅ 正确：依赖项包含 searchTerm
  // 当 searchTerm 改变时，函数会重新创建
  const handleSearch = useCallback(() => {
    console.log(`搜索: ${searchTerm}`);
    alert(`正在搜索: "${searchTerm}"`);
  }, [searchTerm]); // 依赖 searchTerm

  // ✅ 正确：依赖项包含 count
  const handleSearchWithCount = useCallback(() => {
    console.log(`搜索 "${searchTerm}"，当前计数: ${count}`);
    alert(`搜索 "${searchTerm}"，计数: ${count}`);
  }, [searchTerm, count]); // 依赖 searchTerm 和 count

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 依赖项的使用</h3>

      <div className="mb-4 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium">搜索词</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="输入搜索内容..."
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">计数: {count}</span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="rounded-md bg-zinc-200 px-3 py-1 text-sm hover:bg-zinc-300 dark:bg-zinc-700"
          >
            +1
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <SearchButton onSearch={handleSearch} label="只依赖搜索词" />
        <SearchButton
          onSearch={handleSearchWithCount}
          label="依赖搜索词+计数"
        />
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">依赖项规则：</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>依赖项中包含函数内部使用的所有外部变量</li>
          <li>当依赖项变化时，函数会重新创建</li>
          <li>空数组 [] 表示函数永不重新创建</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 实际应用场景 - 列表项操作
// ============================================

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * 单个待办项组件
 */
const TodoItemComponent = memo(function TodoItemComponent({
  item,
  onToggle,
  onDelete,
}: {
  item: TodoItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  console.log(`TodoItem ${item.id} 渲染了`);

  return (
    <div className="flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="h-4 w-4 rounded"
        />
        <span
          className={item.completed ? "text-zinc-400 line-through" : undefined}
        >
          {item.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
      >
        删除
      </button>
    </div>
  );
});

/**
 * 待办列表示例
 * 展示 useCallback 在列表场景中的应用
 */
export function TodoListExample() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: "学习 React Hooks", completed: false },
    { id: 2, text: "理解 useCallback", completed: false },
    { id: 3, text: "实践性能优化", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // ✅ 使用 useCallback 缓存操作函数
  // 这样即使列表重新渲染，子组件也不会因为函数引用变化而重新渲染
  const handleToggle = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // 不依赖外部变量，使用函数式更新

  const handleDelete = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []); // 不依赖外部变量，使用函数式更新

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 待办列表</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="添加新待办..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          添加
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItemComponent
            key={todo.id}
            item={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">关键点：</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>
            handleToggle 和 handleDelete 使用 useCallback 包裹
          </li>
          <li>
            使用函数式更新 setTodos(prev =&gt; ...) 避免依赖 todos
          </li>
          <li>子组件使用 memo 包裹，配合 useCallback 发挥作用</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 何时不需要 useCallback
// ============================================

export function WhenNotToUseExample() {
  const [count, setCount] = useState(0);

  // ❌ 不必要的 useCallback
  // 这个函数只在当前组件使用，没有传递给子组件
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  // ✅ 更好的写法：直接使用普通函数
  const handleClickSimple = () => {
    setCount((c) => c + 1);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 何时不需要 useCallback</h3>

      <div className="mb-4">
        <p className="text-2xl font-bold">{count}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleClick}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          useCallback (不必要)
        </button>
        <button
          onClick={handleClickSimple}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          普通函数 (推荐)
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-md bg-red-50 p-3 text-sm dark:bg-red-900/20">
          <p className="font-medium text-red-800 dark:text-red-200">
            ❌ 不需要 useCallback 的情况：
          </p>
          <ul className="mt-2 list-inside list-disc text-red-700 dark:text-red-300">
            <li>函数没有传递给子组件</li>
            <li>子组件没有使用 memo 包裹</li>
            <li>函数作为原生 DOM 元素的事件处理器</li>
            <li>使用了 React Compiler（自动优化）</li>
          </ul>
        </div>

        <div className="rounded-md bg-green-50 p-3 text-sm dark:bg-green-900/20">
          <p className="font-medium text-green-800 dark:text-green-200">
            ✅ 需要 useCallback 的情况：
          </p>
          <ul className="mt-2 list-inside list-disc text-green-700 dark:text-green-300">
            <li>函数作为 props 传递给 memo 包裹的子组件</li>
            <li>函数作为其他 Hook 的依赖项（如 useEffect）</li>
            <li>函数被用于复杂的计算或比较</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

/**
 * useCallback 完整教程组件
 */
export default function UseCallbackExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useCallback Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useCallback 是 React 的性能优化 Hook，用于缓存函数引用，避免不必要的重新渲染。
        </p>

        {/* 语法说明 */}
        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b] // 依赖项数组
);`}
          </pre>
        </div>
      </div>

      <BasicComparisonExample />
      <DependenciesExample />
      <TodoListExample />
      <WhenNotToUseExample />

      {/* 总结 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          总结：useCallback vs React Compiler
        </h4>
        <div className="mt-3 space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <p>
            <strong>传统方式：</strong> 手动使用 useCallback 来优化性能
          </p>
          <p>
            <strong>React 19 + Compiler：</strong> 编译器自动分析并添加必要的缓存
          </p>
          <p className="mt-3 border-t border-blue-200 pt-3 dark:border-blue-800">
            💡 <strong>建议：</strong> 在使用 React Compiler 的项目中，
            优先让编译器处理优化。只在编译器无法覆盖的特殊场景下手动使用 useCallback。
          </p>
        </div>
      </div>
    </div>
  );
}
