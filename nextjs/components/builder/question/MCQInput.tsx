"use client";

import { mcqActions } from "@/redux/builder/mcq-slice";
import { useDispatch } from "react-redux";

type MCQInputProps = {
  qid: number;
  choices: { id: string; text: string }[];
  answer: string;
};

export default function MCQInput({ qid, choices, answer }: MCQInputProps) {
  const dispatch = useDispatch();

  const choiceUpdateHandler = (id: string, text: string) => {
    dispatch(mcqActions.updateChoice({ qid, id, text }));
  };

  const setAnswerHandler = (id: string) => {
    dispatch(mcqActions.setAnswer({ qid, answer: id }));
  };

  return (
    <div className="mb-4">
      {choices.map((choice, index) => {
        return (
          <Input
            key={choice.id}
            order={index}
            qid={qid}
            choice={choice}
            answer={answer}
            onChoiceUpdate={choiceUpdateHandler}
            onSetAnswer={setAnswerHandler}
          />
        );
      })}
    </div>
  );
}

const letters = ["A", "B", "C", "D"];

const Input = ({
  order,
  qid,
  choice,
  answer,
  onChoiceUpdate,
  onSetAnswer,
}: {
  order: number;
  qid: number;
  choice: { id: string; text: string };
  answer: string;
  onChoiceUpdate: (id: string, text: string) => void;
  onSetAnswer: (id: string) => void;
}) => {
  return (
    <div
      key={order}
      className={`my-2 w-full flex gap-2 py-2 pl-4 rounded-md transition-all outline outline-transparent hover:outline-accent ${
        choice.id === answer && "bg-green-50 !outline-green-200 "
      }`}
    >
      <input
        type="radio"
        name={qid + ""}
        id={`${qid} ${order}`}
        value={choice.id}
        className="hidden"
        onChange={() => onSetAnswer(choice.id)}
      />

      <label
        htmlFor={`${qid} ${order}`}
        className="font-semibold cursor-pointer"
      >
        {letters[order]}
      </label>

      <input
        type="text"
        className="flex-grow outline-none bg-transparent"
        defaultValue={choice.text}
        onChange={(e) => onChoiceUpdate(choice.id, e.target.value)}
      />
    </div>
  );
};
