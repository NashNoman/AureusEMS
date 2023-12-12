import DataTableBody from "@/components/DataTable/DataTableBody";
import DataTableHeader from "@/components/DataTable/DataTableHeader";
import DataTableItem from "@/components/DataTable/DataTableItem";
import DataTableRow from "@/components/DataTable/DataTableRow";
import { ColumnWidth } from "@/enums";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import Exam from "@/models/Exam";
import User from "@/models/User";
import { title } from "process";
import moment from 'moment';

export default async function ExamsHome() {
  await dbConnect();
  const exams = await Exam.find().populate(
    { path: "course", model: Course, populate: { path: "instructor", model: User } })

    console.log(exams);

  const columns = [
    { title: "code", columnWidth: ColumnWidth.sm },
    { title: 'course',columnWidth: ColumnWidth.lg },
    { title: "Exam Date", columnWidth: ColumnWidth.sm,centered:true},
    { title: "create Date", columnWidth: ColumnWidth.sm,centered:true },
    { title: "update", columnWidth: ColumnWidth.sm, centered:true },
    { title: "exam type", columnWidth: ColumnWidth.sm,centered: true },
    { title: "percentage", columnWidth: ColumnWidth.sm,centered:true },
    { title: "exams status", columnWidth: ColumnWidth.sm, centered: true },
  ];


  return (
    <>
      <h1 className="ml-20 text-3xl font-semibold mb-8">
        {title}
      </h1>

      <DataTableHeader columns={columns} />
      <DataTableBody>
        {exams.map((exam) => {
          const { id, code, sections, percentage, status, course, type } = exam;
          return (
            <DataTableRow
              key={id}
              href={`/exam/${code}`}
            >
              <DataTableItem columnWidth="sm">{course.code}</DataTableItem>
              <DataTableItem columnWidth="lg">{course.title}</DataTableItem>
              <DataTableItem columnWidth="sm"center>{exam.due.toLocaleDateString("en-US")}</DataTableItem>
              <DataTableItem columnWidth="sm" center>{exam.created.toLocaleDateString("en-US")}</DataTableItem>
              <DataTableItem columnWidth="sm" center>{moment(exam.updated).fromNow()}</DataTableItem>
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
        })}
      </DataTableBody>
    </>
  );
}
