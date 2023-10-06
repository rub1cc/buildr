"use client";
import { Toaster } from "@/components/ui/toaster";
import "./fonts.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
