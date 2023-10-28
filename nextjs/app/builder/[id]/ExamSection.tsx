"use client";

import {
  SingleChoiceQuestion,
  AddQuestionPlaceholder,
  TrueFalseQuestion,
} from "@/app/builder/[id]/Question";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const ExamSection = ({ questions, type }) => {
  let Section;

  switch (type) {
    case "scq":
      Section = SingleChoiceSection;
      break;
    case "tof":
      Section = TrueFalseSection;
  }

  return (
    <Card className="w-[60%]">
      {/* Section of an exam (e.g., Single Choice) */}
      <CardHeader>
        <h2 className="text-xl font-bold">Single Choice</h2>
      </CardHeader>
      <Separator />
      <CardContent className="bg-primary-foreground rounded-lg pt-5 flex flex-col gap-4">
        <Section questions={questions} />
        <AddQuestionPlaceholder />
      </CardContent>
    </Card>
  );
};

const SingleChoiceSection = ({ questions }) => {
  const [singleQuestions, setSingleQuestions] = useState([...questions]);

  const handleInput = (id, value) => {
    setSingleQuestions((state) => {
      const oldQuestions = [...state];
      const questionId = state.findIndex((q) => q.id === id);
      oldQuestions[questionId].answer = value;
      return oldQuestions;
    });
  };

  return (
    <>
      {singleQuestions.map((question, index) => {
        return (
          <SingleChoiceQuestion
            {...question}
            handleInput={handleInput}
            index={index}
            key={question.id}
          />
        );
      })}
    </>
  );
};

const TrueFalseSection = ({ questions }) => {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <TrueFalseQuestion {...question} index={index} key={question.id} />
        );
      })}
    </>
  );
};

export default ExamSection;
