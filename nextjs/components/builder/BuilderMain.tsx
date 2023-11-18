import { useSelector } from "react-redux";

export default function BuilderMain() {
  const examInfo = useSelector((state) => state.examInfo);

  return (
    <main className="flex flex-col pb-20 pt-4 items-center gap-4 overflow-y-auto h-[calc(100%-3rem)]">
      {/* {children} */}
    </main>
  );
}
