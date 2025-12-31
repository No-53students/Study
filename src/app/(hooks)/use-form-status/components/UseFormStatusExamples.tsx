"use client";

import { useFormStatus } from "react-dom";
import { useState, useRef } from "react";

// ============================================
// 示例 1: 基本提交按钮
// ============================================

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full rounded-md px-4 py-2 text-white transition-colors ${
        pending
          ? "cursor-not-allowed bg-zinc-400"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {pending ? (
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
  );
}

export function BasicExample() {
  const [result, setResult] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    // 模拟网络请求
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const name = formData.get("name") as string;
    setResult(`你好，${name}！表单已提交成功。`);
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本提交按钮</h3>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">姓名</label>
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
            placeholder="请输入姓名"
          />
        </div>
        <SubmitButton />
      </form>

      {result && (
        <div className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          ✅ {result}
        </div>
      )}

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> SubmitButton 组件使用 useFormStatus
        获取父级表单的提交状态，无需通过 props 传递。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 禁用所有输入
// ============================================

function FormInput({
  name,
  label,
  type = "text",
  ...props
}: {
  name: string;
  label: string;
  type?: string;
  [key: string]: unknown;
}) {
  const { pending } = useFormStatus();

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        disabled={pending}
        className={`w-full rounded-md border px-3 py-2 text-sm transition-colors ${
          pending
            ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800"
            : "border-zinc-300 focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
        }`}
        {...props}
      />
    </div>
  );
}

function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full rounded-md px-4 py-2 text-white transition-colors ${
        pending
          ? "cursor-not-allowed bg-zinc-400"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {pending ? "注册中..." : children}
    </button>
  );
}

export function DisabledInputsExample() {
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setSuccess(true);
    formRef.current?.reset();
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 禁用所有输入</h3>

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <FormInput name="username" label="用户名" placeholder="请输入用户名" />
        <FormInput
          name="email"
          label="邮箱"
          type="email"
          placeholder="请输入邮箱"
        />
        <FormInput
          name="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
        />
        <FormSubmitButton>注册账号</FormSubmitButton>
      </form>

      {success && (
        <div className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          ✅ 注册成功！
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">特点：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>每个输入框组件独立获取 pending 状态</li>
          <li>提交时所有输入框自动禁用</li>
          <li>无需通过 props 传递状态</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 显示提交数据预览
// ============================================

function SubmitPreview() {
  const { pending, data } = useFormStatus();

  if (!pending || !data) return null;

  return (
    <div className="rounded-md bg-blue-100 p-3 text-sm dark:bg-blue-900/30">
      <p className="mb-2 font-medium text-blue-800 dark:text-blue-200">
        正在提交以下数据：
      </p>
      <ul className="list-inside list-disc text-blue-700 dark:text-blue-300">
        {Array.from(data.entries()).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value) || "(空)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-md px-4 py-2 text-white ${
        pending ? "bg-zinc-400" : "bg-purple-600 hover:bg-purple-700"
      }`}
    >
      {pending ? "发送中..." : "发送留言"}
    </button>
  );
}

export function SubmitDataExample() {
  const [messages, setMessages] = useState<
    Array<{ name: string; message: string }>
  >([]);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    setMessages((prev) => [...prev, { name, message }]);
    formRef.current?.reset();
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 显示提交数据</h3>

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">姓名</label>
          <input
            name="name"
            required
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">留言内容</label>
          <textarea
            name="message"
            required
            rows={3}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <SubmitPreview />
        <SubmitBtn />
      </form>

      {messages.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">已发送的留言：</p>
          {messages.map((msg, i) => (
            <div
              key={i}
              className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
            >
              <p className="font-medium">{msg.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// 示例 4: 加载遮罩
// ============================================

function LoadingOverlay() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm z-10">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="h-12 w-12 rounded-full border-2 border-blue-200 dark:border-blue-900" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          正在处理...
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          请稍候
        </p>
      </div>
    </div>
  );
}

function SimpleSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-zinc-400"
    >
      提交订单
    </button>
  );
}

export function LoadingOverlayExample() {
  const [orderPlaced, setOrderPlaced] = useState(false);

  async function handleSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  }

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 加载遮罩</h3>

      <form action={handleSubmit} className="relative space-y-4">
        <LoadingOverlay />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">商品名称</label>
            <input
              defaultValue="React 19 实战教程"
              readOnly
              className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">价格</label>
            <input
              defaultValue="¥99.00"
              readOnly
              className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">收货地址</label>
          <input
            name="address"
            placeholder="请输入收货地址"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <SimpleSubmit />
      </form>

      {orderPlaced && (
        <div className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          ✅ 订单已提交！感谢您的购买。
        </div>
      )}
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseFormStatusExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useFormStatus Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useFormStatus 用于获取父级表单的提交状态，必须在 form 的子组件中使用。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
          <strong>⚠️ 重要：</strong> useFormStatus 必须在 &lt;form&gt;
          的子组件中使用，不能在 form 所在的同一组件中使用。
        </div>
      </div>

      <BasicExample />
      <DisabledInputsExample />
      <SubmitDataExample />
      <LoadingOverlayExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          返回值说明
        </h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <th className="py-2 text-left">属性</th>
                <th className="py-2 text-left">类型</th>
                <th className="py-2 text-left">说明</th>
              </tr>
            </thead>
            <tbody className="text-blue-700 dark:text-blue-300">
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2 font-mono">pending</td>
                <td>boolean</td>
                <td>表单是否正在提交</td>
              </tr>
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2 font-mono">data</td>
                <td>FormData | null</td>
                <td>提交的表单数据</td>
              </tr>
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2 font-mono">method</td>
                <td>string</td>
                <td>HTTP 方法（get/post）</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">action</td>
                <td>function</td>
                <td>表单的 action 函数</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
