import BuilderNavBar from "@/components/builder/BuilderNavBar";
import ReduxProvider from "@/lib/ReduxProvider";
import { ReactNode } from "react";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="">
        <ReduxProvider>
          <BuilderNavBar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
