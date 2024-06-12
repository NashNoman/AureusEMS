"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <AnimatePresence>
      <motion.body
        key="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`h-screen w-screen text-primary flex justify-center items-center bg-background ${className}`}
      >
        {children}
      </motion.body>
    </AnimatePresence>
  );
}
