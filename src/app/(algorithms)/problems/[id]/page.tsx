import { redirect } from "next/navigation";
import { getProblemById, getAllProblemIds } from "../data";

interface Props {
  params: Promise<{ id: string }>;
}

// 生成静态路径
export async function generateStaticParams() {
  const ids = getAllProblemIds();
  return ids.map((id) => ({ id }));
}

export default async function ProblemPage({ params }: Props) {
  const { id } = await params;
  const problem = getProblemById(id);

  if (!problem) {
    redirect("/problems");
  }

  // 重定向到统一的 LeetCode 页面
  redirect(`/problems/leetcode?id=${id}`);
}
