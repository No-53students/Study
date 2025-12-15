import { HookPageLayout } from "@/components/HookPageLayout";
import InterviewQuestionsExamples from "./components/InterviewQuestionsExamples";
import fs from "fs";
import path from "path";

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/app/(interview)/interview-questions/README.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function InterviewQuestionsPage() {
  const markdown = getMarkdownContent();

  return (
    <HookPageLayout
      title="前端编程挑战"
      description="精选前端高频算法题，在线编辑代码并运行测试。"
      markdown={markdown}
    >
      <InterviewQuestionsExamples />
    </HookPageLayout>
  );
}
