import { mcqActions } from "@/builder/mcq-slice";
import Tiptap from "@/components/Tiptap";
import BuilderQuestionWrapper from "@/components/builder/question/BuilderQuestionWrapper";
import MCQInput from "@/components/builder/question/MCQInput";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const updateTextHandler = (text: string) => {
    dispatch(mcqActions.updateQuestion({ id, newQuestion: { text } }));
  };

  return (
    <BuilderQuestionWrapper num={num}>
      <Tiptap content={text} onUpdate={updateTextHandler} />
      <MCQInput qid={id} choices={choices} answer={answer} />
    </BuilderQuestionWrapper>
  );
}
