import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "../components/effects/SmoothScroll";
import FloatingASCII from "../components/effects/FloatingASCII";

const editorial = localFont({
  src: [
    {
      path: "./fonts/PPEditorialOld-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPEditorialOld-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayan Kumar | Full-Stack Developer",
  description: "Welcome to my Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} antialiased`}
      >
        <FloatingASCII />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
