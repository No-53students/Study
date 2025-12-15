import { HookPageLayout } from "@/components/HookPageLayout";
import QueueExamples from "./components/QueueExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/queue/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function QueuePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="队列 (Queue)"
      description="队列是一种先进先出(FIFO)的数据结构，在前端异步编程中有重要应用。"
      markdown={markdown}
    >
      <QueueExamples />
    </HookPageLayout>
  );
}
