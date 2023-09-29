import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

const instrument = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salary Counter",
  description: "Powered by Next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={instrument.className}>{children}</body>
    </html>
  );
}
