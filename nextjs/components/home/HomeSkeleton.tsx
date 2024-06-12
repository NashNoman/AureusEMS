import { Skeleton } from "@/components/ui/skeleton";
import {
  DataTableHeader,
  DataTableItem,
  DataTableRow,
} from "@/components/DataTable";
import { ColumnWidth } from "@/enums";
import { motion } from "framer-motion";

const rounds = ["c0", "c1", "c2"];

const columns = [
  { title: <Skeleton className="h-4 w-10" />, columnWidth: ColumnWidth.sm },
  { title: <Skeleton className="h-4 w-20" />, columnWidth: ColumnWidth.sm },
  {
    title: (
      <div className="flex justify-center">
        <Skeleton className="h-4 w-14" />
      </div>
    ),
    columnWidth: ColumnWidth.sm,
    centered: true,
  },
  {
    title: (
      <div className="flex justify-center">
        <Skeleton className="h-4 w-14" />
      </div>
    ),
    centered: true,
  },
  {
    title: (
      <div className="flex justify-center">
        <Skeleton className="h-4 w-10" />
      </div>
    ),
    columnWidth: ColumnWidth.sm,
    centered: true,
  },
  {
    title: (
      <div className="flex justify-center">
        <Skeleton className="h-4 w-10" />
      </div>
    ),
    columnWidth: ColumnWidth.sm,
    centered: true,
  },
  {
    title: (
      <div className="flex justify-center">
        <Skeleton className="h-4 w-10" />
      </div>
    ),
    columnWidth: ColumnWidth.sm,
    centered: true,
  },
];

export default function HomeSkeleton() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
      className="flex flex-col flex-grow overflow-y-auto"
    >
      <div className="mx-20 flex items-center gap-8 mb-7">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-3 w-12" />
      </div>
      <DataTableHeader columns={columns} />
      {rounds.map((c) => (
        <CourseSkeleton key={c} />
      ))}
    </motion.div>
  );
}

const CourseSkeleton = () => {
  return (
    <>
      <DataTableRow className="mt-4 hover:bg-transparent h-16 py-3">
        <DataTableItem className="font-semibold text-xl flex items-center">
          <Skeleton className="w-56 h-8" />
        </DataTableItem>
      </DataTableRow>
      {rounds.map((round) => (
        <DataTableRow key={round} className="py-8">
          <DataTableItem columnWidth="sm">
            <Skeleton className="w-12 h-4" />
          </DataTableItem>
          <DataTableItem columnWidth="sm">
            <Skeleton className="w-8 h-4" />
          </DataTableItem>
          <DataTableItem
            columnWidth="sm"
            className="flex justify-center"
            center
          >
            <Skeleton className="w-12 h-4" />
          </DataTableItem>
          <DataTableItem center className="flex justify-center">
            <Skeleton className="w-56 h-4" />
          </DataTableItem>
          <DataTableItem
            columnWidth="sm"
            className="flex justify-center"
            center
          >
            <Skeleton className="w-16 h-4" />
          </DataTableItem>
          <DataTableItem
            columnWidth="sm"
            className="flex justify-center"
            center
          >
            <Skeleton className="w-16 h-4" />
          </DataTableItem>
          <DataTableItem
            columnWidth="sm"
            className="flex justify-center"
            center
          >
            <Skeleton className="w-16 h-4" />
          </DataTableItem>
        </DataTableRow>
      ))}
      <div className="mb-8" />
    </>
  );
};
