"use server";

import Notifi from "@/models/Notifi";

export default async function markAsRead(notificationId: string) {
  console.log(notificationId);

  const notification = await Notifi.findById(notificationId);
  notification.seen = true;
  await notification.save();
}
