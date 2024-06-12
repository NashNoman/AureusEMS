import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onChange: (value: "all" | "recent") => void;
  value: "all" | "recent";
};

export default function TableController({ onChange, value }: Props) {
  return (
    <div className="px-20 mb-6">
      <Button
        variant={(value === "all" && "secondary") || "ghost"}
        className={cn(
          "mr-4 text-primary/50",
          value === "all" && "text-primary"
        )}
        onClick={() => onChange("all")}
      >
        All
      </Button>
      <Button
        variant={(value === "recent" && "secondary") || "ghost"}
        className={cn(
          "mr-4 text-primary/50",
          value === "recent" && "text-primary"
        )}
        onClick={() => onChange("recent")}
      >
        Recent
      </Button>
    </div>
  );
}
