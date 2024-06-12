import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="h-4/5 flex items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-primary/30" />
    </div>
  );
}
