"use client";

import { useState, Fragment, memo } from "react";

// ============================================
// 示例 1: 基本列表渲染
// ============================================

const frameworks = ["React", "Vue", "Angular", "Svelte", "Solid"];

export function BasicListExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本列表渲染</h3>

      <ul className="mb-4 space-y-2">
        {frameworks.map((framework, index) => (
          <li
            key={framework}
            className="rounded-md bg-zinc-100 px-4 py-2 dark:bg-zinc-800"
          >
            {index + 1}. {framework}
          </li>
        ))}
      </ul>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`const frameworks = ["React", "Vue", "Angular"];

{frameworks.map((item, index) => (
  <li key={item}>{index + 1}. {item}</li>
))}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 对象数组渲染
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

const users: User[] = [
  { id: 1, name: "张三", email: "zhangsan@example.com", role: "admin" },
  { id: 2, name: "李四", email: "lisi@example.com", role: "user" },
  { id: 3, name: "王五", email: "wangwu@example.com", role: "guest" },
];

function UserCard({ user }: { user: User }) {
  const roleColors = {
    admin: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
    user: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
    guest: "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700 transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600 hover:-translate-y-0.5">
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-zinc-500">{user.email}</p>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-xs ${roleColors[user.role]} transition-transform duration-200 hover:scale-105`}>
        {user.role}
      </span>
    </div>
  );
}

export function ObjectListExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 对象数组渲染</h3>

      <div className="mb-4 space-y-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`interface User {
  id: number;
  name: string;
  email: string;
}

{users.map(user => (
  <UserCard key={user.id} user={user} />
))}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>Key 选择：</strong> 使用数据的唯一标识符（如 id）作为 key，而不是数组索引。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 过滤和排序
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "MacBook Pro", price: 12999, category: "电脑" },
  { id: 2, name: "iPhone 15", price: 6999, category: "手机" },
  { id: 3, name: "iPad Air", price: 4799, category: "平板" },
  { id: 4, name: "AirPods Pro", price: 1899, category: "配件" },
  { id: 5, name: "iMac", price: 10999, category: "电脑" },
  { id: 6, name: "Apple Watch", price: 2999, category: "配件" },
];

