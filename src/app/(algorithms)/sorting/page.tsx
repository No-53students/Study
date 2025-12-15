import { HookPageLayout } from "@/components/HookPageLayout";
import SortingExamples from "./components/SortingExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/sorting/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function SortingPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="排序算法"
      description="排序是最基础的算法之一，掌握各种排序算法的原理和复杂度是必备技能。"
      markdown={markdown}
    >
      <SortingExamples />
    </HookPageLayout>
  );
}
