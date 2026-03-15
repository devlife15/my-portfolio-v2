"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false} // Forces it to stay on your curated dark/light, ignoring OS preferences if you want strict control
    >
      {children}
    </NextThemesProvider>
  );
}
