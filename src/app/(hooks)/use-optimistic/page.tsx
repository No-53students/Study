import { HookPageLayout } from "@/components/HookPageLayout";
import UseOptimisticExamples from "./components/UseOptimisticExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-optimistic/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseOptimisticPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useOptimistic"
      description="useOptimistic 用于实现乐观更新，在异步操作完成前立即显示预期结果。"
      markdown={markdown}
    >
      <UseOptimisticExamples />
    </HookPageLayout>
  );
}
