import { HookPageLayout } from "@/components/HookPageLayout";
import UseActionStateExamples from "./components/UseActionStateExamples";
import fs from "fs";
import path from "path";

// 在服务端读取 markdown 文件
function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-action-state/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseActionStatePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useActionState"
      description="useActionState 是 React 19 新增的 Hook，用于管理基于 action 的状态更新，特别适合处理表单提交和异步操作。"
      markdown={markdown}
    >
      <UseActionStateExamples />
    </HookPageLayout>
  );
}
