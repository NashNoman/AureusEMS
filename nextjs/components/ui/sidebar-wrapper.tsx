"use client";

import { motion } from "framer-motion";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: -10,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -5,
      }}
      transition={{
        duration: 0.4,
      }}
      className="h-full border-r border-border w-80 py-8 flex flex-col gap-20 px-6"
    >
      {children}
    </motion.aside>
  );
}
