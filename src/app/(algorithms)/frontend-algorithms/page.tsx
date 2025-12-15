import { HookPageLayout } from "@/components/HookPageLayout";
import FrontendAlgorithmsExamples from "./components/FrontendAlgorithmsExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/frontend-algorithms/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function FrontendAlgorithmsPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="前端常用算法"
      description="前端开发中最常遇到的实用算法，包括防抖节流、深拷贝、LRU缓存等。"
      markdown={markdown}
    >
      <FrontendAlgorithmsExamples />
    </HookPageLayout>
  );
}
