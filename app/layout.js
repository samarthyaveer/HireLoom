// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HireLoom",
  description:
    "AI-powered recruitment platform for intelligent hiring and candidate assessment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        <div className="min-h-screen bg-black pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
