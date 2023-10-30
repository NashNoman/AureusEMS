"use client";

import {
  SingleChoiceQuestion,
  AddQuestionPlaceholder,
  TrueFalseQuestion,
} from "@/app/builder/[id]/Question";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { singleChoiceActions } from "@/redux/builder/singleChoice-slice";
import { trueFalseActions } from "@/redux/builder/trueFalse-slice";
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

export const SingleChoiceSection = () => {
  const questions = useSelector(
    (state: RootState) => state.singleChoice.questions
  );
  const dispatch = useDispatch();

  const handleQuestion = (id: number, text: string) => {
    dispatch(singleChoiceActions.setQuestion({ id, text }));
  };

  const handleAnswer = (id: number, value: string) => {
    dispatch(singleChoiceActions.setAnswer({ id, value }));
  };

  const addQuestionHandler = () => {
    const newQuestion: SCQuestion = {
      id: Math.random(),
      btLevel: null,
      qType: "scq",
      text: "",
      choices: [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ],
      answer: "C",
    };
    dispatch(singleChoiceActions.addQuestion(newQuestion));
  };

  const onChoiceChange = (id: number, choiceId: string, text: string) => {
    dispatch(singleChoiceActions.setChoice({ id, choiceId, text }));
  };

  return (
    <ExamSection>
      {questions.map((question, index) => {
        return (
          <SingleChoiceQuestion
            {...question}
            onQuestionChange={handleQuestion}
            onAnswerChange={handleAnswer}
            onChoiceChange={onChoiceChange}
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
  const questions = useSelector(
    (state: RootState) => state.trueFalse.questions
  );
  const dispatch = useDispatch();

  const handleQuestion = (id: number, value: string) => {
    dispatch(trueFalseActions.setQuestion({ id, value }));
  };

  return (
    <ExamSection>
      {questions.map((question, index) => {
        return (
          <TrueFalseQuestion
            {...question}
            handleQuestion={handleQuestion}
            index={index}
            key={question.id}
          />
        );
      })}
    </ExamSection>
  );
};
