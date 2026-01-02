import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, DIFFICULTY_CONFIG, FRONTEND_RELEVANCE_CONFIG, Category } from "../../types";
import { getProblemsByCategory } from "../../data";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const categoryId = id as Category;
  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  const problems = getProblemsByCategory(categoryId);

  return (
    <main className="py-8">
        {/* 分类描述 */}
        <div className="mb-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm dark:shadow-none">
          <p className="text-zinc-600 dark:text-zinc-400">{category.description}</p>
        </div>

        {/* 题目列表 */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm dark:shadow-none">
          <table className="w-full">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr className="text-left text-sm text-zinc-600 dark:text-zinc-400">
                <th className="px-4 py-3 font-medium">题号</th>
                <th className="px-4 py-3 font-medium">题目</th>
                <th className="px-4 py-3 font-medium">难度</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">前端</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-transparent">
              {problems.map((problem) => {
                const relevanceConfig = problem.frontendRelevance
                  ? FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance]
                  : null;

                return (
                  <tr
                    key={problem.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                      {problem.leetcodeId || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/problems/${problem.id}`}
                        className="text-zinc-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[problem.difficulty].color} ${DIFFICULTY_CONFIG[problem.difficulty].bg}`}
                      >
                        {DIFFICULTY_CONFIG[problem.difficulty].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {relevanceConfig && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${relevanceConfig.color} ${relevanceConfig.bg}`}
                          title={problem.frontendNote || relevanceConfig.description}
                        >
                          <span>{relevanceConfig.icon}</span>
                          <span>{relevanceConfig.label}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {problems.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            该分类暂无题目
          </div>
        )}
      </main>
  );
}

// 生成静态路由参数
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    id: category.id,
  }));
}
