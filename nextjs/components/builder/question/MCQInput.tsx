"use client";

type MCQInputProps = {
  qid: number;
  choices: { id: string; text: string }[];
  answer: string;
};

export default function MCQInput({ qid, choices, answer }: MCQInputProps) {
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
}: {
  order: number;
  qid: number;
  choice: { id: string; text: string };
  answer: string;
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
      />
    </div>
  );
};
