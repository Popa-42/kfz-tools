import React from "react";
import type { Metadata } from "next";
import "../../public/assets/styles/globals.css";

import { Hind, Poppins } from "next/font/google";
import { clsx } from "clsx";

const hind = Hind({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hind",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Next.js Template",
  description: "A Next.js template repository.",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "96x96",
      url: "/assets/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className={clsx(hind.variable, poppins.variable, "font-sans")}>
          {children}
        </main>
      </body>
    </html>
  );
}
