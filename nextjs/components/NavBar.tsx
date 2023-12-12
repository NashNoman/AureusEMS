import Image from "next/image";
import React from "react";
import logo from "@/public/logo-full.png";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import {
  ArchiveIcon,
  BookMarkedIcon,
  FileQuestionIcon,
  HomeIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NotificationButton from "@/components/NotificationButton";

export default function NavBar() {
  return (
    <aside className="h-full border-r border-border w-80 py-8 flex flex-col gap-20 px-6">
      <div className="pl-4 flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Aureus" className="w-40 dark:invert" />
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="flex flex-col font-semibold text-muted-foreground gap-4">
          <li>
            <NavLink path="/">
              <HomeIcon className="w-5 stroke-1" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink path="/bank">
              <ArchiveIcon className="w-5 stroke-1" />
              Bank
            </NavLink>
          </li>
          <li>
            <NavLink path="/exams">
              <FileQuestionIcon className="w-5 stroke-1" />
              Exams
            </NavLink>
          </li>
          <li>
            <NavLink path="/courses">
              <BookMarkedIcon className="w-5 stroke-1" />
              Courses
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* <div className="flex flex-col gap-3">
        <Button className="bg-blue-600 text-white w-full py-6 px-4 gap-2 justify-start hover:bg-blue-700 active:bg-blue-800">
          New Exam
          <kbd className="text-gray-300 font-normal text-xs">Alt N</kbd>
        </Button>
        <Separator />
        <div className="flex justify-between items-center font-semibold text-foreground/80 pl-2">
          <p>Ghada Adel</p>
          <Button variant="ghost" size="icon">
            <LogOutIcon className="w-5 cursor-pointer hover:text-foreground" />
          </Button>
        </div>
      </div> */}
    </aside>
  );
}
