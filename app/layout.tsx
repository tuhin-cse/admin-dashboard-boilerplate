import type {Metadata} from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
      {children}
      </body>
      </html>
  );
}
