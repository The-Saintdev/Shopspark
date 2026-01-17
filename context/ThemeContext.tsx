import { darkTheme, lightTheme } from "@/app/theme/theme";
import { createContext, ReactNode, useContext, useState } from "react";

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  themeName: "light" | "dark";
  switchTheme: (name: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const theme = themeName === "light" ? lightTheme : darkTheme;

  const switchTheme = (name: "light" | "dark") => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
