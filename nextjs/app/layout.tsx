import Header from "@/components/Header";
import "./globals.css";
import NavBar from "@/components/NavBar";
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
          "h-screen bg-background text-primary flex " + inter.className
        }
      >
        <NavBar />
        <div className="h-full w-full pt-8 overflow-hidden">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
