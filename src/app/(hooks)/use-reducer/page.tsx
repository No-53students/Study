import { HookPageLayout } from "@/components/HookPageLayout";
import UseReducerExamples from "./components/UseReducerExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-reducer/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseReducerPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useReducer"
      description="useReducer 用于管理复杂状态逻辑，通过 reducer 函数集中处理状态更新。"
      markdown={markdown}
    >
      <UseReducerExamples />
    </HookPageLayout>
  );
}
