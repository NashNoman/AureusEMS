import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import DataTableBody from "@/components/DataTable/DataTableBody";
import DataTableHeader from "@/components/DataTable/DataTableHeader";
import DataTableItem from "@/components/DataTable/DataTableItem";
import DataTableRow from "@/components/DataTable/DataTableRow";
import { ColumnWidth } from "@/enums";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import Dept from "@/models/Dept";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export default async function CoursesHome() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  if (user.role.type !== "dean" && user.role.type !== "dept_head") return null;

  if (user.role.type !== "dept_head") return null;

  const dept = await Dept.findById(user.role.dept).populate({
    path: "courses",
    model: Course,
    populate: { path: "instructor", model: User },
  });

  const columns = [
    { title: "code", columnWidth: ColumnWidth.sm },
    { title: "title" },
    { title: "instructor", columnWidth: ColumnWidth.lg },
    { title: "exams no.", columnWidth: ColumnWidth.sm, centered: true },
  ];

  return (
    <>
      <h1 className="ml-20 text-3xl font-semibold mb-8">
        {dept.title} - {dept.code}
      </h1>

      <DataTableHeader columns={columns} />
      <DataTableBody>
        {dept.courses.map((course: (typeof dept.courses)[0]) => {
          const { _id, code, title, instructor: inst, exams } = course;

          return (
            <DataTableRow key={_id}>
              <DataTableItem columnWidth="sm">{code}</DataTableItem>
              <DataTableItem>{title}</DataTableItem>
              <DataTableItem columnWidth="lg">
                {`${inst.firstName} ${inst.lastName}`}
              </DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {exams.length}
              </DataTableItem>
            </DataTableRow>
          );
        })}
      </DataTableBody>
    </>
  );
}
