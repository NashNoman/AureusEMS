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
      <body className="h-screen">
        <BuilderReduxProvider>
          <BuilderNavBar />
          <main className="flex flex-col py-10 items-center">{children}</main>
        </BuilderReduxProvider>
      </body>
    </html>
  );
}
