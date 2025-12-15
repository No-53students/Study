import { HookPageLayout } from "@/components/HookPageLayout";
import PropsExamples from "./components/PropsExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(react-basics)/props/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function PropsPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="Props"
      description="Props 是 React 组件之间传递数据的方式，理解 Props 是掌握组件通信的基础。"
      markdown={markdown}
    >
      <PropsExamples />
    </HookPageLayout>
  );
}
