import BankQuestionWrapper from "@/app/(main)/questions/[id]/BankQuestionWrapper";
import { letters } from "@/constants/MCQ_LETTERS";
import { cn } from "@/lib/utils";

type Props = {
  q: any;
  code: string;
};

export default function MCQ({ q, code }: Props) {
  return (
    <BankQuestionWrapper
      id={q.id}
      code={code}
      question={q.question}
      chapter={q.chapter}
      btl={q.btl}
      error={q.error}
    >
      <div className="flex flex-col gap-3">
        {q.options.map((option, i) => (
          <MCQInput
            key={option?.id}
            option={option}
            order={i}
            qid={q.id}
            answer={q.answer}
          />
        ))}
      </div>
    </BankQuestionWrapper>
  );
}

const MCQInput = ({ option, order, answer, qid }: any) => {
  return (
    <div
      className={cn(
        "w-full flex gap-2 rounded-md transition-all outline outline-2 outline-transparent relative"
      )}
    >
      {/* <input
        type="radio"
        name={qid + ""}
        id={`${qid} ${order}`}
        value={option?.id}
        className="hidden"
        onChange={() => onSetAnswer(option?.id)}
      /> */}

      <label
        htmlFor={`${qid} ${order}`}
        className={cn(
          "font-semibold py-1.5 pr-2 pl-2.5 rounded-md transition-all z-10",
          option?.id === answer &&
            "bg-green-50 outline outline-1 outline-green-400 text-primary dark:bg-green-500/20 dark:outline-green-500"
        )}
      >
        {letters[order]}
      </label>

      <p tabIndex={2} className="flex-grow outline-none bg-transparent py-1.5">
        {option?.text}
      </p>
    </div>
  );
};
