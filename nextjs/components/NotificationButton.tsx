"use client";

import Notification from "@/components/Notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { BellIcon, Loader2Icon } from "lucide-react";
import { getSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

export let socket: any;

export default function NotificationButton() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notifi[]>([]);
  const loadingRef = useRef(true);
  const [open, setOpen] = useState(false);
  const unseenNotifications = useMemo(
    () => notifications.filter((n) => !n.seen).length,
    [notifications]
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notifications");

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        setNotifications(data);
        loadingRef.current = false;
      } catch (err: any) {
        toast({
          title: err.message,
          variant: "destructive",
        });
      }
    };

    const connectSocket = async () => {
      const session = await getSession();

      socket = new WebSocket(
        `ws://localhost:3001?userId=${session?.user?.id}&role=${session?.user?.role?.type}`
      );

      socket.onmessage = (message: MessageEvent) => {
        if (message.data === "notification") {
          fetchNotifications();
        }
      };
    };

    fetchNotifications().then(() => {
      connectSocket();
    });
  }, []);

  const handleNotificationClick = (id: string) => {
    const clickedIndex = notifications.findIndex((n) => n.id === id);
    setNotifications((prev) => {
      const notis = [...prev];
      notis[clickedIndex].seen = true;
      return notis;
    });
    setOpen(false);
  };

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger className="outline-none relative">
        <BellIcon className="h-5 text-muted-foreground" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-xs/3">
          {unseenNotifications > 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="bg-destructive text-destructive-foreground p-0.5 h-4 w-4 rounded-full"
            >
              {unseenNotifications}
            </motion.div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-4 w-80 p-0">
        <DropdownMenuLabel className="w-64">Notifications</DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          {loadingRef.current ? (
            <div className="py-3">
              <Loader2Icon className="animate-spin text-primary/60 mx-auto" />
            </div>
          ) : notifications.length ? (
            <ScrollArea className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  {...notification}
                  onClick={handleNotificationClick}
                />
              ))}
            </ScrollArea>
          ) : (
            <span className="text-foreground/50 py-2 block text-center text-sm">
              empty
            </span>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
