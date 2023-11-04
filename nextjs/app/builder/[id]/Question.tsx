import { SingleChoiceInput } from "@/app/builder/[id]/Input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import ContentEditable from "react-contenteditable";
import { useSelector } from "react-redux";

const QuestionWrapper = ({
  children,
  question,
  id,
  onChange,
  index,
}: {
  children: ReactNode;
  question: string;
  id: number;
  onChange: (id: number, newQuestion: Partial<MCQ> & Partial<ToFQ>) => void;
  index: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-bold text-xl">{index + 1}</h3>
        <div>
          <div className="bg-red-200 text-red-400 rounded-full font-bold text-center inline-block w-5 text-sm">
            <p>C</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-10 px-10">
        <ContentEditable
          className="mb-6"
          html={question}
          onChange={(e) => onChange(id, { text: e.target.value })}
        />
        {children}
      </CardContent>
    </Card>
  );
};

export const SingleChoiceQuestion = ({
  id,
  index,
}: {
  id: number;
  index: number;
}) => {
  const question = useSelector((state: RootState) =>
    state.mcq?.questions.find((q) => q.id === id)
  ) as MCQ;

  return (
    <Card className="min-h-[20rem]">
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-bold text-xl">{index + 1}</h3>
        <div>
          <div className="bg-red-200 text-red-400 rounded-full font-bold text-center inline-block w-5 text-sm">
            <p>C</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ContentEditable
          className="mb-10"
          html={question.text}
          onChange={() => {}}
        />
        <div className="flex flex-col gap-4">
          {question.choices.map((choice) => (
            <SingleChoiceInput
              {...choice}
              qid={id}
              onUpdate={() => {}}
              onChoiceUpdate={() => {}}
              isChecked={choice.id.toString() === question.answer}
              key={choice.id}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // const updateChoice = (choiceId: string, text: string) => {
  //   const currentChoices = [...choices];
  //   const choiceIndex = currentChoices.findIndex((ch) => ch.id === choiceId);
  //   currentChoices[choiceIndex] = { id: choiceId, text };
  //   onUpdate(id, { choices: currentChoices });
  // };

  // return (
  //   <QuestionWrapper index={index} id={id} onChange={onUpdate} question={text}>
  //     <div className="flex flex-col gap-3">
  //       {choices.map((choice) => {
  //         return (
  //           <SingleChoiceInput
  //             {...choice}
  //             qid={id}
  //             onUpdate={onUpdate}
  //             onChoiceUpdate={updateChoice}
  //             isChecked={choice.id.toString() === answer}
  //             key={choice.id}
  //           />
  //         );
  //       })}
  //     </div>
  //   </QuestionWrapper>
  // );
};

export const TrueFalseQuestion = ({
  text,
  answer,
  onUpdate,
  id,
  index,
}: {
  text: string;
  answer: 1 | 0;
  onUpdate: (id: number, newQuestion: Partial<ToFQ>) => void;
  id: number;
  index: number;
}) => {
  const cn =
    "bg-gray-200 px-20 py-2 cursor-pointer font-semibold text-gray-600 rounded-sm hover:shadow-sm transition-shadow";

  return (
    <QuestionWrapper index={index} id={id} onChange={onUpdate} question={text}>
      <div className="flex justify-center gap-10">
        <input
          type="radio"
          name={id.toString()}
          value={1}
          id={id + "t"}
          className="hidden"
          checked={answer === 1}
          onChange={() => onUpdate(id, { answer: 1 })}
        />
        <label htmlFor={id + "t"} className={cn}>
          True
        </label>
        <input
          type="radio"
          name={id.toString()}
          value={0}
          id={id + "f"}
          className="hidden"
          checked={answer === 0}
          onChange={() => onUpdate(id, { answer: 0 })}
        />
        <label htmlFor={id + "f"} className={cn}>
          False
        </label>
      </div>
    </QuestionWrapper>
  );
};

export const AddQuestionPlaceholder = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <Card
      className="rounded-lg border-dashed border-secondary opacity-30 border-2 bg-popover grid items-center justify-center cursor-pointer hover:bg-muted-foreground transition-all"
      onClick={onClick}
    >
      <PlusIcon className="h-16 w-16 bg-primary rounded-full p-3 text-primary-foreground opacity-50" />
    </Card>
  );
};
