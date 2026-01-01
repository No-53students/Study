import { ProblemsClientWrapper } from "./components/ProblemsClientWrapper";

export default function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProblemsClientWrapper>{children}</ProblemsClientWrapper>;
}
