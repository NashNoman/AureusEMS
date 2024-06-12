import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export default function MisalignedExamQuestionsDialog({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Exam</DialogTitle>
          <DialogDescription>Choose exam type.</DialogDescription>
        </DialogHeader>
        <div>
          {/* <form action="">
                <Label>Exam date</Label>
              </form> */}
        </div>
        {/* <DialogFooter>
              <Button>Create exam</Button>
            </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
