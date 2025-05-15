// app/layout.js
import "./globals.css";
import "./styles/components.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HireLoom",
  description:
    "AI-powered tools for job seekers and recruiters. Create interviews, analyze resumes, and generate targeted questions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-gray-900">
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
