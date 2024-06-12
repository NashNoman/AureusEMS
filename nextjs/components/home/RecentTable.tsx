import { ColumnWidth } from "@/enums";
import { useMemo } from "react";

const columns = [
  { title: "code", columnWidth: ColumnWidth.sm },
  { title: "title" },
  { title: "exam", columnWidth: ColumnWidth.sm },
  { title: "percentage", columnWidth: ColumnWidth.sm },
  { title: "status", columnWidth: ColumnWidth.sm, centered: true },
  { title: "activity", centered: true, columnWidth: ColumnWidth.md },
  { title: "due", columnWidth: ColumnWidth.sm, centered: true },
  { title: "updated", columnWidth: ColumnWidth.sm, centered: true },
  { title: "created", columnWidth: ColumnWidth.sm, centered: true },
];

export default function RecentTable({ courses }: { courses: any[] }) {
  const exams = useMemo(
    () =>
      courses
        .map((course: any) => {
          return course.exams.map((exam: any) => {
            const { _id, type, percentage, doc } = exam;
            return {
              id: _id.toString(),
              type,
              percentage,
              doc,
              courseTitle: course.title,
              courseCode: course.code,
              courseId: course.id,
            };
          });
        })
        .reduce((acc, val) => acc.concat(val), [])
        .filter((exam: any) => exam.doc),
    [courses]
  );

  return exams ? <div>Exams</div> : <p>no exams have been created yet</p>;
}
