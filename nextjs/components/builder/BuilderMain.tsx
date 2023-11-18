"use client";

import MultiChoiceSection from "@/components/builder/section/MultiChoiceSection";
import { useSelector } from "react-redux";

export default function BuilderMain() {
  const sectionsInfo = useSelector(
    (state: BuilderRS) => state.examInfo.sectionsInfo
  );

  return (
    <main className="flex flex-col pb-20 pt-4 items-center gap-4 overflow-y-auto h-[calc(100%-3rem)]">
      {sectionsInfo.map((sec) => {
        if (sec.type === "mcq") {
          return <MultiChoiceSection />;
        }
      })}
    </main>
  );
}
