"use client";

import { DataTableBody, DataTableHeader } from "@/components/DataTable";
import HomeSkeleton from "@/components/home/HomeSkeleton";
import CoursesTable from "@/components/home/CoursesTable";
import TableController from "@/components/home/TableController";
import { ColumnWidth } from "@/enums";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import RecentTable from "@/components/home/RecentTable";

const columns = [
  { title: "exam", columnWidth: ColumnWidth.sm },
  { title: "percentage", columnWidth: ColumnWidth.sm },
  { title: "status", columnWidth: ColumnWidth.sm, centered: true },
  { title: "activity", centered: true },
  { title: "due", columnWidth: ColumnWidth.sm, centered: true },
  { title: "updated", columnWidth: ColumnWidth.sm, centered: true },
  { title: "created", columnWidth: ColumnWidth.sm, centered: true },
];

export default function HomeTable() {
  const [value, setValue] = useState<"all" | "recent">("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/courses", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const courses = await res.json();
        setCourses(courses);
      } catch (error) {
        toast({
          title: "An error occurred while fetching data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    handleValueChange("all");
  }, []);

  const handleValueChange = (val: typeof value) => {
    setValue(val);
  };

  if (loading) return <HomeSkeleton key="1" />;

  return (
    <>
      <TableController onChange={handleValueChange} value={value} />
      <DataTableHeader columns={columns} />

      <DataTableBody>
        {courses.length === 0 ? (
          <div className="text-center mt-24 text-primary/80">
            No courses found
          </div>
        ) : value === "all" ? (
          <CoursesTable courses={courses} />
        ) : (
          <RecentTable courses={courses} />
        )}
      </DataTableBody>
    </>
  );
}
