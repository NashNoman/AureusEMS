import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BellIcon } from "lucide-react";

export default function NotificationButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <BellIcon className="h-5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-4">
        <DropdownMenuLabel className="w-52">Notifications</DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <span className="text-foreground/50 py-2 block text-center text-sm">
            empty
          </span>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
