import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

export default function DataTableBody({ children }: { children: ReactNode }) {
  return (
    <ScrollArea className="flex-grow overflow-y-auto">{children}</ScrollArea>
  );
}
