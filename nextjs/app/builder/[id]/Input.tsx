"use client";

import { useState } from "react";

export const SingleChoiceInput = ({
  id,
  text,
  isChecked,
  handleInput,
  qid,
}: {
  id: number;
  text: string;
  isChecked: boolean;
  handleInput: (id: number, value: string) => void;
  qid: number;
}) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  const inputId = id.toString() + qid.toString();
  return (
    <label
      htmlFor={inputId}
      className={`overflow-hidden border cursor-pointer hover:shadow-sm transition-shadow flex rounded-md items-center ${
        isChecked && "border-green-300 bg-green-50"
      }`}
    >
      <input
        type="radio"
        name={qid.toString()}
        id={inputId}
        value={id}
        className="hidden"
        // checked={isChecked}
        defaultChecked={checked}
        onChange={() => handleInput(qid, id.toString())}
      />
      <span className="font-semibold py-3 px-4 bg-gray-500 bg-opacity-20">
        {id}
      </span>
      <span className="mx-3">{text}</span>
    </label>
  );
};
