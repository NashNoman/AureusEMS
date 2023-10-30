"use client";

export const SingleChoiceInput = ({
  id,
  text,
  isChecked,
  onChange,
  qid,
}: {
  id: string;
  text: string;
  isChecked: boolean;
  onChange: (id: number, value: string) => void;
  qid: number;
}) => {
  const inputId = id.toString() + qid.toString();
  return (
    <label
      htmlFor={inputId}
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
        // checked={isChecked}
        defaultChecked={isChecked}
        onChange={() => onChange(qid, id.toString())}
      />
      <span className="font-semibold py-3 px-4 bg-gray-500 bg-opacity-20">
        {id}
      </span>
      <span className="mx-3">{text}</span>
    </label>
  );
};
