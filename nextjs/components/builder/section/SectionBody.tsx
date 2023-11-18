import BuilderQuestionWrapper from "@/components/builder/question/BuilderQuestionWrapper";
import MCQInput from "@/components/builder/question/MCQInput";
import { ReactNode } from "react";

export default function SectionBody({
  children,
  singleColumn,
}: {
  children: ReactNode;
  singleColumn?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 ${singleColumn ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {children}
    </div>
  );
}
