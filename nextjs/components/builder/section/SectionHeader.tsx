type SectionHeaderProps = {
  title: string;
  questionsNum: number;
  mark: number;
};

export default function SectionHeader({
  title,
  questionsNum,
  mark,
}: SectionHeaderProps) {
  return (
    <section className="flex justify-between">
      <div>
        {/* <p className="font-bold text-sm text-muted-foreground">A</p> */}
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="ml-4 text-sm text-muted-foreground">
          questions: ({questionsNum})
        </p>
      </div>
      <p className="text-muted-foreground">
        <b>marks</b> ({mark}/10)
      </p>
    </section>
  );
}
