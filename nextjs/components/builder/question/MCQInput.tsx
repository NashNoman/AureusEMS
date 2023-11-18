"use client";

import { useState } from "react";

const nums = [1, 2, 3, 4];

type MCQInputProps = {
  choices: { id: string; text: string }[];
  answer: string;
};

export default function MCQInput({ choices, answer }: MCQInputProps) {
  const uid = Math.random();

  return (
    <div className="mb-4">
      {choices.map((choice, index) => {
        return (
          <Input
            key={choice.id}
            order={index}
            qid={uid}
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
      className={`my-2 w-full flex gap-1 p-2 rounded-md transition-all hover:shadow-sm ${
        choice.id === answer && "bg-green-100 outline-green-200 "
      }`}
    >
      <input
        type="radio"
        name={qid + ""}
        id={`${qid} ${order}`}
        className=""
        onChange={(e) => {}}
      />
      <label
        htmlFor={`${qid} ${order}`}
        className="font-semibold cursor-pointer"
      >
        {letters[order]})
      </label>
      <input
        type="text"
        className="flex-grow outline-none bg-transparent"
        defaultValue={choice.text}
      />
    </div>
  );
};
