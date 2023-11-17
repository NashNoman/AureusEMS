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
          <main className="flex flex-col pb-20 pt-4 items-center gap-4 overflow-y-auto h-[calc(100%-3rem)]">
            {children}
          </main>
        </BuilderReduxProvider>
      </body>
    </html>
  );
}
