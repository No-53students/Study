import { HookPageLayout } from "@/components/HookPageLayout";
import UseDeferredValueExamples from "./components/UseDeferredValueExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-deferred-value/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseDeferredValuePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useDeferredValue"
      description="useDeferredValue 用于延迟更新某个值，在并发渲染中保持 UI 响应性。"
      markdown={markdown}
    >
      <UseDeferredValueExamples />
    </HookPageLayout>
  );
}
