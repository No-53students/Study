"use client";

import { useState, useRef } from "react";

// 通用输入框样式
const inputBaseClass = "w-full rounded-xl border px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800/50";
const inputNormalClass = `${inputBaseClass} border-zinc-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 hover:border-zinc-300 dark:hover:border-zinc-600`;
const inputErrorClass = `${inputBaseClass} border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10`;

// 通用按钮样式
const buttonPrimaryClass = "w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-2.5 text-white font-medium shadow-md shadow-blue-500/20 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md";

// 通用卡片样式
const cardClass = "rounded-2xl border border-zinc-200 dark:border-zinc-700/80 p-6 bg-white dark:bg-zinc-800/30 shadow-sm hover:shadow-md transition-shadow duration-300";

// ============================================
// 示例 1: 受控组件
// ============================================

export function ControlledExample() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm shadow-md">
          1
        </div>
        <h3 className="text-lg font-bold">受控组件</h3>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="输入文字..."
            className={inputNormalClass}
          />
          {/* 字符计数指示器 */}
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium transition-all duration-200 ${isFocused ? 'text-blue-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
            {charCount}
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          当前值: <span className="font-medium text-zinc-700 dark:text-zinc-300">{text || "(空)"}</span>
        </p>
      </div>

      <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 text-sm overflow-x-auto">
        <pre className="text-green-600 dark:text-green-400">
{`const [text, setText] = useState("");

<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>`}
        </pre>
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 text-sm border border-blue-100 dark:border-blue-800/50">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <strong className="text-blue-700 dark:text-blue-300">受控组件</strong>
            <p className="text-blue-600 dark:text-blue-400 mt-0.5">React state 是唯一数据源，每次输入都更新 state。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 非受控组件
// ============================================

export function UncontrolledExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (inputRef.current) {
      setDisplayValue(inputRef.current.value);
      setShowResult(true);
      setTimeout(() => setShowResult(false), 3000);
    }
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm shadow-md">
          2
        </div>
        <h3 className="text-lg font-bold">非受控组件</h3>
      </div>

      <div className="mb-4 flex gap-3">
        <input
          ref={inputRef}
          type="text"
          defaultValue="初始值"
          placeholder="输入文字..."
          className={`flex-1 ${inputNormalClass}`}
        />
        <button
          onClick={handleSubmit}
          className="shrink-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-2.5 text-white font-medium shadow-md shadow-violet-500/20 hover:from-violet-600 hover:to-purple-700 hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98] transition-all duration-200"
        >
          获取值
        </button>
      </div>

      {/* 结果提示 - 带动画 */}
      <div className={`mb-4 overflow-hidden transition-all duration-300 ${showResult ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 border border-emerald-100 dark:border-emerald-800/50">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span className="text-sm text-emerald-700 dark:text-emerald-300">
              获取到的值: <strong>{displayValue}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 text-sm overflow-x-auto">
        <pre className="text-green-600 dark:text-green-400">
{`const inputRef = useRef<HTMLInputElement>(null);

const handleSubmit = () => {
  console.log(inputRef.current?.value);
};

<input ref={inputRef} defaultValue="初始值" />`}
        </pre>
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 text-sm border border-amber-100 dark:border-amber-800/50">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <div>
            <strong className="text-amber-700 dark:text-amber-300">非受控组件</strong>
            <p className="text-amber-600 dark:text-amber-400 mt-0.5">使用 ref 直接访问 DOM，用 defaultValue 设置初始值。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 多字段表单
// ============================================

interface FormData {
  username: string;
  email: string;
  password: string;
  remember: boolean;
}

export function MultiFieldExample() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm shadow-md">
          3
        </div>
        <h3 className="text-lg font-bold">多字段表单</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            用户名
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              className={`${inputNormalClass} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            邮箱
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
              className={`${inputNormalClass} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            密码
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              className={`${inputNormalClass} pl-10 pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 group-hover:border-zinc-400 dark:group-hover:border-zinc-500">
              <svg className={`w-full h-full text-white p-0.5 transition-opacity duration-200 ${formData.remember ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">记住我</span>
        </label>

        <button type="submit" className={buttonPrimaryClass}>
          提交表单
        </button>
      </form>

      <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-4 text-sm border border-zinc-200 dark:border-zinc-700">
        <p className="font-medium text-zinc-700 dark:text-zinc-300 mb-2">当前表单数据:</p>
        <pre className="text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 各类表单元素
// ============================================

// 通用选择框样式
const selectClass = "w-full rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 hover:border-zinc-300 dark:hover:border-zinc-600 dark:bg-zinc-800/50 appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10";

// 通用文本域样式
const textareaClass = "w-full rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 hover:border-zinc-300 dark:hover:border-zinc-600 dark:bg-zinc-800/50 resize-none";

export function FormElementsExample() {
  const [form, setForm] = useState({
    text: "",
    textarea: "",
    select: "react",
    radio: "male",
    multiSelect: [] as string[],
  });

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((prev) => ({ ...prev, multiSelect: values }));
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm shadow-md">
          4
        </div>
        <h3 className="text-lg font-bold">各类表单元素</h3>
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        {/* 文本输入 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>
              </svg>
              文本输入
            </span>
          </label>
          <input
            type="text"
            value={form.text}
            onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            placeholder="请输入文本..."
            className={inputNormalClass}
          />
        </div>

        {/* 选择框 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
              </svg>
              选择框
            </span>
          </label>
          <select
            value={form.select}
            onChange={(e) => setForm((f) => ({ ...f, select: e.target.value }))}
            className={selectClass}
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
          </select>
        </div>

        {/* 文本域 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
              </svg>
              文本域
            </span>
          </label>
          <textarea
            value={form.textarea}
            onChange={(e) => setForm((f) => ({ ...f, textarea: e.target.value }))}
            rows={3}
            placeholder="请输入多行文本..."
            className={textareaClass}
          />
        </div>

        {/* 单选按钮 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"/>
              </svg>
              单选按钮
            </span>
          </label>
          <div className="flex gap-3 mt-2">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.radio === "male"}
                  onChange={(e) => setForm((f) => ({ ...f, radio: e.target.value }))}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-blue-500 transition-all duration-200 group-hover:border-zinc-400 dark:group-hover:border-zinc-500">
                  <div className={`w-full h-full rounded-full scale-0 peer-checked:scale-100 bg-blue-500 transition-transform duration-200 ${form.radio === "male" ? "scale-[0.5]" : ""}`} style={{ transform: form.radio === "male" ? "scale(0.5)" : "scale(0)" }}></div>
                </div>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">男</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.radio === "female"}
                  onChange={(e) => setForm((f) => ({ ...f, radio: e.target.value }))}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-pink-500 transition-all duration-200 group-hover:border-zinc-400 dark:group-hover:border-zinc-500">
                  <div className={`w-full h-full rounded-full bg-pink-500 transition-transform duration-200`} style={{ transform: form.radio === "female" ? "scale(0.5)" : "scale(0)" }}></div>
                </div>
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">女</span>
            </label>
          </div>
        </div>

        {/* 多选框 - 使用标签按钮风格 */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              多选框 (点击选择)
            </span>
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { value: "js", label: "JavaScript", icon: "🟨" },
              { value: "ts", label: "TypeScript", icon: "🔷" },
              { value: "py", label: "Python", icon: "🐍" },
              { value: "go", label: "Go", icon: "🔵" },
            ].map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => {
                  setForm((f) => ({
                    ...f,
                    multiSelect: f.multiSelect.includes(lang.value)
                      ? f.multiSelect.filter((v) => v !== lang.value)
                      : [...f.multiSelect, lang.value],
                  }));
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  form.multiSelect.includes(lang.value)
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                <span>{lang.icon}</span>
                {lang.label}
                {form.multiSelect.includes(lang.value) && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-4 text-sm border border-zinc-200 dark:border-zinc-700">
        <p className="font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
          </svg>
          当前表单数据:
        </p>
        <pre className="text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 表单验证
// ============================================

interface ValidationErrors {
  email?: string;
  password?: string;
}

export function ValidationExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!email) {
      newErrors.email = "邮箱不能为空";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "邮箱格式不正确";
    }

    if (!password) {
      newErrors.password = "密码不能为空";
    } else if (password.length < 6) {
      newErrors.password = "密码至少 6 位";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched((t) => ({ ...t, [field]: true }));
    validate();
  };

  const getInputClass = (field: "email" | "password") => {
    const hasError = touched[field] && errors[field];
    return hasError ? inputErrorClass : inputNormalClass;
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 text-white text-sm shadow-md">
          5
        </div>
        <h3 className="text-lg font-bold">表单验证</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            邮箱
          </label>
          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="请输入邮箱"
              className={`${getInputClass("email")} pr-10`}
            />
            {/* 验证状态图标 */}
            {touched.email && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${errors.email ? 'text-red-500' : 'text-emerald-500'}`}>
                {errors.email ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </span>
            )}
          </div>
          {/* 错误提示 - 带动画 */}
          <div className={`overflow-hidden transition-all duration-200 ${touched.email && errors.email ? 'max-h-8 opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-red-500 flex items-center gap-1">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              {errors.email}
            </p>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            密码
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="请输入密码（至少6位）"
              className={`${getInputClass("password")} pr-10`}
            />
            {touched.password && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-200 ${errors.password ? 'text-red-500' : 'text-emerald-500'}`}>
                {errors.password ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </span>
            )}
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${touched.password && errors.password ? 'max-h-8 opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-red-500 flex items-center gap-1">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              {errors.password}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 py-2.5 text-white font-medium shadow-md shadow-rose-500/20 hover:from-rose-600 hover:to-pink-700 hover:shadow-lg hover:shadow-rose-500/30 active:scale-[0.98] transition-all duration-200"
        >
          验证并提交
        </button>
      </form>

      {/* 成功提示 - 带动画 */}
      <div className={`overflow-hidden transition-all duration-300 ${submitted ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 border border-emerald-100 dark:border-emerald-800/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              表单验证通过！
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 示例 6: 异步提交
// ============================================

export function AsyncSubmitExample() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      // 模拟 API 请求
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 模拟成功/失败
      if (Math.random() > 0.3) {
        setResult({ success: true, message: "提交成功！" });
        setEmail("");
      } else {
        setResult({ success: false, message: "提交失败，请重试" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-sm shadow-md">
          6
        </div>
        <h3 className="text-lg font-bold">异步提交</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            邮箱
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              placeholder="请输入邮箱"
              className={`${inputNormalClass} pl-10 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-white font-medium shadow-md shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:active:scale-100 relative overflow-hidden"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>提交中...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <span>发送</span>
            </span>
          )}
        </button>
      </form>

      {/* 结果提示 - 带动画 */}
      <div className={`overflow-hidden transition-all duration-300 ${result ? 'max-h-24 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <div
          className={`rounded-xl p-4 flex items-center gap-3 ${
            result?.success
              ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-100 dark:border-emerald-800/50"
              : "bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-100 dark:border-red-800/50"
          }`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
            result?.success ? "bg-emerald-500" : "bg-red-500"
          } text-white shrink-0`}>
            {result?.success ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            )}
          </div>
          <div>
            <p className={`font-medium ${
              result?.success
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-red-700 dark:text-red-300"
            }`}>
              {result?.success ? "操作成功" : "操作失败"}
            </p>
            <p className={`text-sm ${
              result?.success
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}>
              {result?.message}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 text-sm overflow-x-auto">
        <pre className="text-green-600 dark:text-green-400">
{`const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};`}
        </pre>
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 text-sm border border-cyan-100 dark:border-cyan-800/50">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <div>
            <strong className="text-cyan-700 dark:text-cyan-300">异步提交提示</strong>
            <p className="text-cyan-600 dark:text-cyan-400 mt-0.5">使用 loading 状态防止重复提交，try/finally 确保状态恢复。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function FormsExamples() {
  return (
    <div className="space-y-6">
      <ControlledExample />
      <UncontrolledExample />
      <MultiFieldExample />
      <FormElementsExample />
      <ValidationExample />
      <AsyncSubmitExample />
    </div>
  );
}
