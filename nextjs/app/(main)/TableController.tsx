"use client";

import { Button } from "@/components/ui/button";

export default function TableController({
  onChange,
  display,
}: {
  onChange: (display: "all" | "recent") => void;
  display: "all" | "recent";
}) {
  return (
    <div className="px-20 mb-6">
      <Button
        variant={(display === "all" && "secondary") || "ghost"}
        className="mr-4"
        onClick={() => onChange("all")}
      >
        All
      </Button>
      <Button
        variant={(display === "recent" && "secondary") || "ghost"}
        onClick={() => onChange("recent")}
      >
        Recent
      </Button>
    </div>
  );
}
