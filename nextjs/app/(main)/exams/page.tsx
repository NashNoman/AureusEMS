import {
  DataTableBody,
  DataTableHeader,
  DataTableItem,
  DataTableRow,
} from "@/components/DataTable";
import { ColumnWidth } from "@/enums";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import Exam from "@/models/Exam";
import User from "@/models/User";
import { title } from "process";
import moment from "moment";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";

export default async function ExamsHome() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  if (user.role.type !== "dean" && user.role.type !== "dept_head") return null;

  if (user.role.type !== "dept_head") return null;

  const deptCoursesIds = await Course.find(
    { dept: user.role.dept },
    { _id: 1 }
  );

  const exams = await Exam.find({ course: { $in: deptCoursesIds } }).populate({
    path: "course",
    model: Course,
    populate: { path: "instructor", model: User },
  });

  const columns = [
    { title: "code", columnWidth: ColumnWidth.sm },
    { title: "course", columnWidth: ColumnWidth.lg },
    { title: "Exam Date", columnWidth: ColumnWidth.sm, centered: true },
    { title: "create Date", columnWidth: ColumnWidth.sm, centered: true },
    { title: "update", columnWidth: ColumnWidth.sm, centered: true },
    { title: "exam type", columnWidth: ColumnWidth.sm, centered: true },
    { title: "percentage", columnWidth: ColumnWidth.sm, centered: true },
    { title: "exams status", columnWidth: ColumnWidth.sm, centered: true },
  ];

  return (
    <>
      <h1 className="ml-20 mb-8 flex items-center">
        CSIT
        <div className="w-1 h-7 rounded-sm bg-primary/20 mx-3" />
        Information Technology
      </h1>

      <DataTableHeader columns={columns} />
      <DataTableBody>
        {exams.length > 0 ? (
          exams.map((exam) => {
            const { id, code, sections, percentage, status, course, type } =
              exam;
            return (
              <DataTableRow key={id}>
                <DataTableItem columnWidth="sm">{course.code}</DataTableItem>
                <DataTableItem columnWidth="lg">{course.title}</DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {exam.due.toLocaleDateString("en-US")}
                </DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {exam.created.toLocaleDateString("en-US")}
                </DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {moment(exam.updated).fromNow()}
                </DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {type}
                </DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {`${percentage} %`}
                </DataTableItem>
                <DataTableItem columnWidth="sm" center>
                  {status}
                </DataTableItem>
              </DataTableRow>
            );
          })
        ) : (
          <div className="w-full mt-6 text-center text-muted-foreground">
            No exams found
          </div>
        )}
      </DataTableBody>
    </>
  );
}
