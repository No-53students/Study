import { HookPageLayout } from "@/components/HookPageLayout";
import UseStateExamples from "./components/UseStateExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-state/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseStatePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useState"
      description="useState 是 React 最基础的 Hook，用于在函数组件中添加状态管理能力。"
      markdown={markdown}
    >
      <UseStateExamples />
    </HookPageLayout>
  );
}
