import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Campus Events",
  description:
    "Discover workshops, technology events and activities on campus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
        <footer className="footer">
          © {new Date().getFullYear()} Campus Events — CodeOps Module 4
        </footer>
      </body>
    </html>
  );
}
