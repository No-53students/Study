// 工具模块入口页面（开发中）
export default function ToolsPage() {
  const upcomingTools = [
    {
      name: "Git 速查",
      description: "常用 Git 命令和工作流程",
      icon: "📦",
      status: "开发中",
    },
    {
      name: "Node.js",
      description: "Node.js 核心概念和 API",
      icon: "🟢",
      status: "计划中",
    },
    {
      name: "Webpack",
      description: "模块打包和构建配置",
      icon: "📦",
      status: "计划中",
    },
    {
      name: "TypeScript",
      description: "类型系统和高级特性",
      icon: "🔷",
      status: "计划中",
    },
  ];

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* 头部 */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">开发工具</h1>
          <p className="text-white/80 text-sm lg:text-base">
            前端开发常用工具和技术栈速查
          </p>
        </div>
      </div>

      {/* 内容区 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 开发中提示 */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚧</span>
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-200">
                功能开发中
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                工具模块正在开发中，敬请期待更多实用工具！
              </p>
            </div>
          </div>
        </div>

        {/* 即将推出 */}
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          即将推出
        </h2>
        <div className="grid gap-4">
          {upcomingTools.map((tool) => (
            <div
              key={tool.name}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-4 opacity-75"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                {tool.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {tool.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {tool.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
