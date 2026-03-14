import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  IBM_Plex_Mono,
  JetBrains_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "../components/effects/SmoothScroll";
import KineticGrid from "../components/effects/KineticGrid";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";
import { CursorProvider } from "@/utils/CursorContext";
import CustomCursor from "@/components/effects/CustomCursor";
import { ThemeProvider } from "../components/ThemeProvider";

import "./globals.css";

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

const switzer = localFont({
  src: [
    {
      path: "./fonts/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/Switzer-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["300", "400"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
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
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} ${GeistPixelSquare.variable} ${switzer.variable} ${plexMono.variable} ${jetbrainsMono.variable} antialiased selection:bg-black/10 dark:selection:bg-white/20`}
      >
        <SpeedInsights />
        <CursorProvider>
          {/* Your custom cursor sits at the top level */}
          <CustomCursor />
          <ThemeProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ThemeProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
