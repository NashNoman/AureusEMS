import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  num: number;
};

export default function BuilderQuestionWrapper({
  children,
  num,
}: WrapperProps) {
  return (
    <div className="bg-background min-h-[16rem] pb-2 rounded-sm outline outline-transparent focus-within:!outline-gray-400 focus-within:outline-2 hover:shadow-md focus-within:shadow-md hover:outline-border transition-all">
      <div className="flex justify-between items-center px-6 pt-4 mb-4">
        <div className="flex items-baseline gap-1">
          <p className="font-bold text-xl text-muted-foreground">{num + 1}</p>
          <span className="text-blue-500 bg-blue-100 px-1.5 py-0.5  text-xs font-semibold rounded-full aspect-square scale-75">
            R
          </span>
        </div>
        <Cross1Icon className="cursor-pointer text-muted-foreground hover:bg-accent transition-all p-1 h-6 w-6 rounded-full" />
      </div>
      <div className="px-6">{children}</div>
    </div>
  );
}
