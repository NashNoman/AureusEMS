"use client";

import { TabsContent } from "@/components/ui/tabs";
import { addQuestion } from "@/actions/bank";
import TrueFalse from "@/app/(main)/bank/[id]/TrueFalse";
import MCQ from "@/app/(main)/bank/[id]/MCQ";
import { Button } from "@/components/ui/button";
import { socket } from "@/components/NotificationButton";
import { cn } from "@/lib/utils";
import { memo } from "react";
import Direct from "@/app/(main)/bank/[id]/Direct";

const QUESTION = {
  mcq: MCQ,
  trueFalse: TrueFalse,
  direct: Direct,
};

const QuestionsContent = ({
  type,
  bankId,
  questions,
  updateQuestions,
  onDelete,
}: {
  type: "mcq" | "trueFalse" | "direct";
  bankId: string;
  questions: any[];
  updateQuestions: (question: any, prevId: string | undefined) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const saveQuestion = async (question: any) => {
    const res = await addQuestion(bankId, question);

    console.log(res);

    if (res.dept_head) {
      const notifi = {
        instructorId: res.dept_head,
        message: "notification",
      };

      delete res.dept_head;
      socket.send(JSON.stringify(notifi));
    }

    updateQuestions(res, question.id);
  };

  const Question = QUESTION[type as keyof typeof QUESTION];

  return (
    <>
      <TabsContent value={type}>
        <div
          className={cn(
            "grid grid-cols-3 gap-3 px-[4.5rem] pt-1",
            questions.length === 0 && "grid-cols-1 justify-center"
          )}
        >
          {questions.length > 0 ? (
            questions.map((q) => {
              return (
                <Question
                  key={q.id}
                  {...q}
                  onSave={saveQuestion}
                  onDelete={onDelete}
                />
              );
            })
          ) : (
            <p className="mx-auto text-primary/40 mt-56">
              No question available
            </p>
          )}
        </div>
      </TabsContent>
    </>
  );
};

export default memo(QuestionsContent);
