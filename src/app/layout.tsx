import type { Metadata } from "next";

import { Figtree } from "next/font/google";
import "../styles/normalize.css";
const inter = Figtree({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Kubiki",
  description: "Created by MK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
