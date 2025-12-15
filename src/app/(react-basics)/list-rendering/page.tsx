import { HookPageLayout } from "@/components/HookPageLayout";
import ListRenderingExamples from "./components/ListRenderingExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/list-rendering/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function ListRenderingPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="列表渲染"
      description="使用 map() 方法将数组数据渲染为 React 元素列表，理解 key 的重要性。"
      markdown={markdown}
    >
      <ListRenderingExamples />
    </HookPageLayout>
  );
}
