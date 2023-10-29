import {
  SingleChoiceSection,
  TrueFalseSection,
} from "@/app/builder/[id]/ExamSection";
import examData from "@/temp/examData";

export default function Builder() {
  return (
    <main className="flex flex-col items-center py-10 gap-4 container">
      {examData.sections.map((sec: Section) => {
        if (sec.sectionType === "scq")
          return (
            <SingleChoiceSection
              questions={sec.questions as SCQuestion[]}
              key={sec.sectionType}
            />
          );
        return (
          <TrueFalseSection
            questions={sec.questions as ToFQuestion[]}
            key={sec.sectionType}
          />
        );
      })}
    </main>
  );
}
