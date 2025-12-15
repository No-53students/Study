import { HookPageLayout } from "@/components/HookPageLayout";
import ReactMemoExamples from "./components/ReactMemoExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/react-memo/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function ReactMemoPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="React.memo"
      description="React.memo 是一个高阶组件，用于优化函数组件的渲染性能。"
      markdown={markdown}
    >
      <ReactMemoExamples />
    </HookPageLayout>
  );
}
