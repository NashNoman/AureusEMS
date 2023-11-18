import BuilderQuestionWrapper from "@/components/builder/question/BuilderQuestionWrapper";
import MCQInput from "@/components/builder/question/MCQInput";
import SectionBody from "@/components/builder/section/SectionBody";
import SectionHeader from "@/components/builder/section/SectionHeader";
import SectionWrapper from "@/components/builder/section/SectionWrapper";
import { Separator } from "@/components/ui/separator";
import EXAMDATA from "@/temp/examData";

export default function Section() {
  return (
    <SectionWrapper>
      <SectionHeader />
      <Separator className="my-4" />
      <SectionBody>
        {EXAMDATA.sections[0].questions.map((question, index) => {
          return (
            <BuilderQuestionWrapper
              key={question.id}
              text={question.text}
              num={index}
            >
              <MCQInput
                choices={question.choices}
                answer={question.answer as string}
              />
            </BuilderQuestionWrapper>
          );
        })}
      </SectionBody>
    </SectionWrapper>
  );
}
