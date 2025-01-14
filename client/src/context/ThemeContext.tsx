import React, { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import useLocalStorageAsState from "@/hooks/useLocalStorageAsState";

type ThemeType = "dark" | "light";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  let { state: theme, updateLocalStorage: updateTheme } =
    useLocalStorageAsState<ThemeType>("theme", "dark");

  const toggleTheme = useCallback(
    function () {
      updateTheme(theme === "dark" ? "light" : "dark");
    },
    [theme, updateTheme]
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.classList.add(theme as ThemeType);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme as ThemeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("ThemeContext must be used within a ThemeProvider");

  return context;
}

export { ThemeProvider, useThemeContext, ThemeType };
