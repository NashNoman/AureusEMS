import HomepageTable from "@/app/(main)/HomepageTable";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ColumnWidth } from "@/enums";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import Exam from "@/models/Exam";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  await dbConnect();

  const courses = await Course.find({ instructor: session?.user.id }).populate(
    "exams.doc",
    Exam
  );

  const exams = courses
    .map((course: any) => {
      return course.exams.map((exam: any) => {
        const { _id, type, percentage, doc } = exam;
        return {
          id: _id,
          type,
          percentage,
          doc,
          courseTitle: course.title,
          courseCode: course.code,
          courseId: course.id,
        };
      });
    })
    .reduce((acc, val) => acc.concat(val), []);

  const columns = [
    { title: "code", columnWidth: ColumnWidth.sm },
    { title: "course" },
    { title: "exam", columnWidth: ColumnWidth.sm, centered: true },
    { title: "percentage", columnWidth: ColumnWidth.sm, centered: true },
    { title: "status", columnWidth: ColumnWidth.sm, centered: true },
    { title: "due", columnWidth: ColumnWidth.sm, centered: true },
    { title: "updated", columnWidth: ColumnWidth.sm, centered: true },
    { title: "created", columnWidth: ColumnWidth.sm, centered: true },
  ];

  return (
    <main>
      <HomepageTable columns={columns} examsData={exams} />
    </main>
  );
}
