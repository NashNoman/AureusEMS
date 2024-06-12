import { DataTableItem, DataTableRow } from "@/components/DataTable";
import NewExamDialog from "@/components/NewExamDialog";
import { useToast } from "@/components/ui/use-toast";

export default function CoursesTable({ courses }: { courses: any[] }) {
  return (
    <>
      {courses.map((course) => {
        const { id } = course;

        return <CourseGroup key={id} course={course} />;
      })}
    </>
  );
}

const CourseGroup = ({ course }: { course: any }) => {
  const { title, code, exams, clos } = course;
  const { toast } = useToast();

  const Wrapper = clos ? NewExamDialog : "div";

  return (
    <div
      className={clos ? "" : "bg-secondary text-muted-foreground"}
      onClick={
        clos
          ? () => {}
          : () =>
              toast({
                title: "Cannot create exam",
                description:
                  "Course Learning Objectives must be available to create an exam.",
              })
      }
    >
      <DataTableRow className="pt-2 hover:bg-transparent h-16 items-end pb-4">
        <DataTableItem className="font-semibold text-xl flex items-center">
          {code}
          <div className="ml-1.5 mr-2.5 h-6 w-0.5 rounded-sm bg-primary" />
          {title}
        </DataTableItem>
      </DataTableRow>
      {exams.map((exam: any) => {
        const { id, doc, percentage, type } = exam;

        return (
          <Wrapper exam={exam}>
            <DataTableRow key={id}>
              <DataTableItem columnWidth="sm">{type}</DataTableItem>
              <DataTableItem columnWidth="sm">{percentage + "%"}</DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {doc?.status || "unset"}
              </DataTableItem>
              <DataTableItem center>{doc?.activity || ""}</DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {doc?.due || ""}
              </DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {doc?.updatedAt || ""}
              </DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {doc?.createdAt || ""}
              </DataTableItem>
            </DataTableRow>
          </Wrapper>
        );
      })}
      <div className="h-8 w-full" />
    </div>
  );
};
