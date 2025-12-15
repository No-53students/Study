import { HookPageLayout } from "@/components/HookPageLayout";
import StackExamples from "./components/StackExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/stack/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function StackPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="栈 (Stack)"
      description="栈是一种后进先出(LIFO)的数据结构，在前端开发中有着广泛的应用。"
      markdown={markdown}
    >
      <StackExamples />
    </HookPageLayout>
  );
}
