import { ReactNode } from "react";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="bg-secondary dark">
        {/* TODO: Add custom functionalities to 'main' tag */}
        {children}
      </body>
    </html>
  );
}
