import { notFound } from "next/navigation";
import { getTemplateById, allTemplates } from "../../data/templates";
import TemplateDetailClient from "./TemplateDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplateById(id);

  if (!template) {
    notFound();
  }

  return <TemplateDetailClient template={template} />;
}

// 生成静态路径
export function generateStaticParams() {
  return allTemplates.map((template) => ({
    id: template.id,
  }));
}
