"use client";

import {
  SingleChoiceSection,
  TrueFalseSection,
} from "@/app/builder/[id]/ExamSection";
import examData from "@/temp/examData";
import { useSelector } from "react-redux";

const sectionType = new Map<string, () => JSX.Element>([
  ["scq", SingleChoiceSection],
  ["tof", TrueFalseSection],
]);

export default function Canvas() {
  const sections = useSelector((state: RootState) => state.exam.sections);

  return (
    <main className="flex flex-col items-center py-10 gap-4 container">
      {sections.map((sec: string) => {
        const ExamSection = sectionType.get(sec);
        if (typeof ExamSection === "undefined") return;
        return <ExamSection key={sec} />;
      })}
    </main>
  );
}
