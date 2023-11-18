type SectionHeaderProps = {
  title: string;
  questionsNum: number;
  grade: number;
};

export default function SectionHeader({
  title,
  questionsNum,
  grade,
}: SectionHeaderProps) {
  return (
    <section className="flex justify-between px-4">
      <div>
        {/* <p className="font-bold text-sm text-muted-foreground">A</p> */}
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Questions: ({questionsNum})
        </p>
      </div>
      <p className="text-muted-foreground">grade ({grade}/10)</p>
    </section>
  );
}
