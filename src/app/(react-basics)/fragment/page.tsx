import { HookPageLayout } from "@/components/HookPageLayout";
import FragmentExamples from "./components/FragmentExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/fragment/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function FragmentPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Fragment"
      description="Fragment 允许你在不添加额外 DOM 节点的情况下对元素进行分组。"
      markdown={markdown}
    >
      <FragmentExamples />
    </HookPageLayout>
  );
}
