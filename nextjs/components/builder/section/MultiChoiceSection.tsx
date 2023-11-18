import BuilderQuestionWrapper from "@/components/builder/question/BuilderQuestionWrapper";
import MCQInput from "@/components/builder/question/MCQInput";
import SectionBody from "@/components/builder/section/SectionBody";
import SectionHeader from "@/components/builder/section/SectionHeader";
import SectionWrapper from "@/components/builder/section/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

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
        questionsNum={0}
        mark={sectionInfo.sectionGrade}
      />
      <Separator className="my-4" />
      <SectionBody>
        {sectionQuestions.map((question, index) => {
          return (
            <BuilderQuestionWrapper text={question.text} num={index}>
              <MCQInput choices={question.choices} answer={question.answer} />
            </BuilderQuestionWrapper>
          );
        })}
      </SectionBody>
    </SectionWrapper>
  );
}
