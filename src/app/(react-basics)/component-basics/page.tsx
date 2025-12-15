import { HookPageLayout } from "@/components/HookPageLayout";
import ComponentBasicsExamples from "./components/ComponentBasicsExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(react-basics)/component-basics/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function ComponentBasicsPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="组件基础"
      description="React 组件是 UI 的基本构建块，了解组件的核心概念是掌握 React 的第一步。"
      markdown={markdown}
    >
      <ComponentBasicsExamples />
    </HookPageLayout>
  );
}
