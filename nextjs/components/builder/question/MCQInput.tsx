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

  if (qid === 19) console.log(choices);

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
            onUpdate={choiceUpdateHandler}
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
  onUpdate,
}: {
  order: number;
  qid: number;
  choice: { id: string; text: string };
  answer: string;
  onUpdate: (id: string, text: string) => void;
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
        className="hidden"
        onChange={(e) => {}}
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
        onChange={(e) => onUpdate(choice.id, e.target.value)}
      />
    </div>
  );
};
