import Header from "@/components/Header";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AuthProvider, ThemesProvider } from "@/components/providers";

export const metadata = {
  title: "Aureus",
};

const inter = Inter({ subsets: ["latin"] });

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={"h-screen text-primary flex  " + inter.className}>
          <ThemesProvider
            attribute="class"
            defaultTheme="system"
            themes={["light", "dark", "system"]}
            enableSystem
            disableTransitionOnChange
          >
            <Sidebar />
            <div className="h-full w-full pt-8 flex flex-col">
              <Header />
              <main className="flex flex-col flex-grow overflow-hidden">
                {children}
              </main>
            </div>
          </ThemesProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
