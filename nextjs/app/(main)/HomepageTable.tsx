"use client";

import TableController from "@/app/(main)/TableController";
import DataTableBody from "@/components/DataTable/DataTableBody";
import DataTableHeader from "@/components/DataTable/DataTableHeader";
import DataTableItem from "@/components/DataTable/DataTableItem";
import DataTableRow from "@/components/DataTable/DataTableRow";
import { useState } from "react";

export default function HomepageTable({
  columns,
  examsData,
}: {
  columns: any;
  examsData: any;
}) {
  const [exams, setExams] = useState(examsData);
  const [display, setDisplay] = useState<"all" | "recent">("all");

  const handleView = (display: "all" | "recent") => {
    if (display === "all") {
      setExams(examsData);
      setDisplay("all");
    } else {
      setExams((allExams: any) => allExams.filter((exam: any) => !!exam.doc));
      setDisplay("recent");
    }
  };

  return (
    <>
      <TableController onChange={handleView} display={display} />
      <DataTableHeader columns={columns} />
      <DataTableBody>
        {exams.map((exam: any) => {
          const { id, type, percentage, doc, courseTitle, courseCode } = exam;

          return (
            <DataTableRow key={id}>
              <DataTableItem columnWidth="sm">{courseCode}</DataTableItem>
              <DataTableItem>{courseTitle}</DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {type}
              </DataTableItem>
              <DataTableItem columnWidth="sm" center>
                {percentage + "%"}
              </DataTableItem>
              {doc ? (
                <>
                  <DataTableItem columnWidth="sm" center>
                    {doc.status}
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    {doc.due}
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    {doc.updatedAt}
                  </DataTableItem>
                  <DataTableItem columnWidth="sm" center>
                    {doc.createdAt}
                  </DataTableItem>
                </>
              ) : (
                <>
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
                </>
              )}
            </DataTableRow>
          );
        })}
      </DataTableBody>
    </>
  );
}
