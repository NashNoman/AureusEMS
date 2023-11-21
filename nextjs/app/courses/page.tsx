import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon } from "lucide-react";

const columns = ["CODE", "TITLE", "INSTRUCTOR", "CLO"];
const course = [
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
        <main>
          <Table className="mt-14 border-b border-accent">
            <TableHeader>
              <TableRow className="border-accent">
                {columns.map((col) => (
                  <TableHead key={col} className="">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {course.map((c) => (
                <TableRow key={c.id} className="border-accent h-16">
                  <TableCell>{c.code}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.instructor}</TableCell>
                  <TableCell>{c.clo ? "true" : "false"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </ScrollArea>
    </div>
  );
}
