import { BuilderNavBar } from "@/components/NavBar";
import "../../globals.css";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <BuilderNavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
