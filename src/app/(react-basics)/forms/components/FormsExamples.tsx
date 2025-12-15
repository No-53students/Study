"use client";

import { useState, useRef } from "react";

// ============================================
// 示例 1: 受控组件
// ============================================

export function ControlledExample() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 受控组件</h3>

      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="输入文字..."
          className="w-full rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-600 dark:bg-zinc-800"
        />
        <p className="mt-2 text-sm text-zinc-500">
          字符数: {charCount} | 值: {text || "(空)"}
        </p>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const [text, setText] = useState("");

<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>受控组件：</strong> React state 是唯一数据源，每次输入都更新 state。
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

  const handleSubmit = () => {
    if (inputRef.current) {
      setDisplayValue(inputRef.current.value);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 非受控组件</h3>

      <div className="mb-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          defaultValue="初始值"
          placeholder="输入文字..."
          className="flex-1 rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          获取值
        </button>
      </div>

      {displayValue && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          获取到的值: {displayValue}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const inputRef = useRef<HTMLInputElement>(null);

const handleSubmit = () => {
  console.log(inputRef.current?.value);
};

<input ref={inputRef} defaultValue="初始值" />`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>非受控组件：</strong> 使用 ref 直接访问 DOM，用 defaultValue 设置初始值。
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
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 多字段表单</h3>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">用户名</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">邮箱</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">密码</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">记住我</span>
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          提交
        </button>
      </form>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">当前表单数据:</p>
        <pre className="mt-2 text-xs text-zinc-500">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 各类表单元素
// ============================================

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
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 各类表单元素</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        {/* 文本输入 */}
        <div>
          <label className="mb-1 block text-sm font-medium">文本输入</label>
          <input
            type="text"
            value={form.text}
            onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        {/* 选择框 */}
        <div>
          <label className="mb-1 block text-sm font-medium">选择框</label>
          <select
            value={form.select}
            onChange={(e) => setForm((f) => ({ ...f, select: e.target.value }))}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
          </select>
        </div>

        {/* 文本域 */}
        <div>
          <label className="mb-1 block text-sm font-medium">文本域</label>
          <textarea
            value={form.textarea}
            onChange={(e) => setForm((f) => ({ ...f, textarea: e.target.value }))}
            rows={3}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        {/* 单选按钮 */}
        <div>
          <label className="mb-1 block text-sm font-medium">单选按钮</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.radio === "male"}
                onChange={(e) => setForm((f) => ({ ...f, radio: e.target.value }))}
              />
              <span className="text-sm">男</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.radio === "female"}
                onChange={(e) => setForm((f) => ({ ...f, radio: e.target.value }))}
              />
              <span className="text-sm">女</span>
            </label>
          </div>
        </div>

        {/* 多选框 */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            多选框 (按住 Ctrl/Cmd 多选)
          </label>
          <select
            multiple
            value={form.multiSelect}
            onChange={handleMultiSelect}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          >
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="py">Python</option>
            <option value="go">Go</option>
          </select>
        </div>
      </div>

      <div className="rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <pre className="text-xs text-zinc-500">{JSON.stringify(form, null, 2)}</pre>
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

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 表单验证</h3>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">邮箱</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={`w-full rounded-md border px-3 py-2 ${
              touched.email && errors.email
                ? "border-red-500"
                : "border-zinc-300 dark:border-zinc-600"
            } dark:bg-zinc-800`}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            className={`w-full rounded-md border px-3 py-2 ${
              touched.password && errors.password
                ? "border-red-500"
                : "border-zinc-300 dark:border-zinc-600"
            } dark:bg-zinc-800`}
          />
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          提交
        </button>
      </form>

      {submitted && (
        <div className="rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          ✅ 表单验证通过！
        </div>
      )}
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
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 6: 异步提交</h3>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">邮箱</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              提交中...
            </span>
          ) : (
            "提交"
          )}
        </button>
      </form>

      {result && (
        <div
          className={`rounded-md p-3 text-sm ${
            result.success
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {result.success ? "✅" : "❌"} {result.message}
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
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
