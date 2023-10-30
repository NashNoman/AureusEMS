"use client";

import ContentEditable from "react-contenteditable";

export const SingleChoiceInput = ({
  id,
  text,
  isChecked,
  onAnswerChange,
  onChoiceChange,
  qid,
}: {
  id: string;
  text: string;
  isChecked: boolean;
  onAnswerChange: (id: number, value: string) => void;
  onChoiceChange: (id: number, choiceId: string, text: string) => void;
  qid: number;
}) => {
  const inputId = id.toString() + qid.toString();

  return (
    <div
      className={`overflow-hidden border cursor-pointer hover:shadow-sm transition-shadow flex rounded-md items-center ${
        isChecked && "border-green-300 bg-green-50 text-background"
      }`}
    >
      <input
        type="radio"
        name={qid.toString()}
        id={inputId}
        value={id}
        className="hidden"
        checked={isChecked}
        onChange={() => onAnswerChange(qid, id.toString())}
      />

      <label
        htmlFor={inputId}
        className="font-semibold py-3 px-4 bg-gray-500 bg-opacity-20 cursor-pointer self-stretch"
      >
        {id}
      </label>

      <ContentEditable
        html={text}
        onChange={(e) => {
          onChoiceChange(qid, id, e.target.value);
        }}
        className="mx-3 cursor-text w-full outline-none"
      />
    </div>
  );
};
