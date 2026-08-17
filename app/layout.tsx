import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junwen Chen | Human-Object Interaction Research",
  description:
    "A research journey toward efficient and generalizable human-object interaction detection, presented for the ICPR 2026 Doctoral Consortium.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
