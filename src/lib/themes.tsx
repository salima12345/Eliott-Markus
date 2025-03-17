"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const PAGE_THEMES: Record<string, Theme> = {
  "/": "dark",
  "/Team": "light",
  "/Wilo":"light",
  "/conditions-generales":"light",
  "/mentions-legales":"light",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [theme, setTheme] = useState<Theme>(() => {
    // Check if the current path is a Bio or Expertise page
    if (pathname.startsWith('/Bio/') || pathname.startsWith('/Expertise/')  || pathname.startsWith('/Wilo/') || pathname.startsWith('/References/')  || pathname.startsWith('/conditions-generales/')   || pathname.startsWith('/mentions-legales/')  ) {
      return 'light';
    }
    return PAGE_THEMES[pathname] || "dark";
  });

  useEffect(() => {
    let newTheme: Theme;

    // Check if the current path is a Bio or Expertise page
    if (pathname.startsWith('/Bio/') || pathname.startsWith('/Expertise/')  || pathname.startsWith('/Wilo/') || pathname.startsWith('/References/')) {
      newTheme = 'light';
    } else {
      newTheme = PAGE_THEMES[pathname] || "dark";
    }

    setTheme(newTheme);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}