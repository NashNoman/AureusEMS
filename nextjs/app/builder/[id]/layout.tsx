import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }) {
  return (
    <html>
      <body className="bg-secondary">
        <NavBar />
        {/* TODO: Add custom functionalities to 'main' tag */}
        {children}
      </body>
    </html>
  );
}
