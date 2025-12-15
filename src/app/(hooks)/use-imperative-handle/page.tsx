import { HookPageLayout } from "@/components/HookPageLayout";
import UseImperativeHandleExamples from "./components/UseImperativeHandleExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(hooks)/use-imperative-handle/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseImperativeHandlePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useImperativeHandle"
      description="useImperativeHandle 用于自定义暴露给父组件的实例值，配合 forwardRef 使用。"
      markdown={markdown}
    >
      <UseImperativeHandleExamples />
    </HookPageLayout>
  );
}
