import { ReactNode } from "react";

export default function SectionWrapper({ children }: { children: ReactNode }) {
  return <div className="rounded-sm w-[60%] p-4">{children}</div>;
}
