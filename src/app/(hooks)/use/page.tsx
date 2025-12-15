import { HookPageLayout } from "@/components/HookPageLayout";
import UseExamples from "./components/UseExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UsePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="use"
      description="use 是 React 19 的新 Hook，可以读取 Promise 或 Context，且可以在条件语句中使用。"
      markdown={markdown}
    >
      <UseExamples />
    </HookPageLayout>
  );
}
