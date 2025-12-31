// Service Worker for PWA
const CACHE_NAME = 'algo-learning-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// 需要预缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
];

// 需要缓存的 API 路由模式
const CACHE_PATTERNS = [
  /\/_next\/static\/.*/,
  /\/icons\/.*/,
  /\.(?:js|css|woff2?|ttf|otf|eot)$/,
];

// 不缓存的路由
const NO_CACHE_PATTERNS = [
  /\/api\/.*/,
  /\/_next\/webpack-hmr/,
  /\/sockjs-node/,
];

// 安装事件 - 预缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 请求拦截
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非 GET 请求
  if (request.method !== 'GET') return;

  // 跳过不缓存的路由
  if (NO_CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname))) return;

  // 跳过外部请求
  if (url.origin !== location.origin) return;

  // 导航请求 - 网络优先
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 缓存成功的页面响应
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // 离线时返回缓存或离线页面
          return caches.match(request)
            .then((cached) => cached || caches.match('/offline.html'));
        })
    );
    return;
  }

  // 静态资源 - 缓存优先
  if (CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(
      caches.match(request)
        .then((cached) => {
          if (cached) return cached;

          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const clone = response.clone();
                caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
              }
              return response;
            });
        })
    );
    return;
  }

  // 其他请求 - 网络优先，缓存备用
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// 后台同步支持
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
});

// 推送通知支持
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 点击通知
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
