"use client";

import { motion } from "framer-motion";

export default function LoginFormCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: -10,
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="flex flex-col gap-3 w-[26rem] px-6 pt-12 pb-3 rounded-2xl shadow-2xl border-border border bg-background/50 dark:shadow"
    >
      {children}
    </motion.div>
  );
}
