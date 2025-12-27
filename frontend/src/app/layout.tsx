import "./globals.css";
import Navbar from "@/components/Navbar";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export const metadata = {
  title: "CineVerse",
  description: "Book movie tickets easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen">
        <ReactQueryProvider>
          <Navbar />
          <main className="pt-4">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
