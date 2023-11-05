import ReduxProvider from "@/app/builder/[id]/ReduxProvider";
import { ReactNode } from "react";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="dark">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
