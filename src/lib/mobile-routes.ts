/**
 * 移动端路由配置
 * 用于智能底部导航的模式切换和同级页面导航
 */

// 主导航配置 - 与 Web 端 SidebarNav 保持一致
export interface MainTab {
  id: string;
  label: string;
  path: string;
  matchPaths?: string[]; // 用于匹配子路径
}

export const mainTabs: MainTab[] = [
  { id: "home", label: "首页", path: "/" },
  {
    id: "react",
    label: "React",
    path: "/learn",
    matchPaths: ["/learn", "/use-", "/component", "/props", "/children", "/conditional", "/list-rendering", "/event", "/forms", "/composition", "/react-memo", "/forward-ref", "/suspense", "/fragment", "/portal", "/context", "/error-boundary", "/hoc", "/render-props", "/compound", "/controlled"],
  },
  {
    id: "algorithms",
    label: "算法",
    path: "/problems",
    matchPaths: ["/problems", "/algorithms", "/concepts", "/stack", "/queue", "/linked-list", "/hash-table", "/binary-tree", "/two-pointers", "/sliding-window", "/backtracking", "/dynamic-programming", "/bit-manipulation", "/graph", "/heap", "/sorting", "/searching"],
  },
  {
    id: "tools",
    label: "工具",
    path: "/tools",
    matchPaths: ["/tools"],
  },
];

// 列表页路径（显示主导航的页面）
// 这些页面是"入口"或"列表"，不是具体内容
export const LIST_PAGE_PATHS = [
  "/",
  "/learn",
  "/profile",
  "/tools",
  // 算法模块的列表/入口页
  "/problems",
  "/problems/roadmap",
  "/problems/templates",
  "/problems/animations",
  "/problems/knowledge-graph",
  "/problems/categories",
  "/problems/cases",
  "/problems/leetcode",
  "/problems/js-api",
  "/concepts",
  "/concepts/templates",
  // 算法分类列表页
  "/algorithms",
];

// 同级页面分组（用于上下切换）
export interface SiblingGroup {
  name: string;
  paths: string[];
  titles: Record<string, string>;
}

export const siblingGroups: SiblingGroup[] = [
  // React Hooks
  {
    name: "hooks",
    paths: [
      "/use-state",
      "/use-effect",
      "/use-ref",
      "/use-context",
      "/use-reducer",
      "/use-id",
      "/use-memo",
      "/use-callback",
      "/use-layout-effect",
      "/use-imperative-handle",
      "/use-transition",
      "/use-deferred-value",
      "/use-form-status",
      "/use-action-state",
      "/use-optimistic",
      "/use",
      "/use-sync-external-store",
      "/use-effect-event",
      "/use-insertion-effect",
      "/use-debug-value",
    ],
    titles: {
      "/use-state": "useState",
      "/use-effect": "useEffect",
      "/use-ref": "useRef",
      "/use-context": "useContext",
      "/use-reducer": "useReducer",
      "/use-id": "useId",
      "/use-memo": "useMemo",
      "/use-callback": "useCallback",
      "/use-layout-effect": "useLayoutEffect",
      "/use-imperative-handle": "useImperativeHandle",
      "/use-transition": "useTransition",
      "/use-deferred-value": "useDeferredValue",
      "/use-form-status": "useFormStatus",
      "/use-action-state": "useActionState",
      "/use-optimistic": "useOptimistic",
      "/use": "use",
      "/use-sync-external-store": "useSyncExternalStore",
      "/use-effect-event": "useEffectEvent",
      "/use-insertion-effect": "useInsertionEffect",
      "/use-debug-value": "useDebugValue",
    },
  },
  // React 组件基础
  {
    name: "components",
    paths: [
      "/component-basics",
      "/props",
      "/children",
      "/conditional-rendering",
      "/list-rendering",
      "/event-handling",
      "/forms",
      "/composition",
      "/react-memo",
      "/forward-ref",
      "/suspense-lazy",
      "/fragment",
      "/portal",
      "/context",
      "/error-boundary",
      "/hoc",
      "/render-props",
      "/compound-components",
      "/controlled-uncontrolled",
    ],
    titles: {
      "/component-basics": "组件基础",
      "/props": "Props",
      "/children": "Children",
      "/conditional-rendering": "条件渲染",
      "/list-rendering": "列表渲染",
      "/event-handling": "事件处理",
      "/forms": "表单处理",
      "/composition": "组件组合",
      "/react-memo": "React.memo",
      "/forward-ref": "forwardRef",
      "/suspense-lazy": "Suspense & lazy",
      "/fragment": "Fragment",
      "/portal": "Portal",
      "/context": "Context",
      "/error-boundary": "Error Boundary",
      "/hoc": "高阶组件",
      "/render-props": "Render Props",
      "/compound-components": "复合组件",
      "/controlled-uncontrolled": "受控与非受控",
    },
  },
  // 数据结构
  {
    name: "data-structures",
    paths: ["/stack", "/queue", "/linked-list", "/hash-table", "/binary-tree"],
    titles: {
      "/stack": "栈",
      "/queue": "队列",
      "/linked-list": "链表",
      "/hash-table": "哈希表",
      "/binary-tree": "二叉树",
    },
  },
  // 算法技巧
  {
    name: "algorithms",
    paths: [
      "/two-pointers",
      "/sliding-window",
      "/backtracking",
      "/dynamic-programming",
      "/bit-manipulation",
      "/graph",
      "/heap",
      "/sorting",
      "/searching",
    ],
    titles: {
      "/two-pointers": "双指针",
      "/sliding-window": "滑动窗口",
      "/backtracking": "回溯算法",
      "/dynamic-programming": "动态规划",
      "/bit-manipulation": "位运算",
      "/graph": "图论",
      "/heap": "堆",
      "/sorting": "排序算法",
      "/searching": "搜索算法",
    },
  },
];

