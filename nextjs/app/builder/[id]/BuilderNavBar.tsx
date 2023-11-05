"use client";

import Logo from "@/public/logo";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function BuilderNavBar() {
  const { courseCode, courseTitle } = useSelector(
    (state: RootState) => state.examInfo
  );

  return (
    <header className="sticky top-0 left-0 flex w-screen border-b justify-between bg-background items-center">
      <Logo className="fill-primary h-9 m-3" />
      <div className="text-center flex-grow border-x">
        <p className="text-primary">Test</p>
        <p className="text-xs text-muted-foreground">
          {courseCode} - {courseTitle}
        </p>
      </div>
      <Button variant="ghost" className="mx-3">
        Logout
      </Button>
    </header>
  );
}
