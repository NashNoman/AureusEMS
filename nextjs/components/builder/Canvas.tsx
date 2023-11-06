"use client";

import {
  MultiChoiceSection,
  TrueFalseSection,
} from "@/components/builder/ExamSection";
import { useSelector } from "react-redux";

const sectionType = new Map<string, () => JSX.Element>([
  ["mcq", MultiChoiceSection],
  ["tof", TrueFalseSection],
]);

export default function Canvas() {
  const sections = useSelector((state: RootState) => state.examInfo.sections);

  return (
    <main className="flex flex-col items-center pt-5 gap-4 container">
      {sections.map(({ type }) => {
        const ExamSection = sectionType.get(type);
        if (typeof ExamSection === "undefined") return;
        return <ExamSection key={type} />;
      })}
    </main>
  );
}
