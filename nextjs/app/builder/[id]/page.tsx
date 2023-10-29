import ExamSection from "@/app/builder/[id]/ExamSection";
import examData from "@/temp/examData";

export default function Builder() {
  return (
    <main className="flex flex-col items-center py-10 gap-4 container">
      {examData.sections.map((sec) => {
        return (
          <ExamSection
            questions={sec.questions}
            type={sec.sectionType}
            key={sec.sectionType}
          />
        );
      })}
    </main>
  );
}
