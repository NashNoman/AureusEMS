"use client";

import {
  SingleChoiceQuestion,
  AddQuestionPlaceholder,
  TrueFalseQuestion,
} from "@/app/builder/[id]/Question";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReactNode, useState } from "react";

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
        <AddQuestionPlaceholder />
      </CardContent>
    </Card>
  );
};

export const SingleChoiceSection = ({
  questions,
}: {
  questions: SCQuestion[];
}) => {
  const [singleQuestions, setSingleQuestions] = useState<SCQuestion[]>([
    ...questions,
  ]);

  const handleInput = (id: number, value: string) => {
    setSingleQuestions((state) => {
      const oldQuestions = [...state];
      const questionId = state.findIndex((q) => q.id === id);
      oldQuestions[questionId].answer = value;
      return oldQuestions;
    });
  };

  const handleQuestion = (id: number, text: string) => {
    setSingleQuestions((state) => {
      const oldQuestions = [...state];
      const questionId = state.findIndex((q) => q.id === id);
      oldQuestions[questionId].question = text;
      console.log(text);

      return oldQuestions;
    });
  };

  return (
    <ExamSection>
      {singleQuestions.map((question, index) => {
        return (
          <SingleChoiceQuestion
            {...question}
            handleInput={handleInput}
            handleQuestion={handleQuestion}
            index={index}
            key={question.id}
          />
        );
      })}
    </ExamSection>
  );
};

export const TrueFalseSection = ({
  questions,
}: {
  questions: ToFQuestion[];
}) => {
  const handleQuestion = (id: number, text: string) => {};
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
