import { HookPageLayout } from "@/components/HookPageLayout";
import SearchingExamples from "./components/SearchingExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/searching/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function SearchingPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="搜索算法"
      description="搜索算法用于在数据结构中查找元素，掌握二分查找、DFS、BFS是必备技能。"
      markdown={markdown}
    >
      <SearchingExamples />
    </HookPageLayout>
  );
}
