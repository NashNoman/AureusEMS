import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  DataTableBody,
  DataTableHeader,
  DataTableItem,
  DataTableRow,
} from "@/components/DataTable";
import { ColumnWidth } from "@/enums";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import Dept from "@/models/Dept";
import School from "@/models/School";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Courses - Aureus",
};

const columns = [
  { title: "code", columnWidth: ColumnWidth.sm },
  { title: "title" },
  { title: "instructor", columnWidth: ColumnWidth.lg },
  { title: "exams", columnWidth: ColumnWidth.sm, centered: true },
];

export default async function CoursesHome() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) notFound();

  const { user } = session;

  if (user.role.type !== "dean" && user.role.type !== "dept_head") notFound();

  if (user.role.type !== "dept_head") notFound();

  const dept = await Dept.findById(user.role.dept)
    .populate({
      path: "courses",
      model: Course,
      populate: { path: "instructor", model: User },
      options: { sort: { code: 1 } },
    })
    .populate({ path: "school", model: School });

  return (
    <>
      <h1 className="ml-20 mb-8 flex items-center">
        {dept.code}
        <div className="w-1 h-7 rounded-sm bg-primary/20 mx-3" />
        {dept.title}
      </h1>

      <DataTableHeader columns={columns} />
      <DataTableBody>
        {dept.courses.map((course: (typeof dept.courses)[0]) => {
          const { _id, code, title, instructor: inst, exams } = course;
          const availableExams = exams.filter((exam: any) => exam.doc).length;

          return (
            <Link href={`/courses/${code}`} key={_id}>
              <DataTableRow
                className={
                  course.clos ? "" : "bg-red-50 border-red-200 hover:bg-red-50"
                }
              >
                <DataTableItem columnWidth="sm">{code}</DataTableItem>
                <DataTableItem>{title}</DataTableItem>
                <DataTableItem columnWidth="lg">
                  {`${inst.firstName} ${inst.lastName}`}
                </DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {`${availableExams} / ${exams.length}`}
                </DataTableItem>
              </DataTableRow>
            </Link>
          );
        })}
      </DataTableBody>
    </>
  );
}


