import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState(getSystemTheme());

  useEffect(() => {
    const savedTheme = localStorage.getItem("drivehub_theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setResolvedTheme(savedTheme === "system" ? getSystemTheme() : savedTheme);
    }
  }, []);

  useEffect(() => {
    const applyTheme = (mode) => {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    const nextTheme = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem("drivehub_theme", theme);
  }, [theme]);

  useEffect(() => {
    const listener = (event) => {
      if (theme === "system") {
        const next = event.matches ? "dark" : "light";
        setResolvedTheme(next);
        if (next === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
