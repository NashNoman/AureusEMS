import BuilderQuestionWrapper from "@/components/builder/question/BuilderQuestionWrapper";
import MCQInput from "@/components/builder/question/MCQInput";

const array = [1, 2, 3, 4, 5];

export default function MCQSectionBody() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {array.map((num) => (
        <BuilderQuestionWrapper key={num}>
          <MCQInput />
        </BuilderQuestionWrapper>
      ))}
    </div>
  );
}
