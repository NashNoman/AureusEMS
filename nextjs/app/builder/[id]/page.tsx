import { ExamSection } from "@/components/ExamSection";
import examData from "@/temp/examData";

export default function Builder() {
  return (
    <>
      {examData.sections.map((sec) => {
        if (sec.sectionType === "scq") {
          return (
            <ExamSection questions={sec.questions} key={sec.sectionType} />
          );
        }
      })}
    </>
  );
}
