"use client";

import { useRef, useState, forwardRef, useImperativeHandle } from "react";

// ============================================
// 示例 1: 基础用法 - 自定义输入框
// ============================================

interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

const CustomInput = forwardRef<CustomInputHandle, { placeholder?: string }>(
  function CustomInput({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      getValue: () => {
        return inputRef.current?.value ?? "";
      },
      setValue: (value: string) => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      },
    }));

    return (
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
      />
    );
  }
);

export function BasicExample() {
  const inputRef = useRef<CustomInputHandle>(null);
  const [lastValue, setLastValue] = useState("");

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 基础用法</h3>

      <div className="mb-4">
        <CustomInput ref={inputRef} placeholder="输入一些文字..." />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => inputRef.current?.focus()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          聚焦
        </button>
        <button
          onClick={() => inputRef.current?.clear()}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          清空
        </button>
        <button
          onClick={() => inputRef.current?.setValue("Hello World!")}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          设置值
        </button>
        <button
          onClick={() => setLastValue(inputRef.current?.getValue() ?? "")}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          获取值
        </button>
      </div>

      {lastValue && (
        <div className="rounded-md bg-purple-100 p-3 text-sm text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
          获取到的值: <strong>{lastValue}</strong>
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">暴露的方法：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li><code>focus()</code> - 聚焦输入框</li>
          <li><code>clear()</code> - 清空内容</li>
          <li><code>getValue()</code> - 获取当前值</li>
          <li><code>setValue(value)</code> - 设置值</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 表单验证
// ============================================

interface ValidatedInputHandle {
  focus: () => void;
  validate: () => boolean;
  getValue: () => string;
  reset: () => void;
}

interface ValidatedInputProps {
  label: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
}

const ValidatedInput = forwardRef<ValidatedInputHandle, ValidatedInputProps>(
  function ValidatedInput(
    { label, type = "text", required, minLength, pattern, patternMessage },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },

      validate: () => {
        const value = inputRef.current?.value ?? "";

        if (required && !value.trim()) {
          setError(`${label}不能为空`);
          return false;
        }

        if (minLength && value.length < minLength) {
          setError(`${label}至少需要 ${minLength} 个字符`);
          return false;
        }

        if (pattern && !pattern.test(value)) {
          setError(patternMessage ?? `${label}格式不正确`);
          return false;
        }

        setError(null);
        return true;
      },

      getValue: () => inputRef.current?.value ?? "",

      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setError(null);
      },
    }));

    return (
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium">{label}</label>
        <input
          ref={inputRef}
          type={type}
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-zinc-300 focus:border-blue-500 dark:border-zinc-600"
          } dark:bg-zinc-800`}
          onChange={() => error && setError(null)}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export function FormValidationExample() {
  const usernameRef = useRef<ValidatedInputHandle>(null);
  const emailRef = useRef<ValidatedInputHandle>(null);
  const passwordRef = useRef<ValidatedInputHandle>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const isUsernameValid = usernameRef.current?.validate() ?? false;
    const isEmailValid = emailRef.current?.validate() ?? false;
    const isPasswordValid = passwordRef.current?.validate() ?? false;

    if (isUsernameValid && isEmailValid && isPasswordValid) {
      setSubmitted(true);
      alert(
        `提交成功！\n用户名: ${usernameRef.current?.getValue()}\n邮箱: ${emailRef.current?.getValue()}`
      );
    }
  };

  const handleReset = () => {
    usernameRef.current?.reset();
    emailRef.current?.reset();
    passwordRef.current?.reset();
    setSubmitted(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 表单验证</h3>

      <ValidatedInput
        ref={usernameRef}
        label="用户名"
        required
        minLength={3}
      />

      <ValidatedInput
        ref={emailRef}
        label="邮箱"
        type="email"
        required
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
        patternMessage="请输入有效的邮箱地址"
      />

      <ValidatedInput
        ref={passwordRef}
        label="密码"
        type="password"
        required
        minLength={6}
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          提交
        </button>
        <button
          onClick={handleReset}
          className="rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          重置
        </button>
      </div>

      {submitted && (
        <div className="mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
          表单验证通过！
        </div>
      )}

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>说明：</strong> 父组件通过 ref 调用子组件的 validate() 方法进行验证
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 模态框控制
// ============================================

interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { title, children, onClose },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => {
      setIsOpen(false);
      onClose?.();
    },
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-800">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

export function ModalExample() {
  const modalRef = useRef<ModalHandle>(null);
  const confirmModalRef = useRef<ModalHandle>(null);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 模态框控制</h3>

      <div className="flex gap-2">
        <button
          onClick={() => modalRef.current?.open()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          打开信息框
        </button>
        <button
          onClick={() => confirmModalRef.current?.open()}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          打开确认框
        </button>
      </div>

      <Modal ref={modalRef} title="信息" onClose={() => console.log("信息框关闭")}>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          这是一个通过 useImperativeHandle 控制的模态框。
        </p>
        <button
          onClick={() => modalRef.current?.close()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          确定
        </button>
      </Modal>

      <Modal
        ref={confirmModalRef}
        title="确认删除"
        onClose={() => console.log("确认框关闭")}
      >
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          确定要删除这条记录吗？此操作不可撤销。
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              alert("已删除！");
              confirmModalRef.current?.close();
            }}
            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            删除
          </button>
          <button
            onClick={() => confirmModalRef.current?.close()}
            className="flex-1 rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
          >
            取消
          </button>
        </div>
      </Modal>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">优势：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>父组件不需要管理 isOpen 状态</li>
          <li>通过 ref 命令式控制打开/关闭</li>
          <li>可以有多个独立的模态框实例</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 视频播放器控制
// ============================================

interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, { src: string }>(
  function VideoPlayer({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useImperativeHandle(ref, () => ({
      play: () => {
        videoRef.current?.play();
      },
      pause: () => {
        videoRef.current?.pause();
      },
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime ?? 0,
      getDuration: () => videoRef.current?.duration ?? 0,
    }));

    return (
      <div>
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-md bg-black"
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        />
        <div className="mt-2 flex items-center justify-between text-sm text-zinc-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    );
  }
);

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function VideoPlayerExample() {
  const playerRef = useRef<VideoPlayerHandle>(null);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 视频播放器</h3>

      <VideoPlayer
        ref={playerRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => playerRef.current?.play()}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          播放
        </button>
        <button
          onClick={() => playerRef.current?.pause()}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          暂停
        </button>
        <button
          onClick={() => playerRef.current?.seek(0)}
          className="rounded-md bg-zinc-600 px-4 py-2 text-sm text-white hover:bg-zinc-700"
        >
          回到开头
        </button>
        <button
          onClick={() => {
            const current = playerRef.current?.getCurrentTime() ?? 0;
            playerRef.current?.seek(current + 2);
          }}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          快进 2秒
        </button>
        <button
          onClick={() => {
            const time = playerRef.current?.getCurrentTime() ?? 0;
            const duration = playerRef.current?.getDuration() ?? 0;
            alert(`当前: ${formatTime(time)} / 总时长: ${formatTime(duration)}`);
          }}
          className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          获取时间
        </button>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseImperativeHandleExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useImperativeHandle Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useImperativeHandle 用于自定义暴露给父组件的实例值，配合 forwardRef 使用。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { /* ... */ }
  }));

  return <input ref={inputRef} {...props} />;
});`}
          </pre>
        </div>
      </div>

      <BasicExample />
      <FormValidationExample />
      <ModalExample />
      <VideoPlayerExample />

      {/* 对比说明 */}
      <div className="rounded-lg bg-amber-50 p-6 dark:bg-amber-900/20">
        <h4 className="font-semibold text-amber-800 dark:text-amber-200">
          何时使用 useImperativeHandle？
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">✅ 适合使用</p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>需要暴露命令式 API</li>
              <li>隐藏内部实现细节</li>
              <li>复杂组件（视频、音频、画布）</li>
              <li>表单验证组件</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">❌ 不推荐使用</p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>可以用 props 传递的场景</li>
              <li>简单的 DOM 操作</li>
              <li>状态可以提升到父组件时</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
