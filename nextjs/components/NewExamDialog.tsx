import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, File, LucideComputer } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  exam: any;
};

export default function NewExamDialog({ children, exam }: Props) {
  const [type, setType] = useState<"paper" | "electronic">("paper");
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Exam</DialogTitle>
          <DialogDescription>Choose exam type.</DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter>
          <Button>Create exam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
