const array = [1, 2, 3, 4, 5];

export default function MCQSectionBody() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {array.map((num) => (
        <div
          key={num}
          className="bg-background min-h-[23rem] rounded-sm border"
        >
          {num}
        </div>
      ))}
    </div>
  );
}
