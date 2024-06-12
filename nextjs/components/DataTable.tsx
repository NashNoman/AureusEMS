"use client";

import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnWidth } from "@/enums";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

export function DataTableBody({ children }: { children: ReactNode }) {
  return (
    <ScrollArea className="flex-grow overflow-y-auto">{children}</ScrollArea>
  );
}

export function DataTableHeader({ columns }: HeaderProps) {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        ColumnWidth[columnWidth],
        center && "text-center",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
