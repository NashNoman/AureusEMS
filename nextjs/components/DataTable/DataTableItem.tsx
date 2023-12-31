import { ColumnWidth } from "@/enums";

type Props = {
  children: string;
  columnWidth?: "sm" | "lg" | "default";
  center?: boolean;
};

const className = "w-28";

export default function DataTableItem({
  children,
  columnWidth = "default",
  center = false,
}: Props) {
  return (
    <div className={`${ColumnWidth[columnWidth]} ${center && "text-center"}`}>
      {children}
    </div>
  );
}
