import NotificationButton from "@/components/NotificationButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import User from "@/models/User";
import { CheckCircle2, SearchIcon, XCircle } from "lucide-react";

export default async function CoursesHome() {
  await dbConnect();
  let courses = [];
  courses = await Course.find({
    dept: "655a421d8dbcc5c428aa18f4",
  }).populate({ path: "instructor", model: User });

  return (
    <div className="h-[calc(100%-5rem)] overflow-hidden flex flex-col">
      <h1 className="ml-20 h-16">Information Technology - CSIT</h1>
      <ScrollArea className="flex-grow mt-14">
        <main className="">
          <div className="flex text-xs text-muted-foreground justify-between pr-36 px-20 items-center h-10 border-b border-accent">
            <div className="w-24">CODE</div>
            <div className="flex-grow">TITLE</div>
            <div className="w-64">INSTRUCTOR</div>
            <div className="w-24 text-center">CLO</div>
          </div>
          <div className="overflow-y-auto">
            {courses.map((course) => {
              const { id, code, title, instructor, clo } = course;
              return (
                <Dialog key={id}>
                  <DialogTrigger className="w-full text-start cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors">
                    <div className="w-24">{code}</div>
                    <div className="flex-grow">{title}</div>
                    <div className="w-64">{`${instructor.firstName} ${instructor.lastName}`}</div>
                    <div className="w-24">
                      {clo ? (
                        <CheckCircle2 className="m-auto w-5" />
                      ) : (
                        <XCircle className="m-auto h-5 text-destructive" />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent>{/* TODO: create dialog UI */}</DialogContent>
                </Dialog>
              );
            })}
            {courses.map((course) => {
              const { id, code, title, instructor, clo } = course;
              return (
                <Dialog key={id}>
                  <DialogTrigger className="w-full text-start cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors">
                    <div className="w-24">{code}</div>
                    <div className="flex-grow">{title}</div>
                    <div className="w-64">{`${instructor.firstName} ${instructor.lastName}`}</div>
                    <div className="w-24">
                      {clo ? (
                        <CheckCircle2 className="m-auto w-5" />
                      ) : (
                        <XCircle className="m-auto h-5 text-destructive" />
                      )}
                    </div>
                  </DialogTrigger>
                  <DialogContent>{/* TODO: create dialog UI */}</DialogContent>
                </Dialog>
              );
            })}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
