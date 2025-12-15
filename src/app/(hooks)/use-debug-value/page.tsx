import { HookPageLayout } from "@/components/HookPageLayout";
import UseDebugValueExamples from "./components/UseDebugValueExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-debug-value/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseDebugValuePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useDebugValue"
      description="useDebugValue 用于在 React DevTools 中为自定义 Hook 添加调试标签。"
      markdown={markdown}
    >
      <UseDebugValueExamples />
    </HookPageLayout>
  );
}
