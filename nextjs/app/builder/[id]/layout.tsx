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
        <main className="flex flex-col items-center py-10 container">
          {children}
        </main>
      </body>
    </html>
  );
}
