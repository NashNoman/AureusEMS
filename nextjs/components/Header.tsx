"use client";

import AccountIcon from "@/components/AccountIcon";
import NotificationButton from "@/components/NotificationButton";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const PAGES = {
  "/": "Home",
  "/bank": "Bank",
  "/exams": "Exams",
  "/courses": "Courses",
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-20 backdrop-blur-lg flex justify-between items-center mb-12">
      <h3>{PAGES[pathname as keyof typeof PAGES]}</h3>

      <div className="flex gap-4 items-center">
        <div className="p-1.5 text-sm border border-border rounded-xl flex items-center gap-2">
          <SearchIcon className="text-muted-foreground h-4" />
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Search"
            autoCorrect="false"
          />
          <kbd className="text-muted-foreground mr-1">/</kbd>
        </div>
        <NotificationButton />
        <AccountIcon />
      </div>
    </header>
  );
}
