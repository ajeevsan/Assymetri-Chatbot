// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "HTML Generator",
  description: "Generate HTML/CSS with AI",
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <link rel="icon" href="/icon.png" />
      <body className="font-sans bg-white text-black">
        {children}
      </body>
    </html>
  );
}
