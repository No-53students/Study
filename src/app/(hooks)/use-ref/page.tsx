import { HookPageLayout } from "@/components/HookPageLayout";
import UseRefExamples from "./components/UseRefExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-ref/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseRefPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useRef"
      description="useRef 用于创建可变引用，访问 DOM 元素或存储不触发渲染的值。"
      markdown={markdown}
    >
      <UseRefExamples />
    </HookPageLayout>
  );
}
