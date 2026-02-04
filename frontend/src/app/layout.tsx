import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">  <div className="max-w-6xl mx-auto">{children}</div></main>
        </div>
      </body>
    </html>
  );
}
