import BuilderQuestion, {
  AddQuestionPlaceholder,
} from "@/components/BuilderQuestion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ExamSection = ({ questions }) => {
  return (
    <Card className="w-[60%]">
      {/* Section of an exam (e.g., Single Choice) */}
      <CardHeader>
        <h2 className="text-xl font-bold">Single Choice</h2>
      </CardHeader>
      <Separator />
      <CardContent className="bg-primary-foreground rounded-lg pt-5 flex flex-col gap-4">
        <SingleChoiceSection questions={questions} />
        <AddQuestionPlaceholder />
      </CardContent>
    </Card>
  );
};

const SingleChoiceSection = ({ questions }) => {
  return (
    <>
      {questions.map((question, id) => {
        return (
          <BuilderQuestion question={question} qNum={id} key={question.id} />
        );
      })}
    </>
  );
};

export default ExamSection;
