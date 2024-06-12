import { Skeleton } from "@/components/ui/skeleton";
import { ColumnWidth } from "@/enums";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeaderColumn = {
  title: string | ReactNode;
  columnWidth?: ColumnWidth;
  centered?: boolean;
};

type HeaderProps = { columns: HeaderColumn[] };

type ItemProps = {
  children: string | any;
  columnWidth?: "sm" | "lg" | "default";
  center?: boolean;
  className?: string;
};

type RowProps = { children: ReactNode; className?: string };

const columns = [
  { title: <Skeleton className="h-4 w-8" />, columnWidth: ColumnWidth.sm },
  { title: <Skeleton className="h-4 w-8" /> },
  { title: <Skeleton className="h-4 w-20" />, columnWidth: ColumnWidth.lg },
  {
    title: <Skeleton className="h-4 w-8" />,
    columnWidth: ColumnWidth.sm,
    centered: true,
  },
];

const rounds = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function loading() {
  return (
    <>
      <Skeleton className="w-80 h-8 mx-20 mb-10" />
      <DataTableHeader columns={columns} />
      {rounds.map((r) => (
        <div key={r} style={{ opacity: `${100 - r * 10}%` }}>
          <DataTableRow>
            <DataTableItem columnWidth="sm">
              <Skeleton className="h-6 w-20" />
            </DataTableItem>
            <DataTableItem>
              <Skeleton className="h-6 w-40" />
            </DataTableItem>
            <DataTableItem columnWidth="lg">
              <Skeleton className="h-6 w-32" />
            </DataTableItem>
            <DataTableItem columnWidth="sm" center>
              <Skeleton className="h-6 w-12" />
            </DataTableItem>
          </DataTableRow>
        </div>
      ))}
    </>
  );
}

function DataTableHeader({ columns }: HeaderProps) {
  return (
    <div className="flex text-xs uppercase text-muted-foreground justify-between pr-36 px-20 py-2 items-center border-b border-accent">
      {columns.map((column, index) => (
        <div
          key={index}
          className={`${column.columnWidth || "flex-grow"} ${
            column.centered && "text-center"
          }`}
        >
          {column.title}
        </div>
      ))}
    </div>
  );
}

export function DataTableRow({ children, className }: RowProps) {
  return (
    <div
      className={cn(
        "w-full text-start cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DataTableItem({
  children,
  columnWidth = "default",
  center = false,
  className,
}: ItemProps) {
  return (
    <div
      className={cn(
        ColumnWidth[columnWidth],
        center && "text-center",
        className
      )}
    >
      {children}
    </div>
  );
}
