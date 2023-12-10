import Header from "@/components/Header";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "@/components/providers";

export const metadata = {
  title: "Aureus",
};

const inter = Inter({ subsets: ["latin"] });

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={
            "h-screen bg-background text-primary flex overflow-hidden " +
            inter.className
          }
        >
          <Sidebar />
          <div className="h-full w-full pt-8 flex flex-col">
            <Header />
            <main className="flex flex-col flex-grow overflow-hidden">
              {children}
            </main>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
