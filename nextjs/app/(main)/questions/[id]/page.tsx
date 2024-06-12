import MCQ from "@/app/(main)/questions/[id]/MCQ";
import TrueFalse from "@/app/(main)/questions/[id]/TrueFalse";
import Direct from "@/app/(main)/questions/[id]/Direct";

import { notFound } from "next/navigation";
import Notifi from "@/models/Notifi";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Questions - Aureus",
};

const QUESTION = {
  mcq: MCQ,
  trueFalse: TrueFalse,
  direct: Direct,
};

export default async function page({ params }: { params: { id: string } }) {
  const notifi = await Notifi.findById(params.id).populate("questions");

  if (!notifi) return notFound();

  return (
    <div>
      <h1 className="mx-20">{notifi.title}</h1>
      <Separator className="my-4" />
      <div className="grid grid-cols-3 mx-20 gap-4">
        {notifi.questions.map((q: any) => {
          const Question = QUESTION[q.type as keyof typeof QUESTION];
          console.log(q);
          return <Question key={q.id} q={q} code={notifi.title} />;
        })}
      </div>
    </div>
  );
}
