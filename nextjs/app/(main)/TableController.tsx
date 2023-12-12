"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function TableController() {
  const [display, setDisplay] = useState<"all" | "recent">("all");

  return (
    <div className="px-20 mb-6">
      <Button
        variant={(display === "all" && "secondary") || "ghost"}
        className="mr-4"
        onClick={() => setDisplay("all")}
      >
        All
      </Button>
      <Button
        variant={(display === "recent" && "secondary") || "ghost"}
        onClick={() => setDisplay("recent")}
      >
        Recent
      </Button>
      <Button className="bg-blue-600 text-white float-right hover:bg-blue-700">
        New exam
        <kbd className="ml-4 text-gray-300 text-xs">Alt N</kbd>
      </Button>
    </div>
  );
}