// 获取页面标题
export function getPageTitle(pathname: string): string {
  for (const group of siblingGroups) {
    if (group.titles[pathname]) {
      return group.titles[pathname];
    }
  }

  // 从路径中提取名称作为标题
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0) {
    const name = parts[parts.length - 1];
    return name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return "详情";
}

// 获取同级导航信息
export interface SiblingNavInfo {
  prev?: string;
  next?: string;
  title: string;
  current: number;
  total: number;
  groupName?: string;
}

export function getSiblings(pathname: string): SiblingNavInfo {
  for (const group of siblingGroups) {
    const index = group.paths.indexOf(pathname);
    if (index !== -1) {
      return {
        prev: group.paths[index - 1],
        next: group.paths[index + 1],
        title: group.titles[pathname] || getPageTitle(pathname),
        current: index + 1,
        total: group.paths.length,
        groupName: group.name,
      };
    }
  }

  return {
    title: getPageTitle(pathname),
    current: 0,
    total: 0,
  };
}

// 判断是否为列表页（显示主导航）
export function isListPage(pathname: string): boolean {
  // 精确匹配列表页
  if (LIST_PAGE_PATHS.includes(pathname)) {
    return true;
  }
  return false;
}

// 判断是否为详情页（需要显示浮动返回按钮，隐藏主导航）
export function isDetailPage(pathname: string): boolean {
  // 列表页不是详情页
  if (isListPage(pathname)) {
    return false;
  }

  // 具体的 hook 教程页面
  if (pathname.startsWith("/use-") || pathname === "/use") {
    return true;
  }

  // 具体的组件教程页面
  const componentPages = [
    "/component-basics", "/props", "/children", "/conditional-rendering",
    "/list-rendering", "/event-handling", "/forms", "/composition",
    "/react-memo", "/forward-ref", "/suspense-lazy", "/fragment",
    "/portal", "/context", "/error-boundary", "/hoc", "/render-props",
    "/compound-components", "/controlled-uncontrolled"
  ];
  if (componentPages.includes(pathname)) {
    return true;
  }

  // 具体的数据结构页面
  const dataStructurePages = ["/stack", "/queue", "/linked-list", "/hash-table", "/binary-tree"];
  if (dataStructurePages.includes(pathname)) {
    return true;
  }

  // 具体的算法页面
  const algorithmPages = [
    "/two-pointers", "/sliding-window", "/backtracking", "/dynamic-programming",
    "/bit-manipulation", "/graph", "/heap", "/sorting", "/searching"
  ];
  if (algorithmPages.includes(pathname)) {
    return true;
  }

  // LeetCode 具体题目页 /problems/leetcode/[id]
  if (/^\/problems\/leetcode\/\d+/.test(pathname)) {
    return true;
  }

  // 模板详情页 /problems/templates/[id]
  if (/^\/problems\/templates\/[^/]+$/.test(pathname) && pathname !== "/problems/templates") {
    return true;
  }

  // 分类详情页 /problems/category/[id]
  if (/^\/problems\/category\/[^/]+$/.test(pathname)) {
    return true;
  }

  // 其他带有动态参数的详情页
  // 如 /concepts/xxx, /algorithms/xxx 等
  if (/^\/concepts\/[^/]+$/.test(pathname) && pathname !== "/concepts/templates") {
    return true;
  }

  return false;
}

// 判断是否隐藏底部导航
export function shouldHideBottomNav(pathname: string): boolean {
  // 只有详情页才隐藏底部导航
  return isDetailPage(pathname);
}

// 获取当前活跃的主导航 Tab
export function getActiveTab(pathname: string): string {
  // 首页
  if (pathname === "/") return "home";

  // 匹配子路径
  for (const tab of mainTabs) {
    if (tab.path !== "/" && pathname.startsWith(tab.path)) {
      return tab.id;
    }
    if (tab.matchPaths) {
      for (const matchPath of tab.matchPaths) {
        if (pathname.startsWith(matchPath)) {
          return tab.id;
        }
      }
    }
  }

  // 默认返回首页
  return "home";
}

// 获取返回路径（智能返回到合适的页面）
export function getBackPath(pathname: string): string {
  // 获取同级组
  const siblings = getSiblings(pathname);
  if (siblings.groupName) {
    // 如果在某个组内，返回到该组的入口页面
    switch (siblings.groupName) {
      case "hooks":
        return "/learn";
      case "components":
        return "/learn";
      case "data-structures":
        return "/algorithms";
      case "algorithms":
        return "/algorithms";
      default:
        break;
    }
  }

  // 默认返回到对应的一级页面
  const activeTab = getActiveTab(pathname);
  const tab = mainTabs.find((t) => t.id === activeTab);
  return tab?.path || "/";
}
