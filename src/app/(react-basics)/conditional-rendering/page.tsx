import { HookPageLayout } from "@/components/HookPageLayout";
import ConditionalRenderingExamples from "./components/ConditionalRenderingExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(react-basics)/conditional-rendering/README.md"
  );
  return fs.readFileSync(filePath, "utf-8");
}

export default function ConditionalRenderingPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="条件渲染"
      description="根据条件决定渲染哪些内容，是 React 中最常用的技巧之一。"
      markdown={markdown}
    >
      <ConditionalRenderingExamples />
    </HookPageLayout>
  );
}
