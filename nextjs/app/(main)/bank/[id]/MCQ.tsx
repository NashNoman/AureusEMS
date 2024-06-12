import BankQuestionWrapper from "@/app/(main)/bank/[id]/BankQuestionWrapper";
import { useToast } from "@/components/ui/use-toast";
import { letters } from "@/constants/MCQ_LETTERS";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

type Props = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  answer: string;
  chapter: string;
  error?: string;
  btl?: number;
  onSave: (question: any) => void;
  onDelete: (id: string) => Promise<void>;
};

export default function MCQ({
  id,
  question,
  options,
  answer,
  chapter,
  error,
  btl,
  onDelete,
  onSave,
}: Props) {
  const [ans, setAns] = useState<string | null>(answer);
  const refs = useRef<HTMLDivElement[]>([]);
  const [edit, setEdit] = useState(id === "new");
  const [classifying, setClassifying] = useState(false);
  const { toast } = useToast();

  const handleSetAnswer = (id: string) => {
    if (!edit) return;
    setAns(id);
  };

  const handleSubmit = async () => {
    console.log(refs.current[0].innerText);

    const q: any = {
      id,
      chapter: refs.current[0].innerText,
      question: refs.current[1].innerText,
      type: "mcq",
      error,
      answer: ans,
    };
    q.options = options.map((option, i) => {
      return { id: option.id, text: refs.current[i + 2].innerText };
    });

    // Validate all fields
    const err = Object.entries(q).find(([, v]) => !v);

    if (err && !err.some((v) => v === "error")) {
      refs.current[err[0] === "question" ? 1 : 0].focus();
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    setEdit(false);
    setClassifying(true);
    await onSave(q);
    setClassifying(false);
  };

  const handleEdit = () => {
    if (edit && id === "new") {
      onDelete(id);
      return;
    }

    setEdit(!edit);
    refs.current[1].focus();
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <BankQuestionWrapper
      question={question}
      chapter={chapter}
      refs={refs}
      isEdit={edit}
      isClassifying={classifying}
      btl={btl}
      error={error}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onSave={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        {options.map((option, i) => (
          <MCQInput
            key={option?.id}
            option={option}
            order={i}
            answer={ans}
            qid={id}
            onSetAnswer={handleSetAnswer}
            isEdit={edit}
            refs={refs}
          />
        ))}
      </div>
    </BankQuestionWrapper>
  );
}

const MCQInput = ({
  option,
  order,
  answer,
  qid,
  isEdit,
  refs,
  onSetAnswer,
}: any) => {
  return (
    <div
      className={cn(
        "w-full flex gap-2 rounded-md transition-all outline outline-2 outline-transparent relative",
        isEdit && "outline-border focus-within:outline-blue-500"
      )}
    >
      <input
        type="radio"
        name={qid + ""}
        id={`${qid} ${order}`}
        value={option?.id}
        className="hidden"
        onChange={() => onSetAnswer(option?.id)}
      />

      <label
        htmlFor={`${qid} ${order}`}
        className={cn(
          "font-semibold py-1.5 pr-2 pl-2.5 rounded-md transition-all z-10",
          option?.id === answer
            ? "bg-green-50 outline outline-1 outline-green-400 text-primary dark:bg-green-500/20 dark:outline-green-500"
            : isEdit && "hover:bg-secondary cursor-pointer"
        )}
      >
        {letters[order]}
      </label>

      <p
        contentEditable={isEdit}
        tabIndex={2}
        ref={(r) => (refs.current[order + 2] = r)}
        className="flex-grow outline-none bg-transparent py-1.5"
      >
        {option?.text}
      </p>
    </div>
  );
};
