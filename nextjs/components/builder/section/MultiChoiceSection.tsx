import { mcqActions } from "@/builder/mcq-slice";
import MCQuestion from "@/components/builder/question/MCQuestion";
import SectionBody from "@/components/builder/section/SectionBody";
import SectionHeader from "@/components/builder/section/SectionHeader";
import SectionWrapper from "@/components/builder/section/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";

export default function MultiChoiceSection() {
  const sectionInfo = useSelector(
    (state: BuilderRS) =>
      state.examInfo.sectionsInfo.find(
        (sec) => sec.type === "mcq"
      ) as SectionInfo
  );
  const sectionQuestions = useSelector((state: BuilderRS) => state.mcq);

  return (
    <SectionWrapper>
      <SectionHeader
        title={"Multiple Choices"}
        questionsNum={sectionQuestions.length}
        grade={sectionInfo.sectionGrade}
      />
      <Separator className="my-4" />
      <SectionBody>
        {sectionQuestions.map((question, index) => {
          return (
            <MCQuestion
              key={index}
              id={question.id}
              text={question.text}
              choices={question.choices}
              answer={question.answer}
              num={index}
            />
          );
        })}
      </SectionBody>
    </SectionWrapper>
  );
}
