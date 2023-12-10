"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = { children: ReactNode; path: string };

export default function SidebarLink({ children, path }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={cn(
        "hover:text-foreground/80 hover:bg-muted transition-colors flex items-center gap-3 outline outline-transparent py-1.5 px-4 rounded-md",
        {
          "text-foreground !outline-secondary bg-muted/60": pathname === path,
        }
      )}
    >
      {children}
    </Link>
  );
}
