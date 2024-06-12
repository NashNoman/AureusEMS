import BankQuestionWrapper from "@/app/(main)/bank/[id]/BankQuestionWrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

type Props = {
  id: string;
  question: string;
  answer: string;
  chapter: string;
  error?: string;
  btl?: number;
  onSave: (question: any) => void;
  onDelete: (id: string) => Promise<void>;
};

export default function TrueFalse({
  id,
  question,
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

  const handleSubmit = async () => {
    const q: any = {
      id,
      chapter: refs.current[0].innerText,
      question: refs.current[1].innerText,
      type: "trueFalse",
      error,
      answer: ans,
    };

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
      <div className="flex justify-between items-stretch gap-3">
        <Button
          onClick={() => setAns("0")}
          variant="secondary"
          className={cn(
            "flex-grow transition-all outline outline-transparent",
            ans === "0" &&
              "!bg-red-100 outline-2 !outline-red-400 dark:text-black/80"
          )}
        >
          False
        </Button>
        <Button
          onClick={() => setAns("1")}
          variant="secondary"
          className={cn(
            "flex-grow transition-all outline outline-transparent",
            ans === "1" &&
              "!bg-green-100 outline-2 !outline-green-400 dark:text-black/80"
          )}
        >
          True
        </Button>
      </div>
    </BankQuestionWrapper>
  );
}
