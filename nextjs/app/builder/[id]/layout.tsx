import BuilderNavBar from "@/app/builder/[id]/BuilderNavBar";
import ReduxProvider from "@/app/builder/[id]/ReduxProvider";
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
