import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, SearchIcon, XCircle } from "lucide-react";

const columns = ["CODE", "TITLE", "INSTRUCTOR", "CLO"];
const courses = [
  {
    id: "asdaf",
    code: "CSCI100",
    title: "Introduction",
    instructor: "omar fakih",
    clo: true,
  },
  {
    id: "asdaf",
    code: "CSCI100",
    title: "Introduction",
    instructor: "omar fakih",
    clo: false,
  },
  {
    id: "asdaf",
    code: "CSCI100",
    title: "Introduction",
    instructor: "omar fakih",
    clo: false,
  },
  {
    id: "asdaf",
    code: "CSCI100",
    title: "Introduction",
    instructor: "omar fakih",
    clo: true,
  },
];

export default async function CoursesHome() {
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
      <ScrollArea>
        <main className="mt-14">
          <div className="flex text-xs text-muted-foreground justify-between pr-36 px-20 items-center h-10 border-b border-accent">
            <div className="w-24">CODE</div>
            <div className="flex-grow">TITLE</div>
            <div className="w-64">INSTRUCTOR</div>
            <div className="w-24 text-center">CLO</div>
          </div>
          <div>
            {courses.map((course) => {
              return (
                <div className="cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors">
                  <div className="w-24">{course.code}</div>
                  <div className="flex-grow">{course.title}</div>
                  <div className="w-64">{course.instructor}</div>
                  <div className="w-24">
                    {course.clo ? (
                      <CheckCircle2 className="m-auto w-5" />
                    ) : (
                      <XCircle className="m-auto h-5 text-destructive" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
