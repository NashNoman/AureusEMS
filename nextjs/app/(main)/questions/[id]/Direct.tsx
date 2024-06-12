import BankQuestionWrapper from "@/app/(main)/questions/[id]/BankQuestionWrapper";

type Props = {
  q: any;
  code: string;
};

export default function Direct({ q, code }: Props) {
  console.log(q);

  return (
    <BankQuestionWrapper
      id={q.id}
      code={code}
      question={q.question}
      chapter={q.chapter}
      btl={q.btl}
      error={q.error}
    >
      <div></div>
    </BankQuestionWrapper>
  );
}
