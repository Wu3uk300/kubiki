import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "../styles/normalize.css";
const font = Playfair_Display({ subsets: ["latin"], weight: "400" });

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
      <body className={font.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
