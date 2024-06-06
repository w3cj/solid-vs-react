import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next.js Hacker News",
  description: "Hacker News client built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <Suspense fallback={<div className="news-list-nav">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
