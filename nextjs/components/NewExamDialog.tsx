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
        <div className="p-3 flex flex-col gap-3">
          <Label>Exam date</Label>
          <Popover>
            <PopoverTrigger asChild className="mb-4">
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex gap-3 justify-center">
            <div
              className={cn(
                "flex flex-col items-center outline px-4 py-6 outline-border gap-2 cursor-pointer rounded-sm flex-grow text-muted transition-colors",
                type === "paper" && "outline-primary text-primary"
              )}
              onClick={() => setType("paper")}
            >
              <File className="h-10 w-10" />
              <p>Paper</p>
            </div>
            <div
              className={cn(
                "flex flex-col items-center outline px-4 py-6 outline-border gap-2 cursor-pointer rounded-sm flex-grow text-muted transition-colors",
                type === "electronic" && "outline-primary text-primary"
              )}
              onClick={() => setType("electronic")}
            >
              <LucideComputer className="h-10 w-10" />
              <p>Electronic</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button>Create exam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
