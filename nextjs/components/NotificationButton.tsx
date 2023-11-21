import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BellIcon } from "lucide-react";

export default function NotificationButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <BellIcon className="w-[1.1rem] text-muted-foreground fill-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="w-52">Notifications</DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <span className="text-foreground/50 py-2 block text-center text-sm">
            empty
          </span>
          {/* <DropdownMenuItem>empty</DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
