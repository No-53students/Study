import { HookPageLayout } from "@/components/HookPageLayout";
import UseContextExamples from "./components/UseContextExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(hooks)/use-context/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function UseContextPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="useContext"
      description="useContext 用于跨组件共享数据，避免 props 层层传递（Props Drilling）。"
      markdown={markdown}
    >
      <UseContextExamples />
    </HookPageLayout>
  );
}
