import { HookPageLayout } from "@/components/HookPageLayout";
import LinkedListExamples from "./components/LinkedListExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/linked-list/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function LinkedListPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="链表 (LinkedList)"
      description="链表是一种通过指针相连的线性数据结构，是算法中的核心概念。"
      markdown={markdown}
    >
      <LinkedListExamples />
    </HookPageLayout>
  );
}
