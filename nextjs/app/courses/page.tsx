import { ScrollArea } from "@/components/ui/scroll-area";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import Dept from "@/models/Dept";
import User from "@/models/User";
import { CheckCircle2, XCircle } from "lucide-react";

export default async function CoursesHome() {
  await dbConnect();
  const dept = await Dept.findById("655a421d8dbcc5c428aa18f4").populate({
    path: "courses",
    model: Course,
    populate: { path: "instructor", model: User },
  });

  return (
    <>
      <h1 className="ml-20 text-3xl font-semibold mb-8">
        {dept.title} - {dept.code}
      </h1>

      <div className="flex text-xs text-muted-foreground justify-between pr-36 px-20 items-center h-10 border-b border-accent">
        <div className="w-24">CODE</div>
        <div className="flex-grow">TITLE</div>
        <div className="w-64">INSTRUCTOR</div>
        <div className="w-24 text-center">CLO</div>
      </div>
      <ScrollArea className="flex-grow overflow-y-auto">
        {dept.courses.map((course: (typeof dept.courses)[0]) => {
          const { id, code, title, instructor, clo } = course;

          return (
            <div
              key={id}
              className="w-full text-start cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors"
            >
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
            </div>
          );
        })}
      </ScrollArea>
    </>
  );
}
