"use client";

import { useState } from "react";

const nums = [1, 2, 3, 4];

export default function MCQInput() {
  const uid = Math.random();

  return (
    <div className="mb-4">
      {nums.map((num, index) => {
        return <Input key={num} order={index} qid={uid} />;
      })}
    </div>
  );
}

const letters = ["A", "B", "C", "D"];

const Input = ({ order, qid }: { order: number; qid: number }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div
      key={order}
      className={`my-2 w-full flex gap-1 p-2 rounded-md transition-all hover:shadow-sm ${
        isChecked && "bg-green-100 outline-green-200 "
      }`}
    >
      <input
        type="radio"
        name={qid + ""}
        id={`${qid} ${order}`}
        className="hidden"
        onChange={(e) => setIsChecked(e.target.checked)}
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
        defaultValue={`Answer ${order}`}
      />
    </div>
  );
};
