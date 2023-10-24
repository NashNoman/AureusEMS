import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
