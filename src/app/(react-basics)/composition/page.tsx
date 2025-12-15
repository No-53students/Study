import { HookPageLayout } from "@/components/HookPageLayout";
import CompositionExamples from "./components/CompositionExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/composition/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function CompositionPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="组件组合"
      description="组件组合是 React 的核心设计理念，通过组合构建复杂 UI 而非继承。"
      markdown={markdown}
    >
      <CompositionExamples />
    </HookPageLayout>
  );
}
