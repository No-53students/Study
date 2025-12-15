import { HookPageLayout } from "@/components/HookPageLayout";
import HashTableExamples from "./components/HashTableExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/hash-table/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function HashTablePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="哈希表 (HashMap)"
      description="哈希表提供 O(1) 的查找效率，是前端开发中最常用的数据结构之一。"
      markdown={markdown}
    >
      <HashTableExamples />
    </HookPageLayout>
  );
}
