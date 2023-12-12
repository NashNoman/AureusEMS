import Link from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode; href: string; className?: string; };

export default function DataTableRow({ children, href , className}: Props) {
  return (
    <Link
      href={href}
      className="w-full text-start cursor-pointer flex text-sm justify-between px-20 pr-36 items-center h-16 border-b border-accent hover:bg-accent transition-colors"
    >
      {children}
    </Link>
  );
}
