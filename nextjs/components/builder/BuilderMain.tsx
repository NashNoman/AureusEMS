"use client";

import MultiChoiceSection from "@/components/builder/section/MultiChoiceSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";

export default function BuilderMain() {
  const sectionsInfo = useSelector(
    (state: BuilderRS) => state.examInfo.sectionsInfo
  );

  return (
    <ScrollArea className="flex-grow">
      <main className="flex flex-col pb-20 pt-4 items-center gap-4 container">
        {sectionsInfo.map((sec) => {
          if (sec.type === "mcq") {
            return <MultiChoiceSection />;
          }
        })}
      </main>
    </ScrollArea>
  );
}
