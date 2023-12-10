// "use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/logo-full.png";
import Link from "next/link";
import SidebarLink from "@/components/SidebarLink";
import {
  ArchiveIcon,
  BookMarkedIcon,
  FileQuestionIcon,
  HomeIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

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
            <SidebarLink path="/">
              <HomeIcon className="w-5 stroke-1" />
              Home
            </SidebarLink>
          </li>
          <li>
            <SidebarLink path="/bank">
              <ArchiveIcon className="w-5 stroke-1" />
              Bank
            </SidebarLink>
          </li>
          {session && session.user.role.type !== "instructor" && (
            <>
              <li>
                <SidebarLink path="/exams">
                  <FileQuestionIcon className="w-5 stroke-1" />
                  Exams
                </SidebarLink>
              </li>
              <li>
                <SidebarLink path="/courses">
                  <BookMarkedIcon className="w-5 stroke-1" />
                  Courses
                </SidebarLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}
