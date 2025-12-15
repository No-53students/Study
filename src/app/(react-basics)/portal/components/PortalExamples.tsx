"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from "react";

// ============================================
// 示例 1: 基本的 Portal - 模态框
// ============================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="modal-title" className="text-lg font-semibold">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 模态框</h3>

      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        打开模态框
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="欢迎">
        <p className="mb-4 text-zinc-600 dark:text-zinc-300">
          这是一个使用 Portal 渲染的模态框。它被渲染到 document.body，
          但事件仍然会冒泡到 React 父组件。
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-zinc-200 px-4 py-2 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            取消
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            确定
          </button>
        </div>
      </Modal>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      {children}
    </div>,
    document.body
  );
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 工具提示（Tooltip）
// ============================================

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

function Tooltip({ children, content }: TooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setShow(true);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
        className="cursor-help border-b border-dashed border-zinc-400"
      >
        {children}
      </span>

      {mounted &&
        show &&
        createPortal(
          <div
            className="fixed z-50 max-w-xs rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white shadow-lg"
            style={{
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
            }}
          >
            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-zinc-800" />
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

export function TooltipExample() {
  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 工具提示</h3>

      <div className="mb-4 overflow-hidden rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
        <p>
          这是一段包含{" "}
          <Tooltip content="Portal 让 Tooltip 不会被父元素的 overflow: hidden 裁剪">
            工具提示
          </Tooltip>{" "}
          的文本。鼠标悬停在带下划线的文字上查看效果。这个容器设置了{" "}
          <Tooltip content="overflow: hidden 会裁剪超出边界的内容，但 Portal 可以绕过这个限制">
            overflow: hidden
          </Tooltip>
          ，但 Tooltip 仍然能正确显示。
        </p>
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>优势：</strong> 使用 Portal 渲染到 body，
        工具提示不会被父元素的 overflow: hidden 裁剪。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 通知系统
// ============================================

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

function NotificationContainer({
  notifications,
  onRemove,
}: {
  notifications: Notification[];
  onRemove: (id: number) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          <span>
            {notification.type === "success" && "✓"}
            {notification.type === "error" && "✕"}
            {notification.type === "info" && "ℹ"}
          </span>
          <span>{notification.message}</span>
          <button
            onClick={() => onRemove(notification.id)}
            className="ml-2 opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

export function NotificationExample() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const idRef = useRef(0);

  const addNotification = (type: Notification["type"]) => {
    const id = ++idRef.current;
    const messages = {
      success: "操作成功！",
      error: "操作失败！",
      info: "这是一条通知",
    };

    setNotifications((prev) => [...prev, { id, message: messages[type], type }]);

    // 3秒后自动移除
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 通知系统</h3>

      <div className="flex gap-2">
        <button
          onClick={() => addNotification("success")}
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          成功通知
        </button>
        <button
          onClick={() => addNotification("error")}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          错误通知
        </button>
        <button
          onClick={() => addNotification("info")}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          信息通知
        </button>
      </div>

      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400">
{`createPortal(
  <div className="fixed top-4 right-4">
    {notifications.map(n => (
      <Notification key={n.id} {...n} />
    ))}
  </div>,
  document.body
)`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 事件冒泡演示
// ============================================

export function EventBubblingExample() {
  const [clicks, setClicks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addClick = (source: string) => {
    setClicks((prev) => [...prev.slice(-4), source]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 事件冒泡</h3>

      <div
        className="mb-4 rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30"
        onClick={() => addClick("父组件 (React 树)")}
      >
        <p className="mb-2 text-sm text-blue-800 dark:text-blue-200">
          点击这个蓝色区域（父组件）
        </p>

        {mounted &&
          createPortal(
            <div className="my-2 rounded-lg bg-green-100 p-4 dark:bg-green-900/30">
              <p className="mb-2 text-sm text-green-800 dark:text-green-200">
                这是 Portal 内容（渲染在 body 中）
              </p>
              <button
                onClick={(e) => {
                  addClick("Portal 按钮");
                  // e.stopPropagation(); // 取消注释可阻止冒泡
                }}
                className="rounded-md bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
              >
                点击我
              </button>
            </div>,
            document.body
          )}
      </div>

      <div className="mb-4 rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
        <p className="mb-2 text-sm font-medium">点击记录：</p>
        <div className="flex flex-wrap gap-1">
          {clicks.length === 0 ? (
            <span className="text-sm text-zinc-400">暂无点击</span>
          ) : (
            clicks.map((click, i) => (
              <span
                key={i}
                className="rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700"
              >
                {click}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>重要：</strong> 即使 Portal 内容在 DOM 中渲染到 body，
        点击事件仍会沿 React 组件树冒泡到父组件！
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 下拉菜单
// ============================================

interface DropdownProps {
  trigger: React.ReactNode;
  items: { label: string; onClick: () => void }[];
}

function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4 + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div ref={triggerRef} onClick={handleToggle} className="inline-block">
        {trigger}
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed z-50 min-w-[160px] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
            style={{ top: position.top, left: position.left }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export function DropdownExample() {
  const [selected, setSelected] = useState<string | null>(null);

  const menuItems = [
    { label: "📝 编辑", onClick: () => setSelected("编辑") },
    { label: "📋 复制", onClick: () => setSelected("复制") },
    { label: "📤 分享", onClick: () => setSelected("分享") },
    { label: "🗑️ 删除", onClick: () => setSelected("删除") },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 5: 下拉菜单</h3>

      <div className="mb-4 flex items-center gap-4">
        <Dropdown
          trigger={
            <button className="rounded-md bg-zinc-200 px-4 py-2 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600">
              操作菜单 ▾
            </button>
          }
          items={menuItems}
        />

        {selected && (
          <span className="text-sm text-zinc-500">
            已选择：<strong>{selected}</strong>
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500">
          这个容器有 overflow: hidden，但下拉菜单使用 Portal
          渲染，不会被裁剪。
        </p>
        <div className="mt-2">
          <Dropdown
            trigger={
              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                在 overflow:hidden 中 ▾
              </button>
            }
            items={menuItems}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function PortalExamples() {
  return (
    <div className="space-y-6">
      <BasicModalExample />
      <TooltipExample />
      <NotificationExample />
      <EventBubblingExample />
      <DropdownExample />
    </div>
  );
}
