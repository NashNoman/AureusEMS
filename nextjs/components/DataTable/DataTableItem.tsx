import { ColumnWidth } from "@/enums";

const className = 'w-24';

type Props = {
  children: string;
  columnWidth?: "sm" | "lg" | "default";
  center?: boolean;
};

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
