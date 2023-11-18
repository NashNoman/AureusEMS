import Tiptap from "@/components/Tiptap";
import BuilderQuestionWrapper from "@/components/builder/question/BuilderQuestionWrapper";
import MCQInput from "@/components/builder/question/MCQInput";

type MCQuestionProps = {
  id: number;
  text: string;
  answer: string;
  choices: Choice[];
  num: number;
};

export default function MCQuestion({
  id,
  text,
  answer,
  choices,
  num,
}: MCQuestionProps) {
  return (
    <BuilderQuestionWrapper num={num}>
      <Tiptap content={text} />
      <MCQInput qid={id} choices={choices} answer={answer} />
    </BuilderQuestionWrapper>
  );
}
