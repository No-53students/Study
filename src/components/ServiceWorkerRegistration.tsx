"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // 仅在生产环境注册 Service Worker
    if (process.env.NODE_ENV !== "production") {
      console.log("[SW] Skipping registration in development");
      return;
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("[SW] Registered with scope:", registration.scope);

        // 监听更新
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // 新版本可用，可以提示用户刷新
              console.log("[SW] New version available");

              // 可选：显示更新提示
              if (window.confirm("发现新版本，是否立即更新？")) {
                newWorker.postMessage({ type: "SKIP_WAITING" });
                window.location.reload();
              }
            }
          });
        });

        // 定期检查更新（每小时）
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

      } catch (error) {
        console.error("[SW] Registration failed:", error);
      }
    };

    // 页面加载完成后注册
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
      return () => window.removeEventListener("load", registerSW);
    }
  }, []);

  return null;
}
