import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function SectionWrapper({ children }: Props) {
  return (
    <div className="w-[85%] px-3 bg-secondary rounded-2xl">{children}</div>
  );
}
