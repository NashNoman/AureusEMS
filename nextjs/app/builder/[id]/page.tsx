import ExamSection from "@/app/builder/[id]/ExamSection";
import examData from "@/temp/examData";

export default function Builder() {
  return (
    <div className="flex flex-col gap-4 items-center">
      {examData.sections.map((sec) => {
        return (
          <ExamSection
            questions={sec.questions}
            type={sec.sectionType}
            key={sec.sectionType}
          />
        );
      })}
    </div>
  );
}
