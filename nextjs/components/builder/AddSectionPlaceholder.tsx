import { PlusIcon } from "@radix-ui/react-icons";

export default function AddSectionPlaceholder() {
  return (
    <div className="cursor-pointer bg-muted h-44 grid items-center justify-center border rounded-sm w-[60%] shadow-sm hover:shadow-md transition-shadow">
      <PlusIcon className="h-12 w-12 text-muted-foreground bg-accent rounded-full p-2 text-center" />
    </div>
  );
}
