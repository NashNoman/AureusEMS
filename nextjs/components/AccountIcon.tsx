import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AccountIcon() {
  const { data: session } = useSession();

  if (!session) return <Skeleton className="w-9 h-9 rounded-full" />;

  const { firstName, lastName, role } = session?.user;

  return (
    <Popover>
      <PopoverTrigger>
        <div className="border grid justify-center items-center font-bold text-foreground/60 cursor-pointer border-border w-9 h-9 rounded-full hover:bg-accent transition-colors">
          {firstName[0] + lastName[0]}
        </div>
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
