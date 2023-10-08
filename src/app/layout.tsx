import { Toaster } from "sonner";

import "./fonts.css";
import "./globals.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
