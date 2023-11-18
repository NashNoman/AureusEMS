import { BuilderNavBar } from "@/components/NavBar";
import "@/app/globals.css";
import { ReactNode } from "react";
import BuilderReduxProvider from "@/lib/BuilderReduxProvider";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <BuilderReduxProvider>
          <BuilderNavBar />
          {children}
        </BuilderReduxProvider>
      </body>
    </html>
  );
}
