import { BuilderNavBar } from "@/components/NavBar";
import "../../globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <BuilderNavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
