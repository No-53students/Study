"use client";

import { forwardRef, useRef, useImperativeHandle, useState } from "react";

// ============================================
// 示例 1: 基本的 forwardRef 用法
// ============================================

interface CustomInputProps {
  label: string;
  placeholder?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function CustomInput({ label, placeholder }, ref) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <input
          ref={ref}
          placeholder={placeholder}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800"
        />
      </div>
    );
  }
);

export function BasicForwardRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基本用法</h3>

      <div className="mb-4">
        <CustomInput
          ref={inputRef}
          label="用户名"
          placeholder="请输入用户名"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleFocus}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          聚焦输入框
        </button>
        <button
          onClick={handleClear}
          className="rounded-md bg-zinc-600 px-4 py-2 text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          清空并聚焦
        </button>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const CustomInput = forwardRef<HTMLInputElement, Props>(
  function CustomInput({ label }, ref) {
    return <input ref={ref} />;
  }
);

// 父组件可以访问 input DOM
const inputRef = useRef<HTMLInputElement>(null);
<CustomInput ref={inputRef} label="用户名" />`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 结合 useImperativeHandle
// ============================================

interface AdvancedInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
  shake: () => void;
}

interface AdvancedInputProps {
  placeholder?: string;
}

const AdvancedInput = forwardRef<AdvancedInputHandle, AdvancedInputProps>(
  function AdvancedInput({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isShaking, setIsShaking] = useState(false);

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      clear() {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      getValue() {
        return inputRef.current?.value ?? "";
      },
      setValue(value: string) {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      },
      shake() {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      },
    }));

    return (
      <input
        ref={inputRef}
        placeholder={placeholder}
        className={`w-full rounded-md border border-zinc-300 px-3 py-2 transition-transform focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 ${
          isShaking ? "animate-shake" : ""
        }`}
        style={
          isShaking
            ? {
                animation: "shake 0.5s ease-in-out",
              }
            : undefined
        }
      />
    );
  }
);

export function ImperativeHandleExample() {
  const inputRef = useRef<AdvancedInputHandle>(null);
  const [output, setOutput] = useState("");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>

      <h3 className="mb-4 text-lg font-semibold">
        示例 2: useImperativeHandle 自定义方法
      </h3>

      <div className="mb-4">
        <AdvancedInput ref={inputRef} placeholder="输入一些内容..." />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => inputRef.current?.focus()}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          focus()
        </button>
        <button
          onClick={() => inputRef.current?.clear()}
          className="rounded-md bg-zinc-600 px-3 py-1.5 text-sm text-white hover:bg-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          clear()
        </button>
        <button
          onClick={() => setOutput(inputRef.current?.getValue() ?? "")}
          className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          getValue()
        </button>
        <button
          onClick={() => inputRef.current?.setValue("Hello World!")}
          className="rounded-md bg-purple-600 px-3 py-1.5 text-sm text-white hover:bg-purple-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          setValue(&quot;Hello World!&quot;)
        </button>
        <button
          onClick={() => inputRef.current?.shake()}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          shake()
        </button>
      </div>

      {output && (
        <div className="mb-4 rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            getValue() 返回：
          </span>
          <span className="ml-2 font-mono">{output}</span>
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`useImperativeHandle(ref, () => ({
  focus() { inputRef.current?.focus(); },
  clear() { inputRef.current.value = ''; },
  getValue() { return inputRef.current?.value ?? ''; },
  setValue(value) { inputRef.current.value = value; },
  shake() { /* 触发动画 */ },
}));`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 多个 ref 转发
// ============================================

interface FormFieldHandle {
  focusInput: () => void;
  focusLabel: () => void;
  getInputValue: () => string;
}

interface FormFieldProps {
  label: string;
  name: string;
}

const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  function FormField({ label, name }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    useImperativeHandle(ref, () => ({
      focusInput() {
        inputRef.current?.focus();
      },
      focusLabel() {
        labelRef.current?.scrollIntoView({ behavior: "smooth" });
      },
      getInputValue() {
        return inputRef.current?.value ?? "";
      },
    }));

    return (
      <div className="space-y-1">
        <label
          ref={labelRef}
          htmlFor={name}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
        <input
          ref={inputRef}
          id={name}
          name={name}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800"
        />
      </div>
    );
  }
);

export function MultipleRefsExample() {
  const fieldRef = useRef<FormFieldHandle>(null);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 封装多个内部 ref</h3>

      <div className="mb-4">
        <FormField ref={fieldRef} label="邮箱地址" name="email" />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => fieldRef.current?.focusInput()}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          聚焦输入框
        </button>
        <button
          onClick={() => alert(fieldRef.current?.getInputValue())}
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          获取值
        </button>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 组件内部可以有多个 ref，通过 useImperativeHandle
        统一暴露需要的方法，隐藏内部实现细节。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 组件库风格的 Button
// ============================================

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", loading, children, disabled, className = "", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && (
          <svg
            className="-ml-1 mr-2 h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

export function ComponentLibraryExample() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 组件库风格的 Button</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <div className="mb-4 flex gap-2">
        <Button ref={buttonRef} onClick={handleClick} loading={loading}>
          {loading ? "加载中..." : "点击加载"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => buttonRef.current?.focus()}
        >
          聚焦左边按钮
        </Button>
      </div>

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, size, children, ...props }, ref) {
    return (
      <button ref={ref} className={...} {...props}>
        {children}
      </button>
    );
  }
);`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: React 19 新语法（ref 作为 prop）
// ============================================

interface NewStyleInputProps {
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
}

// React 19 中可以直接将 ref 作为 prop
function NewStyleInput({ ref, placeholder }: NewStyleInputProps) {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800"
    />
  );
}

export function React19StyleExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: React 19 新语法</h3>

      <div className="mb-4">
        <NewStyleInput ref={inputRef} placeholder="React 19 style input" />
      </div>

      <button
        onClick={() => inputRef.current?.focus()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        聚焦
      </button>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`// React 19+ 不再需要 forwardRef
function NewStyleInput({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}

// 使用方式相同
<NewStyleInput ref={inputRef} />`}
        </pre>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>注意：</strong> React 19 中 ref 可以作为普通 prop 传递，
        但 forwardRef 仍然被支持以保持向后兼容性。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function ForwardRefExamples() {
  return (
    <div className="space-y-6">
      <BasicForwardRefExample />
      <ImperativeHandleExample />
      <MultipleRefsExample />
      <ComponentLibraryExample />
      <React19StyleExample />
    </div>
  );
}
