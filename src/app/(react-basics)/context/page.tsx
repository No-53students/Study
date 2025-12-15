import { HookPageLayout } from "@/components/HookPageLayout";
import ContextExamples from "./components/ContextExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/context/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function ContextPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Context"
      description="Context 提供了一种在组件树中共享数据的方式，无需通过 props 逐层传递。"
      markdown={markdown}
    >
      <ContextExamples />
    </HookPageLayout>
  );
}
