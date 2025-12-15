import fs from "fs";
import path from "path";

/**
 * 难度等级
 */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

/**
 * 模块类型
 */
export type ModuleType = "hooks" | "components" | "patterns" | "algorithms" | "other";

/**
 * 路由信息接口
 */
export interface RouteInfo {
  /** 路由路径，如 /about */
  path: string;
  /** 路由名称，如 about */
  name: string;
  /** 显示名称，如 About */
  displayName: string;
  /** 难度等级 */
  difficulty?: DifficultyLevel;
  /** 所属模块 */
  module?: ModuleType;
  /** 排序权重（越小越靠前） */
  order?: number;
}

/**
 * 模块配置
 */
export interface ModuleConfig {
  title: string;
  subtitle: string;
  icon: string;
}

export const MODULE_CONFIG: Record<ModuleType, ModuleConfig> = {
  hooks: {
    title: "React Hooks",
    subtitle: "React 内置 Hooks 详解与实战",
    icon: "🪝",
  },
  components: {
    title: "React 组件",
    subtitle: "组件开发核心概念与模式",
    icon: "🧩",
  },
  patterns: {
    title: "设计模式",
    subtitle: "React 常用设计模式与最佳实践",
    icon: "📐",
  },
  algorithms: {
    title: "算法与数据结构",
    subtitle: "前端必备算法知识与实战",
    icon: "🧮",
  },
  other: {
    title: "其他",
    subtitle: "其他页面",
    icon: "📄",
  },
};

/**
 * 路由元数据配置
 */
interface RouteMetadata {
  difficulty: DifficultyLevel;
  module: ModuleType;
  order: number;
}

const ROUTES_METADATA: Record<string, RouteMetadata> = {
  // ==========================================
  // Hooks 模块 (1-100)
  // ==========================================
  // 入门级 (1-10)
  "use-state": { difficulty: "beginner", module: "hooks", order: 1 },
  "use-effect": { difficulty: "beginner", module: "hooks", order: 2 },
  "use-ref": { difficulty: "beginner", module: "hooks", order: 3 },
  "use-context": { difficulty: "beginner", module: "hooks", order: 4 },
  "use-reducer": { difficulty: "beginner", module: "hooks", order: 5 },
  "use-id": { difficulty: "beginner", module: "hooks", order: 6 },
  // 中级 (11-20)
  "use-memo": { difficulty: "intermediate", module: "hooks", order: 11 },
  "use-callback": { difficulty: "intermediate", module: "hooks", order: 12 },
  "use-layout-effect": { difficulty: "intermediate", module: "hooks", order: 13 },
  "use-imperative-handle": { difficulty: "intermediate", module: "hooks", order: 14 },
  "use-transition": { difficulty: "intermediate", module: "hooks", order: 15 },
  "use-deferred-value": { difficulty: "intermediate", module: "hooks", order: 16 },
  "use-form-status": { difficulty: "intermediate", module: "hooks", order: 17 },
  "use-action-state": { difficulty: "intermediate", module: "hooks", order: 18 },
  "use-optimistic": { difficulty: "intermediate", module: "hooks", order: 19 },
  // 高级 (21-30)
  use: { difficulty: "advanced", module: "hooks", order: 21 },
  "use-sync-external-store": { difficulty: "advanced", module: "hooks", order: 22 },
  "use-effect-event": { difficulty: "advanced", module: "hooks", order: 23 },
  "use-insertion-effect": { difficulty: "advanced", module: "hooks", order: 24 },
  "use-debug-value": { difficulty: "advanced", module: "hooks", order: 25 },

  // ==========================================
  // 组件模块 (101-200)
  // ==========================================
  // 入门级 (101-110)
  "component-basics": { difficulty: "beginner", module: "components", order: 101 },
  props: { difficulty: "beginner", module: "components", order: 102 },
  children: { difficulty: "beginner", module: "components", order: 103 },
  "conditional-rendering": { difficulty: "beginner", module: "components", order: 104 },
  "list-rendering": { difficulty: "beginner", module: "components", order: 105 },
  "event-handling": { difficulty: "beginner", module: "components", order: 106 },
  forms: { difficulty: "beginner", module: "components", order: 107 },
  // 中级 (111-120)
  composition: { difficulty: "intermediate", module: "components", order: 111 },
  "react-memo": { difficulty: "intermediate", module: "components", order: 112 },
  "forward-ref": { difficulty: "intermediate", module: "components", order: 113 },
  "suspense-lazy": { difficulty: "intermediate", module: "components", order: 114 },
  fragment: { difficulty: "intermediate", module: "components", order: 115 },
  portal: { difficulty: "intermediate", module: "components", order: 116 },
  context: { difficulty: "intermediate", module: "components", order: 117 },
  // 高级 (121-130)
  "error-boundary": { difficulty: "advanced", module: "components", order: 121 },
  hoc: { difficulty: "advanced", module: "components", order: 122 },
  "render-props": { difficulty: "advanced", module: "components", order: 123 },
  "compound-components": { difficulty: "advanced", module: "components", order: 124 },
  "controlled-uncontrolled": { difficulty: "advanced", module: "components", order: 125 },

  // ==========================================
  // 算法与数据结构模块 (201-300)
  // ==========================================
  // 入门级 - 基础数据结构 (201-210)
  stack: { difficulty: "beginner", module: "algorithms", order: 201 },
  queue: { difficulty: "beginner", module: "algorithms", order: 202 },
  "linked-list": { difficulty: "beginner", module: "algorithms", order: 203 },
  "hash-table": { difficulty: "beginner", module: "algorithms", order: 204 },
  // 中级 - 树与图 (211-220)
  "binary-tree": { difficulty: "intermediate", module: "algorithms", order: 211 },
  // 中级 - 排序与搜索 (221-230)
  sorting: { difficulty: "intermediate", module: "algorithms", order: 221 },
  searching: { difficulty: "intermediate", module: "algorithms", order: 222 },
  // 高级 - 前端常用算法 (231-240)
  "frontend-algorithms": { difficulty: "advanced", module: "algorithms", order: 231 },

  // ==========================================
  // 编程题模块 (301-400)
  // ==========================================
  "interview-questions": { difficulty: "intermediate", module: "other", order: 301 },
};

