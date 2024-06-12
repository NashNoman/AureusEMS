import Header from "@/components/Header";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import { AuthProvider, ThemesProvider } from "@/components/providers";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import PageWrapper from "@/components/page-wrapper";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Props = { children: ReactNode };

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  return (
    <html lang="en">
      <AuthProvider>
        <PageWrapper className={inter.className}>
          <ThemesProvider
            attribute="class"
            defaultTheme="light"
            themes={["light", "dark", "system"]}
            enableSystem
            disableTransitionOnChange
          >
            <Sidebar />
            <div className="h-full w-full pt-8 flex flex-col">
              <Header user={session.user} />
              <main className="flex flex-col flex-grow overflow-hidden">
                {children}
              </main>
            </div>
          </ThemesProvider>
          <Toaster />
        </PageWrapper>
      </AuthProvider>
    </html>
  );
}
