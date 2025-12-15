"use client";

import { useReducer, useState } from "react";

// ============================================
// 示例 1: 基本计数器对比
// ============================================

// Reducer 定义
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; value: number }
  | { type: "RESET" };

interface CounterState {
  count: number;
}

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SET":
      return { count: action.value };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

export function CounterComparisonExample() {
  // useState 版本
  const [count1, setCount1] = useState(0);

  // useReducer 版本
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: useState vs useReducer</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* useState 版本 */}
        <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
            useState 版本
          </p>
          <p className="mb-4 text-center text-3xl font-bold">{count1}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCount1((c) => c - 1)}
              className="flex-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              -1
            </button>
            <button
              onClick={() => setCount1(0)}
              className="flex-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              重置
            </button>
            <button
              onClick={() => setCount1((c) => c + 1)}
              className="flex-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              +1
            </button>
          </div>
        </div>

        {/* useReducer 版本 */}
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="mb-2 text-sm font-medium text-green-800 dark:text-green-200">
            useReducer 版本
          </p>
          <p className="mb-4 text-center text-3xl font-bold">{state.count}</p>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: "DECREMENT" })}
              className="flex-1 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
            >
              -1
            </button>
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="flex-1 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
            >
              重置
            </button>
            <button
              onClick={() => dispatch({ type: "INCREMENT" })}
              className="flex-1 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: Todo 列表
// ============================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number }
  | { type: "SET_FILTER"; filter: "all" | "active" | "completed" }
  | { type: "CLEAR_COMPLETED" };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
}

const initialTodoState: TodoState = {
  todos: [
    { id: 1, text: "学习 useReducer", completed: true },
    { id: 2, text: "理解 action 和 reducer", completed: false },
    { id: 3, text: "实践复杂状态管理", completed: false },
  ],
  filter: "all",
};

export function TodoListExample() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [newTodo, setNewTodo] = useState("");

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    dispatch({ type: "ADD_TODO", text: newTodo });
    setNewTodo("");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: Todo 列表</h3>

      {/* 添加 Todo */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="添加新任务..."
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={handleAddTodo}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          添加
        </button>
      </div>

      {/* 过滤器 */}
      <div className="mb-4 flex gap-2">
        {(["all", "active", "completed"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch({ type: "SET_FILTER", filter })}
            className={`rounded-md px-3 py-1 text-sm ${
              state.filter === filter
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            {filter === "all" ? "全部" : filter === "active" ? "未完成" : "已完成"}
          </button>
        ))}
        <button
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
          className="ml-auto rounded-md bg-red-100 px-3 py-1 text-sm text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
        >
          清除已完成
        </button>
      </div>

      {/* Todo 列表 */}
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
                className="h-4 w-4 rounded"
              />
              <span
                className={
                  todo.completed ? "text-zinc-400 line-through" : undefined
                }
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
              className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              删除
            </button>
          </div>
        ))}
      </div>

      {/* 统计 */}
      <div className="mt-4 text-sm text-zinc-500">
        {state.todos.filter((t) => !t.completed).length} 项未完成
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 表单状态管理
// ============================================

interface FormState {
  values: {
    username: string;
    email: string;
    password: string;
  };
  errors: {
    username?: string;
    email?: string;
    password?: string;
  };
  isSubmitting: boolean;
  isSubmitted: boolean;
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState["values"]; value: string }
  | { type: "SET_ERROR"; field: keyof FormState["errors"]; error: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "RESET" };

const initialFormState: FormState = {
  values: { username: "", email: "", password: "" },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "CLEAR_ERRORS":
      return { ...state, errors: {} };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, errors: {} };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false, isSubmitted: true };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

export function FormExample() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const validate = (): boolean => {
    let isValid = true;

    if (!state.values.username) {
      dispatch({ type: "SET_ERROR", field: "username", error: "用户名不能为空" });
      isValid = false;
    }

    if (!state.values.email.includes("@")) {
      dispatch({ type: "SET_ERROR", field: "email", error: "请输入有效的邮箱" });
      isValid = false;
    }

    if (state.values.password.length < 6) {
      dispatch({ type: "SET_ERROR", field: "password", error: "密码至少6位" });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch({ type: "SUBMIT_START" });

    // 模拟 API 请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    dispatch({ type: "SUBMIT_SUCCESS" });
  };

  if (state.isSubmitted) {
    return (
      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-4 text-lg font-semibold">示例 3: 表单状态管理</h3>
        <div className="rounded-md bg-green-50 p-4 text-center dark:bg-green-900/20">
          <p className="text-green-800 dark:text-green-200">提交成功！</p>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="mt-2 rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            重新填写
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 表单状态管理</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">用户名</label>
          <input
            type="text"
            value={state.values.username}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })
            }
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          {state.errors.username && (
            <p className="mt-1 text-sm text-red-600">{state.errors.username}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">邮箱</label>
          <input
            type="email"
            value={state.values.email}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
            }
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          {state.errors.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">密码</label>
          <input
            type="password"
            value={state.values.password}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
            }
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          {state.errors.password && (
            <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={state.isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {state.isSubmitting ? "提交中..." : "提交"}
        </button>
      </form>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">当前状态：</p>
        <pre className="mt-2 text-xs overflow-auto">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 惰性初始化
// ============================================

function initCounter(initialValue: number) {
  console.log("惰性初始化执行");
  return {
    count: initialValue,
    history: [initialValue],
  };
}

interface HistoryCounterState {
  count: number;
  history: number[];
}

type HistoryCounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET"; initialValue: number };

function historyCounterReducer(
  state: HistoryCounterState,
  action: HistoryCounterAction
): HistoryCounterState {
  switch (action.type) {
    case "INCREMENT":
      const newCount1 = state.count + 1;
      return { count: newCount1, history: [...state.history, newCount1] };
    case "DECREMENT":
      const newCount2 = state.count - 1;
      return { count: newCount2, history: [...state.history, newCount2] };
    case "RESET":
      return initCounter(action.initialValue);
    default:
      return state;
  }
}

export function LazyInitExample() {
  const initialValue = 10;
  const [state, dispatch] = useReducer(
    historyCounterReducer,
    initialValue,
    initCounter // 第三个参数：惰性初始化函数
  );

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 惰性初始化</h3>

      <div className="mb-4 text-center">
        <span className="text-4xl font-bold">{state.count}</span>
      </div>

      <div className="mb-4 flex justify-center gap-2">
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          -1
        </button>
        <button
          onClick={() => dispatch({ type: "RESET", initialValue })}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          重置
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          +1
        </button>
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">历史记录：</p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          {state.history.join(" → ")}
        </p>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>说明：</strong> 打开控制台，"惰性初始化执行"只会打印一次（首次渲染），
        点击重置时会再次打印。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseReducerExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useReducer Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useReducer 用于管理复杂状态逻辑，通过 reducer 函数集中处理状态更新。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// 触发更新
dispatch({ type: 'INCREMENT' });`}
          </pre>
        </div>
      </div>

      <CounterComparisonExample />
      <TodoListExample />
      <FormExample />
      <LazyInitExample />
    </div>
  );
}
