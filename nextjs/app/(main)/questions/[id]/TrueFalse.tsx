import BankQuestionWrapper from "@/app/(main)/questions/[id]/BankQuestionWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  q: any;
  code: string;
};

export default function TrueFalse({ q, code }: Props) {
  return (
    <BankQuestionWrapper
      id={q.id}
      code={code}
      question={q.question}
      chapter={q.chapter}
      btl={q.btl}
      error={q.error}
    >
      <div className="flex justify-between items-stretch gap-3">
        <Button
          variant="secondary"
          className={cn(
            "flex-grow transition-all outline outline-transparent",
            q.answer === "0" &&
              "!bg-red-100 outline-2 !outline-red-400 dark:text-black/80"
          )}
        >
          False
        </Button>
        <Button
          variant="secondary"
          className={cn(
            "flex-grow transition-all outline outline-transparent",
            q.answer === "1" &&
              "!bg-green-100 outline-2 !outline-green-400 dark:text-black/80"
          )}
        >
          True
        </Button>
      </div>
    </BankQuestionWrapper>
  );
}
