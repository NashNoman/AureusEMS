"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AccountIcon({ user }: { user: User }) {
  const { firstName, lastName, role } = user;

  return (
    <Popover>
      <PopoverTrigger>
        <p className="text-sm border flex justify-center items-center font-medium text-foreground/60 cursor-pointer border-border min-w-[2.25rem] min-h-[2.25rem] rounded-md hover:bg-accent transition-colors px-4 py-1">
          {firstName[0]}. {lastName}
          <ChevronDown className="w-4 h-4 ml-2" />
        </p>
      </PopoverTrigger>
      <PopoverContent className="mx-2 bg-accent/50 p-0 backdrop-blur-sm">
        <div className="bg-background p-3 rounded-md">
          <p className="text-lg font-bold">{firstName + " " + lastName}</p>
          <small className="text-muted-foreground">
            {role.type === "dean" && `Dean: ${role.schoolName}`}
            {role.type === "dept_head" && `Head: ${role.deptName}`}
            {role.type === "instructor" && "Instructor"}
          </small>
        </div>
        <div className="flex flex-col p-3">
          <div className="flex justify-between items-center px-3">
            <p className="font-medium text-accent-foreground">Theme</p>
            <ThemeToggle />
          </div>
          <Separator className="my-2" />
          <Button
            variant="destructive"
            className="flex justify-between h-10"
            autoFocus
            onClick={() => signOut()}
          >
            Logout
            <LogOutIcon className="h-5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
