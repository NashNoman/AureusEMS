export default function SectionHeader() {
  return (
    <section className="flex justify-between">
      <div>
        {/* <p className="font-bold text-sm text-muted-foreground">A</p> */}
        <h2 className="font-bold text-2xl">Multiple Choices</h2>
        <p className="ml-4 text-sm text-muted-foreground">questions: (3)</p>
      </div>
      <p className="text-muted-foreground">
        <b>marks</b> (5/10)
      </p>
    </section>
  );
}
