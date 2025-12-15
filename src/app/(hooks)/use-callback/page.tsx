import { HookPageLayout } from "@/components/HookPageLayout";
import UseCallbackExamples from "./components/UseCallbackExamples";
import fs from "fs";
import path from "path";

// 在服务端读取 markdown 文件
function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-callback/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseCallbackPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useCallback"
      description="useCallback 是 React 的性能优化 Hook，用于缓存函数引用，避免不必要的重新渲染。"
      markdown={markdown}
    >
      <UseCallbackExamples />
    </HookPageLayout>
  );
}
