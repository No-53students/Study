"use client";

import { useRouter } from "next/navigation";
import { useCallback, MouseEvent, AnchorHTMLAttributes } from "react";

interface PWALinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: React.ReactNode;
}

/**
 * PWA 安全链接组件
 * 在 PWA 模式下使用 History API 导航，避免显示浏览器 UI
 */
export default function PWALink({ href, children, onClick, ...props }: PWALinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // 调用原有的 onClick 如果存在
      onClick?.(e);

      // 如果事件已被阻止，不进行导航
      if (e.defaultPrevented) return;

      // 检查是否需要在新标签打开
      const isModifiedEvent = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      if (isModifiedEvent) return;

      // 检查是否是外部链接
      if (href.startsWith("http") || href.startsWith("//")) return;

      // 检查是否在 PWA 模式下运行
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

      if (isStandalone) {
        e.preventDefault();
        // 使用 Next.js router 导航，这在 PWA 模式下更平滑
        router.push(href);
      }
      // 非 PWA 模式下，让链接正常工作
    },
    [href, onClick, router]
  );

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
