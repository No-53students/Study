import Link from "next/link";

// React 学习模块入口页面
export default function LearnPage() {
  const sections = [
    {
      title: "React Hooks",
      description: "学习 React 的核心 Hooks，掌握函数式组件开发",
      icon: "🪝",
      color: "from-cyan-500 to-blue-500",
      links: [
        { name: "useState", path: "/use-state", desc: "状态管理基础" },
        { name: "useEffect", path: "/use-effect", desc: "副作用处理" },
        { name: "useRef", path: "/use-ref", desc: "引用与DOM操作" },
        { name: "useContext", path: "/use-context", desc: "跨组件状态共享" },
        { name: "useMemo", path: "/use-memo", desc: "计算值缓存" },
        { name: "useCallback", path: "/use-callback", desc: "函数缓存" },
      ],
    },
    {
      title: "组件基础",
      description: "React 组件开发的基础知识和最佳实践",
      icon: "🧩",
      color: "from-purple-500 to-pink-500",
      links: [
        { name: "组件基础", path: "/component-basics", desc: "组件创建与使用" },
        { name: "Props", path: "/props", desc: "属性传递" },
        { name: "条件渲染", path: "/conditional-rendering", desc: "条件显示内容" },
        { name: "列表渲染", path: "/list-rendering", desc: "渲染列表数据" },
        { name: "事件处理", path: "/event-handling", desc: "处理用户交互" },
        { name: "表单处理", path: "/forms", desc: "表单数据管理" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* 头部 */}
      <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">React 学习</h1>
          <p className="text-white/80 text-sm lg:text-base">
            从基础到进阶，系统学习 React 开发
          </p>
        </div>
      </div>

      {/* 内容区 */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            {/* 分类头部 */}
            <div className={`bg-gradient-to-r ${section.color} p-4 text-white`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="font-bold text-lg">{section.title}</h2>
                  <p className="text-white/80 text-sm">{section.description}</p>
                </div>
              </div>
            </div>

            {/* 链接列表 */}
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {section.links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                >
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.name}
                    </span>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {link.desc}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>

            {/* 查看全部 */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 text-center">
              <Link
                href={section.title === "React Hooks" ? "/use-state" : "/component-basics"}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                查看全部 {section.title} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