export function FilterSortExample() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSorted = products
    .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name) * modifier;
      }
      return (a.price - b.price) * modifier;
    });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 过滤和排序</h3>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="搜索产品..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "price")}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">按名称</option>
          <option value="price">按价格</option>
        </select>
        <button
          onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
          className="rounded-md bg-zinc-600 px-3 py-2 text-sm text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {sortOrder === "asc" ? "↑ 升序" : "↓ 降序"}
        </button>
      </div>

      <div className="mb-4 space-y-2">
        {filteredAndSorted.length === 0 ? (
          <p className="py-4 text-center text-zinc-500">没有找到匹配的产品</p>
        ) : (
          filteredAndSorted.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-md bg-zinc-100 px-4 py-2 dark:bg-zinc-800 transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:translate-x-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div>
                <span className="font-medium">{product.name}</span>
                <span className="ml-2 text-xs text-zinc-500">{product.category}</span>
              </div>
              <span className="text-green-600 font-medium">¥{product.price}</span>
            </div>
          ))
        )}
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`const result = products
  .filter(p => p.name.includes(filter))
  .sort((a, b) => a.price - b.price);

{result.map(item => <Item key={item.id} />)}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 分组列表
// ============================================

interface Task {
  id: number;
  title: string;
  status: "todo" | "doing" | "done";
}

const tasks: Task[] = [
  { id: 1, title: "学习 React 基础", status: "done" },
  { id: 2, title: "练习 Hooks", status: "doing" },
  { id: 3, title: "构建项目", status: "todo" },
  { id: 4, title: "学习 TypeScript", status: "done" },
  { id: 5, title: "写单元测试", status: "todo" },
  { id: 6, title: "代码审查", status: "doing" },
];

const statusConfig = {
  todo: { label: "待办", color: "bg-zinc-500", icon: "⏳" },
  doing: { label: "进行中", color: "bg-blue-500", icon: "🔄" },
  done: { label: "已完成", color: "bg-green-500", icon: "✅" },
};

export function GroupedListExample() {
  const grouped = tasks.reduce(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    { todo: [], doing: [], done: [] } as Record<Task["status"], Task[]>
  );

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 分组列表</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        {(Object.keys(grouped) as Task["status"][]).map((status) => (
          <div key={status} className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${statusConfig[status].color}`}
              />
              <span className="font-medium">{statusConfig[status].label}</span>
              <span className="text-sm text-zinc-500">({grouped[status].length})</span>
            </div>
            <div className="space-y-2">
              {grouped[status].map((task) => (
                <div
                  key={task.id}
                  className="rounded bg-white px-3 py-2 text-sm dark:bg-zinc-700"
                >
                  {statusConfig[status].icon} {task.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`const grouped = tasks.reduce((acc, task) => {
  acc[task.status].push(task);
  return acc;
}, { todo: [], doing: [], done: [] });

{Object.entries(grouped).map(([status, items]) => (
  <section key={status}>
    <h2>{status}</h2>
    {items.map(item => <Item key={item.id} />)}
  </section>
))}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: Key 的重要性
// ============================================

interface Todo {
  id: number;
  text: string;
}

let nextId = 4;

export function KeyImportanceExample() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "学习 React" },
    { id: 2, text: "写代码" },
    { id: 3, text: "休息一下" },
  ]);
  const [useIndexKey, setUseIndexKey] = useState(false);
  const [animateAdd, setAnimateAdd] = useState(false);

  const addToStart = () => {
    setAnimateAdd(true);
    setTodos([{ id: nextId++, text: `新任务 ${nextId - 1}` }, ...todos]);
    setTimeout(() => setAnimateAdd(false), 300);
  };

  const shuffle = () => {
    setTodos([...todos].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: Key 的重要性</h3>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={addToStart}
          className="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          添加到开头
        </button>
        <button
          onClick={shuffle}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          随机排序
        </button>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={useIndexKey}
            onChange={(e) => setUseIndexKey(e.target.checked)}
            className="rounded transition-transform duration-200 hover:scale-110"
          />
          使用 index 作为 key
        </label>
      </div>

      <div className="mb-4 space-y-2">
        {todos.map((todo, index) => (
          <div
            key={useIndexKey ? index : todo.id}
            className={`flex items-center gap-3 rounded-md bg-zinc-100 px-4 py-2 dark:bg-zinc-800 transition-all duration-300 ${
              animateAdd && index === 0 ? 'animate-pulse bg-green-100 dark:bg-green-900/30' : ''
            }`}
          >
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              key={useIndexKey ? index : todo.id}
            </span>
            <input
              type="text"
              defaultValue={todo.text}
              className="flex-1 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>实验：</strong>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>在输入框中修改文字</li>
          <li>点击"添加到开头"或"随机排序"</li>
          <li>对比使用 id 和 index 作为 key 的区别</li>
        </ol>
        <p className="mt-2">
          使用 index 时，输入框的内容会错位，因为 React 认为是相同的元素！
        </p>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: Fragment 与多元素渲染
// ============================================

interface Term {
  id: number;
  term: string;
  definition: string;
}

const glossary: Term[] = [
  { id: 1, term: "JSX", definition: "JavaScript XML，React 的语法扩展" },
  { id: 2, term: "Props", definition: "组件的输入参数" },
  { id: 3, term: "State", definition: "组件的内部状态" },
];

export function FragmentExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: Fragment 与多元素</h3>

      <dl className="mb-4 space-y-2">
        {glossary.map((item) => (
          <Fragment key={item.id}>
            <dt className="font-semibold text-blue-600 dark:text-blue-400">
              {item.term}
            </dt>
            <dd className="mb-3 ml-4 text-sm text-zinc-600 dark:text-zinc-400">
              {item.definition}
            </dd>
          </Fragment>
        ))}
      </dl>

      <div className="rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
        <pre className="text-green-600 dark:text-green-400">
{`import { Fragment } from 'react';

{glossary.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))}`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>注意：</strong>
        当需要返回多个元素但不想添加额外 DOM 节点时，使用 Fragment。
        简写 &lt;&gt;&lt;/&gt; 不能添加 key，必须用完整的 Fragment。
      </div>
    </div>
  );
}

// ============================================
// 示例 7: 动态列表操作
// ============================================

interface Item {
  id: number;
  text: string;
}

let itemId = 3;

export function DynamicListExample() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: "项目 1" },
    { id: 2, text: "项目 2" },
  ]);
  const [newText, setNewText] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [movingIndex, setMovingIndex] = useState<number | null>(null);

  const addItem = () => {
    if (!newText.trim()) return;
    setItems([...items, { id: ++itemId, text: newText }]);
    setNewText("");
  };

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setItems(items.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setMovingIndex(index);
    setTimeout(() => {
      const newItems = [...items];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setItems(newItems);
      setMovingIndex(null);
    }, 150);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 7: 动态列表操作</h3>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="输入新项目..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          onClick={addItem}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          添加
        </button>
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-zinc-500">列表为空，添加一些项目吧！</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 dark:bg-zinc-800 transition-all duration-300 ${
                removingId === item.id
                  ? 'opacity-0 translate-x-4 scale-95'
                  : movingIndex === index
                  ? '-translate-y-2 scale-105 shadow-lg z-10 relative'
                  : 'opacity-100 translate-x-0 scale-100'
              }`}
            >
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-30 transition-all duration-200 hover:scale-125 active:scale-95"
              >
                ↑
              </button>
              <span className="flex-1">{item.text}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">id: {item.id}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-125 active:scale-95"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>操作说明：</strong> 添加、删除、上移项目。注意观察 id 保持不变。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ListRenderingExamples() {
  return (
    <div className="space-y-6">
      <BasicListExample />
      <ObjectListExample />
      <FilterSortExample />
      <GroupedListExample />
      <KeyImportanceExample />
      <FragmentExample />
      <DynamicListExample />
    </div>
  );
}
