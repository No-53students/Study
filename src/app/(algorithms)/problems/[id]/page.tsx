import { notFound } from "next/navigation";
import { getProblemById, getAllProblemIds } from "../data";
import ProblemClient from "./ProblemClient";

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
    notFound();
  }

  return <ProblemClient problem={problem} />;
}
