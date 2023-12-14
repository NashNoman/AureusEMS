"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        className={cn(
          "mr-4 text-primary/50",
          display === "all" && "text-primary"
        )}
        onClick={() => onChange("all")}
      >
        All
      </Button>
      <Button
        variant={(display === "recent" && "secondary") || "ghost"}
        className={cn(
          "mr-4 text-primary/50",
          display === "recent" && "text-primary"
        )}
        onClick={() => onChange("recent")}
      >
        Recent
      </Button>
    </div>
  );
}
