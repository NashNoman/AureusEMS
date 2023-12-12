import TableController from "@/app/(main)/TableController";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import DataTableBody from "@/components/DataTable/DataTableBody";
import DataTableHeader from "@/components/DataTable/DataTableHeader";
import DataTableItem from "@/components/DataTable/DataTableItem";
import DataTableRow from "@/components/DataTable/DataTableRow";
import { Button } from "@/components/ui/button";
import { ColumnWidth } from "@/enums";
import Course from "@/models/Course";
import Exam from "@/models/Exam";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const courses = await Course.find({ instructor: session?.user.id });

  const exams = await Exam.find({ course: { $in: courses } }).populate(
    "course"
  );

  const columns = [
    { title: "code", columnWidth: ColumnWidth.sm },
    { title: "course" },
    { title: "exam", columnWidth: ColumnWidth.sm, centered: true },
    { title: "status", columnWidth: ColumnWidth.sm, centered: true },
    { title: "due", columnWidth: ColumnWidth.sm, centered: true },
    { title: "updated", columnWidth: ColumnWidth.sm, centered: true },
    { title: "created", columnWidth: ColumnWidth.sm, centered: true },
  ];

  return (
    <main>
      <TableController />
      <DataTableHeader columns={columns} />
      <DataTableBody>
        {exams.map((exam: (typeof exams)[0]) => {
          const { id, status, title, course, due, updatedAt, createdAt } = exam;

          return (
            <DataTableRow key={id}>
              <DataTableItem columnWidth="sm">{status}</DataTableItem>
              <DataTableItem columnWidth="sm">{title}</DataTableItem>
              <DataTableItem>{course.title}</DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {due}
              </DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {updatedAt}
              </DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {createdAt}
              </DataTableItem>
            </DataTableRow>
          );
        })}
        {courses.map((course: (typeof courses)[0]) => {
          const { id, code, title, instructor: inst, exams } = course;
          const e = exams.filter((exam: any) => !exam.doc);
          if (e.length)
            return e.map((exam: any) => {
              return (
                <DataTableRow key={exam.id}>
                  <DataTableItem columnWidth="sm">{code}</DataTableItem>
                  <DataTableItem>{course.title}</DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    {exam.type}
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    -
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    -
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    -
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    -
                  </DataTableItem>
                </DataTableRow>
              );
            });
          else return null;
        })}
      </DataTableBody>
    </main>
  );
}