/**
 * 路由分组配置
 */
export interface RouteGroupConfig {
  name: string;
  title: string;
  subtitle: string;
  icon: string;
  path: string;
}

export const ROUTE_GROUPS: RouteGroupConfig[] = [
  {
    name: "hooks",
    title: "React Hooks",
    subtitle: "React 内置 Hooks 详解与实战",
    icon: "🪝",
    path: "/hooks",
  },
  {
    name: "react-basics",
    title: "React 组件基础",
    subtitle: "组件开发核心概念与模式",
    icon: "🧩",
    path: "/react-basics",
  },
  {
    name: "algorithms",
    title: "算法与数据结构",
    subtitle: "前端必备算法知识与实战",
    icon: "🧮",
    path: "/algorithms",
  },
  {
    name: "interview",
    title: "编程挑战",
    subtitle: "前端高频算法题，在线编码实战",
    icon: "🎯",
    path: "/interview",
  },
];

/**
 * 获取 app 目录下的所有路由
 * 只在服务端运行（Server Component）
 * @param groupName 可选，指定路由分组名称（如 "hooks", "react-basics", "algorithms"）
 */
export function getAppRoutes(groupName?: string): RouteInfo[] {
  const appDir = path.join(process.cwd(), "src/app");
  const routes: RouteInfo[] = [];

  // 递归扫描目录
  function scanDirectory(dir: string, basePath: string = "") {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (!item.isDirectory()) continue;

      const itemName = item.name;

      // 处理路由分组 (group)
      if (itemName.startsWith("(") && itemName.endsWith(")")) {
        const groupDirName = itemName.slice(1, -1); // 去掉括号
        // 如果指定了分组，只扫描该分组
        if (groupName && groupDirName !== groupName) {
          continue;
        }
        // 扫描分组内的目录，但不改变 basePath（分组不影响 URL）
        const fullPath = path.join(dir, itemName);
        scanDirectory(fullPath, basePath);
        continue;
      }

      // 跳过其他特殊目录
      if (
        itemName.startsWith("_") || // _components 等私有目录
        itemName.startsWith(".") || // .git 等隐藏目录
        itemName.startsWith("@") || // @parallel 并行路由
        itemName === "api" || // API 路由
        itemName === "components" // 组件目录
      ) {
        continue;
      }

      const fullPath = path.join(dir, itemName);
      const routePath = `${basePath}/${itemName}`;

      // 检查是否有 page.tsx 或 page.js 文件
      const hasPage =
        fs.existsSync(path.join(fullPath, "page.tsx")) ||
        fs.existsSync(path.join(fullPath, "page.js"));

      if (hasPage) {
        const metadata = ROUTES_METADATA[itemName];
        routes.push({
          path: routePath,
          name: itemName,
          displayName: formatDisplayName(itemName),
          difficulty: metadata?.difficulty,
          module: metadata?.module,
          order: metadata?.order ?? 999,
        });
      }

      // 递归扫描子目录
      scanDirectory(fullPath, routePath);
    }
  }

  // 如果指定了分组，直接扫描分组目录
  if (groupName) {
    const groupDir = path.join(appDir, `(${groupName})`);
    if (fs.existsSync(groupDir)) {
      scanDirectory(groupDir);
    }
  } else {
    scanDirectory(appDir);
  }

  // 按模块和难度排序
  return routes.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/**
 * 按模块分组路由
 */
export function groupRoutesByModule(
  routes: RouteInfo[]
): Record<ModuleType, RouteInfo[]> {
  const grouped: Record<ModuleType, RouteInfo[]> = {
    hooks: [],
    components: [],
    patterns: [],
    algorithms: [],
    other: [],
  };

  for (const route of routes) {
    const module = route.module ?? "other";
    grouped[module].push(route);
  }

  return grouped;
}

/**
 * 格式化显示名称
 */
function formatDisplayName(name: string): string {
  // 特殊名称映射
  const specialNames: Record<string, string> = {
    hoc: "高阶组件 (HOC)",
    "react-memo": "React.memo",
    "forward-ref": "forwardRef",
    "suspense-lazy": "Suspense & lazy",
    "error-boundary": "Error Boundary",
    "render-props": "Render Props",
    "compound-components": "复合组件",
    "controlled-uncontrolled": "受控与非受控",
    "component-basics": "组件基础",
    "conditional-rendering": "条件渲染",
    "list-rendering": "列表渲染",
    "event-handling": "事件处理",
    forms: "表单处理",
    composition: "组件组合",
    fragment: "Fragment",
    portal: "Portal",
    context: "Context",
    // 算法与数据结构
    stack: "栈 (Stack)",
    queue: "队列 (Queue)",
    "linked-list": "链表 (LinkedList)",
    "hash-table": "哈希表 (HashMap)",
    "binary-tree": "二叉树 (BinaryTree)",
    sorting: "排序算法",
    searching: "搜索算法",
    "frontend-algorithms": "前端常用算法",
    // 编程题
    "interview-questions": "前端编程挑战",
  };

  if (specialNames[name]) {
    return specialNames[name];
  }

  // 处理 kebab-case (use-callback -> useCallback)
  if (name.includes("-")) {
    return name
      .split("-")
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("");
  }

  // 首字母大写
  return name.charAt(0).toUpperCase() + name.slice(1);
}
