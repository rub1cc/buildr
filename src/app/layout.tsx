import { Toaster } from "sonner";

import "./fonts.css";
import "./globals.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-neutral-400 text-sm">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
