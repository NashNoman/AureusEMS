"use client";

import {
  SingleChoiceQuestion,
  AddQuestionPlaceholder,
  TrueFalseQuestion,
} from "@/app/builder/[id]/Question";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mcqActions } from "@/redux/builder/mcq-slice";
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

const SectionHeader = ({
  questionsNum,
  sectionTitle,
}: {
  questionsNum: number;
  sectionTitle: string;
}) => {
  const sectionInfo = useSelector((state: RootState) =>
    state.examInfo.sections.find((sec) => sec.type === "mcq")
  );
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="mb-2">{sectionTitle}</h1>
        <p>Questions: {questionsNum}</p>
      </div>
      <div className="flex items-center gap-1">
        <Input className="w-10" value={sectionInfo?.sectionGrade} />
        <span className="text-sm">/100</span>
        <span className="text-sm">({sectionInfo?.sectionPercentage}%)</span>
      </div>
    </div>
  );
};

export const MultiChoiceSection = () => {
  const questionOrder = useSelector((state: RootState) => state.mcq?.order);
  console.log("mcq section rendered");

  const dispatch = useDispatch();

  const addNewQuestion = () => {
    dispatch(mcqActions.addQuestion());
  };

  return (
    <div className="min-w-[80%] p-2 bg-secondary rounded-md">
      <div className="p-7">
        <SectionHeader
          questionsNum={questionOrder?.length as number}
          sectionTitle="Multiple Choices"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 my-4 ">
        {questionOrder?.map((qid, idx) => (
          <SingleChoiceQuestion key={qid} id={qid} index={idx} />
        ))}
        <AddQuestionPlaceholder onClick={addNewQuestion} />
      </div>
    </div>
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
