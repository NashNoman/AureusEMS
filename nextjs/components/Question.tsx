import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";

export const BuilderQuestion = ({ question, qNum }) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-bold text-xl">{qNum + 1}</h3>
        <div>
          <div className="bg-red-200 text-red-400 rounded-full font-bold text-center inline-block w-5 text-sm">
            <p>C</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-10">
        <p className="mb-7 font-semibold">{question.question}</p>
        <div className="flex flex-col gap-3">
          {question.choices.map((choice) => {
            return (
              <div className="flex gap-3 border p-3 rounded-lg hover:shadow-md cursor-pointer transition-shadow">
                <span className="text-secondary-foreground font-bold">
                  {choice.id}
                </span>
                <p>{choice.text}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export const BuilderAddQuestion = () => {
  return (
    <div className="rounded-lg border-dashed border-2 grid items-center justify-center cursor-pointer hover:bg-slate-100 transition-all aspect-[4/2]">
      <PlusIcon className="h-10 w-10 bg-red-100 rounded-full p-1" />
    </div>
  );
};
