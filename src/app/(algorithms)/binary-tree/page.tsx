import { HookPageLayout } from "@/components/HookPageLayout";
import BinaryTreeExamples from "./components/BinaryTreeExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(algorithms)/binary-tree/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function BinaryTreePage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="二叉树 (BinaryTree)"
      description="二叉树是算法中的核心数据结构，掌握遍历和递归是解题关键。"
      markdown={markdown}
    >
      <BinaryTreeExamples />
    </HookPageLayout>
  );
}
