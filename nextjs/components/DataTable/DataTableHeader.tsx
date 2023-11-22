import { ColumnWidth } from "@/enums";

type HeaderColumn = {
  title: string;
  columnWidth?: ColumnWidth;
  centered?: boolean;
};

type Props = { columns: HeaderColumn[] };

export default function DataTableHeader({ columns }: Props) {
  return (
    <div className="flex text-xs text-muted-foreground justify-between pr-36 px-20 items-center h-10 border-b border-accent">
      {columns.map((column) => (
        <div
          className={`${column.columnWidth || "flex-grow"} ${
            column.centered && "text-center"
          }`}
        >
          {column.title.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
