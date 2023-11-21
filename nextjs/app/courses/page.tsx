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
    <div>
      <header className="mb-8 px-20">
        <div className="flex justify-between items-start">
          <h3>Courses</h3>
          <div className="p-2 text-sm border border-border rounded-xl flex items-center gap-2">
            <SearchIcon className="text-muted-foreground h-4" />
            <input
              type="text"
              className="bg-transparent outline-none"
              placeholder="Search"
              autoCorrect="false"
            />
            <kbd className="text-muted-foreground mr-1">/</kbd>
          </div>
        </div>
      </header>
      <h1 className="ml-20">Information Technology - CSIT</h1>
      <main className="mt-14">
        <div className="flex text-xs text-muted-foreground justify-between pr-36 px-20 items-center h-10 border-b border-accent">
          <div className="w-24">CODE</div>
          <div className="flex-grow">TITLE</div>
          <div className="w-64">INSTRUCTOR</div>
          <div className="w-24 text-center">CLO</div>
        </div>
        <ScrollArea>
          <div>
            {courses.map((course) => {
              const { id, code, title, instructor, clo } = course;
              return (
                <div
                  key={id}
                  className="cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors"
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
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
