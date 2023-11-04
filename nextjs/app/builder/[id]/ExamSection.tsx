"use client";

import {
  SingleChoiceQuestion,
  AddQuestionPlaceholder,
  TrueFalseQuestion,
} from "@/app/builder/[id]/Question";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mcqActions } from "@/redux/builder/singleChoice-slice";
import { tofActions } from "@/redux/builder/trueFalse-slice";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

const ExamSection = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="w-[60%]">
      {/* Section of an exam (e.g., Single Choice) */}
      <CardHeader>
        <h2 className="text-xl font-bold">Single Choice</h2>
      </CardHeader>
      <Separator />
      <CardContent className="bg-primary-foreground rounded-lg pt-5 flex flex-col gap-4">
        {children}
      </CardContent>
    </Card>
  );
};

export const MultiChoiceSection = () => {
  const questions = useSelector((state: RootState) => state.mcq?.questions);
  const dispatch = useDispatch();

  const questionUpdateHandler = (id: number, newQuestion: Partial<MCQ>) => {
    dispatch(mcqActions.updateQuestion({ id, newQuestion }));
  };

  const addQuestionHandler = () => {
    const newQuestion: MCQ = {
      id: Math.random(),
      btLevel: null,
      type: "mcq",
      text: "",
      choices: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      answer: "C",
    };
    dispatch(mcqActions.addQuestion(newQuestion));
  };

  return (
    <ExamSection>
      {questions?.map((question, index) => {
        return (
          <SingleChoiceQuestion
            {...question}
            onUpdate={questionUpdateHandler}
            index={index}
            key={question.id}
          />
        );
      })}
      <AddQuestionPlaceholder onClick={addQuestionHandler} />
    </ExamSection>
  );
};

export const TrueFalseSection = () => {
  const questions = useSelector((state: RootState) => state.tof?.questions);
  const dispatch = useDispatch();

  const handleQuestion = (id: number, newQuestion: Partial<ToFQ>) => {
    dispatch(tofActions.updateQuestion({ id, newQuestion }));
  };

  return (
    <ExamSection>
      {questions?.map((question, index) => {
        return (
          <TrueFalseQuestion
            {...question}
            onUpdate={handleQuestion}
            index={index}
            key={question.id}
          />
        );
      })}
    </ExamSection>
  );
};
