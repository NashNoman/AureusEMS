import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function DataTableRow({ children }: Props) {
  return (
    <div className="w-full text-start cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors">
      {children}
    </div>
  );
}
