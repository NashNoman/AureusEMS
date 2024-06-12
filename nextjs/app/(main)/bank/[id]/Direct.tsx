import BankQuestionWrapper from "@/app/(main)/bank/[id]/BankQuestionWrapper";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
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

export default function Direct({
  id,
  question,
  answer,
  chapter,
  error,
  btl,
  onDelete,
  onSave,
}: Props) {
  const refs = useRef<HTMLDivElement[]>([]);
  const [edit, setEdit] = useState(id === "new");
  const [classifying, setClassifying] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    const q: any = {
      id,
      chapter: refs.current[0].innerText,
      question: refs.current[1].innerText,
      type: "direct",
      error,
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
        {/* <Textarea
          className="resize-none"
          placeholder="Answer"
          value={ans || ""}
          onChange={(e) => setAns(e.target.value)}
        /> */}
      </div>
    </BankQuestionWrapper>
  );
}
