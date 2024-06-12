"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const PAGES = {
  "/bank": "Bank",
  "/exams": "Exams",
  "/courses": "Courses",
};

export default function HeaderTitle() {
  const [page, setPage] = React.useState<string>("Home");
  const pathname = usePathname();

  const path = pathname.split("/");

  useEffect(() => {
    setPage(PAGES[`/${path[1]}` as keyof typeof PAGES] || "Home");
  }, [path[1]]);

  return (
    <motion.h3
      key={page}
      initial={{
        opacity: 0,
        y: 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -5,
      }}
      transition={{
        duration: 0.4,
      }}
      className="font-normal"
    >
      {page}
    </motion.h3>
  );
}
