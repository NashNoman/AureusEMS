import SimpleLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export function BuilderNavBar() {
  return (
    <div className="h-12 px-2 border-b flex justify-between items-center sticky top-0 w-screen bg-background">
      <Link href="/" className="cursor-pointer">
        {<SimpleLogo className="h-9" />}
      </Link>

      <div className="flex-grow h-full ml-2 border-x flex items-center">
        <div className="px-2 flex flex-col justify-center gap-0 h-full">
          <p className="font-semibold text-lg">Test1</p>
          <p className="text-xs text-muted-foreground">CSCI200</p>
        </div>
      </div>

      <Button variant="link">Logout</Button>
    </div>
  );
}
