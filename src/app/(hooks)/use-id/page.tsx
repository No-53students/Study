import { HookPageLayout } from "@/components/HookPageLayout";
import UseIdExamples from "./components/UseIdExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-id/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseIdPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useId"
      description="useId 用于生成唯一且稳定的 ID，主要用于 DOM 元素和 ARIA 属性关联。"
      markdown={markdown}
    >
      <UseIdExamples />
    </HookPageLayout>
  );
}
