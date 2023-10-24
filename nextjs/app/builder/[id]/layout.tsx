export const metadata = {
  title: "Aureus - Builder",
};

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
