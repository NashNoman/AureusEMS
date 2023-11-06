"use client";

import {
  SingleChoiceQuestion,
  AddQuestionPlaceholder,
  TrueFalseQuestion,
} from "@/components/builder/Question";
import SectionWrapper from "@/components/builder/SectionWrapper";
import { Input } from "@/components/ui/input";
import { mcqActions } from "@/redux/builder/mcq-slice";
import { useDispatch, useSelector } from "react-redux";

const SectionHeader = ({
  questionsNum,
  sectionTitle,
  sectionType,
}: {
  questionsNum: number;
  sectionTitle: string;
  sectionType: "mcq" | "tof";
}) => {
  const sectionInfo = useSelector((state: RootState) =>
    state.examInfo.sections.find((sec) => sec.type === sectionType)
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
  const dispatch = useDispatch();

  const addNewQuestion = () => {
    dispatch(mcqActions.addQuestion());
  };

  return (
    <SectionWrapper>
      <div className="p-7">
        <SectionHeader
          questionsNum={questionOrder?.length as number}
          sectionTitle="Multiple Choices"
          sectionType={"mcq"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 my-4 auto-rows-mcq">
        {questionOrder?.map((qid, idx) => (
          <SingleChoiceQuestion key={qid} id={qid} index={idx} />
        ))}
        <AddQuestionPlaceholder onClick={addNewQuestion} />
      </div>
    </SectionWrapper>
  );
};

export const TrueFalseSection = () => {
  const questionOrder = useSelector((state: RootState) => state.tof?.order);
  const dispatch = useDispatch();

  const addNewQuestion = () => {
    // dispatch(tofActions.addQuestion());
  };

  return (
    <SectionWrapper>
      <div className="p-7">
        <SectionHeader
          questionsNum={questionOrder?.length as number}
          sectionTitle="True or False"
          sectionType={"tof"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 my-4 auto-rows-tof">
        {questionOrder?.map((qid, idx) => (
          <TrueFalseQuestion key={qid} id={qid} index={idx} />
        ))}
        <AddQuestionPlaceholder onClick={addNewQuestion} />
      </div>
    </SectionWrapper>
  );
};
