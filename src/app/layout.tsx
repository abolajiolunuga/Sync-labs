import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sync Landing Page",
  description: "Detailed landing page build for Sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
