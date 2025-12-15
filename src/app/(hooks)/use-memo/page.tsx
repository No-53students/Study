import { HookPageLayout } from "@/components/HookPageLayout";
import UseMemoExamples from "./components/UseMemoExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-memo/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseMemoPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useMemo"
      description="useMemo 用于缓存计算结果，避免不必要的重复计算，提升性能。"
      markdown={markdown}
    >
      <UseMemoExamples />
    </HookPageLayout>
  );
}
