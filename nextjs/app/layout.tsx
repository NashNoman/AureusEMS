import "./globals.css";
import NavBar from "@/components/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

export const metadata = {
  title: "Aureus",
};

const inter = Inter({ subsets: ["latin"] });

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={
          "h-screen dark bg-background text-primary flex " + inter.className
        }
      >
        <NavBar />
        <ScrollArea className="h-full w-full pt-14">{children}</ScrollArea>
      </body>
    </html>
  );
}
