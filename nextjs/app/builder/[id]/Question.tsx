import { SingleChoiceInput } from "@/app/builder/[id]/Input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";

const QuestionCard = ({ children, index }) => {
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
      <CardContent className="pb-10">{children}</CardContent>
    </Card>
  );
};

export const SingleChoiceQuestion = ({
  question,
  choices,
  answer,
  id,
  index,
}) => {
  return (
    <QuestionCard index={index}>
      <p className="mb-7 font-semibold">{question}</p>
      <div className="flex flex-col gap-3">
        {choices.map((choice) => {
          return (
            <SingleChoiceInput
              {...choice}
              qid={id}
              isChecked={choice.id === answer}
            />
          );
        })}
      </div>
    </QuestionCard>
  );
};

export const TrueFalseQuestion = ({ question, id, index }) => {
  const cn =
    "bg-gray-200 px-20 py-2 cursor-pointer font-semibold text-gray-600 rounded-sm hover:shadow-sm transition-shadow";
  return (
    <QuestionCard index={index}>
      <p className="font-semibold mb-8">{question}</p>
      <div className="flex justify-center gap-10">
        <input
          type="radio"
          name={id}
          value={1}
          id={id + "t"}
          className="hidden"
        />
        <label htmlFor={id + "t"} className={cn}>
          True
        </label>

        <input
          type="radio"
          name={id}
          value={1}
          id={id + "f"}
          className="hidden"
        />
        <label htmlFor={id + "f"} className={cn}>
          False
        </label>
      </div>
    </QuestionCard>
  );
};

export const AddQuestionPlaceholder = () => {
  return (
    <div className="rounded-lg border-dashed border-2 grid items-center justify-center cursor-pointer hover:bg-slate-100 transition-all h-40">
      <PlusIcon className="h-10 w-10 bg-slate-200 rounded-full p-1 text-slate-500" />
    </div>
  );
};
