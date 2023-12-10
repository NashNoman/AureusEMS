import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/components/providers";

export const metadata = {
  title: "Login - Aureus",
  description: "Generated by Next.js",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen w-screen grid justify-center items-center`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
